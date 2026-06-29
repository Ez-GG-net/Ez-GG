// Select relevant buttons
const copyButton = document.getElementById('copyButton');
const pasteButton = document.getElementById('pasteButton');

const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');

// Function to toggle button visibility
function updateButtonVisibility(selectedElementIndex) {
    // Undo and Redo are always visible
    undoButton.style.display = 'inline-block';
    redoButton.style.display = 'inline-block';

    // Show or hide other buttons based on selectedElementIndex
    const visibility = selectedElementIndex !== null ? 'inline-block' : 'none';
    copyButton.style.display = visibility;
    pasteButton.style.display = visibility;
   
}





// Initial setup
updateButtonVisibility(selectedElementIndex);
