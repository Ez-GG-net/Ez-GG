// Add this to a new file called rename.js

// Get references to DOM elements
const elementList = document.getElementById('elementListItems');

// Function to enable editing for the selected element
function startEditing() {
    if (selectedElementIndex === null) return;
    
    const selectedElement = elementList.children[selectedElementIndex];
    if (!selectedElement) return;

    const currentName = selectedElement.textContent;
    
    // Create edit container
    const editContainer = document.createElement('div');
    editContainer.style.display = 'flex';
    editContainer.style.gap = '5px';
    editContainer.style.width = '100%';
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.style.flex = '1';
    input.style.padding = '4px 8px';
    input.style.backgroundColor = '#141414';
    input.style.border = '1px solid #333';
    input.style.borderRadius = '4px';
    input.style.color = '#ffffff';
    
    // Create save button
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '✓';
    saveButton.style.padding = '4px 8px';
    saveButton.style.backgroundColor = '#4caf50';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.color = '#ffffff';
    saveButton.style.cursor = 'pointer';
    
    // Create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = '×';
    cancelButton.style.padding = '4px 8px';
    cancelButton.style.backgroundColor = '#ff4444';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.color = '#ffffff';
    cancelButton.style.cursor = 'pointer';
    
    function saveEdit() {
        const newName = input.value.trim();
        if (newName) {
            selectedElement.textContent = newName;
            // HERE IS WHERE YOU UPDATE YOUR ARRAY
            elementsArray[selectedElementIndex].name = newName;
        }
        selectedElement.classList.remove('editing');
    }

    function cancelEdit() {
        selectedElement.textContent = currentName;
        selectedElement.classList.remove('editing');
    }
    
    // Add event listeners
    saveButton.addEventListener('click', saveEdit);
    cancelButton.addEventListener('click', cancelEdit);
    
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    });
    input.addEventListener('input', (e) => {
        typedInInputField = true
        setTimeout(() => typedInInputField = false, 2) 
    })
    
    // Clear and add new content
    selectedElement.textContent = '';
    selectedElement.appendChild(editContainer);
    editContainer.appendChild(input);
    editContainer.appendChild(saveButton);
    editContainer.appendChild(cancelButton);
    selectedElement.classList.add('editing');
    
    // Focus the input
    input.focus();
}

// Add double-click support for renaming
elementList.addEventListener('dblclick', (e) => {
    const clickedElement = e.target.closest('li');
    if (clickedElement && !clickedElement.classList.contains('editing')) {
        startEditing();
    }
});

// Add click outside to cancel editing
document.addEventListener('click', (e) => {
    const editingElement = elementList.querySelector('.editing');
    if (editingElement && !e.target.closest('.editing')) {
        editingElement.textContent = editingElement.textContent;
        editingElement.classList.remove('editing');
    }
});