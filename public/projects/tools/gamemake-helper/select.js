let isDragging = false;
let isResizing = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let currentResizePoint = null;

function drawResizeBorderAndHandles(element) {
    const ctx = c.getContext('2d');
ctx.save()
    // Draw the resize border
   ctx.translate(-camera.x, -camera.y);

    // Draw resize handles (squares)
    const handleSize = 10; // Size of the square handles
    const handles = [
        { x: element.x  - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 }, // Left middle
        { x: element.x  + element.width - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 }, // Right middle
        { x: element.x  + element.width / 2 - handleSize / 2, y: element.y - handleSize / 2 }, // Top middle
        { x: element.x  + element.width / 2 - handleSize / 2, y: element.y + element.height - handleSize / 2 }, // Bottom middle
        { x: element.x- handleSize / 2, y: element.y- handleSize / 2,}, // Top-left corner
        { x: element.x + element.width- handleSize / 2, y: element.y- handleSize / 2, }, // Top-right corner
        { x: element.x- handleSize / 2, y: element.y + element.height- handleSize / 2, }, // Bottom-left corner
        { x: element.x + element.width- handleSize / 2, y: element.y + element.height- handleSize / 2,  }, // Bottom-right corner
    ];
    ctx.strokeStyle = 'blue'
    ctx.strokeWidth = 0.5;
    ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.fillStyle = 'blue'; // Handle color
    handles.forEach(handle => {
        if (selectedElementIndex === null) return
        ctx.fillRect(handle.x, handle.y, handleSize, handleSize); // Draw square handle
    });
  ctx.restore()
}

c.addEventListener('mousedown', (e) => {
    if (selectedElementIndex !== null && !isResizing) {
        const element = elementsArray[selectedElementIndex];
        const mouseX = e.offsetX+camera.x;
        const mouseY = e.offsetY+camera.y;
       
        // Check if the mouse is inside the element
        if (
            mouseX >= element.x  &&
            mouseX <= element.x  + element.width &&
            mouseY >= element.y &&
            mouseY <= element.y + element.height
        ) {
            isDragging = true;
            dragOffsetX = mouseX - (element.x ); // Adjust for 340 offset
            dragOffsetY = mouseY - element.y;
            document.body.style.cursor = 'move'; // Set the cursor to 'move' when dragging
        }
// Check if the mouse is on a resize handle (square) using box colliders
const handleSize = 10; // Handle size (same as drawResizeBorderAndHandles)
const handles = [
    { x: element.x + 340 - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 }, // Left middle
    { x: element.x + 340 + element.width - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 }, // Right middle
    { x: element.x + 340 + element.width / 2 - handleSize / 2, y: element.y - handleSize / 2 }, // Top middle
    { x: element.x + 340 + element.width / 2 - handleSize / 2, y: element.y + element.height - handleSize / 2 }, // Bottom middle
    { x: element.x+ 340- handleSize / 2, y: element.y- handleSize / 2, }, // Top-left corner
    { x: element.x+ 340 + element.width- handleSize / 2, y: element.y- handleSize / 2,}, // Top-right corner
    { x: element.x+ 340- handleSize / 2, y: element.y + element.height- handleSize / 2,  }, // Bottom-left corner
    { x: element.x+ 340 + element.width- handleSize / 2, y: element.y + element.height- handleSize / 2, }, // Bottom-right corner
];

handles.forEach((handle, index) => {
 
    // Check if the mouse is within the bounding box of the handle (box collider)
    if (
        mouseX+340 >= handle.x &&
        mouseX+340 <= handle.x + handleSize &&
        mouseY >= handle.y &&
        mouseY <= handle.y + handleSize
    ) {
       
        currentResizePoint = { x: handle.x, y: handle.y, index };
        isResizing = true;
        dragOffsetX = mouseX - handle.x;
        dragOffsetY = mouseY - handle.y;
    }
});

    }
});

