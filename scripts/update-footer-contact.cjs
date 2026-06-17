const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const whatsappBlock =
  /\s*<li class="footer-contact-item">\s*<span class="icon-whatsapp" aria-hidden="true"><\/span>\s*<a href="https:\/\/wa\.me\/16177129076" target="_blank" rel="noopener" class="contact-whatsapp-link fw-5">\+1 \(617\) 712-9076<\/a>\s*<\/li>/g;

const phoneClassFix = /class="fw-6">\+1 \(617\) 712-9076<\/a>/g;
const phoneClassReplacement = 'class="fw-5">+1 (617) 712-9076</a>';

let updated = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;

    let content = fs.readFileSync(fullPath, "utf8");
    const original = content;

    content = content.replace(whatsappBlock, "");
    content = content.replace(phoneClassFix, phoneClassReplacement);

    if (content !== original) {
      fs.writeFileSync(fullPath, content);
      updated += 1;
      console.log(fullPath);
    }
  }
}

walk(root);
console.log("Updated files:", updated);
