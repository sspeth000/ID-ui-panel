(function () {
    "use strict";

    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    window.findCodeReferences = function (id, options) {
        id = String(id || "");
        if (!id) return [];

        options = options || {};
        const contextBefore = Number.isFinite(options.contextBefore) ? options.contextBefore : 500;
        const contextAfter = Number.isFinite(options.contextAfter) ? options.contextAfter : 1400;
        const maxMatches = Number.isFinite(options.maxMatches) ? options.maxMatches : 12;
        const escaped = escapeRegExp(id);
        const patterns = [
            new RegExp("getElementById\\s*\\(\\s*(['\\\"])" + escaped + "\\1\\s*\\)", "g"),
            new RegExp("(?:querySelector|querySelectorAll)\\s*\\(\\s*(['\\\"])#?" + escaped + "\\1\\s*\\)", "g"),
            new RegExp("(['\\\"])" + escaped + "\\1", "g")
        ];

        const results = [];
        const scripts = Array.from(document.scripts).filter(function (script) {
            return !script.src && script.textContent;
        });

        scripts.forEach(function (script, scriptIndex) {
            if (results.length >= maxMatches) return;

            const source = script.textContent || "";
            patterns.forEach(function (pattern) {
                if (results.length >= maxMatches) return;

                pattern.lastIndex = 0;
                let match;

                while ((match = pattern.exec(source)) && results.length < maxMatches) {
                    const start = Math.max(0, match.index - contextBefore);
                    const end = Math.min(source.length, match.index + match[0].length + contextAfter);
                    const snippet = source.slice(start, end);

                    if (!results.some(function (item) {
                        return item.scriptIndex === scriptIndex && item.index === match.index;
                    })) {
                        results.push({
                            scriptIndex: scriptIndex,
                            index: match.index,
                            text: "Inline script " + (scriptIndex + 1) +
                                " · character " + match.index + "\n\n" + snippet
                        });
                    }
                }
            });
        });

        return results.map(function (result) { return result.text; });
    };
})();