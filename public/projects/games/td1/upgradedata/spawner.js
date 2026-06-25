let supgrades1 = [
    {
     name:"Mounted Gunner",
     cost:500,
     details:`<p><i class="fas fa-bolt"></i> Humvee Level 1 | 25 HP | 5 DPS | 1 Every 10 Seconds</p>
             
              <br>`,
     upgrade: function(tower){
   
       tower.special.tospawn[0].damage += 4
       
       
   
     },
 },
 {
    name:"Heavy Bullets",
    cost:750,
    details:`<p><i class="fas fa-bolt"></i> Humvee Level 1 | 25 HP | 10 DPS | 1 Every 10 Seconds</p>
           
             <br>`,
    upgrade: function(tower){
   
 
     
        tower.special.tospawn[0].damage += 5
 
    },
},
  {
    name:"Tank Factory",
    cost:2000,
    details:`<p><i class="fas fa-bolt"></i> Tank Level 1 | 300 HP | 50 DPS | 1 Every 25 Seconds</p>
               <p><i class="fas fa-bolt"></i> Humvee Level 1 Removed</p>
           
             `,
    upgrade: function(tower){
   

        tower.special.tospawn[0] =  {
            name: "Tank Level 1",
            color: "darkgreen",
            intervalIndex:10000,
            interval:25000,
            health:300,
           
            movingDirection:90,
            speed:0.025,


            splashRadius:5,

            range:20,
            damage:100,
            cooldown:2000,
            canhitstealth:false,

            width:30,
            height:40,
        }
       
     
 
    },
},
       
{
    name:"Double Barrel",
    cost:4500,
    details:`<p><i class="fas fa-bolt"></i> Tank Level 2 | 450 HP | 175 DPS | 1 Every 25 Seconds</p>
           
             <br>`,
    upgrade: function(tower){
   
 
        tower.special.tospawn[0] =  {
            name: "Tank Level 2",
            color: "darkgreen",
            intervalIndex:10000,
            interval:25000,
            health:450,
           

            splashRadius:5,

            movingDirection:90,
            speed:0.025,

            range:20,
            damage:87.5,
            cooldown:500,
            canhitstealth:false,

            width:30,
            height:40,
        }
       
     
 
    },
},
{
    name:"The Weapon of Mass Destruction",
    cost:15000,
    details:`<p><i class="fas fa-bolt"></i> Tank Level 3 | 1000 HP | 1000 DPS | 1 Every 50 Seconds</p>
           
             <br>`,
    upgrade: function(tower){
   

        tower.special.tospawn[0] =  {
            name: "Tank Level 3",
            color: "darkgreen",
            intervalIndex:10000,
            interval:25000,
            health:750,
           
            movingDirection:90,
            speed:0.025,

            splashRadius:7.5,

            range:20,
            damage:100,
            cooldown:100,
            canhitstealth:false,

            width:30,
            height:40,
        }
       
     
 
   
       
     
 
    },
},
 ];
 let supgrades2 = [
    {
    name:"Second Gas Tank",
    cost:375,
    details:`<p><i class="fas fa-bolt"></i> Humvee Level 1 | 25 HP | 10 DPS | 1 Every 17 Seconds</p>
           
             <br>`,
    upgrade: function(tower){
   

        tower.special.tospawn[0].interval -= 20000-17000;
       
     
 
    },
},
     
    {
    name:"Faster Mechanics",
    cost:500,
    details:`<p><i class="fas fa-bolt"></i> Humvee Level 1 | 25 HP | 10 DPS | 1 Every 6 Seconds</p>
           
             <br>`,
    upgrade: function(tower){
   

        tower.special.tospawn[0].interval -= 8000-6000
       
     
 
    },
},
       
         {
    name:"Tri-Barrel Gun",
    cost:975,
    details:`<p><i class="fas fa-bolt"></i> Humvee Level 2 | 50 HP | 24 DPS | 1 Every 7.5 Seconds</p>
               <p><i class="fas fa-bolt"></i> Humvee Level 1 Removed</p>
           
             `,
    upgrade: function(tower){
   
   
        tower.special.tospawn[0] =  {
            name: "Humvee Level 2",
            color: "green",
            intervalIndex:0,
            interval:7500,
            health:50,
           
            movingDirection:90,
            speed:0.059,


       

            range:20,
            damage:12,
            cooldown:500,
            canhitstealth:true,

            width:30,
            height:40,
        }
       
     
 
    },
     
 
    },

            {
    name:"Explosive Shells",
    cost:2250,
    details:`<p><i class="fas fa-bolt"></i> Humvee Level 2 | 50 HP | 24 DPS | 1 Every 7.5 Seconds</p>
               <p><i class="fas fa-bolt"></i> Humvee Level 3 | 75 HP | 15 DPS | 1 Every 10 Seconds</p>
           
             `,
    upgrade: function(tower){
   
     
       
        tower.special.tospawn[1] =  {
            name: "Humvee Level 3",
            color: "green",
            intervalIndex:0,
            interval:10000,
            health:75,
           
            movingDirection:90,
            speed:0.059,


            splashRadius:4.5,

            range:25,
            damage:30,
            cooldown:2000,
            canhitstealth:true,

            width:30,
            height:40,
        }
       
       
     
 
    },
},
                 {
    name:"Chaingun",
    cost:5000,
    details:`   <p><i class="fas fa-bolt"></i> Humvee Level 3 | 75 HP | 20 DPS | 1 Every 10 Seconds</p>
<p><i class="fas fa-bolt"></i> Humvee Level 4 | 300 HP | 125 DPS | 1 Every 15 Seconds</p>
               <p><i class="fas fa-bolt"></i> Humvee Level 2 Removed</p>
           
             `,
    upgrade: function(tower){
   

       
        tower.special.tospawn[2] =  {
            name: "Humvee Level 4",
            color: "green",
            intervalIndex:0,
            interval:15000,
            health:150,
           
            movingDirection:90,
            speed:0.059,


            splashRadius:5,

            range:20,
            damage:10,
            cooldown:100,
            canhitstealth:true,

            width:30,
            height:40,
        }
         
       
     
 
    },
},



 ]
 
 function showSUpgrades(tower){
    document.querySelector(".upgrades").style.display = "flex";
    // Logic to show the upgrades for the given tower
    // This could involve querying the database or making an API call
    // to fetch the upgrades for the specified tower
   
    // Example implementation:
    if (supgrades1.length <= towers[player.selectedTower].upgraded[0]
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
        = `  <span>${supgrades1[tower.upgraded[0]].name}</span>
                   <div class="cost">Cost: ${supgrades1[tower.upgraded[0]].cost}</div>
                   <div class="details">
                   ${supgrades1[tower.upgraded[0]].details}
                   </div>`
       }
       if (supgrades2.length <= towers[player.selectedTower].upgraded[1]
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
        = `  <span>${supgrades2[tower.upgraded[1]].name}</span>
                   <div class="cost">Cost: ${supgrades2[tower.upgraded[1]].cost}</div>
                   <div class="details">
                   ${supgrades2[tower.upgraded[1]].details}
                   </div>`
       
       }
}
document.querySelectorAll(".upgrades .upgrade")[0]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'spawner') return
if (supgrades1.length <= towers[player.selectedTower].upgraded[0]
    || player.money < supgrades1[towers[player.selectedTower].upgraded[0]].cost //fix money issue
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


    player.money -= supgrades1[towers[player.selectedTower].upgraded[0]].cost;
    towers[player.selectedTower].moneyspent += supgrades1[towers[player.selectedTower].upgraded[0]].cost

 
    supgrades1[towers[player.selectedTower].upgraded[0]]
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
     
   
   if (supgrades1.length <= towers[player.selectedTower].upgraded[0]) {
   
   

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
    = `  <span>${supgrades1[tower.upgraded[0]].name}</span>
               <div class="cost">Cost: ${supgrades1[tower.upgraded[0]].cost}</div>
               <div class="details">
               ${supgrades1[tower.upgraded[0]].details}
               </div>`
   }
})
document.querySelectorAll(".upgrades .upgrade")[1]
.addEventListener("click", function(){
    if (towers[player.selectedTower].type !== 'spawner') return
    if (supgrades2.length <= towers[player.selectedTower].upgraded[1]
        || player.money < supgrades2[towers[player.selectedTower].upgraded[1]].cost //fix money issue
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

    supgrades2[towers[player.selectedTower].upgraded[1]]
    .upgrade(towers[player.selectedTower])
 
    player.money -= supgrades2[towers[player.selectedTower].upgraded[1]].cost;
    towers[player.selectedTower].moneyspent += supgrades2[towers[player.selectedTower].upgraded[1]].cost
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
   
   if (supgrades2.length <= towers[player.selectedTower].upgraded[1]) {

   

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
    = `  <span>${supgrades2[tower.upgraded[1]].name}</span>
               <div class="cost">Cost: ${supgrades2[tower.upgraded[1]].cost}</div>
               <div class="details">
               ${supgrades2[tower.upgraded[1]].details}
               </div>`
   
   }

})