/**
 * Adds tawk-to.js to all HTML pages. Run: node js/inject-tawk.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const marker = "tawk-to.js";

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(marker)) continue;

  const inServices = file.includes(path.sep + "services" + path.sep);
  const src = inServices ? "../js/tawk-to.js" : "js/tawk-to.js";
  const snippet = '    <script src="' + src + '"></script>\n';

  if (html.includes('src="js/main.js"')) {
    html = html.replace(
      '<script type="text/javascript" src="js/main.js"></script>',
      '<script type="text/javascript" src="js/main.js"></script>\n' + snippet.trimEnd()
    );
  } else if (html.includes('src="../js/main.js"')) {
    html = html.replace(
      '<script type="text/javascript" src="../js/main.js"></script>',
      '<script type="text/javascript" src="../js/main.js"></script>\n' + snippet.trimEnd()
    );
  } else {
    html = html.replace("</body>", snippet + "</body>");
  }

  fs.writeFileSync(file, html, "utf8");
  count++;
  console.log("updated:", path.relative(root, file));
}

console.log("Done. Updated", count, "files.");
