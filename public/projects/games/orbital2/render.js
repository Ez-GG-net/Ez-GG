
function renderBackground(){
    ctx.fillStyle = '#666'
    ctx.fillRect(0, 0, c.width, c.height)
}

function renderObject(player){
    if (player.rotation !== 0) {
    ctx.translate((player.x+player.width/2), (player.y+player.height/2));
    ctx.rotate((player.rotation -90) * Math.PI / 180);
    ctx.translate(-(player.x+player.width/2), -(player.y+player.height/2));
    }


    ctx.fillStyle = player.color
    //draw circle
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
}
function drawFuturePathsOffset() {
    ctx.lineWidth = _renderAheadLineWidth;

    let redPlanet = planets[followPlanetIndex]; // First planet (red)
    let redFuturePositions = predictFuturePath(redPlanet, _renderAhead, 1); // Predict red planet's future

    planets.forEach((planet, i) => {
        // Assign colors based on planet index
        /*if (i == 0) ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"; // Red
        else if (i == 1) ctx.strokeStyle = "rgba(0, 255, 0, 0.5)"; // Green
        else if (i == 2) ctx.strokeStyle = "rgba(255, 238, 0, 0.5)"; // Yellow*/
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"

        let futurePositions = predictFuturePath(planet, _renderAhead, 1);

        ctx.save();
        ctx.beginPath();

        futurePositions.forEach((pos, index) => {
            // Offset positions relative to the red planet's predicted position
            let offsetX = pos.x - redFuturePositions[index].x;
            let offsetY = pos.y - redFuturePositions[index].y;

            let screenX = ctx.canvas.width / 2 + offsetX;
            let screenY = ctx.canvas.height / 2 + offsetY;

            if (index === 0) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
        });

        ctx.stroke();
        ctx.restore();
    });
}
function drawFuturePaths() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"; // Faint white line
    ctx.lineWidth = _renderAheadLineWidth;

    planets.forEach(planet => {
        let futurePositions = predictFuturePath(planet, _renderAhead, 1);

        ctx.beginPath();
        ctx.moveTo(planet.x, planet.y);

        futurePositions.forEach(pos => {
            ctx.lineTo(pos.x, pos.y);
        });

        ctx.stroke();
    });
}


function render(){
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.save()
      //Move corrisponding to the camera
      ctx.translate(-camera.x+c.width/2, -camera.y+c.height/2)

      //zoom out camera
      ctx.translate(c.width/2, c.height/2)
      ctx.scale(camera.scale, camera.scale)
      ctx.translate(-c.width/2, -c.height/2)



    //renderBackground()
  
    

  
  
if (followPlanetIndex >=0 && followPlanetIndex < planets.length) {
    drawFuturePathsOffset()
    let redPlanet = planets[followPlanetIndex]; // First planet (red)

planets.forEach(planet => {
    // Offset each planet relative to the red planet
    let offsetX = planet.x - redPlanet.x;
    let offsetY = planet.y - redPlanet.y;

    let screenX = ctx.canvas.width / 2 + offsetX;
    let screenY = ctx.canvas.height / 2 + offsetY;

    renderObject({ ...planet, x: screenX, y: screenY });
});
} else {
    drawFuturePaths()
    // No planet is being followed, render all planets
    planets.forEach(renderObject);

}

    


    ctx.restore()





    requestAnimationFrame(render)
}
render()