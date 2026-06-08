(function () {
  "use strict";

  var TAWK_SRC = "https://embed.tawk.to/69a185824afa321c34c796b9/1jiff31vb";

  if (document.getElementById("tawk-to-loader")) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  var loader = document.createElement("script");
  loader.id = "tawk-to-loader";
  loader.async = true;
  loader.src = TAWK_SRC;
  loader.charset = "UTF-8";
  loader.setAttribute("crossorigin", "*");

  var firstScript = document.getElementsByTagName("script")[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(loader, firstScript);
  } else {
    document.body.appendChild(loader);
  }
})();
