function findCodeReferences(id) {
  const scripts = Array.from(
    document.querySelectorAll("script:not([src])")
  )
  .map(script => script.textContent || "")
  .join("\n\n");

  const patterns = [
    `getElementById('${id}')`,
    `getElementById("${id}")`
  ];

  const matches = [];

  for (const pattern of patterns) {
    let start = 0;

    while (true) {
      const index =
        scripts.indexOf(pattern, start);

      if (index === -1) break;

      matches.push(
        scripts.substring(
          Math.max(0, index - 700),
          Math.min(
            scripts.length,
            index + 2500
          )
        )
      );

      start = index + pattern.length;
    }
  }

  return matches;
}
