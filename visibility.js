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
                        element.style.display,

                    displayPriority:
                        element.style.getPropertyPriority(
                            "display"
                        ),

                    visibilityPriority:
                        element.style.getPropertyPriority(
                            "visibility"
                        ),

                    hidden:
                        element.hidden
                }
            );
        }

        return originalStates.get(
            element
        );
    }

    // =========================================================
    // CHECK ONE ELEMENT
    // =========================================================

    function isElementVisible(element) {

        if (!element) {
            return false;
        }

        /*
         * The hidden attribute always makes the element
         * unavailable for normal rendering.
         */
        if (element.hidden) {
            return false;
        }

        const computed =
            window.getComputedStyle(
                element
            );

        if (
            computed.display === "none" ||
            computed.visibility === "hidden" ||
            computed.visibility === "collapse"
        ) {
            return false;
        }

        return true;
    }

    // =========================================================
    // CHECK PARENTS
    // =========================================================

    function isActuallyVisible(element) {

        if (!element) {
            return false;
        }

        /*
         * Walk upward because an element can appear to have
         * display:block while one of its parents is hidden.
         */
        let current =
            element;

        while (
            current &&
            current.nodeType === 1
        ) {

            if (current.hidden) {
                return false;
            }

            const computed =
                window.getComputedStyle(
                    current
                );

            if (
                computed.display === "none" ||
                computed.visibility === "hidden" ||
                computed.visibility === "collapse"
            ) {
                return false;
            }

            current =
                current.parentElement;
        }

        return true;
    }

    // =========================================================
    // CHECK VISIBILITY
    // =========================================================

    window.getAssetVisibility =
        function (state) {

            const element =
                getSelectedElement(
                    state
                );

            if (!element) {
                return null;
            }

            rememberState(
                element
            );

            return isActuallyVisible(
                element
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
                getSelectedElement(
                    state
                );

            if (!element) {
                return false;
            }

            const original =
                rememberState(
                    element
                );

            if (visible) {

                /*
                 * Restore the exact inline values that existed
                 * before the inspector touched the element.
                 */
                element.style.setProperty(
                    "visibility",
                    original.visibility,
                    original.visibilityPriority
                );

                element.style.setProperty(
                    "display",
                    original.display,
                    original.displayPriority
                );

                element.hidden =
                    original.hidden;

            } else {

                /*
                 * Use !important so normal page CSS doesn't
                 * immediately override the inspector.
                 */
                element.style.setProperty(
                    "visibility",
                    "hidden",
                    "important"
                );

                element.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

                /*
                 * Do NOT use element.hidden here.
                 *
                 * Keeping the hidden attribute untouched makes
                 * restoration predictable.
                 */
            }

            /*
             * Update the UI immediately.
             */
            window.notifyVisibilityChange(
                state
            );

            return true;
        };

    // =========================================================
    // NOTIFY UI OF NEW SELECTION
    // =========================================================

    window.notifyAssetSelection =
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
