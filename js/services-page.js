(function () {

  "use strict";



  var services = window.ITDOR_SERVICES || [];



  function escapeHtml(text) {

    return String(text)

      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;");

  }



  function renderCard(service) {
    var isCybersecurity = service.group === "cybersecurity";
    var calendarUrl =
      (window.ITDOR_SITE && window.ITDOR_SITE.cyberGlobalCalendarUrl) ||
      "https://meet.cybergl.com/meetings/jarrod-aldom";
    var href = isCybersecurity
      ? calendarUrl
      : "services/" + service.slug + ".html";
    var externalAttrs = isCybersecurity
      ? ' target="_blank" rel="noopener"'
      : "";

    var iconHtml = window.renderServiceIcon
      ? window.renderServiceIcon(service)
      : '<i class="' + escapeHtml(service.icon) + '"></i>';

    return (
      '<div class="services-item px-lg-15 no-img">' +
      '<div class="icon">' + iconHtml + "</div>" +
      '<h5 class="lh-30 fw-6"><a href="' +
      href +
      '"' +
      externalAttrs +
      ' class="title-service">' +
      escapeHtml(service.title) +
      "</a></h5>" +
      '<div class="desc lh-30">' +
      escapeHtml(service.description) +
      "</div>" +
      "</div>"
    );
  }



  function renderGroup(root, group) {

    if (!root) return;

    root.innerHTML = services

      .filter(function (service) {

        return service.group === group;

      })

      .map(renderCard)

      .join("");

  }



  function renderIndustries() {

    var root = document.getElementById("services-industries-list");

    var industries = window.ITDOR_SOFTWARE_INDUSTRIES || [];

    if (!root || !industries.length) return;



    root.innerHTML = industries

      .map(function (industry) {

        return '<span class="software-industry-tag">' + escapeHtml(industry) + "</span>";

      })

      .join("");

  }



  function initServiceTabs() {

    var tabLinks = document.querySelectorAll("[data-services-tab]");

    var tabPanes = document.querySelectorAll("[data-services-pane]");

    var introPanes = document.querySelectorAll("[data-services-intro-pane]");

    if (!tabLinks.length) return;



    function activateTab(tab) {

      tabLinks.forEach(function (link) {

        var isActive = link.getAttribute("data-services-tab") === tab;

        link.classList.toggle("active", isActive);

      });

      tabPanes.forEach(function (pane) {

        pane.classList.toggle("active", pane.getAttribute("data-services-pane") === tab);

      });

      introPanes.forEach(function (pane) {

        pane.classList.toggle("active", pane.getAttribute("data-services-intro-pane") === tab);

      });

    }



    tabLinks.forEach(function (link) {

      link.addEventListener("click", function (e) {

        e.preventDefault();

        activateTab(link.getAttribute("data-services-tab"));

      });

    });



    var params = new URLSearchParams(window.location.search);

    var tabParam = params.get("tab");

    var hash = (window.location.hash || "").replace("#", "");

    if (

      tabParam === "software" ||

      hash === "software-development" ||

      hash === "software-services" ||

      hash === "software"

    ) {

      activateTab("software");

    } else if (

      tabParam === "cybersecurity" ||

      hash === "cybersecurity" ||

      hash === "cybersecurity-services" ||

      hash === "web-security"

    ) {

      activateTab("cybersecurity");

    } else if (tabParam === "it" || hash === "it-services" || hash === "it-services-intro" || hash === "onsite") {

      activateTab("onsite");

    }

  }



  document.addEventListener("DOMContentLoaded", function () {

    renderGroup(document.getElementById("services-onsite-list"), "onsite");

    renderGroup(document.getElementById("services-dev-list"), "software");

    renderGroup(document.getElementById("services-cybersecurity-list"), "cybersecurity");

    renderIndustries();

    initServiceTabs();

  });

})();


