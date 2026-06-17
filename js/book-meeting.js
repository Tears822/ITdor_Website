(function () {
  "use strict";

  function getCalendlyUrl() {
    return (
      (window.ITDOR_SITE && window.ITDOR_SITE.calendlyUrl) ||
      "https://calendly.com/itdorservices/30min"
    );
  }

  function createBookMeetingButton(className) {
    var link = document.createElement("a");
    link.href = getCalendlyUrl();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = className || "tf-btn tf-btn-book-meeting book-meeting-btn";
    link.innerHTML = "<span>Book Meeting</span>";
    return link;
  }

  function initHeaderButtons() {
    document.querySelectorAll(".header-right .nav-btn").forEach(function (navBtn) {
      if (navBtn.querySelector(".book-meeting-btn")) return;
      navBtn.classList.add("nav-btn-group");
      navBtn.insertBefore(createBookMeetingButton(), navBtn.firstChild);
    });
  }

  function initMobileMenuButtons() {
    document.querySelectorAll(".mobile-main-nav #menu-mobile, .mobile-main-nav .menu").forEach(function (menu) {
      if (menu.querySelector(".book-meeting-mobile-btn")) return;
      var item = document.createElement("li");
      item.className = "menu-item";
      var link = createBookMeetingButton("book-meeting-mobile-btn");
      item.appendChild(link);
      menu.appendChild(item);
    });
  }

  function initCtaSlots() {
    document.querySelectorAll("[data-book-meeting-slot]").forEach(function (slot) {
      if (slot.querySelector(".book-meeting-btn")) return;
      slot.classList.add("cta-btn-group");
      slot.appendChild(createBookMeetingButton());
    });
  }

  window.initBookMeetingButtons = function () {
    initHeaderButtons();
    initMobileMenuButtons();
    initCtaSlots();
  };

  document.addEventListener("DOMContentLoaded", window.initBookMeetingButtons);
})();
