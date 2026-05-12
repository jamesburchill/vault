import { createHash, createPrivateKey, createPublicKey, sign, verify } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const outputDir = "_site";
export const indexPath = path.join(outputDir, ".well-known", "provenance.json");
export const publicKeyPath = path.join(outputDir, ".well-known", "provenance-key.jwk");
export const provenanceContext = [
  "https://www.w3.org/ns/prov.jsonld",
  {
    content_hash: "https://schema.org/sha256"
  }
];

export function sha256Content(content) {
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

export function canonicalizeJson(value) {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalizeJson(item)).join(",")}]`;
  }

  switch (typeof value) {
    case "boolean":
      return value ? "true" : "false";
    case "number":
      if (!Number.isFinite(value)) {
        throw new TypeError("Cannot canonicalize non-finite JSON number.");
      }

      return JSON.stringify(value);
    case "string":
      return JSON.stringify(value);
    case "object":
      return `{${Object.keys(value)
        .sort()
        .map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key])}`)
        .join(",")}}`;
    default:
      throw new TypeError(`Cannot canonicalize unsupported JSON value type: ${typeof value}`);
  }
}

export function withoutSignature(record) {
  const clone = structuredClone(record);
  delete clone.signature;

  return clone;
}

export function canonicalSignaturePayload(record) {
  return Buffer.from(canonicalizeJson(withoutSignature(record)), "utf8");
}

function decodeBase64Url(value) {
  return Buffer.from(String(value || ""), "base64url");
}

export function verifyEd25519Signature(record, publicKeyJwk) {
  const signature = record.signature || {};
  const signatureValue = signature.value || signature.signature || "";
  const publicKey = createPublicKey({
    key: publicKeyJwk,
    format: "jwk"
  });

  return verify(null, canonicalSignaturePayload(record), publicKey, decodeBase64Url(signatureValue));
}

export function isSignaturePresent(record) {
  return Boolean(record?.signature?.value || record?.signature?.signature);
}

function ed25519PrivateKeyFromSeed(seed) {
  const prefix = Buffer.from("302e020100300506032b657004220420", "hex");

  return createPrivateKey({
    key: Buffer.concat([prefix, seed]),
    format: "der",
    type: "pkcs8"
  });
}

function keyIdFromPublicJwk(publicJwk) {
  const fingerprint = createHash("sha256")
    .update(canonicalizeJson({
      crv: publicJwk.crv,
      kty: publicJwk.kty,
      x: publicJwk.x
    }))
    .digest("hex")
    .slice(0, 16);

  return `provenance-ed25519-${fingerprint}`;
}

export function signingPrivateKeyFromSecret(secret) {
  const value = String(secret || "").trim();

  if (!value) {
    return null;
  }

  if (/^[0-9a-f]{64}$/i.test(value)) {
    return ed25519PrivateKeyFromSeed(Buffer.from(value, "hex"));
  }

  try {
    return createPrivateKey({
      key: JSON.parse(value),
      format: "jwk"
    });
  } catch (error) {
    throw new Error(`PROVENANCE_SIGNING_PRIVATE_KEY_JWK must be a private JWK JSON object or a 32-byte hex Ed25519 seed: ${error.message}`);
  }
}

export function publicJwkFromPrivateKey(privateKey) {
  const publicJwk = createPublicKey(privateKey).export({
    format: "jwk"
  });

  return {
    ...publicJwk,
    kid: publicJwk.kid || keyIdFromPublicJwk(publicJwk),
    alg: "EdDSA",
    use: "sig",
    key_ops: ["verify"]
  };
}

export function signProvenanceRecord(record, privateKey, publicJwk, createdAt) {
  const signature = {
    type: "DataIntegrityProof",
    algorithm: "Ed25519",
    canonicalization: "RFC8785",
    key_id: publicJwk.kid,
    created: createdAt,
    value: sign(null, canonicalSignaturePayload(record), privateKey).toString("base64url")
  };

  return {
    ...record,
    signature
  };
}

export function sourcePath(inputPath) {
  return String(inputPath || "").replace(/^\.\//, "");
}

export function isPublishedArticle(item) {
  const status = String(item.status || "published").toLowerCase();
  return status !== "draft" && status !== "private" && /^content\/\d{4}\/\d{2}\/[^/]+\.md$/.test(sourcePath(item.source_path));
}

export function siteBaseUrl(searchIndex) {
  return String(searchIndex.home_page_url || "https://vault.jamesburchill.com/").replace(/\/$/, "");
}

export function sitePathFromUrl(value, baseUrl) {
  const url = new URL(value, `${baseUrl}/`);

  if (url.origin !== new URL(baseUrl).origin) {
    throw new Error(`URL is outside the configured site: ${value}`);
  }

  return url.pathname;
}

export function htmlPathForUrl(value, baseUrl) {
  const pathname = sitePathFromUrl(value, baseUrl);
  const outputPath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;

  return path.join(outputDir, outputPath.replace(/^\//, ""));
}

export function provenancePathForUrl(value, baseUrl) {
  const pathname = sitePathFromUrl(value, baseUrl);
  const directory = pathname.endsWith("/") ? pathname : path.posix.dirname(pathname);

  return path.join(outputDir, directory.replace(/^\//, ""), "provenance.jsonld");
}

export function provenanceUrlForPage(value) {
  const url = new URL(value);
  const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  url.pathname = `${pathname}provenance.jsonld`;
  url.search = "";
  url.hash = "";

  return url.toString();
}

function parseScalar(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return "";
  }

  if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export async function readFrontMatter(inputPath) {
  const content = await readFile(sourcePath(inputPath), "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    return {};
  }

  const data = {};
  const lines = match[1].split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const field = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);

    if (!field) {
      continue;
    }

    const [, key, rawValue = ""] = field;
    const value = parseScalar(rawValue);

    if (value) {
      data[key] = value;
      continue;
    }

    const values = [];
    let cursor = index + 1;
    while (cursor < lines.length) {
      const child = lines[cursor].match(/^\s+-\s+(.*)$/);
      if (!child) {
        break;
      }

      values.push(parseScalar(child[1]));
      cursor += 1;
    }

    data[key] = values.length ? values : "";
    index = cursor - 1;
  }

  return data;
}

export function toIsoDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString();
}

export function gitValue(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return "";
  }
}

export function gitModifiedTime(inputPath) {
  return gitValue(["log", "-1", "--format=%cI", "--", sourcePath(inputPath)]);
}

export function currentGitCommit() {
  return process.env.GITHUB_SHA || gitValue(["rev-parse", "HEAD"]) || "";
}

export function buildMetadata() {
  const repository = process.env.GITHUB_REPOSITORY || "jamesburchill/vault";

  return {
    commit: currentGitCommit(),
    actor: process.env.GITHUB_ACTOR || "",
    repository,
    run_id: process.env.GITHUB_RUN_ID || "",
    run_number: process.env.GITHUB_RUN_NUMBER || ""
  };
}
