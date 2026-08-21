(function () {
    "use strict";

    window.clearHighlight = function (state) {

        if (
            state &&
            state.highlighted
        ) {
            state.highlighted.style.outline =
                state.oldOutline;
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

        if (!element) {
            return;
        }

        state.highlighted = element;
        state.oldOutline =
            element.style.outline;

        element.style.outline =
            "2px solid #52e879";
    };
})();
