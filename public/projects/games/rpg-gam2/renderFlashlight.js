function renderPlayerSight() {
    function drawFlashlight(ctx, player, angle, walls, renderCallback) {
        // Flashlight properties
        const spread = 90 * Math.PI / 180;
        const rayCount = 200;
        const maxDist = 700;
        const halfSpread = spread / 2;
        const spreadIncrement = (spread / rayCount);
        
        // Prepare the light cone mask
        ctx.save();
   //   ctx.translate(c.width / 2, c.height / 2);

        // Start a new path for the light cone
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);

        // Cast rays in an arc
        for (let i = 0; i <= rayCount; i++) {
            const rayAngle = angle - halfSpread + (spreadIncrement * i);
            const endPoint = castRay(player, rayAngle, walls, maxDist);
            ctx.lineTo(endPoint.x, endPoint.y);
        }

        // Create clipping mask and draw the light effect
        ctx.clip();
        ctx.fillStyle = "rgba(11, 25, 44, 0.5)";
        ctx.fill();

        // Render visible objects
        renderCallback();
        

        // Restore context
        ctx.restore();
    }

    function castRay(start, angle, walls, maxDist) {
        let rayX = start.x;
        let rayY = start.y;
        let distance = 0;
        const stepX = Math.cos(angle);
        const stepY = Math.sin(angle);
        
        const endPoint = { x: start.x, y: start.y };

        while (distance < maxDist) {
            rayX += stepX;
            rayY += stepY;
            distance += 1;

            // Check collision with each wall
            for (const wall of walls) {
                //return true if walls is outside ray maxDist
           //     if (Math.hypot(walls.x-player.x, player.y-walls.y)>maxDist) return false;
                
          


                if (rayX >= wall.x &&
                    rayX <= wall.x + wall.width &&
                    rayY >= wall.y &&
                    rayY <= wall.y + wall.height) {
                    endPoint.x = rayX + stepX * 2;
                    endPoint.y = rayY + stepY * 2;
                    return endPoint;
                }
            }
        }

        // Return max distance if no collision
        endPoint.x = start.x + stepX * maxDist;
        endPoint.y = start.y + stepY * maxDist;
        return endPoint;
    }


    //render
    ctx.save()
    ctx.clearRect(0, 0, c.width, c.height)
          //Move corrisponding to the camera
          ctx.translate(-camera.x, -camera.y)


      

  
    renderObject(player)

    drawFlashlight(ctx, {
        x:player.x+player.width/2+Math.cos(player.rotation*Math.PI/180)*-15,
        y:player.y+player.height/2+Math.sin(player.rotation*Math.PI/180)*-15
    }, player.rotation*Math.PI/180, objects, () => {
        render()
        renderObject(player)
        npcs.forEach(renderObject)
        furniture.forEach(renderObject)
          objects.forEach(renderObject)
          //drawGrapple(ctx)
    });
    ctx.restore()

   requestAnimationFrame(()=>requestAnimationFrame(renderPlayerSight))
}