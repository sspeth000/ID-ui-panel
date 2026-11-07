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