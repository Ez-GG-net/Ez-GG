

const c = document.querySelector('.main')
const ctx = c.getContext('2d')

const updateSize = function(){
    c.width = document.body.offsetWidth
    c.height = document.body.offsetHeight
}

const spaceSize = 50000

window.addEventListener('resize', updateSize)
updateSize()
    const playerimage = new Image()
    playerimage.src = './images/player.png'
function renderPlayer(){
       //rotate the player
       ctx.save();
       ctx.translate(player.x + player.width/2, player.y + player.height/2);
       ctx.rotate(player.rotation * Math.PI/180-Math.PI);
       ctx.translate(-player.x + -player.width/2, -player.y + -player.height/2);  // translate back to center of canvas
 /*   ctx.fillStyle = player.color
    ctx.fillRect(player.x, player.y, player.width, player.height)*/

    ctx.drawImage(playerimage,player.x, player.y, player.width, player.height)
    ctx.restore()
}
function renderBullets(){
    ctx.fillStyle = 'white'
    playerBullets.forEach(bullet => {
        //rotate the bullet
        ctx.save();
        ctx.translate(bullet.x + bullet.width/2, bullet.y + bullet.height/2);
        ctx.rotate(bullet.rotation * Math.PI/180);
        ctx.translate(-bullet.x + -bullet.width/2, -bullet.y + -bullet.height/2);  // translate back to center of canvas
        ctx.fillStyle = bullet.color
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
        ctx.restore()
    
        bullet.lifetime -= 5
        bullet.width = Math.min(bullet.lifetime/120+1,bullet.width)
        bullet.height = Math.min(bullet.lifetime/120+1,bullet.height)
        if(bullet.lifetime < 0){
            playerBullets.splice(playerBullets.indexOf(bullet), 1)
        }
    })
}
function generateStars() {
   for (let i = 0; i < 100*15*10; i++) {
        stars.push({
            x: Math.random()*spaceSize-spaceSize/2,
            y: Math.random()*spaceSize-spaceSize/2,
            size: Math.random()*0.5 + 1,
            color: `white`
        })
    }
}
function renderStars() {
    ctx.fillStyle = 'white'
    stars.forEach(star => {
        ctx.fillStyle=  star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI*2)
        ctx.fill()
    })
}
function renderEnemies(){
    ctx.fillStyle = 'yellow'
    enemies.forEach(enemy=>{
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
    })
}
function renderMeteors(){
    ctx.fillStyle = 'rgb(200,200,200)'
    meteors.forEach(meteor=>{
        ctx.fillRect(meteor.x, meteor.y, meteor.width, meteor.height)
    })
}
function renderAmmo(){
    ammoBoxes.forEach(box => {
        ctx.fillStyle = box.color
        ctx.fillRect(box.x, box.y, box.width/(5/box.lifetime), box.height/(5/box.lifetime))
    })
}
function getGradient(speed, maxSpeed, color1, color2, color3) {
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
function showUI (){
    document.querySelector('.ammo').innerHTML = 'Ammo: ' + bulletammo
    document.querySelector('.speed').innerHTML = 'Speed: ' + Math.floor(Math.hypot(player.velocity.x, player.velocity.y)*100)/10
    document.querySelector('.timeSurvived').innerHTML = 'Time Survived (Seconds): ' + player.timesurvived
    document.querySelector("#finalScoreValue").innerHTML = player.timesurvived

    document.querySelector('.health').innerHTML = 'Health: ' +(player.health<20?`<red>${Math.floor(player.health)}</red>`:(player.health<50?`<orange>${Math.floor(player.health)}</orange>`:`<green>${Math.floor(player.health)}</green>`))
    document.querySelector('.scraps').innerHTML = 'Scraps: ' + Math.floor(player.scraps)
    document.querySelector('.fuel').innerHTML = 'Fuel: '+(player.fuel<20?`<red>${Math.floor(player.fuel)}</red>`:(player.fuel<50?`<orange>${Math.floor(player.fuel)}</orange>`:`<green>${Math.floor(player.fuel)}</green>`))
    document.querySelector('.oxygen').innerHTML = 'Oxygen: '+(player.oxygen<20?`<red>${Math.floor(player.oxygen)}</red>`:(player.oxygen<50?`<orange>${Math.floor(player.oxygen)}</orange>`:`<green>${Math.floor(player.oxygen)}</green>`))
    document.querySelector('.inventoryAmount').innerHTML = 'Carrying: '+player.holdingItemsAmount/10 + ' Items'
    if (player.holdingItemsAmount >= player.maxHoldingItemsAmount) {
        document.querySelector('.inventoryAmount').style.color ='red'
    } else {
        document.querySelector('.inventoryAmount').style.color = 'white'
    }

    document.getElementById('buypowerup').innerHTML = `Buy 1+ Burst Spread (Current: ${shootatonce})`

    document.querySelector('.starthighscore').innerHTML = `High Score: ${localStorage.getItem('spaceship-highscore') || 0} Seconds`

    if (player.timesurvived % 120 >= 30 && player.timesurvived % 120 < 35 ) {
        const diffucultyNumb = player.timesurvived/(120*2)+1
        document.querySelector('.enemySpawnAlert').style.opacity = '1'
                document.querySelector('.enemySpawnAlert').style.backgroundColor = 'rgba(174, 0, 0, 0.8)'
        document.querySelector('.enemySpawnAlert').innerHTML = 
        `Enemies are spawning (Difficulty: `+(diffucultyNumb<2?`<green>${Math.floor(diffucultyNumb)}</green>`:(diffucultyNumb<5?`<orange>${Math.floor(diffucultyNumb)}</orange>`:`<red>${Math.floor(diffucultyNumb)}</red>`))+')'
    } else if (player.timesurvived % 120 < 5 ) {
        document.querySelector('.enemySpawnAlert').style.opacity = '1'
        document.querySelector('.enemySpawnAlert').style.backgroundColor = 'lightblue'
        document.querySelector('.enemySpawnAlert').innerHTML = 'Enemies have halted (For now)'
    }else {
    document.querySelector('.enemySpawnAlert').style.opacity = '0'
    }
    if (currentbuyingitems.ammo>0||currentbuyingitems.powerup>0||currentbuyingitems.cooldownpowerup>0||currentbuyingitems.carrypower>0) {
        document.querySelector('.alerts').style.display = 'block'
        document.querySelector('.cancelBuy').style.display = 'block'
        document.querySelector('.finalBuy').style.display = 'block'

    
    document.querySelector('.alerts').innerHTML = `You are buying: ${
        currentbuyingitems.ammo>0?currentbuyingitems.ammo + ' Ammo ':''} ${
            currentbuyingitems.ammo>0&&currentbuyingitems.powerup>0?'& ':''} ${
                currentbuyingitems.powerup>0?currentbuyingitems.powerup + '+ Burst Spread':''} ${
                                currentbuyingitems.cooldownpowerup>0&&(currentbuyingitems.ammo>0||currentbuyingitems.powerup)?'& ':''
                } ${
                    currentbuyingitems.cooldownpowerup>0?'-'+currentbuyingitems.cooldownpowerup*2+' Shoot Cooldown':''}${
                        currentbuyingitems.carrypower>0&&(currentbuyingitems.ammo>0||currentbuyingitems.powerup||currentbuyingitems.cooldownpowerup)?'& ':''
        } ${
            currentbuyingitems.carrypower>0?'+'+currentbuyingitems.carrypower+' Carry Power':''
        } (${
                    currentbuyingitems.ammo+currentbuyingitems.powerup*200
                    +currentbuyingitems.cooldownpowerup*300
                    +currentbuyingitems.carrypower*50
                } Scraps)

                `
            } else {
                                document.querySelector('.cancelBuy').style.display = 'none'
                document.querySelector('.alerts').style.display = 'none'
                document.querySelector('.finalBuy').style.display = 'none'

            }
    //draw a square in the direction of the ammoBoxes
  const width = 10
  const height = 10
  const Maxdistance = 45

    ammoBoxes.forEach(box=>{
        const distance =  Math.hypot(
            box.y-player.y+player.height/2,
             box.x-player.x+player.width/2)
        if (distance > 10000 || 
            distance < 0) return
        const angle = Math.atan2(box.y-player.y+player.height/2, box.x-player.x+player.width/2)


        //get x and y to be distance away from the player in the direction of the angle
        const x = player.x+player.width/2 + Math.cos(angle) * Maxdistance
        const y = player.y+player.height/2 + Math.sin(angle) * Maxdistance
      

        //draw the box
           ctx.fillStyle = getGradient(distance/100, 50,[255,0,0],[0,255,0],[0,0,255]);
        ctx.fillRect(x, y, width, height)


    })
   powerups.forEach(box=>{
        const distance =  Math.hypot(
            box.y-player.y+player.height/2,
             box.x-player.x+player.width/2)
        if (distance > 10000 || 
            distance < 0) return
        const angle = Math.atan2(box.y-player.y+player.height/2, box.x-player.x+player.width/2)


        //get x and y to be distance away from the player in the direction of the angle
        const x = player.x+player.width/2 + Math.cos(angle) * Maxdistance
        const y = player.y+player.height/2 + Math.sin(angle) * Maxdistance
      

        //draw the box
           ctx.fillStyle = getGradient(distance/100, 50,[0,255,255],[255,0,255],[0,0,255]);
        ctx.fillRect(x, y, width, height)


    })
    oils.forEach(box=>{
        if (!box.tracked) return
        const distance =  Math.hypot(
            box.y-player.y+player.height/2,
             box.x-player.x+player.width/2)
        if ( 
            distance < 0) return
        const angle = Math.atan2(box.y-player.y+player.height/2, box.x-player.x+player.width/2)


        //get x and y to be distance away from the player in the direction of the angle
        const x = player.x+player.width/2 + (Math.cos(angle) * (Maxdistance+15))
        const y = player.y+player.height/2 + (Math.sin(angle) * (Maxdistance+15))
      

        //draw the box
           ctx.fillStyle = 'rgba(155,155,155,0.5)';
        ctx.fillRect(x, y, width, height)


    })
    if (true) {
        let box = homeBase
  
        const distance =  Math.hypot(
            box.y+box.height/2-player.y+player.height/2,
             box.x+box.width/2-player.x+player.width/2)
        if ( 
            distance > 500) {
        const angle = Math.atan2((box.y+box.height/2)-(player.y+player.height/2), (box.x+box.height/2)-(player.x+player.width/2))


        //get x and y to be distance away from the player in the direction of the angle
        const x = player.x+player.width/2 + (Math.cos(angle) * (Maxdistance+7))
        const y = player.y+player.height/2 + (Math.sin(angle) * (Maxdistance+7))
      

        //draw the box
           ctx.fillStyle = 'rgb(124, 218, 124)';
        ctx.fillRect(x, y, width, height)
            }

    }
    enemies.forEach(box=>{
        const distance =  Math.hypot(
            box.y-player.y+player.height/2,
             box.x-player.x+player.width/2)
        if (distance > 4000 || 
            distance < 400) return
        const angle = Math.atan2(box.y-player.y+player.height/2, box.x-player.x+player.width/2)


        //get x and y to be distance away from the player in the direction of the angle
        const x = player.x+player.width/2 + Math.cos(angle) * (Maxdistance-10)
        const y = player.y+player.height/2 + Math.sin(angle) * (Maxdistance-10)
      

        //draw the box
           ctx.fillStyle = 'red'
        ctx.fillRect(x, y, width/2, height/2)


    })
}
function renderPowerups(){
    ctx.fillStyle = 'yellow'
   powerups.forEach(box => {
        ctx.fillStyle = box.color
        ctx.fillRect(box.x, box.y, box.width/(5/box.lifetime), box.height/(5/box.lifetime))
    })
}
function renderOils (){
    oils.forEach(function(box){
        ctx.fillStyle = box.color
        ctx.fillRect(box.x, box.y, box.width/(200/box.lifetime), box.height/(200/box.lifetime))
    })
}
function renderItems(){
   
    items.forEach(box => {
         ctx.fillStyle = box.color
         ctx.strokeStyle = 'rgb(50,250,50)'
         ctx.lineWidth = Math.max(3,Math.min(box.value/10,14))
        ctx.fillRect(box.x, box.y, box.width/(10/box.lifetime), box.height/(10/box.lifetime))
        ctx.strokeRect(box.x, box.y, box.width/(10/box.lifetime), box.height/(10/box.lifetime))

        if (box.touched) {
                     ctx.strokeStyle = 'rgb(150,50,250)'
            ctx.lineWidth = 2
            //draw line from player to center of box
            ctx.beginPath()
            ctx.moveTo(player.x+player.width/2, player.y+player.height/2)
            ctx.lineTo(box.x+box.width/2, box.y+box.height/2)
            ctx.stroke()
        }
    })
}
function renderHomeBase(){
    ctx.fillStyle = homeBase.color
    ctx.fillRect(homeBase.x, homeBase.y, homeBase.width, homeBase.height)
   
}
function render(){
    
    ctx.save()
    ctx.clearRect(0,0,c.width,c.height)
    
    //draw background
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,c.width, c.height)
    ctx.translate(-camera.x+c.width/2, -camera.y+c.height/2)

    //draw some dots randomly but never change each frame
    renderHomeBase()
    renderOils()
    renderStars()
    renderBullets()
renderAmmo()
renderPowerups()



    renderEnemies()
    renderItems()
renderPlayer()
renderMeteors()



showUI()


ctx.restore()

}
const key = {
    mouse:{

    }
}
const mousepos = {
    x: 0,
    y: 0,
}
let hasT = false
let doH = true;
let pressedP = false;
let shootatonce = 1
let bulletammo = 100
let shootcooldown = 0
let toshootcooldown = 35
function keypressing(){
  
    if (!paused 
    ) {
        let powerup = homeBase //to lazy to rename
    if (key.mouse[0]
        && /*not colliding with homeBase */
        !(player.x + player.width > powerup.x && player.x < powerup.x + powerup.width &&
        player.y + player.height > powerup.y && player.y < powerup.y + powerup.height)
    ) {
        if (shootcooldown <= 0 && bulletammo > 0) {
            if (shootatonce == 1) {
        playerBullets.push({
            x: player.x + player.width/2 + Math.cos((player.rotation+90) * Math.PI/180)*10,
            y: player.y + player.height/2 +Math.sin((player.rotation+90) * Math.PI/180)*10,
            width: 5,
            height: 5,
            color: 'lightgreen',
            rotation: player.rotation+90,
            speed:20,
            lifetime: 600,
        })
        bulletammo--
    } else {
        let lastshootatonce = shootatonce
        shootatonce = Math.min(shootatonce,bulletammo)
        for (let i = 0; i < shootatonce; i++) {
            // Calculate the angle offset for the burst spread
            let angleOffset = (5*shootatonce / shootatonce) * (i - (shootatonce - 1) / 2); // Center the spread
            // Adjust the player's rotation by 90 degrees to shoot to the right
            let angle = (player.rotation + 90 + angleOffset) * Math.PI / 180; // Convert to radians
        
            // Push the bullets with the adjusted direction based on player rotation + 90 degrees
            playerBullets.push({
                x: player.x + player.width / 2 + Math.cos(angle) * 10,
                y: player.y + player.height / 2 + Math.sin(angle) * 10,
                width: 5,
                height: 5,
                color: 'lightgreen',
                rotation: player.rotation + 90 + angleOffset, // Adjust rotation for each bullet
                speed: 20,
                lifetime: 600,
            });
          
        }
        bulletammo -= shootatonce
        shootatonce = lastshootatonce
    }
    shootcooldown = Math.max(0,player.shootcooldown)
    
    }
    }

    shootcooldown -= 1

const speed = player.speed/100
const fuelLossStrength = 0.5/100
const oxygenLossStrength = 0.2/100

if (player.fuel >= 0) {
    if (key[' ']){
        //move the player toward the mouse position
        player.velocity.x += Math.cos(player.rotation * Math.PI/180+Math.PI/2)*speed
        player.velocity.y += Math.sin(player.rotation * Math.PI/180+Math.PI/2)*speed

        player.color = 'red'
        player.fuel -= fuelLossStrength
        player.oxygen -= oxygenLossStrength
    } else {
        player.color = 'blue'

    }

    
    if (key.w) {
        player.velocity.y -= speed
        player.fuel -= fuelLossStrength
        player.oxygen -= oxygenLossStrength
    }
    if (key.s) {
        player.velocity.y += speed
        player.fuel -= fuelLossStrength
        player.oxygen -= oxygenLossStrength
    }
    if (key.a) {
        player.velocity.x -= speed
        player.fuel -= fuelLossStrength
        player.oxygen -= oxygenLossStrength
    }
    if (key.d) {
        player.velocity.x += speed
        player.fuel -= fuelLossStrength
        player.oxygen -= oxygenLossStrength
    }
}
    
}
if (key['Control'] && key['Alt'] && key['t']
    && !hasT && !document.getElementById('terminal')
) {
    doH = false;
    paused = true;
    hasT = true
    console.log('t')
    //make a terminal to enter commands
    const t = document.createElement('div')
    t.style.cssText = `
    position:fixed;
    width:100%;
    height:80%;
    background-color:rgba(0,0,0,1);
    z-index:999;
    top:0;
    `
    t.id = 'terminal'
    document.body.appendChild(t)

    const typeArea = document.createElement('input')
    typeArea.style.cssText = `
    position:absolute;
    width:100%;
    height:5%;
    background-color:rgba(0,50,0,1);
    bottom:0;
    color:lightgreen;
    border:none;
    opacity:0;
    `

    const outArea = document.createElement('output')
    outArea.style.cssText = `
    position:absolute;
    width:100%;
    height:calc(100% - 5%*2);
top:0;
color:lightgreen;
padding:10px;
`
const typeOutArea = document.createElement('output')
typeOutArea.style.cssText = `
    position:absolute;
    width:100%;
    height:5%;
   background-color:rgba(0,50,0,1);
    bottom:0;
    color:lightgreen;
    border:none;

        padding-block: 1px;
    padding-inline: 2px;

`
t.appendChild(typeOutArea)
t.appendChild(typeArea)
t.appendChild(outArea)
outArea.innerHTML = 'Enter a command <br><blue>(Note: No highscores will be recorded until you die)</blue>'
typeArea.oninput = (e)=>{
     typeOutArea.innerHTML = typeArea.value
     .replaceAll('=', '<white>=</white>')
     .replaceAll('player','<blue>player</blue>')
     .replaceAll('enemySettings','<blue>enemySettings</blue>')
     .replaceAll('enemySpawnRate','<blue>enemySpawnRate</blue>')

     .replaceAll('spawnSettings','<blue>spawnSettings</blue>')
     .replaceAll('0','<green>0</green>')
     .replaceAll('1','<green>1</green>')
     .replaceAll('2','<green>2</green>')
     .replaceAll('3','<green>3</green>')
     .replaceAll('4','<green>4</green>')
     .replaceAll('5','<green>5</green>')
     .replaceAll('6','<green>6</green>')
     .replaceAll('7','<green>7</green>')
     .replaceAll('8','<green>8</green>')
     .replaceAll('9','<green>9</green>')
}
typeArea.onkeydown = (e)=>{
   
    if (e.key !== 'Enter') return
    outArea.innerHTML = typeArea.value
    .replaceAll('=', '<white>=</white>')
    .replaceAll('player','<blue>player</blue>')
    .replaceAll('enemySettings','<blue>enemySettings</blue>')
    .replaceAll('enemySpawnRate','<blue>enemySpawnRate</blue>')
    .replaceAll('spawnSettings','<blue>spawnSettings</blue>')

    .replaceAll('0','<green>0</green>')
    .replaceAll('1','<green>1</green>')
    .replaceAll('2','<green>2</green>')
    .replaceAll('3','<green>3</green>')
    .replaceAll('4','<green>4</green>')
    .replaceAll('5','<green>5</green>')
    .replaceAll('6','<green>6</green>')
    .replaceAll('7','<green>7</green>')
    .replaceAll('8','<green>8</green>')
    .replaceAll('9','<green>9</green>')
    const command = typeArea.value
    if (command == 'reset') {
           outArea.innerHTML += '<green><br>> Command Executed Successfully<green>'
    typeArea.value = ''
        resetEverything()
        return
    }
    const run = new Function(`${command}`)
    try {
        run()
    } catch (e) {
        outArea.innerHTML += '<br><red>> Command Failed<red>'
        if (e) return
    }
    
    outArea.innerHTML += '<green><br>> Command Executed Successfully<green>'
    typeArea.value = ''
    typeOutArea.innerHTML = ''
   
}
}
if (document.getElementById('terminal')) {
    paused = true;
}
if (key['Control'] && key['Alt'] && key['t']
    && !hasT && document.getElementById('terminal')) {
        console.log('rt')
        document.body.removeChild(document.getElementById('terminal'))
        paused = false;
        hasT = true;
    }
    
    if (!key['Control'] && !key['Alt'] && !key['t'] ){
      
        hasT = false;
        
    } 
    if (key.p) {
        
        if (!pressedP) {
            if (paused == false) {
        paused = true;
            } else {
                paused = false;
            }
        } 
        pressedP = true
    } else {
        pressedP = false;
    }
}
window.addEventListener('keydown', (event)=>{
    key[event.key] = true
})

