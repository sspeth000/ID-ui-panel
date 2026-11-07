# ID-ui-panel

A lightweight in-page inspector for exploring DOM element IDs on older and modern websites.

ID-ui-panel helps you discover elements, inspect their basic DOM details, locate references in inline scripts, highlight selected elements, and temporarily change an element's visibility.

## Features

- Live ID scanning, including elements added after the panel opens
- Search and filter element IDs
- Element-type labels (for example: `div`, `img`, and `canvas`)
- Select an element by ID or use the page picker
- Highlight the selected element
- Inspect source-related details and inline JavaScript references
- Copy inspection output
- Temporarily toggle the selected element's visibility
- Adjustable accent hue and panel opacity

## Bookmarklet loader

Create a new bookmark, name it **ID-ui-panel**, and paste this entire line into the bookmark's URL field:

```javascript
javascript:(function(){var urls=["https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/inspector.js","https://cdn.jsdelivr.net/gh/sspeth000/ID-ui-panel@main/inspector.js"];var index=0;function loadNext(){var script=document.createElement("script");script.src=urls[index++]+"?v="+Date.now();script.onload=function(){script.remove();};script.onerror=function(){script.remove();if(index<urls.length){loadNext();}else{alert("ID-ui-panel could not load. Both script sources failed. Check the page console and your connection.");}};(document.head||document.documentElement).appendChild(script);}loadNext();})();
```

The loader tries GitHub's raw content host first, then falls back to jsDelivr. It adds a cache-busting query to avoid stale browser responses.

## Console loader

If bookmarklets are blocked or you prefer DevTools, open the page's developer console and paste the contents of [`console-loader.js`](./console-loader.js).

The console loader uses the same primary and fallback sources and prints its progress in the console. Only paste code you understand and trust into a developer console.

## Usage

1. Open the page you want to inspect.
2. Activate the bookmarklet or run the console loader.
3. Open the panel using the floating gear button.
4. Search for an ID, select one from the live list, or choose **Pick Asset** and click an element on the page.
5. Review its details and inline-script references.

## Notes and limitations

- The inspector examines the current page's DOM. It does not retrieve a website's private source files or bypass browser origin restrictions.
- Inline script references are searchable. External scripts are not fetched automatically because cross-origin access may be restricted.
- Visibility changes are temporary and affect the current page session.
- Some sites isolate their content in cross-origin frames or shadow roots. Those areas may not be visible to the inspector.

## Project structure

| File | Purpose |
| --- | --- |
| `inspector.js` | Complete standalone inspector. No separate JavaScript or CSS modules are required. |
| `console-loader.js` | Pasteable DevTools console loader |
| `README.md` | Setup and usage instructions |

## License

See the repository's license file, if present.
