const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Target size
const targetSize = 800; // Base size for the canvas
let scale = 1; // Scaling factor (1 = full size)

let runningwave =false;
let canstartnextwave =true;
let canplacehere = false;

let addingMoney = '';

let currentmode = null;

const mouse = {
    x:0,
    y:0
}

const bullets = []
let towers = []
const enemies = [


]
const todieenemies = []
const spawned = []
const traps = []

function reset(mode = currentmode) {
    updateEquippedItems()

    document.querySelector('.shop-back-button').style.display = 'none'
  
    //end
    currentmode = mode


    document.querySelector('.ui').style.display = 'flex'
        document.querySelector('.container').style.visibility = 'hidden'
        document.querySelector('.container').style.display = 'none'
      
    try {
    if (enemies) {
    enemies.length = 0;
    }
    if (towers) {
        player.selectedTower = null;
    towers.length = 0;
    }
} catch(e){
    //no one cares
}
if (mode == 'easy') {
loadBEasyMode()
} else if (mode == 'medium') {
    loadBMediumMode()
} else if (mode == 'void'){
    loadVoidMode()
}
playerMoneyLastWave = player.money

lastWave = player.wave

runningwave = false;
    canstartnextwave = true;
    canplacehere = false;

    CsetTimeout(()=>{
  
        loadWave(player.wave-1)

    },(15000)/_speedMultiplier)

    CsetTimeout(()=>{
        audio.selection.audio.playbackRate = 1

        audio.selection.audio.loop = true
   
            //calculate audio
    if (audio.selection.audio.paused && audio.currentTime <= 0) {
        audio.selection.audio.play();
    } else {
        audio.selection.audio.pause();
        audio.selection.audio.currentTime = 0;
        audio.selection.audio.play()
    }

    
    },(15_000-3_600)/_speedMultiplier)
}


setTimeout(function(){
canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    
})
},1)

const paths = [
    {
      "name": "Unnamed Element",
      "width": 60/2,
      "height": 240,
      "x": 360 + 60/2/2,
      "y": 560,
      "color": "#ffffff",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 2",
      "width": 60/2,
      "height": 60/2,
      "x": 360 + 60/2/2,
      "y": 500 + 60/2/2,
      "color": "rgba(255, 0, 0, 1)",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 3",
      "width": 60/2,
      "height": 240,
      "x": 540 + 60/2/2,
      "y": 260,
      "color": "#ffffff",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 4",
      "width": 120,
      "height": 60/2,
      "x": 420,
      "y": 500 + 60/2/2,
      "color": "#ffffff",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 5",
      "width": 60/2,
      "height": 60/2,
      "x": 540 + 60/2/2,
      "y": 500 + 60/2/2,
      "color": "rgba(255, 0, 0, 1)",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 6",
      "width": 60/2,
      "height": 60/2,
      "x": 540 + 60/2/2,
      "y": 200 + 60/2/2,
      "color": "rgba(255, 0, 0, 1)",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 7",
      "width": 120,
      "height": 60/2,
      "x": 420,
      "y": 200 + 60/2/2,
      "color": "#ffffff",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 8",
      "width": 60/2,
      "height": 60/2,
      "x": 360 + 60/2/2,
      "y": 200 + 60/2/2,
      "color": "rgba(255, 0, 0, 1)",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    },
    {
      "name": "Unnamed Element 9",
      "width": 60/2,
      "height": 199,
      "x": 360 + 60/2/2,
      "y": 0,
      "color": "#ffffff",
      "alpha": 1,
      "shape": "rect",
      "image": null,
      "imageName": null
    }
  ]
  ;

// Function to resize canvas and maintain aspect ratio
function resizeCanvas() {
    // Determine the scale factor based on window size
    const availableWidth = window.innerWidth*.60;
    const availableHeight = window.innerHeight;

    // Calculate the scale based on the smaller dimension
    scale = Math.min(availableWidth / targetSize, availableHeight / targetSize);

    // Update canvas dimensions while maintaining aspect ratio
    canvas.width = targetSize * scale;
    canvas.height = targetSize * scale;

    // Adjust CSS for crisp rendering
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    // Redraw on resize
   
}

// Call resizeCanvas on load and window resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();



