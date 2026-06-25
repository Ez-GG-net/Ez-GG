document.addEventListener("DOMContentLoaded", async () => {
    const selectFolderBtn = document.getElementById("selectFolder");
    const startScreen = document.getElementById("startScreen");
    const runScreen = document.getElementById("runScreen");
    const iframe = document.getElementById("runner");
    const refreshBtn = document.getElementById("refresh");
    const backBtn = document.getElementById("backBtn");
    const closeBtn = document.getElementById("closeBtn");
    const addressBar = document.getElementById("addressBar");

    let fileHandles = {}; // Store file handles for dynamic reloading
    let dirHandles = {} 
    let blobURLs = {}; // Store generated Blob URLs
    let folderName = "Unknown Folder";

    selectFolderBtn.addEventListener("click", async () => {
        try {
            // Ask user to pick a folder
            const dirHandle = await window.showDirectoryPicker();
            dirHandles = dirHandle
            handleFiles(dirHandle)
            // Read and display index.html
            loadFiles();
        } catch (err) {
            console.error("Error selecting folder:", err);
        }
    });

    async function handleFiles(dirHandle){
        folderName = dirHandle.name;
        let indexFile = null;
        let fileMap = {};

        for await (const entry of dirHandle.values()) {
            if (entry.kind === "file") {
                fileMap[entry.name] = entry;
                if (entry.name.toLowerCase() === "index.html") {
                    indexFile = entry;
                }
            }
        }

        if (!indexFile) {
            alert("No index.html found in the selected folder.");
            return;
        }

        fileHandles = fileMap;

    }

    async function loadFiles() {
        if (!fileHandles["index.html"]) return;

        // Load the index.html file
        const indexFile = await fileHandles["index.html"].getFile();
        let indexText = await indexFile.text();

        //Inject a key listener for parent
        const keyListenerScript = `
        <script>
           window.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'r'
    || (event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'i') {
        event.preventDefault(); // Prevent default action
        parent.postMessage({ key: event.key, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, metaKey: event.metaKey }, "*");
        console.log("Key event sent from iframe");
    }
});

        </script>
    `;

    // Inject script before </body>
    indexText = indexText.replace("</body>", keyListenerScript + "</body>");

        // Generate Blob URLs for all files
        blobURLs = {};
        for (const [fileName, fileHandle] of Object.entries(fileHandles)) {
            const file = await fileHandle.getFile();
            blobURLs[fileName] = URL.createObjectURL(file);
        }

      ////  console.log(blobURLs)
        // Replace src/href links with Blob URLs
        indexText = indexText
            .replace(/(src|href)="([^"]+)"/g, (match, attr, path) => {
                const fileName = path.split("/").pop();
                if (blobURLs[fileName]) {
                    return `${attr}="${blobURLs[fileName]}"`;
                }
                return match;
            });

        // Load the modified HTML into the iframe
        const blob = new Blob([indexText], { type: "text/html" });
        iframe.src = URL.createObjectURL(blob);

        // Update address bar
        addressBar.value = `D:/${folderName}/`;

        // Switch to run screen
        startScreen.style.display = "none";
        runScreen.style.display = "flex";
    }

    // Refresh button reloads everything
    refreshBtn.addEventListener("click", loadFiles);
    //Overide refresh keybind
    window.addEventListener("message", function(event) {
        if (!event.data || !event.data.key) return;
    
     ////   console.log("Key Pressed in Iframe:", event.data.key);
      ////  console.log(event.data.ctrlKey, event.data.shiftKey, event.data.metaKey);
    
        if ((event.data.ctrlKey || event.data.metaKey) && event.data.key === "r") {
         ////   console.log("Custom refresh triggered!");
            handleFiles(dirHandles)
            loadFiles(); // Reload iframe content
        }
    
        if ((event.data.ctrlKey || event.data.metaKey) && event.data.shiftKey && event.data.key === "i") {
            ////console.log("Custom inspect triggered!");
           document.getElementById("devtools").click()
        }
    });
    
    
    

    // Close button returns to start screen
    closeBtn.addEventListener("click", () => {
        runScreen.style.display = "none";
        startScreen.style.display = "flex";
    });

    // Back button (simply goes back to start screen)
    backBtn.addEventListener("click", () => {
        runScreen.style.display = "none";
        startScreen.style.display = "flex";
    });
});
