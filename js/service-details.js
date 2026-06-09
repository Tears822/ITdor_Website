(function () {
  "use strict";

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getSlugFromPath() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var match = path.match(/\/services\/([^/]+)\.html$/i);
    if (match) return decodeURIComponent(match[1]);
    if (/\/services\//i.test(path)) {
      match = path.match(/\/([^/]+)\.html$/i);
      if (match) return decodeURIComponent(match[1]);
    }
    return null;
  }

  function getServiceSlug() {
    return (
      window.ITDOR_SERVICE_SLUG ||
      getSlugFromPath() ||
      getParam("s") ||
      "application-support"
    );
  }

  function isInServicesDir() {
    var path = (window.location.pathname || "").replace(/\\/g, "/");
    var href = (window.location.href || "").replace(/\\/g, "/");
    return (
      /\/services\/[^/?#]+\.html/i.test(path) ||
      /\/services\/[^/?#]+\.html/i.test(href)
    );
  }

  function resolveAssetPath(assetPath) {
    if (!assetPath || /^https?:\/\//i.test(assetPath) || assetPath.indexOf("../") === 0) {
      return assetPath;
    }
    if (isInServicesDir()) {
      return "../" + assetPath.replace(/^\.\//, "");
    }
    return assetPath;
  }

  function servicePageUrl(slug) {
    return isInServicesDir() ? slug + ".html" : "services/" + slug + ".html";
  }

  function initServiceDetails() {
    if (!window.ITDOR_SERVICES_BY_SLUG) return;

    var slug = getServiceSlug();
    var service = window.ITDOR_SERVICES_BY_SLUG[slug] || window.ITDOR_SERVICES[0];
    var root = document.getElementById("service-details-root");
    if (!root) return;

    var list = window.ITDOR_SERVICES;
    var idx = list.findIndex(function (s) {
      return s.slug === service.slug;
    });
    var prev = list[(idx - 1 + list.length) % list.length];
    var next = list[(idx + 1) % list.length];

    document.title = service.title + " | IT Dor Services";

    var pageTitle = document.querySelector("[data-sd-page-title]");
    if (pageTitle) {
      pageTitle.textContent = service.title;
      pageTitle.classList.remove("split-text", "effect-right");
    }

    var breadcrumb = document.querySelector("[data-sd-breadcrumb]");
    if (breadcrumb) {
      breadcrumb.textContent = service.title;
      breadcrumb.classList.remove("split-text", "effect-right");
    }

    var imagePath = resolveAssetPath(service.image);

    var hero = root.querySelector("[data-sd-hero]");
    if (hero) {
      hero.src = imagePath;
      hero.setAttribute("data-src", imagePath);
      hero.alt = service.title;
    }

    var hero2 = root.querySelector("[data-sd-hero-2]");
    if (hero2) {
      hero2.src = imagePath;
      hero2.setAttribute("data-src", imagePath);
      hero2.alt = service.title;
    }

    var title = root.querySelector("[data-sd-title]");
    if (title) title.textContent = service.title;

    var desc = root.querySelector("[data-sd-desc]");
    if (desc) {
      desc.innerHTML =
        "<p class=\"lh-30\">" +
        service.intro +
        "</p><p class=\"lh-30\">" +
        service.description +
        " Contact us for a detailed quote.</p>";
    }

    var featuresTitle = root.querySelector("[data-sd-features-title]");
    if (featuresTitle) featuresTitle.textContent = "What's Included";

    var contactPath = isInServicesDir() ? "../contact.html" : "contact.html";

    var features = root.querySelector("[data-sd-features]");
    if (features && service.features) {
      features.innerHTML = service.features
        .map(function (feature, i) {
          return (
            '<div class="features-item"><div class="number-features fw-7">' +
            (i + 1) +
            '</div><div class="item-content"><a href="' +
            contactPath +
            '" class="body-2 fw-7">' +
            feature +
            '</a><p class="text lh-30">' +
            feature +
            "</p></div></div>"
          );
        })
        .join("");
    }

    var sidebarList = root.querySelector("[data-sd-sidebar-list]");
    if (sidebarList) {
      var popular = [
        "application-support",
        "software-development",
        "saas",
        "ai-ml",
        "cloud-devops",
        "ecommerce",
      ];
      sidebarList.innerHTML = popular
        .filter(function (s) {
          return s !== service.slug && window.ITDOR_SERVICES_BY_SLUG[s];
        })
        .slice(0, 5)
        .map(function (s) {
          var item = window.ITDOR_SERVICES_BY_SLUG[s];
          return (
            '<li class="item"><i class="icon-arrow-right"></i><a href="' +
            servicePageUrl(s) +
            '" class="body-2 fw-5">' +
            item.title +
            "</a></li>"
          );
        })
        .join("");
    }

    var prevBlock = root.querySelector(".prev-details");
    var nextBlock = root.querySelector(".next-details");
    if (prevBlock) {
      var prevHref = servicePageUrl(prev.slug);
      prevBlock.querySelectorAll("a").forEach(function (a) {
        a.href = prevHref;
      });
      var prevTitle = prevBlock.querySelector("[data-sd-prev-title]");
      if (prevTitle) prevTitle.textContent = prev.title;
    }
    if (nextBlock) {
      var nextHref = servicePageUrl(next.slug);
      nextBlock.querySelectorAll("a").forEach(function (a) {
        a.href = nextHref;
      });
      var nextTitle = nextBlock.querySelector("[data-sd-next-title]");
      if (nextTitle) nextTitle.textContent = next.title;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServiceDetails);
  } else {
    initServiceDetails();
  }
})();