c.addEventListener('mousemove', (e) => {
    if (isResizing && selectedElementIndex !== null) {
        const element = elementsArray[selectedElementIndex];
        const handle = currentResizePoint;

        // Resize logic based on the selected handle
        if (handle.index === 1) { // Right middle handle
            element.width = e.offsetX+camera.x - element.x;
        }
        if (handle.index === 3) { // Bottom middle handle
            element.height = e.offsetY+camera.y - element.y;
        }
        if (handle.index === 0) { // Left middle handle
            element.width = (element.x + element.width) - e.offsetX+camera.x;
            element.x = e.offsetX+camera.x;
        }
        if (handle.index === 2) { // Top middle handle
            element.height = (element.y + element.height) - e.offsetY+camera.y;
            element.y = e.offsetY+camera.y;
        }
        
        if (handle.index === 4) { // Top-left handle
            const newWidth = (element.x + element.width) - e.offsetX+camera.x;
            const newHeight = (element.y + element.height) - e.offsetY+camera.y;
            if (e.shiftKey) {
                const originalAspectRatio = element.width / element.height;
                const newAspectRatio = newWidth / newHeight;
                if (newAspectRatio > originalAspectRatio) {
                    element.width = newHeight * originalAspectRatio;
                    element.height = newHeight;
                } else {
                    element.width = newWidth;
                    element.height = newWidth / originalAspectRatio;
                }
            } else {
                element.width = newWidth;
                element.height = newHeight;
            }
            element.x = e.offsetX+camera.x;
            element.y = e.offsetY+camera.y;
        }
        if (handle.index === 5) { // Top right handle
            const newWidth = e.offsetX+camera.x - element.x;
            const newHeight = (element.y + element.height) - e.offsetY+camera.y;
            if (e.shiftKey) {
                const originalAspectRatio = element.width / element.height;
                const newAspectRatio = newWidth / newHeight;
                if (newAspectRatio > originalAspectRatio) {
                    element.width = newHeight * originalAspectRatio;
                    element.height = newHeight;
                } else {
                    element.width = newWidth;
                    element.height = newWidth / originalAspectRatio;
                }
            } else {
                element.width = newWidth;
                element.height = newHeight;
            }
            element.y = e.offsetY+camera.y;
        }
        if (handle.index === 6) { // Bottom-left handle
            const newWidth = (element.x + element.width) - e.offsetX+camera.x;
            const newHeight = e.offsetY+camera.y - element.y;
            if (e.shiftKey) {
                const originalAspectRatio = element.width / element.height;
                const newAspectRatio = newWidth / newHeight;
                if (newAspectRatio > originalAspectRatio) {
                    element.width = newHeight * originalAspectRatio;
                    element.height = newHeight;
                } else {
                    element.width = newWidth;
                    element.height = newWidth / originalAspectRatio;
                }
            } else {
                element.width = newWidth;
                element.height = newHeight;
            }
            element.x = e.offsetX+camera.x;
        }
        if (handle.index === 7) { // Bottom-right handle
            const newWidth = e.offsetX+camera.x - element.x;
            const newHeight = e.offsetY+camera.y - element.y;
            if (e.shiftKey) {
                const originalAspectRatio = element.width / element.height;
                const newAspectRatio = newWidth / newHeight;
                if (newAspectRatio > originalAspectRatio) {
                    element.width = newHeight * originalAspectRatio;
                    element.height = newHeight;
                } else {
                    element.width = newWidth;
                    element.height = newWidth / originalAspectRatio;
                }
            } else {
                element.width = newWidth;
                element.height = newHeight;
            }
        }
      
        isDragging = false;
       drawElements(); // Re-render all elements
       drawResizeBorderAndHandles(element); // Re-draw the border and handles
    }
    if (isDragging && selectedElementIndex !== null) {
        const element = elementsArray[selectedElementIndex];
        element.x = e.offsetX+camera.x - dragOffsetX;
        element.y = e.offsetY+camera.y - dragOffsetY;
   
        
        drawElements(); // Re-render all elements
        drawResizeBorderAndHandles(element); // Re-draw the border and handles
    }
});

