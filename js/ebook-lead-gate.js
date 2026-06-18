(function () {
  "use strict";

  var STORAGE_KEY = "itdor_ebook_unlocked";
  var DISMISS_KEY = "itdor_ebook_dismissed";
  var config = (window.ITDOR_SITE && window.ITDOR_SITE.ebook) || {};
  var enabled = config.enabled !== false;
  var apiUrl = config.apiUrl || "/api/contact";
  var ebookUrl = config.ebookUrl || "ebook/read.html";
  var delayMs = typeof config.delayMs === "number" ? config.delayMs : 1200;

  function assetPath(path) {
    if (!path || /^https?:\/\//i.test(path)) return path;
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var inSubfolder = /\/services\//i.test(window.location.pathname);
    if (inSubfolder) return "../" + path.replace(/^\.\//, "");
    return path.replace(/^\.\//, "");
  }

  function isBot(params) {
    return Boolean(params.website || params.company_url);
  }

  function shouldShow() {
    if (!enabled) return false;
    if (window.location.search.indexOf("noebook=1") !== -1) return false;
    if (localStorage.getItem(STORAGE_KEY) === "1") return false;
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return false;
    if (config.homeOnly && !/(^\/$|index\.html$)/i.test(window.location.pathname)) {
      return false;
    }
    return true;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildModal() {
    var title = config.title || "The Northern New England IT & Cybersecurity Playbook";
    var subtitle =
      config.subtitle ||
      "Practical guidance on IT infrastructure, CyberGlobal security services, and reducing business risk.";
    var bullets = config.bullets || [
      "Onsite IT support and network essentials for New England businesses",
      "Cybersecurity readiness through our CyberGlobal partnership",
      "Software modernization and operational resilience checklist",
    ];
    var cover = assetPath(config.coverImage || "image/services/cybersecurity_solutions.jpg");

    var bulletHtml = bullets
      .map(function (item) {
        return (
          '<li class="ebook-lead-modal__bullet">' +
          '<i class="icon-check"></i><span>' +
          escapeHtml(item) +
          "</span></li>"
        );
      })
      .join("");

    var modal = document.createElement("div");
    modal.className = "ebook-lead-modal";
    modal.id = "ebook-lead-modal";
    modal.innerHTML =
      '<div class="ebook-lead-modal__overlay" data-ebook-close></div>' +
      '<div class="ebook-lead-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ebook-lead-title">' +
      '<button type="button" class="ebook-lead-modal__close" aria-label="Close" data-ebook-close>&times;</button>' +
      '<div class="ebook-lead-modal__layout">' +
      '<div class="ebook-lead-modal__cover">' +
      '<img src="' +
      escapeHtml(cover) +
      '" alt="IT Dor Services ebook cover">' +
      '<span class="ebook-lead-modal__badge">Free Guide</span>' +
      "</div>" +
      '<div class="ebook-lead-modal__content">' +
      '<div class="ebook-lead-modal__intro">' +
      '<p class="ebook-lead-modal__eyebrow">IT Dor Services</p>' +
      '<h2 id="ebook-lead-title" class="ebook-lead-modal__title">' +
      escapeHtml(title) +
      "</h2>" +
      '<p class="ebook-lead-modal__subtitle lh-30">' +
      escapeHtml(subtitle) +
      "</p>" +
      '<ul class="ebook-lead-modal__list">' +
      bulletHtml +
      "</ul>" +
      "</div>" +
      '<form class="ebook-lead-modal__form" id="ebook-lead-form" novalidate>' +
      '<div class="ebook-lead-modal__fields">' +
      '<label class="ebook-lead-modal__field">' +
      '<span>Name *</span>' +
      '<input type="text" name="name" autocomplete="name" required>' +
      "</label>" +
      '<label class="ebook-lead-modal__field">' +
      '<span>Email *</span>' +
      '<input type="email" name="email" autocomplete="email" required>' +
      "</label>" +
      '<label class="ebook-lead-modal__field">' +
      '<span>Company</span>' +
      '<input type="text" name="company" autocomplete="organization">' +
      "</label>" +
      '<label class="ebook-lead-modal__hp" aria-hidden="true">' +
      '<span>Website</span>' +
      '<input type="text" name="website" tabindex="-1" autocomplete="off">' +
      "</label>" +
      "</div>" +
      '<p class="ebook-lead-modal__note">We respect your inbox. No spam—just the guide and occasional IT Dor updates.</p>' +
      '<button type="submit" class="tf-btn ebook-lead-modal__submit">' +
      "<span>Get Free Access</span><i class=\"icon-arrow-right\"></i>" +
      "</button>" +
      '<p class="ebook-lead-modal__status" id="ebook-lead-status" hidden></p>' +
      "</form>" +
      '<div class="ebook-lead-modal__success" id="ebook-lead-success" hidden>' +
      '<h3 class="fw-6 mb-15">You&rsquo;re in.</h3>' +
      '<p class="lh-30 mb-25">Thanks for your interest. Your guide is ready.</p>' +
      '<a href="' +
      escapeHtml(assetPath(ebookUrl)) +
      '" class="tf-btn" id="ebook-lead-open">' +
      "<span>Read the Guide</span><i class=\"icon-arrow-right\"></i>" +
      "</a>" +
      "</div>" +
      '<button type="button" class="ebook-lead-modal__skip" data-ebook-dismiss>Continue without downloading</button>' +
      "</div>" +
      "</div>" +
      "</div>";

    document.body.appendChild(modal);
    return modal;
  }

  function openModal(modal) {
    document.body.classList.add("ebook-lead-modal-open");
    modal.classList.add("is-visible");
    var firstInput = modal.querySelector('input[name="name"]');
    if (firstInput) firstInput.focus();
  }

  function closeModal(modal, dismissed) {
    modal.classList.remove("is-visible");
    document.body.classList.remove("ebook-lead-modal-open");
    if (dismissed) {
      sessionStorage.setItem(DISMISS_KEY, "1");
    }
  }

  function showSuccess(modal) {
    localStorage.setItem(STORAGE_KEY, "1");
    modal.querySelector(".ebook-lead-modal__form").hidden = true;
    modal.querySelector(".ebook-lead-modal__intro").hidden = true;
    modal.querySelector(".ebook-lead-modal__skip").hidden = true;
    modal.querySelector("#ebook-lead-success").hidden = false;
  }

  function setStatus(modal, message, isError) {
    var status = modal.querySelector("#ebook-lead-status");
    status.hidden = !message;
    status.textContent = message || "";
    status.classList.toggle("is-error", Boolean(isError));
  }

  function submitLead(modal, form) {
    var formData = new FormData(form);
    var payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      subject: config.leadSubject || "Ebook Download Lead",
      message:
        "Ebook download request for: " +
        (config.title || "IT Dor Services Guide") +
        (formData.get("company")
          ? "\nCompany: " + String(formData.get("company")).trim()
          : ""),
    };

    if (!payload.name || !payload.email) {
      setStatus(modal, "Please enter your name and email.", true);
      return;
    }

    if (isBot(payload)) {
      showSuccess(modal);
      return;
    }

    var submitBtn = form.querySelector("[type='submit']");
    submitBtn.disabled = true;
    setStatus(modal, "Sending...", false);

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            if (!response.ok) {
              throw new Error(data.error || "Unable to submit right now.");
            }
            showSuccess(modal);
          });
      })
      .catch(function (error) {
        setStatus(modal, error.message || "Something went wrong. Please try again.", true);
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  }

  function init() {
    if (!shouldShow()) return;

    var modal = buildModal();

    modal.addEventListener("click", function (event) {
      if (event.target.matches("[data-ebook-close]")) {
        closeModal(modal, true);
      }
      if (event.target.matches("[data-ebook-dismiss]")) {
        closeModal(modal, true);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-visible")) {
        closeModal(modal, true);
      }
    });

    modal.querySelector("#ebook-lead-form").addEventListener("submit", function (event) {
      event.preventDefault();
      submitLead(modal, event.target);
    });

    window.setTimeout(function () {
      openModal(modal);
    }, delayMs);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
