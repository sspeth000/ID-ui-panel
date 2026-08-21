(function () {
    "use strict";

    const BASE =
        "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/";

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

        // -----------------------------------------------------
        // CSS
        // -----------------------------------------------------

        await loadCSS(
            "styles.css"
        );

        // -----------------------------------------------------
        // Core modules
        // -----------------------------------------------------

        await loadScript(
            "state.js"
        );

        await loadScript(
            "ids.js"
        );

        await loadScript(
            "code-search.js"
        );

        await loadScript(
            "highlight.js"
        );

        // Visibility MUST load before UI.
        await loadScript(
            "visibility.js"
        );

        await loadScript(
            "picker.js"
        );

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
        // ID Inspector
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
                    "ID not found: " +
                    id;

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

                // No selected object now.
                if (
                    typeof window.updateIDPanelVisibilityUI ===
                    "function"
                ) {
                    window.updateIDPanelVisibilityUI(
                        null
                    );
                }

                return;
            }

            // -------------------------------------------------
            // Save selected ID
            // -------------------------------------------------

            state.selectedID =
                id;

            // -------------------------------------------------
            // Highlight element
            // -------------------------------------------------

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

            // -------------------------------------------------
            // IMPORTANT:
            // Tell visibility.js that the selected object
            // has changed.
            // -------------------------------------------------

            if (
                typeof window.notifyAssetSelection ===
                "function"
            ) {
                try {

                    window.notifyAssetSelection(
                        state
                    );

                } catch (e) {}
            }
            else if (
                typeof window.updateIDPanelVisibilityUI ===
                "function"
            ) {

                // Fallback for visibility.js versions that
                // don't expose notifyAssetSelection().
                try {

                    const visible =
                        typeof window.getAssetVisibility ===
                        "function"
                            ? window.getAssetVisibility(
                                state
                            )
                            : null;

                    window.updateIDPanelVisibilityUI(
                        visible
                    );

                } catch (e) {}
            }

            // -------------------------------------------------
            // Find JavaScript references
            // -------------------------------------------------

            let matches = [];

            if (
                typeof window.findCodeReferences ===
                "function"
            ) {
                try {

                    matches =
                        window.findCodeReferences(
                            id
                        );

                } catch (e) {

                    matches = [];
                }
            }

            // -------------------------------------------------
            // Computed information
            // -------------------------------------------------

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

            // -------------------------------------------------
            // Display code
            // -------------------------------------------------

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
                "\nVISIBILITY: " +
                computed.visibility +
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
                "✓ #" +
                id;

            // -------------------------------------------------
            // Final visibility refresh
            //
            // This catches modules that update the selection
            // on the next frame.
            // -------------------------------------------------

            if (
                typeof window.notifyAssetSelection ===
                "function"
            ) {

                requestAnimationFrame(
                    function () {

                        try {
                            window.notifyAssetSelection(
                                state
                            );
                        } catch (e) {}

                    }
                );
            }
        };

        // -----------------------------------------------------
        // UI
        // -----------------------------------------------------

        await loadScript(
            "ui.js"
        );

        if (
            typeof window.__IDPanelStart !==
            "function"
        ) {
            throw new Error(
                "ui.js loaded, but __IDPanelStart() does not exist."
            );
        }

        window.__IDPanelStart();
    }

    // ---------------------------------------------------------
    // Error handling
    // ---------------------------------------------------------

    start().catch(
        function (error) {

            console.error(
                "ID-ui-panel loader error:",
                error
            );

            alert(
                "ID-ui-panel failed to load:\n\n" +
                error.message
            );
        }
    );

})();
