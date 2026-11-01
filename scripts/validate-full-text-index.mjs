import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const index = JSON.parse(await readFile('_site/full-text-index.json', 'utf8'));
const metadata = JSON.parse(await readFile('_site/search-index.json', 'utf8'));
assert.equal(index.version, 1);
assert.ok(Number.isFinite(Date.parse(index.generated_at)));
assert.ok(Buffer.byteLength(JSON.stringify(index)) <= 8_000_000, 'Index exceeds MCP fetch limit');
assert.deepEqual(index.items.map(item => item.url).sort(), metadata.items.map(item => item.url).sort());
assert.equal(new Set(index.items.map(item => item.url)).size, index.items.length);
for (const item of index.items) {
  assert.equal(item.status, 'published');
  assert.ok(item.content_html.trim().length > 0, `${item.slug}: missing body`);
  assert.ok(!item.content_html.includes('<footer'), `${item.slug}: site layout leaked into body`);
  assert.ok(item.canonical_url.startsWith('https://'));
  assert.ok(item.date_modified === null || /^\d{4}-\d{2}-\d{2}$/.test(item.date_modified));
  const source = await readFile(item.source_path, 'utf8');
  assert.ok(!/^status:\s*["']?(draft|private)\b/m.test(source.split(/^---\s*$/m)[1] || ''), `${item.slug}: unpublished source`);
}
console.log(`Validated full-text bodies and metadata for ${index.items.length} published articles.`);
