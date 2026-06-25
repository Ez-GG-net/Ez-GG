// Add to your existing keydown event listener in copy.js
function generatePastedElementName(copiedName) {
    const nameCount = {}; // To track occurrences of base names and their max numbers

    // Parse existing elements to build the nameCount object
    elementsArray.forEach((element) => {
        const match = element.name.match(/^(.*?)(?:\s(\d+))?$/); // Matches base name and optional number
        if (match) {
            const baseName = match[1].trim();
            const number = match[2] ? parseInt(match[2], 10) : 0;
            nameCount[baseName] = Math.max(nameCount[baseName] || 0, number);
        }
    });

    const match = copiedName.match(/^(.*?)(?:\s(\d+))?$/);
    if (match) {
        const baseName = match[1].trim();
        const currentNumber = match[2] ? parseInt(match[2], 10) : 0;

        if (currentNumber > 0) {
            // If the copied name ends with a number, increment that number
            nameCount[baseName] = Math.max(nameCount[baseName] || 0, currentNumber);
            return `${baseName} ${nameCount[baseName] + 1}`;
        } else {
            // If the copied name doesn't end with a number, append " 1"
            if (nameCount[baseName] !== undefined) {
                return `${baseName} ${nameCount[baseName] + 1}`;
            }
            return `${baseName} 1`;
        }
    }
    return copiedName;
}

document.addEventListener('keydown', (e) => {
    //Check if the user isnt typing in an input field
    if (e.ctrlKey && e.key === 'd') {
        //disable default bookmarking
        e.preventDefault();
        
    }

    setTimeout(()=>{
        if (typedInInputField) return
    // Keep existing copy/paste/delete functionality

    if (selectedElementIndex !== null) {
        const selectedElement = elementsArray[selectedElementIndex];

        // Add layer movement with Ctrl + Arrow keys
        if (e.ctrlKey) {
            switch (e.key) {
                case 'ArrowUp':
                    if (!e.shiftKey) {
                    moveLayerUp();
                    } else {
                        moveLayerTop()
                    }
                    e.preventDefault(); // Prevent scrolling
                    break;
                case 'ArrowDown':
                    if (!e.shiftKey) {
                    moveLayerDown();
                    } else {
                        moveLayerBottom()
                    }
                    e.preventDefault(); // Prevent scrolling
                    break;
            }
        }

        // Keep existing copy/paste/delete handlers
        if (e.ctrlKey && e.key === 'c') {
            copiedElement = { ...selectedElement };
           //// console.log('Element copied:', copiedElement);
        }

        if (e.ctrlKey && e.key === 'v' && copiedElement) {
            const newElement = {
                ...copiedElement,
                x: copiedElement.x + 20,
                y: copiedElement.y + 20,
                name: generatePastedElementName(copiedElement.name),
            };
            // Add the new element to the array
    elementsArray.push(newElement);
    selectedElementIndex = elementsArray.length - 1;

    // Log and update UI
 ////   console.log("Element pasted:", newElement);
    drawElements();
    updateElementList();
    drawResizeBorderAndHandles(newElement);
}
        if (e.ctrlKey && e.key === 'd') {
            const copiedElement = selectedElement;
            const newElement = {
                ...copiedElement,
                x: copiedElement.x + 20,
                y: copiedElement.y + 20,
                name: generatePastedElementName(copiedElement.name),
            };
            // Add the new element to the array
    elementsArray.push(newElement);
    selectedElementIndex = elementsArray.length - 1;

    // Log and update UI
  ////  console.log("Element duplicated:", newElement);
    drawElements();
    updateElementList();
    drawResizeBorderAndHandles(newElement);
        }

        if (e.key == 'Backspace') {
            elementsArray.splice(selectedElementIndex, 1);
            selectedElementIndex = null;
       ////     console.log('Element deleted.');
            drawElements();
            updateElementList();
        }
    }
},1)
});

