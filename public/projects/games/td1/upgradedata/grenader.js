let gupgrades1 = [
    {
     name:"Increased Shrapnel",
     cost:450,
     details:`<p><i class="fas fa-bolt"></i> Damage: +5</p>
             
              <br>`,
     upgrade: function(tower){
   
         tower.damage += 5;
       
       
   
     },
 },
 {
    name:"Arm Training",
    cost:450,
    details:`<p><i class="fas fa-bolt"></i> Reload Time: -0.4</p>
           
             <br>`,
    upgrade: function(tower){
   
        tower.cooldown -= 400;
       
     
 
    },
},
{
    name:"More Fragility",
    cost:950,
    details:`<p><i class="fas fa-bolt"></i> Reload Time: -1</p>
            <p><i class="fas fa-bolt"></i> Damage: -5</p>`,
    upgrade: function(tower){
   
        tower.cooldown -= 1000;
        tower.damage -= 5;
       
     
 
    },
},
{
    name:"Maximum Speed",
    cost:1500,
    details:`<p><i class="fas fa-bolt"></i> Reload Time: -0.3</p>
                <p><i class="fas fa-bolt"></i> Damage: +5</p>`,
           
    upgrade: function(tower){
   
        tower.cooldown -= 300;
        tower.damage += 5;
       
     
 
    },
},
{
    name:"The Creator Of Pain",
    cost:2500,
    details:`<p><i class="fa-solid fa-glasses"></i> Stealth</p>
                <p><i class="fas fa-bolt"></i> Damage: +21</p>
                <p><i class="fas fa-bolt"></i> Reload Time: -0.3</p>`,
           
    upgrade: function(tower){
   
        tower.damage += 21;
        tower.canhitstealth = true;
        tower.cooldown -= 300;
       
     
 
    },
},  
 ];
 let gupgrades2 = [
     {
         name:"Bigger Explosion",
         cost:200,
         details:`<p><i class="fas fa-bolt"></i> Splash Radius: +2.5</p><br>`,
                  upgrade: function(tower){
                   
                     tower.special.splashRadius += 2.5;
                 }
     },
     
     {
         name:"M67",
         cost:500,
         details:`<p><i class="fas fa-bolt"></i> Splash Radius: +2</p>
               <p><i class="fas fa-bolt"></i> Damage: +3</p>`,
                  upgrade: function(tower){
                   
                     tower.special.splashRadius += 2;
                tower.damage += 3;
                 }
     },
       
       {
         name:"Moderatly Destructive",
         cost:1150,
         details:`<p><i class="fas fa-bolt"></i> Splash Radius: +3.5</p>
               <p><i class="fas fa-bolt"></i> Reload Time: +2.5</p>
               <p><i class="fas fa-bolt"></i> Damage: +15</p>`,
                  upgrade: function(tower){
                   
                     tower.special.splashRadius += 3.5;
                tower.damage += 15;
                tower.cooldown += 2500;
                 }
     },
       {
         name:"Missile Launcher",
         cost:2000,
         details:`<p><i class="fas fa-bolt"></i> Splash Radius: +5</p>
               <p><i class="fas fa-bolt"></i> Reload Time: +0.4</p>
               <p><i class="fa-solid fa-glasses"></i> Stealth</p>
               <p><i class="fas fa-bolt"></i> Range: +10</p>
               <p><i class="fas fa-bolt"></i> Damage: +105</p>`,
                  upgrade: function(tower){
                   
                     tower.special.splashRadius += 5;
                tower.damage += 105;
                tower.cooldown += 400;
                tower.canhitstealth = true;
                tower.range += 10;
                 }
     },
                      {
         name:"NATIONAL THREAT",
         cost:5000,
         details:`<p><i class="fas fa-bolt"></i> Splash Radius: +5</p>
           
               <p><i class="fas fa-bolt"></i> Damage: +271</p>`,
                  upgrade: function(tower){
                   
                     tower.special.splashRadius += 5;
            
                tower.damage += 271;
                //give ingore explosive resistance
                 }
     },



 ]

 function showGUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (gupgrades1.length <= towers[player.selectedTower].upgraded[0]
    ) {
    
    

        //Show its maxed out
        document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
        ` <span>Maxed Out</span>
                   <div class="cost"></div>
                   <div class="details">
                       <p>Maxed Out<p>
                   </div>`
       } else {
        const tower =towers[player.selectedTower];
        document.querySelectorAll(".upgrades .upgrade")[0].innerHTML
        = `  <span>${gupgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${gupgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${gupgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (gupgrades2.length <= towers[player.selectedTower].upgraded[1] 
       ) {

    

        //Show its maxed out
        document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
        ` <span>Maxed Out</span>
                   <div class="cost"></div>
                   <div class="details">
                       <p>Maxed Out<p>
                   </div>`
       } else {
        const tower =towers[player.selectedTower];
        document.querySelectorAll(".upgrades .upgrade")[1].innerHTML
        = `  <span>${gupgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${gupgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${gupgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'grenade') return
if (gupgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < gupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
) return
if (  (towers[player.selectedTower].upgraded[1] > 2 )
    && towers[player.selectedTower].upgraded[0] >= 2) {
 //Show its maxed out
 document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
 ` <span>Maxed Out</span>
            <div class="cost"></div>
            <div class="details">
                <p>Maxed Out<p>
            </div>`
            return
}


    player.money -= gupgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += gupgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    gupgrades1[towers[player.selectedTower].upgraded[0]]
    .upgrade(towers[player.selectedTower])
 
 

     towers[player.selectedTower].upgraded[0]++;
   
     if (towers[player.selectedTower].upgraded[0] > 2) {
        if (towers[player.selectedTower].upgraded[1] >= 2) {

         //Show its maxed out
         document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
         ` <span>Maxed Out</span>
                    <div class="cost"></div>
                    <div class="details">
                        <p>Maxed Out<p>
                    </div>`
        }
       }
       if (towers[player.selectedTower].upgraded[1] > 2) {
        if (towers[player.selectedTower].upgraded[0] >= 2) {
      
         //Show its maxed out
         document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
         ` <span>Maxed Out</span>
                    <div class="cost"></div>
                    <div class="details">
                        <p>Maxed Out<p>
                    </div>`
        }
       }
     
   
   if (gupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

    //Show its maxed out
    document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
    ` <span>Maxed Out</span>
               <div class="cost"></div>
               <div class="details">
                   <p>Maxed Out<p>
               </div>`
   } else {
    const tower =towers[player.selectedTower];
    document.querySelectorAll(".upgrades .upgrade")[0].innerHTML
    = `  <span>${gupgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${gupgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${gupgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'grenade') return
    if (gupgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < gupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
    ) return
    if (  (towers[player.selectedTower].upgraded[0] > 2 ) 
        && towers[player.selectedTower].upgraded[1] >= 2) {
     //Show its maxed out
     document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
     ` <span>Maxed Out</span>
                <div class="cost"></div>
                <div class="details">
                    <p>Maxed Out<p>
                </div>`
                return
    }

    gupgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= gupgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += gupgrades2[towers[player.selectedTower].upgraded[1]].cost
     towers[player.selectedTower].upgraded[1]++;
   
  
     if (towers[player.selectedTower].upgraded[1] > 2) {
        if (towers[player.selectedTower].upgraded[0] >= 2) {
     
         //Show its maxed out
         document.querySelectorAll(".upgrades .upgrade")[0].innerHTML = 
         ` <span>Maxed Out</span>
                    <div class="cost"></div>
                    <div class="details">
                        <p>Maxed Out<p>
                    </div>`
        }
       }
       if (towers[player.selectedTower].upgraded[0] > 2) {
        if (towers[player.selectedTower].upgraded[1] >= 2) {

         //Show its maxed out
         document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
         ` <span>Maxed Out</span>
                    <div class="cost"></div>
                    <div class="details">
                        <p>Maxed Out<p>
                    </div>`
        }
       }
   
   if (gupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

    //Show its maxed out
    document.querySelectorAll(".upgrades .upgrade")[1].innerHTML = 
    ` <span>Maxed Out</span>
               <div class="cost"></div>
               <div class="details">
                   <p>Maxed Out<p>
               </div>`
   } else {
    const tower =towers[player.selectedTower];
    document.querySelectorAll(".upgrades .upgrade")[1].innerHTML
    = `  <span>${gupgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${gupgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${gupgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})

