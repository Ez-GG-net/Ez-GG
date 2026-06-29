const c = document.getElementById("main");
const ctx=  c.getContext("2d");

const updateSize = function(){
    const w = document.body.offsetWidth;
    const h = document.body.offsetHeight;
    c.width = w;
    c.height = h;
}

window.onresize = updateSize;
function renderPlayer(){
    //rotate the player
    ctx.save();
    ctx.translate(player.x + player.width/2, player.y + player.height/2);
    ctx.rotate(player.rotation * Math.PI/180);
    ctx.translate(-player.x + -player.width/2, -player.y + -player.height/2);  // translate back to center of canvas

    ctx.drawImage(player.texture,player.x-20,player.y-25,80,80);
ctx.fillStyle=  player.color
ctx.fillRect(player.x,player.y,player.width,player.height)
    ctx.restore();
}
function renderScore(){
    document.querySelector('.score').innerHTML = `Score: ${player.score}` 
}

function renderWalls(){
    walls.forEach(wall => {
        wall.forEach(pipe=>{
            ctx.fillStyle = pipe.color;
            ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
        })

    })
}
let backgroundOffset = 0
function render(){
    ctx.clearRect(0, 0, c.width, c.height);  // clear canvas before drawing

    //draw background
    ctx.fillStyle = '#0a2351'
    ctx.fillRect(0, 0, c.width, c.height);

    //draw a grid with lines
    const gridSize = 30
    ctx.strokeStyle = "#0039a6";
    for(let x = 0+backgroundOffset%gridSize; x < c.width; x += gridSize){
      
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.stroke();
    }
    for(let y = 0; y < c.height; y += gridSize){
      
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(c.width, y);
        ctx.stroke();
    }
    //draw a second grid with a different color releative to backgroundOffset to make the background look 3d


// Draw a second grid with a different color relative to backgroundOffset to make the background look 3D
ctx.strokeStyle = "#002D62"; // Example color for the second grid
for(let x = 0+backgroundOffset%gridSize; x < c.width; x += gridSize){
      
    ctx.beginPath();
    ctx.moveTo(x-2, 0);
    ctx.lineTo(x-2, c.height);
    ctx.stroke();
}
for(let y = 0; y < c.height; y += gridSize){
  
    ctx.beginPath();
    ctx.moveTo(0, y-2);
    ctx.lineTo(c.width, y-2);
    ctx.stroke();
}

    

    renderScore()
    renderGun()
    renderPlayer()
  
    renderWalls()
    renderBossfight1()
    renderBullets()
    renderBossAttacks()
}

const key = {
    mouse:{}
}
function keypressing(){

}
window.addEventListener("keydown",(e)=>{
key[e.key] = true
})
window.addEventListener("keyup",(e)=>{
    key[e.key] = false
})
window.addEventListener('mousedown',(e)=>{
    key.mouse[e.button] = true
    })
    window.addEventListener('mouseup',(e)=>{
    key.mouse[e.button] = false
    })
//make mobile clicking detection
    window.addEventListener('touchstart',(e)=>{
        key.mouse[0] = true
        })
    window.addEventListener('touchend',(e)=>{
        key.mouse[0] = false
        })
let playerGravitySpeed = 0.12
let scoreBoostCooldown = 0;
let spawnWalls = true;
let spawnedWalls = 0;
let gunWall = null;
function playerPhysics(){

    //gravity
    const maxGravitySpeed = 10

    if (!player.dead) {

        


        backgroundOffset -= 1
    if (key[' '] || key.mouse[0]) {
        if (player.velocity.y > -maxGravitySpeed) {
        player.velocity.y -= playerGravitySpeed; // flying up
        }
    } else {
        if (player.velocity.y < maxGravitySpeed) {
        player.velocity.y += playerGravitySpeed; // gravity
        }
    }
} else {
    if (player.velocity.y < maxGravitySpeed) {
        player.velocity.y += playerGravitySpeed*2; // gravity
        }

        //show dead screen
        document.querySelector('.deadScreen').style.display = 'flex';
        setTimeout(function() {
        document.querySelector('.deadScreen').style.opacity = 0.8
        },1)
            //show the player score
    document.querySelector('.finalscore').innerHTML = `Score: ${player.score}`
    //show the player high score
    document.querySelector('.highscore').innerHTML = `High Score: ${localStorage.getItem('highscore') || 0}`
    
    //save player score if it's higher than high score
    if (player.score > parseInt(localStorage.getItem('highscore')) || localStorage.getItem('highscore') === null) {
        localStorage.setItem('highscore', player.score);
    }
}

    
    //collisions
    if (player.y < 0) {
        player.velocity.y *= -0.5;
        player.y = 0;
    }
    if (player.y + player.height > c.height) {
        player.velocity.y *= -0.5;
        player.y = c.height - player.height;
    }
    walls.forEach(wall => {
        //if player is colliding with any wall then make player dead
        if ((player.x < wall[0].x + wall[0].width &&
            player.x + player.width > wall[0].x &&
            player.y < wall[0].y + wall[0].height &&
            player.y + player.height > wall[0].y)
        || (player.x < wall[1].x + wall[1].width &&
        player.x + player.width > wall[1].x &&
        player.y < wall[1].y + wall[1].height &&
        player.y + player.height > wall[1].y)) {
            walls.forEach(function(wall){
                wall[0].x += wallMovementSpeed
                wall[1].x += wallMovementSpeed
            })
            player.dead = true;
           
        }

        if (player.x > wall[0].x - wallMovementSpeed && player.x < wall[1].x + wallMovementSpeed) {
            if (scoreBoostCooldown <= 0) {
                
            player.score += 1
            scoreBoostCooldown = 2
            if (player.score < 150) {
            wallMovementSpeed += 0.05
            playerGravitySpeed += 0.00435
       
            } 
            if (player.score % 100 == 0) {
                player.hasgun = true;
                gunWall = false;
                renderWarningAnimation()
            }
            }

        }


        

    })
    scoreBoostCooldown -= 1
    //player rotation to look like its falling

    if (player.dead){
        player.rotation = 0
    } else {
    player.rotation = player.velocity.y*(10-((maxGravitySpeed-8)))
    }



    //change pos of player for velocity
    player.x += player.velocity.x;
    player.y += player.velocity.y;
}
let maxWalls = Math.floor(document.body.offsetWidth/100)/2.5


