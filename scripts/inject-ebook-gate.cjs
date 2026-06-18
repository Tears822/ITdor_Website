const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const marker = 'src="js/ebook-lead-gate.js"';
const insertRoot =
  '    <script src="js/site-config.js"></script>\n    <script src="js/ebook-lead-gate.js"></script>';
const insertSub =
  '    <script src="../js/site-config.js"></script>\n    <script src="../js/ebook-lead-gate.js"></script>';

let updated = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "ebook") continue;
      walk(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;

    let content = fs.readFileSync(fullPath, "utf8");
    if (content.includes(marker)) continue;

    const isSubfolder = fullPath.includes(path.sep + "services" + path.sep);
    const siteConfigNeedle = isSubfolder
      ? '<script src="../js/site-config.js"></script>'
      : '<script src="js/site-config.js"></script>';

    if (!content.includes(siteConfigNeedle)) continue;

    content = content.replace(
      siteConfigNeedle,
      isSubfolder ? insertSub : insertRoot
    );
    fs.writeFileSync(fullPath, content);
    updated += 1;
    console.log(fullPath);
  }
}

walk(root);
console.log("Injected ebook gate into", updated, "files");
