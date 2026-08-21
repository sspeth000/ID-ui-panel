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
         * Make sure an old handler
         * cannot remain attached.
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

                let el = e.target;

                /*
                 * Walk upward until we find
                 * an element with an ID.
                 */
                while (
                    el &&
                    el !== document.documentElement &&
                    !el.id
                ) {
                    el = el.parentElement;
                }

                /*
                 * Don't accidentally select
                 * the HTML element.
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

                idInput.value =
                    el.id;

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

        state.picking = false;

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