function renderPath() {
    paths.forEach(function (path) {
        ctx.fillStyle = path.color;
        ctx.fillRect(path.x * scale, path.y * scale, path.width * scale, path.height * scale);
    });
}
function renderTowers(){
    towers.forEach(function (tower) {
        //render rotation
        let towerScale = 0
        let offsetX = 0;
        let offsetY = 0;
        ctx.save();
        ctx.translate((tower.x+tower.width/2) * scale, (tower.y+tower.height/2) * scale);
        ctx.rotate(tower.rotation * Math.PI / 180);
        //render tower shape
        switch (tower.type) {
            case "turret":
                if (tower.cooldownIndex > tower.cooldown-tower.cooldown/20) {
                    ctx.fillStyle = 'blue'
                } else {
        ctx.fillStyle = 'yellow';
                }
        break;
        case 'rifleman':
            if (tower.cooldownIndex > tower.cooldown-tower.cooldown/20) {
                ctx.fillStyle = 'rgb(121, 51, 8)'
            } else {
    ctx.fillStyle = 'rgb(172, 159, 21)';
            }
            break;
        case "taser":
            if (tower.cooldownIndex > tower.cooldown-tower.cooldown/20) {
                ctx.fillStyle = 'blue'
            } else {
    ctx.fillStyle = 'darkblue';
            }
    break;
    case 'grenade':
        if (tower.cooldownIndex > tower.cooldown-tower.cooldown/20) {
            ctx.fillStyle = 'orange'
        } else {
ctx.fillStyle = 'darkorange';
        }
        break;
    case 'jabber':
            if (tower.cooldownIndex > tower.cooldown-tower.cooldown/5) {
                towerScale = (tower.range*15/1.5)/(tower.cooldownIndex/tower.cooldown)
                ctx.fillStyle = 'purple'
            } else {
                ctx.fillStyle = '#660066';
            }
         break;
         case 'spawner':
        
       
                ctx.fillStyle = 'brown';
            
         break;
         case 'freeze':
            ctx.fillStyle = 'lightblue';
            break;
            case 'voidblaster':
                ctx.fillStyle = '#4B0082';
                
            
                break;
            case 'gatgun': 
            ctx.fillStyle = 'rgb(86, 86, 86)';
            break;
            case 'gander':
            ctx.fillStyle = 'rgb(128, 0, 0)';
            break;
            case 'bombilary':
                ctx.fillStyle = 'rgb(66, 0, 0)';
                break;
            case 'voidsiphon':
                ctx.fillStyle = 'rgb(0, 0, 139)';
                break;
           
        }
     
        ctx.fillRect((-tower.width/2-towerScale/2-offsetX)*scale, (-tower.height/2-towerScale/2-offsetY)*scale, (tower.width+towerScale) * scale, (tower.height+towerScale) * scale);
        ctx.restore();
     
    });
}
function renderEnemies(){

    todieenemies.forEach(function(enemy){
        if (enemy.splashTick >= 0) {
     
            ctx.beginPath();
            ctx.arc(
                enemy.getCenter().x * scale,
                enemy.getCenter().y * scale,
                enemy.splashTickRadius*10 * scale,
                0,
                2 * Math.PI
            );
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.5*(enemy.splashTick/200)})`;
            ctx.fillStyle = `rgba(255, 125, 0, ${0.5*(enemy.splashTick/200)})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill()
        } else {
            todieenemies.splice(todieenemies.indexOf(enemy), 1);
        } 
    }) 
    enemies.forEach(function (enemy) {


        if (enemy.splashTick >= 0) {
     
            ctx.beginPath();
            ctx.arc(
                enemy.getCenter().x * scale,
                enemy.getCenter().y * scale,
                enemy.splashTickRadius*10 * scale,
                0,
                2 * Math.PI
            );
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.5*(enemy.splashTick/200)})`;
            ctx.fillStyle = `rgba(255, 125, 0, ${0.5*(enemy.splashTick/200)})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill()
        }
        




        switch (enemy.type) {
            case "normal":
                case "armored normal":
                    case "res normal":
                        case "res armored normal":
                        if (enemy.damagedTick > 0) {
                            ctx.fillStyle = `rgba(100, 100, 100, ${enemy.stealth?0.5:1})`;
                        } else {
        ctx.fillStyle = `rgba(128, 128, 128, ${enemy.stealth?0.5:1})`;
                        }
        break;
        case "speedy":
            case "armored speedy":
                case "res speedy":
                    case "res armored speedy":
                    if (enemy.damagedTick > 0) {
                        ctx.fillStyle = `rgba(130, 160, 190, ${enemy.stealth?0.5:1})`;
                    } else {
            ctx.fillStyle = `rgb(173, 216, 230, ${enemy.stealth?0.5:1})`;
                    }
            break;
        case "strong":
            case "armored strong":
                case "res strong":
                    case "res armored strong":
                    if (enemy.damagedTick > 0) {
                        ctx.fillStyle = `rgba(30, 0, 40, ${enemy.stealth?0.5:1})`;
                    } else {
            ctx.fillStyle = `rgb(51, 0, 89, ${enemy.stealth?0.5:1})`;
                    }
            break;
            case "boss1":
                ctx.fillStyle = `rgb(41, 23, 0, ${enemy.stealth?0.5:1})`;
                break;
                case "speedy boss":
                    ctx.fillStyle = `rgb(120, 160, 230, ${enemy.stealth?0.5:1})`;
                    break;
                case "heavy":
                    if (enemy.damagedTick > 0) {
                        ctx.fillStyle = `rgba(0, 0, 0, ${enemy.stealth?0.5:1})`;
                    } else {
                    ctx.fillStyle = `rgb(35, 35, 35, ${enemy.stealth?0.5:1})`;
                    }
                    break;
                    case "titan":
                        if (enemy.damagedTick > 0) {
                            ctx.fillStyle = `rgba(0, 0, 0, ${enemy.stealth?0.5:1})`;
                        } else {
                        ctx.fillStyle = `rgb(35, 35, 35, ${enemy.stealth?0.5:1})`;
                        }
                        break;
                    case "easy boss":
                        case "res easy boss":
                        ctx.fillStyle = `rgb(75, 111, 68, ${enemy.stealth?0.5:1})`;
                        break;
                        case "medium boss":
                            case "res medium boss":
                            ctx.fillStyle = `rgb(145, 70, 0, ${enemy.stealth?0.5:1})`;
                            break;
                            case "hard boss":
                            case "res hard boss":
                            ctx.fillStyle = `rgb(145, 19, 0, ${enemy.stealth?0.5:1})`;
                            break;
                          
                        case "drake boss":
                            ctx.fillStyle = `rgb(128, 128, 128, ${enemy.stealth?0.5:1})`;
                            break;
        }
        renderVoidEnemies(ctx,enemy)
        let bossextrasize = 0

        if (enemy.finalboss) bossextrasize = 20


        if (enemy.type !== 'drake boss') {
        ctx.fillRect(
            enemy.x * scale-bossextrasize/2,
             enemy.y * scale-bossextrasize/2,
              enemy.width * scale+bossextrasize/2,
               enemy.height * scale+bossextrasize/2
            );
        } else {
            //draw image
         
       
            ctx.drawImage(drakeImg,
                 enemy.x * scale-bossextrasize/2,
                  enemy.y * scale-bossextrasize/2,
                   enemy.width * scale+bossextrasize/2,
                    enemy.height * scale+bossextrasize/2);
            
        }
    });
}
function renderPlaceTower(){
    if (player.placingTower){
        if (player.placingTower == 1){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'yellow';
            }
          ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        } else        if (player.placingTower == 2){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'darkblue';
            } 
          ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        } else        if (player.placingTower == 3){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'orange';
            }
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        }else        if (player.placingTower == 4){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'purple';
            }
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        } else        if (player.placingTower == 5){
            let width = 40/1.5*scale
            let height = 40/1.5*scale

           
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'brown';
            }
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        }  else        if (player.placingTower == 6){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'lightblue';
            }
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        }
        else        if (player.placingTower == 7){
            const width = 60/1.5*scale
            const height = 60/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2-7), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2-7), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = '#4B0082';
            } 
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        }  else        if (player.placingTower == 8){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'rgb(86, 86, 86)';
            }
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        }  else        if (player.placingTower == 9){
            const width = 40/1.5*scale
            const height = 40/1.5*scale
            if (!canplacehere) {
                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
                ctx.fill()
                ctx.stroke();
                ctx.fillStyle = 'rgba(255,0,0,0.8)'
                
            } else {

                ctx.beginPath();
                ctx.arc(
                    (mouse.x),
                     (mouse.y),
                      (width-10/2), 0, 2 * Math.PI
                    );
                ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                ctx.lineWidth = 3;
                ctx.fillStyle = 'rgba(255, 0, 0,0.1)';
                ctx.fill()
                ctx.stroke();

            ctx.fillStyle = 'rgb(66, 0, 0)';
            }
            ctx.fillRect(mouse.x - width/2, mouse.y - height/2, width, height);
        }
        
        towers.forEach(function(tower){
            //draw a radius around the center of the tower of its width
            ctx.beginPath();
            ctx.arc(
                (tower.x+tower.width/2)*scale,
                 (tower.y+tower.height/2)*scale,
                  (tower.type=='voidblaster'?tower.width-10/2-7:tower.width-10/2
                    
                  )*scale, 0, 2 * Math.PI
                );
            ctx.strokeStyle = 'rgba(0,0,0,0.5)'
            ctx.lineWidth = 3;
            ctx.fillStyle = 'rgba(255, 0, 0,0.5)';
            ctx.fill()
            ctx.stroke();
        })
    }
}
function renderSelectTower(){
    if (player.selectedTower ==null) return

    //render range
    const selectedTower = towers[player.selectedTower]

    ctx.beginPath();
    ctx.arc(
        (selectedTower.x+selectedTower.width/2)*scale,
         (selectedTower.y+selectedTower.height/2)*scale,
          (selectedTower.range*15)*scale, 0, 2 * Math.PI
        );
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(124, 185, 232,0.5)';
    ctx.fill()
    ctx.stroke();
}
canvas.addEventListener('click', (e)=>{
    if (player.placingTower == null || !canplacehere)return
    const towerTypes = [
        'turret',
        'taser',
        'grenade',
        'jabber',
        'spawner',
        'freeze',
        'voidblaster',
        'gatgun',
        'bombilary',
        'rifleman',
    ]
   if ([player.placingTower] == 1){
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:1000,
       damage:4,
       range:10,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:300,
       canhitstealth:false,
       
    })
} else if ([player.placingTower] == 2) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:20,
       damage:0.1,
       range:5,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:1500,
       canhitstealth:false,
       
    })
} else if ([player.placingTower] == 3) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:2400,
       damage:6,
       range:6,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:500,
       canhitstealth:false,
       special:{
        splashRadius:5,
       }
       
    })
} else if ([player.placingTower] == 4) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:1000,
       damage:2,
       range:5,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:600,
       canhitstealth:false,

       
    })
} else if ([player.placingTower] == 5) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:800,
       damage:1,
       range:5,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:850,
       canhitstealth:false,
        special:{
            tospawn:[
                {
                    name: "Humvee 1",
                    color: "green",
                    intervalIndex:5000,
                    interval:20000,
                    health:25,
                    
                    movingDirection:90,
                    speed:0.059,

                    range:15,
                    damage:1,
                    cooldown:500,
                    canhitstealth:false,

                    width:30,
                    height:40,
                },
               
            ]
        } 
       
    })
}  else if ([player.placingTower] == 6) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:1200,
       damage:0,
       range:7,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:350,
       canhitstealth:false,
        special:{
            freezeSpeedAmount:0.1,
            freezeDuration:500
        }
    })
} else if ([player.placingTower] == 7) {
    towers.push({
        x:mouse.x/Math.abs(scale)-30,
        y:mouse.y/Math.abs(scale)-30,
        width: 60/1.5,
        height: 60/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:500,
       damage:85,
       range:35,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:7500,
       canhitstealth:false,
        special:{
            orbduration:3000,
            orbdamage:1,
            
            stunduration:2000,

        },
        
     
    })
} else if ([player.placingTower] == 8) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:100,
       damage:2,
       range:15,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:2000,
       canhitstealth:false,


    })
} else if ([player.placingTower] == 9) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:6_000,
       damage:300,
       range:30,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:6200,
       canhitstealth:false,

       special:{
        splashRadius:10,
       }


    })
} else if ([player.placingTower] == 10) {
    towers.push({
        x:mouse.x/Math.abs(scale)-20/1.5,
        y:mouse.y/Math.abs(scale)-20/1.5,
        width: 40/1.5,
        height: 40/1.5,
        type:towerTypes[player.placingTower-1],
       rotation:0,
       cooldown:1_000,
       damage:3,
       range:8,
       cooldownIndex:0,
       upgraded:[0,0],
       moneyspent:700,
       canhitstealth:false,

       special:{
        burstAmount:3,
        burstCooldown:200,
       }
      

    })
}

