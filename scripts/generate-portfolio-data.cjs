const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = path.join(__dirname, "../image/portfolio/projects");
const OUT_FILE = path.join(__dirname, "../js/portfolio-data.js");
const EXCLUDE = new Set(["qualisage.com"]);
const FEATURED_FOLDERS = new Set([
  "crafterblue.com",
  "foodpanda.hk",
  "drinknixie.com",
  "ihuiwa.com"
]);

const META = {
  "abeiai.com": { title: "Abei AI", client: "AI Platform", shortDesc: "AI product experience with intelligent workflows and modern interface delivery." },
  "acgnai.art": { title: "ACGN AI", client: "Creative AI", shortDesc: "Creative AI platform with visual storytelling and responsive product UI." },
  "base.feishu.cn": { title: "Feishu Base", client: "Enterprise Productivity", shortDesc: "Data workspace with structured records, dashboards, and team workflows." },
  "beecut.cn": { title: "BeeCut", client: "Video & Media", shortDesc: "Media product UI focused on editing workflows and clear creative tooling." },
  "chanjing.cc": { title: "Chanjing", client: "Digital Product", shortDesc: "Product platform with structured content and conversion-focused layouts." },
  "crafterblue.com": { title: "Crafter Blue", client: "Retail & E-Commerce", shortDesc: "Shopify e-commerce with product storytelling and performance-focused frontend." },
  "d-mop.com": { title: "D-mop", client: "Fashion Retail", shortDesc: "Fashion commerce with category discovery and mobile-first merchandising." },
  "drinknixie.com": { title: "Drink Nixie", client: "Food & Beverage", shortDesc: "D2C beverage storefront with brand storytelling and mobile-first checkout." },
  "foodpanda.hk": { title: "foodpanda HK", client: "Food Delivery Platform", shortDesc: "High-traffic ordering flows with consistent frontend and rapid checkout UX." },
  "hhp.com.hk": { title: "HHP", client: "Retail & E-Commerce", shortDesc: "Commerce catalog with clean hierarchy and maintainable frontend components." },
  "hidreamai.com": { title: "HiDream AI", client: "AI Platform", shortDesc: "AI platform UI with model-driven experiences and scalable interface patterns." },
  "ihuiwa.com": { title: "iHUIWA", client: "Retail & E-Commerce", shortDesc: "Modern e-commerce with brand presentation and streamlined conversion flow." },
  "ipega.hk": { title: "IPEGA", client: "Consumer Electronics", shortDesc: "Product site with hardware-focused merchandising and responsive catalog UX." },
  "jimeng.jianying.com": { title: "Jimeng", client: "Creative Platform", shortDesc: "Creative product experience with media-rich layouts and smooth interactions." },
  "kizunaai.com": { title: "Kizuna AI", client: "Entertainment & Media", shortDesc: "Brand and content platform with engaging media presentation and community UX." },
  "marketing.k-fashionshop.com": { title: "K-Fashion Shop", client: "Fashion Retail", shortDesc: "Fashion marketing site with campaign layouts and product discovery paths." },
  "namkee.hk": { title: "Nam Kee", client: "Food & Hospitality", shortDesc: "Hospitality brand site with menu storytelling and location-focused content." },
  "oiad.hk": { title: "OIAD", client: "Professional Services", shortDesc: "Brand website with structured content and clear service messaging." },
  "order.sen-ryo.com.hk": { title: "Sen-Ryo Order", client: "Food & Hospitality", shortDesc: "Online ordering experience with streamlined menu flows and mobile checkout." },
  "petshack.hk": { title: "Petshack HK", client: "Pet Retail", shortDesc: "Pet retail e-commerce with trust cues and straightforward checkout." },
  "the-cubehouse.com": { title: "The Cube House", client: "Lifestyle Retail", shortDesc: "Lifestyle commerce balancing visual storytelling with conversion-focused UI." },
  "thehungryfamily.com": {
    title: "The Hungry Family",
    client: "Food & Lifestyle Media",
    shortDesc: "Editorial food platform with readable long-form content and scalable templates.",
    overview: [
      "The Hungry Family is a content-rich food and lifestyle platform built for frequent editorial publishing. Recipes, guides, and feature stories needed to stay readable during long scroll sessions while still giving new visitors clear paths into categories and featured collections.",
      "We structured article templates, category landing pages, and featured content modules so the editorial team can publish without developer support. Typography, spacing, and image treatment were tuned for food photography and long-form reading on both desktop and mobile.",
      "The build prioritized performance-conscious media delivery, semantic page structure, and reusable components that scale as new categories, campaigns, and sponsored features are introduced over time."
    ]
  },
  "whee.com": { title: "Whee", client: "Digital Product", shortDesc: "Product platform with polished UI, responsive layouts, and clear user journeys." }
};