window.addEventListener('keyup', (event)=>{
    key[event.key] = false
})
window.addEventListener('mousemove', (event)=>{
    mousepos.x = event.clientX
    mousepos.y = event.clientY
})
window.addEventListener('mousedown',(e)=>{
    key.mouse[e.button] = true
    })
    window.addEventListener('mouseup',(e)=>{
    key.mouse[e.button] = false
    })
let bulletheatseakingstrength = 0.1
function playerCalculation(){
    //player rotation to look at mousepos
    const dx = mousepos.x+camera.x-c.width/2 - player.x
    const dy = mousepos.y+camera.y-c.height/2 - player.y
    player.rotation = (-Math.atan2(dx, dy) - Math.PI/16)*180/Math.PI


    playerBullets.forEach(function(bullet){
        bullet.x += Math.cos(bullet.rotation * Math.PI/180)*bullet.speed
        bullet.y += Math.sin(bullet.rotation * Math.PI/180)*bullet.speed

        //turn towards the nearest enemy like a heatseeking bullet
        let nearestenemy = {
            x:Infinity,
            y:Infinity,
        }
        //!NOT WORKING AS EXPECTED (Works good enough as core script)
    /*    enemies.forEach(function(enemy){
            if (Math.hypot(bullet.x-enemy.x, bullet.y-enemy.y) < 
        Math.hypot(bullet.x-nearestenemy.x, bullet.y-nearestenemy.y)) {
            nearestenemy = enemy
        }


        })
        const enemy = nearestenemy
        const angle = Math.atan2(enemy.y-bullet.y, enemy.x-bullet.x)
            
        const turnangle = angle-(bullet.rotation * Math.PI/180)

        bullet.rotation += turnangle*bulletheatseakingstrength * 180/Math.PI
        */
    })
    ammoBoxes.forEach(function(ammoBox){
        //check if the player has collided with an ammo box
        if (player.x + player.width > ammoBox.x && player.x < ammoBox.x + ammoBox.width &&
            player.y + player.height > ammoBox.y && player.y < ammoBox.y + ammoBox.height) {
                if (ammoBox.lifetime <= 0) {
                    bulletammo += ammoBox.amount
            ammoBoxes.splice(ammoBoxes.indexOf(ammoBox), 1)
         
                } else {
                    ammoBox.lifetime -= 1
                }
        }
    })
    powerups.forEach(function (powerup) {
        //check if player has collided with a powerup box
        if (player.x + player.width > powerup.x && player.x < powerup.x + powerup.width &&
            player.y + player.height > powerup.y && player.y < powerup.y + powerup.height) {
                if (powerup.lifetime <= 0) {
                    powerup.effect()
                    powerups.splice(powerups.indexOf(powerup), 1)
                } else {
                    powerup.lifetime -= 1
                }
             

            }
    })
    if (true) {
    items.forEach(function (powerup) {
        //check if player has collided with a powerup box
        if (player.x + player.width*player.grabItemMultiplier > powerup.x && player.x < powerup.x + powerup.width*player.grabItemMultiplier &&
            player.y + player.height*player.grabItemMultiplier > powerup.y && player.y < powerup.y + powerup.height*player.grabItemMultiplier) {
                if (player.holdingItemsAmount < player.maxHoldingItemsAmount && !powerup.touched) {
                powerup.touched = true
             
                player.holdingItemsAmount += powerup.pickupAmount
                }
            }
            if (powerup.touched) {
                //move toward the player
                const dx = player.x - powerup.x
                const dy = player.y - powerup.y
                const distance = Math.hypot(dx,dy)
                
                powerup.velocity.x += dx / distance * distance/100*powerup.speed/10
                powerup.velocity.y += dy / distance * distance/100*powerup.speed/10

                items.forEach((otherItem)=>{
                    if (powerup == otherItem) return
                    //move away if powerup.width > distance from otherItem
                    const dx = otherItem.x - powerup.x
                    const dy = otherItem.y - powerup.y
                    const distance = Math.hypot(dx,dy)

                    if (distance < powerup.width) {
                     
                        powerup.velocity.x -= dx / distance * 10/100
                        powerup.velocity.y -= dy / distance * 10/100
                    }
                })

            } else
            if (powerup.width == 20) {
                items.forEach((otherItem)=>{
                    if (powerup == otherItem) return
                    if (otherItem.width !== 20) return
                    //move towards otherItem if 200 pixels close
                    const dx = otherItem.x - powerup.x
                    const dy = otherItem.y - powerup.y
                    const distance = Math.hypot(dx,dy)
                    if (distance < 300 && distance > 20) {
                        powerup.velocity.x += dx / distance * 10/1000
                        powerup.velocity.y += dy / distance * 10/1000
                    }
                    if (distance < 30) {
                        powerup.velocity.x -= dx / distance * 20/1000
                        powerup.velocity.y -= dy/distance * 20/1000
                    }
                })
            }
            if (powerup.x + powerup.width > homeBase.x && powerup.x < homeBase.x + homeBase.width &&
                powerup.y + powerup.height > homeBase.y && powerup.y < homeBase.y + homeBase.height) {
                    if (powerup.lifetime > 0) {
                        powerup.velocity.x = 0;
                        powerup.velocity.y = 0;
                        powerup.lifetime -= 1
                    } else {
                    player.holdingItemsAmount -= powerup.pickupAmount
                    player.scraps += powerup.value
                    items.splice(items.indexOf(powerup),1)
                    }
                }
              
                
            powerup.x += powerup.velocity.x
            powerup.y += powerup.velocity.y

            powerup.velocity.x *= 0.978
            powerup.velocity.y *= 0.978
    })
}
    oils.forEach(function(oil) {
        //check if player has collided with an oil
        const Bplayer = JSON.parse(JSON.stringify(player))
        Bplayer.width = c.width*1
        Bplayer.height = c.height*1
        Bplayer.x -= Bplayer.width/2
        Bplayer.y -= Bplayer.height/2
        
        if (Bplayer.x + Bplayer.width > oil.x && Bplayer.x < oil.x + oil.width &&
            Bplayer.y + Bplayer.height > oil.y && Bplayer.y < oil.y + oil.height) {
                if (oil.lifetime <= 0) {
                    oils.splice(oils.indexOf(oil),1)
                   
                } else {
                    if (player.fuel <= 100) {
                        player.color = 'rgb(20,20,20)'
                    player.fuel += 1
                    oil.lifetime -= 1
                    }
                }
                oil.tracked = true;
        }
       
    })
    let powerup = homeBase
    if ((player.x + player.width > powerup.x && player.x < powerup.x + powerup.width &&
        player.y + player.height > powerup.y && player.y < powerup.y + powerup.height)){
            if (player.oxygen <= 100) {
            player.oxygen += 1
            }


        }

    const maxVelocity = player.maxSpeed/10

    if (player.velocity.x > maxVelocity) {
        player.velocity.x = maxVelocity
    }
    if (player.velocity.x < -maxVelocity) {
        player.velocity.x = -maxVelocity
    }
    if (player.velocity.y > maxVelocity) {
        player.velocity.y = maxVelocity
    }
    if (player.velocity.y < -maxVelocity) {
        player.velocity.y = -maxVelocity
    }


    player.x += player.velocity.x
    player.y += player.velocity.y

    camera.x = player.x
    camera.y = player.y

}
let enemySpawnRate = 0.005
function enemyGeneration(){
    if (player.timesurvived % 120 < 30) return
    if (enemies.length < 1000) {
    //spawn enemies randomly outside the screen
    if(Math.random() < enemySpawnRate) {
    //spawn enemies outside of the screen
    let x,y;

    const _offsetOutsideScreen = c.width
    //check which side of the screen to spawn outside
    if (Math.random() < 0.25) {
        x = -_offsetOutsideScreen+camera.x-c.width/2
        y = Math.random() * c.height+camera.y-c.height/2
    } else if (Math.random() < 0.5) {
        x = c.width + _offsetOutsideScreen+camera.x-c.width/2
        y = Math.random() * c.height+camera.y-c.height/2
    } else if (Math.random() < 0.75) {
        y = -_offsetOutsideScreen+camera.y-c.height/2
        x = Math.random() * c.width+camera.x-c.width/2
    } else {
        y = c.height + _offsetOutsideScreen+camera.y-c.height/2
        x = Math.random() * c.width+camera.x-c.width/2
    }
    if (player.timesurvived / 120 < 2 || Math.random() < 0.5) {
    enemies.push({
        x,
        y,
        width: 20,
        height: 20,
        color: '#FF6B4A',
        speed: 2,
        lifetime: 300,
        velocity: {
            x: 0,
            y: 0,
        }
    })
} else {
    enemies.push({
        x,
        y,
        width: 20,
        height: 20,
        color: '#1cd2d9',
        speed: 4,
        lifetime: 300,
        velocity: {
            x: 0,
            y: 0,
        }
    })
}
}
}

}
function meteorGeneration(){
    if (meteors.length < 1000) {
        //spawn enemies randomly outside the screen
        if(Math.random() < enemySpawnRate/100) {
        //spawn enemies outside of the screen
        let x,y, vx, vy;
    
        const _offsetOutsideScreen = 32
        //check which side of the screen to spawn outside
        if (Math.random() < 0.25) {
            x = -_offsetOutsideScreen+camera.x-c.width/2
            y = Math.random() * c.height+camera.y-c.height/2
        } else if (Math.random() < 0.5) {
            x = c.width + _offsetOutsideScreen+camera.x-c.width/2
            y = Math.random() * c.height+camera.y-c.height/2
        } else if (Math.random() < 0.75) {
            y = -_offsetOutsideScreen+camera.y-c.height/2
            x = Math.random() * c.width+camera.x-c.width/2
        } else {
            y = c.height + _offsetOutsideScreen+camera.y-c.height/2
            x = Math.random() * c.width+camera.x-c.width/2
        }
        const dx = x - player.x
        const dy = y - player.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        

     
            const angle = Math.atan2(dy, dx)+Math.random()-0.5

            

            
            vx = Math.cos(angle) * -Math.max(Math.random()*20,7)
            vy = Math.sin(angle) * -Math.max(Math.random()*20,7)
        
        meteors.push({
            x,
            y,
            width: 20,
            height: 20,
            color: 'yellow',
            speed: 2,
            lifetime: 300,
            velocity: {
                x: vx,
                y: vy,
            },
            damagedPlayer:false,
        })
        }
    }
}
function itemGeneration(){

if (items.length < spawnSettings.maxItems) {
    for (let i = 0; i < spawnSettings.maxItems-items.length; i++) {

        //spawn powerups randomly in the spaceSize
        const x = Math.random() * spaceSize-spaceSize/2
        const y = Math.random() * spaceSize-spaceSize/2
        items.push({
            x,
            y,
            width: 30,
            height: 30,
            color: `rgb(${Math.random() *255},${Math.random() *255},${Math.random() *255})`,
            speed: 1,
            lifetime: 10,
            value: Math.floor(Math.random() * (50-20)+20),
            touched:false,
            pickupAmount: 10,
            velocity:{
                x:0,
                y:0,
            }
        })
        const newitem = items[items.length-1]
        const dx = homeBase.x - newitem.x
        const dy = homeBase.y - newitem.y
        if (Math.hypot(dx,dy) < 1000) {
          items.splice(items.indexOf(newitem), 1)
        } 
    }
}

}
let spawnSettings = {
    maxOil:42,
    maxItems:2000
}
function oilGeneration() {
 
    const maxOil = spawnSettings.maxOil
    if (oils.length < maxOil) {
        
        for (let i = 0; i < maxOil-oils.length; i++) {
        //spawn oil randomly in the spaceSize
        const x = Math.random() * spaceSize-spaceSize/2
        const y = Math.random() * spaceSize-spaceSize/2
        oils.push({
            x,
            y,
            width: 100,
            height: 100,
            color: 'rgba(155,155,155,0.5)',
            speed: 1,
            lifetime: Math.floor(Math.random()*200)+100,
            collected: false,
            tracked: oils.length<1,
        })
        const newoil = oils[oils.length-1]

        const dx = homeBase.x - newoil.x
        const dy = homeBase.y - newoil.y
        if (Math.hypot(dx,dy) < 1000) {
          oils.splice(oils.indexOf(newoil), 1)
        } 
    }
    }
}
let hitcooldown = 0
let enemySettings = {
    distanceSpeed:600,
    dropItemChance:.1,
    enemySpeed:2,
}
function enemyCalculation(){
    const maxSpeed = 5
    enemies.forEach(function(enemy){
        const dx = player.x - enemy.x
        const dy = player.y - enemy.y
        const distance = Math.sqrt(dx*dx + dy*dy)

        //move faster if far way from player
        enemy.speed = Math.max(distance/(enemySettings.distanceSpeed*Math.max(1,Math.floor(enemies.length/1000))),enemySettings.enemySpeed)
        //delete enemy if colliding with any of the players Bullets
        playerBullets.forEach(function(bullet){
            if(bullet.x > enemy.x - enemy.width && bullet.x < enemy.x + enemy.width && bullet.y > enemy.y - enemy.height && bullet.y < enemy.y + enemy.height){
                playerBullets.splice(playerBullets.indexOf(bullet), 1)
              


                const x = enemy.x + enemy.width/2
                const y = enemy.y + enemy.height/2
                //chance to drop ammo/powerup
                const chance = (Math.random())
                if (chance < enemySettings.dropItemChance) {
                    items.push({
                        x,
                        y,
                        width: 20,
                        height: 20,
                        color: `rgb(${Math.random() *255},${Math.random() *255},${Math.random() *255})`,
                        speed: 1,
                        lifetime: 10,
                        value: Math.floor(Math.random()*(50-20)+20),
                        pickupAmount:2,
                        velocity:{
                            x:0,
                            y:0,
                        }
                    })
                }
                
                enemies.splice(enemies.indexOf(enemy), 1)
            }
        })
     

               //move away from other enemies if there within a certain radius
       
               let inradius = false;
      
               enemies.forEach(function(otherEnemy) {
                   const dx = enemy.x - otherEnemy.x
                   const dy = enemy.y - otherEnemy.y
                   const distance = Math.sqrt(dx * dx + dy * dy)
                   if (otherEnemy!== enemy && distance < enemy.width*2) {
                   inradius = true
                       const angle = Math.atan2(dy, dx)
        
                       
        
                       
                       enemy.velocity.x += Math.cos(angle) * enemy.speed/100
                       enemy.velocity.y += Math.sin(angle) * enemy.speed/100

                       inradius = true;
                   }
                   if (otherEnemy!== enemy && distance < enemy.width) {
                    const angle = Math.atan2(dy, dx)
        
                       
        
                       
                    enemy.x += Math.cos(angle) * enemy.speed
                    enemy.y += Math.sin(angle) * enemy.speed

                    inradius = true;
                   }
               })
            



          

        //move toward player
               if (!inradius) {
                enemy.velocity.x *= 0.99
                enemy.velocity.y *= 0.99
               }
               if (true) {
                const powerup = enemy
                const player = homeBase
                if (player.x + player.width > powerup.x && player.x < powerup.x + powerup.width &&
                    player.y + player.height > powerup.y && player.y < powerup.y + powerup.height) {
                      enemy.speed *= -1
                    }
                 }
      
            if (enemy.velocity.x < maxSpeed && enemy.velocity.x > -maxSpeed) {
            enemy.x += dx / distance * enemy.speed
            }
            if (enemy.velocity.y < maxSpeed && enemy.velocity.y > -maxSpeed) {
            enemy.y += dy / distance * enemy.speed
            }
          
        
           
        //damge player by 15 health points if colliding 

        const powerup = enemy
            if (hitcooldown <= 0) {
        if (player.x + player.width > powerup.x && player.x < powerup.x + powerup.width &&
            player.y + player.height > powerup.y && player.y < powerup.y + powerup.height) {
               player.health -= 15
             
                hitcooldown = 30
            }
        }


     

        


        enemy.x += enemy.velocity.x
        enemy.y += enemy.velocity.y
    })
    hitcooldown--

    if (player.health <= 0) {
        if (document.querySelector('.deathScreen').style.display == 'none') {
            clearInterval(secondTimer)
            if (player.timesurvived > localStorage.getItem('spaceship-highscore')) {
                if (player.health <= 0 && doH) {
            localStorage.setItem('spaceship-highscore',player.timesurvived)
                }
            }
            doH = true;
        }
document.querySelector('.deathScreen').style.display = 'flex'
    } else {
        document.querySelector('.deathScreen').style.display = 'none'
    }
}
function meteorCalculation(){
    meteors.forEach(function(meteor){
       
        //damage player if colliding with player
        if (player.x + player.width > meteor.x && player.x < meteor.x + meteor.width &&
            player.y + player.height > meteor.y && player.y < meteor.y + meteor.height) {
                if (!meteor.damagedPlayer) {
                player.health -= 30
                meteor.damagedPlayer = true
                meteors.splice(meteors.indexOf(meteor),1)
                }

        }

        playerBullets.forEach(function(bullet){
            const enemy = meteor //im too lazy to switch the variable name
            if(bullet.x > enemy.x - enemy.width && bullet.x < enemy.x + enemy.width && bullet.y > enemy.y - enemy.height && bullet.y < enemy.y + enemy.height){
                playerBullets.splice(playerBullets.indexOf(bullet), 1)
              


         
             
                
                meteors.splice(meteors.indexOf(meteor), 1)
            }
        })

            if (Math.hypot(meteor.x - player.x, meteor.y - player.y) > 10000) {
                meteors.splice(meteors.indexOf(meteor), 1)
            }

        meteor.x += meteor.velocity.x
        meteor.y += meteor.velocity.y
   
    })
}
function showPausedUI() {
    document.querySelector('.shopUI').style.display = 'flex'
  
}
function repeat(){
    if (!paused) {
         document.querySelector('.shopUI').style.display = 'none'
   
 
    playerCalculation()
    enemyGeneration()
    enemyCalculation()
    meteorGeneration()
    meteorCalculation()
 
   
    } else {
        showPausedUI()
    }
    render()
    keypressing()
 
    itemGeneration()
    oilGeneration()
    

    requestAnimationFrame(repeat)
}
//*---------------Start
let currentbuyingitems = {
    ammo:0,
    powerup:0,
    cooldownpowerup:0,
    carrypower:0,
}
let paused = true;
const ammoBoxes = []
const powerups = []
const enemies = []
const stars = []
const meteors = []
const items = []