if (player.placingTower !== null) {
    player.placingTower = null
}
})
function renderBullets(){
    bullets.forEach(function (bullet) {
        //rotation
        ctx.save();
        ctx.translate((bullet.x+bullet.width/2) * scale, (bullet.y+bullet.height/2) * scale);
        ctx.rotate(bullet.rotation * Math.PI / 180);
        //render bullet shape
        ctx.fillStyle = 'gray';
        ctx.fillRect(-bullet.width/2, -bullet.height/2, bullet.width * scale, bullet.height * scale);
        ctx.restore();
    
    });
}
function $formatNumber(num) {
    if (num < 1000) {
      return num.toFixed(2); // No abbreviation for numbers less than 1000
    }
  
    const abbreviations = ['', 'K', 'M', 'B', 'T'];
    const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
    const scaledNum = num / Math.pow(1000, tier);
    return scaledNum.toFixed(2) + abbreviations[tier];
  }
  

function renderUI(){

    document.querySelector('#healthNumb').innerHTML = player.health==Infinity?`<i class="fa-solid fa-infinity"></i>`:player.health;
    document.querySelector('#waveNumb').innerHTML = player.wave
    document.querySelector('#moneyNumb').innerHTML = player.money==Infinity?`<i class="fa-solid fa-infinity"></i>`:$formatNumber(player.money);
    document.querySelector('#towerPlaceNumb').innerHTML = towers.length;

    if (player.selectedTower !== null) {
        if (towers[player.selectedTower].type == 'grenade' || (
            towers[player.selectedTower].type == 'taser' && towers[player.selectedTower].upgraded[1] == 5
        )) {
            document.querySelector('.towerstats').innerHTML = `
            <p><i class="fas fa-bolt"></i> Damage: ${$formatNumber(towers[player.selectedTower].damage)}</p>
            <p><i class="fas fa-bullseye"></i> Range: ${towers[player.selectedTower].range}</p>
            <p><i class="fas fa-sync-alt"></i> Reload Time: ${towers[player.selectedTower].cooldown/1000}</p>
               <p><i class="fas fa-bullseye"></i> Splash Radius: ${towers[player.selectedTower].special.splashRadius}</p>
            <p><i class="fa-solid fa-timeline"></i> DPS: ${$formatNumber(towers[player.selectedTower].damage/(towers[player.selectedTower].cooldown/1000))}</p>
            <p>${towers[player.selectedTower].canhitstealth?`<i class="fa-solid fa-glasses"></i> `:''}</p>
            `
        } else if (towers[player.selectedTower].type == 'spawner') {

            document.querySelector('.towerstats').innerHTML = ''
            towers[player.selectedTower].special.tospawn.forEach(item => {
            
                document.querySelector('.towerstats').innerHTML += `
                Type: "${item.name}" <br>
             
                <li>Delay: ${item.interval/1000}s </li>
                <li>Spawn In: ${Math.floor(item.interval/1000-item.intervalIndex/1000+0.99)}s </li>
                <li>Health: ${$formatNumber(item.health)} </li>
                <li>DPS: ${item.damage/(item.cooldown/1000)} </li>
               
           
             
                `
            })
              
            document.querySelector('.towerstats').innerHTML
        } else if (towers[player.selectedTower].type === 'freeze'){
            document.querySelector('.towerstats').innerHTML = `
            <p><i class="fas fa-bolt"></i> Damage: ${$formatNumber(towers[player.selectedTower].damage)}</p>
            <p><i class="fas fa-bullseye"></i> Range: ${towers[player.selectedTower].range}</p>
            <p><i class="fas fa-sync-alt"></i> Reload Time: ${towers[player.selectedTower].cooldown/1000}</p>
                 <p><i class="fa-solid fa-timeline"></i> DPS: ${$formatNumber(towers[player.selectedTower].damage/(towers[player.selectedTower].cooldown/1000))}</p>
                 <p><i class="fa-solid fa-snowflake"></i> Freeze Power: ${(towers[player.selectedTower].special.freezeSpeedAmount*100)}</p>
                 <p><i class="fa-solid fa-snowflake"></i> Freeze Duration: ${towers[player.selectedTower].special.freezeDuration/1000}s</p>
                     <p>   ${towers[player.selectedTower].canhitstealth?`<i class="fa-solid fa-glasses"></i> `:''}</p>
            `
        } else if (towers[player.selectedTower].type === 'taser'){
            document.querySelector('.towerstats').innerHTML = `
            <p><i class="fas fa-bolt"></i> Damage: ${$formatNumber(towers[player.selectedTower].damage)}</p>
            <p><i class="fas fa-bullseye"></i> Range: ${towers[player.selectedTower].range}</p>
            <p><i class="fas fa-sync-alt"></i> Reload Time: ${towers[player.selectedTower].cooldown/1000}</p>
                 <p><i class="fa-solid fa-timeline"></i> DPS: ${$formatNumber(towers[player.selectedTower].damage/(towers[player.selectedTower].cooldown/1000))}</p>
                     <p>   ${towers[player.selectedTower].canhitstealth?`<i class="fa-solid fa-glasses"></i> `:''}</p>
            `
        }
        else{
            document.querySelector('.towerstats').innerHTML = `
                    <p><i class="fas fa-bolt"></i> Damage: ${$formatNumber(towers[player.selectedTower].damage)}</p>
                    <p><i class="fas fa-bullseye"></i> Range: ${towers[player.selectedTower].range}</p>
                    <p><i class="fas fa-sync-alt"></i> Reload Time: ${towers[player.selectedTower].cooldown/1000}</p>
                         <p><i class="fa-solid fa-timeline"></i> DPS: ${$formatNumber(towers[player.selectedTower].damage/(towers[player.selectedTower].cooldown/1000))}</p>
                             <p>   ${towers[player.selectedTower].canhitstealth?`<i class="fa-solid fa-glasses"></i> `:''}</p>
                    `

        }
        function showTowerNameAndUpgrade(){
            if (player.selectedTower === null) return
          
        document.querySelector('#towerName').innerHTML = towers[player.selectedTower].type.toUpperCase()
        
        document.querySelector('#towerUpgraded').innerHTML = 
        `(${towers[player.selectedTower].upgraded[0]}-${towers[player.selectedTower].upgraded[1]})`
        }
        document.querySelector('.towerstats').innerHTML = '                    <p><output id="towerName"></output> <output id="towerUpgraded"></output></p>'+document.querySelector('.towerstats').innerHTML

        showTowerNameAndUpgrade()
    }
}
function renderSpawned(){
    spawned.forEach(function(spawned){
        ctx.save();
        ctx.translate((spawned.x+spawned.width/2) * scale, (spawned.y+spawned.height/2) * scale);
        ctx.rotate((spawned.movingDirection -90) * Math.PI / 180);
        ctx.fillStyle = spawned.color;
        ctx.fillRect(-spawned.width/2, -spawned.height/2, spawned.width * scale, spawned.height * scale);

        ctx.restore()
         //render gun
         ctx.save();
         ctx.translate((spawned.x+spawned.width/2) * scale, (spawned.y+spawned.height/2) * scale);
         ctx.rotate((spawned.rotation-90) * Math.PI / 180);

         ctx.fillStyle = 'black';
         ctx.fillRect(-3/2, -10/2, 3 * scale, 10 * scale);

        ctx.restore();
       
       

    })
}
function renderPathTraps(){
    traps.forEach(function(trap){
        if (trap.type == 'normal') {
        ctx.save();
        ctx.translate((trap.x+trap.width/2) * scale, (trap.y+trap.height/2) * scale);
        ctx.rotate((trap.rotation-90) * Math.PI / 180);
        ctx.fillStyle = trap.color;
        ctx.fillRect(-trap.width/2, -trap.height/2, trap.width * scale, trap.height * scale);
        } else if (trap.type === 'orb') {
           //draw a circle of its color
            ctx.save();
            ctx.translate((trap.x) * scale, (trap.y) * scale);
          
            ctx.fillStyle = trap.color;
            ctx.beginPath();
            ctx.arc(0, 0, trap.width * scale / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

        }

    })
}
function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    const backgroundColor = '#006A4E';
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    

    // Draw the paths
    renderPath();

    renderPathTraps()

    renderEnemies()
    renderSpawned()

    renderSelectTower()
    renderTowers()
    renderBullets()
    renderPlaceTower()
    renderUI()
    if (enemies.length > 0 || spawned.length > 0) {
        showEnemyInfo()
        showSpawnedInfo()
    }
  
    if (enemies.length <= 0 && spawned.length <= 0) {
        const healthElement = document.querySelector('.enemy-health');
        healthElement.style.display = 'none';
    }

    // Request the next frame
    requestAnimationFrame(render);
}

render();
document.querySelector('#towerMaxPlaceNumb').innerHTML = _maxTowerPlacement