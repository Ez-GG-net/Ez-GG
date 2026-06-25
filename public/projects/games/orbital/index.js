let keydown = {
    left:false,
    right:false,
    up:false,
    down:false,
    q:false,
    e:false,
    space:false
}
let cameraPos = {
    x: 0,
    y: 0,
    zoom:1,
}

setTimeout(() => {


    const c = document.querySelector('.maincanvas')
    const ctx = c.getContext('2d')
    
    let sizePlanet = document.querySelector('.planetSize').value
    let objectSize = document.querySelector('.objectSize').value
    let friction = 0
    let Realmode = 'realistic'
    let shouldcollidewithwall = true;

   

    //*----------------------------------Modules--------------------------------
    function mapValue(value, min1, max1, min2, max2) {
     return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    
// Function to generate a gradient color based on x and y coordinates
function getGradientColor(x, y, color1, color2) {
    // Map x and y to a 0-1 range
    let ratioX = mapValue(x, 0, window.innerWidth, 0, 1);
    let ratioY = mapValue(y, 0, window.innerHeight, 0, 1);
    
    // Interpolate between color1 and color2 based on ratioX and ratioY
    let r = Math.round(color1[0] + ratioX * (color2[0] - color1[0]));
    let g = Math.round(color1[1] + ratioY * (color2[1] - color1[1]));
    let b = Math.round(color1[2] + ratioX * (color2[2] - color1[2]));

    return `rgb(${r}, ${g}, ${b})`;
}
    
    
    
    function moveOnceTowardPlanet(target, movingObject, speed, i) {
     let dx = (target.x + sizePlanet / 2) - movingObject.x;
     let dy = (target.y + sizePlanet / 2) - movingObject.y;
     let distance = Math.sqrt(dx * dx + dy * dy);
    
     if (distance < speed) {
     movingObject.x = target.x + sizePlanet / 2;
     movingObject.y = target.y + sizePlanet / 2;
     } else {
     let directionX = dx / distance;
     let directionY = dy / distance;
    
     if (target.anti) {
     movingObject.velocity.x -= directionX * speed * 0.9;
     movingObject.velocity.y -= directionY * speed * 0.9;
     } else {
     movingObject.velocity.x += directionX * speed * 0.9;
     movingObject.velocity.y += directionY * speed * 0.9;
     }
     }
    }
    
    function moveOnceTowardObject(target, movingObject, speed, i) {
     let dx = (target.x) - movingObject.x;
     let dy = (target.y) - movingObject.y;
     let distance = Math.sqrt(dx * dx + dy * dy);
    
     if (distance < speed) {
     movingObject.x = target.x;
     movingObject.y = target.y;
     } else {
     let directionX = dx / distance;
     let directionY = dy / distance;
    
     if (target.anti) {
     movingObject.velocity.x -= directionX * speed * 0.5;
     movingObject.velocity.y -= directionY * speed * 0.5;
     } else {
     movingObject.velocity.x += directionX * speed * 0.5;
     movingObject.velocity.y += directionY * speed * 0.5;
     }
     }
    }
    
    function getCenter(obj) {
     return {
     x: obj.x + obj.width / 2,
     y: obj.y + obj.height / 2
     };
    }
    
    // Function to calculate the distance between two points (centers of objects)
    function getDistance(obj1, obj2) {
     let center1 = getCenter(obj1);
     let center2 = getCenter(obj2);
    
     let dx = center2.x - center1.x;
     let dy = center2.y - center1.y;
    
     return Math.sqrt(dx * dx + dy * dy);
    }
    const oldGetDistance = (target, object) => {
    
     return Math.abs(
     Math.sqrt(
     Math.pow(
    
     (target.x + sizePlanet / 2) - object.x
    
     , 2) +
     Math.pow(
    
     (target.y + sizePlanet / 2) - object.x
    
     , 2)
     )
     )
    
    }
    const optimisedGetDistance = (target, object) => {
    
     return Math.sqrt(
     Math.pow(
    
     (target.x + sizePlanet / 2) - (object.x + objectSize / 2)
    
     , 2) +
     Math.pow(
    
     (target.y + sizePlanet / 2) - (object.y + objectSize / 2)
    
     , 2)
     )
    
    
    }
    
    const wallCollision = (obj) => {
     if (!shouldcollidewithwall) return
     if (obj.x <= 0) {
     obj.x = 0
     obj.velocity.x *= -1 // 1000;
     }
     if (obj.x >= c.width - objectSize) {
     obj.x = c.width - obj.width
     obj.velocity.x *= -1 // 1000;
     }
     if (obj.y <= 0) {
     obj.y = 0
     obj.velocity.y *= -1 // 1000;
     }
     if (obj.y >= c.height - objectSize) {
     obj.y = c.height - obj.height;
     obj.velocity.y *= -1 // 1000;
     }
    
    }
    
    function detectCollision(point1, point2) {
     return (
     point1.x < point2.x + point2.width &&
     point1.x + point1.width > point2.x &&
     point1.y < point2.y + point2.height &&
     point1.y + point1.height > point2.y
     );
    }
    
    function isClickOnObject(mouseX, mouseY, objects) {
     for (let i = 0; i < objects.length; i++) {
     let obj = objects[i];
     // Check if mouseX and mouseY are within the bounds of the object
     if (mouseX > obj.x && mouseX < obj.x + obj.width &&
     mouseY > obj.y && mouseY < obj.y + obj.height) {
     return i; // Return the index of the object that was clicked
     }
     }
     return -1; // Return -1 if no object was clicked
    }
    
    function applyForceField(objects, target, forceStrength, radius) {
     for (let i = 0; i < objects.length; i++) {
     let obj = objects[i];
    
     // Use your existing getDistance() function to calculate the distance
     let distance = getDistance(obj, target);
    
     // Check if the object is within the force field radius
     if (distance < radius && distance > 0) {
     // Calculate the difference in position
     let dx = obj.x - target.x;
     let dy = obj.y - target.y;
    
     // Normalize the distance vector
     let normalX = dx / distance;
     let normalY = dy / distance;
    
     // Calculate the perpendicular vector to make the object steer around
     let perpX = -normalY;
     let perpY = normalX;
    
     // Apply the steering force to the object's velocity
     obj.velocity.x += perpX * forceStrength;
     obj.velocity.y += perpY * forceStrength;
     }
     }
    }
    
    function CapVelocity(minSpeed, maxSpeed, obj) {
     // Cap velocity.x
     if (Math.abs(obj.velocity.x) > maxSpeed) {
     obj.velocity.x = obj.velocity.x > 0 ? maxSpeed : -maxSpeed;
     } else if (Math.abs(obj.velocity.x) < minSpeed) {
     obj.velocity.x = obj.velocity.x > 0 ? minSpeed : -minSpeed;
     }
    
     // Cap velocity.y
     if (Math.abs(obj.velocity.y) > maxSpeed) {
     obj.velocity.y = obj.velocity.y > 0 ? maxSpeed : -maxSpeed;
     } else if (Math.abs(obj.velocity.y) < minSpeed) {
     obj.velocity.y = obj.velocity.y > 0 ? minSpeed : -minSpeed;
     }
    }
    9
    
    
    function getRGBColor(ev) {
     const color = ev
     const r = parseInt(color.substr(1,2), 16)
     const g = parseInt(color.substr(3,2), 16)
     const b = parseInt(color.substr(5,2), 16)
     return [r,g,b]
    }
    //*--------------------------------End of Modules--------------------------------
    
    const updateWindowSize = () => {
     ctx.canvas.width = document.body.offsetWidth;
     ctx.canvas.height = document.body.offsetHeight;
    
    };
    let planets = [
    
    ]
    const objects = [
    
    ]
    let totalSpeed = 0;
    let avgSpeed = 0;
    const calculateObjectPosition = () => {
     objects.forEach((object, i) => {
     if (object.delayPhysics > 0) {
     object.delayPhysics--;
     } else {
    
    
    
    
     planets.forEach(planet => {
     // Move object towards the planet
     moveOnceTowardPlanet(planet, object, Math.abs((planet.width / 100000) *
     (Realmode == 'beta' ?
     Math.pow(50000 / Math.pow(getDistance(planet, object), 1), 0.7) :
     Realmode == 'default' ?
     oldGetDistance(planets[0], object) :
     Realmode == 'optimised' ?
     optimisedGetDistance(planet, object) :
     150)), i);
    
     //caps velocity
     CapVelocity(
     0,
     document.querySelector('.maxSpeed').value < 0 ? Infinity : document.querySelector('.maxSpeed').value,
     object)
     });
    
    
     //! NOT A GOOD IMPLENMENTATION
     /*
     objects.forEach((otherObject, j) => {
     
     // Move object towards each other object
     if (getDistance(otherObject,object) > 20) return
     moveOnceTowardObject(otherObject, object, Math.abs((otherObject.width / 100000) *
     (Realmode === 'realistic' ?
     100000 / Math.pow(getDistance(otherObject, object), 1.1) :
     oldGetDistance(planets[0], object))), i);
     
     });
     */
    
     // Apply friction to prevent endless acceleration
     object.velocity.x *= (1 - friction);
     object.velocity.y *= (1 - friction);
    
     // Update the object's position
     object.x += object.velocity.x;
     object.y += object.velocity.y;
    
     // Handle wall collisions
     wallCollision(object);
    
     // Calculate and accumulate the speed for average speed display
     let speed = Math.sqrt(object.velocity.x ** 2 + object.velocity.y ** 2);
     totalSpeed += speed;
     }
     });
     avgSpeed = totalSpeed / objects.length
     document.querySelector('.avgSpeed').textContent = `${(totalSpeed / objects.length).toFixed(2)} bil. m/s`;
     totalSpeed = 0;
    };
    let showplanets = true;
    const renderplanets = () => {
    
     if (showplanets) {
     for (let i = 0; i < planets.length; i++) {
     ctx.fillStyle = planets[i].anti ? document.querySelector('.antiPlanetColor').value : document.querySelector('.planetColor').value;
     ctx.fillRect(planets[i].x-cameraPos.x, planets[i].y-cameraPos.y,
     sizePlanet, sizePlanet);
     }
     }
    }
    
    function getGradientColorSpeed(speed, maxSpeed, color1, color2, color3) {
        // Normalize speed to a 0-1 range
        let ratio = speed / maxSpeed;
    
        let r, g, b;
    
        if (ratio <= 0.33) {
            // From color1 (blue-like) to color2 (green-like)
            ratio = ratio / 0.33;
            r = Math.floor(color1[0] + ratio * (color2[0] - color1[0]));
            g = Math.floor(color1[1] + ratio * (color2[1] - color1[1]));
            b = Math.floor(color1[2] + ratio * (color2[2] - color1[2]));
        } else if (ratio <= 0.66) {
            // From color2 (green-like) to color3 (yellow-like)
            ratio = (ratio - 0.33) / 0.33;
            r = Math.floor(color2[0] + ratio * (color3[0] - color2[0]));
            g = Math.floor(color2[1] + ratio * (color3[1] - color2[1]));
            b = Math.floor(color2[2] + ratio * (color3[2] - color2[2]));
        } else {
            // From color3 (yellow-like) to red
            ratio = (ratio - 0.66) / 0.34;
            r = Math.floor(color3[0] + ratio * (color3[0])); // Red channel goes to 255
            g = Math.floor(color3[1] - ratio * color3[1]); // Green channel decreases to 0
            b = Math.floor(color3[2] - ratio * color3[2]); // Blue channel stays 0
        }
    
        return `rgb(${r}, ${g}, ${b})`;
    }
    //converts a number (numb) to a color with 2 other parameters (color1, color2) and returns the number gradient in between
    function getGradientColorNumb(i, total, startColor, endColor) {
    
     // Calculate the ratio
     const ratio = i / total;
    
     // Interpolate the colors
     const r = Math.round(startColor[0] + ratio * (endColor[0] - startColor[0]));
     const g = Math.round(startColor[1] + ratio * (endColor[1] - startColor[1]));
     const b = Math.round(startColor[2] + ratio * (endColor[2] - startColor[2]));
    
     return `rgb(${r*1}, ${g*1}, ${b*1})`;
    }
    
    function getGradientColorNumb3(numb1, numb2) {
     // Calculate the ratio using numb1 and numb2, normalize to 0-1 range
     let ratio = numb1 / (numb1 + numb2);
    
     let r, g, b;
    
     if (ratio <= 0.33) {
     // From blue to green
     ratio = ratio / 0.33;
     r = 0; // Red channel remains 0
     g = Math.floor(ratio * 255); // Green channel goes from 0 to 255
     b = Math.floor(255 - ratio * 255); // Blue channel goes from 255 to 0
     } else if (ratio <= 0.66) {
     // From green to yellow
     ratio = (ratio - 0.33) / 0.33;
     r = Math.floor(ratio * 255); // Red channel goes from 0 to 255
     g = 255; // Green stays at 255
     b = 0; // Blue stays at 0
     } else {
     // From yellow to red
     ratio = (ratio - 0.66) / 0.34;
     r = 255; // Red stays at 255
     g = Math.floor(255 - ratio * 255); // Green channel goes from 255 to 0
     b = 0; // Blue stays at 0
     }
    
     return `rgb(${r}, ${g}, ${b})`;
    }
    
    
    
    const renderObjects = () => {
     for (let i = 0; i < objects.length; i++) {
        
    
     if (document.querySelector('.objectShowSpeed').value == 'default') {
     ctx.fillStyle = getGradientColor(objects[i].x, objects[i].y,getRGBColor(document.querySelector('.defaultModeColor1').value),getRGBColor(document.querySelector('.defaultModeColor2').value));
     } else if (document.querySelector('.objectShowSpeed').value == 'speed') {
     ctx.fillStyle = getGradientColorSpeed(
     Math.sqrt(objects[i].velocity.x ** 2 + objects[i].velocity.y ** 2), avgSpeed * 3, getRGBColor(document.querySelector('.speedModeColor3').value), getRGBColor(document.querySelector('.speedModeColor2').value), getRGBColor(document.querySelector('.speedModeColor1').value));
     } else if (document.querySelector('.objectShowSpeed').value == 'life') {

     ctx.fillStyle = getGradientColorNumb(i, objects.length, getRGBColor(document.querySelector('.livedModeColor1').value),getRGBColor(document.querySelector('.livedModeColor2').value))//7, 255, 0]);
    
    
     }
     ctx.fillRect(objects[i].x-cameraPos.x, objects[i].y-cameraPos.y,
     objectSize, objectSize);

     const getCenter = (obj)=>{
         return {x:obj.x + obj.width / 2,
            y:obj.y + obj.height / 2
         }
         

     }
     if (document.querySelector('.drawLineV').checked) {
         ctx.strokeStyle = "rgb(255, 255, 255)";
         ctx.beginPath();
         ctx.moveTo(getCenter(objects[i]).x, getCenter(objects[i]).y);
         ctx.lineTo(getCenter(objects[i]).x + objects[i].velocity.x * 15, getCenter(objects[i]).y + objects[i].velocity.y * 15);
         ctx.stroke();
     }
     if (document.querySelector('.drawLineP').checked) {
        //draw lines to all planets but the closer one is displayed with more transparency
        for (let j = 0; j < planets.length; j++) {
            const distance = Math.sqrt((getCenter(objects[i]).x - getCenter(planets[j]).x) ** 2 + (getCenter(objects[i]).y - getCenter(planets[j]).y) ** 2)
          
            if (distance <= 300) {
                ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / 300})`;
                ctx.beginPath();
                ctx.moveTo(getCenter(objects[i]).x, getCenter(objects[i]).y);
                ctx.lineTo(getCenter(planets[j]).x, getCenter(planets[j]).y);
                ctx.stroke();
            }
        }
     }
     }
    }
    window.onresize = updateWindowSize
    updateWindowSize()


    let startPos ={
        x:(c.width / 1.5) - (20 / 2),
        y:(c.height / 1.7) - (20 / 2)
    }

    const render = () => {
   
        var newWidth = ctx.canvas.width * cameraPos.zoom;
    var newHeight = ctx.canvas.height * cameraPos.zoom;

    const newClearWidth = ctx.canvas.width /cameraPos.zoom
    const newClearHeight = ctx.canvas.height / cameraPos.zoom
    
    ctx.save();
    ctx.translate(-((newWidth-ctx.canvas.width)/2), -((newHeight-ctx.canvas.height)/2));
ctx.scale(cameraPos.zoom,cameraPos.zoom)
    
     if (!document.querySelector('.recordPos').checked) {
    
        ctx.fillStyle = "rgb(7, 0, 31)";
        if (cameraPos.zoom < 1) {
     ctx.clearRect(0-newClearWidth, 0-newClearHeight, newClearWidth*2, newClearHeight*2);
     ctx.fillRect(0-newClearWidth, 0-newClearHeight, newClearWidth*2, newClearHeight*2)
        }
        else {
            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
            ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
        }
 
    
    
    
     const gridSize = 20
     //draw grid lines
     for (let i = -cameraPos.x%gridSize-newClearWidth; i < c.width-cameraPos.x%gridSize+newClearWidth*2; i += gridSize) {
     ctx.strokeStyle = 'rgb(255,255,255,0.1)';
     ctx.beginPath();
     ctx.moveTo(i, 0-cameraPos.y%gridSize-newClearHeight);
     ctx.lineTo(i, c.height-cameraPos.y%gridSize+newClearHeight*2);
     ctx.stroke();
     }
     for (let i = -cameraPos.y%gridSize-newClearHeight; i < c.height-cameraPos.y%gridSize+newClearHeight*2; i += gridSize) {
     ctx.strokeStyle = 'rgb(255,255,255,0.1)';
     ctx.beginPath();
     ctx.moveTo(0-cameraPos.x%gridSize-newClearWidth, i);
     ctx.lineTo(c.width-cameraPos.x%gridSize+newClearHeight*2, i);
     ctx.stroke();
     }
     //draw center lines
     ctx.strokeStyle = 'rgba(255,255,255,0.2)';
     ctx.beginPath();
     ctx.moveTo(c.width / 2-cameraPos.x, 0-cameraPos.y-newClearHeight);
     ctx.lineTo(c.width / 2-cameraPos.x, c.height-cameraPos.y+newClearHeight*2);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0-newClearWidth-cameraPos.x, c.height / 2-cameraPos.y);
     ctx.lineTo(c.width+newClearWidth*2-cameraPos.x, c.height / 2-cameraPos.y);
     ctx.stroke();
    

     //draw wall's
     ctx.strokeStyle = 'rgba(255,255,255,0.1)'
     ctx.beginPath();
     ctx.moveTo(0-cameraPos.x, 0-cameraPos.y);
     ctx.lineTo(c.width-cameraPos.x, 0-cameraPos.y);
     ctx.lineTo(c.width-cameraPos.x, c.height-cameraPos.y);
     ctx.lineTo(0-cameraPos.x, c.height-cameraPos.y);
     ctx.closePath();
     ctx.stroke();

    
     } else {
     // ctx.clearRect(0,0,20,20)
     };
     if (document.querySelector('.showStart').checked) {
     ctx.fillStyle = 'red';
     ctx.fillRect(
     startPos.x-cameraPos.x,
     startPos.y-cameraPos.y,
     objectSize,
     objectSize)
    
    
    
     }
    
    
    
    
     renderObjects()
     renderplanets()
     ctx.restore()
    }
    const generateExportFile = function() {
     // Helper function to convert a binary string to an ArrayBuffer
     function stringToArrayBuffer(str) {
     const arr = new Uint8Array(str.length / 8);
     for (let i = 0; i < str.length; i += 8) {
     arr[i / 8] = parseInt(str.slice(i, i + 8), 2);
     }
     return arr;
     }
    
     // Convert the planets array to a JSON string and then to a binary string
     const jsonData = JSON.stringify([planets,
     //options
     [
     document.querySelector('.spawnAmount').value,
     document.querySelector('.spawnDelay').value,
     document.querySelector('.friction').value,
     document.querySelector('.timelapse').value,
     document.querySelector('.wallCollision').checked,
     document.querySelector('.useNew').value,
     document.querySelector('.showStart').checked,
     document.querySelector('.recordPos').checked
     ]
     ]);
     const binaryString = [...jsonData].map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    
     // Convert the binary string to an ArrayBuffer
     const buffer = stringToArrayBuffer(binaryString);
    
     // Create a blob to export
     const filename = 'OrbitalSaveFile.orbsf';
     const blob = new Blob([buffer], {
     type: 'application/octet-stream'
     });
    
     // Trigger the file download
     if (window.navigator.msSaveOrOpenBlob) {
     window.navigator.msSaveBlob(blob, filename);
     } else {
     const elem = window.document.createElement('a');
     elem.href = window.URL.createObjectURL(blob);
     elem.download = filename;
     document.body.appendChild(elem);
     elem.click();
     document.body.removeChild(elem);
     }
    };
    
    const importSaveFile = function(event) {
     // Helper function to convert an ArrayBuffer back to a string
     function arrayBufferToString(buffer) {
     const uint8Array = new Uint8Array(buffer);
     let binaryString = '';
     for (let i = 0; i < uint8Array.length; i++) {
     binaryString += uint8Array[i].toString(2).padStart(8, '0');
     }
     return binaryString;
     }
    
     // Read the file content as binary
     let reader = new FileReader();
     reader.onload = function(e) {
     const buffer = e.target.result;
    
     // Convert the binary data back to a string and parse as JSON
     const binaryString = arrayBufferToString(buffer);
     let jsonString = '';
     for (let i = 0; i < binaryString.length; i += 8) {
     jsonString += String.fromCharCode(parseInt(binaryString.slice(i, i + 8), 2));
     }
    
     // Assign the parsed data to planets
     planets = JSON.parse(jsonString)[0];
     const settingsArray = JSON.parse(jsonString)[1];
     for (let i = 0; i < settingsArray.length; i++) {
     switch (i) {
     case 0:
     document.querySelector('.spawnAmount').value = settingsArray[i];
     break;
     case 1:
     document.querySelector('.spawnDelay').value = settingsArray[i];
     break;
     case 2:
     document.querySelector('.friction').value = settingsArray[i];
    
     break;
     case 3:
     document.querySelector('.timelapse').value = settingsArray[i];
    
     break;
     case 4:
     document.querySelector('.wallCollision').checked = settingsArray[i];
     break;
     case 5:
     document.querySelector('.useNew').value = settingsArray[i];
     break;
     case 6:
     document.querySelector('.showStart').checked = settingsArray[i];
     break;
     case 7:
     document.querySelector('.recordPos').checked = settingsArray[i];
     break;
     }
     }
     };
     reader.readAsArrayBuffer(event.target.files[0]); // Read the file as ArrayBuffer
    };
    const generatePlanets = (x = (c.width / 2) - (20 / 2), y = (c.height / 2) - (20 / 2), anti = false) => {
     planets.push({
     x: x,
     y: y,
     width: document.querySelector('.sizePlanet').value,
     height: document.querySelector('.sizePlanet').value,
     color: document.querySelector('.useAnti').checked ? `red` : `rgb(2, 171, 227)`,
    
     anti: anti
     })
    }
    const generateObjects = (x = (c.width / 1.5) - (20 / 2), y = (c.height / 1.1) - (20 / 2), vx = -6 * 0.15,vy, anti = false, delayPhysics = 0) => {
     objects.push({
     x: x,
     y: y,
     width: objectSize,
     height: objectSize,
     color: `rgb(2, 227, 171)`,
    
     velocity: {
     x: vx,
     y: vy,
     },
     anti: anti,
     delayPhysics: delayPhysics,
     })
    }
    
    c.addEventListener('mousedown', function(e) {
     const clickingOnObjectIndex = isClickOnObject(e.offsetX, e.offsetY, planets)
     if (clickingOnObjectIndex > 0) {
     console.log(clickingOnObjectIndex) //
     // planets.splice(clickingOnObjectIndex, 1)
    
     } 
      const newClearWidth = ctx.canvas.width /cameraPos.zoom
    const newClearHeight = ctx.canvas.height / cameraPos.zoom
    console.log(e.button)
if (e.button == 1) { 
   console.log('we')
    startPos.x = e.clientX+cameraPos.x
    startPos.y = e.clientY+cameraPos.y
}else {
    if (Math.hypot(
        ctx.canvas.width/2-e.clientX,
        ctx.canvas.height/2-e.clientY
    ) < sizePlanet/2) {
        generatePlanets(
            ctx.canvas.width/2-sizePlanet/2,
             ctx.canvas.height/2-sizePlanet/2,
             document.querySelector('.useAnti').checked)
    
    } else {

     generatePlanets(
        e.clientX - sizePlanet / 2+cameraPos.x,
         e.clientY - sizePlanet / 2+cameraPos.y,
          document.querySelector('.useAnti').checked)

    }
}
    })
    document.querySelector('.removeAll').addEventListener('click', () => {
     objects.length = 0;
     clearInterval(interval)
     clearTimeout(currentTimeout);
    })
    document.querySelector('.removeAllPlanets').addEventListener('click', () => {
     planets.length = 0;
    })
    document.querySelector('.stopAll').addEventListener('click', () => {
    
     clearInterval(interval)
     clearTimeout(currentTimeout);
    })
    document.querySelector('.hideAllPlanets').addEventListener('click', () => {
     if (showplanets) {
     showplanets = false;
     } else {
     showplanets = true;
     }
    })
    document.querySelector('.friction').addEventListener('input', () => {
     friction = document.querySelector('.friction').value
    
     document.querySelector('.frictionOutput').innerText = document.querySelector('.friction').value
    })
    let timelapse = 1;
    document.querySelector('.timelapse').addEventListener('input', () => {
     document.querySelector('.timelapseOutput').innerText = document.querySelector('.timelapse').value + "x"
    })
    document.querySelector('.timelapse').addEventListener('change', () => {
     timelapse = document.querySelector('.timelapse').value
    
     clearInterval(repeatInterval)
     setTimeout(() => {
     repeatInterval = setInterval(repeat, 20 / timelapse)
     }, 1)
    
    
    })
    let interval
    document.querySelector('.spawnAll').addEventListener('click', () => {
     for (let x = 0; x < c.width; x += objectSize * 1.1) {
     for (let y = 0; y < c.height; y += objectSize * 1.1) {
     generateObjects(x, y, 0,0, false, 10)
     }
     }
     setTimeout(() => {
     // document.querySelector('.sizePlanet').value = 0.5*20
     // generatePlanets(c.width/2-sizePlanet/2-0.001,c.height/2-sizePlanet/2-0.001, true)
     //document.querySelector('.sizePlanet').value = 0.5/4
    
     }, 1000)
    })

    const keypressing = ()=>{
        const speed = 5
        if (keydown.left) {
            cameraPos.x -= speed
        }
        if (keydown.right) {
            cameraPos.x += speed
        }
        if (keydown.up) {
            cameraPos.y -= speed
        }
        if (keydown.down) {
            cameraPos.y += speed
        }

        if (keydown.e) {
            if (cameraPos.zoom >0.2) {
            cameraPos.zoom -= 1/100
            }
        }
        if (keydown.q) {
            if (cameraPos.zoom < 5) {
            cameraPos.zoom += 1/100
            }
        }
        if (keydown.r) {
            cameraPos.zoom = 1
            cameraPos.x = 0
            cameraPos.y = 0
        }
       

    }

    let currentTimeout
    const start = () => {
        clearInterval(interval)
     // generatePlanets()
     const t = Math.max(1, Math.floor(document.querySelector('.spawnDelay').value))
     interval = setInterval(() => {
     generateObjects(
     startPos.x,
     startPos.y,
     document.querySelector('.startVelocityX').value / 10,
     -document.querySelector('.startVelocityY').value / 10,
     false,
     0)
     }, Math.floor((20 / timelapse)) * t)
     currentTimeout = setTimeout(() => {
     clearInterval(interval)
    
     console.log(objects.length)
     }, Math.floor((20 / timelapse)) * (Math.min(200000, document.querySelector('.spawnAmount').value) * t))
    
    }
    
    let repeatInterval
    const repeat = () => {
     if (document.querySelector('.pause').value == 'Play') return
     shouldcollidewithwall = document.querySelector('.wallCollision').checked
     Realmode = document.querySelector('.useNew').value
    
     render()
 
     setTimeout(calculateObjectPosition, 1)
    
    }
    setInterval(keypressing,20)
    repeatInterval = setInterval(repeat, 20)
    document.querySelector('.start').onclick = start
    document.querySelector('.export').onclick = generateExportFile
    document.querySelector('#importbtn').onchange = importSaveFile
    
    document.querySelector('.pause').onclick = () => {
     if (document.querySelector('.pause').value == 'Play') {
     document.querySelector('.pause').value = 'Pause'
     } else {
     document.querySelector('.pause').value = 'Play'
     }
    }
    
    document.querySelector('.hideUi').onclick = () => {
     if (document.querySelector('.hideUi').innerHTML == 'Hide UI') {
     document.querySelector('.hideUi').innerHTML = 'Show UI'
     document.querySelector('.hideUi').style.color = 'white'
     document.querySelector('.hideUi').style.backgroundColor = 'black'
     document.querySelector('.hideUi').style.borderColor = 'white'
    
    
     document.querySelector('.ui').style.display = 'none'
     } else {
     document.querySelector('.hideUi').innerHTML = 'Hide UI'
     document.querySelector('.hideUi').style.color = 'black'
     document.querySelector('.hideUi').style.backgroundColor = 'white'
     document.querySelector('.hideUi').style.borderColor = 'black'
    
     document.querySelector('.ui').style.display = 'block'
     }
    }
    
    //for advanced controls UI
    
    document.querySelector('.advancedUI').style.display = 'none';
    
    document.querySelector('.advancedUIBtn').onclick = () => {
     if (document.querySelector('.advancedUI').style.display == 'none') {
     document.querySelector('.basicUI').style.display = 'none'
     document.querySelector('.advancedUI').style.display = 'block'
     document.querySelector('.advancedUIBtn').innerHTML = 'Hide Advanced UI'
     } else {
     document.querySelector('.basicUI').style.display = 'block'
     document.querySelector('.advancedUI').style.display = 'none'
     document.querySelector('.advancedUIBtn').innerHTML = 'Show Advanced UI'
     }
    }
    document.querySelector('.objectSize').onchange = ()=>objectSize = document.querySelector('.objectSize').value

    window.addEventListener('keydown',(e)=>{
        switch(e.key){
            case 'ArrowLeft':
                keydown.left = true;
                break;
            case 'ArrowRight':
                keydown.right = true;
                break;
            case 'ArrowUp':
                keydown.up = true;
                break;
            case 'ArrowDown':
                keydown.down = true;
                break;
                case 'q':
                    keydown.q = true;
                    break;
                case 'e':
                    keydown.e = true;
                    break;
                case'r':
                keydown.r = true;
                break;
                default:
                    keydown[e.key] = true
                    break;
        }
    })
    window.addEventListener('keyup',(e)=>{
        switch(e.key){
            case 'ArrowLeft':
                keydown.left = false;
                break;
            case 'ArrowRight':
                keydown.right = false;
                break;
            case 'ArrowUp':
                keydown.up = false;
                break;
            case 'ArrowDown':
                keydown.down = false;
                break;
                case 'q':
                    keydown.q = false;
                    break;
                    case 'e':
                        keydown.e = false;
                        break;
                case 'r':
                keydown.r = false;
                break;
                default:
                    keydown[e.key] = false
                    break;
                
        } 

    })
    }, 1);
