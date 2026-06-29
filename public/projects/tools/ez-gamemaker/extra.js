// Select relevant elements
const toggleGridSnapButton = document.getElementById('toggleGridSnap');
const gridSizeInput = document.getElementById('gridSizeInput');



// Toggle grid snapping on button click
toggleGridSnapButton.addEventListener('click', () => {
    
    isGridSnapEnabled = !isGridSnapEnabled;
    toggleGridSnapButton.textContent = isGridSnapEnabled ? 'Disable Grid Snapping' : 'Enable Grid Snapping';
    toggleGridSnapButton.style.backgroundColor = isGridSnapEnabled ? 'red' : '#4caf50';

   drawElements();
});

// Update grid size from input
gridSizeInput.addEventListener('input', () => {
    if (gridSizeInput.value < 5) gridSizeInput.value = 5;
    gridSize = parseInt(gridSizeInput.value) || 5; // Default to 10 if input is invalid
   

    drawElements()
    typedInInputField = true
    setTimeout(() => typedInInputField = false, 2) 
});

// Function to apply snapping to a position (x, y)
function applyGridSnap(x, y) {
    if (isGridSnapEnabled) {
        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;
    }
    return { x, y };
}
function applyScaleGridSnap(w,h){
    if (isGridSnapEnabled) {
        w = Math.round(w / gridSize) * gridSize;
        h = Math.round(h / gridSize) * gridSize;
    }
    return {w, h}
}