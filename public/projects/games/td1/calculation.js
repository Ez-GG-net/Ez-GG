const bulletSpeed = 5
    const pathNodes = [{"name":"Unnamed Element 2","width":50,"height":50,"x":360,"y":500,"color":"rgba(0, 255, 0, 1)","alpha":1,"shape":"rect","image":null,"imageName":null},{"name":"Unnamed Element 5","width":120/2,"height":120/2,"x":540,"y":500,"color":"rgba(255, 0, 0, 1)","alpha":1,"shape":"rect","image":null,"imageName":null},{"name":"Unnamed Element 6","width":120/2,"height":120/2,"x":540,"y":200,"color":"rgba(255, 0, 0, 1)","alpha":1,"shape":"rect","image":null,"imageName":null},{"name":"Unnamed Element 8","width":120/2,"height":120/2,"x":360,"y":200,"color":"rgba(255, 0, 0, 1)","alpha":1,"shape":"rect","image":null,"imageName":null}]
function calculateSpawnerPathfinding(){
    // Implement pathfinding algorithm here
spawned.forEach(function(enemy){
    if (enemy.y > targetSize) {
       
        spawned.splice(spawned.indexOf(enemy),1)
    }
    enemies.forEach(actualenemy=>{
        //if enemy is colliding with actual enemy
        if (actualenemy.getCenter().x > enemy.getCenter().x - enemy.width/2 &&
            actualenemy.getCenter().x < enemy.getCenter().x + enemy.width/2 &&
            actualenemy.getCenter().y > enemy.getCenter().y - enemy.height/2 &&
            actualenemy.getCenter().y < enemy.getCenter().y + enemy.height/2) {
                let beforehealth = Number(`${enemy.health}`)
                enemy.health -= actualenemy.health
                actualenemy.health -= beforehealth
                
                //give the player money on how much damage they dealth to actual enemy, but not if it died

                    player.money += beforehealth-Math.max(0,enemy.health)


                if (enemy.health <= 0) {
                    spawned.splice(spawned.indexOf(enemy), 1)
                }
                
                if (actualenemy.health <= 0) {
                    enemies.splice(enemies.indexOf(actualenemy), 1)
                }
                
         
       
                


                
            }
    })
    pathNodes.forEach(function(node, index){
     
    if (Math.round(enemy.getCenter().x) == node.x+25
        && Math.round(enemy.getCenter().y) == node.y+25) {
           
            if (index == 0) {
                enemy.movingDirection  = 90
            }
            if (index == 1) {
                enemy.movingDirection  = 180
            }
            if (index == 2) {
                enemy.movingDirection  = 90
            }
            if (index == 3) {
                enemy.movingDirection  = 0
            }
        }
    
  
})

//make the enemy move in the direction it should
    enemy.x += Math.cos(enemy.movingDirection*Math.PI/180) * enemy.speed
    enemy.y += Math.sin(enemy.movingDirection*Math.PI/180) * enemy.speed



})
}

