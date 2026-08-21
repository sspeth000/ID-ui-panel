(function () {
    "use strict";

    function getHighlightColor() {
        const root =
            document.getElementById(
                "__IDPanelRoot"
            );

        if (!root) {
            return "#52e879";
        }

        const hue =
            getComputedStyle(root)
                .getPropertyValue("--id-hue")
                .trim();

        if (!hue) {
            return "#52e879";
        }

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
            element.style.outline || "";

        element.style.outline =
            "2px solid " +
            getHighlightColor();
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
            getHighlightColor();
    };

})();
