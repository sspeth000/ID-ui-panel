(function () {
    "use strict";

    window.createInspectorState = function () {
        return {
            picking: false,
            highlighted: null,
            oldOutline: "",
            selectedID: "",
            panelOpen: false,
            opacity: 0,
            pickerHandler: null
        };
    };
})();
