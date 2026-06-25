

document.getElementById("addElementButton").addEventListener("click", () => {
    
    const elementName = document.getElementById("elementName").value || "Unnamed Element";
    const newElement = {
        name: elementName,
        width: 100,   // Default width
        height: 100,  // Default height
         x: 0, y: 0,
        color: "#ffffff", // Default color
        alpha:1,
        shape:"rect",
        image:null,
        imageName:null,
    };
    
    elementsArray.push(newElement);
    updateElementList();
});

function updateElementList() {
    const elementList = document.getElementById("elementListItems");
    elementList.innerHTML = ""; // Clear existing list
   
    elementsArray.forEach((element, index) => {
        const li = document.createElement("li");
        li.textContent = `${element.name}`; // Add layer number to name
        
        // Highlight selected element
        if (index === selectedElementIndex) {
            li.style.backgroundColor = '#2a2a2a';
            li.style.border = '1px solid #4CAF50';
        }
        
        li.addEventListener("click", () => {
            const list = elementList.querySelectorAll('li')
           drawElements()
            list.forEach((listLi)=>{
                if (listLi == li) {
                    li.style.backgroundColor = '#2a2a2a';
                    li.style.border = '1px solid #4CAF50';
                } else {
                    listLi.style.backgroundColor = '';
                    listLi.style.border = '';
 
                }
            })
            selectElement(index)
           
    });
        elementList.appendChild(li);
    });
}

function selectElement(index) {
    document.getElementById("adjustments").style.display = "block";
    selectedElementIndex = index;
    const selectedElement = elementsArray[index];
    const element = selectedElement
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
    //move the camera so the object is visible if it isnt already visible
    if (element.x < camera.x + c.width
         && element.x + element.width > camera.x 
         && element.y + element.height > camera.y
          && element.y < camera.y + c.height) {

    } else {
        camera.x = element.x
        camera.y = element.y
    }
    


    drawElements()
    ctx.save()
    ctx.translate(-camera.x, -camera.y)
  
    
    ctx.fillStyle = 'blue'; // Handle color
    handles.forEach(handle => {
        if (selectedElementIndex === null) return
        ctx.fillRect(handle.x, handle.y, handleSize, handleSize); // Draw square handle
    });
    ctx.restore()

    
    document.getElementById("widthInput").value = selectedElement.width;
    document.getElementById("heightInput").value = selectedElement.height;
    document.getElementById("positionXInput").value = selectedElement.x;
    document.getElementById("positionYInput").value = selectedElement.y;
    document.getElementById("colorInput").value = selectedElement.color;
    document.getElementById("colorPreview").style.backgroundColor = selectedElement.color;
}

