const midBHard = {
    waves:[
        [
            
                 //1
             { "delay": 0, "cooldown": 1500, "amount": 5, "type": "res normal" }
            
        ],
        [
             //2
             { "delay": 0, "cooldown": 1700, "amount": 9, "type": "res normal" }
        ],
        [
             //3
             { "delay": 0, "cooldown": 1200, "amount": 8, "type": "res normal" },
             { "delay": 6500, "cooldown": 400, "amount": 3, "type": "res speedy" }
        ],
        [
            //4
            { "delay": 0, "cooldown": 800, "amount": 6, "type": "res speedy" },
            { "delay": 2000, "cooldown": 1000, "amount": 10, "type": "res normal"}
        ],
        [
            //5
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "res strong" }
        ],
        [
            //6
            { "delay": 0, "cooldown": 300, "amount": 15, "type": "res speedy" },
            { "delay": 4500, "cooldown": 1000, "amount": 3, "type": "res strong" }
        ],
        [
            //7
            { "delay": 0, "cooldown": 1200, "amount": 20, "type": "res normal" },
        ],
        [
            //8
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "titan" },

        ],
        [
            //9
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "armored normal" },
            { "delay": 6000, "cooldown": 900, "amount": 2, "type": "strong" }
        ],
        [
            //10
            { "delay": 0, "cooldown": 1000, "amount": 1, "type": "boss1" },
          
        ],
        [
            //11
            { "delay": 0, "cooldown": 1000, "amount": 10, "type": "strong" },
            { "delay": 6000, "cooldown": 600, "amount": 10, "type": "speedy" },
            { "delay": 8000, "cooldown": 600, "amount": 10, "type": "normal" }
        ],
        [
            //12
            { "delay": 0, "cooldown":600, "amount": 15, "type": "speedy", "stealth": true },
           
        ],
        [
            //13
            { "delay":0,"cooldown":600, "amount": 10, "type": "speedy" },
            { "delay": 2000, "cooldown": 1000, "amount": 1, "type": "boss1" },
            { "delay": 5000, "cooldown": 1300, "amount": 3, "type": "armored strong" },
        ],
        [
            //14
            { "delay": 0, "cooldown": 600, "amount": 10, "type": "strong", "stealth":true },
        ],
        [
            //15
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "speedy boss" },
            { "delay": 0, "cooldown":600, "amount": 5, "type": "normal" },
        ],
        [
            //16
            { "delay": 0, "cooldown": 800, "amount": 20, "type": "strong" },
            { "delay": 8000, "cooldown": 1000, "amount": 5, "type": "armored normal", "stealth":true },
        ],
        [
            //17
            { "delay": 0, "cooldown": 1300, "amount": 3, "type": "boss1", "stealth":true},
        ],
        [
            //18

            { "delay": 0, "cooldown": 1500, "amount": 1, "type": "speedy boss" },
            { "delay": 4500, "cooldown": 2000, "amount": 5, "type": "armored strong" },
          
        ],
        [
            //19
            { "delay": 0, "cooldown": 550, "amount": 40, "type": "normal" },
            { "delay": 5000, "cooldown": 350, "amount": 50, "type": "armored speedy" },
        ],
        [
            //20

            { "delay": 0, "cooldown": 1400, "amount": 10, "type": "armored strong" },
            { "delay": 8000, "cooldown": 1800, "amount": 1, "type": "rev strong" },
        ],
        [
            //21
            { "delay": 0, "cooldown": 1700, "amount": 3, "type": "boss1" },
            { "delay": 4700, "cooldown": 1000, "amount": 20, "type": "armored normal" },
           
        ],
        [
            //22
            { "delay": 0, "cooldown": 1500, "amount": 3, "type": "speedy boss", "stealth":true },
            { "delay": 4700, "cooldown": 1000, "amount": 20, "type": "armored strong" },
        ],
        [
            //23
            { "delay": 0, "cooldown": 1500, "amount": 10, "type": "boss1" },
            { "delay": 20000, "cooldown": 1000, "amount": 2, "type": "rev strong" },
        ],
        [
            //24
            { "delay": 0, "cooldown": 400, "amount": 80, "type": "armored strong" },
            { "delay": 4500, "cooldown": 300, "amount": 90, "type": "armored normal" 
                ,"stealth":true
             },
        ],

        [
            //25
            { "delay": 0, "cooldown": 1500, "amount": 1, "type": "easy boss" },
        ]
        


    ],
    waveBonuses: [
        150.01, //1
        200, //2
        120, //3
        200, //4
        200, //5
        150, //6
        175, //7
        200, //8
        275, //9
        300, //10
        200, //11
        50,  //12
        300, //13
        150, //14
        400, //15
        200, //16
        400, //17
        325, //18
        300, //19
        500, //20
        300, //21
        400, //22
        200, //23
        500, //24
        0, //25
    ]
}
function loadBHardMode () {
    waves = midBHard.waves
    
    waveBonuses = midBHard.waveBonuses
    
    player.money = 650.001+Infinity

    player.wave = 4

    waveBonuses.forEach(function (bonus, index){
        if (index < player.wave-1) {
            player.money += bonus+30

        }
    })
    
    

    player.health = 100
    player.selectedTower = null
    }