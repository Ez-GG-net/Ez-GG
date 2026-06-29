// Undo and redo stacks
let undoStack = [];
let redoStack = [];

// Save the current state of elementsArray to the undo stack
function saveState() {
    // Clone the elementsArray to avoid reference issues
    undoStack.push(JSON.parse(JSON.stringify(elementsArray)));
    // Clear the redo stack on new action
    redoStack = [];

    if (undoStack.length <= 1) {
        $("#undoButton .icon").style.filter = "invert(0)"
    } else {
        $("#undoButton .icon").style.filter = "invert(1)"
    }
    if (redoStack.length <= 0) {
        $("#redoButton .icon").style.filter = "invert(0)"
    
    } else {
        $("#redoButton .icon").style.filter = "invert(1)"
    }
}

// Undo the last action
function undo() {
    if (undoStack.length > 0) {
        selectedElementIndex = null
        // Push the current state to the redo stack
        redoStack.push(JSON.parse(JSON.stringify(elementsArray)));
        // Restore the last state from the undo stack
        elementsArray = undoStack[undoStack.length - 2];
        undoStack.pop()
        undoStack.pop()
        drawElements();
      //  drawResizeBorderAndHandles(elementsArray[selectedElementIndex])
    }
    if (redoStack.length <= 0) {
        $("#redoButton .icon").style.filter = "invert(0)"
    
    } else {
        $("#redoButton .icon").style.filter = "invert(1)"
    }
}

// Redo the last undone action
function redo() {
    if (redoStack.length > 0) {
        selectedElementIndex = null
        // Push the current state to the undo stack
        undoStack.push(JSON.parse(JSON.stringify(elementsArray)));
        // Restore the last state from the redo stack
        elementsArray = redoStack.pop();
        drawElements();
        //drawResizeBorderAndHandles(elementsArray[selectedElementIndex])
    }
    if (redoStack.length <= 0) {
        $("#redoButton .icon").style.filter = "invert(0)"
    
    } else {
        $("#redoButton .icon").style.filter = "invert(1)"
    }
}

// Keyboard event listener for Ctrl+Z (Undo) and Ctrl+Y (Redo)
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") {
    
        e.preventDefault();
      

        undo();
       
        
      
    }
    if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
    }
});
$("#undoButton").addEventListener("click", undo);
$("#redoButton").addEventListener("click", redo);

// Example integration with existing mouse events
c.addEventListener("mouseup", () => {
    saveState(); // Save state after a drag or resize operation
});

// Save initial state
saveState();
