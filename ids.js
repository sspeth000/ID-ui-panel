(function () {
    "use strict";

    function isInspectorID(id) {

        if (!id) {
            return false;
        }

        return (
            id === "__IDPanelRoot" ||
            id.indexOf("__IDPanel") === 0
        );
    }

    window.getPageIDs = function (filter) {

        filter =
            String(filter || "")
                .trim()
                .toLowerCase();

        return Array.from(
            document.querySelectorAll(
                "[id]"
            )
        )
        .map(function (el) {
            return el.id;
        })
        .filter(Boolean)
        .filter(function (id) {

            /*
             * Never display the inspector's
             * own IDs.
             */
            if (
                isInspectorID(id)
            ) {
                return false;
            }

            return id
                .toLowerCase()
                .includes(filter);
        });
    };

    window.renderIDs = function (
        filter,
        container,
        onSelect
    ) {

        container.innerHTML = "";

        const ids =
            window.getPageIDs(
                filter
            );

        if (!ids.length) {

            const empty =
                document.createElement(
                    "div"
                );

            empty.textContent =
                "No IDs found.";

            empty.style.cssText =
                "padding:5px;color:#718078;font:8px monospace;";

            container.appendChild(
                empty
            );

            return;
        }

        ids.forEach(
            function (id) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.textContent =
                    "# " + id;

                button.className =
                    "inspector-button inspector-id-button";

                button.addEventListener(
                    "click",
                    function (e) {

                        e.preventDefault();
                        e.stopPropagation();

                        onSelect(id);
                    },
                    true
                );

                container.appendChild(
                    button
                );
            }
        );
    };
})();
