(function () {
    "use strict";

    function getHighlightColor(state) {
        let hue =
            state &&
            Number.isFinite(state.hue)
                ? state.hue
                : 120;

        hue = Math.max(
            0,
            Math.min(
                360,
                hue
            )
        );

        return (
            "hsl(" +
            hue +
            ", 75%, 55%)"
        );
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
