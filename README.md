# ID-ui-panel
Sometimes, websites load assets with IDs, IDs basically having code inside of them. Each asset is loaded with a unique ID. This code helps you identify IDs and view their code.
(this repository is mainly used for older websites)

# Bookmarklet
This repository can only be activated with bookmarklet code, via here. (copy paste into bookmark)

javascript:(()=>{try{fetch("https://raw.githubusercontent.com/sspeth000/ID-ui-panel/main/inspector.js?v="+Date.now(),{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.text()}).then(c=>(0,eval)(c)).catch(e=>alert("ID-ui-panel failed to load:\n\n"+e.message))}catch(e){alert("ID-ui-panel launcher error:\n\n"+e.message)}})();

# How it works
The button for it should appear in the bottom left corner, pressing it shows a panel with the IDs for assets within the page. You have successfully activated ID-ui-panel. Because the panel is so small (and new), there isn’t any needed instructions, from here on out it’s self-explanatory.

# Testing it out
If you don’t exactly know what this panel helps with, load the panel via a https://www.lomando.com page. Then, it should show IDs and what they do.
