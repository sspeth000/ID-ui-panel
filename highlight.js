(function () {
    "use strict";

    function getHue(state) {
        const hue =
            state &&
            Number.isFinite(Number(state.hue))
                ? Number(state.hue)
                : 120;

        return Math.max(
            0,
            Math.min(360, hue)
        );
    }

    function getHighlightStyle(state) {
        const hue = getHue(state);

        return (
            "3px solid hsl(" +
            hue +
            ", 100%, 50%)"
        );
    }

    window.clearHighlight = function (state) {
        if (
            state &&
            state.highlighted
        ) {
            // Restore exactly what was there before highlighting.
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
        if (!element || !state) {
            return;
        }

        // Remove the previous object's highlight first.
        window.clearHighlight(state);

        state.highlighted = element;

        // Save the element's original inline outline.
        state.oldOutline =
            element.style.outline || "";

        // Apply the current UI hue.
        element.style.outline =
            getHighlightStyle(state);
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

        // Reapply the outline using the newest hue.
        state.highlighted.style.outline =
            getHighlightStyle(state);
    };

})();
