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
        // COG
        // =========================================================

        const cog =
            document.createElement("button");

        cog.type =
            "button";

        cog.className =
            "inspector-cog";

        cog.textContent =
            "⚙";

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

        hueRow.appendChild(hueLabel);
        hueRow.appendChild(hueValue);

        const hue =
            document.createElement("input");

        hue.type =
            "range";

        hue.min =
            "0";

        hue.max =
            "360";

        hue.step =
            "1";

        hue.value =
            String(state.hue);

        hue.className =
            "inspector-hue";

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
            String(state.opacity);

        opacityRow.appendChild(
            opacityLabel
        );

        opacityRow.appendChild(
            opacityValue
        );

        const opacity =
            document.createElement("input");

        opacity.type =
            "range";

        opacity.min =
            "0";

        opacity.max =
            "50";

        opacity.step =
            "1";

        opacity.value =
            String(state.opacity);

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

        idInput.type =
            "text";

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
        // FILTER IDS
        // =========================================================

        const filter =
            document.createElement("input");

        filter.type =
            "text";

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
        // PICK ASSET
        // =========================================================

        const pick =
            document.createElement("button");

        pick.type =
            "button";

        pick.className =
            "inspector-button inspector-pick";

        pick.textContent =
            "◉ Pick Asset";

        // =========================================================
        // VISIBILITY
        // =========================================================

        const visibilityWrap =
            document.createElement("div");

        visibilityWrap.className =
            "inspector-visibility-wrap";

        const visibilityControl =
            document.createElement("div");

        visibilityControl.className =
            "inspector-visibility-control";

        const visibilityText =
            document.createElement("span");

        visibilityText.className =
            "inspector-visibility-text";

        visibilityText.textContent =
            "Toggle visibility: OFF";

        const visibilitySwitch =
            document.createElement("label");

        visibilitySwitch.className =
            "inspector-switch";

        const visibilityInput =
            document.createElement("input");

        visibilityInput.type =
            "checkbox";

        visibilityInput.checked =
            false;

        const visibilitySlider =
            document.createElement("span");

        visibilitySlider.className =
            "inspector-switch-slider";

        visibilitySwitch.appendChild(
            visibilityInput
        );

        visibilitySwitch.appendChild(
            visibilitySlider
        );

        visibilityControl.appendChild(
            visibilityText
        );

        visibilityControl.appendChild(
            visibilitySwitch
        );

        visibilityWrap.appendChild(
            visibilityControl
        );

        // =========================================================
        // ID LIST
        // =========================================================

        const list =
            document.createElement("div");

        list.className =
            "inspector-list";

        // =========================================================
        // CODE
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
        // BUILD PANEL
        // =========================================================

        panel.appendChild(header);
        panel.appendChild(hueWrap);
        panel.appendChild(opacityWrap);
        panel.appendChild(idInput);
        panel.appendChild(filter);
        panel.appendChild(pick);
        panel.appendChild(visibilityWrap);
        panel.appendChild(list);
        panel.appendChild(code);
        panel.appendChild(status);

        root.appendChild(cog);
        root.appendChild(panel);

        document.documentElement.appendChild(
            root
        );

        // =========================================================
        // VISIBILITY UI
        // =========================================================

        function updateVisibilityUI() {

            if (
                typeof window.getAssetVisibility !==
                "function"
            ) {
                visibilityInput.disabled =
                    true;

                visibilityText.textContent =
                    "Toggle visibility: OFF";

                return;
            }

            const visible =
                window.getAssetVisibility(
                    state
                );

            if (visible === null) {

                visibilityInput.checked =
                    false;

                visibilityInput.disabled =
                    true;

                visibilityText.textContent =
                    "Toggle visibility: OFF";

                return;
            }

            visibilityInput.disabled =
                false;

            visibilityInput.checked =
                Boolean(visible);

            visibilityText.textContent =
                visible
                    ? "Toggle visibility: ON"
                    : "Toggle visibility: OFF";
        }

        visibilityInput.addEventListener(
            "change",
            function (e) {

                e.stopPropagation();

                if (
                    typeof window.setAssetVisibility !==
                    "function"
                ) {
                    return;
                }

                if (!state.highlighted) {
                    updateVisibilityUI();
                    return;
                }

                window.setAssetVisibility(
                    state,
                    visibilityInput.checked
                );

                updateVisibilityUI();
            }
        );

        visibilityInput.addEventListener(
            "click",
            function (e) {
                e.stopPropagation();
            }
        );

        visibilityInput.addEventListener(
            "pointerdown",
            function (e) {
                e.stopPropagation();
            }
        );

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

            if (
                typeof window.updateHighlightColor ===
                "function"
            ) {
                try {
                    window.updateHighlightColor(
                        state
                    );
                } catch (e) {}
            }
        }

        hue.addEventListener(
            "input",
            function (e) {
                e.stopPropagation();
                applyHue();
            }
        );

        hue.addEventListener(
            "change",
            function (e) {
                e.stopPropagation();
                applyHue();
            }
        );

        hue.addEventListener(
            "pointerdown",
            function (e) {
                e.stopPropagation();
            }
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

            value =
                Math.max(
                    0,
                    Math.min(
                        50,
                        value
                    )
                );

            state.opacity =
                value;

            opacity.value =
                String(value);

            opacityValue.textContent =
                String(value);

            const alpha =
                1 -
                (value / 100);

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
            }
        );

        opacity.addEventListener(
            "pointerdown",
            function (e) {
                e.stopPropagation();
            }
        );

        applyOpacity();

        // =========================================================
        // INSPECT ID
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

            updateVisibilityUI();
        }

        // =========================================================
        // RENDER IDS
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
        // CLOSE PANEL
        // =========================================================

        function closePanel() {

            panel.classList.remove(
                "open"
            );

            state.panelOpen =
                false;

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

            updateVisibilityUI();
        }

        // =========================================================
        // COG
        // =========================================================

        cog.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                if (
                    panel.classList.contains(
                        "open"
                    )
                ) {
                    closePanel();

                } else {

                    panel.classList.add(
                        "open"
                    );

                    state.panelOpen =
                        true;

                    updateVisibilityUI();
                }
            }
        );

        // =========================================================
        // CLOSE BUTTON
        // =========================================================

        close.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                closePanel();
            }
        );

        // =========================================================
        // TEXT FIELD HANDLING
        // =========================================================

        function makeTextFieldWork(
            input,
            onInput,
            allowEnter
        ) {

            input.addEventListener(
                "keydown",
                function (e) {

                    e.stopPropagation();

                    if (
                        allowEnter &&
                        e.key === "Enter"
                    ) {
                        e.preventDefault();

                        inspectCurrentID();
                    }
                }
            );

            input.addEventListener(
                "keypress",
                function (e) {
                    e.stopPropagation();
                }
            );

            input.addEventListener(
                "keyup",
                function (e) {
                    e.stopPropagation();
                }
            );

            input.addEventListener(
                "beforeinput",
                function (e) {
                    e.stopPropagation();
                }
            );

            input.addEventListener(
                "input",
                function (e) {

                    e.stopPropagation();

                    if (
                        typeof onInput ===
                        "function"
                    ) {
                        onInput();
                    }
                }
            );

            input.addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();
                }
            );

            input.addEventListener(
                "pointerdown",
                function (e) {
                    e.stopPropagation();
                }
            );

            input.addEventListener(
                "focus",
                function (e) {
                    e.stopPropagation();
                }
            );
        }

        makeTextFieldWork(
            idInput,
            null,
            true
        );

        makeTextFieldWork(
            filter,
            function () {
                renderIDList();
            },
            false
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

                updateVisibilityUI();
            }
        );

        // =========================================================
        // INITIAL LIST
        // =========================================================

        renderIDList();

        updateVisibilityUI();

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

            pick: pick,

            visibilityWrap:
                visibilityWrap,

            visibilityInput:
                visibilityInput,

            visibilityText:
                visibilityText,

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
