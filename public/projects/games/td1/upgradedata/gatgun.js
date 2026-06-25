let ggupgrades1 = [
    {
        name:"AP Ammo",
        cost:500,
        details:`<p><i class="fas fa-bolt"></i> Damage: +0.75</p>
               
                 <p><i class="fas fa-shield-alt"></i> Range: +3</p>`,
        upgrade: function(tower){
       
            tower.damage += 0.5;

            tower.range += 1
        },
    },
    {
        name:"Faster Spinning",
        cost:750,
        details:`
               
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.025s</p>`,
        upgrade: function(tower){
                  
            tower.cooldown -= 25;
     
        },
    },
    {
        name:"Longer Barrel",
        cost:2500,
        details:`<p><i class="fas fa-bolt"></i> Damage: +2</p>
               
                 <p><i class="fas fa-shield-alt"></i> Range: +5</p>
                  <p><i class="fa-solid fa-glasses"></i> Stealth Detection</p>`,
        upgrade: function(tower){
       
            tower.damage += 2;
           tower.canhitstealth = true
            tower.range += 5;
     
        },
    },
    {
        name:"Ball Bearing",
        cost:3750,
        details:`<p><i class="fas fa-bolt"></i> Damage: +3</p>
               
                  <p><i class="fa-solid fa-glasses"></i> Flying Detection</p>`,
        upgrade: function(tower){
       
            tower.damage += 3;
            //flying detection
     
        },
    },
    {
        name:"Full Minigun",
        cost:12500,
        details:`<p><i class="fas fa-bolt"></i> Damage: +6</p>
                 <p><i class="fas fa-bolt"></i> Reload Time: -0.01s</p>`,
        upgrade: function(tower){
       
            tower.damage += 4.5;
            tower.cooldown -= 10
     
        },
    },
    
    
//add flying detection 4-2
];
let ggupgrades2 = [
    {
        name:"Minigun Training",
        cost:425,
        details:`<p><i class="fas fa-bolt"></i> Damage: +0.5</p>
               
                 <p><i class="fas fa-shield-alt"></i> Range: +5</p>`,
        upgrade: function(tower){
       
            tower.damage += 0.5;
           
            tower.range += 0.5;
     
        },
    },
    {
        name:"Ammo Packs",
        cost:575,
        details:`
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.015s</p>`,
        upgrade: function(tower){
                  
            tower.cooldown -= 15;
     
        },
    },
    {
        name:"Dual Guns",
        cost:5250,
        details:`
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.03s</p>
                 <p><i class="fas fa-shield-alt"></i> Range: -2</p>
                 <p><i class="fas fa-shield-alt"></i> Damage: +1</p>`,
        upgrade: function(tower){
                  
            tower.cooldown -= 30;
            tower.range -= 2
            tower.damage += 1
     
        },
    },
    {
        name:"Popping Bullets",
        cost:11500,
        details:`
                 <p><i class="fas fa-shield-alt"></i> Reload Time: -0.02s</p>
                 <p><i class="fas fa-shield-alt"></i> Damage: -2</p>
                 <p><i class="fas fa-shield-alt"></i> Range: -3</p>
                 <p><i class="fa-solid fa-glasses"></i> Stealth Detection</p>`,
        upgrade: function(tower){
                  
            tower.cooldown -= 20;
            tower.damage -= 1
            tower.range -= 3  
            tower.canhitstealth = true
     
        },
    },
    {
        name:"ULTIMATE MACHINE GUN",
        cost:35000,
        details:`
                 
                 <p><i class="fas fa-shield-alt"></i> Damage: +4.5</p>
                 <p><i class="fas fa-shield-alt"></i> Range: +2</p>
                <p><i class="fas fa-shield-alt"></i> Stun Immunity</p>`,
        upgrade: function(tower){

            tower.damage += 4.5
            tower.range += 2  
            //stun immunity (when stuns exist)

        },
    },
]

function showGGUpgrades(tower){
   document.querySelector(".upgrades").style.display = "flex";
   // Logic to show the upgrades for the given tower
   // This could involve querying the database or making an API call
   // to fetch the upgrades for the specified tower
   
   // Example implementation:
   if (ggupgrades1.length <= towers[player.selectedTower].upgraded[0]
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
       = `  <span>${ggupgrades1[tower.upgraded[0]].name}</span>
                  <div class="cost">Cost: ${ggupgrades1[tower.upgraded[0]].cost}</div>
                  <div class="details">
                  ${ggupgrades1[tower.upgraded[0]].details}
                  </div>`
      }
      if (ggupgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
       = `  <span>${ggupgrades2[tower.upgraded[1]].name}</span>
                  <div class="cost">Cost: ${ggupgrades2[tower.upgraded[1]].cost}</div>
                  <div class="details">
                  ${ggupgrades2[tower.upgraded[1]].details}
                  </div>`
      
      }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
   if (towers[player.selectedTower].type !== 'gatgun') return
if (ggupgrades1.length <= towers[player.selectedTower].upgraded[0]
   || player.money < ggupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


   player.money -= ggupgrades1[towers[player.selectedTower].upgraded[0]].cost;
   towers[player.selectedTower].moneyspent += ggupgrades1[towers[player.selectedTower].upgraded[0]].cost

 
   ggupgrades1[towers[player.selectedTower].upgraded[0]]
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
    
  
  if (ggupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
   
   

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
   = `  <span>${ggupgrades1[tower.upgraded[0]].name}</span>
              <div class="cost">Cost: ${ggupgrades1[tower.upgraded[0]].cost}</div>
              <div class="details">
              ${ggupgrades1[tower.upgraded[0]].details}
              </div>`
  }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
   if (towers[player.selectedTower].type !== 'gatgun') return
   if (ggupgrades2.length <= towers[player.selectedTower].upgraded[1]
       || player.money < ggupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

   ggupgrades2[towers[player.selectedTower].upgraded[1]]
   .upgrade(towers[player.selectedTower])
 
   player.money -= ggupgrades2[towers[player.selectedTower].upgraded[1]].cost;
   towers[player.selectedTower].moneyspent += ggupgrades2[towers[player.selectedTower].upgraded[1]].cost
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
  
  if (ggupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

   

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
   = `  <span>${ggupgrades2[tower.upgraded[1]].name}</span>
              <div class="cost">Cost: ${ggupgrades2[tower.upgraded[1]].cost}</div>
              <div class="details">
              ${ggupgrades2[tower.upgraded[1]].details}
              </div>`
  
  }

})
