(() => {
  if (window.__IDInspector) {
    window.__IDInspector.remove();
  }

  const state = createInspectorState();

  const host = document.createElement("div");
  host.id = "__IDInspectorHost";

  host.style.cssText = `
    position:fixed!important;
    left:0!important;
    top:0!important;
    width:290px!important;
    height:560px!important;
    z-index:2147483647!important;
    pointer-events:none!important;
  `;

  document.documentElement.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  loadStyles(shadow);
  createUI(shadow, state);

  window.__IDInspector = {
    remove() {
      host.remove();
    }
  };
})();
