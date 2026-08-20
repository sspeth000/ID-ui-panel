function clearHighlight(state) {
  if (state.highlighted) {
    state.highlighted.style.outline =
      state.oldOutline;
  }

  state.highlighted = null;
  state.oldOutline = "";
}

function highlightElement(el, state) {
  clearHighlight(state);

  if (!el) return;

  state.highlighted = el;
  state.oldOutline = el.style.outline;

  el.style.outline =
    "2px solid #52e879";
}
