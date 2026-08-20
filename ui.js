function createUI(shadow, state) {
  const root = document.createElement("div");
  root.className = "inspector-root";

  const cog = document.createElement("button");
  cog.className = "inspector-cog";
  cog.textContent = "⚙";

  const panel = document.createElement("div");
  panel.className = "inspector-panel";

  const title = document.createElement("b");
  title.textContent = "LOMANDO INSPECTOR";

  const close = document.createElement("button");
  close.textContent = "×";

  const idInput = document.createElement("input");
  idInput.className = "inspector-input";
  idInput.placeholder = "Enter ID...";

  const inspect = document.createElement("button");
  inspect.className = "inspector-button";
  inspect.textContent = "Inspect ID";

  const pick = document.createElement("button");
  pick.className = "inspector-button";
  pick.textContent = "◉ Pick Asset";

  const filter = document.createElement("input");
  filter.className = "inspector-input";
  filter.placeholder = "Filter IDs...";

  const list = document.createElement("div");

  const code = document.createElement("pre");

  const status = document.createElement("div");
  status.textContent = "✓ Inspector ready";

  panel.append(
    title,
    close,
    idInput,
    inspect,
    pick,
    filter,
    list,
    code,
    status
  );

  root.append(cog, panel);
  shadow.appendChild(root);

  cog.onclick = () => {
    panel.classList.toggle("open");
  };

  close.onclick = () => {
    panel.classList.remove("open");
  };

  inspect.onclick = () => {
    inspectID(
      idInput.value,
      state,
      code,
      status
    );
  };

  filter.oninput = () => {
    renderIDs(
      filter.value,
      list,
      id => {
        idInput.value = id;

        inspectID(
          id,
          state,
          code,
          status
        );
      }
    );
  };

  idInput.onkeydown = e => {
    if (e.key === "Enter") {
      inspectID(
        idInput.value,
        state,
        code,
        status
      );
    }
  };

  pick.onclick = () => {
    togglePicker(
      state,
      pick,
      idInput,
      code,
      status
    );
  };

  renderIDs("", list, id => {
    idInput.value = id;

    inspectID(
      id,
      state,
      code,
      status
    );
  });
}