let wallMovementSpeed = 2
function wallPhysics(){
    if (player.dead) return
    if (!walls[0]) return
    if (walls.length < maxWalls) {
    if (walls[walls.length-1][0].x < c.width - c.width/maxWalls) {
        if (spawnWalls) {

       

        addRandomPositionWall()

             //check if this wall will give the player score to be 50
             spawnedWalls += 1;
             if (spawnedWalls % (100-1) == 0)  {
                 spawnWalls = false;
                 gunWall = walls[walls.length-1][0]
             }
        }
        console.log(spawnWalls,spawnedWalls)
    }
}
    //move walls left and teleport them if their x position is less than 0
    walls.forEach((wall,i) => {
       
      
            wall[0].x -= wallMovementSpeed;
            wall[1].x -= wallMovementSpeed;
         
          
            if(wall[1].x < -wall[1].width){
                walls.splice(i, 1);
             
            }
        
      
    })
}

function repeat(){
    if (!player.paused) {
render()
playerPhysics()
wallPhysics()
keypressing()

calculateShootGun()
calculateBullets()
calculateBoss1()

    }


requestAnimationFrame(repeat)

}
updateSize();
const addRandomPositionWall = ()=>{
      ///add a new wall but with a different height
// Create a new wall object for the bottom wall
const randomValue = Math.floor(Math.random() * (c.height/1.5 - 50)) + 50
const bottomWall = {
    x: c.width,
    height: randomValue,
    y: c.height - (randomValue), // Set its y position based on height
    width:20,
    color: "red", // Same color as the bottom wall
};

// Create a new wall object for the top wall
const topWall = {
    x: c.width,
    height: bottomWall.y - (pipeGapSize*2), // Calculate height based on gap
    y: 0, // Set y to 0 since it starts at the top
    width: 20,
    color: "blue", // Same color as the bottom wall
};

// Push both walls to the walls array
walls.push([topWall,bottomWall,]);
}
//*--------------ON_START*--------------
const playerTexture = new Image()

playerTexture.src = "images/ship.png"
const pipeGapSize = 80
const player = {
    x: c.width/2,
    y: c.height/2,
    width: 40,
    height: 15,
    texture: playerTexture,
    color:'rgba(255,0,0,0.4)',
    speed: 5,
    velocity:{
        x: 0,
        y: 0,
    },
    rotation: 90, //angle in degrees
    dead:false,
    score:0,
    paused:false,
}
const walls = 
    [
        //pipe1
        [
        {
            x:c.width-10,
            y:0,
            width: 20,
            height: c.height/2-pipeGapSize,
            color: "blue"
        },
        {
            x:c.width-10,
            y:c.height/2+pipeGapSize,
            width: 20,
            height: c.height/2-pipeGapSize,
            color: "red"
        }
    ]
    ]

setTimeout(()=>{
    player.paused = true
    repeat()
}
,1)
//*--------------END ON_START*--------------



document.getElementById("startButton").onclick = ()=>{
    document.querySelector(".startMenu").style.opacity = 0
    setTimeout(()=>document.querySelector('.startMenu').style.display = 'none',500)
    player.paused = false
}
document.querySelector("#deadScreenPlayAgainButton").onclick = ()=>{
updateSize()
    document.querySelector('.deadScreen').style.opacity = 0
    setTimeout(()=>document.querySelector('.deadScreen').style.display = 'none',500)

    //reseting the game
    player.score = 0
    player.paused = false
    player.dead = false
   walls.length = 0;
   spawnWalls = true;
   spawnedWalls = 0;
   walls.push(        [
    {
        x:c.width-10,
        y:0,
        width: 20,
        height: c.height/2-pipeGapSize,
        color: "blue"
    },
    {
        x:c.width-10,
        y:c.height/2+pipeGapSize,
        width: 20,
        height: c.height/2-pipeGapSize,
        color: "red"
    }])
    player.y = c.height/2
    player.x = c.width/2
    player.hasgun = false;
    player.velocity.x = 0
    player.velocity.y = -2
    playerGravitySpeed = 0.12

    maxWalls = Math.floor(document.body.offsetWidth/100)/2.5
    wallMovementSpeed = 2
    boss1.health = 1000
    boss1Running = false;
    player.hasgun = false;
    spawnWalls = true;
    bossAttacks.length = 0;
                document.getElementById("healthbar").style.display = "none"
}

document.querySelector(".starthighscore").innerHTML = `High Score: ${localStorage.getItem("highscore") || 0}`



