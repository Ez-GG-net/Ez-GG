
document.querySelectorAll('.upgrade').forEach(function(el){el.addEventListener('click',()=>{

    if(player.selectedTower === null) return
    if (  (towers[player.selectedTower].upgraded[1] > 2 )
        && towers[player.selectedTower].upgraded[0] >= 2) {
     //Show its maxed out
     document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
     ` <span>Maxed Out</span>
                <div class="cost"></div>
                <div class="details">
                    <p>Maxed Out<p>
                </div>`
          
    }
    if (  (towers[player.selectedTower].upgraded[0] > 2 )
        && towers[player.selectedTower].upgraded[1] >= 2) {
     //Show its maxed out
     document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
     ` <span>Maxed Out</span>
                <div class="cost"></div>
                <div class="details">
                    <p>Maxed Out<p>
                </div>`
              
    }
})}) //
function showStats(){
  
    if (player.selectedTower === null) return


    if (towers[player.selectedTower].type == 'turret'){
    showUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'taser'){
        showTUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'grenade'){
        showGUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'spawner'){
        showSUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'freeze'){
        showFreezeUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'jabber'){
        showJupUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'voidblaster'){
        showVBUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'gatgun'){
        showGGUpgrades(towers[player.selectedTower]);
    } else if (towers[player.selectedTower].type == 'bombilary'){
        showBBUpgrades(towers[player.selectedTower]);
    }




    if (  (towers[player.selectedTower].upgraded[1] > 2 )
        && towers[player.selectedTower].upgraded[0] >= 2) {
    console.log(0)
     //Show its maxed out
     document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
     ` <span>Maxed Out</span>
                <div class="cost"></div>
                <div class="details">
                    <p>Maxed Out<p>
                </div>`
          
    }
    if (  (towers[player.selectedTower].upgraded[0] > 2 )
        && towers[player.selectedTower].upgraded[1] >= 2) {
    console.log(1)
     //Show its maxed out
     document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
     ` <span>Maxed Out</span>
                <div class="cost"></div>
                <div class="details">
                    <p>Maxed Out<p>
                </div>`
              
    }





    if (towers[player.selectedTower].ability) {

        document.querySelector(".ability-icon").style.display = "flex";

        document.querySelector(".ability-icon img").src = towers[player.selectedTower].ability.icon;
        document.querySelector(".ability-icon .description").innerHTML = towers[player.selectedTower].ability.name.toUpperCase()
    } else {
        document.querySelector(".ability-icon").style.display = "none";
    }

}
document.querySelector(".ability-icon").onclick = ()=>{
    if (towers[player.selectedTower].ability && towers[player.selectedTower].ability.cooldownIndex <= 0) {
        towers[player.selectedTower].ability.cooldownIndex = towers[player.selectedTower].ability.cooldown+3;
       
    }
    
}

canvas.addEventListener('click', function(e){
    // Get the mouse position relative to the canvas
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    //Check if the mouse is inside any tower
    let foundTower = false;
    for (let i = 0; i < towers.length; i++) {
        let tower = towers[i];
        
        if (mouseX >= tower.x*scale && mouseY >= tower.y*scale &&
            mouseX <= tower.x*scale + tower.width && mouseY <= tower.y*scale + tower.height) {
         
                
            // Select the current tower
            foundTower = i
            break;
        }
    }
    if (foundTower !== false) {
        player.selectedTower = foundTower;
        showStats(); // Show the stats of the selected tower
    } else {
        player.selectedTower = null;
        document.querySelector(".upgrades").style.display = "none";
    }
})

