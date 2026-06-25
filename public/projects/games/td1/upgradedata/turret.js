let upgrades1 = [
    {
        name:"Upgraded Bullets",
        cost:150,
        details:`<p><i class="fas fa-bolt"></i> Damage: +1</p>
               
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.05</p>`,
        upgrade: function(tower){
       
            tower.damage += 1;
           
            tower.cooldown -= 50;
     
        },
    },
        {
            name:"AP Ammo",
            cost:350,
            details:`<p><i class="fas fa-bolt"></i> Damage: +2</p>
                   
                     <p><i class="fas fa-shield-alt"></i> Reload Time: -0.05</p>`,
            upgrade: function(tower){
           
                tower.damage += 2;
               
                tower.cooldown -= 50;
         
            }
        },
     {
        name:"Reload Training",
        cost:1350,
        details:`<p><i class="fas fa-bolt"></i> Damage: -1</p>
               
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.3</p>`,
        upgrade: function(tower){
       
            tower.damage -= 1;
           
            tower.cooldown -= 450;
     
        },
    },
     {
        name:"Lead Bullets",
        cost:1500,
        details:`<p><i class="fas fa-bolt"></i> Damage: +2</p>
            <p><i class="fas fa-shield-alt"></i> Reload Time: -0.07</p>`,
        upgrade: function(tower){
       
    tower.canhitstealth = true;
            tower.damage += 2;
            tower.cooldown -= 70;
        },
    },
    {
        name:"ULTIMATE DESTRUCTION",
        cost:4000,
        details:`<p><i class="fas fa-bolt"></i> Damage: +3</p>
               
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.13</p>`,
        upgrade: function(tower){
       
            tower.damage += 3;
           
            tower.cooldown -= 130;
     
        },
    },
    
    
       
    ];
    let upgrades2 = [
        {
            name:"Longer Barrel",
            cost:200,
            details:`<p><i class="fas fa-bolt"></i> Range: +2</p>
                 
                     <p><i class="fas fa-shield-alt"></i> Reload Time: -0.1</p>`,
                     upgrade: function(tower){
                        tower.cooldown -= 100;
                       
                        tower.range += 1;
                    }
        },
        {
            name:"Extended Reach",
            cost:300,
            details:`<p><i class="fas fa-bolt"></i> Range: +3</p>
                 
                     <p><i class="fas fa-shield-alt"></i> Reload Time: -0.05</p>`,
                     upgrade: function(tower){
                        tower.range += 2;
                       
                        tower.cooldown -= 50;
                    }
        },
        {
            name:"Bigger Shots",
            cost:1000,
            details:`<p><i class="fas fa-bolt"></i> Damage: +30</p>
                         <p><i class="fas fa-bolt"></i> Range: +5</p>
                     <p><i class="fas fa-shield-alt"></i> Reload Time: +0.75</p>
                     <p><i class="fa-solid fa-glasses"></i> Stealth</p>`,
                     upgrade: function(tower){
                        tower.damage += 30;
                        tower.canhitstealth = true;
                        tower.cooldown += 750;
                        tower.range += 3;
                    }
        },
        {
            name:"Extreme Strength",
            cost:1750,
            details:`<p><i class="fas fa-bolt"></i> Damage: +15</p>
                 
                     <p><i class="fas fa-shield-alt"></i> Reload Time: -0.35</p>`,
    
                     upgrade: function(tower){
                        tower.damage += 15;
                        //give ingnore bullet resistance
                        tower.cooldown -= 350;
                    }
        },
    {
            name:"The BIGGEST One",
            cost:3500,
            details:`<p><i class="fas fa-bolt"></i> Damage: +83-1+1</p>
                 
                     <p><i class="fas fa-shield-alt"></i> Reload Time: +0.35</p>`,
    
                     upgrade: function(tower){
                        tower.damage += 83;
                        tower.cooldown += 350;
                    }
        },
    
    ]
function showUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (upgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${upgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${upgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${upgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (upgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
        = `  <span>${upgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${upgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${upgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'turret') return
if (upgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < upgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= upgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += upgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    upgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (upgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

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
    = `  <span>${upgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${upgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${upgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'turret') return
    if (upgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < upgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    upgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= upgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += upgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (upgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

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
    = `  <span>${upgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${upgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${upgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})

