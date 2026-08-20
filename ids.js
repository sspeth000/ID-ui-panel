function getPageIDs(filter = "") {
  const query = filter.trim().toLowerCase();

  return Array.from(
    document.querySelectorAll("[id]")
  )
  .map(el => el.id)
  .filter(Boolean)
  .filter(id => {
    if (
      id.startsWith("__lomandoInspector")
    ) {
      return false;
    }

    return id
      .toLowerCase()
      .includes(query);
  });
}

function renderIDs(filter, container, onSelect) {
  container.innerHTML = "";

  for (const id of getPageIDs(filter)) {
    const button = document.createElement("button");

    button.textContent = "# " + id;
    button.className = "inspector-button";

    button.onclick = () => {
      onSelect(id);
    };

    container.appendChild(button);
  }
}
