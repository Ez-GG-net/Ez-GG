function WASDArrowMovement() {
    if (document.getElementById("dialogueBox").style.display !== 'block') {
    if (key.w || key.ArrowUp) {
        player.velocity.y -= (player.speed*(player.sprinting?1.5:1)) / 100;
    }
    if (key.s || key.ArrowDown) {
        player.velocity.y += (player.speed*(player.sprinting?1.5:1)) / 100;
    }
    if (key.a || key.ArrowLeft) {
        player.velocity.x -= (player.speed*(player.sprinting?1.5:1)) / 100;
    }
    if (key.d || key.ArrowRight) {
        player.velocity.x += (player.speed*(player.sprinting?1.5:1)) / 100;
    }
    player.sprinting = key[' ']
}

    let nextX = player.x + player.velocity.x;
    let nextY = player.y + player.velocity.y;

    // Separate collision check for X and Y to allow sliding
    if (!checkCollision(nextX, player.y)) {
        player.x = nextX;
   
    } else {
        player.velocity.x *= -0.3; // Stop movement in X direction on collision
    }

    if (!checkCollision(player.x, nextY)) {
        player.y = nextY;
    } else {
        player.velocity.y *= 0.3; // Stop movement in Y direction on collision
    }
}

// Collision detection function
function checkCollision(x, y) {
    for (let obj of objects) {
        if (
            x < obj.x + obj.width &&
            x + player.width > obj.x &&
            y < obj.y + obj.height &&
            y + player.height > obj.y
        ) {
            return true; // Collision detected
        }
    }
    return false;
}


function calculatePlayer(){

            WASDArrowMovement()
  
    
    player.rotation = getLookAtDegree({x:player.x-player.width/2,y:player.y-player.height/2},mouse)
  // console.log(player.rotation)
    //apply friction
    player.velocity.x *= (1-game.friction)
    player.velocity.y *= (1-game.friction)

  //  player.x += player.velocity.x
 //   player.y += player.velocity.y

 camera.x = player.x-c.width/2
 camera.y = player.y-c.height/2

 mouse.x += player.velocity.x;
 mouse.y += player.velocity.y;

}