const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const exts = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg", ".ico", ".bmp"]);

function walk(dir, files = [], filter) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    try {
      if (fs.statSync(p).isDirectory()) walk(p, files, filter);
      else if (!filter || filter(name)) files.push(p);
    } catch (e) {}
  }
  return files;
}

const refs = new Map();

function addRef(raw, source) {
  let ref = raw.trim();
  if (!ref || /^data:/.test(ref) || /^https?:\/\//.test(ref) || ref.startsWith("//")) return;
  ref = ref.split("?")[0].split("#")[0];
  if (ref.startsWith("./")) ref = ref.slice(2);
  if (ref.startsWith("/")) ref = ref.slice(1);
  if (!ref || ref.includes("${")) return;
  const ext = path.extname(ref).toLowerCase();
  if (!exts.has(ext)) return;
  if (!refs.has(ref)) refs.set(ref, new Set());
  refs.get(ref).add(path.relative(root, source));
}

const patterns = [
  /(?:src|href|data-src|content)\s*=\s*["']([^"']+)["']/gi,
  /url\(\s*["']?([^"')\s]+)["']?\s*\)/gi,
  /(?:image|listImage|gallery):\s*["']([^"']+)["']/gi,
];

for (const file of walk(root, [], (n) => /\.(html|css|js)$/i.test(n))) {
  const text = fs.readFileSync(file, "utf8");
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) addRef(m[1], file);
  }
}

function resolveExists(ref, sourceFile) {
  const sourceDir = path.dirname(sourceFile);
  const candidates = [
    path.join(root, ref),
    path.normalize(path.join(sourceDir, ref)),
    path.join(root, ref.replace(/^(\.\.\/)+/, "")),
  ];
  return candidates.find((c) => fs.existsSync(c)) || null;
}

const missing = [];
const external = new Set();

for (const file of walk(root, [], (n) => /\.(html|css|js)$/i.test(n))) {
  const text = fs.readFileSync(file, "utf8");
  const re = /https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|gif|webp|avif|svg)/gi;
  let m;
  while ((m = re.exec(text))) external.add(m[0]);
}

for (const [ref, sources] of [...refs.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const sourceFiles = [...sources].map((s) => path.join(root, s));
  const found = sourceFiles.map((sf) => resolveExists(ref, sf)).find(Boolean);
  if (!found) {
    missing.push({ ref, sources: [...sources], category: ref.split("/")[0] || ref });
  }
}

const grouped = {};
for (const m of missing) {
  grouped[m.category] = grouped[m.category] || [];
  grouped[m.category].push(m);
}

console.log(JSON.stringify({
  summary: {
    totalReferencedLocalImages: refs.size,
    missingCount: missing.length,
    externalUrlCount: external.size,
  },
  missingByFolder: Object.fromEntries(
    Object.entries(grouped).map(([k, v]) => [k, v.map((x) => ({ path: x.ref, usedIn: x.sources }))])
  ),
  externalUrls: [...external],
  recommendedDownloads: missing.map((m) => ({
    saveAs: m.ref.replace(/^(\.\.\/)+/, ""),
    note: "Referenced in: " + m.sources.slice(0, 2).join(", ") + (m.sources.length > 2 ? "..." : ""),
  })),
}, null, 2));
