(function () {
    "use strict";

    window.findCodeReferences = function (id) {
        id = String(id || "").trim();

        if (!id) {
            return [];
        }

        const results = [];

        // -----------------------------------------------------
        // INLINE SCRIPTS
        // -----------------------------------------------------

        const inlineScripts =
            document.querySelectorAll(
                "script:not([src])"
            );

        for (let i = 0; i < inlineScripts.length; i++) {

            const source =
                inlineScripts[i].textContent || "";

            if (source.includes(id)) {

                results.push({
                    type: "inline",
                    name:
                        "Inline script #" +
                        (i + 1),
                    source: source,
                    url: null
                });
            }
        }

        // -----------------------------------------------------
        // EXTERNAL SCRIPTS
        //
        // We cannot synchronously fetch external JS here,
        // so return the script locations for the inspector.
        // -----------------------------------------------------

        const scripts =
            document.querySelectorAll(
                "script[src]"
            );

        const seen =
            new Set();

        for (const script of scripts) {

            try {

                const url =
                    new URL(
                        script.src,
                        document.baseURI
                    ).href;

                if (seen.has(url)) {
                    continue;
                }

                seen.add(url);

                const pathname =
                    new URL(url).pathname
                        .toLowerCase();

                if (
                    !pathname.endsWith(".js") &&
                    !pathname.endsWith(".mjs")
                ) {
                    continue;
                }

                const parts =
                    pathname.split("/");

                const name =
                    parts[parts.length - 1] ||
                    "script.js";

                results.push({
                    type: "external",
                    name: name,
                    url: url,
                    source: null
                });

            } catch (e) {}
        }

        return results;
    };

})();
