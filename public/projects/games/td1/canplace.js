function checkIfPlacement(tower){
    
    canplacehere = true;

    paths.forEach(function(rect){
        //check if colliding
        const circle = {
            x:tower.x+tower.width/2,
            y:tower.y+tower.height/2,
            radius:(tower.width/2)/1.5
        }

        
            // Find the closest point on the rectangle to the circle's center
            const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
            const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
        
            // Calculate the distance between the circle's center and this closest point
            const dx = closestX - circle.x;
            const dy = closestY - circle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
        
            // Check if the closest point is inside the circle
            if (distance < circle.radius) {
                canplacehere = false;
            }

            //draw a circle around the closestX and Y coordinates
            //*This is only needed for debugging purposes
            //*Stil cool though
          /*  ctx.fillStyle = 'black'
             ctx.beginPath();
             ctx.arc(closestX*scale, closestY*scale, 4, 0, 2 * Math.PI);
             ctx.fill();*/
    })
    if (!canplacehere) return

    towers.forEach(othertower=>{
        let otower = JSON.parse(JSON.stringify(othertower))
        if (othertower.type == 'voidblaster') {
            otower.width-=7*2
            otower.height-=7*2
        }
        
        if (Math.hypot(
            (tower.x+tower.width/2)-(otower.x+otower.width/2),
            (tower.y+tower.height/2)-(otower.y+otower.height/2)
        ) < (tower.width+otower.width)-20
        ) {
            canplacehere = false
        }
    })
    
}