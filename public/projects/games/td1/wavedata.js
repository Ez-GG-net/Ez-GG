
let waveBonuses  =[]
let waves = []
let dialogues = []
  



function factionTyping(type, stealth, immune) {
    switch(type){
        case "normal":
        case "speedy":
        case "strong":
            enemies[enemies.length-1].faction = 'rover'; break;
        case "armored normal":
        case "armored strong":
        case "armored speedy":
            enemies[enemies.length-1].faction = 'armored'; break;
        case "boss1":
        case "speedy boss":
            enemies[enemies.length-1].faction = 'boss'; break;
        case "rev strong":
            enemies[enemies.length-1].faction = 'weighted'; break;
        
    }
    switch(type){
        case "normal":
            enemies[enemies.length-1].subfaction = 'blaze'; break;
    }

}

const createEnemy = function(type, stealth = false, immune){
    switch(type){
    case "normal":
    enemies.push( {
        x:375,
        y:795,
        width:30/1.5,
        height:30/1.5,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.08,
        health:5,
        maxhealth:5,
        stealth,
        freezeResistance:1,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })
    break;
    case "boss1":
        enemies.push( {
            x:375,
            y:795,
            width:35/1.5,
            height:35/1.5,
            type:type,
            movingDirection:270,//degrees
            traveled:0,
            speed:0.035,
            health:200,
            maxhealth:200,
            stealth,
            freezeResistance:15,
            getCenter:function(){
              
                return {
                    x:this.x + this.width/2,
                    y:this.y + this.height/2
                }
             
            }
        })
        break;
    case "speedy boss": 
        enemies.push( {
            x:375,
            y:795,
            width:35/1.5,
            height:35/1.5,
            type:type,
            movingDirection:270,//degrees
            traveled:0,
            speed:0.155,
            health:120,
            maxhealth:120,
            stealth,
            freezeResistance:1,
            getCenter:function(){
              
                return {
                    x:this.x + this.width/2,
                    y:this.y + this.height/2
                }
             
            }
        })
        break;
    case "speedy":
        enemies.push( {
            x:375,
            y:795,
            width:30/1.5,
            height:30/1.5,
            type:type,
            movingDirection:270,//degrees
            traveled:0,
            speed:0.2,
            health:3,
            maxhealth:3,
            stealth,
            freezeResistance:1,
            getCenter:function(){
              
                return {
                    x:this.x + this.width/2,
                    y:this.y + this.height/2
                }
             
            }
        })
        break;
    case "strong":
            enemies.push( {
                x:375,
                y:795,
                width:32/1.5,
                height:32/1.5,
                type:type,
                movingDirection:270,//degrees
                traveled:0,
                speed:0.07,
                health:12,
                maxhealth:12,
                stealth,
                freezeResistance:1,
                getCenter:function(){
                  
                    return {
                        x:this.x + this.width/2,
                        y:this.y + this.height/2
                    }
                 
                }
            })
            break;
    case "armored normal":
            enemies.push( {
                x:375,
                y:795,
                width:32/1.5,
                height:32/1.5,
                type:type,
                movingDirection:270,//degrees
                traveled:0,
                speed:0.1,
                health:20,
                maxhealth:20,
                stealth,
                freezeResistance:8,
                getCenter:function(){
                  
                    return {
                        x:this.x + this.width/2,
                        y:this.y + this.height/2
                    }
                 
                }
            })
            immune = {bullet:0.5}
            break;
    case "armored speedy":
            enemies.push( {
                x:375,
                y:795,
                width:32/1.5,
                height:32/1.5,
                type:type,
                movingDirection:270,//degrees
                traveled:0,
                speed:0.2,
                health:14,
                maxhealth:14,
                freezeResistance:8,
                getCenter:function(){
                  
                    return {
                        x:this.x + this.width/2,
                        y:this.y + this.height/2
                    }
                 
                },
                stealth,
            })
            immune = {bullet:0.5}
            break;
    case "armored strong":
                enemies.push( {
                    x:375,
                    y:795,
                    width:34/1.5,
                    height:34/1.5,
                    type:type,
                    movingDirection:270,//degrees
                    traveled:0,
                    speed:0.07,
                    health:50,
                    maxhealth:50,
                    freezeResistance:8,
                    getCenter:function(){
                      
                        return {
                            x:this.x + this.width/2,
                            y:this.y + this.height/2
                        }
                     
                    },
                    stealth,
                })
                immune = {bullet:0.5}
                break;
    case "rev strong": 
                    enemies.push( {
                        x:375,
                        y:795,
                        width:32/1.5,
                        height:32/1.5,
                        type:type,
                        movingDirection:270,//degrees
                        traveled:0,
                        speed:0.03,
                        health:1000,
                        maxhealth:1000,
                        freezeResistance:20,
                        getCenter:function(){
                          
                            return {
                                x:this.x + this.width/2,
                                y:this.y + this.height/2
                            }
                         
                        },
                        stealth,
                    })
                     break;
    case "easy boss":
                    enemies.push( {
                        x:375,
                        y:795,
                        width:40/1.5,
                        height:40/1.5,
                        type:type,
                        movingDirection:270,//degrees
                        traveled:0,
                        speed:0.01,
                        health:20000,
                        maxhealth:2000,
                        stealth,
                        finalboss:true,
                        freezeResistance:1500,
                        getCenter:function(){
                          
                            return {
                                x:this.x + this.width/2,
                                y:this.y + this.height/2
                            }
                         
                        }
                    })
                    break;
    case "res easy boss":
                        enemies.push( {
                            x:375,
                            y:795,
                            width:40/1.5,
                            height:40/1.5,
                            type:type,
                            movingDirection:270,//degrees
                            traveled:0,
                            speed:0.01,
                            health:45_000,
                            maxhealth:45_000,
                            stealth,
                            finalboss:true,
                            freezeResistance:1500,
                            getCenter:function(){
                              
                                return {
                                    x:this.x + this.width/2,
                                    y:this.y + this.height/2
                                }
                             
                            }
                        })
                        break;
    case "medium boss":
                            enemies.push( {
                                x:375,
                                y:795,
                                width:40/1.5,
                                height:40/1.5,
                                type:type,
                                movingDirection:270,//degrees
                                traveled:0,
                                speed:0.01,
                                health:100_000,
                                maxhealth:100_000,
                                stealth,
                                finalboss:true,
                                freezeResistance:1500,
                                getCenter:function(){
                                  
                                    return {
                                        x:this.x + this.width/2,
                                        y:this.y + this.height/2
                                    }
                                 
                                }
                            })
                            break;
    case "res normal":
                        enemies.push( {
                            x:375,
                            y:795,
                            width:30/1.5,
                            height:30/1.5,
                            type:type,
                            movingDirection:270,//degrees
                            traveled:0,
                            speed:0.15,
                            health:12,
                            maxhealth:12,
                            stealth,
                            freezeResistance:3,
                            getCenter:function(){
                              
                                return {
                                    x:this.x + this.width/2,
                                    y:this.y + this.height/2
                                }
                            
                            }
                        })
                        break;
    case "res speedy":
                            enemies.push( {
                                x:375,
                                y:795,
                                width:30/1.5,
                                height:30/1.5,
                                type:type,
                                movingDirection:270,//degrees
                                traveled:0,
                                speed:0.25,
                                health:8,
                                maxhealth:8,
                                stealth,
                                freezeResistance:3,
                                getCenter:function(){
                                  
                                    return {
                                        x:this.x + this.width/2,
                                        y:this.y + this.height/2
                                    }
                                
                                }
                            })
                            break;
    case "res strong":
                                enemies.push( {
                                    x:375,
                                    y:795,
                                    width:32/1.5,
                                    height:32/1.5,
                                    type:type,
                                    movingDirection:270,//degrees
                                    traveled:0,
                                    speed:0.1,
                                    health:30,
                                    maxhealth:30,
                                    stealth,
                                    freezeResistance:3,
                                    getCenter:function(){
                                      
                                        return {
                                            x:this.x + this.width/2,
                                            y:this.y + this.height/2
                                        }
                                    
                                    }
                                })
                                break;
    case "titan":
                                    enemies.push( {
                                        x:375,
                                        y:795,
                                        width:35/1.5,
                                        height:35/1.5,
                                        type:type,
                                        movingDirection:270,//degrees
                                        traveled:0,
                                        speed:0.05,
                                        health:150,
                                        maxhealth:150,
                                        stealth,
                                        freezeResistance:20,
                                    
                                        getCenter:function(){
                                          
                                            return {
                                                x:this.x + this.width/2,
                                                y:this.y + this.height/2
                                            }
                                         
                                        }
                                    })
                                    break;
    case "res strong":
                                enemies.push( {
                                    x:375,
                                    y:795,
                                    width:32/1.5,
                                    height:32/1.5,
                                    type:type,
                                    movingDirection:270,//degrees
                                    traveled:0,
                                    speed:0.07,
                                    health:30,
                                    maxhealth:30,
                                    stealth,
                                    freezeResistance:3,
                                    getCenter:function(){
                                      
                                        return {
                                            x:this.x + this.width/2,
                                            y:this.y + this.height/2
                                        }
                                    
                                    }
                                })
                                    break;
    case "res armored normal":
                                        enemies.push( {
                                            x:375,
                                            y:795,
                                            width:30/1.5,
                                            height:30/1.5,
                                            type:type,
                                            movingDirection:270,//degrees
                                            traveled:0,
                                            speed:0.12,
                                            health:60,
                                            maxhealth:60,
                                            stealth,
                                            freezeResistance:3,
                                            getCenter:function(){
                                              
                                                return {
                                                    x:this.x + this.width/2,
                                                    y:this.y + this.height/2
                                                }
                                            
                                            }
                                        })
                                        immune = {bullet:0.75}
                                        break;
    case "res armored speedy":
                                            enemies.push( {
                                                x:375,
                                                y:795,
                                                width:30/1.5,
                                                height:30/1.5,
                                                type:type,
                                                movingDirection:270,//degrees
                                                traveled:0,
                                                speed:0.23,
                                                health:35,
                                                maxhealth:35,
                                                stealth,
                                                freezeResistance:3,
                                                getCenter:function(){
                                                  
                                                    return {
                                                        x:this.x + this.width/2,
                                                        y:this.y + this.height/2
                                                    }
                                                
                                                }
                                            })
                                            immune = {bullet:0.75}
                                            break;
    case "res armored strong":
                                            enemies.push( {
                                                x:375,
                                                y:795,
                                                width:30/1.5,
                                                height:30/1.5,
                                                type:type,
                                                movingDirection:270,//degrees
                                                traveled:0,
                                                speed:0.07,
                                                health:140,
                                                maxhealth:140,
                                                stealth,
                                                freezeResistance:3,
                                                getCenter:function(){
                                                  
                                                    return {
                                                        x:this.x + this.width/2,
                                                        y:this.y + this.height/2
                                                    }
                                                
                                                }
                                            })
                                            immune = {bullet:0.75}
                                            break;
    case "hard boss":
                                    enemies.push( {
                                        x:375,
                                        y:795,
                                        width:30/1.5,
                                        height:30/1.5,
                                        type:type,
                                        movingDirection:270,//degrees
                                        traveled:0,
                                        speed:0.01,
                                        health:50000,
                                        maxhealth:50000,
                                        stealth,
                                        finalboss:true,
                                        freezeResistance:5000,
                                        getCenter:function(){
                                          
                                            return {
                                                x:this.x + this.width/2,
                                                y:this.y + this.height/2
                                            }
                                         
                                        }
                                    })
                                    break;
    case "drake boss":
                                        enemies.push( {
                                            x:375,
                                            y:795,
                                            width:30/1.5,
                                            height:30/1.5,
                                            type:type,
                                            movingDirection:270,//degrees
                                            traveled:0,
                                            speed:0.01,
                                            health:100000,
                                            maxhealth:100000,
                                            stealth,
                                            finalboss:true,
                                            freezeResistance:1,
                                            getCenter:function(){
                                              
                                                return {
                                                    x:this.x + this.width/2,
                                                    y:this.y + this.height/2
                                                }
                                             
                                            }
                                        })
                                        break;

    }

    factionTyping(type,stealth,immune)

    endlessEnemyData(type, stealth, immune)

    enemies[enemies.length-1].immunes = immune
    enemies[enemies.length-1].freezeSpeed = 1
       
}
const typeAnimation = (text, speedInSec, element=document.querySelector('.resultOutput'))=>{
    const output =  element

    return new Promise((res)=>{
        const DisplayOutputBackend = (text, speedInSec=0.1, LetterToStartWith=0)=>{
    
            const letters = ''

            output.innerHTML = text
            .split('')
            .map((x,i)=>(i>Math.floor(LetterToStartWith)?'':x))
            .join('')
        
        
           // console.log(title.innerHTML, LetterToStartWith)
           if (text.split('')[Math.floor(LetterToStartWith)] == '!'
        || text.split('')[Math.floor(LetterToStartWith)] == '.'
        || text.split('')[Math.floor(LetterToStartWith)] == '?'
        ) {
          
                CsetTimeout(() => {
                    DisplayOutputBackend(text, speedInSec, LetterToStartWith+100/speedInSec);
                }, 0.1*400+1500/_speedMultiplier);
          
          
           } else {
            CsetTimeout(() => {
                if (Math.floor(LetterToStartWith) < text.split('').length) {
                DisplayOutputBackend(text, speedInSec, LetterToStartWith+100/speedInSec);
                }
            }, 0.1*400/_speedMultiplier);
        }
            return (text.split('').length) * 0.1*400+(text.split(',').length * 0.1*400+1500/_speedMultiplier)
            +4000/_speedMultiplier;
        }
    
    CsetTimeout(()=>{
res({success:true})
    },DisplayOutputBackend(text, speedInSec))
})
}

