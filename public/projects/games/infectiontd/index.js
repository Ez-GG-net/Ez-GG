



var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.canvas.width = document.body.offsetHeight + 200 + 200;
ctx.canvas.height = document.body.offsetHeight



const renderPath = ()=>{
const image = document.getElementById('scene-level-img')
image.setAttribute('src','./images/level.b.png')


}


setTimeout(()=>{
renderPath()
})
const addCommaToNumber = (numb)=>{
   
    return numb.toLocaleString()
}
const convertArrayToCourds = (x,y,width,height)=>{
    return {x:x, y:y,width:width,height:height}
}
const singleTosquareCollision = (element1, element2)=>{
  
   return ((element1.x >= element2.x && element1.x <=  element2.x + element2.width &&
    element1.y >= element2.y && element1.y <= element2.y + element2.height))
        
    
    
}
const squareCollision = (element1, element2)=>{
   
    return ((element1.x + element1.width >= element2.x && element1.x <=  element2.x + element2.width &&
     element1.y + element1.height>= element2.y && element1.y <= element2.y + element2.height))
         
     
     
 }

let mousePos = {
    x:0,
    y:0,
}
const user = {
    health: 100,
    money: 100,
    dead: false,
    damageDone: 0,
    loadingAlive: false,
}
let waves = {
    started: false,
    on:0,
    DobleSped: false,
    
}
const towerBtn = [
    {
        x: ctx.canvas.width - 200 + 10,
        y: 130,
        width: 30,
        height: 30,
        color: 'rgb(255,0,0)',
        texture: './images/towers/InfectionTd-Tower-Lazer_Gunner.png'
    }
]

const healthy = [
   
]
const towers = [
    
]
const towersBulllet = [

]
const renderDeadScreen = ()=>{
    const offsetXWindow = ctx.canvas.width/2 - 300*2/2;
    const offsetYWindow = ctx.canvas.height/2 - 200*2/2;
   //draw border
    drawBorder(offsetXWindow, offsetYWindow, 300*2,200*2, 'rgba(155,155,155, 1)', 4)
     //draw bg
     ctx.fillStyle = 'rgb(2, 0, 0)';
     ctx.fillRect(offsetXWindow, offsetYWindow, 300*2,200*2)
     //draw text 'U DIED'
        //draw border
 //draw text 'U DIED'
 ctx.fillStyle=  'rgb(255,255,255)'
 ctx.font = '700 60px Orbitron'
 ctx.fillText(
    'U DIED',
    offsetXWindow+(300*2/2)-110+12/2, offsetYWindow+(200*2)/2-120+4, 300*2)
        //draw text
     ctx.fillStyle=  'rgb(255,0,5)'
     ctx.font = '700 60px Orbitron'
     ctx.fillText(
        'U DIED',
        offsetXWindow+(300*2/2)-110, offsetYWindow+(200*2)/2-120, 300*2)

        //draw line
          
     ctx.fillStyle = 'rgb(121, 121, 120)';
     ctx.fillRect(offsetXWindow, offsetYWindow+120, 300*2,10)

     //draw statistics
         //wave on
         ctx.fillStyle=  'rgb(255,255,255)'
         ctx.font = '700 30px Orbitron'
         ctx.fillText(
            `You survived till wave: ${waves.on}`,
            offsetXWindow+(300*2/2)-110-55-(`${waves.on}`.split('').length*30), offsetYWindow+(200*2)/2-35, 300*2)

            ctx.fillStyle=  'rgb(255,255,255)'
            ctx.font = '700 30px Orbitron'
            ctx.fillText(
               `You've dealth: ${user.damageDone} total damage`,
               offsetXWindow+(300*2/2)-110-105-(`${user.damageDone}`.split('').length*30)/2, offsetYWindow+(200*2)/2-35+40, 300*2)

    //play again button
    let borderthickness = 6
//draw border bg
ctx.beginPath()
ctx.fillStyle = 'rgb(250,250,250)'
ctx.roundRect(offsetXWindow+(300*2/2)-150- (borderthickness), offsetYWindow+(200*2)/2-35+30+50 - (borderthickness), 300 + (borderthickness * 2), 100 + (borderthickness * 2), [40])
ctx.fill();
  //draw bg
  ctx.beginPath()
  ctx.fillStyle = 
    'rgb(0,200,0)',
  ctx.roundRect(offsetXWindow+(300*2/2)-150, offsetYWindow+(200*2)/2-35+30+50, 300,100, [40]);
  ctx.fill();

  //draw behind text
  ctx.fillStyle=  'rgb(0,0,0)'
  ctx.font = '700 40px Orbitron'
  ctx.fillText(
     `Play Again`,
     offsetXWindow+(300*2/2)-150+33+2, offsetYWindow+(200*2)/2-35+30+50+60+2, 300,100)
  //draw text
  ctx.fillStyle=  'rgb(255,255,255)'

  ctx.fillText(
     `Play Again`,
     offsetXWindow+(300*2/2)-150+33, offsetYWindow+(200*2)/2-35+30+50+60, 300,100)
     
}
const renderCannotPlace = ()=>{
    const offsetXWindow = ctx.canvas.width/2 - 31;

    ctx.fillStyle = 'rgba(255,0,0,0.5)'
    ctx.fillRect(offsetXWindow-40/2, ctx.canvas.height-251, 71, 250)
    ctx.fillRect(offsetXWindow+51, ctx.canvas.height-251, 323, 71)
    ctx.fillRect(offsetXWindow+323-28, ctx.canvas.height-451, 79, 200)
    ctx.fillRect(offsetXWindow-284+71, ctx.canvas.height-451, 508, 71)
    ctx.fillRect(offsetXWindow-284, ctx.canvas.height-608, 71, 228)
    ctx.fillRect(offsetXWindow-284+71, ctx.canvas.height-608, 200, 71)
    ctx.fillRect(offsetXWindow-284+200, 0, 71, 107)
}