c.addEventListener('mouseup', () => {
   


  
if (selectedElementIndex !== null && (isDragging || isResizing)) {
    const element = elementsArray[selectedElementIndex];
    element.x = applyGridSnap(element.x, element.y).x
    element.y = applyGridSnap(element.x, element.y).y
    element.width = applyScaleGridSnap(element.width, element.height).w
    element.height = applyScaleGridSnap(element.width, element.height).h
  if (element.width < 0) {
    element.x += element.width;
    element.width = Math.abs(element.width);
}
    if (element.height < 0) {
    element.y += element.height;
    element.height = Math.abs(element.height);
}
}
isDragging = false;
isResizing = false,1
    document.body.style.cursor = 'default'; // Reset cursor when dragging stops

 drawElements()
});
function rgbaToHexWithoutAlpha(rgba) {
    // Extract the numeric values using a regular expression
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

    if (!match) {
        return rgba
      //  throw new Error("Invalid RGBA format ("+rgba+")");
    }

    // Convert the R, G, B values to hexadecimal
    const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(match[3], 10).toString(16).padStart(2, '0');

    // Combine the hexadecimal values
    return `#${r}${g}${b}`;
}
c.addEventListener("click", (e) => {
    const mouseX = e.offsetX+camera.x;
    const mouseY = e.offsetY+camera.y;
if (!isResizing) {

    selectedElementIndex = null; // Reset selection
}

    for (let i = 0; i < elementsArray.length; i++) {
        const element = elementsArray[i];
       
        if (
            mouseX >= element.x &&
            mouseX <= element.x + element.width &&
            mouseY >= element.y &&
            mouseY <= element.y + element.height
        ) {
            
            selectedElementIndex = i; // Select the clicked element
            updateButtonVisibility(); //Update the topUi

            const colorPreview = document.getElementById("colorPreview");
            const colorInput = document.getElementById('colorInput');
           
        const alphaSlider = document.getElementById('alphaSlider');
        const alphaValue = document.getElementById('alphaValue');
            colorPreview.style.backgroundColor = elementsArray[i].color

          

           colorInput.value = rgbaToHexWithoutAlpha( elementsArray[i].color)
            alphaSlider.value = elementsArray[i].alpha*100
            alphaValue.value  = elementsArray[i].alpha*100
            

            const previewLabel = document.getElementById('imagePreviewLabel');
            const filenamePreview = previewLabel.querySelector('.filename-preview');
            if (elementsArray[i].image) {
           
                  // Set the background image of the button
                  previewLabel.style.backgroundImage = `url(${elementsArray[i].image.currentSrc})`;
                  // Add the has-image class to hide the + icon and show filename
                  previewLabel.classList.add('has-image');
                  // Set the filename
                  filenamePreview.textContent = elementsArray[i].imageName;
            } else {
                previewLabel.classList.remove('has-image');
                previewLabel.style.backgroundImage = 'none';
                filenamePreview.textContent = ''
            }
            updateElementList()
            break;
            
        }
    }

    if (selectedElementIndex == null) {
        document.getElementById("adjustments").style.display = "none";

        document.querySelectorAll("#elementList li").forEach((li)=>{
          
                li.style.backgroundColor = '';
                li.style.border = '';

            
        })
    } else {
        drawResizeBorderAndHandles(elementsArray[selectedElementIndex]); // Draw handles when element is selected
        document.getElementById("adjustments").style.display = "block";
    }
    updateUI(); // Update the UI with the selected element's details
});

// Update the UI based on the selected element
function updateUI() {
    if (selectedElementIndex !== null) {
        const selectedElement = elementsArray[selectedElementIndex];
        document.getElementById("widthInput").value = selectedElement.width;
        document.getElementById("heightInput").value = selectedElement.height;
        document.getElementById("positionXInput").value = selectedElement.x;
        document.getElementById("positionYInput").value = selectedElement.y;
    } else {
        document.getElementById("widthInput").value = '';
        document.getElementById("heightInput").value = '';
        document.getElementById("positionXInput").value = '';
        document.getElementById("positionYInput").value = '';
    }
}
