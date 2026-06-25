
document.getElementById("importButton").addEventListener("click", () => {
   
    const options = document.createElement("div");
    options.id = "importOptions";
    options.innerHTML = `
        <button id="importClipboard">Import from Clipboard</button>
        <button id="importFile">Import from File</button>
        <button id="importAutoSave">Import From Auto-Save</button>
      
    `;
    document.body.appendChild(options);

    // Import from Clipboard
    document.getElementById("importClipboard").addEventListener("click", async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                importData(JSON.parse(text));
            } else {
                alert("Clipboard is empty.");
            }
        } catch (error) {
            console.error("Clipboard import failed", error);
            alert("Failed to import from Clipboard.");
        }
        options.remove();
    });
    
    // Import from Auto-Save
    document.getElementById("importAutoSave").addEventListener("click", async () => {
      const save = JSON.parse(localStorage.getItem("gamemake-helper-autosave"))
      if (save) {
        importData((save));
      } else {
        alert("Auto-save data is not available.");
      }
        options.remove();
    });
    document.getElementById("importSave").addEventListener("click", async () => {
        const save = JSON.parse(localStorage.getItem("gamemake-helper-save"))
        if (save) {
          importData((save));
        } else {
          alert("Save data is not available.");
        }
          options.remove();
      });
      console.log($("saveButton"))
        $("#saveButton").addEventListener("click", function(){
            console.log((Math.random()*1000)+200)
            localStorage.setItem('gamemake-helper-save', JSON.stringify(elementsArray))
            $("#saveButton").innerHTML = 'Saving...'
            setTimeout(()=>{
             $("#saveButton").innerHTML = 'Save'
            },(Math.random()*1000)+200)
      
        })
      
    
    // Close the options menu
    document.addEventListener("click", (event) => {
        if (event.target.id === "importOptions") {
            options.remove();
        }
    });

    // Import from File
    document.getElementById("importFile").addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    importData(JSON.parse(content));
                };
                reader.readAsText(file);
            }
        };
        input.click();
        options.remove();
    });
});

// Import data handler function
function importData(data) {
    // Handle the imported data (e.g., add elements to the list)
    elementsArray = data
    // Update the element list and other necessary UI elements
    drawElements()
    updateElementList();
    console.log("Imported Data:", data);
    alert("Import completed.");
}
