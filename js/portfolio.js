(function () {
  "use strict";

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function initGridFilter() {
    var grid = document.getElementById("portfolio-grid");
    var tabs = document.querySelectorAll("[data-portfolio-filter]");
    if (!grid || !tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function (e) {
        e.preventDefault();
        var filter = tab.getAttribute("data-portfolio-filter");
        tabs.forEach(function (t) {
          t.classList.toggle("active", t === tab);
        });
        grid.querySelectorAll("[data-category]").forEach(function (col) {
          var show = filter === "all" || col.getAttribute("data-category") === filter;
          col.style.display = show ? "" : "none";
        });
      });
    });
  }

  function initDetailsPage() {
    var root = document.getElementById("portfolio-details-root");
    if (!root || !window.ITDOR_PORTFOLIO_BY_SLUG) return;

    var slug = getParam("p") || "ecommerce-platform";
    var project = window.ITDOR_PORTFOLIO_BY_SLUG[slug] || window.ITDOR_PORTFOLIO[0];
    var list = window.ITDOR_PORTFOLIO;
    var idx = list.findIndex(function (p) {
      return p.slug === project.slug;
    });
    var prev = list[(idx - 1 + list.length) % list.length];
    var next = list[(idx + 1) % list.length];

    document.title = project.title + " | IT Dor Services";

    root.querySelector("[data-pd-hero]").src = project.image;
    root.querySelector("[data-pd-hero]").alt = project.title;
    root.querySelector("[data-pd-title]").textContent = project.title;
    root.querySelector("[data-pd-lead]").textContent = project.description;
    root.querySelector("[data-pd-summary]").textContent = project.description;
    root.querySelector("[data-pd-category]").textContent = project.category;
    root.querySelector("[data-pd-client]").textContent = project.client;
    root.querySelector("[data-pd-location]").textContent = project.location;
    root.querySelector("[data-pd-published]").textContent = project.published;

    var benefits = root.querySelector("[data-pd-benefits]");
    if (benefits) {
      benefits.innerHTML = project.technologies
        .map(function (tech) {
          return (
            '<div class="benefit-item"><i class="icon-check"></i><span class="lh-30 body-2">' +
            tech +
            "</span></div>"
          );
        })
        .join("");
    }

    var gallery = root.querySelector("[data-pd-gallery]");
    if (gallery && project.gallery) {
      gallery.innerHTML = project.gallery
        .slice(0, 3)
        .map(function (img) {
          return (
            '<div class="image flex-grow-1"><img src="' +
            img +
            '" data-src="' +
            img +
            '" alt="' +
            project.title +
            '" class="lazyload"></div>'
          );
        })
        .join("");
    }

    var tags = root.querySelector("[data-pd-tags]");
    if (tags) {
      tags.innerHTML = project.technologies
        .slice(0, 4)
        .map(function (tech) {
          return '<a href="porfolio-grid.html" class="tabs-item fw-5">' + tech + "</a>";
        })
        .join("");
    }

    var prevUrl = "porfolio-details.html?p=" + prev.slug;
    var nextUrl = "porfolio-details.html?p=" + next.slug;
    root.querySelectorAll(".pd-prev-link").forEach(function (el) {
      el.href = prevUrl;
    });
    root.querySelectorAll(".pd-next-link").forEach(function (el) {
      el.href = nextUrl;
    });
    var prevTitle = root.querySelector(".pd-prev-title");
    var nextTitle = root.querySelector(".pd-next-title");
    var prevImg = root.querySelector(".pd-prev-img");
    var nextImg = root.querySelector(".pd-next-img");
    if (prevTitle) prevTitle.textContent = prev.title;
    if (nextTitle) nextTitle.textContent = next.title;
    if (prevImg) {
      prevImg.src = prev.image;
      prevImg.setAttribute("data-src", prev.image);
    }
    if (nextImg) {
      nextImg.src = next.image;
      nextImg.setAttribute("data-src", next.image);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGridFilter();
    initDetailsPage();
  });
})();
