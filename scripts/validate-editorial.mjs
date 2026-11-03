import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const editorial = require('./editorial.cjs');
const nunjucks = require('nunjucks');
const origin = 'https://vault.jamesburchill.com';
const read = p => fs.readFileSync(path.join('_site', p), 'utf8');
const page = url => read(new URL(url, origin).pathname + 'index.html');
const index = JSON.parse(read('search-index.json')).items;
const full = JSON.parse(read('full-text-index.json')).items;
const feed = JSON.parse(read('feeds/vault.json')).items;
const urls = items => items.map(i => i.url).sort();
assert.deepEqual(urls(index), urls(full));
assert.deepEqual(urls(index), urls(feed));
const rss = read('feeds/rss.xml');
const sitemap = read('sitemap.xml');
const links = (html, base) => [...html.matchAll(/href="([^"]+)"/g)].map(m => new URL(m[1].replaceAll('&amp;', '&'), new URL(base, origin)));
const resolves = url => {
  if (url.origin !== origin) return;
  const dest = path.join('_site', decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
  assert.ok(fs.existsSync(dest), `Missing internal target ${url}`);
  if (url.hash && dest.endsWith('.html')) assert.ok(fs.readFileSync(dest, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${url}`);
};
for (const item of index) {
  const html = page(item.url);
  const meta = html.match(/<div class="article-meta">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(meta, item.slug + ': no metadata');
  assert.ok(meta.includes('James Burchill'));
  assert.ok(meta.includes(`datetime="${item.date_published}"`));
  const body = full.find(i => i.url === item.url);
  assert.equal(meta.includes('Revised'), !!body.date_modified);
  if (body.date_modified) assert.ok(meta.includes(`datetime="${body.date_modified}"`));
  assert.ok(html.includes('View source Markdown') && html.includes('Verified Provenance'));
  assert.ok(!html.includes('Get new essays and field notes by email.'));
  assert.ok(html.includes('Follow new writing by RSS'));
  assert.ok(rss.includes(item.url));
  assert.ok(sitemap.includes(item.url));
  const parts = new URL(item.url).pathname.split('/');
  for (const archive of [`/content/${parts[2]}/`, `/content/${parts[2]}/${parts[3]}/`]) {
    assert.ok(links(page(archive), archive).some(u => u.href === item.url), `${archive} omits ${item.slug}`);
  }
  const shared = (html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0] || '') + meta + (html.match(/<section class="next-reads"[\s\S]*?<\/section>/)?.[0] || '');
  links(shared, item.url).forEach(resolves);
  if (item.topics.includes('inside-the-architecture')) {
    assert.ok(!html.includes('class="next-reads"'), 'Series recommendations duplicated');
    links(body.content_html, item.url).forEach(resolves);
  }
}
for (const [url, count] of [['/', 3], ['/content/', 6]]) {
  const recent = page(url).split('<h2>Recent Writing</h2>')[1].split(/<h2/)[0];
  const actual = links(recent, url).map(u => u.href).filter(u => index.some(i => i.url === u));
  assert.deepEqual(actual, index.slice(0, count).map(i => i.url));
}
for (const subject of editorial.subjects) {
  const url = `/subjects/${subject.id}/`;
  const html = page(url);
  const actual = links(html, url).map(u => u.href).filter(u => index.some(i => i.url === u));
  const expected = index.filter(i => editorial.subjectsFor(i.topics).some(s => s.id === subject.id));
  assert.deepEqual(actual, expected.map(i => i.url));
  links(html, url).forEach(resolves);
}
for (const url of ['/', '/content/', '/reading-paths/', '/books-resources/']) links(page(url), url).forEach(resolves);
const env = nunjucks.configure('_includes', { autoescape: true });
const inactive = env.render('follow.njk', { subscription: { url: '' } });
assert.ok(!inactive.includes('by email'));
const active = env.render('follow.njk', { subscription: { url: 'https://example.com/approved-signup' } });
assert.ok(active.includes('href="https://example.com/approved-signup"'));
assert.ok(active.includes('by email') && active.includes('RSS') && !active.includes('<form'));
// Fallback must need two specific shared topics; it must never recommend itself.
const fixture = (slug, topics) => ({ url: `/${slug}/`, data: { slug, topics, date: '2026-01-01' } });
const a = fixture('a', ['ai', 'business', 'docker', 'security']);
const b = fixture('b', ['ai', 'business']);
const c = fixture('c', ['docker', 'security']);
assert.deepEqual(editorial.nextReads([a,b,c], '/a/').map(x => x.item.url), ['/c/']);
c.data.series = 'test';
assert.deepEqual(editorial.nextReads([a,b,c], '/a/'), []);
console.log(`Validated ${index.length} articles across archives, search, RSS, JSON feed, MCP and sitemap; subjects, dates, navigation, recommendations and subscription states passed.`);
