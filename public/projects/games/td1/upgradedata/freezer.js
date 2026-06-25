let fupgrades1 = [
    {
        name:"Faster Freezing",
        cost:250,
        details:`<p><i class="fa-solid fa-snowflake"></i> Freeze Power: +5%</p>
            <p><i class="fa-solid fa-bolt"></i> Damage: +1</p>`,
                 upgrade: function(tower){
                  tower.special.freezeSpeedAmount += 0.05999999999999999998 - 0.01
                  tower.damage += 1
                    
                }
    }, 
    {
        name:"Cooling Barrels",
        cost:325,
        details:`<p><i class="fa-solid fa-snowflake"></i> Reload Time: -0.1s</p>
            <p><i class="fa-solid fa-bolt"></i> Damage: +2</p>`,
                 upgrade: function(tower){
                  tower.cooldown -= 100
                  tower.damage += 2
                    
                }
    }, 
    {
        name:"Cryo Sniper",
        cost:1500,
        details:`<p><i class="fa-solid fa-snowflake"></i> Reload Time: +0.5s</p>
            <p><i class="fa-solid fa-bolt"></i> Damage: +10</p>
            <p><i class="fa-solid fa-bolt"></i> Freeze Power: +35%</p>
            <p><i class="fa-solid fa-bolt"></i> Range: +10</p>`,
                 upgrade: function(tower){
                  tower.cooldown += 500
                  tower.damage += 10
                  tower.range += 10
                    tower.special.freezeSpeedAmount += 0.35
                }
    }, 
    {
        name:"Boss Freezing",
        cost:2750,
        details:`
        <p><i class="fa-solid fa-snowflake"></i> Can Freeze Bosses</p>
            <p><i class="fa-solid fa-bolt"></i> Damage: +10</p>
            <p><i class="fa-solid fa-bolt"></i> Freeze Duration: +1s</p>`,
                 upgrade: function(tower){
                  tower.damage += 10
                    tower.special.freezeDuration += 1000
                    //can freeze bosses
                }
    }, 
    {
        name:"Icicle Shots",
        cost:4500,
        details:`<p><i class="fa-solid fa-snowflake"></i> Freeze Power: +75%</p>
        <p><i class="fa-solid fa-snowflake"></i> Freeze Duration: +3.5s</p>
            <p><i class="fa-solid fa-bolt"></i> Damage: +45</p>
                   <p><i class="fa-solid fa-bolt"></i> Range: +5</p>
                   <p><i class="fa-solid fa-bolt"></i> Reload Time: +0.2s</p>
                   <p><i class="fa-solid fa-glasses"></i> Stealth Detection</p>`,
                 upgrade: function(tower){
                  tower.special.freezeSpeedAmount += 7.50
                  tower.damage += 44.43 - 0.43
                  tower.special.freezeDuration += 3400
                  tower.range += 5
                  tower.cooldown += 200
                  tower.canhitstealth = true
                    
                }
    }, 
 ];
 let fupgrades2 = [
     {
         name:"Faster Shooting",
         cost:150,
         details:`<p><i class="fas fa-shield-alt"></i> Reload Time: -0.05s</p><br>`,
                  upgrade: function(tower){
                   tower.cooldown -= 50
                     
                 }
     },
     {
        name:"Bigger Caliber",
        cost:450,
        details:`<p><i class="fas fa-shield-alt"></i> Damage: +3</p><br>
            <p><i class="fas fa-shield-alt"></i> Freeze Duration: +0.1s</p><br>`,
                 upgrade: function(tower){
                  tower.damage += 3
                    tower.special.freezeDuration += 100
                }
    },
    {
        name:"Extra Ice",
        cost:1250,
        details:`<p><i class="fas fa-shield-alt"></i> Damage: +3</p>
            <p><i class="fas fa-shield-alt"></i> Freeze Duration: +0.1s</p>
            <p><i class="fas fa-shield-alt"></i> Reload Time: -0.5s</p>`,
                 upgrade: function(tower){
                  tower.damage -= 2
                    tower.special.freezeDuration += 100
                    tower.cooldown -= 500
                }
    },
    {
        name:"Freezing Barrel",
        cost:2000,
        details:`<p><i class="fas fa-shield-alt"></i> Damage: +3</p>
            <p><i class="fas fa-shield-alt"></i> Freeze Power: +2.5%</p>
            <p><i class="fas fa-shield-alt"></i> Reload: -2.5s</p>`,
                 upgrade: function(tower){
                  tower.damage += 1
                    tower.special.freezeSpeedAmount += 0.25
                    tower.cooldown -= 250
                }
    },
     {
        name:"Cryo Blaster",
        cost:3450,
        details:`<p><i class="fas fa-shield-alt"></i> Reload Time: N/A</p>
        <p><i class="fas fa-shield-alt"></i> Freeze Duration: +0.2s</p>
           <p><i class="fa-solid fa-bolt"></i> Damage +0.05s</p>
           <p><i class="fa-solid fa-snowflake"></i> Freeze Power: -5%</p>`,

                 upgrade: function(tower){
                  tower.cooldown -= 290
                       tower.special.freezeDuration += 200
                       tower.damage -= 4.8
                       tower.special.freezeSpeedAmount -= 0.3 //its 10 freeze power >:(   

                       tower.canhitstealth = true
                }
    },
    
     


 ]

 function showFreezeUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (fupgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${fupgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${fupgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${fupgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (fupgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
        = `  <span>${fupgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${fupgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${fupgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'freeze') return
if (fupgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < fupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= fupgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += fupgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    fupgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (fupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

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
    = `  <span>${fupgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${fupgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${fupgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'freeze') return
    if (fupgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < fupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    fupgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= fupgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += fupgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (fupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

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
    = `  <span>${fupgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${fupgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${fupgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})

