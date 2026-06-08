(function () {
  "use strict";

  var icons = {
    cloud:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      "</svg>",
    heart:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      "</svg>",
    film:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></rect>' +
      '<line x1="7" y1="2" x2="7" y2="22" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      '<line x1="17" y1="2" x2="17" y2="22" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      '<line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      '<line x1="2" y1="7" x2="7" y2="7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      '<line x1="2" y1="17" x2="7" y2="17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      '<line x1="17" y1="7" x2="22" y2="7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      '<line x1="17" y1="17" x2="22" y2="17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></line>' +
      "</svg>",
    scale:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M12 3v18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="M3 7h18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="M3 7c2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="m5 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="m13 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      "</svg>",
    car:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<circle cx="7" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></circle>' +
      '<path d="M9 17h6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<circle cx="17" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></circle>' +
      "</svg>",
    city:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path d="M10 6h4M10 10h4M10 14h4M10 18h4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      "</svg>",
    cart:
      '<svg class="service-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<circle cx="8" cy="21" r="1" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></circle>' +
      '<circle cx="19" cy="21" r="1" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></circle>' +
      '<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>' +
      "</svg>"
  };

  window.ITDOR_SERVICE_ICONS = icons;

  window.renderServiceIcon = function (service) {
    if (service.iconType === "svg" && icons[service.icon]) {
      return icons[service.icon];
    }
    return '<i class="' + service.icon + '"></i>';
  };
})();
