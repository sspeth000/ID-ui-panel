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

        state.pickerHandler =
            function (e) {

                const root =
                    document.getElementById(
                        "__IDPanelRoot"
                    );

                // Ignore clicks on our UI.
                if (
                    root &&
                    root.contains(e.target)
                ) {
                    return;
                }

                let el = e.target;

                while (
                    el &&
                    el !== document.body &&
                    !el.id
                ) {
                    el = el.parentElement;
                }

                if (!el || !el.id) {

                    status.textContent =
                        "✕ Asset has no ID.";

                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                if (e.stopImmediatePropagation) {
                    e.stopImmediatePropagation();
                }

                idInput.value = el.id;

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

        button.textContent =
            "◉ Pick Asset";

        status.textContent =
            "✓ Inspector ready";

        if (state.pickerHandler) {

            document.removeEventListener(
                "click",
                state.pickerHandler,
                true
            );

            state.pickerHandler = null;
        }
    }

    window.stopInspectorPicker =
        stopPicker;
})();
