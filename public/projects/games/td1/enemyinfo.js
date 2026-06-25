function showEnemyInfo(){
    function isPointCollidingWithObject(pointX, pointY, obj) {
        return (
          pointX >= obj.x &&               // Point is to the right of the left edge
          pointX  <= obj.x + obj.width &&   // Point is to the left of the right edge
          pointY >= obj.y &&               // Point is below the top edge
          pointY <= obj.y + obj.height     // Point is above the bottom edge
        );
      }
      let showinghealth = false
    enemies.forEach(function(enemy){
        
        if (isPointCollidingWithObject(mouse.x/scale,mouse.y/scale, enemy)) {
            showinghealth = true
            const healthElement = document.querySelector('.enemy-health');
            healthElement.style.display = 'block';
            healthElement.style.left = `calc(${enemy.x*scale-35}px + 20%)`;
            healthElement.style.top = `${enemy.y*scale-35}px`;

            document.querySelector('.enemy-health .name').innerHTML = enemy.type.toUpperCase()
            document.querySelector('.enemy-health .value').innerHTML = `${$formatNumber(enemy.health)}/${$formatNumber(enemy.maxhealth)}`;

            document.querySelector('.enemy-immunes').innerHTML = ''
            if (enemy.immunes) {
           if (enemy.immunes.explosion !== undefined) {
      
            document.querySelector('.enemy-immunes').innerHTML += `<i class="fa-solid fa-bomb"></i> ${enemy.immunes.explosion*100}%`
           }
           if (enemy.immunes.freeze !== undefined) {
             document.querySelector('.enemy-immunes').innerHTML += `<i class="fa-solid fa-snowflake"></i> ${enemy.immunes.freeze*100}%`
           }
           if (enemy.immunes.bullet !== undefined) {
             document.querySelector('.enemy-immunes').innerHTML += `<i class="fa-solid fa-gun"></i> ${enemy.immunes.bullet*100}%`
           }
           if (enemy.immunes.electric !== undefined) {
             document.querySelector('.enemy-immunes').innerHTML += `<i class="fa-solid fa-bolt"></i> ${enemy.immunes.electric*100}%`
           }
        }
        if (enemy.freezeSpeed < 1) {
          document.querySelector('.enemy-immunes').innerHTML += `<i class="fa-regular fa-cube"></i>Frozen: ${(1-enemy.freezeSpeed)*100}%`
        }
        } 
    })
    if (!showinghealth) {
        const healthElement = document.querySelector('.enemy-health');
        healthElement.style.display = 'none';
    }
}