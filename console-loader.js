(() => {
  const urls = [
    "https://cdn.jsdelivr.net/gh/sspeth000/ID-ui-panel@main/inspector.js",
    "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/inspector.js"
  ];

  if (window.__IDPanelLoaderPending) {
    console.info("[ID-ui-panel] A loader is already running.");
    return;
  }

  window.__IDPanelLoaderPending = true;
  let index = 0;

  const loadNext = () => {
    const script = document.createElement("script");
    script.src = urls[index++] + "?v=" + Date.now();

    script.onload = () => {
      script.remove();
      window.__IDPanelLoaderPending = false;
      console.info("[ID-ui-panel] Inspector script loaded.");
    };

    script.onerror = () => {
      script.remove();

      if (index < urls.length) {
        console.warn("[ID-ui-panel] Primary CDN failed. Trying fallback...");
        loadNext();
        return;
      }

      window.__IDPanelLoaderPending = false;
      console.error("[ID-ui-panel] Could not load inspector.js from either source.");
    };

    (document.head || document.documentElement).appendChild(script);
  };

  loadNext();
})();
