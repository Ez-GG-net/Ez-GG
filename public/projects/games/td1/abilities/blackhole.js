function spawnBlackHole(tower){
    console.log(tower)
    let firstEnemy = {health:0};
    enemies.forEach(function(enemy) {
     
        //check if in range
     

    
         
        
        if (enemy.health > firstEnemy.health) {
            firstEnemy = enemy
        }
    
    })
    console.log(firstEnemy)
    if (firstEnemy.health !== 0) {
  
        //spawns a trap at its location that gradually moves to the firstEnemy position and stops
        traps.push({
            x: tower.x+tower.width/2,
            y: tower.y+tower.height/2,
            width: 35,
            height: 35,
            target: firstEnemy.getCenter(),
            speed: 4,
            lifetime:tower.special.orbduration, //3000,
            lived:0,
            damage:tower.special.orbdamage,
            type:'orb',
            color:'black'
        })
    
}
    tower.cooldownIndex -= 1
}