(function () {
    "use strict";

    const BASE =
        "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/";

    /*
     * If inspector already exists,
     * remove it instead of creating another.
     */
    if (window.__IDPanelUI) {

        if (
            typeof window.__IDPanelUI.remove ===
            "function"
        ) {
            window.__IDPanelUI.remove();
        }

        return;
    }

    function loadScript(file) {

        return new Promise(function (
            resolve,
            reject
        ) {

            const script =
                document.createElement("script");

            script.src =
                BASE + file;

            script.onload = function () {
                resolve();
            };

            script.onerror = function () {
                reject(
                    new Error(
                        "Failed to load " + file
                    )
                );
            };

            document.head.appendChild(script);
        });
    }

    function loadCSS(file) {

        return new Promise(function (
            resolve,
            reject
        ) {

            const link =
                document.createElement("link");

            link.rel = "stylesheet";

            link.href =
                BASE + file;

            link.onload = function () {
                resolve();
            };

            link.onerror = function () {
                reject(
                    new Error(
                        "Failed to load " + file
                    )
                );
            };

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
    .then(function () {

        /*
         * Create ONE shared state object.
         */
        if (
            typeof window.createInspectorState !==
            "function"
        ) {
            throw new Error(
                "state.js did not load correctly."
            );
        }

        window.__IDPanelState =
            window.createInspectorState();

        /*
         * Main ID inspection function.
         */
        window.inspectID =
            function (
                id,
                state,
                code,
                status
            ) {

                id = String(id || "").trim();

                if (!id) {

                    code.style.display =
                        "block";

                    code.textContent =
                        "Enter an ID.";

                    status.textContent =
                        "✕ Enter an ID.";

                    return;
                }

                const el =
                    document.getElementById(id);

                if (!el) {

                    code.style.display =
                        "block";

                    code.textContent =
                        "ID not found: " + id;

                    status.textContent =
                        "✕ ID not found.";

                    if (
                        typeof window.clearHighlight ===
                        "function"
                    ) {
                        window.clearHighlight(state);
                    }

                    return;
                }

                state.selectedID = id;

                /*
                 * Highlight element.
                 */
                if (
                    typeof window.highlightElement ===
                    "function"
                ) {
                    window.highlightElement(
                        el,
                        state
                    );
                }

                /*
                 * Find JavaScript references.
                 */
                let matches = [];

                if (
                    typeof window.findCodeReferences ===
                    "function"
                ) {
                    matches =
                        window.findCodeReferences(id);
                }

                const style =
                    getComputedStyle(el);

                const src =
                    el.src ||
                    "(none)";

                const className =
                    typeof el.className ===
                    "string"
                        ? el.className
                        : "";

                code.textContent =
                    "ID: " + id +

                    "\nTAG: " +
                    el.tagName +

                    "\nSRC: " +
                    src +

                    "\nCLASS: " +
                    className +

                    "\nDISPLAY: " +
                    style.display +

                    "\n\n" +

                    "==============================\n" +

                    "JAVASCRIPT REFERENCES\n" +

                    "==============================\n\n" +

                    (
                        matches.length
                            ? matches.join(
                                "\n\n" +
                                "/* ===== MATCH ===== */" +
                                "\n\n"
                            )
                            : "No JavaScript references found."
                    );

                code.style.display =
                    "block";

                status.textContent =
                    "✓ #" + id;
            };

        /*
         * Finally start the UI.
         */
        if (
            typeof window.__IDPanelStart !==
            "function"
        ) {
            throw new Error(
                "ui.js did not expose __IDPanelStart."
            );
        }

        window.__IDPanelStart();
    })
    .catch(function (error) {

        console.error(
            "ID-ui-panel failed:",
            error
        );

        alert(
            "ID-ui-panel failed to load:\n\n" +
            error.message
        );
    });

})();