const loadWave = (wave) => {

    

    if (dialogues.length > 0 && dialogues[wave]) {
          document.querySelector('.tipsMan').style.display = 'flex'
          CsetTimeout(()=>{
            document.querySelector('.tipsMan').style.opacity = '1'
        typeAnimation(dialogues[wave],75/_speedMultiplier,document.querySelector('#tipsManDialogue'))
        .then(()=>{
     
            document.querySelector('.tipsMan').style.opacity = '0'
            CsetTimeout(()=>{
            document.querySelector('.tipsMan').style.display = 'none'
            },500)
        })
    },100)
    }
    runningwave = true;
    canstartnextwave = false;
    waves[wave].forEach((spawn,index)=>{
        const lastspawn = waves[wave][index-1]
       
        CsetTimeout(()=>{
        let spawnInt = CsetInterval (()=>{
            console.log(spawn)
            createEnemy(spawn.type, spawn.stealth?spawn.stealth:false, spawn.immune?spawn.immune:false)
            if (spawn.amount <= 0) CclearInterval(spawnInt)
        },spawn.cooldown/_speedMultiplier)
        CsetTimeout(function(){
            CclearInterval(spawnInt)
            if (index == waves[wave].length-1) {
                runningwave = false;
                  
               
            }
        },spawn.cooldown*spawn.amount/_speedMultiplier)
    },((lastspawn?lastspawn.delay:0)+spawn.delay)/_speedMultiplier)
    })
}