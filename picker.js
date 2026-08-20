function togglePicker(
  state,
  button,
  idInput,
  code,
  status
) {
  state.picking = !state.picking;

  if (state.picking) {
    button.textContent =
      "✕ Stop Picking";

    status.textContent =
      "◉ Click an asset on the page";

    document.addEventListener(
      "click",
      state.__pickerHandler = function(e) {
        const host =
          document.getElementById(
            "__lomandoInspectorHost"
          );

        if (host && host.contains(e.target))
          return;

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

        idInput.value = el.id;

        inspectID(
          el.id,
          state,
          code,
          status
        );

        state.picking = false;

        button.textContent =
          "◉ Pick Asset";

        document.removeEventListener(
          "click",
          state.__pickerHandler,
          true
        );
      },
      true
    );
  } else {
    button.textContent =
      "◉ Pick Asset";

    status.textContent =
      "✓ Inspector ready";
  }
}