const addTower = (x,y)=>{
    towers[towers.length] = 
    {
        type:0,
        x:x - 30/2,
        y:y - 30/2,
        rotation: 0,
        width: 30,
        height: 30,
        range: 250,
        damage: 1,
        showrange: false,
        upgrades: [
            0,
            0,
        ],
        upgradecost: [
            100,
            100,
        ]
    }
   
}
let canPlaceHere = true;
const renderPlacingTower = ()=>{
   
    if (towerSelected == 'default') {
        //show range
        ctx.beginPath();
        ctx.arc(mousePos.x - 30/2, mousePos.y - 30/2,  250, 0, 2 * Math.PI);
        canPlaceHere = true;
        ctx.fillStyle = 'rgba(0,0,0,0.6)'

        const showingTower = {
            x: mousePos.x,
            y: mousePos.y,
            width: 30,
            height: 30,
        }

        for (let i =0; i < towers.length; i++) {
           
        if (squareCollision(showingTower, towers[i])) {
            ctx.fillStyle =  'rgba(255,0,0,0.6)'
            canPlaceHere = false;
           
           
        }
       
        }
        const offsetXWindow = ctx.canvas.width/2 - 31;
        const bugOffsetX = 12
        const bugOffsetY = 12
        if (
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow-40/2+bugOffsetX, ctx.canvas.height-251+bugOffsetY, 71, 250)) ||
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow+51+bugOffsetX, ctx.canvas.height-251+bugOffsetY, 323, 71)) ||
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow+323-28+bugOffsetX, ctx.canvas.height-451+bugOffsetY, 79, 200)) ||
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow-284+71+bugOffsetX, ctx.canvas.height-451+bugOffsetY, 508, 71)) ||
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow-284+bugOffsetX, ctx.canvas.height-608+bugOffsetY, 71, 228)) ||
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow-284+71+bugOffsetX, ctx.canvas.height-608+bugOffsetY, 200, 71)) ||
            squareCollision(showingTower, 
                convertArrayToCourds(offsetXWindow-284+200+bugOffsetX, 0+bugOffsetY, 71, 107))
        ) {
            canPlaceHere = false;
            renderCannotPlace()
        }
       
       
        ctx.fill();
        renderPanel()
        
        //show tower
        let towerTexture = new Image()

          
           towerTexture.src = './images/towers/InfectionTd-Tower-Lazer_Gunner.png'
        ctx.drawImage(towerTexture, mousePos.x - 30/2, mousePos.y - 30/2, 30, 30)
      
    }

}
const renderTowerRange = ()=>{
    for (let i = 0; i < towers.length; i++)
    if (towers[i].showrange) {
        
         
    ctx.beginPath();
                ctx.arc(towers[i].x+towers[i].width/2, towers[i].y+towers[i].height/2, towers[i].range, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(0,0,0,0.6)'
               
                ctx.fill();
                
                
    }
}
let towerShowUpgrade = null;
let towerSelected = null;
c.addEventListener("mousemove", (e)=>{
    if ((e.clientX - c.offsetLeft < ctx.canvas.width - 200 - 15)) {
        if (e.clientX - c.offsetLeft >  200 + 15) {
    mousePos = {
        x: e.clientX - c.offsetLeft,
        y: e.clientY,
    }
}
    }
  
})
let resettingTowers = false;
c.addEventListener('click', (e)=>{
    const mouse = {
        x: e.clientX - c.offsetLeft,
        y: e.clientY,
       
    }
    if (!user.dead) {
    if (canPlaceHere) {
    if (mouse.x < ctx.canvas.width - 200 - 35) {
        if (mouse.x >  200 + 15) {
    if (towerSelected == 'default') {
   
    addTower(mouse.x, mouse.y)
    resettingTowers = true;
    setTimeout(() => {
        resettingTowers = false;
        for (let i  =0; i < towers.length; i++) {
        lookHealthyFromTower(i)
        }
       
    }, 2);
    
    console.log(towers.length)
    towerSelected = null;
    }
  
    let selectedOne = false;
    for (let i = 0; i < towers.length; i++) {
       
        towers[i].showrange = singleTosquareCollision(mouse, towers[i])
        if (singleTosquareCollision(mouse, towers[i])) {
            selectedOne = true;
        towerShowUpgrade = {
            name: towers[i].type == 0? 'Default' : towers[i].type == 1?'Other':'Out of all games... Why u hack dis game????',
            numb: i,
        }
        } 
         //   console.log(mouse.x, mouse.y, towers[i].x, towers[i].y, towers[i].width)
        }
        if (!selectedOne) {
          
                towerShowUpgrade = null;
            
        }
    }

} else {
    if (mouse.x > towerBtn[0].x && mouse.x < towerBtn[0].x + towerBtn[0].width &&
        mouse.y > towerBtn[0].y && mouse.y < towerBtn[0].y + towerBtn[0].height) {
            if (user.money >= 50) {
                user.money -= 50
        towerSelected = 'default'
            } else {
                alert('U cannot afford this (cost: 50$)')
            }
    } else {
        towerSelected = null;
    }
}

    }
    if (towerShowUpgrade) {
        //sell button
    if (singleTosquareCollision(mouse, {x:15, y:ctx.canvas.height - 38 - 15, width:100, height:38})) {
        towers.splice(towerShowUpgrade.numb,1)
        towerShowUpgrade = null;
    } else
    //upgrade 1 btn
    if (singleTosquareCollision(mouse, {x:15, y:150 - 15, width: 170, height:60,})) {
        if (towers[towerShowUpgrade.numb].upgrades[0] <= 4) {
            if (user.money < towers[towerShowUpgrade.numb].upgradecost[0]) return   alert(`U cannot afford this (cost: ${towers[towerShowUpgrade.numb].upgradecost[0]}$)`) 
        towers[towerShowUpgrade.numb].upgrades[0]++;
        user.money = user.money - towers[towerShowUpgrade.numb].upgradecost[0];
        (
            towers[towerShowUpgrade.numb].upgrades[0] == 1 ?
        towers[towerShowUpgrade.numb].upgradecost[0] = 200 :
        towers[towerShowUpgrade.numb].upgrades[0] == 2 ?
        towers[towerShowUpgrade.numb].upgradecost[0] = 200 :
        'no hack ples, this game bad anyway'
        )
        }
    }
}
} else {
    const offsetXWindow = ctx.canvas.width/2 - 300*2/2;
    const offsetYWindow = ctx.canvas.height/2 - 200*2/2;
    let borderthickness = 2;
    if (singleTosquareCollision(mouse, convertArrayToCourds(offsetXWindow+(300*2/2)-150- (borderthickness), offsetYWindow+(200*2)/2-35+30+50 - (borderthickness), 300 + (borderthickness * 2), 100 + (borderthickness * 2)))) {
        //play again
        user.health = 100;
        user.dead= false;
        user.money = 100;
        user.damageDone = 0;
        

        towers.length = 0;
        healthy.length = 0;
        
        waves.on = 0;
        waves.DobleSped = false;
        waves.started = false;

        user.loadingAlive = true;
        
        
    }
}
//play button
if (singleTosquareCollision(mouse, convertArrayToCourds(ctx.canvas.width - 140 - (200-140)/2, ctx.canvas.height - 50 - 20, 140,50))) {
    if (!waves.started) {
        waves.started = true;
    loadWave(waves.on)
    } else {
        if (!waves.DobleSped) {
            waves.DobleSped = true;
        } else {
            waves.DobleSped = false;
        }
    }
}
//rendering settings

    //reduced bullets
if (singleTosquareCollision(mouse, convertArrayToCourds(ctx.canvas.width - 40 - 10, 10, 40, 40))) {
    renderingSettings.reducedBullets = 
    (
        renderingSettings.reducedBullets == 3 ?
        1
        : renderingSettings.reducedBullets == 2 ?
        3
        : 2
    )
}
})
let renderingSettings = {
    reducedBullets: 3,
}
const renderSettings = ()=>{
  
    //background
    ctx.beginPath()
    ctx.fillStyle = 'rgb(180,180,180)'
    ctx.roundRect(ctx.canvas.width - 40 - 10, 10, 40, 40,[10]);
    ctx.fill();


    //text or display
    ctx.fillStyle = 'rgb(250,250,250)'
    ctx.font = "18px serif";
    ctx.fillText(
        renderingSettings.reducedBullets == 3 ?
        'Max' :
        renderingSettings.reducedBullets == 2 ?
        'Med.' :
        renderingSettings.reducedBullets == 1 ?
        'Low' : 
        `computa says ${renderingSettings.reducedBullets} = ${Math.floor(Math.random()* 3)}`,
        ctx.canvas.width - 40 - 10 + 4, 10 + 24,)
}

const checkIfAllHealthyDead = ()=>{
    if (healthy.length <= 0) {
       
        waves.started = false;
} else {
setTimeout(() => {
    checkIfAllHealthyDead()
}, 1);
}
}

const createWave = (data)=>{
    console.log(false)
    if (user.dead)  return 
    
    let currentTime = 0;
    for (let i = 0; i < data.length; i++) {
     //   console.log(JSON.stringify(data[i].d), currentTime)
     if (user.loadingAlive) return
        let timeoutD = setTimeout(() => {
            setTimeout(() => {
                
                if (user.loadingAlive) return
            healthy[healthy.length] = 
            {
                type: 0,
                traveled: 0,
                x:0,
                y:0,
                health: data[i].h,
                tophealth: data[i].h,
                speed: 5,
            }
        }, (!waves.DobleSped?(currentTime+data[i].d)*(1/2): 1));
        currentTime += data[i].d/(waves.DobleSped?2: 1)
     
        }, (currentTime+data[i].d)*(1/2));
      
      
      
      
    }
    setTimeout(() => {
        
        user.loadingAlive = false;
    }, 20);
   
  
}

const loadWave = (wave)=>{

   console.log(waves.on)
    waves.on++
    wave = wave + 1
    if (waves.on >= 12) alert('This game has no more waves.')
    if (wave == 1) {
        console.log()
        let currentdelay = 0
        for (let i = 0; i < 20; i++) {
            if (user.loadingAlive) return

            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            //h = healh
            //d = delay
            currentdelay = currentdelay + 1200;
            
            if (i >= 19) {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            console.log(currentdelay+2+200)
                            checkIfAllHealthyDead()
                        }, 2+200);
                    }, currentdelay/2/(waves.DobleSped?2: 1));
                
                }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
            }
        }
       
    } else if (wave == 2) {
        let currentdelay = 0
        for (let i = 0; i < 30; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 700;
            if (i >= (30 - 1)) {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            console.log(currentdelay+2+200)
                            checkIfAllHealthyDead()
                        }, 2+200);
                    }, currentdelay/2/(waves.DobleSped?2: 1));
                
                }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
            }
        }
        
    
    }
    else if (wave == 3) {
        let currentdelay = 0
        for (let i = 0; i < 15; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 1200;
           
        }
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 5; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 1200;
                if (i >= (5 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },1500)
        
    
    } else  if (wave == 4) {
        let currentdelay = 0
        for (let i = 0; i < 20; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 900;
           
        }
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 10; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 1200;
                if (i >= (10 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },1000)
        
    
    } else if (wave == 5) {
        let currentdelay = 0;
        for (let i = 0; i < 5; i++) {
        createWave([
            {h:3,d:currentdelay},
        ])
       
        currentdelay = currentdelay + 800;
         if (i >= (5 - 1)) {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            console.log(currentdelay+2+200)
                            checkIfAllHealthyDead()
                        }, 2+200);
                    }, currentdelay/2/(waves.DobleSped?2: 1));
                
                }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
            }
        }
    
    } else if (wave == 6) {
        let currentdelay = 0;
        for (let i = 0; i < 15; i++) {
        createWave([
            {h:2,d:currentdelay},
        ])
        currentdelay = currentdelay + 800;
         if (i >= (15 - 1)) {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            console.log(currentdelay+2+200)
                            checkIfAllHealthyDead()
                        }, 2+200);
                    }, currentdelay/2/(waves.DobleSped?2: 1));
                
                }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
            }
        }
    
    } else if (wave == 7) {
        let currentdelay = 0
        for (let i = 0; i < 15; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 800;
           
        }
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 10; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 300;
                if (i >= (10 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },2500)
    
    }else if (wave == 8) {
       
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 30; i++)
            {
                createWave([
                    {h:1,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 800;
               
            }
        },200)
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 30; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 800;
                if (i >= (30 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },300)
    
    }
    else if (wave == 9) {
        let currentdelay = 0
        for (let i = 0; i < 10; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:2,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 800;
           
        }
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 20; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 800;
               
            }
   
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 30; i++)
            {
                createWave([
                    {h:1,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 600;
                if (i >= (20 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },300)
},300)
    } else if (wave == 10) {
        let currentdelay = 0
        for (let i = 0; i < 7; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 1600;
           
        }
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 10; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 1200;
             
            }
   
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 10; i++)
            {
                createWave([
                    {h:3,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 1200;
                if (i >= (10 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },300)
},300)
       
    }
    else if (wave == 11) {
        let currentdelay = 0
        for (let i = 0; i < 25; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 400;
           
        }
       
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 15; i++)
            {
                createWave([
                    {h:3,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 600;
                if (i >= (15 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },600)

    }else if (wave == 12) {
        let currentdelay = 0
        for (let i = 0; i < 120/4; i++) {
            if (user.loadingAlive) return
            createWave([
                {h:1,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 200*4;
           
        }
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 60/4; i++)
            {
                createWave([
                    {h:2,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 400*4;
             
            }
   
        setTimeout(() => {
            let currentdelay = 0
            for (let i = 0; i < 20/4; i++)
            {
                createWave([
                    {h:3,d:5+currentdelay},
                    
                  
                ])
                currentdelay = currentdelay + 1200*4;
                if (i >= (20 - 1)) {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log(currentdelay+2+200)
                                checkIfAllHealthyDead()
                            }, 2+200);
                        }, currentdelay/2/(waves.DobleSped?2: 1));
                    
                    }, currentdelay/2/(waves.DobleSped?2: 1)-2200);
                }
            }
    },1000)
},300)
    }
        
    
    
    
    else if (wave == 30) {
        let currentdelay = 0
        for (let i = 0; i < 1000; i++) {
            if (user.loadingAlive) return

            createWave([
                {h:2,d:5+currentdelay},
                
              
            ])
            currentdelay = currentdelay + 70;
        }
    }
}
const drawBorder =(xPos, yPos, width, height, color,thickness = 1)=>
{
  ctx.fillStyle=color;
  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}
