let bbupgrades1 = [
	{
		name:"Outer Shells",
		cost:1200,
        details:`
        <p><i class="fa-solid fa-bolt"></i> Damage: +20</p>
        <p><i class="fa-solid fa-bolt"></i> Splash Radius: +1</p>
             `,
		upgrade:function(tower){
			tower.damage += 20
			tower.special.splashRadius += 1
		}
	},
	{
		name:"Lighter Ammo",
		cost:500,
        details:`
            <p><i class="fas fa-bolt"></i> Reload Time: -0.5s</p><br>
             `,
		upgrade:function(tower){
			tower.cooldown -= 500
		}
	},
		{
		name:"Cyborg Extension",
		cost:4000,
        details:`
              <p><i class="fas fa-bolt"></i> Damage: +100</p>
        <p><i class="fas fa-bolt"></i> Reload Time: -2s</p>
         `,
		upgrade:function(tower){
			tower.damage += 100
			tower.cooldown -= 2000
		}
	},
		{
		name:"Electrical Artillary",
		cost:9_750,
        details:`
        <p><i class="fas fa-bolt"></i> Damage: +20</p>
  <p><i class="fas fa-bolt"></i> Reload Time: -0.3s</p>
   `,
		upgrade:function(tower){
			tower.damage += 20
			tower.cooldown -= 300
		}
	},
		{
		name:"Fully Autonomus Weaponry System",
		cost:25_000,
        details:`
        <p><i class="fas fa-bolt"></i> Damage: +100</p>
  <p><i class="fas fa-bolt"></i> Reload Time: -1s</p>
          <p><i class="fa-solid fa-bolt"></i> Splash Radius: +1</p>
   `,
		upgrade:function(tower){
			tower.damage += 100
			tower.cooldown -= 1000
			tower.special.splashRadius += 2
		}
	},
]







let bbupgrades2 = [
		{
		name:"Internal Oil",
		cost:900,
        details:`
        <p><i class="fas fa-bolt"></i> Damage: +20</p>
  <p><i class="fas fa-bolt"></i> Reload Time: -0.5s</p>
   `,
		upgrade:function(tower){
			tower.damage += 20
			tower.cooldown -= 500
		}
	},
	{
		name:"Containment Unit",
		cost:1500,
        details:`
  <p><i class="fas fa-bolt"></i> Reload Time: -0.5s</p>
          <p><i class="fa-solid fa-bolt"></i> Splash Radius: +0.5</p>
   `,
		upgrade:function(tower){
			tower.cooldown -= 500
			tower.special.splashRadius += 0.5
		}
	},
		{
		name:"Increased Gunpowder",
		cost:2_000,
        details:`
        <p><i class="fas fa-bolt"></i> Damage: +50</p>
  <p><i class="fas fa-bolt"></i> Reload Time: +2s</p>
          <p><i class="fa-solid fa-bolt"></i> Splash Radius: +1</p>
     <p><i class="fa-solid fa-bolt"></i> Range: +5</p>
   `,
		upgrade:function(tower){
			tower.damage += 50
			tower.range += 5
			tower.special.splashRadius += 1
			tower.cooldown += 2000
		}
	},
	{
		name:"Shackled Cannon Balls",
		cost:6_500,
        details:`
        <p><i class="fas fa-bolt"></i> Damage: +150</p>
  <p><i class="fas fa-bolt"></i> Reload Time: +3s</p>
          <p><i class="fa-solid fa-bolt"></i> Splash Radius: +2.5</p>
   `,
		upgrade:function(tower){
			tower.damage += 150
			tower.cooldown += 2000
			tower.special.splashRadius += 2.5
			
		}
	},
		{
		name:"Hydrogen Bomb",
		cost:20_000,
        details:`
        <p><i class="fas fa-bolt"></i> Damage: +9500</p>
  <p><i class="fas fa-bolt"></i> Reload Time: +2.5s</p>
          <p><i class="fa-solid fa-bolt"></i> Splash Radius: +10</p>
   `,
		upgrade:function(tower){
			tower.damage += 9500
			tower.cooldown += 2500
			tower.special.splashRadius  += 10
            
		}
	},
]



function showBBUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
    
    // Example implementation:
    if (bbupgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${bbupgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${bbupgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${bbupgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (bbupgrades2.length <= towers[player.selectedTower].upgraded[1] 
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
        = `  <span>${bbupgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${bbupgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${bbupgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'bombilary') return
if (bbupgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < bbupgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= bbupgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += bbupgrades1[towers[player.selectedTower].upgraded[0]].cost

  
    bbupgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (bbupgrades1.length <= towers[player.selectedTower].upgraded[0]) {
    
    

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
    = `  <span>${bbupgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${bbupgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${bbupgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'bombilary') return
    if (bbupgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < bbupgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    bbupgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
  
    player.money -= bbupgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += bbupgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (bbupgrades2.length <= towers[player.selectedTower].upgraded[1]) {

    

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
    = `  <span>${bbupgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${bbupgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${bbupgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})
