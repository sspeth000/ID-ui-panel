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
        style.textContent = "/* ID-ui-panel theme: adapted from Frutiger Aero Archive css/global.min.css */\n#__IDPanelRoot, #__IDPanelRoot * { box-sizing:border-box; }\n#__IDPanelRoot {\n  position:fixed!important; inset:0!important; width:100vw!important; height:100vh!important;\n  margin:0!important; padding:0!important; z-index:2147483647!important;\n  pointer-events:none!important;\n  font-family:\"Segoe UI\",Tahoma,Geneva,Verdana,sans-serif,Arial,Helvetica!important;\n  color:#dadada; line-height:1.5;\n}\n#__IDPanelRoot button, #__IDPanelRoot input, #__IDPanelRoot pre { font-family:inherit!important; }\n#__IDPanelRoot .inspector-cog {\n  position:absolute; left:14px; bottom:14px; width:44px; height:44px; padding:0;\n  pointer-events:auto; cursor:pointer; border:1px solid #000; border-radius:5px;\n  background:linear-gradient(to bottom,#fff 0,#82f577 3%,#32912a 40%,#185815 55%,#0b3112 55%,#1a5c1e 100%);\n  color:#fff; font-size:21px; font-weight:700; text-shadow:0 1px 2px #000;\n  box-shadow:inset 0 1px 0 rgba(255,255,255,.75),rgba(0,0,0,.4) 0 5px 12px;\n  transition:filter .2s,transform .2s;\n}\n#__IDPanelRoot .inspector-cog:hover {\n  background:linear-gradient(to bottom,#fff 0,#9efd96 3%,#32912a 40%,#185815 55%,#0b3112 55%,#47e951 100%);\n  filter:brightness(1.08); transform:translateY(-2px);\n}\n#__IDPanelRoot .inspector-panel {\n  display:none; position:absolute; left:14px; bottom:68px;\n  width:min(380px,calc(100vw - 28px)); height:min(680px,calc(100vh - 88px));\n  min-width:min(280px,calc(100vw - 28px)); min-height:340px;\n  max-width:calc(100vw - 20px); max-height:calc(100vh - 78px);\n  padding:14px; overflow:auto; resize:both; pointer-events:auto;\n  border:1px solid #4b4b4b; border-radius:38px 38px 20px 20px;\n  color:#dadada;\n  background:\n    linear-gradient(to bottom,rgba(66,66,66,.2),rgba(39,39,39,.1)),\n    linear-gradient(to bottom,rgba(26,26,26,.96),rgba(22,22,22,.96) 95%);\n  -webkit-backdrop-filter:blur(16px); backdrop-filter:blur(16px);\n  box-shadow:rgba(0,0,0,.4) 0 14px 28px,rgba(0,0,0,.4) 0 10px 10px,\n    inset -1px -1px 0 rgba(255,255,255,.2);\n  scrollbar-color:rgba(35,105,47,.8) rgba(31,31,31,.65);\n}\n#__IDPanelRoot .inspector-panel.open { display:block; animation:idArchiveIn .18s ease-out; }\n@keyframes idArchiveIn { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:translateY(0); } }\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar { width:8px; }\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar-track { background:rgba(31,31,31,.65); border-radius:12px; }\n#__IDPanelRoot .inspector-panel::-webkit-scrollbar-thumb { background:linear-gradient(to bottom,#9efd96,#32912a 45%,#0b3112); border:1px solid #000; border-radius:12px; }\n#__IDPanelRoot .inspector-header {\n  min-height:48px; display:flex; align-items:center; justify-content:space-between; gap:12px;\n  margin:-14px -14px 12px; padding:10px 14px 10px 20px;\n  border:1px solid #4e4e4e; border-top:2px solid #777;\n  border-radius:38px 38px 0 0; cursor:grab; touch-action:none; user-select:none;\n  background:linear-gradient(180deg,rgba(172,172,172,.9) 0,rgba(71,71,71,.9) 20%,rgba(19,19,19,.9) 40%,rgba(7,7,7,.96) 100%);\n  box-shadow:rgba(0,0,0,.3) 0 5px 12px;\n}\n#__IDPanelRoot .inspector-header:active { cursor:grabbing; }\n#__IDPanelRoot .inspector-title {\n  color:#fff; font-size:13px; font-weight:700; letter-spacing:.08em;\n  text-shadow:0 0 3px #000;\n}\n#__IDPanelRoot .inspector-close {\n  flex:0 0 30px; width:30px; height:30px; padding:0; cursor:pointer;\n  border:1px solid #790000; border-radius:3px;\n  background:linear-gradient(to bottom,#ffebeb 0,#fa8c8c 3%,#f31414 55%,#a30909 55%,#eb1717 100%);\n  color:#fff; font-size:21px; line-height:1; text-shadow:0 1px 2px #650000;\n  box-shadow:1px 1px 5px rgba(0,0,0,.2);\n}\n#__IDPanelRoot .inspector-close:hover { background:linear-gradient(to bottom,#ffebeb 0,#fa8c8c 3%,#f31414 55%,#a30909 55%,#ff7c7c 100%); }\n#__IDPanelRoot .inspector-hue-wrap, #__IDPanelRoot .inspector-opacity-wrap,\n#__IDPanelRoot .inspector-visibility-control {\n  width:100%; margin:7px 0; padding:8px 10px;\n  outline:rgba(28,49,39,.5) solid 1px;\n  border:1px solid rgba(236,242,249,.2); border-radius:5px;\n  background:linear-gradient(to bottom,rgba(80,80,80,.2),rgba(39,39,39,.1));\n  box-shadow:2px 2px 3px rgba(0,0,0,.8),inset -1px -1px 0 rgba(255,255,255,.12);\n}\n#__IDPanelRoot .inspector-hue-row, #__IDPanelRoot .inspector-opacity-row {\n  display:flex; align-items:center; justify-content:space-between; gap:8px;\n}\n#__IDPanelRoot .inspector-hue-label, #__IDPanelRoot .inspector-opacity-label,\n#__IDPanelRoot .inspector-visibility-text { color:#eee; font-size:11px; font-weight:600; text-shadow:0 0 3px #000; }\n#__IDPanelRoot .inspector-hue-value, #__IDPanelRoot .inspector-opacity-value,\n#__IDPanelRoot .inspector-list-count { color:#57fa6f; font-size:11px; font-weight:700; text-shadow:0 0 3px #000; font-variant-numeric:tabular-nums; }\n#__IDPanelRoot .inspector-hue, #__IDPanelRoot .inspector-opacity {\n  display:block; width:100%; height:20px; margin:5px 0 0; padding:0; cursor:pointer; accent-color:#33c54b;\n}\n#__IDPanelRoot .inspector-input {\n  display:block; width:100%; height:38px; margin-top:8px; padding:8px 10px;\n  border:1px solid rgba(236,242,249,.45); border-radius:4px; outline:none;\n  background:linear-gradient(to bottom,rgba(255,255,255,.95),rgba(218,226,218,.94));\n  color:#202820; font-size:13px!important; font-weight:500; pointer-events:auto!important;\n  user-select:text!important; -webkit-user-select:text!important;\n  box-shadow:inset 0 2px 5px rgba(0,0,0,.22),1px 1px 5px rgba(0,0,0,.2);\n}\n#__IDPanelRoot .inspector-input::placeholder { color:#637263; }\n#__IDPanelRoot .inspector-input:focus { border-color:#3cda56; box-shadow:0 0 0 2px rgba(60,218,86,.25),inset 0 2px 5px rgba(0,0,0,.18); }\n#__IDPanelRoot .inspector-button, #__IDPanelRoot .inspector-copy-code {\n  width:100%; min-height:36px; margin-top:7px; padding:6px 10px; cursor:pointer;\n  border:1px solid #000; border-radius:3px;\n  background:linear-gradient(to bottom,#fff 0,#82f577 3%,#32912a 40%,#185815 55%,#0b3112 55%,#1a5c1e 100%);\n  color:#fff; font-size:12px!important; font-weight:600!important; text-shadow:0 1px 2px #000;\n  box-shadow:1px 1px 5px rgba(0,0,0,.2);\n  transition:filter .15s,transform .15s;\n}\n#__IDPanelRoot .inspector-button:hover, #__IDPanelRoot .inspector-copy-code:hover {\n  background:linear-gradient(to bottom,#fff 0,#9efd96 3%,#32912a 40%,#185815 55%,#0b3112 55%,#47e951 100%);\n  filter:brightness(1.08); transform:translateY(-1px);\n}\n#__IDPanelRoot .inspector-button:active, #__IDPanelRoot .inspector-copy-code:active { transform:translateY(1px); }\n#__IDPanelRoot .inspector-visibility-wrap { width:100%; margin:9px 0; }\n#__IDPanelRoot .inspector-visibility-control {\n  min-height:42px; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:7px 11px;\n}\n#__IDPanelRoot .inspector-switch { position:relative; display:block; width:46px; height:24px; flex-shrink:0; }\n#__IDPanelRoot .inspector-switch input { position:absolute; width:1px; height:1px; opacity:0; pointer-events:none; }\n#__IDPanelRoot .inspector-switch-slider {\n  position:absolute; inset:0; border:1px solid #111; border-radius:20px;\n  background:linear-gradient(to bottom,#444,#171717); cursor:pointer; box-shadow:inset 0 2px 4px rgba(0,0,0,.65);\n}\n#__IDPanelRoot .inspector-switch-slider:before {\n  content:\"\"; position:absolute; left:3px; top:3px; width:16px; height:16px; border-radius:50%;\n  background:linear-gradient(145deg,#fff,#aaa); box-shadow:0 1px 4px rgba(0,0,0,.55); transition:transform .16s;\n}\n#__IDPanelRoot .inspector-switch input:checked + .inspector-switch-slider {\n  border-color:#0b3112; background:linear-gradient(to bottom,#9efd96 0,#32912a 48%,#0b3112 100%);\n}\n#__IDPanelRoot .inspector-switch input:checked + .inspector-switch-slider:before { transform:translateX(22px); }\n#__IDPanelRoot .inspector-switch input:disabled + .inspector-switch-slider { opacity:.4; cursor:not-allowed; }\n#__IDPanelRoot .inspector-list-meta {\n  display:flex; align-items:center; justify-content:space-between; gap:8px;\n  margin:10px 2px 4px; color:#ddd; font-size:10px; font-weight:700; text-shadow:0 0 3px #000;\n}\n#__IDPanelRoot .inspector-list {\n  width:100%; height:126px; margin-top:7px; overflow:auto; padding:5px;\n  border:1px solid rgba(236,242,249,.5); border-radius:5px;\n  background:linear-gradient(to bottom,rgba(18,18,18,.9),rgba(35,35,35,.86));\n  box-shadow:inset 0 2px 6px rgba(0,0,0,.55);\n}\n#__IDPanelRoot .inspector-list::-webkit-scrollbar { width:7px; }\n#__IDPanelRoot .inspector-list::-webkit-scrollbar-thumb { background:linear-gradient(to bottom,#9efd96,#185815); border:1px solid #000; border-radius:12px; }\n#__IDPanelRoot .inspector-id-button {\n  display:flex; align-items:center; justify-content:space-between; gap:8px; width:100%; margin:2px 0; padding:7px 9px;\n  text-align:left; border:1px solid #424242; border-radius:4px;\n  background:linear-gradient(to bottom,rgba(255,255,255,.13),rgba(0,0,0,.24));\n  color:#eee; text-shadow:0 0 3px #000; cursor:pointer; font-size:11px!important; font-weight:600!important;\n  transition:background .12s,border-color .12s,transform .12s;\n}\n#__IDPanelRoot .inspector-id-button:hover {\n  border-color:rgba(60,218,86,.7);\n  background:linear-gradient(to bottom,rgba(255,255,255,.22),rgba(43,240,36,.22)); transform:scale(1.01);\n}\n#__IDPanelRoot .inspector-id-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n#__IDPanelRoot .inspector-id-tag {\n  flex:0 0 auto; padding:2px 6px; border:1px solid rgba(0,0,0,.6); border-radius:3px;\n  background:linear-gradient(to bottom,rgba(255,255,255,.22),rgba(43,240,36,.22)); color:#8cff98; font-size:9px; font-weight:700;\n}\n#__IDPanelRoot .inspector-code-actions { display:flex; gap:7px; margin-top:8px; }\n#__IDPanelRoot .inspector-copy-code { flex:1; margin-top:0; }\n#__IDPanelRoot .inspector-code {\n  display:none; width:100%; min-height:160px; height:260px; margin:8px 0 0; padding:12px;\n  overflow:auto; white-space:pre-wrap; overflow-wrap:anywhere;\n  border:1px solid #4b4b4b; border-radius:5px;\n  background:linear-gradient(to bottom,rgba(10,10,10,.97),rgba(29,29,29,.97));\n  color:#d8f8dc; font:11px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace!important;\n  box-shadow:inset 0 2px 8px rgba(0,0,0,.65),0 3px 8px rgba(0,0,0,.3);\n}\n#__IDPanelRoot .inspector-empty { padding:13px 8px; color:#c7d2c8; text-align:center; font-size:11px; text-shadow:0 0 3px #000; }\n#__IDPanelRoot .inspector-status { margin:9px 2px 1px; color:#c7d2c8; font-size:10px; line-height:1.45; font-weight:600; text-shadow:0 0 3px #000; }\n#__IDPanelRoot .inspector-panel :focus-visible { outline:2px solid #3cda56; outline-offset:2px; }\n@media (max-width:520px) {\n  #__IDPanelRoot .inspector-panel { left:8px; bottom:66px; width:calc(100vw - 16px); height:min(76vh,680px); padding:12px; }\n  #__IDPanelRoot .inspector-header { margin:-12px -12px 12px; padding:10px 12px 10px 18px; border-radius:32px 32px 0 0; }\n  #__IDPanelRoot .inspector-panel { border-radius:32px 32px 18px 18px; }\n  #__IDPanelRoot .inspector-cog { left:10px; bottom:10px; }\n}";
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


                const state = window.createInspectorState();
        window.__IDPanelState = state;

        function syncVisibility(activeState) {
            if (!activeState) return false;

            if (typeof window.notifyAssetSelection === "function") {
                try {
                    window.notifyAssetSelection(activeState);
                    return true;
                } catch (error) {
                    console.warn("ID Panel: visibility sync failed:", error);
                }
            }

            if (typeof window.getAssetVisibility === "function" &&
                typeof window.updateIDPanelVisibilityUI === "function") {
                try {
                    const visible = window.getAssetVisibility(activeState);
                    window.updateIDPanelVisibilityUI(visible);
                    return true;
                } catch (error) {
                    console.warn("ID Panel: visibility fallback failed:", error);
                }
            }

            return false;
        }

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
        // FRUTIGER AERO PANEL DRAGGING
        // =========================================================

        header.addEventListener("pointerdown", function (event) {
            if (event.button !== 0 || event.target === close) return;
            event.preventDefault();
            const rect = panel.getBoundingClientRect();
            const startX = event.clientX;
            const startY = event.clientY;
            const originX = rect.left;
            const originY = rect.top;
            panel.style.left = originX + "px";
            panel.style.top = originY + "px";
            panel.style.bottom = "auto";
            header.setPointerCapture(event.pointerId);

            function move(moveEvent) {
                const maxX = Math.max(0, window.innerWidth - panel.offsetWidth);
                const maxY = Math.max(0, window.innerHeight - panel.offsetHeight);
                const nextX = Math.max(0, Math.min(maxX, originX + moveEvent.clientX - startX));
                const nextY = Math.max(0, Math.min(maxY, originY + moveEvent.clientY - startY));
                panel.style.left = nextX + "px";
                panel.style.top = nextY + "px";
            }
            function stop() {
                header.removeEventListener("pointermove", move);
                header.removeEventListener("pointerup", stop);
                header.removeEventListener("pointercancel", stop);
            }
            header.addEventListener("pointermove", move);
            header.addEventListener("pointerup", stop);
            header.addEventListener("pointercancel", stop);
        });

        // Escape closes the panel without removing the inspector.
        function onPanelEscape(event) {
            if (event.key === "Escape" && state.panelOpen) closePanel();
        }
        document.addEventListener("keydown", onPanelEscape, true);

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
                document.removeEventListener("keydown", onPanelEscape, true);

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
