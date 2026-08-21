(function () {
    "use strict";

    // =========================================================
    // VISIBILITY MODULE
    // =========================================================

    const originalStates =
        new WeakMap();

    const inspectorHidden =
        new WeakSet();

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
    // SAVE ORIGINAL INLINE STATE
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

                    visibilityPriority:
                        element.style.getPropertyPriority(
                            "visibility"
                        ),

                    displayPriority:
                        element.style.getPropertyPriority(
                            "display"
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
    // CHECK ELEMENT + PARENTS
    // =========================================================

    function isActuallyVisible(element) {

        if (!element) {
            return false;
        }

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
    // GET VISIBILITY
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

            rememberState(
                element
            );

            // -------------------------------------------------
            // TURN OFF
            // -------------------------------------------------

            if (!visible) {

                inspectorHidden.add(
                    element
                );

                element.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

                element.style.setProperty(
                    "visibility",
                    "hidden",
                    "important"
                );
            }

            // -------------------------------------------------
            // TURN ON
            // -------------------------------------------------

            else {

                inspectorHidden.delete(
                    element
                );

                /*
                 * Remove the inspector's forced styles.
                 *
                 * "revert" is important here because an element
                 * may have originally been display:none due to a
                 * stylesheet. Restoring that "none" would make
                 * the ON switch useless.
                 */

                element.style.setProperty(
                    "display",
                    "revert",
                    "important"
                );

                element.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                /*
                 * If the element itself has the HTML hidden
                 * attribute, remove it so ON actually means ON.
                 */
                element.hidden =
                    false;
            }

            // -------------------------------------------------
            // Update UI
            // -------------------------------------------------

            window.notifyVisibilityChange(
                state
            );

            return true;
        };

    // =========================================================
    // NEW SELECTION
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
    // VISIBILITY CHANGED
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
