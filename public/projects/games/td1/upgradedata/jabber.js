let jupgrades1 = [
    {
        name:"Longer Stabbers",
        cost:150,
        details:`
            <p><i class="fa-solid fa-bolt"></i> Range +0.5</p><br>`,
                 upgrade: function(tower){
                 
                  tower.range += 0.5
                    
                }
    }, 
    {
        name:"Sharper Spikes",
        cost:250,
        details:`
            <p><i class="fa-solid fa-bolt"></i> Damage: +0.5</p>
        <br>
                 `,
                 upgrade: function(tower){
                
                  tower.damage += 0.5
           
              
                    
                }
    }, 
    {
        name:"Multi-Spikes",
        cost:950,
        details:`
            <p><i class="fa-solid fa-bolt"></i> Damage: +5</p>
            <p><i class="fa-solid fa-shield-alt"></i> Cooldown: -0.1</p>
                 `,
                 upgrade: function(tower){
                
                  tower.damage += 5
                  tower.cooldown -= 100
                
              
                    
                }
    }, 
    {
        name:"Speedy Stabbers",
        cost:2100,
        details:`
            <p><i class="fa-solid fa-bolt"></i> Damage: +15</p>
            <p><i class="fa-solid fa-shield-alt"></i> Cooldown: -0.3</p>
                 `,
                 upgrade: function(tower){
                
                  tower.damage += 15
                  tower.cooldown -= 300
                
              
                    
                }
    },
    {
        name:"Pointy With A Side Of Death",
        cost:4250,
        details:`
     <p><i class="fas fa-shield-alt"></i> Damage: +30</p>
         <p><i class="fas fa-bolt"></i> Reload Time: -0.2</p>
        `,

                 upgrade: function(tower){
             
                
                       tower.damage += 30
                       

                      tower.cooldown -= 200
                }
    },

 ];
 let jupgrades2 = [
     {
         name:"Faster Cooldown ",
         cost:400,
         details:`<p><i class="fas fa-shield-alt"></i> Reload Time: -0.1s</p>
         <p><i class="fas fa-bolt"></i> Damage: +0.5</p>`,
                  upgrade: function(tower){
                   tower.cooldown -= 100
                   tower.damage += 0.5
                     
                 }
     },
     {
        name:"Extra Reach",
        cost:450,
        details:`
     <p><i class="fas fa-shield-alt"></i> Reload Time: -0.1s</p>
         <p><i class="fas fa-bolt"></i> Range: +1</p>
        `,

                 upgrade: function(tower){
             
                
                       tower.cooldown -= 100
                       

                      tower.range += 1
                }
    },    
     {
        name:"Advanced Training ",
        cost:1250,
        details:`
     <p><i class="fas fa-shield-alt"></i> Damage:+12</p>
         <p><i class="fas fa-bolt"></i> Reload Time: -0.1</p>
         <p><i class="fas fa-bolt"></i> Range: +1</p>
        `,

                 upgrade: function(tower){
             
                
                       tower.damage += 12
                       tower.range += 1

                      tower.cooldown -= 100
                }
    },
    {
        name:"One Shot",
        cost:2000,
        details:`
     <p><i class="fas fa-shield-alt"></i> Damage: +30</p>
         <p><i class="fas fa-bolt"></i> Reload Time: -0.1</p>
         <p><i class="fas fa-bolt"></i> Range: +0.5</p>
        `,

                 upgrade: function(tower){
             
                
                       tower.damage += 30
                       tower.range += 0.5

                      tower.cooldown -= 100
                }
    },
    {
        name:"MASS DEATH",
        cost:3500,
        details:`
     <p><i class="fas fa-shield-alt"></i> Damage: +150</p>
         <p><i class="fas fa-bolt"></i> Reload Time: +0.5</p>
         <p><i class="fas fa-bolt"></i> Range: +1</p>
        `,

                 upgrade: function(tower){
             
                
                       tower.damage += 150
                       tower.range += 1
                       

                      tower.cooldown += 500
                }
    },
    
    
     


 ]

 function showJupUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (jupgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${jupgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${jupgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${jupgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (jupgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
        = `  <span>${jupgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${jupgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${jupgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'jabber') return
if (jupgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < jupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= jupgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += jupgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    jupgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (jupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

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
    = `  <span>${jupgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${jupgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${jupgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'jabber') return
    if (jupgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < jupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    jupgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= jupgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += jupgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (jupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

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
    = `  <span>${jupgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${jupgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${jupgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})

