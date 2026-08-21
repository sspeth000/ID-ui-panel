(function () {
    "use strict";

    function getColor(state) {
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
            element.style.outline || "";

        element.style.outline =
            "2px solid " +
            getColor(state);
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
            getColor(state);
    };

})();