function calculateEnemyPathfinding(){
enemies.forEach(function(enemy){
    if (enemy.y < -enemy.height) {
        player.health -= enemy.health
        enemies.splice(enemies.indexOf(enemy),1)
    }
    pathNodes.forEach(function(node, index){
     
    if (Math.round(enemy.getCenter().x) == node.x+25
        && Math.round(enemy.getCenter().y) == node.y+25) {
           
            if (index == 0) {
                enemy.movingDirection  = 0
            }
            if (index == 1) {
                enemy.movingDirection  = 270
            }
            if (index == 2) {
                enemy.movingDirection  = 180
            }
            if (index == 3) {
                enemy.movingDirection  = 270
            }
        }
    
  
})
enemy.traveled += enemy.speed*enemy.freezeSpeed;
let voidOrbSpeed = 1;

traps.forEach(trap => {
    if (trap.type !== "orb") return;

    // Calculate distance to trap
    const distanceToTrap = Math.hypot(
        (trap.x) - enemy.getCenter().x
        +Math.cos(enemy.movingDirection*Math.PI/180) * 90, 
        (trap.y) - enemy.getCenter().y
        +Math.sin(enemy.movingDirection*Math.PI/180) * 90
    );

    // Define gravitational zones
    const maxGravityRadius = enemy.width * 5;
    const minGravityRadius = enemy.width * 3;

    // Check if within max gravitational radius
    if (distanceToTrap < maxGravityRadius) {
        // Create a gravitational effect that changes based on distance
        // Closer to trap = more intense gravitational pull
        const gravityIntensity = 1 - (distanceToTrap / maxGravityRadius);

        // Modify voidOrbSpeed based on distance
        if (distanceToTrap < minGravityRadius) {
            // Inside the inner radius - create a negative speed effect (strong pull)
            voidOrbSpeed = -gravityIntensity;
        } else {
            // Outside inner radius but inside max radius - reduce speed
            voidOrbSpeed = 1 - gravityIntensity;
        }
    }
});

if (enemy.stunnedIndex <= 0) {
// Move the enemy in the current direction
enemy.x += Math.cos(enemy.movingDirection*Math.PI/180) * enemy.speed*enemy.freezeSpeed*voidOrbSpeed;
enemy.y += Math.sin(enemy.movingDirection*Math.PI/180) * enemy.speed*enemy.freezeSpeed*voidOrbSpeed;
} else {
    enemy.stunnedIndex--;
}

})
}
function calculateSpawnerAiming(){
    spawned.forEach((tower)=>{
    let firstEnemy = {traveled:0};
    enemies.forEach(function(enemy) {
        if ((enemy.stealth)){
            if (!tower.canhitstealth) return;
        }
        //check if in range
     

        if (Math.hypot(
            (tower.x+tower.width/2)-enemy.getCenter().x,
            (tower.y+tower.height/2)-enemy.getCenter().y
        ) < tower.range*15) {
         
        
        if (enemy.traveled > firstEnemy.traveled) {
            firstEnemy = enemy
        }
    }
    })
    if (firstEnemy.traveled !== 0) {

  
    //make the player look at the enemy
    tower.rotation = 
    Math.atan2(
        tower.getCenter().y-firstEnemy.getCenter().y,
        tower.getCenter().x-firstEnemy.getCenter().x
    ) * 180 / Math.PI-180

    //shoot if cooldownIndex is less than 0
    if (tower.cooldownIndex <= 0) {
       
        tower.cooldownIndex = tower.cooldown
        bullets.push({
            x:tower.x+tower.width/2 + Math.cos(tower.rotation*Math.PI/180),
            y:tower.y+tower.height/2 + Math.sin(tower.rotation*Math.PI/180),
            width:15,
            height:5,
            //distance between the enemy and the tower center
            lifetime:/*Math.hypot(
             (tower.x+tower.width/2)-firstEnemy.x,
             (tower.y+tower.height/2)-firstEnemy.y
            )/bulletSpeed*/0,
            rotation:tower.rotation,
            target:firstEnemy,
            damage:tower.damage,
            source:tower
        })
    }
} else {
    tower.rotation = tower.movingDirection
}
    tower.cooldownIndex -= 1
})
}
function calculateTraps(){
    traps.forEach((trap)=>{
        if (trap.lived >= trap.lifetime) {
            traps.splice(traps.indexOf(trap),1)
            return
        }
        trap.lived++
        //move toward its target
        
        //return if the distance is less than its speed
        if (Math.hypot(
            trap.x-trap.target.x,
            trap.y-trap.target.y
        ) < trap.speed) {
         
        } else {

        //get the angle to move toward its target
        let angle = -Math.atan2(
            trap.y-trap.target.y,
            trap.x-trap.target.x
        ) * 180 / Math.PI

        trap.x -= Math.cos(angle*Math.PI/180) * trap.speed
        trap.y += Math.sin(angle*Math.PI/180) * trap.speed
    }

        enemies.forEach(function(enemy) {
            //check if the enemy is colliding with the trap
            if (Math.hypot(
                (trap.x) - enemy.getCenter().x,
                (trap.y) - enemy.getCenter().y
            ) < (enemy.width+trap.width)) {
                if (trap.type !== 'orb') {
                enemy.health -= trap.damage
                traps.splice(traps.indexOf(trap),1)
                } else {
                    enemy.health -= trap.damage
                 
                }
                if (enemy.health <= 0) {
                    enemies.splice(enemies.indexOf(enemy),1)
                }
                return;
            }
        })

    })
}
function calculateTowerAiming() {
    towers.forEach(function(tower){
        if (tower.type !== "jabber" && tower.type !== "spawner") {
    let firstEnemy = {traveled:0};
    enemies.forEach(function(enemy) {
        if ((enemy.stealth)){
            if (!tower.canhitstealth) return;
        }
        //check if in range
     

        if (Math.hypot(
            (tower.x+tower.width/2)-enemy.getCenter().x,
            (tower.y+tower.height/2)-enemy.getCenter().y
        ) < tower.range*15) {
         
        
        if (enemy.traveled > firstEnemy.traveled) {
            firstEnemy = enemy
        }
    }
    })
    if (firstEnemy.traveled !== 0) {
  
    //make the player look at the enemy
    tower.rotation = 
    Math.atan2(
        tower.y-firstEnemy.getCenter().y,
        tower.x-firstEnemy.getCenter().x
    ) * 180 / Math.PI-180

    //shoot if cooldownIndex is less than 0
    if (tower.cooldownIndex <= 0) {
        tower.cooldownIndex = tower.cooldown
    
       
       
        bullets.push({
            x:tower.x+tower.width/2 + Math.cos(tower.rotation*Math.PI/180),
            y:tower.y+tower.height/2 + Math.sin(tower.rotation*Math.PI/180),
            width:15,
            height:5,
            //distance between the enemy and the tower center
            lifetime:/*Math.hypot(
             (tower.x+tower.width/2)-firstEnemy.x,
             (tower.y+tower.height/2)-firstEnemy.y
            )/bulletSpeed*/0,
            rotation:tower.rotation,
            target:firstEnemy,
            damage:tower.damage,
            source:tower
        })
    
       
    }
}
    tower.cooldownIndex -= 1
} else if (tower.type == 'jabber'){
    //jabber tower shoots a projectile at all enemies in range
  


let inRangeEnemies = []
    enemies.forEach(function(enemy){
        if ((enemy.stealth)){
            if (!tower.canhitstealth) return;
        }
        if (Math.hypot(
            (tower.x+tower.width/2)-enemy.getCenter().x,
            (tower.y+tower.height/2)-enemy.getCenter().y
        ) < tower.range*15) {
            if (tower.cooldownIndex <= 0) {
                inRangeEnemies.push(enemy)
            
    bullets.push({
        x:tower.x+tower.width/2 + Math.cos(tower.rotation*Math.PI/180),
        y:tower.y+tower.height/2 + Math.sin(tower.rotation*Math.PI/180),
        width:15,
        height:5,
        //distance between the enemy and the tower center
        lifetime:/*Math.hypot(
         (tower.x+tower.width/2)-enemy.x,
         (tower.y+tower.height/2)-enemy.y
        )/bulletSpeed*/0,
        rotation:tower.rotation,
        target:enemy,
        damage:tower.damage,
        source:tower
    })
 
}
    }
})
if (inRangeEnemies.length > 0) {
    tower.cooldownIndex = tower.cooldown
}


    

    tower.cooldownIndex -= 1
} else if (tower.type == 'spawner'){
    tower.special.tospawn.forEach(spawner=>{
        if (spawner.intervalIndex >= spawner.interval) {
            CsetTimeout(()=>{
        spawned.push({
            x:375,
            y:-spawner.height,
            width:spawner.width,
            height:spawner.height,
           color: spawner.color,
            movingDirection:90,//degrees
            traveled:0,
            speed:spawner.speed,
            health:spawner.health,
            maxhealth:spawner.health,

            range:spawner.range,
            damage:spawner.damage,
            canhitstealth:false,
            cooldown:spawner.cooldown,
            cooldownIndex:0,
            rotation:0,

            name:spawner.name,
            splashTick:0,
            splashTickRadius:spawner.splashRadius,
            special: {
                splashRadius:spawner.splashRadius,
            },

            
        
            getCenter:function(){
              
                return {
                    x:this.x + this.width/2,
                    y:this.y + this.height/2
                }
             
            }
        })
    },Math.random()*tower.special.tospawn.length*10)
        spawner.intervalIndex = 0
    
        }
        spawner.intervalIndex += 1.5;
    })
}
})
}

