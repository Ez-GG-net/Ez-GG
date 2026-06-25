let selectedElementIndexes = []; // Array to store multiple selected elements

c.addEventListener("click", (e) => {
    const mouseX = e.offsetX + camera.x;
    const mouseY = e.offsetY + camera.y;

    if (!isResizing && !e.shiftKey) {
        // Clear selection unless Shift is held
        selectedElementIndexes = [];
        selectedElementIndex = null; // Reset single selection for backward compatibility
    }

    for (let i = 0; i < elementsArray.length; i++) {
        const element = elementsArray[i];
        if (
            mouseX >= element.x &&
            mouseX <= element.x + element.width &&
            mouseY >= element.y &&
            mouseY <= element.y + element.height
        ) {
            if (e.shiftKey) {
                // Multiselect: Add or remove from the selection
                const index = selectedElementIndexes.indexOf(i);
                if (index === -1) {
                    selectedElementIndexes.push(i); // Add to selection
                } else {
                    selectedElementIndexes.splice(index, 1); // Remove from selection
                }
            } else {
                // Single select (default behavior)
                selectedElementIndexes = [i];
                selectedElementIndex = i;
            }

            updateButtonVisibility(); // Update the top UI
          //  updateElementDetails(i); // Update color, image, etc.
            updateElementList();
            break;
        }
    }

    if (selectedElementIndexes.length === 0) {
        document.getElementById("adjustments").style.display = "none";
        document.querySelectorAll("#elementList li").forEach((li) => {
            li.style.backgroundColor = '';
            li.style.border = '';
        });
    } else {
        // Draw handles for all selected elements
        selectedElementIndexes.forEach(index => drawResizeBorderAndHandles(elementsArray[index]));
        document.getElementById("adjustments").style.display = "block";
    }

    updateUI(); // Update the UI with the selected elements' details
});




