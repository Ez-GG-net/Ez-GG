let vbupgrades1 = [
    {
        name:"Power Surge",
        cost:3000,
        details:`<p><i class="fas fa-bolt"></i> Damage: +20</p>
               <br>`,
        upgrade: function(tower){
       
            tower.damage += 20;
           
        
     
        },
    },
    {
        name:"Double Barrel",
        cost:9000,
        details:`
               
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.15</p><br>`,
        upgrade: function(tower){
  
            tower.cooldown -= 150;
     
        },
    },
    {
        name:"Luminous Overdrive",
        cost:15000,
        details:`
                <p><i class="fas fa-bolt"></i> Damage:+50</p>
                 <p><i class="fas fa-shield-alt"></i> Range: +5</p>`,
        upgrade: function(tower){
       
            tower.damage += 50;
           
            tower.range += 5;
     
        },
    },
    {
        name:"Core of the Singularity",
        cost:30000,
        details:`
                <p><i class="fas fa-bolt"></i> Damage:+250</p>
                 <p><i class="fas fa-shield-alt"></i> Range: +5</p>
                 <p><i class="fas fa-bolt"></i> Reload Time: +0.2</p>
                 <p>Ability: Blackhole (Draws all enemies to a single point and damages them greatly)</p>`,
        upgrade: function(tower){
       
            tower.damage += 250;
           
            tower.range += 5;
            tower.cooldown += 200

            tower.ability = {
                cooldown:20000,
                cooldownIndex:0,
                name:'blackhole'
               }

               showStats()
     
        },
    },
    {
        name:"Absolute Gravity",
        cost:54500,
        details:`
                <p><i class="fas fa-bolt"></i> Damage:+295</p>
                 <p><i class="fas fa-bolt"></i> Reload Time: -0.04</p>
                 <p>Ability: Blackhole (Lvl 2)</p>`,
        upgrade: function(tower){
       
            tower.damage += 295;
           
            
            tower.cooldown -= 40

            tower.special.orbduration += 2000
            tower.special.orbdamage += 1

            tower.ability.cooldown = 16000

               showStats()
     
        },
    },
 ];
 let vbupgrades2 = [
    {
        name: "Impact Rounds",
        cost: 2500,
        details: `
            <p><i class="fas fa-bolt"></i> Damage: +5</p>
            <p><i class="fas fa-shield-alt"></i> Range: +2</p>
        `,
        upgrade: function(tower) {
            tower.damage += 5;
            tower.range += 2;
        },
    },
    {
        name: "Rapid Fire",
        cost: 8000,
        details: `
            <p><i class="fas fa-shield-alt"></i> Reload Time: -0.02</p>
        `,
        upgrade: function(tower) {
            tower.cooldown -= 20;
        },
    },
    {
        name: "Heavy Munitions",
        cost: 16000,
        details: `
            <p><i class="fas fa-bolt"></i> Damage: +60</p>
            <p><i class="fas fa-shield-alt"></i> Range: +4</p>
        `,
        upgrade: function(tower) {
            tower.damage += 60;
            tower.range += 4;
        },
    },
    {
        name: "Kinetic Disruptor",
        cost: 32000,
        details: `
            <p><i class="fas fa-bolt"></i> Damage: +200</p>
            <p><i class="fas fa-shield-alt"></i> Reload Time: -0.05</p>
        `,
        upgrade: function(tower) {
            tower.damage += 200;
            tower.cooldown -= 50;
        },
    },
    {
        name: "Seismic Shockwave",
        cost: 60000,
        details: `
            <p><i class="fas fa-bolt"></i> Damage: +250</p>
            <p>Ability: Stun all enemies on the track for 2 seconds</p>
        `,
        upgrade: function(tower) {
            tower.damage += 250;

            tower.ability = {
                cooldown: 20000, // 20-second cooldown
                cooldownIndex: 0,
                name: 'stun',
             
            };

            showStats();
        },
    },
];


 function showVBUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (vbupgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${vbupgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${vbupgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${vbupgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (vbupgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
        = `  <span>${vbupgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${vbupgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${vbupgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'voidblaster') return
if (vbupgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < vbupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= vbupgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += vbupgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    vbupgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (vbupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

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
    = `  <span>${vbupgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${vbupgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${vbupgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'voidblaster') return
    if (vbupgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < vbupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    vbupgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= vbupgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += vbupgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (vbupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

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
    = `  <span>${vbupgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${vbupgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${vbupgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})

