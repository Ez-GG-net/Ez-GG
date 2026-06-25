function showSpawnedInfo(){
    function isPointCollidingWithObject(pointX, pointY, obj) {
        return (
          pointX >= obj.x &&               // Point is to the right of the left edge
          pointX  <= obj.x + obj.width &&   // Point is to the left of the right edge
          pointY >= obj.y &&               // Point is below the top edge
          pointY <= obj.y + obj.height     // Point is above the bottom edge
        );
      }
      let showinghealth = false
    spawned.forEach(function(enemy){
        
        if (isPointCollidingWithObject(mouse.x/scale,mouse.y/scale, enemy)) {
            showinghealth = true
            const healthElement = document.querySelector('.enemy-health');
            healthElement.style.display = 'block';
            healthElement.style.left = `calc(${enemy.x*scale-35}px + 20%)`;
            healthElement.style.top = `${enemy.y*scale-35}px`;

            document.querySelector('.enemy-health .value').innerHTML = `${$formatNumber(enemy.health)}/${$formatNumber(enemy.maxhealth)}`;

             //render range
    const selectedTower = enemy
    ctx.save()
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(
        (selectedTower.x+selectedTower.width/2)*scale,
         (selectedTower.y+selectedTower.height/2)*scale,
          (selectedTower.range*15)*scale, 0, 2 * Math.PI
        );
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 4;
    ctx.fillStyle = 'rgba(255, 255, 255,0.3)';
    //ctx.fill()


ctx.closePath();
ctx.stroke();
ctx.restore()
    
        } 
    })
    
}