const renderPanel = ()=>{
    ctx.fillStyle = 'brown';
    ctx.fillRect(ctx.canvas.width - 200, 0, 200, ctx.canvas.height)
  
    //grey box

    drawBorder(ctx.canvas.width - 200 + 10, 130, 180, ctx.canvas.height - 130 - 120, 'rgb(255,255,255)', 2)

    
    ctx.fillStyle = 'rgb(80,80,80)'
    ctx.fillRect(ctx.canvas.width - 200 + 10, 130, 180, ctx.canvas.height - 130 - 120)

for (let i = 0; i < towerBtn.length; i++) {
    let towerTexture = new Image()

          
    towerTexture.src = towerBtn[i].texture
    ctx.drawImage(towerTexture, towerBtn[i].x, towerBtn[i].y, towerBtn[i].width, towerBtn[i].height)
}

//health
    //heart
    const heart = new Image()
    heart.src = './images/ui/heart.png'
    ctx.drawImage(heart,ctx.canvas.width - 200 + 20, 2, 35,35)
    //text
ctx.fillStyle = 'rgb(250,250,250)'
ctx.font = "500 24px Orbitron";
ctx.fillText(user.health, ctx.canvas.width - 200 + 20 + 40, 28, 200-20)

//money
    //dollar
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.font = "700 24px Orbitron";
    ctx.fillText('$', ctx.canvas.width - 200 + 20+7+7, 28+24*2+8, 200-20)
    //text
    ctx.fillStyle = 'rgb(250,250,250)'
ctx.font = "500 14px Orbitron";
ctx.fillText(addCommaToNumber(user.money), ctx.canvas.width - 200 + 20 + 25+14, 28+24*2+5, 200-20)

//wave
const sword = new Image()
sword.src = './images/ui/wave-indicator.png'
ctx.drawImage(sword,ctx.canvas.width - 200 + 20, 2+24+8, 35,35)
//text
ctx.fillStyle = 'rgb(250,250,250)'
ctx.font = "500 24px Orbitron";
ctx.fillText(waves.on, ctx.canvas.width - 200 + 20 + 40, 28+24+8, 200-20)



//render play button
let borderthickness = 6
//draw border bg
ctx.beginPath()
ctx.fillStyle = 'rgb(0,0,0)'
ctx.roundRect(ctx.canvas.width - 140 - (200-140)/2 - (borderthickness), ctx.canvas.height - 50 - 20 - (borderthickness), 140 + (borderthickness * 2), 50 + (borderthickness * 2), [40])
ctx.fill();
  //draw bg
  ctx.beginPath()
  ctx.fillStyle = (
    !waves.started ? 'rgb(00,250,00)': 'rgb(0,0,255)')
  ctx.roundRect(ctx.canvas.width - 140 - (200-140)/2, ctx.canvas.height - 50 - 20, 140,50, [40]);
  ctx.fill();
    //draw text
ctx.fillStyle = 'rgb(250,250,250)'
ctx.font = "28px serif";
ctx.fillText( !waves.started ?'Start' :
 `Speed ${waves.DobleSped ? '2x' : '1x'}`,
  ctx.canvas.width - 140 - (200-140)/2 + 45, ctx.canvas.height - 50 - 20 + 35, 200-20)
}
const renderUpgradePanel = ()=>{
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, 0, 200, ctx.canvas.height)
  
    drawBorder(10, 130, 180, ctx.canvas.height - 140, 'rgb(255,255,255)', 2)

    ctx.fillStyle = 'rgb(80,80,80)'
    ctx.fillRect(10, 130, 180, ctx.canvas.height - 140)

    ctx.fillStyle = 'rgb(250,250,250)'
    ctx.font = "28px serif";
    ctx.fillText(towerShowUpgrade ? towerShowUpgrade.name:'', 20, 20, 200-20)

    //not enchanced

    //upgrade 1
    if (towerShowUpgrade) {
  //draw boder
  let borderSize = 3;
  ctx.beginPath()
  ctx.fillStyle = 'rgb(250,250,250)'
  ctx.roundRect(15 - borderSize, 150 - 15- borderSize, 170+ borderSize*2, 60+ borderSize*2, [40]);
  ctx.fill();
  //draw bg
  ctx.beginPath()
  ctx.fillStyle = 'rgb(100,120,220)'
  ctx.roundRect(15, 150 - 15, 170, 60, [40]);
  ctx.fill();

  //sell
            //draw boder
            borderSize = 3;
            ctx.beginPath()
            ctx.fillStyle = 'rgb(250,250,250)'
            ctx.roundRect(15 - borderSize, ctx.canvas.height - 38 - 15- borderSize, 100+ borderSize*2, 38+ borderSize*2, [40]);
            ctx.fill();
            
            
              //draw bg
    ctx.beginPath()
    ctx.fillStyle = 'rgb(250,20,20)'
    ctx.roundRect(15, ctx.canvas.height - 38 - 15, 100, 38, [40]);
    ctx.fill();
    //draw text
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.font = "bold 28px serif";
    
    ctx.fillText('Sell',
         50-16/2, ctx.canvas.height -30 + 10/2, 60)
    }

    ctx.fillStyle = 'rgb(250,250,250)'
    ctx.font = "18px serif";
    ctx.fillText(towerShowUpgrade ?
         towerShowUpgrade.name == "Default" ?
         towers[towerShowUpgrade.numb].upgrades[0] == 0 ?
         'Increase Attack' : 
         towers[towerShowUpgrade.numb].upgrades[0] == 1 ? 
         'Increase Attack':"This game isn't working"
         : 'This game isnt work hacking'
         :'',
          20, 155, 200-40)
          ctx.fillText(towerShowUpgrade ?
            towerShowUpgrade.name == "Default" ?
            towers[towerShowUpgrade.numb].upgrades[0] == 0 ?
            'Speed' : 
            towers[towerShowUpgrade.numb].upgrades[0] == 1 ?
            'Damage': "This game isn't working"
            : 'This game isnt work hacking'
            :'',
             20, 155+20, 200-40)

             if (towerShowUpgrade) {
    ctx.font = "18px serif";
    ctx.fillText(`(${towers[towerShowUpgrade.numb].upgradecost[0]}$)`,
                200-60, 167, 60)

             }
            
}

