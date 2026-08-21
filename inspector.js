(function () {
    "use strict";

    if (window.__idInspector) {
        window.__idInspector.remove();
        return;
    }

    const BASE =
        "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/";

    function loadScript(file) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");

            script.src = BASE + file;
            script.onload = () => resolve();
            script.onerror = () =>
                reject(new Error("Failed to load " + file));

            document.head.appendChild(script);
        });
    }

    function loadCSS(file) {
        return new Promise((resolve, reject) => {
            const link = document.createElement("link");

            link.rel = "stylesheet";
            link.href = BASE + file;
            link.onload = () => resolve();
            link.onerror = () =>
                reject(new Error("Failed to load " + file));

            document.head.appendChild(link);
        });
    }

    Promise.all([
        loadCSS("styles.css"),
        loadScript("state.js"),
        loadScript("ids.js"),
        loadScript("code-search.js"),
        loadScript("highlight.js"),
        loadScript("picker.js"),
        loadScript("ui.js")
    ])
        .then(() => {
            if (typeof window.__IDPanelStart === "function") {
                window.__IDPanelStart();
            } else {
                console.error(
                    "ID-ui-panel: ui.js did not expose __IDPanelStart"
                );
            }
        })
        .catch(error => {
            console.error("ID-ui-panel failed to load:", error);
            alert("ID-ui-panel failed to load:\n" + error.message);
        });
})();
