const $ = (el)=>{
    return document.querySelector(el)
}
const c = $('#game')

const ctx = c.getContext('2d')
const updateSize = () => {
    c.width = document.body.offsetWidth-340
    c.height = document.body.offsetHeight
    drawElements()
}
let typedInInputField = false;
let elementsArray = [];
let selectedElementIndex = null;
let backgroundColor = 'rgba(7, 15, 30, 1)'
const imageCache = new Map();

const camera = {
    x:0,
    y:0,
    zoom:1,
}


// Initialize snapping settings
let isGridSnapEnabled = false;
let gridSize = Number($('#gridSizeInput').value);

function drawElements(){
    ctx.save()

    ctx.clearRect(0, 0, c.width, c.height)

    //background
    
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, c.width, c.height)

    
    ctx.translate(-camera.x, -camera.y)
    ctx.translate(c.width/2, c.height/2)
    ctx.scale(camera.zoom, camera.zoom)
    ctx.translate(-c.width/2, -c.height/2)

    //draw a crosshair indicating 0,0
    const crosshairSize = 20
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-crosshairSize, 0);
    ctx.lineTo(crosshairSize, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -crosshairSize);
    ctx.lineTo(0, crosshairSize);
    ctx.stroke();

    //draw grid
    if (isGridSnapEnabled) {
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        for(let x = 0-camera.x%gridSize; x < c.width; x += gridSize){
          
            ctx.beginPath();
            ctx.moveTo(x+camera.x, 0+camera.y);
            ctx.lineTo(x+camera.x, c.height+camera.y);
            ctx.stroke();
        }
        for(let y = 0-camera.y%gridSize; y < c.height; y += gridSize){
          
            ctx.beginPath();
            ctx.moveTo(0+camera.x, y+camera.y);
            ctx.lineTo(c.width+camera.x, y+camera.y);
            ctx.stroke();
        }
    }

    //objects
    
    elementsArray.forEach(obj => {
      
        ctx.fillStyle = obj.color
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        if (obj.image) {
            ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height)
        }
    })
    ctx.restore()

  
   
}
setInterval(function(){
      //Autosave
if (Math.abs(JSON.parse(localStorage.getItem('gamemake-helper-autosave',JSON.stringify(elementsArray)))
.length - elementsArray.length) > 5) {
    localStorage.setItem('gamemake-helper-autosave', JSON.stringify(elementsArray))
}
},20*1000)




window.addEventListener('resize', updateSize);

updateSize();