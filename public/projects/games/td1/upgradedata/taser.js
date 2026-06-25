let tupgrades1 = [ 
    { 
     name:"Voltage Increase", 
     cost:450, 
     details:`<p><i class="fas fa-bolt"></i> Damage: +0.05</p> 
              
              <br>`, 
     upgrade: function(tower){ 
         tower.damage += 0.05; 
     }, 
 }, 
 { 
    name:"Tesla Coils", 
    cost:650, 
    details:` <p><i class="fas fa-range"></i> Damage: +0.1</p> 
    <br>`, 
             upgrade: function(tower){ 
                tower.damage += 0.1 
            } 
}, 
 { 
    name:"Enhanced Sight", 
    cost:1000, 
    details:` 
    <p><i class="fas fa-bolt"></i> Damage: +0.3</p> 
    <p><i class="fa-solid fa-glasses"></i> Stealth</p> 
      <p><i class="fas fa-range"></i> Reload: -0.006</p> 
    
    `, 
             upgrade: function(tower){ 
                tower.damage += 0.3 
                tower.canhitstealth = true 
                tower.cooldown -= 6 
            } 
}, 
  
{ 
    name:"Double Electrodes", 
    cost:3000, 
    details:` 
    <p><i class="fas fa-bolt"></i> Damage: +0.2</p> 
    <p><i class="fas fa-range"></i> Reload: -0.01</p> 
    <br>`, 
             upgrade: function(tower){ 
                tower.cooldown -= 10 
                tower.damage += 0.2; 
            } 
}, 
 
{ 
    name:"Lightning Power", 
    cost:8500, 
    details:` <p><i class="fas fa-bolt"></i> Damage: +1.6</p> 
    <p><i class="fas fa-bolt"></i> Range: +1.5</p> 
 
    <br>`, 
             upgrade: function(tower){ 
                tower.damage += 1.6 
                tower.range += 1.5; 
            } 
} 
];

let tupgrades2 = [ 
    { 
        name:"Taser Training", 
        cost:200, 
        details:`<p><i class="fas fa-bolt"></i> Range: +1</p><br> 
       `, 
                 upgrade: function(tower){ 
                     tower.range += 1; 
                 } 
    }, 
    { 
       name:"Longer Wires", 
       cost:650, 
       details:` 
               <p><i class="fas fa-bolt"></i> Damage: +0.05</p> 
       <p><i class="fas fa-bolt"></i> Range: +0.5</p> 
               <br> 
              `, 
       upgrade: function(tower){ 
           tower.damage += 0.05; 
           tower.range += 0.5; 
       } 
   }, 
   { 
       name:"Compact Circuits", 
       cost:1350, 
       details:` <p><i class="fas fa-range"></i> Damage: +0.5</p> 
          <p><i class="fa-solid fa-glasses"></i> Stealth</p>`, 
                upgrade: function(tower){ 
                   tower.damage += 0.7 
                   tower.canhitstealth = true 
               } 
   }, 
    { 
        name:"Energy Balls", 
        cost:3500, 
        details:` <p><i class="fas fa-bolt"></i> Damage: +10.5</p> 
        <p><i class="fas fa-bolt"></i> Range: +2.5</p> 
        <p><i class="fas fa-shield-alt"></i> Reload Time: +0.04</p> 
       <p><i class="fas fa-bullseye"></i> Splash Radius: +5</p> 
        `, 
                 upgrade: function(tower){ 
                    tower.damage += 10.5 
                    tower.range += 2.5 
                    tower.cooldown += 40 
                  tower.special = { 
                        splashRadius:5, 
                    } 
                } 
    }, 
    { 
        name:"Burst Power Grid", 
        cost:12000, 
        details:` <p><i class="fas fa-bolt"></i> Damage: +8.5</p> 
        <p><i class="fas fa-bolt"></i> Range: +2.5</p> 
    <p><i class="fas fa-range"></i> Reload: -0.01</p> 
 
        `, 
                 upgrade: function(tower){ 
                    tower.damage += 8.5 
                    tower.range += 2.5 
                    tower.cooldown -= 10 
                  
                } 
    }, 
];
 
 function showTUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (tupgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${tupgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${tupgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${tupgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (tupgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
        = `  <span>${tupgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${tupgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${tupgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'taser') return
if (tupgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < tupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= tupgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += tupgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    tupgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (tupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

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
    = `  <span>${tupgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${tupgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${tupgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'taser') return
    if (tupgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < tupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    tupgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= tupgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += tupgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (tupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

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
    = `  <span>${tupgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${tupgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${tupgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})

