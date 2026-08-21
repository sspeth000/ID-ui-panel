(function () {
    "use strict";

    // =========================================================
    // VISIBILITY STATE
    // =========================================================

    const originalVisibility =
        new WeakMap();

    // =========================================================
    // GET SELECTED ELEMENT
    // =========================================================

    function getSelectedElement(state) {
        if (
            !state ||
            !state.highlighted
        ) {
            return null;
        }

        return state.highlighted;
    }

    // =========================================================
    // REMEMBER ORIGINAL VISIBILITY
    // =========================================================

    function rememberElement(element) {
        if (!element) {
            return;
        }

        if (!originalVisibility.has(element)) {
            originalVisibility.set(
                element,
                element.style.visibility || ""
            );
        }
    }

    // =========================================================
    // GET VISIBILITY
    // =========================================================

    window.getAssetVisibility = function (state) {

        const element =
            getSelectedElement(state);

        if (!element) {
            return null;
        }

        rememberElement(element);

        return (
            element.style.visibility !==
            "hidden"
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

        rememberElement(element);

        if (visible) {

            element.style.visibility =
                originalVisibility.get(
                    element
                ) || "";

        } else {

            element.style.visibility =
                "hidden";
        }

        return true;
    };

    // =========================================================
    // TOGGLE VISIBILITY
    // =========================================================

    window.toggleAssetVisibility = function (
        state
    ) {

        const element =
            getSelectedElement(state);

        if (!element) {
            return null;
        }

        rememberElement(element);

        const visible =
            element.style.visibility !==
            "hidden";

        const newVisibility =
            !visible;

        window.setAssetVisibility(
            state,
            newVisibility
        );

        return newVisibility;
    };

    // =========================================================
    // REMEMBER CURRENT ASSET
    // =========================================================

    window.rememberAssetVisibility = function (
        state
    ) {

        const element =
            getSelectedElement(state);

        if (!element) {
            return;
        }

        rememberElement(element);
    };

})();
