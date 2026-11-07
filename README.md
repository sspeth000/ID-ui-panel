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

## Bookmarklet

Create a bookmark and use the following as its URL:

```javascript
javascript:(()=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/gh/sspeth000/ID-ui-panel@main/inspector.js?v="+Date.now();s.onload=()=>s.remove();s.onerror=()=>{s.remove();alert("ID-ui-panel could not load inspector.js from jsDelivr. Check your connection or try again.")};document.documentElement.appendChild(s)})();
```

The bookmarklet loads the inspector through jsDelivr from this repository's `main` branch.

## Usage

1. Open a page you want to inspect.
2. Activate the bookmarklet.
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
| `inspector.js` | Complete standalone inspector. No separate JavaScript or CSS files are required. |
| `README.md` | Setup and usage instructions |

## License

See the repository's license file, if present.
