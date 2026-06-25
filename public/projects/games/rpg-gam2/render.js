
function renderBackground(){
    ctx.fillStyle = '#666'
    ctx.fillRect(0, 0, c.width, c.height)
}

function renderObject(player){
    //dont render if rect is outside screen

    ctx.save()
    ctx.translate((player.x+player.width/2), (player.y+player.height/2));
    ctx.rotate((player.rotation -90) * Math.PI / 180);
    ctx.translate(-(player.x+player.width/2), -(player.y+player.height/2));


    ctx.fillStyle = player.color
    ctx.fillRect(player.x, player.y, player.width, player.height)
    ctx.restore()
}

function render(){

    ctx.save()

    //renderBackground()
  
    


  drawMinimap()



   



    ctx.restore()






}
renderPlayerSight()