function calculateBulletMoving(){
    bullets.forEach(function(bullet){
        //move forward from rotation
        bullet.x += Math.cos(bullet.rotation*Math.PI/180) * bulletSpeed
        bullet.y += Math.sin(bullet.rotation*Math.PI/180) * bulletSpeed
        
        bullet.lifetime--;

        //delete bullets when lifetime is less than 0
        
        function isPointCollidingWithObject(pointX, pointY, obj) {
            return (
              pointX >= obj.x &&               // Point is to the right of the left edge
              pointX  <= obj.x + obj.width &&   // Point is to the left of the right edge
              pointY >= obj.y &&               // Point is below the top edge
              pointY <= obj.y + obj.height     // Point is above the bottom edge
            );
          }
          

        if (bullet.lifetime <= 0) {
            if (bullet.source.type === 'grenade' ||
            (  bullet.source.type == 'taser' && bullet.source.upgraded[1] == 5)
            || (bullet.source.name == 'Tank Level 1' || bullet.source.name == 'Tank Level 2' || bullet.source.name == 'Tank Level 3')
            || (bullet.source.type == 'bombilary')
            ) {
          
                enemies[enemies.indexOf(bullet.target)].splashTick = 200
                enemies[enemies.indexOf(bullet.target)].splashTickRadius = bullet.source.special.splashRadius
                //damage all enemies within bullet.source.type.specialattributes.splashRadius
                enemies.forEach(function(enemy){
                    if (enemy == bullet.target) return
                    if (Math.hypot(
                        (enemies[enemies.indexOf(bullet.target)].getCenter().x)-enemy.getCenter().x,
                        (enemies[enemies.indexOf(bullet.target)].getCenter().y)-enemy.getCenter().y
                    ) <= bullet.source.special.splashRadius*10) {
                       
                        let beforehealth = enemy.health
                        if (bullet.source.type === 'grenade' ||
                            (  bullet.source.type == 'taser' && bullet.source.upgraded[1] == 5)
                            || (bullet.source.name == 'Tank Level 1' || bullet.source.name == 'Tank Level 2' || bullet.source.name == 'Tank Level 3')
                            || (bullet.source.type == 'bombilary')
                            ) {
                                enemy.health -= bullet.damage*(1-(enemy.immunes?enemy.immunes.explosion?enemy.immunes.explosion:0:0))
                            } else {
                            enemy.health -= bullet.damage
                            }
                        player.money += beforehealth-Math.max(0,enemy.health)

                        enemy.damagedTick = 200 
                      
                      
                        if (enemy.health <= 0) {
                   
           
                            enemies.splice(enemies.indexOf(enemy), 1)
                           
                        }
                        
                      
                    }
                    })
                   
                   
            }
       ////  console.log(enemies[enemies.indexOf(bullet.target)].health)
       if (enemies[enemies.indexOf(bullet.target)]) {
        let beforehealth = enemies[enemies.indexOf(bullet.target)].health
        if (bullet.source.type === 'grenade' ||
            (  bullet.source.type == 'taser' && bullet.source.upgraded[1] == 5)
            || (bullet.source.name == 'Tank Level 1' || bullet.source.name == 'Tank Level 2' || bullet.source.name == 'Tank Level 3')
            || (bullet.source.type == 'bombilary')
            ) {
                enemies[enemies.indexOf(bullet.target)].health -= bullet.damage*(1-(enemies[enemies.indexOf(bullet.target)].immunes?enemies[enemies.indexOf(bullet.target)].immunes.explosion?enemies[enemies.indexOf(bullet.target)].immunes.explosion:0:0))

              
            } else {
                if (bullet.source.type !== 'taser') {
            enemies[enemies.indexOf(bullet.target)].health -= bullet.damage*(1-(enemies[enemies.indexOf(bullet.target)].immunes?enemies[enemies.indexOf(bullet.target)].immunes.bullet?enemies[enemies.indexOf(bullet.target)].immunes.bullet:0:0))
                } else {
                    enemies[enemies.indexOf(bullet.target)].health -= bullet.damage*(1-(enemies[enemies.indexOf(bullet.target)].immunes?enemies[enemies.indexOf(bullet.target)].immunes.electric?enemies[enemies.indexOf(bullet.target)].immunes.electric:0:0))
                }
            }
            if (bullet.source.type == 'freeze') {
                enemies.forEach(function(enemy){
                    if (enemy == bullet.target) return
                    if (Math.hypot(
                        (enemies[enemies.indexOf(bullet.target)].getCenter().x)-enemy.getCenter().x,
                        (enemies[enemies.indexOf(bullet.target)].getCenter().y)-enemy.getCenter().y
                    ) <= 10) {
                        enemy.freezeSpeed -=

                        bullet.source.special.freezeSpeedAmount/(
                            1-(!enemy.immunes?
                            0:
                            enemy.immunes.freeze?
                            enemy.immunes.freeze
                            :0))==Infinity?1:
                             bullet.source.special.freezeSpeedAmount/(1-(!enemy.immunes?
                            0:
                            enemy.immunes.freeze?
                            enemy.immunes.freeze
                            :0))/enemy.freezeResistance/2
        
                            
        
                               enemy.freezeSpeed = Math.max(0,   enemy.freezeSpeed)
                        
            
                        enemy.freezeDuration = bullet.source.special.freezeDuration
                    }
                })
                
                enemies[enemies.indexOf(bullet.target)].freezeSpeed -=

                bullet.source.special.freezeSpeedAmount/(
                    1-(!enemies[enemies.indexOf(bullet.target)].immunes?
                    0:
                    enemies[enemies.indexOf(bullet.target)].immunes.freeze?
                    enemies[enemies.indexOf(bullet.target)].immunes.freeze
                    :0))==Infinity?1:
                     bullet.source.special.freezeSpeedAmount/(1-(!enemies[enemies.indexOf(bullet.target)].immunes?
                    0:
                    enemies[enemies.indexOf(bullet.target)].immunes.freeze?
                    enemies[enemies.indexOf(bullet.target)].immunes.freeze
                    :0))/enemies[enemies.indexOf(bullet.target)].freezeResistance

                    

                       enemies[enemies.indexOf(bullet.target)].freezeSpeed = Math.max(0,   enemies[enemies.indexOf(bullet.target)].freezeSpeed)
                
    
                enemies[enemies.indexOf(bullet.target)].freezeDuration = bullet.source.special.freezeDuration
            }
            
            player.money += beforehealth-Math.max(0,enemies[enemies.indexOf(bullet.target)].health)

            enemies[enemies.indexOf(bullet.target)].damagedTick = 200 

            if (bullet.target.health <= 0) {
                todieenemies.push(   enemies[enemies.indexOf(bullet.target)])
            enemies.splice(enemies.indexOf(bullet.target), 1)
            }

            bullets.splice(bullets.indexOf(bullet),1)
            

          
        }
     
        }

        //delete bullet if off screen
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(bullets.indexOf(bullet),1)
        }
       
    })
}
function animateAddingMoney(amount) {
    player.money += waveBonuses[player.wave-1]
    const addingMoney = document.querySelector('#addingMoney');

    // Set initial state for animation
    addingMoney.textContent = `+${amount}`;
    addingMoney.style.opacity = '1'; // Make it visible
    addingMoney.style.transform = 'translateX(-10px)'; // Start position

    // Trigger the animation (move to the left and fade out)


    // Clean up after animation
    CsetTimeout(() => {
  
        addingMoney.style.transform = 'translateX(-15px)'; // Reset position
        addingMoney.style.opacity = '0'; // Make it invisible
        CsetTimeout(() => {
            addingMoney.textContent = ''; // Clear the text after animation
           addingMoney.style.transform = 'translateX(-20px)'; // Reset position
        },1500)
    }, 2010); // Match the CSS transition duration (500ms + 10ms delay)
}
function checkIfWaveCompleted(){
   
    if (enemies.length == 0) {
        canstartnextwave = true;
     
        console.log("Wave completed!")
        document.querySelector('.waveBonus').style.display = 'block'
        document.querySelector('#waveBonusNumb').innerHTML = `+$${waveBonuses[player.wave-1]}`
        CsetTimeout(function(){
            document.querySelector('.waveBonus').style.opacity = '1'
           
        },100)
        animateAddingMoney(waveBonuses[player.wave-1])
        if (waves.length <= player.wave) {
            alert("Completed All Waves!")
        } else {
            console.log("Starting Next Wave")
            player.wave++


        }
         
        CsetTimeout(function(){
            document.querySelector('.waveBonus').style.opacity = '0'
            CsetTimeout(function(){
                document.querySelector('.waveBonus').style.display = 'none'
            },500)

            playerMoneyLastWave = player.money
            
            towersLastWave = towers

            playerHealthLastWave = player.health
        loadWave(player.wave-1)
        },4000/_speedMultiplier)
    }
}
function calculateAbility(){
 towers.forEach(function
 (tower){
    if (tower.ability) {
        tower.ability.cooldownIndex-= 1.5
    }
 })   
if (player.selectedTower !== null) {
 if (towers[player.selectedTower].ability) {
   
    document.querySelector(".ability-icon").style.display = "flex";
    if (towers[player.selectedTower].ability.cooldownIndex > 0) {
    document.querySelector(".ability-icon .cooldownNumb").innerHTML = `${Math.floor(towers[player.selectedTower].ability.cooldownIndex/1000*10)/10}s`
    document.querySelector(".ability-icon .cooldown").style.display = "flex"
    } else {
        document.querySelector(".ability-icon .cooldown").style.display = "none"
    }

    if (towers[player.selectedTower].ability.cooldownIndex >= towers[player.selectedTower].ability.cooldown) {
        towers[player.selectedTower].ability.cooldownIndex = towers[player.selectedTower].ability.cooldown
        if (towers[player.selectedTower].ability.name == 'blackhole') {
           spawnBlackHole(towers[player.selectedTower])
        } else if (towers[player.selectedTower].ability.name == 'stun') {
            stunAll(towers[player.selectedTower])
        }
    }
   
} else {
    document.querySelector(".ability-icon").style.display = "none";
}
}
}
function calculate(){
    for (let i = 0; i < 3*_speedMultiplier; i++) {

        enemies.forEach(function(enemy){
        if (enemy.damagedTick === undefined) {
            enemy.damagedTick = 0;
        } else {
            enemy.damagedTick--
        }
        if (enemy.splashTick === undefined) {
           enemy.splashTick = 0;
        } else {
           enemy.splashTick--
        }
        if (enemy.splashTickRadius === undefined) { 
            enemy.splashTickRadius = 0;
        } 


        if (enemy.freezeDuration > 0) {
            enemy.freezeDuration--

        } else {
            if (enemy.freezeSpeed < 1) {
                enemy.freezeSpeed += 0.001
            } else {
                enemy.freezeSpeed = 1
            }
        }

        if (enemy.stunnedIndex === undefined) {
            enemy.stunnedIndex = 0;
        } 
       
    })
    calculateSpawnerPathfinding()
    calculateEnemyPathfinding()
    calculateTowerAiming()
    calculateSpawnerAiming()
    calculateBulletMoving()
    calculateTraps()
    calculateAbility()

    calculateSpecialEnemies()
    

    if (!runningwave && !canstartnextwave) {
        checkIfWaveCompleted()
    }


    todieenemies.forEach(function(enemy){
        enemy.splashTick--
    })


    if (player.placingTower !== null) {
        let width = 40
        let height = 40

        if (player.placingTower === 7) {
            width = 60-7
            height = 60-7
        }
        
        checkIfPlacement({
            x:mouse.x/scale-width/2,
            y:mouse.y/scale-height/2,
            width:width,
            height:height,
        })
    }
    }
    
    
   
 
}
CsetInterval(calculate,1)

