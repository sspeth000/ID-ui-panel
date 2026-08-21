(function () {
    "use strict";

    const BASE =
        "https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/";

    // =========================================================
    // Toggle existing panel
    // =========================================================

    if (window.__IDPanelUI) {
        try {
            window.__IDPanelUI.remove();
        } catch (e) {}

        window.__IDPanelUI = null;

        return;
    }

    // =========================================================
    // Load CSS
    // =========================================================

    async function loadCSS(file) {

        const url =
            BASE +
            file +
            "?v=" +
            Date.now();

        const response =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                "CSS HTTP " +
                response.status +
                " while loading " +
                file
            );
        }

        const css =
            await response.text();

        if (!css.trim()) {
            throw new Error(
                file +
                " downloaded successfully, but is empty."
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

    // =========================================================
    // Load JavaScript
    // =========================================================

    async function loadScript(file) {

        const url =
            BASE +
            file +
            "?v=" +
            Date.now();

        const response =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                "JS HTTP " +
                response.status +
                " while loading " +
                file
            );
        }

        const code =
            await response.text();

        if (!code.trim()) {
            throw new Error(
                file +
                " downloaded successfully, but is empty."
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

    // =========================================================
    // Visibility synchronization
    // =========================================================

    function syncVisibility(state) {

        if (!state) {
            return;
        }

        /*
         * Preferred method supplied by visibility.js.
         */
        if (
            typeof window.notifyAssetSelection ===
            "function"
        ) {

            try {

                window.notifyAssetSelection(
                    state
                );

                return true;

            } catch (e) {

                console.warn(
                    "ID Panel: visibility sync failed:",
                    e
                );
            }
        }

        /*
         * Compatibility fallback.
         */
        if (
            typeof window.getAssetVisibility ===
            "function" &&
            typeof window.updateIDPanelVisibilityUI ===
            "function"
        ) {

            try {

                const visible =
                    window.getAssetVisibility(
                        state
                    );

                window.updateIDPanelVisibilityUI(
                    visible
                );

                return true;

            } catch (e) {

                console.warn(
                    "ID Panel: visibility fallback failed:",
                    e
                );
            }
        }

        return false;
    }

    // =========================================================
    // Start
    // =========================================================

    async function start() {

        // -----------------------------------------------------
        // CSS
        // -----------------------------------------------------

        await loadCSS(
            "styles.css"
        );

        // -----------------------------------------------------
        // Core state
        // -----------------------------------------------------

        await loadScript(
            "state.js"
        );

        // -----------------------------------------------------
        // ID handling
        // -----------------------------------------------------

        await loadScript(
            "ids.js"
        );

        // -----------------------------------------------------
        // Original inline-script code search
        // -----------------------------------------------------

        await loadScript(
            "code-search.js"
        );

        // -----------------------------------------------------
        // Highlighting
        // -----------------------------------------------------

        await loadScript(
            "highlight.js"
        );

        // -----------------------------------------------------
        // Visibility
        // -----------------------------------------------------

        await loadScript(
            "visibility.js"
        );

        // -----------------------------------------------------
        // Picker
        // -----------------------------------------------------

        await loadScript(
            "picker.js"
        );

        // -----------------------------------------------------
        // Verify state
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

        const state =
            window.__IDPanelState;

        // =====================================================
        // INSPECT ID
        // =====================================================

        window.inspectID =
            async function (
                id,
                inspectState,
                code,
                status
            ) {

                const activeState =
                    inspectState ||
                    state;

                id =
                    String(
                        id || ""
                    ).trim();

                // -------------------------------------------------
                // Empty ID
                // -------------------------------------------------

                if (!id) {

                    if (code) {

                        code.style.display =
                            "block";

                        code.textContent =
                            "Enter an ID.";
                    }

                    if (status) {

                        status.textContent =
                            "✕ Enter an ID.";
                    }

                    /*
                     * Clear visibility UI because
                     * nothing is selected.
                     */
                    if (
                        typeof window.updateIDPanelVisibilityUI ===
                        "function"
                    ) {

                        try {

                            window.updateIDPanelVisibilityUI(
                                null
                            );

                        } catch (e) {}
                    }

                    return;
                }

                // -------------------------------------------------
                // Find element
                // -------------------------------------------------

                const el =
                    document.getElementById(
                        id
                    );

                if (!el) {

                    if (code) {

                        code.style.display =
                            "block";

                        code.textContent =
                            "ID not found: " +
                            id;
                    }

                    if (status) {

                        status.textContent =
                            "✕ ID not found.";
                    }

                    if (
                        typeof window.clearHighlight ===
                        "function"
                    ) {

                        try {

                            window.clearHighlight(
                                activeState
                            );

                        } catch (e) {}
                    }

                    if (
                        typeof window.updateIDPanelVisibilityUI ===
                        "function"
                    ) {

                        try {

                            window.updateIDPanelVisibilityUI(
                                null
                            );

                        } catch (e) {}
                    }

                    return;
                }

                // -------------------------------------------------
                // Save selection FIRST
                // -------------------------------------------------

                activeState.selectedID =
                    id;

                /*
                 * Make absolutely sure the selected element
                 * is available to visibility.js.
                 */
                activeState.highlighted =
                    el;

                // -------------------------------------------------
                // Highlight
                // -------------------------------------------------

                if (
                    typeof window.highlightElement ===
                    "function"
                ) {

                    try {

                        window.highlightElement(
                            el,
                            activeState
                        );

                    } catch (e) {

                        console.warn(
                            "ID Panel: highlight failed:",
                            e
                        );
                    }
                }

                // -------------------------------------------------
                // IMMEDIATE visibility synchronization
                // -------------------------------------------------

                syncVisibility(
                    activeState
                );

                // -------------------------------------------------
                // Code references
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
                // Display inspector information
                // -------------------------------------------------

                if (code) {

                    const computed =
                        getComputedStyle(
                            el
                        );

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
                }

                if (status) {

                    status.textContent =
                        "✓ #" +
                        id;
                }

                // -------------------------------------------------
                // Second direct synchronization
                //
                // This is NOT a timeout. It simply lets the
                // highlight/selection code finish before the
                // visibility UI is refreshed once more.
                // -------------------------------------------------

                syncVisibility(
                    activeState
                );
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

        // -----------------------------------------------------
        // Start UI
        // -----------------------------------------------------

        window.__IDPanelStart();
    }

    // =========================================================
    // Error handling
    // =========================================================

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
