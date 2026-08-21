(function () {
    "use strict";

    // =========================================================
    // VISIBILITY MODULE
    // =========================================================

    const savedVisibility =
        new WeakMap();

    function getSelectedElement(state) {

        if (!state) {
            return null;
        }

        // The highlighted element is the currently selected asset.
        if (
            state.highlighted &&
            state.highlighted.nodeType === 1
        ) {
            return state.highlighted;
        }

        return null;
    }

    function rememberOriginalState(element) {

        if (
            !element ||
            savedVisibility.has(element)
        ) {
            return;
        }

        savedVisibility.set(
            element,
            {
                visibility:
                    element.style.visibility,

                display:
                    element.style.display
            }
        );
    }

    // =========================================================
    // CHECK CURRENT VISIBILITY
    // =========================================================

    window.getAssetVisibility = function (state) {

        const element =
            getSelectedElement(state);

        if (!element) {
            return null;
        }

        rememberOriginalState(element);

        const style =
            window.getComputedStyle(element);

        // An element is considered visible only when it is
        // rendered and not explicitly hidden.
        return (
            style.visibility !== "hidden" &&
            style.display !== "none"
        );
    };

    // =========================================================
    // SET VISIBILITY
    // =========================================================

    window.setAssetVisibility = function (
        state,
        visible
    ) {

        const element =
            getSelectedElement(state);

        if (!element) {
            return false;
        }

        rememberOriginalState(element);

        const original =
            savedVisibility.get(element);

        if (visible) {

            element.style.visibility =
                original.visibility || "";

            element.style.display =
                original.display || "";

        } else {

            element.style.visibility =
                "hidden";
        }

        return true;
    };

    // =========================================================
    // TOGGLE
    // =========================================================

    window.toggleAssetVisibility = function (state) {

        const current =
            window.getAssetVisibility(state);

        if (current === null) {
            return null;
        }

        const next =
            !current;

        window.setAssetVisibility(
            state,
            next
        );

        return next;
    };

})();
