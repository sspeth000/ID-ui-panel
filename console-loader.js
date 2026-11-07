(function () {
  "use strict";

  var urls = [
    "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/inspector.js",
    "https://cdn.jsdelivr.net/gh/sspeth000/ID-ui-panel@main/inspector.js"
  ];

  if (window.__IDPanelLoaderPending) {
    console.info("[ID-ui-panel] A loader is already running.");
    return;
  }

  window.__IDPanelLoaderPending = true;
  var index = 0;

  function loadNext() {
    var script = document.createElement("script");
    script.src = urls[index++] + "?v=" + Date.now();

    script.onload = function () {
      script.remove();
      window.__IDPanelLoaderPending = false;
      console.info("[ID-ui-panel] Script file loaded.");
    };

    script.onerror = function () {
      script.remove();

      if (index < urls.length) {
        console.warn("[ID-ui-panel] Primary source failed. Trying fallback...");
        loadNext();
        return;
      }

      window.__IDPanelLoaderPending = false;
      console.error("[ID-ui-panel] Could not load inspector.js from either source.");
    };

    (document.head || document.documentElement).appendChild(script);
  }

  loadNext();
})();
