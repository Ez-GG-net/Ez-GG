let lastUsedColor = "#ffffff"; // Default last used color

const colorInputEl = document.getElementById("colorInput");
const lastColorButtonContainer = document.getElementById("lastColorButtonContainer");
const useLastColorButton = document.getElementById("useLastColorButton");

// Show the "Use Last Color" button when editing the colorInput
colorInputEl.addEventListener("input", () => {
    lastUsedColor = colorInputEl.value; // Update the last used color
    useLastColorButton.style.backgroundColor = lastUsedColor
});

// Display the button when the user interacts with colorInput
colorInputEl.addEventListener("focus", () => {
    lastColorButtonContainer.style.display = "block";
});

// Hide the button when the colorInput loses focus (optional)
colorInputEl.addEventListener("blur", () => {
    setTimeout(() => { // Delay ensures the click on the button works
        lastColorButtonContainer.style.display = "none";
    }, 200);
});

// Set the colorInput to the last used color
useLastColorButton.addEventListener("click", () => {
    colorInputEl.value = lastUsedColor;
    document.getElementById("colorPreview").style.backgroundColor = lastUsedColor; // Update preview

    elementsArray[selectedElementIndex].color = lastUsedColor

    drawElements()
    drawResizeBorderAndHandles(elementsArray[selectedElementIndex])
});