$("#copyButton").onclick = function(){
    const selectedElement = elementsArray[selectedElementIndex];
        copiedElement = { ...selectedElement };

}
$("#pasteButton").onclick = function () {
    const newElement = {
        ...copiedElement,
        x: copiedElement.x + 20,
        y: copiedElement.y + 20,
        name: generatePastedElementName(copiedElement.name),
    };
    // Add the new element to the array
elementsArray.push(newElement);
selectedElementIndex = elementsArray.length - 1;

// Log and update UI
////console.log("Element duplicated:", newElement);
drawElements();
updateElementList();
drawResizeBorderAndHandles(newElement);
};


function moveLayerTop() {
    if (selectedElementIndex === null || selectedElementIndex >= elementsArray.length - 1) return;
    
    // Store the selected element
    const selectedElement = elementsArray[selectedElementIndex];
    
    // Remove the element from its current position
    elementsArray.splice(selectedElementIndex, 1);
    
    // Add it to the end of the array (top layer)
    elementsArray.push(selectedElement);
    
    // Update the selected index to the new position
    selectedElementIndex = elementsArray.length - 1;
    
    // Redraw everything
    drawElements();
    updateElementList();
    if (selectedElementIndex !== null) {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]);
    }
}

function moveLayerBottom() {
    if (selectedElementIndex === null || selectedElementIndex <= 0) return;
    
    // Store the selected element
    const selectedElement = elementsArray[selectedElementIndex];
    
    // Remove the element from its current position
    elementsArray.splice(selectedElementIndex, 1);
    
    // Add it to the beginning of the array (bottom layer)
    elementsArray.unshift(selectedElement);
    
    // Update the selected index to the new position
    selectedElementIndex = 0;
    
    // Redraw everything
    drawElements();
    updateElementList();
    if (selectedElementIndex !== null) {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]);
    }
}

function moveLayerUp() {
    if (selectedElementIndex === null || selectedElementIndex >= elementsArray.length - 1) return;
    
    // Swap the selected element with the one above it
    const temp = elementsArray[selectedElementIndex];
    elementsArray[selectedElementIndex] = elementsArray[selectedElementIndex + 1];
    elementsArray[selectedElementIndex + 1] = temp;
    
    // Update the selected index
    selectedElementIndex++;
    
    // Redraw everything
    drawElements();
    updateElementList();
    if (selectedElementIndex !== null) {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]);
    }
}

function moveLayerDown() {
    if (selectedElementIndex === null || selectedElementIndex <= 0) return;
    
    // Swap the selected element with the one below it
    const temp = elementsArray[selectedElementIndex];
    elementsArray[selectedElementIndex] = elementsArray[selectedElementIndex - 1];
    elementsArray[selectedElementIndex - 1] = temp;
    
    // Update the selected index
    selectedElementIndex--;
    
    // Redraw everything
    drawElements();
    updateElementList();
    if (selectedElementIndex !== null) {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]);
    }
}
// Add these new layer management functions
function moveLayerUp() {
    if (selectedElementIndex === null || selectedElementIndex >= elementsArray.length - 1) return;
    
    // Swap the selected element with the one above it
    const temp = elementsArray[selectedElementIndex];
    elementsArray[selectedElementIndex] = elementsArray[selectedElementIndex + 1];
    elementsArray[selectedElementIndex + 1] = temp;
    
    // Update the selected index
    selectedElementIndex++;
    
    // Redraw everything
    drawElements();
    updateElementList();
    if (selectedElementIndex !== null) {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]);
    }
}

function moveLayerDown() {
    if (selectedElementIndex === null || selectedElementIndex <= 0) return;
    
    // Swap the selected element with the one below it
    const temp = elementsArray[selectedElementIndex];
    elementsArray[selectedElementIndex] = elementsArray[selectedElementIndex - 1];
    elementsArray[selectedElementIndex - 1] = temp;
    
    // Update the selected index
    selectedElementIndex--;
    
    // Redraw everything
    drawElements();
    updateElementList();
    if (selectedElementIndex !== null) {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]);
    }
}





// Helper function to determine contrasting text color
function getContrastColor(bgColor) {
    // Convert hex to RGB if necessary
    let color = bgColor;
    if (color.startsWith('#')) {
        color = hexToRgb(color);
    }
    
    // Extract RGB values
    const rgb = color.match(/\d+/g).map(Number);
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    
    // Return black or white based on background brightness
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` :
        null;
}