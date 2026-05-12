import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  canonicalSignaturePayload,
  htmlPathForUrl,
  indexPath,
  isSignaturePresent,
  isPublishedArticle,
  outputDir,
  provenancePathForUrl,
  publicKeyPath,
  sha256Content,
  siteBaseUrl,
  verifyEd25519Signature
} from "./provenance-utils.mjs";

const searchIndexPath = path.join(outputDir, "search-index.json");
const requireSignatures = /^(1|true|yes)$/i.test(process.env.REQUIRE_PROVENANCE_SIGNATURES || "");
const errors = [];

function requireFields(record, fields, label) {
  for (const field of fields) {
    if (record[field] === undefined || record[field] === "") {
      errors.push(`${label}: missing required field "${field}"`);
    }
  }
}

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    errors.push(`${label}: invalid or missing JSON at ${filePath}: ${error.message}`);
    return null;
  }
}

async function readOptionalJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return null;
  }
}

async function loadPublicKey() {
  if (process.env.PROVENANCE_PUBLIC_KEY_JWK) {
    try {
      return JSON.parse(process.env.PROVENANCE_PUBLIC_KEY_JWK);
    } catch (error) {
      errors.push(`PROVENANCE_PUBLIC_KEY_JWK: invalid JSON: ${error.message}`);
      return null;
    }
  }

  return readOptionalJson(publicKeyPath);
}

function validateCanonicalPayload(record, label) {
  try {
    canonicalSignaturePayload(record);
  } catch (error) {
    errors.push(`${label}: cannot canonicalize signature payload: ${error.message}`);
  }
}

function validateSignature(record, label, publicKeyJwk) {
  validateCanonicalPayload(record, label);

  if (!isSignaturePresent(record)) {
    if (requireSignatures) {
      errors.push(`${label}: missing required signature`);
    }
    return;
  }

  requireFields(record.signature, ["type", "algorithm", "canonicalization", "key_id", "created", "value"], `${label} signature`);

  if (record.signature.algorithm !== "Ed25519") {
    errors.push(`${label} signature: algorithm must be Ed25519`);
  }

  if (record.signature.canonicalization !== "RFC8785") {
    errors.push(`${label} signature: canonicalization must be RFC8785`);
  }

  if (!publicKeyJwk) {
    errors.push(`${label}: signature is present but no public key was found in ${publicKeyPath} or PROVENANCE_PUBLIC_KEY_JWK`);
    return;
  }

  if (publicKeyJwk.kid && record.signature.key_id !== publicKeyJwk.kid) {
    errors.push(`${label} signature: key_id does not match public key kid`);
  }

  try {
    if (!verifyEd25519Signature(record, publicKeyJwk)) {
      errors.push(`${label}: signature verification failed`);
    }
  } catch (error) {
    errors.push(`${label}: signature verification failed: ${error.message}`);
  }
}

const publicKeyJwk = await loadPublicKey();
const searchIndex = await readJson(searchIndexPath, "search index");
const provenanceIndex = await readJson(indexPath, "site provenance index");

if (searchIndex && provenanceIndex) {
  const baseUrl = siteBaseUrl(searchIndex);
  const articles = searchIndex.items.filter(isPublishedArticle);
  const provenanceItems = Array.isArray(provenanceIndex.items) ? provenanceIndex.items : [];
  const provenanceByPageUrl = new Map(provenanceItems.map((item) => [item.page_url || item.url, item]));

  requireFields(provenanceIndex, ["@context", "id", "publisher", "version", "generated_at", "items"], "site provenance index");
  validateSignature(provenanceIndex, "site provenance index", publicKeyJwk);

  if (!Array.isArray(provenanceIndex.items)) {
    errors.push("site provenance index: items must be an array");
  }

  if (provenanceItems.length !== articles.length) {
    errors.push(`site provenance index: expected ${articles.length} items, found ${provenanceItems.length}`);
  }

  for (const article of articles) {
    const indexItem = provenanceByPageUrl.get(article.url);
    if (!indexItem) {
      errors.push(`${article.source_path}: missing provenance index item`);
      continue;
    }

    requireFields(indexItem, ["url", "page_url", "provenance_url", "content_hash", "modified_at", "title", "source_path"], article.source_path);

    const htmlPath = htmlPathForUrl(indexItem.page_url, baseUrl);
    let expectedHash = "";

    try {
      expectedHash = sha256Content(await readFile(htmlPath, "utf8"));
    } catch (error) {
      errors.push(`${article.source_path}: unable to read rendered HTML at ${htmlPath}: ${error.message}`);
    }

    if (expectedHash && indexItem.content_hash !== expectedHash) {
      errors.push(`${article.source_path}: index hash does not match rendered HTML`);
    }

    const articleProvenancePath = provenancePathForUrl(indexItem.page_url, baseUrl);
    const articleProvenance = await readJson(articleProvenancePath, `${article.source_path} provenance`);

    if (!articleProvenance) {
      continue;
    }

    requireFields(
      articleProvenance,
      [
        "@context",
        "id",
        "type",
        "url",
        "page_url",
        "provenance_url",
        "title",
        "content_hash",
        "created_at",
        "modified_at",
        "generated_at",
        "source_path",
        "publisher",
        "build"
      ],
      `${article.source_path} provenance`
    );
    validateSignature(articleProvenance, `${article.source_path} provenance`, publicKeyJwk);

    if (articleProvenance.content_hash !== expectedHash) {
      errors.push(`${article.source_path}: article provenance hash does not match rendered HTML`);
    }

    if (articleProvenance.content_hash !== indexItem.content_hash) {
      errors.push(`${article.source_path}: article provenance hash does not match site index`);
    }

    if (articleProvenance.provenance_url !== indexItem.provenance_url) {
      errors.push(`${article.source_path}: article provenance URL does not match site index`);
    }

    if (articleProvenance.source_path !== article.source_path) {
      errors.push(`${article.source_path}: article provenance source path does not match source index`);
    }
  }
}

if (errors.length) {
  console.error(`Provenance validation failed:\n${errors.join("\n")}`);
  process.exit(1);
}

console.log("Provenance validation passed.");
