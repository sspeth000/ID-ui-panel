(function () {
    "use strict";

    // =========================================================
    // VISIBILITY MODULE
    // =========================================================

    const originalStates =
        new WeakMap();

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
    // SAVE ORIGINAL STATE
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
                        element.style.display
                }
            );
        }

        return originalStates.get(element);
    }

    // =========================================================
    // CHECK VISIBILITY
    // =========================================================

    window.getAssetVisibility =
        function (state) {

            const element =
                getSelectedElement(state);

            if (!element) {
                return null;
            }

            rememberState(element);

            const computed =
                window.getComputedStyle(element);

            return (
                computed.display !== "none" &&
                computed.visibility !== "hidden"
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
                getSelectedElement(state);

            if (!element) {
                return false;
            }

            const original =
                rememberState(element);

            if (visible) {

                element.style.visibility =
                    original.visibility;

                element.style.display =
                    original.display;

            } else {

                element.style.visibility =
                    "hidden";
            }

            // Update UI immediately.
            window.notifyVisibilityChange(
                state
            );

            return true;
        };

    // =========================================================
    // NOTIFY UI OF A NEW SELECTION
    // =========================================================

    window.notifyAssetSelection =
        function (state) {

            const visible =
                window.getAssetVisibility(
                    state
                );

            // The UI registers this function.
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
    // NOTIFY UI OF VISIBILITY CHANGE
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