const renderTower = ()=>{
    for (let i = 0; i < towers.length; i++) {
        let towerTexture = new Image()
        if (towers[i].type == 0) {
          
           towerTexture.src = './images/towers/InfectionTd-Tower-Lazer_Gunner.png'
        }
        const center = {
            x: towers[i].x + 30 / 2,
            y: towers[i].y + 30 / 2
        }
        ctx.save();
        ctx.translate(center.x, center.y)
        ctx.rotate((Math.PI * towers[i].rotation) / 180)
      
        ctx.translate(-center.x, -center.y)
        ctx.drawImage(towerTexture,towers[i].x, towers[i].y, 30, 30)
        ctx.restore();
        
    }

}
const renderBullets = ()=>{
    for (let i = 0; i < towersBulllet.length; i++) {
        if (towersBulllet.length > (renderingSettings.reducedBullets == 3 ?
            1000000 :
            renderingSettings.reducedBullets == 2 ?
            100000 :
            renderingSettings.reducedBullets == 1 ?
            10000 : 0
          )) return
    
          
          
            ctx.fillStyle = 'red'
        
        const center = {
            x: towersBulllet[i].x + 30 / 2,
            y: towersBulllet[i].y + 10 / 2
        }
        ctx.save();
        ctx.translate(center.x, center.y)
        ctx.rotate((Math.PI * towersBulllet[i].rotation) / 180 +80)
      
        ctx.translate(-center.x, -center.y)
        ctx.fillRect(towersBulllet[i].x, towersBulllet[i].y, 30, 10)
        ctx.restore();
        
    }

}
const moveBullets = (bullet, selected, speed, hNumb, hdamage)=>{
    if (!bullet) {
        setTimeout(() => {
            if (!bullet) {
            towersBulllet.splice(selected, 0)
            }
        }, 2000);
       
        return
    };
    if (!healthy[hNumb]) return
    
    bullet.x += speed * Math.cos(bullet.rotation * Math.PI / 180 +80);
    bullet.y += speed * Math.sin(bullet.rotation * Math.PI / 180 +80);
    if (bullet.timeleft <= 0) {
       setTimeout(() => {
        towersBulllet.splice(selected, 2)
       }, 1);
        
        healthy[hNumb].health -= hdamage;
        //console.log(healthy[hNumb].health)
       
    } else {
      
    setTimeout(() => {
        bullet.timeleft--;
       
        moveBullets(bullet, selected, speed, hNumb, hdamage)
    }, 1);
}
}
let shootCooldown = {
    a:1
    
};
const shootHealthy = (tNumb, closestToExit, hNumb)=>{
   
    shootCooldown.a = (
        towers[tNumb].upgrades[0] == 0 ? 150/(waves.DobleSped ? 2 : 1) :
         towers[tNumb].upgrades[0] == 1 ? 100/(waves.DobleSped ? 2 : 1) :
         towers[tNumb].upgrades[0] == 2 ? 100/(waves.DobleSped ? 2 : 1) : 1);

    if (towers[tNumb].upgrades[0] >= 1) {
        towers[tNumb].damage = 2
    }
     //shoot--

     const speed = 20;
     const x1 = closestToExit.x
     const x2 = towers[tNumb].x

     const y1 = closestToExit.y
     const y2 = towers[tNumb].y

     const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        //create bullet
        towersBulllet[towersBulllet.length] = 
        {
           
            x:towers[tNumb].x,
            y:towers[tNumb].y,
            rotation: towers[tNumb].rotation-90,
            timeleft: distance/speed,
        }
        //console.log(towersBulllet[0].x, towersBulllet[0].y)
    
            //move bullet
            setTimeout(() => {
                setTimeout(() => {
                   
                    towersBulllet.splice(0, towersBulllet.length)
                    
                  },  2500);
                  if (!user.dead) {
                  user.damageDone += towers[tNumb].damage
                  }
                moveBullets(towersBulllet[towersBulllet.length - 1],(towersBulllet.length - 1), speed, hNumb, towers[tNumb].damage)
            }, 1);
          
}
const lookHealthyFromTower = (tNumb)=>{
    if (!towers[tNumb]) return
    if (resettingTowers) return
    //allowed healthy in range of tower
    let closestToExitNumb = null;
    let Ahealthy = [];
    for (let i = 0; i < healthy.length; i++) {
        const x1 = healthy[i].x
        const x2 = towers[tNumb].x

        const y1 = healthy[i].y
        const y2 = towers[tNumb].y

        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

        if (distance < towers[tNumb].range) {
            if (closestToExitNumb == null) {
                closestToExitNumb = i;
            }
            Ahealthy[Ahealthy.length] = healthy[i];
        }
    }
    if (Ahealthy.length > 0) {
   

    let closestToExit = Ahealthy[0]
    let max = Ahealthy[0].traveled;
   
    for (let i = 0; i < Ahealthy.length; i++) {
        if (Ahealthy[i].traveled > max) {
           
            max = Ahealthy[i].traveled;
            closestToExit = Ahealthy[i];
            
        }
    
    }
    setTimeout(() => {
       
  
   if (shootCooldown.a <= 0) {
    
        shootHealthy(tNumb, closestToExit, closestToExitNumb)
   } else {
    shootCooldown.a--;
   }
}, 1);
  
    //look in direction
    towers[tNumb].rotation = 
   
   
    Math.atan2(
        (closestToExit.y - towers[tNumb].y),( closestToExit.x - towers[tNumb].x)
    )* 180/Math.PI - 180
    
  //  console.log(towers[tNumb].rotation,  towers[tNumb].x,towers[tNumb].y, closestToExit.x, closestToExit.y)
  
    }
   
    setTimeout(() => {
        lookHealthyFromTower(tNumb)
    }, 2);
}
setTimeout(() => {
   
}, 2000);

