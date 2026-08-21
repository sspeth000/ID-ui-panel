(function () {
    "use strict";

    const CACHE = new Map();

    function getScripts() {
        const scripts = Array.from(
            document.scripts
        );

        const urls = [];

        for (const script of scripts) {
            if (!script.src) continue;

            try {
                const url =
                    new URL(
                        script.src,
                        document.baseURI
                    ).href;

                if (
                    !url.toLowerCase().includes(".js") &&
                    !url.toLowerCase().includes(".mjs")
                ) {
                    continue;
                }

                if (!urls.includes(url)) {
                    urls.push(url);
                }

            } catch (e) {}
        }

        return urls;
    }

    async function fetchScript(url) {

        if (CACHE.has(url)) {
            return CACHE.get(url);
        }

        try {
            const response =
                await fetch(
                    url,
                    {
                        cache: "force-cache"
                    }
                );

            if (!response.ok) {
                return null;
            }

            const text =
                await response.text();

            CACHE.set(
                url,
                text
            );

            return text;

        } catch (e) {
            return null;
        }
    }

    function getFileName(url) {

        try {
            const parsed =
                new URL(url);

            const path =
                parsed.pathname;

            const parts =
                path.split("/");

            return (
                parts[parts.length - 1] ||
                parsed.hostname ||
                "script.js"
            );

        } catch (e) {
            return "script.js";
        }
    }

    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function downloadScript(
        url,
        filename
    ) {

        fetch(
            url,
            {
                cache: "no-store"
            }
        )
        .then(
            response => {

                if (!response.ok) {
                    throw new Error(
                        "HTTP " +
                        response.status
                    );
                }

                return response.blob();
            }
        )
        .then(
            blob => {

                const objectURL =
                    URL.createObjectURL(
                        blob
                    );

                const a =
                    document.createElement(
                        "a"
                    );

                a.href =
                    objectURL;

                a.download =
                    filename ||
                    "script.js";

                a.style.display =
                    "none";

                document.body.appendChild(
                    a
                );

                a.click();

                a.remove();

                setTimeout(
                    () => {
                        URL.revokeObjectURL(
                            objectURL
                        );
                    },
                    1000
                );
            }
        )
        .catch(
            error => {

                /*
                 * If CORS prevents downloading,
                 * opening the source is still useful.
                 */
                window.open(
                    url,
                    "_blank"
                );

                console.warn(
                    "Could not download script:",
                    error
                );
            }
        );
    }

    async function findExternalScripts(
        id
    ) {

        const scripts =
            getScripts();

        const results = [];

        /*
         * Escape the ID so it can safely be
         * searched literally.
         */
        const target =
            String(id);

        for (
            const url of scripts
        ) {

            const source =
                await fetchScript(
                    url
                );

            /*
             * CORS / network failure.
             */
            if (
                source === null
            ) {
                continue;
            }

            if (
                source.includes(
                    target
                )
            ) {

                results.push(
                    {
                        url: url,

                        name:
                            getFileName(
                                url
                            ),

                        matches:
                            countMatches(
                                source,
                                target
                            )
                    }
                );
            }
        }

        return results;
    }

    function countMatches(
        source,
        target
    ) {

        if (!target) {
            return 0;
        }

        let count = 0;
        let position = 0;

        while (true) {

            position =
                source.indexOf(
                    target,
                    position
                );

            if (
                position === -1
            ) {
                break;
            }

            count++;

            position +=
                target.length;
        }

        return count;
    }

    /*
     * Public API
     */
    window.findCodeReferences =
        async function (
            id
        ) {

            if (!id) {
                return [];
            }

            /*
             * Inline scripts
             */
            const inlineResults = [];

            const inlineScripts =
                Array.from(
                    document.querySelectorAll(
                        "script:not([src])"
                    )
                );

            for (
                let i = 0;
                i < inlineScripts.length;
                i++
            ) {

                const source =
                    inlineScripts[i]
                        .textContent ||
                    "";

                if (
                    source.includes(
                        String(id)
                    )
                ) {

                    inlineResults.push(
                        {
                            type:
                                "inline",

                            name:
                                "Inline script #" +
                                (i + 1),

                            source:
                                source,

                            matches:
                                countMatches(
                                    source,
                                    String(id)
                                )
                        }
                    );
                }
            }

            /*
             * External scripts
             */
            const externalResults =
                await findExternalScripts(
                    id
                );

            return [
                ...inlineResults,
                ...externalResults
            ];
        };

    /*
     * Render the results into the inspector.
     */
    window.renderCodeReferences =
        function (
            container,
            results
        ) {

            container.innerHTML = "";

            const title =
                document.createElement(
                    "div"
                );

            title.textContent =
                "Code located in";

            title.style.marginBottom =
                "6px";

            title.style.fontWeight =
                "bold";

            container.appendChild(
                title
            );

            if (
                !results ||
                !results.length
            ) {

                const empty =
                    document.createElement(
                        "div"
                    );

                empty.textContent =
                    "No JavaScript files containing this ID were found.";

                container.appendChild(
                    empty
                );

                return;
            }

            for (
                const result of results
            ) {

                const wrapper =
                    document.createElement(
                        "div"
                    );

                wrapper.style.marginBottom =
                    "8px";

                const location =
                    document.createElement(
                        "div"
                    );

                location.textContent =
                    result.name;

                location.style.fontWeight =
                    "bold";

                wrapper.appendChild(
                    location
                );

                /*
                 * Inline script:
                 * show a small preview.
                 */
                if (
                    result.type ===
                    "inline"
                ) {

                    const preview =
                        document.createElement(
                            "pre"
                        );

                    const source =
                        result.source ||
                        "";

                    const index =
                        source.indexOf(
                            String(
                                container.dataset.id ||
                                ""
                            )
                        );

                    let start =
                        Math.max(
                            0,
                            index - 150
                        );

                    let end =
                        Math.min(
                            source.length,
                            index + 300
                        );

                    preview.textContent =
                        source.slice(
                            start,
                            end
                        );

                    preview.style.whiteSpace =
                        "pre-wrap";

                    preview.style.maxHeight =
                        "120px";

                    preview.style.overflow =
                        "auto";

                    wrapper.appendChild(
                        preview
                    );

                } else {

                    /*
                     * External JS:
                     * show URL + download button.
                     */
                    const url =
                        document.createElement(
                            "div"
                        );

                    url.textContent =
                        result.url;

                    url.style.fontSize =
                        "8px";

                    url.style.wordBreak =
                        "break-all";

                    url.style.marginBottom =
                        "4px";

                    wrapper.appendChild(
                        url
                    );

                    const download =
                        document.createElement(
                            "button"
                        );

                    download.type =
                        "button";

                    download.textContent =
                        "📄 Download " +
                        result.name;

                    download.style.width =
                        "100%";

                    download.style.cursor =
                        "pointer";

                    download.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            event.stopPropagation();

                            downloadScript(
                                result.url,
                                result.name
                            );
                        }
                    );

                    wrapper.appendChild(
                        download
                    );
                }

                container.appendChild(
                    wrapper
                );
            }
        };

})();
