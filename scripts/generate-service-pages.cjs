/**
 * Generates services/<slug>.html for each entry in service-data.js
 * Run: node scripts/generate-service-pages.cjs
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const templatePath = path.join(root, "services-details.html");
const outDir = path.join(root, "services");

const dataJs = fs.readFileSync(path.join(root, "js", "service-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataJs, sandbox);
const services = sandbox.window.ITDOR_SERVICES;

const template = fs.readFileSync(templatePath, "utf8");

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toSubfolderHtml(html, service) {
  const slug = service.slug;
  const title = escapeHtml(service.title);

  return html
    .replace(/\b(href|src|action)="(?!https?:|#|mailto:|tel:|javascript:|\.\/contact\/)([^"]+)"/g, function (_, attr, url) {
      if (url.startsWith("../")) return attr + '="' + url + '"';
      return attr + '="../' + url + '"';
    })
    .replace(
      /(<script src="\.\.\/js\/service-data\.js"><\/script>)\s*(<script src="\.\.\/js\/service-details\.js"><\/script>)/,
      '$1\n    <script>window.ITDOR_SERVICE_SLUG="' + slug + '";</script>\n    $2'
    )
    .replace(/data-sd-page-title>\s*Application Support\s*/g, "data-sd-page-title>\n                        " + title + "\n                    ")
    .replace(/data-sd-breadcrumb>Application Support/g, "data-sd-breadcrumb>" + title)
    .replace(/data-sd-title>Application Support/g, "data-sd-title>" + title)
    .replace(/data-src="[^"]*application_support\.avif"/g, 'data-src="../' + service.image + '"')
    .replace(/src="[^"]*application_support\.avif"/g, 'src="../' + service.image + '"')
    .replace(/alt="Application Support"/g, 'alt="' + title + '"');
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

services.forEach(function (service) {
  const filePath = path.join(outDir, service.slug + ".html");
  fs.writeFileSync(filePath, toSubfolderHtml(template, service), "utf8");
  console.log("Created:", "services/" + service.slug + ".html");
});

console.log("Done. Generated", services.length, "service detail pages.");
