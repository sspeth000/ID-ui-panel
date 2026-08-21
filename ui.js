// ---------------------------------------------------------
// Hue control
// ---------------------------------------------------------

const hueControl = document.createElement("div");

hueControl.className = "id-control";

hueControl.innerHTML = `
    <div class="id-control-row">
        <span class="id-control-label">Hue</span>
        <span class="id-control-value" id="id-hue-value">120°</span>
    </div>

    <input
        id="id-hue-slider"
        type="range"
        min="0"
        max="360"
        step="1"
        value="120"
    >
`;

const hueSlider =
    hueControl.querySelector(
        "#id-hue-slider"
    );

const hueValue =
    hueControl.querySelector(
        "#id-hue-value"
    );

hueSlider.addEventListener(
    "input",
    function () {

        const hue =
            Number(this.value);

        hueValue.textContent =
            hue + "°";

        panel.style.setProperty(
            "--id-hue",
            hue
        );

        if (state) {
            state.hue = hue;
        }
    }
);