const camera = {
    x: 0,
    y: 0,

}
let player = {
    x: c.width / 2,
    y: c.height/2,
    width: 20*3,
    height: 20*3,
    speed: 20,
    color: 'blue',
    rotation: 0,
    velocity: {
        x: 0,
        y: 0,
    },
    timesurvived:0,
    health: 100,
    scraps:200,
    fuel: 100,
    oxygen:100,
    holdingItemsAmount:0,
    maxHoldingItemsAmount:12*10,
    grabItemMultiplier:3,
    maxSpeed:150,
    shootcooldown:35,
    ammo:100,
}
const oils = []
const homeBase = {
    x:player.x,
    y:player.y,
    width: 64*1.5,
    height: 64*1.5,
    color: 'rgb(144, 238, 144)',

}
const playerBullets = [

]
generateStars()

document.getElementById('buyammo').onclick = ()=>{
        //spawn ammo boxes randomly 500 units away from the player


    currentbuyingitems.ammo += 50
}
document.getElementById('buypowerup').onclick = ()=>{

            currentbuyingitems.powerup += 1
}
document.getElementById('buycooldown').onclick = ()=>{
    
    currentbuyingitems.cooldownpowerup += 1
}
document.getElementById('buycarry').onclick = ()=>{
    currentbuyingitems.carrypower += 3
}
document.querySelector('.cancelBuy').onclick = ()=>{

    currentbuyingitems.ammo = 0
    currentbuyingitems.powerup = 0
    currentbuyingitems.cooldownpowerup = 0
    document.querySelector('.cancelBuy').style.display = 'none'

}
document.querySelector('.finalBuy').onclick = ()=>{
    //dont buy if player cant afford to buy everything
    console.log(player.scraps,currentbuyingitems.ammo + currentbuyingitems.powerup * 200,player.scraps-1 <= currentbuyingitems.ammo + currentbuyingitems.powerup * 200)
    if (player.scraps < currentbuyingitems.ammo + currentbuyingitems.powerup * 200
        +currentbuyingitems.cooldownpowerup*300
        +currentbuyingitems.carrypower * 150/3
    ) {
        document.querySelector('.finalBuy').innerHTML = 'U poor'
        setTimeout(()=>{
            document.querySelector('.finalBuy').innerHTML = 'Purchase'
        },1000)
        return;
    }
    //buy items
    player.scraps -= currentbuyingitems.ammo
    player.scraps -= currentbuyingitems.powerup * 200
    player.scraps -= currentbuyingitems.cooldownpowerup*300
    player.scraps -= currentbuyingitems.carrypower * 150/3

    if (currentbuyingitems.ammo > 0) {
  
        const x = homeBase.x + Math.random() * 1500 - 1500/2
        const y = homeBase.y + Math.random() * 1500 - 1500/2
        ammoBoxes.push({
            x,
            y,
            width: 60,
            height: 60,
            color: 'green',
            speed: 1,
            lifetime: 5,
            amount:currentbuyingitems.ammo
        })
    }
    let powerup = currentbuyingitems.powerup
   if (currentbuyingitems.powerup>0){
                    //spawn powerups randomly 5000 units away from the player
                    const x = homeBase.x + Math.random() * 1500 - 1500/2
                    const y = homeBase.y + Math.random() * 1500- 1500/2
                    powerups.push({
                        x,
                        y,
                        width: 60,
                        height: 60,
                        color: 'orange',
                        speed: 1,
                        lifetime: 5,
                        effect: function() {
                            //add effect to player here
                            shootatonce+= powerup
                         
                        }
                    })
                }
                let cooldownpowerup = currentbuyingitems.cooldownpowerup
            if (currentbuyingitems.cooldownpowerup>0) {
                                    //spawn powerups randomly 5000 units away from the player
                                    const x = homeBase.x + Math.random() * 1500 - 1500/2
                                    const y = homeBase.y + Math.random() * 1500 - 1500/2
                                    powerups.push({
                                        x,
                                        y,
                                        width: 60,
                                        height: 60,
                                        color: 'lightblue',
                                        speed: 1,
                                        lifetime: 5,
                                        effect: function() {
                                            //add effect to player here
                                            toshootcooldown-= cooldownpowerup
                                        }
                                    })
            }
if (currentbuyingitems.carrypower > 0) {
    player.maxHoldingItemsAmount += currentbuyingitems.carrypower*10
}
    currentbuyingitems.ammo = 0
    currentbuyingitems.powerup = 0
    currentbuyingitems.cooldownpowerup = 0
    currentbuyingitems.carrypower = 0


}

