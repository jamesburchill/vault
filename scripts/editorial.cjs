// Explicit subject mappings; unmapped topics remain searchable.
const subjects = [
  { id: "building-with-ai", title: "Building with AI", topics: ["ai", "ai-governance", "autonomous-agents", "local-ai", "local-first-ai", "mcp", "safeagent", "token-accounting"] },
  { id: "architecture-and-operations", title: "Architecture and Operations", topics: ["architecture", "operational-resilience", "containerization", "docker", "security", "software-engineering", "software-supply-chain", "interoperability", "data-portability", "tech-stack"] },
  { id: "business-and-product", title: "Business and Product", topics: ["business", "product", "marketing", "solopreneur", "strategy"] },
  { id: "writing-and-judgement", title: "Writing and Judgement", pathAnchor: "writing-and-judgment", topics: ["publishing", "markdown", "decisions", "mindset", "ai-search"] }
];
const selections = {
  "by-inches": [{ slug: "ai-can-generate-software-reality-still-gets-a-vote", reason: "Take the question of assumptions into building software with AI." }],
  "send-your-ai-assistant-to-my-mcp-service": [{ slug: "give-your-mcp-service-a-predictable-address", reason: "Make the connection easier to find and explain." }, { slug: "your-next-customer-might-send-an-ai-agent", reason: "Explore what this means for a business and its customers." }],
  "give-your-mcp-service-a-predictable-address": [] // Already ends with editorial reading links.
};
const types = { "by-inches": "Essay", "send-your-ai-assistant-to-my-mcp-service": "Field Note", "give-your-mcp-service-a-predictable-address": "Guide" };
function subjectsFor(topics = []) { return subjects.filter(s => s.topics.some(t => topics.includes(t))); }
function hasReadingNavigation(item) {
  return item.data.series || (item.data.topics || []).includes("inside-the-architecture") || /(?:<strong>(?:Next|Previous|Start the series):|<h[2-6][^>]*>(?:Related (?:reading|articles)|Read next|Next reads))/i.test(item.templateContent || "");
}
function nextReads(items, url) {
  const current = items.find(i => i.url === url);
  if (!current || hasReadingNavigation(current) || current.data.related_reading === false) return [];
  const explicit = current.data.related_reading || selections[current.data.slug];
  if (explicit) return explicit.map(entry => ({ item: items.find(i => i.data.slug === entry.slug && i.url !== url), reason: entry.reason || "" })).filter(x => x.item).slice(0, 2);
  const broad = new Set(["general", "notes", "ai", "business", "tech-with-a-twist", "because-drift-happens", "systems", "tooljar"]);
  const topics = (current.data.topics || []).filter(t => !broad.has(t));
  return items.filter(i => i.url !== url && !hasReadingNavigation(i)).map(item => ({ item, score: (item.data.topics || []).filter(t => topics.includes(t)).length })).filter(x => x.score >= 2).sort((a,b) => b.score - a.score || new Date(b.item.data.date) - new Date(a.item.data.date)).slice(0, 2);
}
module.exports = { subjects, subjectsFor, nextReads, types };
