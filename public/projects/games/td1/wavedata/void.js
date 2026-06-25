const voidMode = {
    waves:[
        [
            
                 //1
             { "delay": 0, "cooldown": 1000, "amount": 5, "type": "voider" }
            
        ],
        [
             //2
             { "delay": 0, "cooldown": 1000, "amount": 9, "type": "voider" }
        ],
        [
             //3
             { "delay": 0, "cooldown": 1200, "amount": 8, "type": "voider" },
             { "delay": 6500, "cooldown": 600, "amount": 3, "type": "strider" }
        ],
        [
            //4
            { "delay": 0, "cooldown": 1300, "amount": 15, "type": "voider" },
            { "delay": 2000, "cooldown": 600, "amount": 5, "type": "strider"}
        ],
        [
            //5
            { "delay": 0, "cooldown": 1500, "amount": 30, "type": "voider" }
        ],
        [
            //6
            { "delay": 0, "cooldown": 600, "amount": 15, "type": "strider" },
            { "delay": 4500, "cooldown": 1000, "amount": 20, "type": "voider" }
        ],
        [
            //7
            { "delay": 0, "cooldown": 1200, "amount": 20, "type": "strider" },
        ],
        [
            //8
            { "delay": 0, "cooldown": 1500, "amount": 3, "type": "sentinel" },

        ],
        [
            //9
            { "delay": 0, "cooldown": 1000, "amount": 15, "type": "voider" },
            { "delay": 1000, "cooldown": 500, "amount": 15, "type": "strider" },
            { "delay": 6000, "cooldown": 900, "amount": 1, "type": "sentinel" }
        ],
        [
            //10
            { "delay": 0, "cooldown": 1500, "amount": 8, "type": "sentinel" },
          
        ],
        [
            //11
            { "delay": 0, "cooldown": 600, "amount": 10, "type": "voider" },
            { "delay": 2000, "cooldown": 600, "amount": 10, "type": "strider" },
            { "delay": 5000, "cooldown": 600, "amount": 3, "type": "abyss walker", "stealth":true },
        ],
        [
            //12
            { "delay": 0, "cooldown": 1200, "amount": 12, "type": "sentinel" },
            { "delay": 0, "cooldown":600, "amount": 5, "type": "abyss walker", "stealth": true },
           
        ],
        [
            //13
            { "delay":0,"cooldown":600, "amount": 30, "type": "strider" },
            { "delay":900,"cooldown":600, "amount": 10, "type": "voider" },
        ],
        [
            //14
            { "delay":0,"cooldown":1200, "amount": 10, "type": "strider" },
            { "delay":900,"cooldown":600, "amount": 3, "type": "voider" },
            { "delay": 0, "cooldown": 1600, "amount": 10, "type": "sentinel", },
        ],
        [
            //15
            { "delay": 0, "cooldown": 600, "amount": 3, "type": "colossus" },
        ],
        [
            //16
            { "delay": 0, "cooldown": 800, "amount": 20, "type": "sentinel" },
            { "delay": 8000, "cooldown": 1000, "amount": 5, "type": "voider", "stealth":true },
        ],
        [
            //17
            { "delay": 0, "cooldown": 600, "amount": 3, "type": "colossus" },
            { "delay": 1000, "cooldown": 1300, "amount": 5, "type": "null", "stealth":true},
            { "delay": 8000, "cooldown": 600, "amount": 35, "type": "voider", },
        ],
        [
            //18

            { "delay": 0, "cooldown": 1500, "amount": 3, "type": "null" },
            { "delay": 0, "cooldown": 1000, "amount": 8, "type": "colossus" },
            { "delay": 4500, "cooldown": 1200, "amount": 15, "type": "sentinel" },
          
        ],
        [
            //19
            { "delay": 0, "cooldown": 550, "amount": 40, "type": "voider" },
            { "delay": 5000, "cooldown": 350, "amount": 50, "type": "strider" },
            { "delay": 0, "cooldown": 1500, "amount": 1, "type": "null",  "stealth":true },
            { "delay": 1000, "cooldown": 900, "amount": 8, "type": "colossus" },
            { "delay": 2500, "cooldown": 1200, "amount": 15, "type": "sentinel" },

        ],
        [
            //20
            { "delay": 0, "cooldown": 800, "amount": 30, "type": "sentinel" },
            { "delay": 800, "cooldown": 1400, "amount": 5, "type": "umbral" },

        ],
        [
            //21
            { "delay": 0, "cooldown": 1100, "amount": 14, "type": "colossus" },
           
        ],
        [
            //22
            { "delay": 0, "cooldown": 550, "amount": 14, "type": "voider" },
            { "delay": 1000, "cooldown": 350, "amount": 5, "type": "strider" },
            { "delay": 1500, "cooldown": 1500, "amount": 8, "type": "revenant"},
        ],
        [
            //23
            { "delay": 0, "cooldown": 1500, "amount": 15, "type": "umbral" },
            { "delay": 5000, "cooldown": 1000, "amount": 20, "type": "null",  "stealth":true },
        ],
        [
            //24
            { "delay": 0, "cooldown": 400, "amount": 8, "type": "umbral" },
            { "delay": 2000, "cooldown": 1500, "amount": 10, "type": "null",  "stealth":true },
            { "delay": 1000, "cooldown": 700, "amount": 30, "type": "colossus" },
            { "delay": 500, "cooldown": 1200, "amount": 15, "type": "sentinel" },
            { "delay": 0, "cooldown": 200, "amount": 40, "type": "strider" },
        ],

        [
            //25
            { "delay": 0, "cooldown": 1500, "amount": 1, "type": "endbringer" },
        ],
        [
            {
                // 26
                "delay": 0, "cooldown": 700, "amount": 12, "type": "corrupted normal"
            },
            {
                "delay": 2000, "cooldown": 500, "amount": 18, "type": "umbral"
            },
            {
                "delay": 2500, "cooldown": 1400, "amount": 20, "type": "null", "stealth": true
            },
            {
                "delay": 1500, "cooldown": 1600, "amount": 12, "type": "colossus"
            },
            {
                "delay": 0, "cooldown": 800, "amount": 15, "type": "sentinel"
            },
            {
                "delay": 3500, "cooldown": 1000, "amount": 25, "type": "voider", "stealth": true
            }
        ],
        [
            {
                // 27
                "delay": 0, "cooldown": 650, "amount": 18, "type": "corrupted normal"
            },
            {
                "delay": 1800, "cooldown": 500, "amount": 10, "type": "corrupted speedy"
            },
            {
                "delay": 2000, "cooldown": 1300, "amount": 4, "type": "nihil", "stealth": true
            },
            {
                "delay": 3000, "cooldown": 600, "amount": 5, "type": "growler"
            }
        ],
        [
            {
                // 28
                "delay": 0, "cooldown": 600, "amount": 15, "type": "corrupted speedy"
            },
            {
                "delay": 1500, "cooldown": 1000, "amount": 10, "type": "corrupted strong"
            },
            {
                "delay": 3000, "cooldown": 1800, "amount": 3, "type": "shawling", "stealth": true
            },
            {
                "delay": 4000, "cooldown": 2000, "amount": 2, "type": "nihil", "stealth": true
            }
        ],
        [
            {
                // 29
                "delay": 0, "cooldown": 500, "amount": 20, "type": "umbral"
            },
            {
                "delay": 2000, "cooldown": 800, "amount": 30, "type": "corrupted normal"
            },
            {
                "delay": 2500, "cooldown": 400, "amount": 20, "type": "corrupted speedy"
            },
            {
                "delay": 4000, "cooldown": 600, "amount": 15, "type": "corrupted strong"
            },
            {
                "delay": 3000, "cooldown": 1500, "amount": 5, "type": "growler"
            }
        ],
        [
            {
                // 30 (Boss Wave)
                "delay": 0, "cooldown": 1200, "amount": 25, "type": "colossus"
            },
            {
                
                "delay": 0, "cooldown": 3000, "amount": 2, "type": "easy boss", "stealth":true,
            },
            {
                "delay": 2000, "cooldown": 1800, "amount": 3, "type": "nihil", "stealth": true
            },
            {
                "delay": 3000, "cooldown": 1500, "amount": 2, "type": "shawling", "stealth": true
            },
            {
                "delay": 4000, "cooldown": 1000, "amount": 10, "type": "revenant"
            },
            {
                "delay": 5000, "cooldown": 800, "amount": 40, "type": "voider"
            }
        ],
       
        
        


    ],
   waveBonuses: [
        10, //1
         12, //2
          15, //3
           20, //4
            40, //5
             25, //6
              30, //7
               50, //8
                60, //9
                 100, //10
        75, //11
         85, //12
         120, //13
          140, //14
           200, //15
            150, //16
             175, //17
              250, //18
               300, //19
                500, //20
        350, //21
         400, //22
          550, //23 
           700, //24
            1000, //25
              800, //26
               900, //27
                1250, //28
                 1500, //29
                   2000 //30
      ],
    dialogues: [
    ]
}
function loadVoidMode () {
    waves = voidMode.waves
    
    waveBonuses = voidMode.waveBonuses.map((x)=>x*5)

    dialogues = voidMode.dialogues
    
    player.money = /*100_000*/ /*5250.001*/ 3250.001

    player.wave = 1

    waveBonuses.forEach(function (bonus, index){
        if (index < player.wave-1) {
            player.money += bonus+30

        }
    })
    
    

    player.health = 100
    player.selectedTower = null
    }