const renderHealthy = ()=>{
  

    for (let i = 0; i < healthy.length; i++) {
    
        let healthyTexture = new Image()
          if (healthy[i].health > (10-1)) {
            healthy[i].type = 3
        }
        else if (healthy[i].health > (3-1))  {
            healthy[i].type = 2
        } else    if (healthy[i].health > (2-1)) {
            healthy[i].type = 1
        } else   if (healthy[i].health > (1-1)) {
            healthy[i].type = 0
        }  


        if (healthy[i].type == 0) {
          
            healthyTexture.src = './images/enemies/blueGuy.png'
        } else if (healthy[i].type == 1) {
          
            healthyTexture.src = './images/enemies/redGuy.png'
        } else if (healthy[i].type == 2) {
          
            healthyTexture.src = './images/enemies/greenGuy.png'
        } else if (healthy[i].type == 3) {
          
            healthyTexture.src = './images/enemies/oscuroGuy.png'
        } 

        //move
        const healthyWidth = (healthy[i].type == 3?60:40);
        const healthyHeight =  (healthy[i].type == 3?60:40);
        const offsetXWindow = ctx.canvas.width/2 - 20;
    if (healthy[i].traveled < 110) {
        ctx.drawImage(healthyTexture, offsetXWindow-healthyWidth/2,ctx.canvas.height-healthy[i].traveled*2-healthyHeight/2,healthyWidth, healthyHeight)
        healthy[i].x = offsetXWindow
        healthy[i].y = ctx.canvas.height-healthy[i].traveled*2
    } else if (healthy[i].traveled < 265) {
        ctx.drawImage(healthyTexture, offsetXWindow+(healthy[i].traveled-110)*2-healthyWidth/2,ctx.canvas.height-110*2-healthyHeight/2,healthyWidth, healthyHeight)
            healthy[i].x = offsetXWindow+(healthy[i].traveled-110)*2
            healthy[i].y = ctx.canvas.height-110*2
        }  else  if (healthy[i].traveled < 365) {
            ctx.drawImage(healthyTexture, offsetXWindow+155*2-healthyWidth/2, ctx.canvas.height-(healthy[i].traveled-155)*2-healthyHeight/2,healthyWidth, healthyHeight)
                healthy[i].x = offsetXWindow+155*2
                healthy[i].y = ctx.canvas.height-(healthy[i].traveled-155)*2
            }
            else if (healthy[i].traveled < 653) {
               
                ctx.drawImage(healthyTexture, offsetXWindow-(healthy[i].traveled-445)*2+155-healthyWidth/2,ctx.canvas.height-(155+55)*2-healthyHeight/2,healthyWidth, healthyHeight)
                healthy[i].x = offsetXWindow-(healthy[i].traveled-445)*2+155
                healthy[i].y = ctx.canvas.height-(155+55)*2
            }  else  if (healthy[i].traveled < 730) {
                ctx.drawImage(healthyTexture, offsetXWindow-130*2-healthyWidth/2, ctx.canvas.height-(healthy[i].traveled-440)*2-healthyHeight/2,healthyWidth, healthyHeight)
                    healthy[i].x = offsetXWindow-130*2
                    healthy[i].y = ctx.canvas.height-(healthy[i].traveled-440)*2
                }
                else if (healthy[i].traveled < 820) {
                    
                    ctx.drawImage(healthyTexture, offsetXWindow+(healthy[i].traveled-803)*2-104-healthyWidth/2,ctx.canvas.height-(155+135)*2-healthyHeight/2,healthyWidth, healthyHeight)

                    healthy[i].x =offsetXWindow+(healthy[i].traveled-803)*2-104
                    healthy[i].y = ctx.canvas.height-(155+135)*2
                }  else  if (healthy[i].traveled < 920) {
                    ctx.drawImage(healthyTexture, offsetXWindow-130*2+199-healthyWidth/2, ctx.canvas.height-(healthy[i].traveled-824)*2-600-healthyHeight/2,healthyWidth, healthyHeight)
                        healthy[i].x = offsetXWindow-130*2+199
                        healthy[i].y = ctx.canvas.height-(healthy[i].traveled-824)*2-600
                    }
            
            
            
            
            else {
                //at end
                user.health -= healthy[i].health
                healthy.splice(i,1)
                console.log(healthy.length)
            }
            if (healthy[i]) {
            if (healthy[i].health <= 0) {
                //add money
                user.money = user.money + healthy[i].tophealth/7.5
                //die
                healthy.splice(i,1)
            }
        }


        if (user.health <= 0) {
            user.dead = true;
        }
        }
}
const moveHealth = ()=>{
    for (let i = 0; i < healthy.length; i++) {
        
    healthy[i].traveled += healthy[i].speed/10*(waves.DobleSped ? 2 : 1)*(healthy[i].type == 3?0.7:1);
        
  
   
}
setTimeout(() => {
    moveHealth()
}, 10);
}
setTimeout(() => {
    moveHealth()
}, 1000);
renderPanel()
const render = ()=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    renderTowerRange()
    renderHealthy()
    renderTower()
    renderBullets()
    renderPlacingTower()
    renderPanel()
 renderUpgradePanel()
 renderSettings()
    if (user.dead) {
        renderDeadScreen()
    }

    setTimeout(() => {
        render()
    }, 1);
}
setTimeout(() => {
    render()
}, 1);
