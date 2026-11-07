(function () {
    "use strict";

    // ID-ui-panel: standalone single-file build.
    // UI, styles, scanning, inspection, highlighting, picking,
    // and visibility logic are bundled here.

    if (window.__IDPanelUI) {
        try { window.__IDPanelUI.remove(); } catch (error) {}
        return;
    }

    try {
        const oldStyle = document.getElementById("__IDPanelStyles");
        if (oldStyle) oldStyle.remove();

        const style = document.createElement("style");
        style.id = "__IDPanelStyles";
        style.textContent = "/* =========================================================\n   ID UI PANEL\n   COMPLETE STYLESHEET\n   ========================================================= */\n\n#__IDPanelRoot,\n#__IDPanelRoot * {\n    box-sizing: border-box;\n}\n\n/* =========================================================\n   ROOT\n   ========================================================= */\n\n#__IDPanelRoot {\n    position: fixed !important;\n\n    left: 0 !important;\n    bottom: 0 !important;\n\n    width: 290px !important;\n    height: 560px !important;\n\n    margin: 0 !important;\n    padding: 0 !important;\n\n    z-index: 2147483647 !important;\n\n    pointer-events: none !important;\n\n    font-family: monospace !important;\n\n    --id-hue: 120;\n\n    /*\n     * Centralized Hue colors.\n     * Everything that should react to the Hue slider\n     * derives its color from these variables.\n     */\n\n    --id-accent:\n        hsl(\n            var(--id-hue),\n            100%,\n            55%\n        );\n\n    --id-accent-light:\n        hsl(\n            var(--id-hue),\n            80%,\n            75%\n        );\n\n    --id-accent-text:\n        hsl(\n            var(--id-hue),\n            70%,\n            68%\n        );\n\n    --id-accent-border:\n        hsl(\n            var(--id-hue),\n            45%,\n            38%\n        );\n\n    --id-accent-bg:\n        hsl(\n            var(--id-hue),\n            40%,\n            16%\n        );\n\n    --id-accent-bg-hover:\n        hsl(\n            var(--id-hue),\n            40%,\n            21%\n        );\n\n    --id-accent-glow:\n        hsla(\n            var(--id-hue),\n            100%,\n            50%,\n            .25\n        );\n}\n\n/* =========================================================\n   GLOBAL FONT\n   ========================================================= */\n\n#__IDPanelRoot button,\n#__IDPanelRoot input,\n#__IDPanelRoot pre {\n    font-family: monospace !important;\n}\n\n/* =========================================================\n   COG\n   ========================================================= */\n\n#__IDPanelRoot .inspector-cog {\n    position: absolute;\n\n    left: 0;\n    bottom: 0;\n\n    width: 30px;\n    height: 30px;\n\n    padding: 0;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 8px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            30%,\n            8%\n        );\n\n    color:\n        var(--id-accent-light);\n\n    font: 14px monospace;\n\n    cursor: pointer;\n\n    pointer-events: auto;\n\n    box-shadow:\n        0 3px 12px\n        rgba(0, 0, 0, .65);\n\n    transition:\n        border-color .15s ease,\n        color .15s ease,\n        background .15s ease,\n        box-shadow .15s ease;\n}\n\n#__IDPanelRoot .inspector-cog:hover {\n    border-color:\n        var(--id-accent);\n\n    color:\n        var(--id-accent);\n\n    background:\n        var(--id-accent-bg);\n\n    box-shadow:\n        0 0 9px\n        var(--id-accent-glow);\n}\n\n/* =========================================================\n   PANEL\n   ========================================================= */\n\n#__IDPanelRoot .inspector-panel {\n    display: none;\n\n    position: absolute;\n\n    left: 0;\n    bottom: 36px;\n\n    width: 280px;\n    height: 510px;\n\n    padding: 7px;\n\n    overflow-y: auto;\n    overflow-x: hidden;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 10px;\n\n    background:\n        #0b100d;\n\n    color:\n        #dce9df;\n\n    box-shadow:\n        0 8px 25px\n        rgba(0, 0, 0, .75);\n\n    pointer-events: auto;\n\n    scrollbar-color:\n        var(--id-accent-border)\n        #080c09;\n}\n\n#__IDPanelRoot .inspector-panel.open {\n    display: block;\n}\n\n/* =========================================================\n   SCROLLBAR\n   ========================================================= */\n\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar {\n    width: 6px;\n}\n\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar-track {\n    background: #070a08;\n}\n\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar-thumb {\n    background:\n        var(--id-accent-border);\n\n    border-radius: 10px;\n}\n\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar-thumb:hover {\n    background:\n        var(--id-accent);\n}\n\n/* =========================================================\n   HEADER\n   ========================================================= */\n\n#__IDPanelRoot .inspector-header {\n    height: 23px;\n\n    display: flex;\n\n    align-items: center;\n    justify-content: space-between;\n}\n\n#__IDPanelRoot .inspector-title {\n    color:\n        var(--id-accent-text);\n\n    font-size: 8px;\n    font-weight: bold;\n}\n\n#__IDPanelRoot .inspector-close {\n    width: 21px;\n    height: 21px;\n\n    padding: 0;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            25%,\n            9%\n        );\n\n    color:\n        var(--id-accent-light);\n\n    cursor: pointer;\n\n    font: 14px monospace;\n\n    transition:\n        background .15s ease,\n        border-color .15s ease,\n        color .15s ease;\n}\n\n#__IDPanelRoot .inspector-close:hover {\n    background:\n        var(--id-accent-bg);\n\n    border-color:\n        var(--id-accent);\n\n    color:\n        var(--id-accent);\n}\n\n/* =========================================================\n   HUE\n   ========================================================= */\n\n#__IDPanelRoot .inspector-hue-wrap {\n    width: 100%;\n\n    margin: 3px 0 4px;\n    padding: 5px 6px;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            25%,\n            7%\n        );\n}\n\n#__IDPanelRoot .inspector-hue-row {\n    display: flex;\n\n    align-items: center;\n    justify-content: space-between;\n}\n\n#__IDPanelRoot .inspector-hue-label {\n    color:\n        var(--id-accent-text);\n\n    font: 8px monospace;\n}\n\n#__IDPanelRoot .inspector-hue-value {\n    color:\n        var(--id-accent-light);\n\n    font: 8px monospace;\n}\n\n#__IDPanelRoot .inspector-hue {\n    display: block;\n\n    width: 100%;\n    height: 18px;\n\n    margin: 2px 0 0;\n    padding: 0;\n\n    cursor: pointer;\n\n    accent-color:\n        var(--id-accent);\n}\n\n/* =========================================================\n   OPACITY\n   ========================================================= */\n\n#__IDPanelRoot .inspector-opacity-wrap {\n    width: 100%;\n\n    margin: 3px 0 4px;\n    padding: 5px 6px;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            25%,\n            7%\n        );\n}\n\n#__IDPanelRoot .inspector-opacity-row {\n    display: flex;\n\n    align-items: center;\n    justify-content: space-between;\n}\n\n#__IDPanelRoot .inspector-opacity-label {\n    color:\n        var(--id-accent-text);\n\n    font: 8px monospace;\n}\n\n#__IDPanelRoot .inspector-opacity-value {\n    color:\n        var(--id-accent-light);\n\n    font: 8px monospace;\n}\n\n#__IDPanelRoot .inspector-opacity {\n    display: block;\n\n    width: 100%;\n    height: 18px;\n\n    margin: 2px 0 0;\n    padding: 0;\n\n    cursor: pointer;\n\n    accent-color:\n        var(--id-accent);\n}\n\n/* =========================================================\n   TEXT INPUTS\n   ========================================================= */\n\n#__IDPanelRoot .inspector-input {\n    display: block;\n\n    width: 100%;\n    height: 26px;\n\n    margin-top: 4px;\n    padding: 5px 7px;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    outline: none;\n\n    background:\n        #050806;\n\n    color:\n        var(--id-accent-light);\n\n    font: 9px monospace !important;\n\n    pointer-events: auto !important;\n\n    user-select: text !important;\n    -webkit-user-select: text !important;\n\n    transition:\n        border-color .15s ease,\n        box-shadow .15s ease;\n}\n\n#__IDPanelRoot .inspector-input::placeholder {\n    color:\n        hsl(\n            var(--id-hue),\n            15%,\n            43%\n        );\n}\n\n#__IDPanelRoot .inspector-input:focus {\n    border-color:\n        var(--id-accent);\n\n    box-shadow:\n        0 0 6px\n        var(--id-accent-glow);\n}\n\n/* =========================================================\n   BUTTONS\n   ========================================================= */\n\n#__IDPanelRoot .inspector-button {\n    width: 100%;\n    height: 25px;\n\n    margin-top: 4px;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    background:\n        var(--id-accent-bg);\n\n    color:\n        var(--id-accent-light);\n\n    cursor: pointer;\n\n    font: 9px monospace !important;\n\n    pointer-events: auto !important;\n\n    transition:\n        background .15s ease,\n        border-color .15s ease,\n        color .15s ease,\n        box-shadow .15s ease;\n}\n\n#__IDPanelRoot .inspector-button:hover {\n    background:\n        var(--id-accent-bg-hover);\n\n    border-color:\n        var(--id-accent);\n\n    color:\n        #ffffff;\n\n    box-shadow:\n        0 0 6px\n        var(--id-accent-glow);\n}\n\n#__IDPanelRoot .inspector-button:active {\n    background:\n        hsl(\n            var(--id-hue),\n            40%,\n            12%\n        );\n}\n\n/* =========================================================\n   VISIBILITY\n   ========================================================= */\n\n#__IDPanelRoot .inspector-visibility-wrap {\n    width: 100%;\n\n    margin-top: 5px;\n    margin-bottom: 4px;\n}\n\n#__IDPanelRoot .inspector-visibility-control {\n    width: 100%;\n    height: 30px;\n\n    display: flex;\n\n    align-items: center;\n    justify-content: space-between;\n\n    padding: 4px 7px;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            25%,\n            7%\n        );\n}\n\n#__IDPanelRoot .inspector-visibility-text {\n    color:\n        var(--id-accent-text);\n\n    font: 8px monospace;\n    font-weight: bold;\n}\n\n/* =========================================================\n   SWITCH\n   ========================================================= */\n\n#__IDPanelRoot .inspector-switch {\n    position: relative;\n\n    display: block;\n\n    width: 42px;\n    height: 20px;\n\n    flex-shrink: 0;\n}\n\n#__IDPanelRoot .inspector-switch input {\n    position: absolute;\n\n    width: 1px;\n    height: 1px;\n\n    opacity: 0;\n\n    pointer-events: none;\n}\n\n#__IDPanelRoot .inspector-switch-slider {\n    position: absolute;\n\n    left: 0;\n    top: 0;\n\n    width: 42px;\n    height: 20px;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 20px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            15%,\n            10%\n        );\n\n    cursor: pointer;\n\n    transition:\n        background .15s ease,\n        border-color .15s ease,\n        box-shadow .15s ease;\n}\n\n#__IDPanelRoot .inspector-switch-slider::before {\n    content: \"\";\n\n    position: absolute;\n\n    left: 2px;\n    top: 2px;\n\n    width: 14px;\n    height: 14px;\n\n    border-radius: 50%;\n\n    background:\n        hsl(\n            var(--id-hue),\n            15%,\n            55%\n        );\n\n    transition:\n        transform .15s ease,\n        background .15s ease;\n}\n\n/* =========================================================\n   SWITCH ON\n   ========================================================= */\n\n#__IDPanelRoot\n.inspector-switch\ninput:checked\n+ .inspector-switch-slider {\n\n    border-color:\n        var(--id-accent);\n\n    background:\n        hsl(\n            var(--id-hue),\n            55%,\n            18%\n        );\n\n    box-shadow:\n        0 0 7px\n        var(--id-accent-glow);\n}\n\n#__IDPanelRoot\n.inspector-switch\ninput:checked\n+ .inspector-switch-slider::before {\n\n    transform:\n        translateX(22px);\n\n    background:\n        var(--id-accent);\n}\n\n/* =========================================================\n   SWITCH HOVER\n   ========================================================= */\n\n#__IDPanelRoot\n.inspector-switch:hover\n.inspector-switch-slider {\n\n    border-color:\n        var(--id-accent);\n}\n\n#__IDPanelRoot\n.inspector-switch\ninput:checked:hover\n+ .inspector-switch-slider {\n\n    box-shadow:\n        0 0 10px\n        var(--id-accent-glow);\n}\n\n/* =========================================================\n   SWITCH DISABLED\n   ========================================================= */\n\n#__IDPanelRoot\n.inspector-switch\ninput:disabled\n+ .inspector-switch-slider {\n\n    opacity: .35;\n\n    cursor:\n        not-allowed;\n}\n\n/* =========================================================\n   ID LIST\n   ========================================================= */\n\n#__IDPanelRoot .inspector-list {\n    width: 100%;\n    height: 90px;\n\n    margin-top: 4px;\n\n    overflow: auto;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    padding: 2px;\n\n    background:\n        #050806;\n}\n\n#__IDPanelRoot .inspector-list::-webkit-scrollbar {\n    width: 5px;\n}\n\n#__IDPanelRoot .inspector-list::-webkit-scrollbar-thumb {\n    background:\n        var(--id-accent-border);\n\n    border-radius: 10px;\n}\n\n#__IDPanelRoot .inspector-id-button {\n    display: block;\n\n    width: 100%;\n\n    margin: 1px 0;\n    padding: 4px;\n\n    text-align: left;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 5px;\n\n    background:\n        hsl(\n            var(--id-hue),\n            20%,\n            6%\n        );\n\n    color:\n        hsl(\n            var(--id-hue),\n            20%,\n            62%\n        );\n\n    cursor: pointer;\n\n    font: 8px monospace !important;\n\n    transition:\n        background .12s ease,\n        border-color .12s ease,\n        color .12s ease;\n}\n\n#__IDPanelRoot .inspector-id-button:hover {\n    background:\n        var(--id-accent-bg);\n\n    border-color:\n        var(--id-accent);\n\n    color:\n        var(--id-accent-light);\n}\n\n/* =========================================================\n   CODE\n   ========================================================= */\n\n#__IDPanelRoot .inspector-code {\n    display: none;\n\n    width: 100%;\n    height: 290px;\n\n    margin: 4px 0 0;\n    padding: 7px;\n\n    overflow: auto;\n\n    white-space: pre-wrap;\n    word-break: break-word;\n\n    border:\n        1px solid\n        var(--id-accent-border);\n\n    border-radius: 6px;\n\n    background:\n        #050706;\n\n    color:\n        hsl(\n            var(--id-hue),\n            20%,\n            70%\n        );\n\n    font: 7px/1.35 monospace !important;\n\n    user-select: text;\n    -webkit-user-select: text;\n}\n\n#__IDPanelRoot .inspector-code::-webkit-scrollbar {\n    width: 5px;\n}\n\n#__IDPanelRoot .inspector-code::-webkit-scrollbar-thumb {\n    background:\n        var(--id-accent-border);\n\n    border-radius: 10px;\n}\n\n/* =========================================================\n   STATUS\n   ========================================================= */\n\n#__IDPanelRoot .inspector-status {\n    margin-top: 4px;\n\n    color:\n        var(--id-accent-text);\n\n    font: 7px monospace !important;\n}\n\n/* =========================================================\n   MOBILE\n   ========================================================= */\n\n@media (max-width: 600px) {\n\n    #__IDPanelRoot {\n        width: 290px !important;\n    }\n\n    #__IDPanelRoot .inspector-panel {\n        width: 280px;\n    }\n\n    #__IDPanelRoot .inspector-input {\n        font-size: 9px !important;\n    }\n\n    #__IDPanelRoot .inspector-switch {\n        width: 42px;\n        height: 20px;\n    }\n}\n\n\n/* =========================================================\n   2.0 POLISH: RESULT COUNT, ELEMENT TYPES & CODE ACTIONS\n   ========================================================= */\n\n#__IDPanelRoot .inspector-list-meta {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin: 8px 1px 4px;\n    color: var(--id-accent-text);\n    font: 9px/1.4 monospace;\n    letter-spacing: .08em;\n}\n\n#__IDPanelRoot .inspector-list-count {\n    min-width: 22px;\n    padding: 2px 6px;\n    border: 1px solid var(--id-accent-border);\n    border-radius: 999px;\n    color: var(--id-accent-light);\n    text-align: center;\n    letter-spacing: 0;\n}\n\n#__IDPanelRoot .inspector-list {\n    height: 145px;\n    padding: 4px;\n    overscroll-behavior: contain;\n}\n\n#__IDPanelRoot .inspector-id-button {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    min-height: 27px;\n    margin: 2px 0;\n    padding: 5px 7px;\n    overflow: hidden;\n}\n\n#__IDPanelRoot .inspector-id-tag {\n    flex: 0 0 auto;\n    min-width: 42px;\n    padding: 2px 4px;\n    border-radius: 4px;\n    background: var(--id-accent-bg);\n    color: var(--id-accent);\n    font-size: 8px;\n    text-align: center;\n}\n\n#__IDPanelRoot .inspector-id-name {\n    overflow: hidden;\n    color: inherit;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n#__IDPanelRoot .inspector-empty {\n    padding: 12px 7px;\n    color: #819087;\n    font: 10px/1.5 monospace;\n    text-align: center;\n}\n\n#__IDPanelRoot .inspector-code-actions {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: 6px;\n}\n\n#__IDPanelRoot .inspector-copy-code {\n    padding: 5px 9px;\n    border: 1px solid var(--id-accent-border);\n    border-radius: 6px;\n    background: var(--id-accent-bg);\n    color: var(--id-accent-light);\n    cursor: pointer;\n    font: 9px monospace;\n}\n\n#__IDPanelRoot .inspector-copy-code:hover {\n    border-color: var(--id-accent);\n    color: #fff;\n}\n\n#__IDPanelRoot .inspector-code {\n    height: 250px;\n    font-size: 9px !important;\n}\n";
        (document.head || document.documentElement).appendChild(style);

        (function () {
    "use strict";

    window.createInspectorState = function () {
        return {
            picking: false,
            highlighted: null,
            oldOutline: "",
            selectedID: "",
            panelOpen: false,
            opacity: 0,
            pickerHandler: null
        };
    };
})();


(function () {
    "use strict";

    const PANEL_PREFIX = "__IDPanel";

    function isInspectorElement(element) {
        return Boolean(
            element &&
            element.id &&
            (element.id === "__IDPanelRoot" ||
             element.id.indexOf(PANEL_PREFIX) === 0)
        );
    }

    function collectIDElements() {
        return Array.from(document.querySelectorAll("[id]"))
            .filter(function (element) {
                return !isInspectorElement(element);
            });
    }

    window.getPageIDElements = function (filter) {
        const query = String(filter || "").trim().toLowerCase();

        return collectIDElements().filter(function (element) {
            return !query || element.id.toLowerCase().includes(query);
        });
    };

    window.getPageIDs = function (filter) {
        return window.getPageIDElements(filter).map(function (element) {
            return element.id;
        });
    };

    window.renderIDs = function (filter, container, onSelect) {
        if (!container) return [];

        const elements = window.getPageIDElements(filter);
        const fragment = document.createDocumentFragment();

        if (!elements.length) {
            const empty = document.createElement("div");
            empty.className = "inspector-empty";
            empty.textContent = "No matching IDs found.";
            fragment.appendChild(empty);
        }

        elements.forEach(function (element) {
            const button = document.createElement("button");
            const tag = document.createElement("span");
            const name = document.createElement("span");

            button.type = "button";
            button.className = "inspector-id-button";
            button.title = element.tagName.toLowerCase() + " · " + element.id;
            button.setAttribute("data-id", element.id);

            tag.className = "inspector-id-tag";
            tag.textContent = element.tagName.toLowerCase();

            name.className = "inspector-id-name";
            name.textContent = element.id;

            button.appendChild(tag);
            button.appendChild(name);

            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (typeof onSelect === "function") onSelect(element.id);
            });

            fragment.appendChild(button);
        });

        container.replaceChildren(fragment);
        return elements;
    };
})();

(function () {
    "use strict";

    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    window.findCodeReferences = function (id, options) {
        id = String(id || "");
        if (!id) return [];

        options = options || {};
        const contextBefore = Number.isFinite(options.contextBefore) ? options.contextBefore : 500;
        const contextAfter = Number.isFinite(options.contextAfter) ? options.contextAfter : 1400;
        const maxMatches = Number.isFinite(options.maxMatches) ? options.maxMatches : 12;
        const escaped = escapeRegExp(id);
        const patterns = [
            new RegExp("getElementById\\s*\\(\\s*(['\\\"])" + escaped + "\\1\\s*\\)", "g"),
            new RegExp("(?:querySelector|querySelectorAll)\\s*\\(\\s*(['\\\"])#?" + escaped + "\\1\\s*\\)", "g"),
            new RegExp("(['\\\"])" + escaped + "\\1", "g")
        ];

        const results = [];
        const scripts = Array.from(document.scripts).filter(function (script) {
            return !script.src && script.textContent;
        });

        scripts.forEach(function (script, scriptIndex) {
            if (results.length >= maxMatches) return;

            const source = script.textContent || "";
            patterns.forEach(function (pattern) {
                if (results.length >= maxMatches) return;

                pattern.lastIndex = 0;
                let match;

                while ((match = pattern.exec(source)) && results.length < maxMatches) {
                    const start = Math.max(0, match.index - contextBefore);
                    const end = Math.min(source.length, match.index + match[0].length + contextAfter);
                    const snippet = source.slice(start, end);

                    if (!results.some(function (item) {
                        return item.scriptIndex === scriptIndex && item.index === match.index;
                    })) {
                        results.push({
                            scriptIndex: scriptIndex,
                            index: match.index,
                            text: "Inline script " + (scriptIndex + 1) +
                                " · character " + match.index + "\n\n" + snippet
                        });
                    }
                }
            });
        });

        return results.map(function (result) { return result.text; });
    };
})();

(function () {
    "use strict";

    function getHighlightColor(state) {
        let hue = 120;

        if (
            state &&
            Number.isFinite(Number(state.hue))
        ) {
            hue = Number(state.hue);
        }

        hue = Math.max(
            0,
            Math.min(360, hue)
        );

        return "hsl(" + hue + ", 100%, 50%)";
    }

    window.clearHighlight = function (state) {

        if (
            state &&
            state.highlighted
        ) {
            state.highlighted.style.outline =
                state.oldOutline || "";
        }

        if (state) {
            state.highlighted = null;
            state.oldOutline = "";
        }
    };

    window.highlightElement = function (
        element,
        state
    ) {

        window.clearHighlight(state);

        if (!element || !state) {
            return;
        }

        state.highlighted = element;

        state.oldOutline =
            element.style.outline;

        element.style.outline =
            "2px solid " +
            getHighlightColor(state);
    };

    window.updateHighlightColor = function (
        state
    ) {

        if (
            !state ||
            !state.highlighted
        ) {
            return;
        }

        state.highlighted.style.outline =
            "2px solid " +
            getHighlightColor(state);
    };

})();


(function () {
    "use strict";

    // =========================================================
    // VISIBILITY MODULE
    // =========================================================

    const originalStates =
        new WeakMap();

    const inspectorHidden =
        new WeakSet();

    // =========================================================
    // GET SELECTED ELEMENT
    // =========================================================

    function getSelectedElement(state) {

        if (
            !state ||
            !state.highlighted ||
            state.highlighted.nodeType !== 1
        ) {
            return null;
        }

        return state.highlighted;
    }

    // =========================================================
    // SAVE ORIGINAL INLINE STATE
    // =========================================================

    function rememberState(element) {

        if (!element) {
            return null;
        }

        if (!originalStates.has(element)) {

            originalStates.set(
                element,
                {
                    visibility:
                        element.style.visibility,

                    display:
                        element.style.display,

                    visibilityPriority:
                        element.style.getPropertyPriority(
                            "visibility"
                        ),

                    displayPriority:
                        element.style.getPropertyPriority(
                            "display"
                        ),

                    hidden:
                        element.hidden
                }
            );
        }

        return originalStates.get(
            element
        );
    }

    // =========================================================
    // CHECK ELEMENT + PARENTS
    // =========================================================

    function isActuallyVisible(element) {

        if (!element) {
            return false;
        }

        let current =
            element;

        while (
            current &&
            current.nodeType === 1
        ) {

            if (current.hidden) {
                return false;
            }

            const computed =
                window.getComputedStyle(
                    current
                );

            if (
                computed.display === "none" ||
                computed.visibility === "hidden" ||
                computed.visibility === "collapse"
            ) {
                return false;
            }

            current =
                current.parentElement;
        }

        return true;
    }

    // =========================================================
    // GET VISIBILITY
    // =========================================================

    window.getAssetVisibility =
        function (state) {

            const element =
                getSelectedElement(
                    state
                );

            if (!element) {
                return null;
            }

            rememberState(
                element
            );

            return isActuallyVisible(
                element
            );
        };

    // =========================================================
    // SET VISIBILITY
    // =========================================================

    window.setAssetVisibility =
        function (
            state,
            visible
        ) {

            const element =
                getSelectedElement(
                    state
                );

            if (!element) {
                return false;
            }

            rememberState(
                element
            );

            // -------------------------------------------------
            // TURN OFF
            // -------------------------------------------------

            if (!visible) {

                inspectorHidden.add(
                    element
                );

                element.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

                element.style.setProperty(
                    "visibility",
                    "hidden",
                    "important"
                );
            }

            // -------------------------------------------------
            // TURN ON
            // -------------------------------------------------

            else {

                inspectorHidden.delete(
                    element
                );

                /*
                 * Remove the inspector's forced styles.
                 *
                 * "revert" is important here because an element
                 * may have originally been display:none due to a
                 * stylesheet. Restoring that "none" would make
                 * the ON switch useless.
                 */

                element.style.setProperty(
                    "display",
                    "revert",
                    "important"
                );

                element.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                /*
                 * If the element itself has the HTML hidden
                 * attribute, remove it so ON actually means ON.
                 */
                element.hidden =
                    false;
            }

            // -------------------------------------------------
            // Update UI
            // -------------------------------------------------

            window.notifyVisibilityChange(
                state
            );

            return true;
        };

    // =========================================================
    // NEW SELECTION
    // =========================================================

    window.notifyAssetSelection =
        function (state) {

            const visible =
                window.getAssetVisibility(
                    state
                );

            if (
                typeof window.updateIDPanelVisibilityUI ===
                "function"
            ) {

                window.updateIDPanelVisibilityUI(
                    visible
                );
            }

            return visible;
        };

    // =========================================================
    // VISIBILITY CHANGED
    // =========================================================

    window.notifyVisibilityChange =
        function (state) {

            const visible =
                window.getAssetVisibility(
                    state
                );

            if (
                typeof window.updateIDPanelVisibilityUI ===
                "function"
            ) {

                window.updateIDPanelVisibilityUI(
                    visible
                );
            }

            return visible;
        };

})();


(function () {
    "use strict";

    window.togglePicker = function (
        state,
        button,
        idInput,
        code,
        status
    ) {

        if (state.picking) {

            stopPicker(
                state,
                button,
                status
            );

            return;
        }

        state.picking = true;

        button.textContent =
            "✕ Stop Picking";

        status.textContent =
            "◉ Click an asset on the page";

        /*
         * Remove any old picker handler first.
         */
        if (state.pickerHandler) {

            document.removeEventListener(
                "click",
                state.pickerHandler,
                true
            );

            state.pickerHandler =
                null;
        }

        state.pickerHandler =
            function (e) {

                /*
                 * Ignore the inspector itself.
                 */
                const root =
                    document.getElementById(
                        "__IDPanelRoot"
                    );

                if (
                    root &&
                    root.contains(e.target)
                ) {
                    return;
                }

                /*
                 * Find the nearest element
                 * with an ID.
                 */
                let el =
                    e.target;

                while (
                    el &&
                    el !== document.documentElement &&
                    !el.id
                ) {
                    el =
                        el.parentElement;
                }

                /*
                 * Don't select HTML or an
                 * element without an ID.
                 */
                if (
                    !el ||
                    !el.id ||
                    el === document.documentElement
                ) {

                    status.textContent =
                        "✕ Asset has no ID.";

                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                if (
                    typeof e.stopImmediatePropagation ===
                    "function"
                ) {
                    e.stopImmediatePropagation();
                }

                /*
                 * Set the ID FIRST.
                 */
                idInput.value =
                    el.id;

                /*
                 * Inspect the selected object.
                 *
                 * inspectID() is responsible for
                 * setting state.highlighted.
                 */
                if (
                    typeof window.inspectID ===
                    "function"
                ) {

                    window.inspectID(
                        el.id,
                        state,
                        code,
                        status
                    );
                }

                /*
                 * IMPORTANT:
                 *
                 * Now that inspectID() has finished
                 * selecting the object, immediately
                 * tell visibility.js about the
                 * NEW selection.
                 */
                if (
                    typeof window.notifyAssetSelection ===
                    "function"
                ) {

                    try {

                        window.notifyAssetSelection(
                            state
                        );

                    } catch (err) {

                        console.warn(
                            "ID Panel: visibility selection sync failed:",
                            err
                        );
                    }

                } else if (
                    typeof window.getAssetVisibility ===
                    "function" &&
                    typeof window.updateIDPanelVisibilityUI ===
                    "function"
                ) {

                    /*
                     * Fallback for older visibility.js
                     * versions.
                     */
                    try {

                        const visible =
                            window.getAssetVisibility(
                                state
                            );

                        window.updateIDPanelVisibilityUI(
                            visible
                        );

                    } catch (err) {

                        console.warn(
                            "ID Panel: visibility fallback failed:",
                            err
                        );
                    }
                }

                /*
                 * Only stop picking AFTER the
                 * selection + visibility sync.
                 */
                stopPicker(
                    state,
                    button,
                    status
                );
            };

        document.addEventListener(
            "click",
            state.pickerHandler,
            true
        );
    };


    function stopPicker(
        state,
        button,
        status
    ) {

        state.picking =
            false;

        if (button) {

            button.textContent =
                "◉ Pick Asset";
        }

        if (status) {

            status.textContent =
                "✓ Inspector ready";
        }

        if (state.pickerHandler) {

            document.removeEventListener(
                "click",
                state.pickerHandler,
                true
            );

            state.pickerHandler =
                null;
        }
    }


    window.stopInspectorPicker =
        stopPicker;

})();


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

                    const assetURL =
                        el.currentSrc ||
                        el.src ||
                        el.href ||
                        el.poster ||
                        el.getAttribute("data-src") ||
                        "(none)";

                    const className =
                        typeof el.className === "string"
                            ? el.className
                            : "";

                    const dimensions =
                        el.getBoundingClientRect();

                    const attributes =
                        Array.from(el.attributes || [])
                            .filter(function (attribute) {
                                return attribute.name !== "style";
                            })
                            .map(function (attribute) {
                                return attribute.name + '="' + attribute.value + '"';
                            });

                    const detailLines = [
                        "ELEMENT",
                        "------------------------------",
                        "ID: " + id,
                        "TAG: " + el.tagName.toLowerCase(),
                        "TYPE: " + (el.getAttribute("type") || "(none)"),
                        "CLASS: " + (className || "(none)"),
                        "ASSET URL: " + assetURL,
                        "DISPLAY: " + computed.display,
                        "VISIBILITY: " + computed.visibility,
                        "SIZE: " + Math.round(dimensions.width) + " × " + Math.round(dimensions.height),
                        "NATURAL SIZE: " + (el.naturalWidth && el.naturalHeight
                            ? el.naturalWidth + " × " + el.naturalHeight
                            : "(not available)"),
                        "ALT: " + (el.getAttribute("alt") || "(none)"),
                        "",
                        "ATTRIBUTES",
                        "------------------------------",
                        attributes.length ? attributes.join("\n") : "No attributes.",
                        "",
                        "INLINE JAVASCRIPT REFERENCES",
                        "------------------------------",
                        matches.length
                            ? matches.join("\n\n/* ===== MATCH ===== */\n\n")
                            : "No JavaScript references found."
                    ];

                    code.textContent = detailLines.join("\n");

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

        (function () {
    "use strict";

    window.__IDPanelStart = function () {

        if (window.__IDPanelUI) {
            try {
                window.__IDPanelUI.remove();
            } catch (e) {}

            window.__IDPanelUI = null;
        }

        const state =
            window.__IDPanelState ||
            {
                picking: false,
                highlighted: null,
                selectedID: "",
                panelOpen: false,
                opacity: 0,
                hue: 120
            };

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
            state.hue + "°";

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

        opacityRow.appendChild(opacityLabel);
        opacityRow.appendChild(opacityValue);

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

        opacityWrap.appendChild(opacityRow);
        opacityWrap.appendChild(opacity);

        // =========================================================
        // ID INPUT
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

        idInput.readOnly =
            false;

        idInput.disabled =
            false;

        idInput.tabIndex =
            0;

        // =========================================================
        // FILTER
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

        filter.readOnly =
            false;

        filter.disabled =
            false;

        filter.tabIndex =
            0;

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

        const listMeta = document.createElement("div");
        listMeta.className = "inspector-list-meta";
        listMeta.textContent = "PAGE ELEMENT IDS";

        const listCount = document.createElement("span");
        listCount.className = "inspector-list-count";
        listCount.textContent = "0";

        listMeta.appendChild(listCount);

        const list =
            document.createElement("div");

        list.className =
            "inspector-list";

        // =========================================================
        // CODE
        // =========================================================

        const codeActions = document.createElement("div");
        codeActions.className = "inspector-code-actions";

        const copyCode = document.createElement("button");
        copyCode.type = "button";
        copyCode.className = "inspector-copy-code";
        copyCode.textContent = "Copy details";

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
        panel.appendChild(hueWrap);
        panel.appendChild(opacityWrap);
        panel.appendChild(idInput);
        panel.appendChild(filter);
        panel.appendChild(pick);
        panel.appendChild(visibilityWrap);
        panel.appendChild(listMeta);
        panel.appendChild(list);
        codeActions.appendChild(copyCode);
        panel.appendChild(codeActions);
        panel.appendChild(code);
        panel.appendChild(status);

        root.appendChild(cog);
        root.appendChild(panel);

        document.documentElement.appendChild(root);

        // =========================================================
        // GLOBAL VISIBILITY UI UPDATER
        // =========================================================

        window.updateIDPanelVisibilityUI =
            function (visible) {

                if (
                    visible === null ||
                    visible === undefined
                ) {

                    visibilityInput.checked =
                        false;

                    visibilityInput.disabled =
                        true;

                    visibilityText.textContent =
                        "Toggle visibility: OFF";

                    return;
                }

                const isVisible =
                    Boolean(visible);

                visibilityInput.disabled =
                    false;

                visibilityInput.checked =
                    isVisible;

                visibilityText.textContent =
                    isVisible
                        ? "Toggle visibility: ON"
                        : "Toggle visibility: OFF";
            };

        // =========================================================
        // REFRESH VISIBILITY
        // =========================================================

        function updateVisibilityUI() {

            if (
                typeof window.getAssetVisibility !==
                "function"
            ) {
                window.updateIDPanelVisibilityUI(
                    null
                );

                return null;
            }

            let visible =
                null;

            try {
                visible =
                    window.getAssetVisibility(
                        state
                    );
            } catch (e) {
                visible = null;
            }

            window.updateIDPanelVisibilityUI(
                visible
            );

            return visible;
        }

        // =========================================================
        // SWITCH
        // =========================================================

        visibilityInput.addEventListener(
            "change",
            function (e) {

                e.stopPropagation();

                if (
                    typeof window.setAssetVisibility !==
                    "function"
                ) {
                    updateVisibilityUI();
                    return;
                }

                let success =
                    false;

                try {
                    success =
                        window.setAssetVisibility(
                            state,
                            visibilityInput.checked
                        );
                } catch (e) {
                    success = false;
                }

                if (!success) {
                    updateVisibilityUI();
                    return;
                }

                requestAnimationFrame(
                    function () {
                        updateVisibilityUI();
                    }
                );
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
                value + "°";

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
            "pointerdown",
            function (e) {
                e.stopPropagation();
            }
        );

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
                1 - (value / 100);

            panel.style.opacity =
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

            try {

                window.inspectID(
                    idInput.value,
                    state,
                    code,
                    status
                );

            } catch (e) {

                code.style.display =
                    "block";

                code.textContent =
                    String(e);

                status.textContent =
                    "✕ Inspection failed.";

                return;
            }

            updateVisibilityUI();

            requestAnimationFrame(
                function () {
                    updateVisibilityUI();
                }
            );

            setTimeout(
                function () {
                    updateVisibilityUI();
                },
                50
            );
        }

        // =========================================================
        // RENDER IDS
        // =========================================================

        function renderIDList() {

            if (
                typeof window.renderIDs !==
                "function"
            ) {
                return;
            }

            const elements = window.renderIDs(
                filter.value,
                list,
                function (id) {
                    idInput.value = id;
                    inspectCurrentID();
                }
            ) || [];

            listCount.textContent = String(elements.length);
        }

        // =========================================================
        // COPY INSPECTION DETAILS
        // =========================================================

        copyCode.addEventListener("click", async function (event) {
            event.preventDefault();
            event.stopPropagation();

            const value = code.textContent || "";
            if (!value) {
                status.textContent = "Nothing to copy.";
                return;
            }

            try {
                await navigator.clipboard.writeText(value);
                status.textContent = "✓ Details copied.";
            } catch (error) {
                status.textContent = "Clipboard unavailable. Select and copy the text manually.";
            }
        });

        // =========================================================
        // LIVE PAGE SCANNING
        // =========================================================

        let scanQueued = false;
        const pageObserver = new MutationObserver(function (records) {
            const hasPageChanges = records.some(function (record) {
                if (record.type === "attributes") {
                    return record.target.id !== "__IDPanelRoot" &&
                        !(record.target.closest && record.target.closest("#__IDPanelRoot"));
                }

                return Array.from(record.addedNodes).some(function (node) {
                    return node.nodeType === 1 &&
                        node.id !== "__IDPanelRoot" &&
                        !(node.closest && node.closest("#__IDPanelRoot"));
                });
            });

            if (!hasPageChanges || scanQueued) return;
            scanQueued = true;

            requestAnimationFrame(function () {
                scanQueued = false;
                renderIDList();
            });
        });

        pageObserver.observe(document.documentElement, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["id"]
        });

        // =========================================================
        // CLOSE
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

            window.updateIDPanelVisibilityUI(
                null
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
        // X BUTTON
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
        // INPUT HELPERS
        // =========================================================

        function makeTextFieldWork(
            input,
            onInput,
            allowEnter
        ) {

            function stop(e) {
                e.stopPropagation();
            }

            // Ensure the field is editable.
            input.readOnly =
                false;

            input.disabled =
                false;

            input.tabIndex =
                0;

            // Capture keyboard events before the host
            // page/game gets them.
            input.addEventListener(
                "keydown",
                function (e) {

                    e.stopImmediatePropagation();

                    if (
                        allowEnter &&
                        e.key === "Enter"
                    ) {
                        e.preventDefault();
                        inspectCurrentID();
                    }
                },
                true
            );

            input.addEventListener(
                "keypress",
                stop,
                true
            );

            input.addEventListener(
                "keyup",
                stop,
                true
            );

            input.addEventListener(
                "beforeinput",
                stop,
                true
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
                },
                true
            );

            input.addEventListener(
                "click",
                function (e) {

                    e.stopPropagation();

                    input.focus();
                },
                true
            );

            input.addEventListener(
                "mousedown",
                function (e) {
                    e.stopPropagation();
                },
                true
            );

            input.addEventListener(
                "mouseup",
                stop,
                true
            );

            input.addEventListener(
                "pointerdown",
                function (e) {
                    e.stopPropagation();
                },
                true
            );

            input.addEventListener(
                "pointerup",
                stop,
                true
            );

            input.addEventListener(
                "focus",
                stop,
                true
            );

            input.addEventListener(
                "blur",
                stop,
                true
            );

            input.addEventListener(
                "paste",
                stop,
                true
            );

            input.addEventListener(
                "copy",
                stop,
                true
            );

            input.addEventListener(
                "cut",
                stop,
                true
            );
        }

        // =========================================================
        // ENABLE TEXT INPUTS
        // =========================================================

        makeTextFieldWork(
            idInput,
            null,
            true
        );

        makeTextFieldWork(
            filter,
            renderIDList,
            false
        );

        // =========================================================
        // PICK
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

                try {

                    window.togglePicker(
                        state,
                        pick,
                        idInput,
                        code,
                        status
                    );

                } catch (e) {

                    status.textContent =
                        "✕ Picker failed.";

                    return;
                }
            }
        );

        // =========================================================
        // INITIALIZE
        // =========================================================

        applyHue();
        applyOpacity();
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
            filter: filter,

            pick: pick,

            visibilityInput:
                visibilityInput,

            visibilityText:
                visibilityText,

            updateVisibilityUI:
                updateVisibilityUI,

            list: list,
            code: code,
            copyCode: copyCode,
            status: status,

            remove: function () {

                try {

                    if (
                        state.picking &&
                        typeof window.stopInspectorPicker ===
                        "function"
                    ) {
                        window.stopInspectorPicker(
                            state,
                            pick,
                            status
                        );
                    }

                } catch (e) {}

                try {

                    if (
                        typeof window.clearHighlight ===
                        "function"
                    ) {
                        window.clearHighlight(
                            state
                        );
                    }

                } catch (e) {}

                pageObserver.disconnect();

                if (
                    root.parentNode
                ) {
                    root.parentNode.removeChild(
                        root
                    );
                }

                window.updateIDPanelVisibilityUI =
                    null;

                window.__IDPanelUI =
                    null;
            }
        };
    };
})();

        window.__IDPanelStart();
    } catch (error) {
        console.error("ID-ui-panel startup error:", error);
        alert("ID-ui-panel failed to start:\n\n" + (error && error.message ? error.message : String(error)));
    }
})();
