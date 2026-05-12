import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  buildMetadata,
  gitModifiedTime,
  htmlPathForUrl,
  indexPath,
  isPublishedArticle,
  outputDir,
  publicJwkFromPrivateKey,
  publicKeyPath,
  provenanceContext,
  provenancePathForUrl,
  provenanceUrlForPage,
  readFrontMatter,
  sha256Content,
  signProvenanceRecord,
  signingPrivateKeyFromSecret,
  siteBaseUrl,
  toIsoDate
} from "./provenance-utils.mjs";

const searchIndexPath = path.join(outputDir, "search-index.json");
const searchIndex = JSON.parse(await readFile(searchIndexPath, "utf8"));
const baseUrl = siteBaseUrl(searchIndex);
const generatedAt = new Date().toISOString();
const build = buildMetadata();
const signingPrivateKey = signingPrivateKeyFromSecret(process.env.PROVENANCE_SIGNING_PRIVATE_KEY_JWK);
const publicJwk = signingPrivateKey ? publicJwkFromPrivateKey(signingPrivateKey) : null;
const items = [];

for (const item of searchIndex.items.filter(isPublishedArticle)) {
  const frontMatter = await readFrontMatter(item.source_path);
  const pageUrl = item.url;
  const canonicalUrl = frontMatter.canonical_url || pageUrl;
  const htmlPath = htmlPathForUrl(pageUrl, baseUrl);
  const html = await readFile(htmlPath, "utf8");
  const contentHash = sha256Content(html);
  const provenanceUrl = provenanceUrlForPage(pageUrl);
  const provenancePath = provenancePathForUrl(pageUrl, baseUrl);
  const createdAt = toIsoDate(frontMatter.date || item.date_published);
  const frontMatterModifiedAt = toIsoDate(frontMatter.updated || frontMatter.modified);

  // Git metadata can be absent in shallow CI checkouts or source archives.
  // Falling back to build time keeps provenance generation non-blocking.
  const modifiedAt = frontMatterModifiedAt || toIsoDate(gitModifiedTime(item.source_path)) || generatedAt;

  const record = {
    "@context": provenanceContext,
    id: provenanceUrl,
    type: "ArticleProvenance",
    url: canonicalUrl,
    page_url: pageUrl,
    provenance_url: provenanceUrl,
    title: item.title,
    content_hash: contentHash,
    hash_algorithm: "sha256",
    created_at: createdAt,
    modified_at: modifiedAt,
    generated_at: generatedAt,
    source_path: item.source_path,
    source_url: item.repo_url,
    raw_markdown_url: item.raw_markdown_url,
    publisher: {
      name: "James Burchill",
      url: "https://jamesburchill.com/"
    },
    build,
    signing: publicJwk
      ? {
          status: "signed",
          algorithm: "Ed25519",
          canonicalization: "RFC8785",
          key_id: publicJwk.kid
        }
      : {
          status: "not_implemented",
          note: "Reserved for a future Ed25519, JWK, or DID signing layer."
        }
  };

  const signedRecord = publicJwk ? signProvenanceRecord(record, signingPrivateKey, publicJwk, generatedAt) : record;

  await mkdir(path.dirname(provenancePath), { recursive: true });
  await writeFile(provenancePath, `${JSON.stringify(signedRecord, null, 2)}\n`);

  items.push({
    url: canonicalUrl,
    page_url: pageUrl,
    provenance_url: provenanceUrl,
    content_hash: contentHash,
    modified_at: modifiedAt,
    title: item.title,
    source_path: item.source_path
  });
}

const index = {
  "@context": provenanceContext,
  id: `${baseUrl}/.well-known/provenance.json`,
  publisher: {
    name: "James Burchill",
    url: "https://jamesburchill.com/"
  },
  version: 1,
  generated_at: generatedAt,
  build,
  signing: publicJwk
    ? {
        status: "signed",
        algorithm: "Ed25519",
        canonicalization: "RFC8785",
        key_id: publicJwk.kid
      }
    : {
        status: "not_implemented",
        note: "Reserved for a future Ed25519, JWK, or DID signing layer."
      },
  items
};

const signedIndex = publicJwk ? signProvenanceRecord(index, signingPrivateKey, publicJwk, generatedAt) : index;

await mkdir(path.dirname(indexPath), { recursive: true });
await writeFile(indexPath, `${JSON.stringify(signedIndex, null, 2)}\n`);

if (publicJwk) {
  await writeFile(publicKeyPath, `${JSON.stringify(publicJwk, null, 2)}\n`);
}

console.log(`Generated ${publicJwk ? "signed " : ""}provenance for ${items.length} published articles.`);
