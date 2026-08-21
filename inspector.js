(function () {
    "use strict";

    const BASE =
        "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/";

    // Toggle an existing panel.
    if (window.__IDPanelUI) {
        try {
            window.__IDPanelUI.remove();
        } catch (e) {}

        return;
    }

    // ---------------------------------------------------------
    // Load JavaScript
    // ---------------------------------------------------------

    function loadScript(file) {
        return new Promise(function (resolve, reject) {

            const script =
                document.createElement("script");

            script.src = BASE + file;
            script.async = false;

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

            (
                document.head ||
                document.documentElement
            ).appendChild(script);
        });
    }

    // ---------------------------------------------------------
    // Load CSS
    // ---------------------------------------------------------

    function loadCSS(file) {
        return new Promise(function (resolve, reject) {

            const link =
                document.createElement("link");

            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = BASE + file;

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

            (
                document.head ||
                document.documentElement
            ).appendChild(link);
        });
    }

    // ---------------------------------------------------------
    // Start
    // ---------------------------------------------------------

    async function start() {

        // CSS first.
        await loadCSS("styles.css");

        // Core modules.
        await loadScript("state.js");
        await loadScript("ids.js");
        await loadScript("code-search.js");
        await loadScript("highlight.js");
        await loadScript("picker.js");

        // Make sure state exists.
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

        // -----------------------------------------------------
        // ID inspector
        // -----------------------------------------------------

        window.inspectID = function (
            id,
            state,
            code,
            status
        ) {

            id = String(id || "").trim();

            if (!id) {

                code.style.display = "block";
                code.textContent = "Enter an ID.";
                status.textContent =
                    "✕ Enter an ID.";

                return;
            }

            const el =
                document.getElementById(id);

            if (!el) {

                code.style.display = "block";

                code.textContent =
                    "ID not found: " + id;

                status.textContent =
                    "✕ ID not found.";

                if (
                    typeof window.clearHighlight ===
                    "function"
                ) {
                    try {
                        window.clearHighlight(state);
                    } catch (e) {}
                }

                return;
            }

            state.selectedID = id;

            // Highlight.
            if (
                typeof window.highlightElement ===
                "function"
            ) {
                try {
                    window.highlightElement(
                        el,
                        state
                    );
                } catch (e) {}
            }

            // JavaScript references.
            let matches = [];

            if (
                typeof window.findCodeReferences ===
                "function"
            ) {
                try {
                    matches =
                        window.findCodeReferences(id);
                } catch (e) {
                    matches = [];
                }
            }

            const computed =
                getComputedStyle(el);

            const src =
                el.src || "(none)";

            const className =
                typeof el.className === "string"
                    ? el.className
                    : "";

            code.textContent =
                "ID: " + id +
                "\nTAG: " + el.tagName +
                "\nSRC: " + src +
                "\nCLASS: " + className +
                "\nDISPLAY: " +
                computed.display +
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

            code.style.display = "block";

            status.textContent =
                "✓ #" + id;
        };

        // -----------------------------------------------------
        // UI
        // -----------------------------------------------------

        await loadScript("ui.js");

        if (
            typeof window.__IDPanelStart !==
            "function"
        ) {
            throw new Error(
                "ui.js did not expose __IDPanelStart."
            );
        }

        window.__IDPanelStart();
    }

    // ---------------------------------------------------------
    // Error handling
    // ---------------------------------------------------------

    start().catch(function (error) {

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
