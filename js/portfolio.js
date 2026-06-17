(function () {
  "use strict";

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function portfolioDetailsUrl(slug) {
    return "porfolio-details.html?p=" + slug;
  }

  function portfolioCardHtml(project) {
    var url = portfolioDetailsUrl(project.slug);
    return (
      '<a href="' +
      url +
      '" class="portfolio-marquee-card">' +
      '<div class="portfolio-marquee-card-image">' +
      '<img src="' +
      project.image +
      '" alt="' +
      project.title +
      '" loading="lazy">' +
      "</div>" +
      '<div class="portfolio-marquee-card-body">' +
      '<span class="portfolio-marquee-card-tag body-2">' +
      project.category +
      "</span>" +
      '<h3 class="portfolio-marquee-card-title">' +
      project.title +
      "</h3>" +
      '<p class="portfolio-marquee-card-desc body-2">' +
      project.shortDesc +
      "</p>" +
      "</div>" +
      "</a>"
    );
  }

  function fillMarqueeRow(rowEl, projects) {
    if (!rowEl || !projects.length) return;
    var cards = projects.map(portfolioCardHtml).join("");
    rowEl.innerHTML = cards + cards;
  }

  function initPortfolioCarousel() {
    var row1 = document.getElementById("portfolio-row-1");
    var row2 = document.getElementById("portfolio-row-2");
    if (!row1 || !row2 || !window.ITDOR_PORTFOLIO) return;

    var list = window.ITDOR_PORTFOLIO;
    var split = Math.ceil(list.length / 2);
    var topRow = list.slice(0, split);
    var bottomRow = list.slice(split);

    fillMarqueeRow(row1, topRow);
    fillMarqueeRow(row2, bottomRow);
  }

  function initPortfolioGrid() {
    var grid = document.getElementById("portfolio-grid");
    if (!grid || !window.ITDOR_PORTFOLIO) return;

    grid.innerHTML = window.ITDOR_PORTFOLIO
      .map(function (project) {
        var url = portfolioDetailsUrl(project.slug);
        return (
          '<div class="col-sm-6 portfolio-col" data-category="' +
          project.category +
          '">' +
          '<div class="project-gird-item project-item portfolio-case-card">' +
          '<a href="' +
          url +
          '" class="image"><img src="' +
          project.image +
          '" data-src="' +
          project.image +
          '" alt="' +
          project.title +
          '" class="lazyload"></a>' +
          '<div class="item-content">' +
          '<div class="sub-title body-2 fw-7">' +
          project.category +
          "</div>" +
          '<h3 class="title-project"><a href="' +
          url +
          '">' +
          project.title +
          "</a></h3>" +
          '<p class="portfolio-case-desc lh-30 body-2">' +
          project.shortDesc +
          "</p>" +
          '<div class="portfolio-case-meta body-2">' +
          "<span><strong>Client:</strong> " +
          project.client +
          "</span>" +
          "<span><strong>Duration:</strong> " +
          project.duration +
          "</span>" +
          "</div>" +
          '<div class="portfolio-case-cta">' +
          '<a href="' +
          url +
          '" class="tf-btn-readmore style-open portfolio-case-link"><span class="plus">+</span><span class="text">View Case Study</span></a>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
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

    var slug = getParam("p") || "crafterblue-com";
    var project = window.ITDOR_PORTFOLIO_BY_SLUG[slug] || window.ITDOR_PORTFOLIO[0];
    var list = window.ITDOR_PORTFOLIO;
    var idx = list.findIndex(function (p) {
      return p.slug === project.slug;
    });
    var prev = list[(idx - 1 + list.length) % list.length];
    var next = list[(idx + 1) % list.length];

    document.title = project.title + " Case Study | IT Dor Services";

    root.querySelector("[data-pd-hero]").src = project.image;
    root.querySelector("[data-pd-hero]").alt = project.title;
    root.querySelector("[data-pd-title]").textContent = project.title;
    root.querySelector("[data-pd-lead]").textContent = project.shortDesc;

    var summary = root.querySelector("[data-pd-overview]");
    if (summary) {
      var paragraphs = project.overview || [project.description];
      summary.innerHTML = paragraphs
        .map(function (text) {
          return '<p class="lh-30">' + text + "</p>";
        })
        .join("");
    }

    root.querySelector("[data-pd-category]").textContent = project.category;
    root.querySelector("[data-pd-client]").textContent = project.client;
    root.querySelector("[data-pd-location]").textContent = project.location;
    root.querySelector("[data-pd-published]").textContent = project.published;

    var duration = root.querySelector("[data-pd-duration]");
    if (duration) duration.textContent = project.duration || "—";

    var website = root.querySelector("[data-pd-website]");
    if (website) {
      if (project.websiteUrl) {
        website.href = project.websiteUrl;
        website.textContent = project.websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
        website.style.display = "";
      } else {
        website.style.display = "none";
      }
    }

    var challenge = root.querySelector("[data-pd-challenge]");
    if (challenge) challenge.textContent = project.challenge || project.description;

    var solution = root.querySelector("[data-pd-solution]");
    if (solution) solution.textContent = project.solution || project.description;

    var results = root.querySelector("[data-pd-results]");
    if (results && project.results) {
      results.innerHTML = project.results
        .map(function (item) {
          return (
            '<div class="benefit-item"><i class="icon-check"></i><span class="lh-30 body-2">' +
            item +
            "</span></div>"
          );
        })
        .join("");
    }

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

    var prevUrl = portfolioDetailsUrl(prev.slug);
    var nextUrl = portfolioDetailsUrl(next.slug);
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
    initPortfolioCarousel();
    initPortfolioGrid();
    initGridFilter();
    initDetailsPage();
  });
})();
