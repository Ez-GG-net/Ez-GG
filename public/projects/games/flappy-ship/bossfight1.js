let bossOffset = 0;
const boss1 = {
    health: 1000,
    width:120,
    height:120,
    color:`#222`,
    recentlyDamaged: 10,
    x:c.width-120*1.5,
    y:c.height/2-120/2,
    attackCooldown:0,
}
const bullets = []
const gun = {
    color:`#111`,
    damage: 50,
    speed: 15,
    width: 25,
    height: 10
}
const bossAttacks = []
function renderBullets(){
    bullets.forEach(bullet=>{
        ctx.fillStyle = bullet.color
        ctx.fillRect(bullet.x, bullet.y, 15, 5)
    })
}
function shootGun(){
    const bullet = {
        x: player.x + player.width/2,
        y: player.y + player.height/2,
        width: 15,
        height: 5,
        color: 'red',
        speed: 20,
    }
    bullets.push(bullet)
    
}
let shootCooldown = 0
let shootCooldownDuration = 10
function calculateShootGun(){
    if (shootCooldown > 0) {
        shootCooldown -= 1
    }
    if (shootCooldown <= 0 && player.hasgun) {
        shootGun()
        shootCooldown = shootCooldownDuration
    }
}
function calculateBullets(){
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed
        if (bullet.x > c.width || bullet.x < 0) {
            bullets.splice(index, 1)
        }
        if (bullet.y > c.height || bullet.y < 0) {
            bullets.splice(index, 1)
        }
        //if it collides with boss1
        if (
            bullet.x + bullet.width > boss1.x &&  // Bullet's right side passes boss's left side
            bullet.x < boss1.x + boss1.width &&   // Bullet's left side passes boss's right side
            bullet.y + bullet.height > boss1.y && // Bullet's bottom passes boss's top side
            bullet.y < boss1.y + boss1.height     // Bullet's top passes boss's bottom side
        ) 
         {
            boss1.health -= gun.damage;
            bullets.splice(index, 1);
            boss1.recentlyDamaged = 10;

         
        }
        
        
    })

}

let boss1Running = false;
function calculateBoss1(){

    bossAttacks.forEach((bossAttack,index)=>{
        bossAttack.x -= 7
        if (bossAttack.x > c.width || bossAttack.x < 0) {
            bossAttacks.splice(index, 1)
        }
        if (bossAttack.y > c.height || bossAttack.y < 0) {
            bossAttacks.splice(index, 1)
        }
    })

    
    if (!boss1Running) return

    if (boss1.recentlyDamaged > 0) {
    boss1.recentlyDamaged -= 1
    }
console.log(boss1.health)

    if (boss1.health <= 0) {
        document.getElementById("healthbar").style.display = "none"
       if (!player.hasgun) return;
        player.hasgun = false;
        (async () => {
        
            document.getElementById("warningBoss").style.display = 'none'
        
            for (let i = 0; i < 100; i++){
                bossOffset += 5
               // console.log(bossOffset)
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                    }, 10)
                })
            }
            bossOffset = 0;
            boss1Running = false;
            player.score += 1;
            spawnedWalls += 1;
            spawnWalls = true;
            addRandomPositionWall()
        })()
    }


    //if the player touches the bottom or top wall
    if (player.y < 30 || player.y + player.height > c.height-30) {
        player.dead = true;
    }
    //if the player touches any boss attacks
    if (bossAttacks.some(attack=>
        attack.x + attack.width > player.x &&
        attack.x < player.x + player.width &&
        attack.y + attack.height > player.y &&
        attack.y < player.y + player.height
    )) {
        player.dead = true;
    }


    if (boss1.attackCooldown > 0) {
        boss1.attackCooldown-= 1;
    } else {
        if (boss1.health <= 0) return
        boss1.attackCooldown = Math.floor(Math.random()*2)+17

        if (Math.round(Math.random()*3)===0) {
        bossAttacks.push({
            color:'yellow',
            x:c.width,
            y:player.y + (Math.random()*10-20),
            width:15,
            height:15,
        })} else {
        bossAttacks.push({
            color:'yellow',
            x:c.width,
            y:Math.random() * c.height,
            width:15,
            height:15,
        })
    }
    }



   //console.log(boss1.recentlyDamaged)
}
function renderWarningAnimation(){
    
    bossOffset = 0;
    document.getElementById("warningBoss").style.display = 'block'
  
    console.log("Warning")
    setTimeout(async () => {
        boss1Running = true;
                  document.getElementById("healthbar").style.display = "block"
        console.log("Warning Animation done")
        document.getElementById("warningBoss").style.display = 'none'
        if (!player.hasgun) return
        for (let i = 0; i < 100; i++){
            bossOffset -= 5
            document.getElementById("healthbar").style.width = `calc(${i}% - 20px*2)`
            boss1.health = 10000;
        ////    console.log(bossOffset)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 10)
            })
        }
     
    },3000)
}
function renderGun(){
    if (player.hasgun) {
    ctx.fillStyle = gun.color
    ctx.fillRect(player.x + player.width - gun.width/2, player.y +player.height/1.2 - gun.height/2, gun.width, gun.height)
    }
    if (gunWall) {
        ctx.fillStyle = gun.color
        ctx.fillRect(gunWall.x + gunWall.width/2 - gun.width/2, gunWall.y + gunWall.height + pipeGapSize - gun.height/2, gun.width, gun.height)
    }
}
const boss1Image = new Image()

boss1Image.src = './images/boss1.png'
function renderBossfight1(){

    if (!boss1Running) return
    //render at middle-right
    ctx.fillStyle = '#111'
    ctx.fillRect(boss1.x+(500+bossOffset)-5, boss1.y-5, boss1.width+10, boss1.height+10)
    //ctx.drawImage(boss1Image, boss1.x+(500+bossOffset), boss1.y, boss1.width, boss1.height)

    if (boss1.recentlyDamaged >= 0) {
        ctx.fillStyle = `rgba(255,0,0,${boss1.recentlyDamaged/10})`
        ctx.fillRect(boss1.x+(500+bossOffset), boss1.y, boss1.width, boss1.height)

    }

    //render health
      document.getElementById("healthbar").style.width = `calc(${boss1.health/10000*100}% - 20px*2)`

      
      //render top and bottom ground spikes
      ctx.fillStyle = '#000'
      ctx.fillRect(0,0,c.width/((bossOffset==0?100000:-500/bossOffset)),30)
      ctx.fillRect(0,c.height-30,c.width/((bossOffset==0?100000:-500/bossOffset)),30)
}
function renderBossAttacks(){
       
       bossAttacks.forEach(bossAttack=>{
        ctx.fillStyle = bossAttack.color
       ctx.fillRect(bossAttack.x,bossAttack.y,bossAttack.width,bossAttack.height)
       })
}


