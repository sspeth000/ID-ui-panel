(function () {
    "use strict";

    window.togglePicker = function (
        state,
        button,
        idInput,
        code,
        status
    ) {

        if (state.picking) {

            stopPicker(
                state,
                button,
                status
            );

            return;
        }

        state.picking = true;

        button.textContent =
            "✕ Stop Picking";

        status.textContent =
            "◉ Click an asset on the page";

        /*
         * Remove any old picker handler first.
         */
        if (state.pickerHandler) {

            document.removeEventListener(
                "click",
                state.pickerHandler,
                true
            );

            state.pickerHandler =
                null;
        }

        state.pickerHandler =
            function (e) {

                /*
                 * Ignore the inspector itself.
                 */
                const root =
                    document.getElementById(
                        "__IDPanelRoot"
                    );

                if (
                    root &&
                    root.contains(e.target)
                ) {
                    return;
                }

                /*
                 * Find the nearest element
                 * with an ID.
                 */
                let el =
                    e.target;

                while (
                    el &&
                    el !== document.documentElement &&
                    !el.id
                ) {
                    el =
                        el.parentElement;
                }

                /*
                 * Don't select HTML or an
                 * element without an ID.
                 */
                if (
                    !el ||
                    !el.id ||
                    el === document.documentElement
                ) {

                    status.textContent =
                        "✕ Asset has no ID.";

                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                if (
                    typeof e.stopImmediatePropagation ===
                    "function"
                ) {
                    e.stopImmediatePropagation();
                }

                /*
                 * Set the ID FIRST.
                 */
                idInput.value =
                    el.id;

                /*
                 * Inspect the selected object.
                 *
                 * inspectID() is responsible for
                 * setting state.highlighted.
                 */
                if (
                    typeof window.inspectID ===
                    "function"
                ) {

                    window.inspectID(
                        el.id,
                        state,
                        code,
                        status
                    );
                }

                /*
                 * IMPORTANT:
                 *
                 * Now that inspectID() has finished
                 * selecting the object, immediately
                 * tell visibility.js about the
                 * NEW selection.
                 */
                if (
                    typeof window.notifyAssetSelection ===
                    "function"
                ) {

                    try {

                        window.notifyAssetSelection(
                            state
                        );

                    } catch (err) {

                        console.warn(
                            "ID Panel: visibility selection sync failed:",
                            err
                        );
                    }

                } else if (
                    typeof window.getAssetVisibility ===
                    "function" &&
                    typeof window.updateIDPanelVisibilityUI ===
                    "function"
                ) {

                    /*
                     * Fallback for older visibility.js
                     * versions.
                     */
                    try {

                        const visible =
                            window.getAssetVisibility(
                                state
                            );

                        window.updateIDPanelVisibilityUI(
                            visible
                        );

                    } catch (err) {

                        console.warn(
                            "ID Panel: visibility fallback failed:",
                            err
                        );
                    }
                }

                /*
                 * Only stop picking AFTER the
                 * selection + visibility sync.
                 */
                stopPicker(
                    state,
                    button,
                    status
                );
            };

        document.addEventListener(
            "click",
            state.pickerHandler,
            true
        );
    };


    function stopPicker(
        state,
        button,
        status
    ) {

        state.picking =
            false;

        if (button) {

            button.textContent =
                "◉ Pick Asset";
        }

        if (status) {

            status.textContent =
                "✓ Inspector ready";
        }

        if (state.pickerHandler) {

            document.removeEventListener(
                "click",
                state.pickerHandler,
                true
            );

            state.pickerHandler =
                null;
        }
    }


    window.stopInspectorPicker =
        stopPicker;

})();
