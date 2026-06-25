function endlessEnemyData(type, stealth=false,immune){
    if (type == 'voider') {
         
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.12,
        health:20,
        maxhealth:20,
        stealth,
        freezeResistance:1,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })
    
    return true
} else if (type == 'strider') {
     

    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.15,
        health:15,
        maxhealth:15,
        stealth,
        freezeResistance:1,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'sentinel') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.07,
        health:80,
        maxhealth:80,
        stealth,
        freezeResistance:1.5,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
}else if (type == 'sentinal') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.12,
        health:120,
        maxhealth:120,
        stealth,
        freezeResistance:1.8,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         }});
         return true
} else if (type == 'colossus') {
    //It's the colossus's! Or the colossi? I never passed elementary school.
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.08,
        health:200,
        maxhealth:200,
        stealth,
        freezeResistance:8,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'abyss walker') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.18,
        health:20,
        maxhealth:20,
        stealth,
        freezeResistance:5,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'revenant') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.26,
        health:40,
        maxhealth:40,
        stealth,
        freezeResistance:2,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'null') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.20,
        health:120,
        maxhealth:120,
        stealth,
        freezeResistance:15,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
}  else if (type == 'umbral') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.20,
        health:450,
        maxhealth:450,
        stealth,
        freezeResistance:15,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'endbringer') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.015,
        health:50_000,
        maxhealth:50_000,
        stealth,
        freezeResistance:30,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
}  else if (type == 'nihil') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.139,
        health:8000,
        maxhealth:8000,
        stealth,
        freezeResistance:10,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'shawling') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.12,
        health:12000,
        maxhealth:12000,
        stealth,
        freezeResistance:10,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
}  else if (type == 'tenebrous') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.18,
        health:13_000,
        maxhealth:13_000,
        stealth,
        freezeResistance:10,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'corrupted normal') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.12,
        health:500,
        maxhealth:500,
        stealth,
        freezeResistance:1,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'corrupted speedy') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.2,
        health:300,
        maxhealth:300,
        stealth,
        freezeResistance:1,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'corrupted strong') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.07,
        health:1200,
        maxhealth:1200,
        stealth,
        freezeResistance:1,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'growler') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.27,
        health:400,
        maxhealth:400,
        stealth,
        freezeResistance:10,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })

    return true
} else if (type == 'shadower') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.22,
        health:600,
        maxhealth:600,
        stealth:true,
        freezeResistance:10,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })
}else if (type == 'warden') {
    enemies.push( {
        x:375,
        y:795,
        width:30,
        height:30,
        type:type,
        movingDirection:270,//degrees
        traveled:0,
        speed:0.17,
        health:200_000,
        maxhealth:200_000,
        stealth,
        freezeResistance:5,
        getCenter:function(){
          
            return {
                x:this.x + this.width/2,
                y:this.y + this.height/2
            }
         
        }
    })
} 
}

function renderVoidEnemies(ctx, enemy) {
    switch (enemy.type) {
        case "voider":
            ctx.fillStyle = 'rgb(77, 0, 91)';
            break;
        case "strider":
            ctx.fillStyle = 'rgb(231, 169, 255)';
            break;
        case "sentinel":
            ctx.fillStyle = 'rgb(30, 18, 32)';
            break;
        case "colossus":
            ctx.fillStyle = 'rgb(173, 216, 230)';
            break;
        case "abyss walker":
            ctx.fillStyle = 'rgb(66, 12, 51)';
            break;
        case "revenant":
            ctx.fillStyle = 'rgb(94, 36, 0)';
            break;
        case "null":
            ctx.fillStyle = 'rgb(0, 7, 7)';
            break;
        case "umbral":
            ctx.fillStyle = 'rgb(42, 0, 87)';
            break;
        case "endbringer":
            ctx.fillStyle = 'rgb(37, 0, 106)';
            break;
        case "nihil":
            ctx.fillStyle = 'rgb(255, 140, 0)'
            break;
        case "shawling":
            ctx.fillStyle = 'rgb(0, 166, 255)'
            break;
        case "tenebrous":
            ctx.fillStyle = "rgb(0, 75, 23)"
            break;
        case "growler":
            ctx.fillStyle = 'rgb(149, 149, 149)';
            break;
        case "shadower":
            ctx.fillStyle = 'rgb(81, 81, 81)';
            break;
        case "warden":
            ctx.fillStyle = 'rgb(19, 110, 81)';
            break;
   
       
        
        //Necrothrax
        //Herald
        //Overlord
        //

    }
} 