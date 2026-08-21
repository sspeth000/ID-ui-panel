(function () {
    "use strict";

    // =========================================================
    // VISIBILITY MODULE
    // =========================================================

    const originalVisibility =
        new WeakMap();

    // =========================================================
    // FIND SELECTED ELEMENT
    // =========================================================

    function getSelectedElement(state) {

        if (!state) {
            return null;
        }

        // Primary selection used by the inspector.
        if (
            state.highlighted &&
            state.highlighted.nodeType === 1
        ) {
            return state.highlighted;
        }

        // Other possible selection properties.
        if (
            state.selectedElement &&
            state.selectedElement.nodeType === 1
        ) {
            return state.selectedElement;
        }

        if (
            state.element &&
            state.element.nodeType === 1
        ) {
            return state.element;
        }

        return null;
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
                {
                    visibility:
                        element.style.visibility,

                    display:
                        element.style.display
                }
            );
        }
    }

    // =========================================================
    // GET VISIBILITY
    // =========================================================

    window.getAssetVisibility =
        function (state) {

            const element =
                getSelectedElement(state);

            if (!element) {
                return null;
            }

            rememberElement(element);

            /*
             * Check the actual rendered visibility,
             * not just the inline style.
             */

            const computed =
                window.getComputedStyle(
                    element
                );

            return (
                computed.visibility !==
                "hidden" &&
                computed.display !==
                "none"
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

            rememberElement(element);

            visible =
                Boolean(visible);

            const original =
                originalVisibility.get(
                    element
                );

            if (visible) {

                /*
                 * Restore the original
                 * inline values.
                 */

                element.style.visibility =
                    original
                        ? original.visibility
                        : "";

                element.style.display =
                    original
                        ? original.display
                        : "";

            } else {

                /*
                 * Hide the actual asset.
                 */

                element.style.visibility =
                    "hidden";
            }

            return true;
        };

    // =========================================================
    // TOGGLE
    // =========================================================

    window.toggleAssetVisibility =
        function (state) {

            const current =
                window.getAssetVisibility(
                    state
                );

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

    // =========================================================
    // REMEMBER SELECTED ASSET
    // =========================================================

    window.rememberAssetVisibility =
        function (state) {

            const element =
                getSelectedElement(state);

            if (!element) {
                return false;
            }

            rememberElement(element);

            return true;
        };

    // =========================================================
    // DEBUG HELPER
    // =========================================================

    window.debugAssetVisibility =
        function (state) {

            const element =
                getSelectedElement(state);

            if (!element) {

                return {
                    found: false,
                    reason:
                        "No selected element"
                };
            }

            const computed =
                window.getComputedStyle(
                    element
                );

            return {
                found: true,

                tag:
                    element.tagName,

                id:
                    element.id || "",

                className:
                    typeof element.className ===
                    "string"
                        ? element.className
                        : "",

                inlineVisibility:
                    element.style.visibility,

                inlineDisplay:
                    element.style.display,

                computedVisibility:
                    computed.visibility,

                computedDisplay:
                    computed.display,

                visible:
                    (
                        computed.visibility !==
                        "hidden" &&
                        computed.display !==
                        "none"
                    )
            };
        };

})();
