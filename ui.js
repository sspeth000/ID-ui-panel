(function () {
    "use strict";

    window.__IDPanelStart = function () {

        // Prevent duplicate panels
        if (window.__IDPanelUI) {
            return;
        }

        // State should have been loaded by inspector.js
        const state =
            window.__IDPanelState ||
            {
                picking: false,
                highlighted: null,
                oldOutline: ""
            };

        // Root UI container
        const root = document.createElement("div");
        root.className = "inspector-root";
        root.id = "__IDPanelRoot";

        // Cog button
        const cog = document.createElement("button");
        cog.className = "inspector-cog";
        cog.type = "button";
        cog.textContent = "⚙";

        // Panel
        const panel = document.createElement("div");
        panel.className = "inspector-panel";

        // Header
        const header = document.createElement("div");
        header.className = "inspector-header";

        const title = document.createElement("b");
        title.textContent = "LOMANDO INSPECTOR";
        title.className = "inspector-title";

        const close = document.createElement("button");
        close.type = "button";
        close.className = "inspector-close";
        close.textContent = "×";

        header.append(title, close);

        // Enter ID
        const idInput = document.createElement("input");
        idInput.type = "text";
        idInput.className = "inspector-input";
        idInput.placeholder = "Enter ID...";
        idInput.autocomplete = "off";
        idInput.autocorrect = "off";
        idInput.autocapitalize = "off";
        idInput.spellcheck = false;

        // Inspect button
        const inspect = document.createElement("button");
        inspect.type = "button";
        inspect.className = "inspector-button";
        inspect.textContent = "Inspect ID";

        // Pick button
        const pick = document.createElement("button");
        pick.type = "button";
        pick.className = "inspector-button";
        pick.textContent = "◉ Pick Asset";

        // Filter
        const filter = document.createElement("input");
        filter.type = "text";
        filter.className = "inspector-input";
        filter.placeholder = "Filter IDs...";
        filter.autocomplete = "off";
        filter.autocorrect = "off";
        filter.autocapitalize = "off";
        filter.spellcheck = false;

        // ID list
        const list = document.createElement("div");
        list.className = "inspector-list";

        // Code display
        const code = document.createElement("pre");
        code.className = "inspector-code";

        // Status
        const status = document.createElement("div");
        status.className = "inspector-status";
        status.textContent = "✓ Inspector ready";

        // Build panel
        panel.append(
            header,
            idInput,
            inspect,
            pick,
            filter,
            list,
            code,
            status
        );

        root.append(cog, panel);

        // Put UI directly into the page.
        // No iframe and no shadow DOM.
        document.documentElement.appendChild(root);

        // -----------------------------------------
        // EVENTS
        // -----------------------------------------

        cog.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            panel.classList.toggle("open");
        });

        close.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            panel.classList.remove("open");
        });

        inspect.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (typeof window.inspectID === "function") {
                window.inspectID(
                    idInput.value,
                    state,
                    code,
                    status
                );
            }
        });

        idInput.addEventListener("keydown", function (e) {
            e.stopPropagation();

            if (e.key === "Enter") {
                e.preventDefault();

                if (typeof window.inspectID === "function") {
                    window.inspectID(
                        idInput.value,
                        state,
                        code,
                        status
                    );
                }
            }
        });

        filter.addEventListener("input", function (e) {
            e.stopPropagation();

            if (typeof window.renderIDs !== "function") {
                return;
            }

            window.renderIDs(
                filter.value,
                list,
                function (id) {

                    idInput.value = id;

                    window.inspectID(
                        id,
                        state,
                        code,
                        status
                    );
                }
            );
        });

        filter.addEventListener("keydown", function (e) {
            e.stopPropagation();
        });

        pick.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (typeof window.togglePicker === "function") {
                window.togglePicker(
                    state,
                    pick,
                    idInput,
                    code,
                    status
                );
            }
        });

        // -----------------------------------------
        // INITIAL ID LIST
        // -----------------------------------------

        if (typeof window.renderIDs === "function") {

            window.renderIDs(
                "",
                list,
                function (id) {

                    idInput.value = id;

                    window.inspectID(
                        id,
                        state,
                        code,
                        status
                    );
                }
            );

        } else {
            status.textContent =
                "✕ IDs module failed to load.";
        }

        // -----------------------------------------
        // PUBLIC UI HANDLE
        // -----------------------------------------

        window.__IDPanelUI = {
            root: root,
            panel: panel,
            cog: cog,
            close: close,
            idInput: idInput,
            inspect: inspect,
            pick: pick,
            filter: filter,
            list: list,
            code: code,
            status: status,

            remove: function () {

                if (window.__IDPanelUI) {
                    window.__IDPanelUI = null;
                }

                if (root && root.parentNode) {
                    root.parentNode.removeChild(root);
                }
            }
        };
    };
})();
if (typeof window.__IDPanelStart === "function") {
    window.__IDPanelStart();
}
