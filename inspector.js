(function () {
    "use strict";

    const BASE =
        "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/";

    alert("ID-ui-panel loader v3 started");

    // ---------------------------------------------------------
    // Toggle existing panel
    // ---------------------------------------------------------

    if (window.__IDPanelUI) {
        try {
            window.__IDPanelUI.remove();
        } catch (e) {}

        window.__IDPanelUI = null;
        return;
    }

    // ---------------------------------------------------------
    // Load JavaScript
    // ---------------------------------------------------------

    async function loadScript(file) {

        const url =
            BASE +
            file +
            "?v=" +
            Date.now();

        const response =
            await fetch(url, {
                cache: "no-store"
            });

        if (!response.ok) {
            throw new Error(
                "JS HTTP " +
                response.status +
                " while loading " +
                file +
                "\n\nURL:\n" +
                url
            );
        }

        const code =
            await response.text();

        if (!code.trim()) {
            throw new Error(
                file +
                " downloaded successfully, but it is empty."
            );
        }

        try {
            (0, eval)(code);
        } catch (error) {
            throw new Error(
                file +
                " downloaded, but execution failed:\n\n" +
                error.message
            );
        }
    }

    // ---------------------------------------------------------
    // Load CSS
    // ---------------------------------------------------------

    async function loadCSS(file) {

        const url =
            BASE +
            file +
            "?v=" +
            Date.now();

        const response =
            await fetch(url, {
                cache: "no-store"
            });

        if (!response.ok) {
            throw new Error(
                "CSS HTTP " +
                response.status +
                " while loading " +
                file +
                "\n\nURL:\n" +
                url
            );
        }

        const css =
            await response.text();

        if (!css.trim()) {
            throw new Error(
                file +
                " downloaded successfully, but it is empty."
            );
        }

        const oldStyle =
            document.getElementById(
                "__IDPanelStyles"
            );

        if (oldStyle) {
            oldStyle.remove();
        }

        const style =
            document.createElement("style");

        style.id =
            "__IDPanelStyles";

        style.textContent =
            css;

        (
            document.head ||
            document.documentElement
        ).appendChild(style);
    }

    // ---------------------------------------------------------
    // Start
    // ---------------------------------------------------------

    async function start() {

        alert("Loading styles.css...");

        await loadCSS("styles.css");

        alert("styles.css loaded.\nLoading state.js...");

        await loadScript("state.js");

        alert("state.js loaded.\nLoading ids.js...");

        await loadScript("ids.js");

        alert("ids.js loaded.\nLoading code-search.js...");

        await loadScript("code-search.js");

        alert("code-search.js loaded.\nLoading highlight.js...");

        await loadScript("highlight.js");

        alert("highlight.js loaded.\nLoading picker.js...");

        await loadScript("picker.js");

        // -----------------------------------------------------
        // State
        // -----------------------------------------------------

        if (
            typeof window.createInspectorState !==
            "function"
        ) {
            throw new Error(
                "state.js loaded, but createInspectorState() does not exist."
            );
        }

        window.__IDPanelState =
            window.createInspectorState();

        // -----------------------------------------------------
        // Inspector
        // -----------------------------------------------------

        window.inspectID = function (
            id,
            state,
            code,
            status
        ) {

            id =
                String(id || "").trim();

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
                    try {
                        window.clearHighlight(
                            state
                        );
                    } catch (e) {}
                }

                return;
            }

            state.selectedID =
                id;

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
                el.src ||
                "(none)";

            const className =
                typeof el.className ===
                "string"
                    ? el.className
                    : "";

            code.textContent =
                "ID: " +
                id +
                "\nTAG: " +
                el.tagName +
                "\nSRC: " +
                src +
                "\nCLASS: " +
                className +
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

            code.style.display =
                "block";

            status.textContent =
                "✓ #" + id;
        };

        // -----------------------------------------------------
        // UI
        // -----------------------------------------------------

        alert("Core modules loaded.\nLoading ui.js...");

        await loadScript("ui.js");

        if (
            typeof window.__IDPanelStart !==
            "function"
        ) {
            throw new Error(
                "ui.js loaded, but __IDPanelStart() does not exist."
            );
        }

        alert("ui.js loaded.\nStarting panel...");

        window.__IDPanelStart();
    }

    // ---------------------------------------------------------
    // Error handling
    // ---------------------------------------------------------

    start().catch(function (error) {

        console.error(
            "ID-ui-panel loader error:",
            error
        );

        alert(
            "ID-ui-panel failed to load:\n\n" +
            error.message
        );
    });

})();