function slugFromFolder(folder) {
  return folder.replace(/\./g, "-").replace(/_/g, "-");
}

function galleryFor(folder) {
  const dir = path.join(PROJECTS_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.png$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((f) => `image/portfolio/projects/${folder}/${f}`);
}

const folders = fs
  .readdirSync(PROJECTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !EXCLUDE.has(d.name))
  .map((d) => d.name)
  .sort();

function overviewFor(meta) {
  if (meta.overview && meta.overview.length) {
    return meta.overview;
  }

  var focus = meta.shortDesc.replace(/\.$/, "");
  return [
    meta.title + " is a " + meta.client.toLowerCase() + " engagement focused on " + focus.toLowerCase() + ". The experience needed to feel polished for everyday users while remaining practical for the team to extend with new pages, campaigns, and content updates.",
    "We shaped the frontend around reusable layout patterns, responsive breakpoints, and clear visual hierarchy so primary journeys stay fast and easy to scan. Component structure, media handling, and interaction details were aligned with how the product is maintained over time.",
    "Delivery emphasized performance, accessibility-minded markup, and a maintainable codebase the client can evolve without rework. The result is a stable foundation for ongoing growth across desktop, tablet, and mobile touchpoints."
  ];
}

function challengeFor(meta) {
  if (meta.challenge) return meta.challenge;
  return "The " + meta.title + " team needed a reliable web experience that could scale with growing traffic, content updates, and evolving product requirements without sacrificing speed or clarity.";
}

function solutionFor(meta) {
  if (meta.solution) return meta.solution;
  return "We delivered a responsive frontend with reusable components, optimized media handling, and a structure that supports ongoing merchandising, content, and feature updates.";
}

const projects = folders.map((folder, index) => {
  const meta = META[folder] || {
    title: folder.replace(/\.(com|hk|cn|cc|art)$/i, "").replace(/[-.]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    client: "Web Development",
    shortDesc: "Custom web product delivery with responsive UI and maintainable frontend architecture."
  };
  const gallery = galleryFor(folder);
  const image = gallery[0] || `image/portfolio/projects/${folder}/1.png`;
  const websiteUrl = `https://${folder.replace(/^marketing\./, "")}`;
  const overview = overviewFor(meta);

  return {
    slug: slugFromFolder(folder),
    id: String(index + 1),
    title: meta.title,
    category: "Web Development",
    folder,
    description: overview[0],
    shortDesc: meta.shortDesc,
    overview,
    challenge: challengeFor(meta),
    solution: solutionFor(meta),
    results: [
      "Responsive experience across desktop, tablet, and mobile",
      "Clear information hierarchy for faster user task completion",
      "Maintainable component structure for future updates",
      "Performance-conscious layout and asset delivery"
    ],
    duration: "3 months",
    image,
    gallery,
    technologies: ["Responsive UI", "JavaScript", "HTML", "CSS", "Web Development"],
    client: meta.client,
    location: folder.includes(".hk") ? "Hong Kong" : folder.includes(".cn") ? "China" : "Global",
    published: "2024",
    websiteUrl,
    featured: FEATURED_FOLDERS.has(folder)
  };
});

const file = `window.ITDOR_PORTFOLIO = ${JSON.stringify(projects, null, 2)};

window.ITDOR_PORTFOLIO_CATEGORIES = [
  "Show All",
  "Web Development"
];

window.ITDOR_PORTFOLIO_BY_SLUG = window.ITDOR_PORTFOLIO.reduce(function (acc, item) {
  acc[item.slug] = item;
  return acc;
}, {});
`;

fs.writeFileSync(OUT_FILE, file, "utf8");
console.log("Wrote", projects.length, "projects to", OUT_FILE);
