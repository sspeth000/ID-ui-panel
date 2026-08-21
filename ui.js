(function () {
    "use strict";

    window.__IDPanelStart = function () {

        // Remove existing panel if one is already running.
        if (window.__IDPanelUI) {
            try {
                window.__IDPanelUI.remove();
            } catch (e) {}

            window.__IDPanelUI = null;
        }

        // Shared state.
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

        // =========================================================
        // ROOT
        // =========================================================

        const root = document.createElement("div");

        root.id = "__IDPanelRoot";
        root.className = "inspector-root";

        // =========================================================
        // COG
        // =========================================================

        const cog = document.createElement("button");

        cog.type = "button";
        cog.className = "inspector-cog";
        cog.textContent = "⚙";

        cog.setAttribute(
            "aria-label",
            "Open Asset ID Inspector"
        );

        // =========================================================
        // PANEL
        // =========================================================

        const panel = document.createElement("div");

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

        close.type = "button";

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

        hueRow.appendChild(hueLabel);
        hueRow.appendChild(hueValue);

        const hue =
            document.createElement("input");

        hue.type = "range";
        hue.min = "0";
        hue.max = "360";
        hue.step = "1";
        hue.value = String(state.hue);

        hue.className =
            "inspector-hue";

        hue.setAttribute(
            "aria-label",
            "Panel hue"
        );

        hueWrap.appendChild(hueRow);
        hueWrap.appendChild(hue);

        // =========================================================
        // OPACITY
        // =========================================================

        const opacityWrap =
            document.createElement("div");

        opacityWrap.className =
            "inspector-opacity-wrap";

        const opacityRow =
            document.createElement("div");

        opacityRow.className =
            "inspector-opacity-row";

        const opacityLabel =
            document.createElement("span");

        opacityLabel.className =
            "inspector-opacity-label";

        opacityLabel.textContent =
            "Opacity";

        const opacityValue =
            document.createElement("span");

        opacityValue.className =
            "inspector-opacity-value";

        opacityValue.textContent =
            "0";

        opacityRow.appendChild(
            opacityLabel
        );

        opacityRow.appendChild(
            opacityValue
        );

        const opacity =
            document.createElement("input");

        opacity.type = "range";
        opacity.min = "0";
        opacity.max = "50";
        opacity.step = "1";

        opacity.value =
            Number.isFinite(state.opacity)
                ? state.opacity
                : 0;

        opacity.className =
            "inspector-opacity";

        opacityWrap.appendChild(
            opacityRow
        );

        opacityWrap.appendChild(
            opacity
        );

        // =========================================================
        // ENTER ID
        // =========================================================

        const idInput =
            document.createElement("input");

        idInput.type = "text";

        idInput.className =
            "inspector-input";

        idInput.placeholder =
            "Enter ID...";

        idInput.autocomplete =
            "off";

        idInput.autocorrect =
            "off";

        idInput.autocapitalize =
            "off";

        idInput.spellcheck =
            false;

        // =========================================================
        // INSPECT
        // =========================================================

        const inspect =
            document.createElement("button");

        inspect.type = "button";

        inspect.className =
            "inspector-button";

        inspect.textContent =
            "Inspect ID";

        // =========================================================
        // PICK ASSET
        // =========================================================

        const pick =
            document.createElement("button");

        pick.type = "button";

        pick.className =
            "inspector-button inspector-pick";

        pick.textContent =
            "◉ Pick Asset";

        // =========================================================
        // FILTER
        // =========================================================

        const filter =
            document.createElement("input");

        filter.type = "text";

        filter.className =
            "inspector-input";

        filter.placeholder =
            "Filter IDs...";

        filter.autocomplete =
            "off";

        filter.autocorrect =
            "off";

        filter.autocapitalize =
            "off";

        filter.spellcheck =
            false;

        // =========================================================
        // ID LIST
        // =========================================================

        const list =
            document.createElement("div");

        list.className =
            "inspector-list";

        // =========================================================
        // CODE DISPLAY
        // =========================================================

        const code =
            document.createElement("pre");

        code.className =
            "inspector-code";

        // =========================================================
        // STATUS
        // =========================================================

        const status =
            document.createElement("div");

        status.className =
            "inspector-status";

        status.textContent =
            "✓ Inspector ready";

        // =========================================================
        // BUILD
        // =========================================================

        panel.appendChild(header);

        // Hue ABOVE opacity.
        panel.appendChild(hueWrap);
        panel.appendChild(opacityWrap);

        panel.appendChild(idInput);
        panel.appendChild(inspect);
        panel.appendChild(pick);
        panel.appendChild(filter);
        panel.appendChild(list);
        panel.appendChild(code);
        panel.appendChild(status);

        root.appendChild(cog);
        root.appendChild(panel);

        document.documentElement.appendChild(root);

        // =========================================================
        // HUE
        // =========================================================

        function applyHue() {

            let value =
                parseInt(
                    hue.value,
                    10
                );

            if (!Number.isFinite(value)) {
                value = 120;
            }

            value =
                Math.max(
                    0,
                    Math.min(
                        360,
                        value
                    )
                );

            state.hue =
                value;

            hue.value =
                String(value);

            hueValue.textContent =
                String(value) + "°";

            root.style.setProperty(
                "--id-hue",
                String(value)
            );

            panel.style.setProperty(
                "--id-hue",
                String(value)
            );
        }

        hue.addEventListener(
            "input",
            function (e) {

                e.stopPropagation();

                applyHue();

            },
            true
        );

        hue.addEventListener(
            "change",
            function (e) {

                e.stopPropagation();

                applyHue();

            },
            true
        );

        hue.addEventListener(
            "pointerdown",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        applyHue();

        // =========================================================
        // OPACITY
        // =========================================================

        function applyOpacity() {

            let value =
                parseInt(
                    opacity.value,
                    10
                );

            if (!Number.isFinite(value)) {
                value = 0;
            }

            state.opacity =
                value;

            const alpha =
                1 - (value / 100);

            opacityValue.textContent =
                String(value);

            panel.style.opacity =
                String(alpha);

            cog.style.opacity =
                String(alpha);
        }

        opacity.addEventListener(
            "input",
            function (e) {

                e.stopPropagation();

                applyOpacity();

            },
            true
        );

        opacity.addEventListener(
            "pointerdown",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        applyOpacity();

        // =========================================================
        // INSPECT HELPER
        // =========================================================

        function inspectCurrentID() {

            if (
                typeof window.inspectID !==
                "function"
            ) {

                code.style.display =
                    "block";

                code.textContent =
                    "Inspector module is not loaded.";

                status.textContent =
                    "✕ Inspector unavailable.";

                return;
            }

            window.inspectID(
                idInput.value,
                state,
                code,
                status
            );
        }

        // =========================================================
        // RENDER ID LIST
        // =========================================================

        function renderIDList() {

            if (
                typeof window.renderIDs !==
                "function"
            ) {

                status.textContent =
                    "✕ IDs module failed to load.";

                return;
            }

            window.renderIDs(
                filter.value,
                list,
                function (id) {

                    idInput.value =
                        id;

                    inspectCurrentID();

                }
            );
        }

        // =========================================================
        // COG
        // =========================================================

        cog.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                panel.classList.toggle(
                    "open"
                );

                state.panelOpen =
                    panel.classList.contains(
                        "open"
                    );

            },
            true
        );

        // =========================================================
        // CLOSE
        // =========================================================

        close.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                panel.classList.remove(
                    "open"
                );

                state.panelOpen =
                    false;

            },
            true
        );

        // =========================================================
        // INSPECT BUTTON
        // =========================================================

        inspect.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                inspectCurrentID();

            },
            true
        );

        // =========================================================
        // ENTER ID
        // =========================================================

        idInput.addEventListener(
            "keydown",
            function (e) {

                e.stopPropagation();

                if (e.key === "Enter") {

                    e.preventDefault();

                    inspectCurrentID();

                }

            },
            true
        );

        idInput.addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        idInput.addEventListener(
            "pointerdown",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        // =========================================================
        // FILTER
        // =========================================================

        filter.addEventListener(
            "input",
            function (e) {

                e.stopPropagation();

                renderIDList();

            },
            true
        );

        filter.addEventListener(
            "keydown",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        filter.addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        filter.addEventListener(
            "pointerdown",
            function (e) {

                e.stopPropagation();

            },
            true
        );

        // =========================================================
        // PICK ASSET
        // =========================================================

        pick.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                if (
                    typeof window.togglePicker !==
                    "function"
                ) {

                    status.textContent =
                        "✕ Picker module failed to load.";

                    return;
                }

                window.togglePicker(
                    state,
                    pick,
                    idInput,
                    code,
                    status
                );

            },
            true
        );

        // =========================================================
        // INITIAL ID LIST
        // =========================================================

        renderIDList();

        // =========================================================
        // PUBLIC HANDLE
        // =========================================================

        window.__IDPanelUI = {

            root: root,
            panel: panel,
            cog: cog,
            close: close,

            hue: hue,
            hueValue: hueValue,

            opacity: opacity,
            opacityValue: opacityValue,

            idInput: idInput,
            inspect: inspect,
            pick: pick,
            filter: filter,
            list: list,
            code: code,
            status: status,

            remove: function () {

                if (
                    state.picking &&
                    typeof window.stopInspectorPicker ===
                    "function"
                ) {

                    try {

                        window.stopInspectorPicker(
                            state,
                            pick,
                            status
                        );

                    } catch (e) {}

                }

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

                if (
                    root &&
                    root.parentNode
                ) {

                    root.parentNode.removeChild(
                        root
                    );

                }

                window.__IDPanelUI =
                    null;

            }

        };
    };

    // =============================================================
    // START UI
    // =============================================================

    window.__IDPanelStart();

})();
