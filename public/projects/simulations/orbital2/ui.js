
function toggleBox(boxId, buttonId) {
    let box = document.getElementById(boxId);
    let button = document.getElementById(buttonId);

    if (box.classList.contains("collapsed")) {
        box.classList.remove("collapsed");
        button.innerText = "▼ Hide";
    } else {
        box.classList.add("collapsed");
        button.innerText = "► Show";
    }
}



function createEditor() {
    let editor = document.getElementById("planetEditor");
    editor.innerHTML = ""; // Clear previous UI

    planets.forEach((planet, i) => {
        let div = document.createElement("div");
        div.className = "planetEntry";

        // Color Picker UI
        let colorBox = `<span class="colorBox" style="background:${planet.color}" onclick="openColorPicker(${i})"></span>`;
        let colorInput = `<input type="color" id="color${i}" value="${planet.color}" style="display:none;" onchange="changeColor(${i})">`;

        // Planet Controls
        div.innerHTML = `
            ${colorBox} ${colorInput} <strong>Planet ${i + 1}</strong><br>
            X: <input type="number" id="x${i}" value="${planet.x}" oninput="applyChanges()">
            Y: <input type="number" id="y${i}" value="${planet.y}" oninput="applyChanges()"><br>
            Vx: <input type="number" id="vx${i}" value="${planet.velocity.x}" oninput="applyChanges()">
            Vy: <input type="number" id="vy${i}" value="${planet.velocity.y}" oninput="applyChanges()"><br>
            Mass: <input type="number" id="mass${i}" value="${planet.mass}" oninput="applyChanges()"><br>
            Radius: <input type="number" id="radius${i}" value="${planet.width}" oninput="applyChanges()"><br>
            ${planets.length > 2 ? `<button onclick="removePlanet(${i})" style="background:red;">Remove</button>` : ""}
        `;

        editor.appendChild(div);
    });

    // Add "Add Planet" Button if there are fewer than 3 planets
    if (planets.length < 3) {
        editor.innerHTML += `<button onclick="addPlanet()" style="background:blue;">Add Planet</button>`;
    }

    // Reset Camera Button
    editor.innerHTML += `<button id="resetCam" onclick="resetCam()">Reset Camera</button>`;
    editor.innerHTML += `<button id="resetPlanet" onclick="applyChanges()" style="background:purple">Reset Planets</button>`;
}

// Function to remove a planet
function removePlanet(index) {
    if (planets.length > 2) {
        planets.splice(index, 1);
        createEditor();
    }
}


// Function to add a new planet (Max 3 planets)
function addPlanet() {
    if (planets.length < 3) {
        applyChanges();
        planets.push({
            x: 0, y: 0,
            velocity: { x: 0, y: 0 },
            mass: 10_000,
            color: "#ffffff",
            width:20,
        });
       
        createEditor();
    }
}

// Function to open the hidden color input
function openColorPicker(planetIndex) {
    document.getElementById(`color${planetIndex}`).click();
}

// Function to change the color of a planet
function changeColor(planetIndex) {
    let newColor = document.getElementById(`color${planetIndex}`).value;
    planets[planetIndex].color = newColor;
    createEditor();
}

// Apply changes to planets
function applyChanges() {
    planets.forEach((planet, i) => {
        planet.x = parseFloat(document.getElementById(`x${i}`).value);
        planet.y = parseFloat(document.getElementById(`y${i}`).value);
        planet.velocity.x = parseFloat(document.getElementById(`vx${i}`).value);
        planet.velocity.y = parseFloat(document.getElementById(`vy${i}`).value);
        planet.mass = parseFloat(document.getElementById(`mass${i}`).value);
        planet.width = parseFloat(document.getElementById(`radius${i}`).value);
    });

    _renderAhead = document.getElementById('renderFuture').value;
    followPlanetIndex = document.getElementById('perspective').value;
    _renderAheadLineWidth = document.getElementById('renderFutureLine').value;
}

// Function to reset the camera
function resetCam() {
    camera.x = 0;
    camera.y = 0;
}

// Initialize UI
createEditor();
