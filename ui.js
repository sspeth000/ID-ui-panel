(function () {
    "use strict";

    window.__IDPanelStart = function () {

        // =========================================================
        // REMOVE EXISTING PANEL
        // =========================================================

        if (window.__IDPanelUI) {
            try {
                window.__IDPanelUI.remove();
            } catch (e) {}

            window.__IDPanelUI = null;
        }

        // =========================================================
        // STATE
        // =========================================================

        const state =
            window.__IDPanelState ||
            (
                typeof window.createInspectorState === "function"
                    ? window.createInspectorState()
                    : {
                        picking: false,
                        highlighted: null,
                        oldOutline: "",
                        selectedID: "",
                        panelOpen: false,
                        opacity: 0,
                        hue: 120,
                        pickerHandler: null
                    }
            );

        window.__IDPanelState = state;

        if (!Number.isFinite(state.hue)) {
            state.hue = 120;
        }

        if (!Number.isFinite(state.opacity)) {
            state.opacity = 0;
        }

        // =========================================================
        // ROOT
        // =========================================================

        const root =
            document.createElement("div");

        root.id =
            "__IDPanelRoot";

        root.className =
            "inspector-root";

        // =========================================================
        // COG BUTTON
        // =========================================================

        const cog =
            document.createElement("button");

        cog.type =
            "button";

        cog.className =
            "inspector-cog";

        cog.textContent =
            "⚙";

        cog.setAttribute(
            "aria-label",
            "Open Asset ID Inspector"
        );

        // =========================================================
        // PANEL
        // =========================================================

        const panel =
            document.createElement("div");

        panel.className =
            "inspector-panel";

        // =========================================================
        // HEADER
        // =========================================================

        const header =
            document.createElement("div");

        header.className =
            "inspector-header";

        const title =
            document.createElement("b");

        title.className =
            "inspector-title";

        title.textContent =
            "ASSET ID INSPECTOR";

        const close =
            document.createElement("button");

        close.type =
            "button";

        close.className =
            "inspector-close";

        close.textContent =
            "×";

        header.appendChild(title);
        header.appendChild(close);

        // =========================================================
        // HUE
        // =========================================================

        const hueWrap =
            document.createElement("div");

        hueWrap.className =
            "inspector-hue-wrap";

        const hueRow =
            document.createElement("div");

        hueRow.className =
            "inspector-hue-row";

        const hueLabel =
            document.createElement("span");

        hueLabel.className =
            "inspector-hue-label";

        hueLabel.textContent =
            "Hue";

        const hueValue =
            document.createElement("span");

        hueValue.className =
            "inspector-hue-value";

        hueValue.textContent =
            String(state.hue) + "°";

        hueRow.append