// Update width and height inputs
document.getElementById("widthInput").addEventListener("input", (e) => {
    if (selectedElementIndex !== null) {
        elementsArray[selectedElementIndex].width = parseFloat(e.target.value);
    }
    drawElements()
    typedInInputField = true
    setTimeout(() => typedInInputField = false, 2) 
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewLabel = document.getElementById('imagePreviewLabel');
    const filenamePreview = previewLabel.querySelector('.filename-preview');
    const deleteButton = document.getElementById('deleteImageButton');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Set the background image of the button
            previewLabel.style.backgroundImage = `url(${e.target.result})`;
            // Add the has-image class to hide the + icon and show filename
            previewLabel.classList.add('has-image');
            // Set the filename
            filenamePreview.textContent = file.name;

             // Show delete button
             deleteButton.style.display = 'flex';

            //Set the element class
            if (selectedElementIndex !== null) {
                            // Create a new image object
            const img = new Image();
            
            // When the image loads, store it in our cache
            img.onload = function() {
                // Store the loaded image in our cache using the filename as key
                imageCache.set(file.name, img);
                
                // Example of drawing the image on a canvas
                // Assuming you have a canvas context 'ctx':
                // ctx.drawImage(img, x, y, width, height);
                elementsArray[selectedElementIndex].image = img;
                elementsArray[selectedElementIndex].imageName = file.name
                drawElements()
            };
            
            // Set the image source to the loaded file
            img.src = e.target.result;
            
          
            }
            
        };
        reader.readAsDataURL(file);
    } else {
        // Reset the button if no file is selected
        previewLabel.style.backgroundImage = 'none';
        previewLabel.classList.remove('has-image');
        filenamePreview.textContent = '';
    }
});
// Add delete button event listener
document.getElementById('deleteImageButton').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent any form submission
    const previewLabel = document.getElementById('imagePreviewLabel');
    const filenamePreview = previewLabel.querySelector('.filename-preview');
    const deleteButton = document.getElementById('deleteImageButton');
    const imageInput = document.getElementById('imageInput');

    // Reset the file input
    imageInput.value = '';
    
    // Reset the preview
    previewLabel.style.backgroundImage = 'none';
    previewLabel.classList.remove('has-image');
    filenamePreview.textContent = '';
    
    // Hide delete button
    deleteButton.style.display = 'none';

    elementsArray[selectedElementIndex].image = null;
    elementsArray[selectedElementIndex].imageName = null;
    
    // Clear the cached image
    imageCache.clear();
    
    drawElements()
});
document.getElementById("colorPreview").addEventListener("click", () => {
    document.getElementById("colorInput").click();  // Trigger the hidden color input
});
function colorInput (){
    const colorPreview = document.getElementById("colorPreview");
    const colorInput = document.getElementById('colorInput');
const alphaSlider = document.getElementById('alphaSlider');
const alphaValue = document.getElementById('alphaValue');
    colorPreview.style.backgroundColor = colorInput.value;




// Convert hex color to rgba
function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}





// Update color preview with current color and alpha
function updateColorPreview() {
    const color = colorInput.value;
    const alpha = alphaSlider.value / 100;
    colorPreview.style.backgroundColor = hexToRGBA(color, alpha);
    
    // If you need to update the selected element's color
    if (selectedElementIndex !== null) {
        elementsArray[selectedElementIndex].color = hexToRGBA(color,alpha)
        elementsArray[selectedElementIndex].alpha = alpha
        drawElements()
        typedInInputField = true
        setTimeout(() => typedInInputField = false, 2) 
    }
}

// Event listeners
colorInput.addEventListener('input', updateColorPreview);
colorPreview.addEventListener('click', () => colorInput.click());

alphaSlider.addEventListener('input', () => {
    alphaValue.value = alphaSlider.value;
    updateColorPreview();
});

alphaValue.addEventListener('input', () => {
    const value = Math.min(100, Math.max(0, alphaValue.value));
    alphaSlider.value = value;
    alphaValue.value = value;
    updateColorPreview();
});

// Initial color preview
updateColorPreview();





}
document.getElementById("colorInput").addEventListener("input", (e) => {
    colorInput()
});
colorInput()

document.getElementById("heightInput").addEventListener("input", (e) => {
    if (selectedElementIndex !== null) {
        elementsArray[selectedElementIndex].height = parseFloat(e.target.value);
    }
    drawElements()
    typedInInputField = true
    setTimeout(() => typedInInputField = false, 2) 
});

// Update position inputs
document.getElementById("positionXInput").addEventListener("input", (e) => {
    if (selectedElementIndex !== null) {
        elementsArray[selectedElementIndex].x = parseInt(e.target.value);
    }
    drawElements()
    typedInInputField = true
    setTimeout(() => typedInInputField = false, 2) 
});

document.getElementById("positionYInput").addEventListener("input", (e) => {
    if (selectedElementIndex !== null) {
        elementsArray[selectedElementIndex].y = parseInt(e.target.value);
    }

    drawElements()
    typedInInputField = true
    setTimeout(() => typedInInputField = false, 2) 
});