(function () {
  "use strict";

  var posts = window.ITDOR_BLOG || [];

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDateLong(dateStr) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function formatDateShort(dateStr) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function formatDateParts(dateStr) {
    var d = new Date(dateStr + "T12:00:00");
    return {
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "long" })
    };
  }

  function postUrl(slug) {
    return "blog-details.html?p=" + encodeURIComponent(slug);
  }

  function renderInlineBold(text) {
    return text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  function renderBody(body) {
    var blocks = body.split(/\n\n+/).filter(Boolean);
    return blocks
      .map(function (block) {
        var lines = block
          .trim()
          .split("\n")
          .map(function (l) {
            return l.trim();
          })
          .filter(Boolean);

        if (
          lines.length === 1 &&
          lines[0].indexOf("**") === 0 &&
          lines[0].lastIndexOf("**") === lines[0].length - 2
        ) {
          return (
            '<h3 class="title fs-26 fw-7 mb-15">' +
            escapeHtml(lines[0].replace(/\*\*/g, "")) +
            "</h3>"
          );
        }

        if (lines.length > 0 && lines.every(function (line) { return line.indexOf("- ") === 0; })) {
          return (
            '<ul class="list-style mb-30">' +
            lines
              .map(function (line) {
                return (
                  '<li class="lh-30 mb-10">' +
                  renderInlineBold(escapeHtml(line.slice(2).trim())) +
                  "</li>"
                );
              })
              .join("") +
            "</ul>"
          );
        }

        if (lines.length > 0 && /^\d+\.\s/.test(lines[0])) {
          return (
            '<ol class="mb-30 ps-20">' +
            lines
              .map(function (line) {
                return (
                  '<li class="lh-30 mb-10">' +
                  renderInlineBold(escapeHtml(line.replace(/^\d+\.\s*/, ""))) +
                  "</li>"
                );
              })
              .join("") +
            "</ol>"
          );
        }

        return (
          '<p class="desc lh-30 mb-25">' +
          renderInlineBold(escapeHtml(lines.join(" "))) +
          "</p>"
        );
      })
      .join("");
  }

  function renderTags(tags) {
    return tags
      .map(function (tag) {
        return '<a href="blog-standard.html" class="item">' + escapeHtml(tag) + "</a>";
      })
      .join("");
  }

  function renderGridCard(post) {
    var url = postUrl(post.slug);
    return (
      '<div class="fl-item">' +
      '<div class="tf-post-grid hover-image">' +
      '<div class="top">' +
      '<a href="' + url + '" class="image">' +
      '<img src="' + post.image + '" data-src="' + post.image + '" alt="' + escapeHtml(post.title) + '" class="lazyload">' +
      "</a>" +
      '<div class="post-content px-md-15">' +
      '<div class="category-post">' + renderTags(post.tags.slice(0, 2)) + "</div>" +
      '<h6 class="title lh-32"><a href="' + url + '" class="line-clamp-3">' + escapeHtml(post.title) + "</a></h6>" +
      "</div></div>" +
      '<div class="bottom-item px-md-15"><i class="icon-email"></i><span>' + formatDateLong(post.date) + "</span></div>" +
      "</div></div>"
    );
  }

  function renderListCard(post) {
    var url = postUrl(post.slug);
    var parts = formatDateParts(post.date);
    var img = post.listImage || post.image;
    return (
      '<div class="fl-item2">' +
      '<div class="tf-post-grid style-desc hover-image">' +
      '<div class="top">' +
      '<a href="' + url + '" class="image">' +
      '<img src="' + img + '" data-src="' + img + '" alt="' + escapeHtml(post.title) + '" class="lazyload">' +
      "</a>" +
      '<a href="' + url + '" class="date"><span class="day">' + parts.day + '</span><span class="caption-1">' + parts.month + "</span></a>" +
      '<div class="category-post">' + renderTags(post.tags.slice(0, 2)) + "</div>" +
      "</div>" +
      '<div class="post-content">' +
      '<h3 class="title lh-40"><a href="' + url + '" class="line-clamp-3">' + escapeHtml(post.title) + "</a></h3>" +
      '<p class="sub-title lh-30">' + escapeHtml(post.excerpt) + "</p>" +
      '<div class="bottom-post wow fadeInUp">' +
      '<a href="' + url + '" class="tf-btn style-small style-border border-color-border"><span>Read more</span><i class="icon-arrow-right"></i></a>' +
      "</div></div></div></div>"
    );
  }

  function renderSmallPost(post) {
    var url = postUrl(post.slug);
    return (
      '<div class="tf-post-list style-small hover-img">' +
      '<a href="' + url + '" class="image">' +
      '<img src="' + post.image + '" data-src="' + post.image + '" alt="' + escapeHtml(post.title) + '" class="lazyload">' +
      "</a>" +
      '<div class="post-content">' +
      '<div class="post-date"><i class="icon-email"></i><span>' + formatDateShort(post.date) + "</span></div>" +
      '<a href="' + url + '" class="body-2">' + escapeHtml(post.title) + "</a>" +
      "</div></div>"
    );
  }

  function renderTeaserPost(post) {
    var url = postUrl(post.slug);
    return (
      '<div class="col-lg-6 blog-teaser-col">' +
      '<div class="tf-post-list style-2 hover-image blog-teaser-card">' +
      '<div class="post-content">' +
      '<div class="top-post">' +
      '<div class="post-meta">' +
      '<a href="' + url + '" class="text-medium">' + formatDateLong(post.date) + "</a>" +
      '<span class="line"></span><span class="text-medium">' + escapeHtml(post.author) + "</span>" +
      "</div>" +
      '<h5 class="title fw-5"><a href="' + url + '">' + escapeHtml(post.title) + "</a></h5>" +
      "</div>" +
      '<div class="bottom-post">' +
      '<div class="desc lh-30 line-clamp-4">' + escapeHtml(post.excerpt) + "</div>" +
      '<a href="' + url + '" class="tf-btn-readmore style-open"><span class="plus">+</span><span class="text">Read More</span></a>' +
      "</div></div>" +
      '<a href="' + url + '" class="image">' +
      '<img src="' + post.image + '" alt="' + escapeHtml(post.title) + '">' +
      "</a></div></div>"
    );
  }

  function refreshLazyImages(root) {
    if (!root) return;
    var images = root.querySelectorAll("img.lazyload");
    if (!images.length) return;

    if (window.lazySizes && window.lazySizes.loader) {
      Array.prototype.forEach.call(images, function (img) {
        window.lazySizes.loader.unveil(img);
      });
      return;
    }

    Array.prototype.forEach.call(images, function (img) {
      var src = img.getAttribute("data-src");
      if (src) {
        img.src = src;
        img.classList.remove("lazyload");
        img.classList.add("lazyloaded");
      }
    });
  }

  function initStandardGrid() {
    var grid = document.getElementById("blog-grid");
    if (!grid) return;
    grid.innerHTML = posts.map(renderGridCard).join("");
  }

  function initListPage() {
    var list = document.getElementById("blog-list");
    if (!list) return;
    list.innerHTML = posts.map(renderListCard).join("");
  }

  function initSidebarRecent() {
    document.querySelectorAll("[data-blog-sidebar-recent]").forEach(function (el) {
      el.innerHTML = posts.slice(0, 3).map(renderSmallPost).join("");
    });
  }

  function initMegamenuRecent() {
    document.querySelectorAll("[data-blog-megamenu-recent]").forEach(function (el) {
      el.innerHTML = posts.slice(0, 3).map(renderSmallPost).join("");
    });
  }

  function initHomeTeaser() {
    var root = document.getElementById("blog-home-teaser");
    if (!root) return;
    root.innerHTML = posts.slice(0, 2).map(renderTeaserPost).join("");
  }

  function initDetailsPage() {
    var root = document.getElementById("blog-details-root");
    if (!root || !window.ITDOR_BLOG_BY_SLUG) return;

    var slug = getParam("p") || posts[0].slug;
    var post = window.ITDOR_BLOG_BY_SLUG[slug] || posts[0];
    var idx = posts.findIndex(function (p) { return p.slug === post.slug; });
    var prev = posts[(idx - 1 + posts.length) % posts.length];
    var next = posts[(idx + 1) % posts.length];

    document.title = post.title + " | IT Dor Services";

    var pageTitle = document.querySelector(".page-title .title");
    if (pageTitle) {
      pageTitle.textContent = post.title;
      pageTitle.classList.remove("split-text", "effect-right");
    }

    var breadcrumb = document.querySelector(".page-title .page-breadkcum");
    if (breadcrumb) {
      breadcrumb.textContent = " " + post.title;
      breadcrumb.classList.remove("split-text", "effect-right");
    }

    var hero = root.querySelector("[data-bd-hero]");
    if (hero) {
      hero.src = post.image;
      hero.setAttribute("data-src", post.image);
      hero.alt = post.title;
    }

    var authorEl = root.querySelector("[data-bd-author]");
    if (authorEl) authorEl.textContent = post.author;

    var dateEl = root.querySelector("[data-bd-date]");
    if (dateEl) dateEl.textContent = formatDateLong(post.date);

    var excerptEl = root.querySelector("[data-bd-excerpt]");
    if (excerptEl) excerptEl.textContent = post.excerpt;

    var dropCap = root.querySelector("[data-bd-dropcap]");
    if (dropCap) dropCap.textContent = post.title.charAt(0);

    var bodyEl = root.querySelector("[data-bd-body]");
    if (bodyEl) bodyEl.innerHTML = renderBody(post.body);

    var tagsEl = root.querySelector("[data-bd-tags]");
    if (tagsEl) {
      tagsEl.innerHTML = post.tags
        .map(function (tag) {
          return '<a href="blog-standard.html" class="tabs-item fw-5">' + escapeHtml(tag) + "</a>";
        })
        .join("");
    }

    var categoriesEl = root.querySelector("[data-bd-categories]");
    if (categoriesEl) categoriesEl.innerHTML = renderTags(post.tags);

    var prevBlock = root.querySelector("[data-bd-prev]");
    var nextBlock = root.querySelector("[data-bd-next]");
    if (prevBlock) {
      prevBlock.innerHTML =
        '<div class="tf-post-list style-small hover-img align-items-center">' +
        '<a href="' + postUrl(prev.slug) + '" class="image">' +
        '<img src="' + prev.image + '" data-src="' + prev.image + '" alt="' + escapeHtml(prev.title) + '" class="lazyload">' +
        "</a><div class=\"post-content\"><div class=\"post-date\"><i class=\"icon-calendar-days\"></i><span>" +
        formatDateShort(prev.date) +
        '</span></div><a href="' +
        postUrl(prev.slug) +
        '" class="body-2">' +
        escapeHtml(prev.title) +
        "</a></div></div>";
    }
    if (nextBlock) {
      nextBlock.innerHTML =
        '<div class="tf-post-list style-small hover-img align-items-center">' +
        '<a href="' + postUrl(next.slug) + '" class="image">' +
        '<img src="' + next.image + '" data-src="' + next.image + '" alt="' + escapeHtml(next.title) + '" class="lazyload">' +
        "</a><div class=\"post-content\"><div class=\"post-date\"><i class=\"icon-calendar-days\"></i><span>" +
        formatDateShort(next.date) +
        '</span></div><a href="' +
        postUrl(next.slug) +
        '" class="body-2">' +
        escapeHtml(next.title) +
        "</a></div></div>";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initStandardGrid();
    initListPage();
    initSidebarRecent();
    initMegamenuRecent();
    initHomeTeaser();
    initDetailsPage();
    refreshLazyImages(document);
  });
})();
