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
    var href = "services/" + service.slug + ".html";
    var iconHtml = window.renderServiceIcon
      ? window.renderServiceIcon(service)
      : '<i class="' + escapeHtml(service.icon) + '"></i>';
    return (
      '<div class="services-item px-lg-15 no-img">' +
      '<div class="icon">' + iconHtml + "</div>" +
      '<h5 class="lh-30 fw-6"><a href="' + href + '" class="title-service">' + escapeHtml(service.title) + "</a></h5>" +
      '<div class="desc lh-30">' + escapeHtml(service.description) + "</div>" +
      '<div class="bottom-item">' +
      '<a href="' + href + '" class="tf-btn-readmore"><span class="plus">+</span><span class="text">Read More</span></a>' +
      "</div></div>"
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

  document.addEventListener("DOMContentLoaded", function () {
    renderGroup(document.getElementById("services-onsite-list"), "onsite");
    renderGroup(document.getElementById("services-dev-list"), "software");
  });
})();