//*---------------End
repeat()
let secondTimer = setInterval(()=>{
    if (!paused) {
    player.timesurvived++
    enemySpawnRate += 0.00005
    if (player.health < 100) {
    player.health++;
    }
    if (player.oxygen > 0) {
    player.oxygen -= 0.5
    player.oxygen = Math.max(0, player.oxygen)
    if (player.oxygen <= 0) {
        player.health = 0
    }
} else {
    player.health = 0
}

}

},1000)
function resetEverything(){
    player = {
        x: c.width / 2,
        y: c.height/2,
        width: 20*3,
        height: 20*3,
        speed: 20,
        color: 'blue',
        rotation: 0,
        velocity: {
            x: 0,
            y: 0,
        },
        timesurvived:0,
        health: 100,
        scraps:200,
        fuel: 100,
        oxygen:100,
        holdingItemsAmount:0,
        maxHoldingItemsAmount:12*10,
        grabItemMultiplier:1,
        maxSpeed:150,
        shootcooldown:35,
        ammo:100,
    }
    enemies.length = 0
    meteors.length = 0
    enemySpawnRate = 0.005
    toshootcooldown = 35
    shootatonce = 1
    bulletammo = 100
    oils.length = 0
    items.length = 0;
    enemySettings = {
        distanceSpeed:600,
        dropItemChance:.1,
        enemySpeed:2,
    }
    spawnSettings = {
        maxOil:42,
        maxItems:2000

    }
clearInterval(secondTimer)
    secondTimer = setInterval(()=>{
        if (!paused) {
            player.timesurvived++
            enemySpawnRate += 0.00005
            if (player.health < 100) {
            player.health++;
            }
            if (player.oxygen > 0) {
            player.oxygen -= 0.5
            player.oxygen = Math.max(0, player.oxygen)
            if (player.oxygen <= 0) {
                player.health = 0
            }
        } else {
            player.health = 0
        }
        
        }
    },1000)
    ammoBoxes.length = 0
    powerups.length = 0
    stars.length = 0
    generateStars()

}
resetEverything()
document.querySelector('.playAgainButton').onclick=  ()=>{
    resetEverything()
   }

document.querySelector('#startButton').onclick = ()=>{
    paused = false
    document.querySelector('.startScreen').style.display = 'none'
}
const tips = [
    'Get the oil, you can get your fuel back',
    'Air is valuable, dont lose it',
    'Powerups can help you survive longer',
    'Use ammo to shoot enemies',
    'Use cooldown powerups to shoot faster',
    'The more enemies you kill, the more scraps you get',
    'Be careful, there are fast-moving meteors',
    'Upgrading your multi-shot over 3 will drain your ammo by a lot',
    'You can buy ammo, powerups, and cooldown powerups',
    'Buying ammo will give you extra bullets',
    'Buying cooldown powerups will make you shoot faster',
    'You can buy stuff by clicking on them',
    'You can aim better by clicking on enemies',
    'no tip for u',
    'Read the tips'

]
//pick a random tip and show it

let tipIndex = Math.floor(Math.random()*tips.length)
document.querySelector('.tip').innerHTML = 'Tip: '+tips[tipIndex]

