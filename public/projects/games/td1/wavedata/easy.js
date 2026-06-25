const easyMode = {
    waves:[
        [
            
                 //1
             { "delay": 0, "cooldown": 1000, "amount": 3, "type": "normal" }
            
        ],
        [
             //2
             { "delay": 0, "cooldown": 1000, "amount": 5, "type": "normal" }
        ],
        [
             //3
             { "delay": 0, "cooldown": 800, "amount": 1, "type": "normal" },
             { "delay": 4500, "cooldown": 400, "amount": 3, "type": "speedy" }
        ],
        [
            //4
            { "delay": 0, "cooldown": 400, "amount": 5, "type": "speedy" },
            { "delay": 2000, "cooldown": 700, "amount": 5, "type": "normal"}
        ],
        [
            //5
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "strong" }
        ],
        [
            //6
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "speedy" },
            { "delay": 4500, "cooldown": 600, "amount": 5, "type": "strong" }
        ],
        [
            //7
            { "delay": 0, "cooldown": 1000, "amount": 10, "type": "strong" },
        ],
        [
            //8
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "armored normal" },

        ],
        [
            //9
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "armored normal" },
            { "delay": 6000, "cooldown": 600, "amount": 2, "type": "strong" }
        ],
        [
            //10
            { "delay": 0, "cooldown": 1000, "amount": 1, "type": "boss1" },
          
        ],
        [
            //11
            { "delay": 0, "cooldown": 1000, "amount": 10, "type": "strong" },
            { "delay": 6000, "cooldown": 600, "amount": 10, "type": "normal" },
            { "delay": 12000, "cooldown": 600, "amount": 10, "type": "speedy" }
        ],
        [
            //12
            { "delay":0,"cooldown":600, "amount": 10, "type": "speedy" },
            { "delay": 2000, "cooldown": 1000, "amount": 1, "type": "boss1" },
            { "delay": 6000, "cooldown": 600, "amount": 3, "type": "armored strong" },
        ],
        [
            //13
            { "delay": 0, "cooldown":600, "amount": 5, "type": "speedy", "stealth": true },
        ],
        [
            //14
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "armored strong", "stealth":true },
        ],
        [
            //15
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "speedy boss" },
            { "delay": 0, "cooldown":600, "amount": 5, "type": "normal" },
        ],
        [
            //16 will take damage
            { "delay": 0, "cooldown": 800, "amount": 10, "type": "armored strong" },
        ],
        [
            //17 will take damage
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "boss1", "stealth":true},
        ],
        [
            //18 will take damage (a lot)
            { "delay": 0, "cooldown": 1600, "amount": 5, "type": "boss1" },
            { "delay": 4500, "cooldown": 800, "amount": 3, "type": "speedy boss" },
          
        ]
        


    ],
    waveBonuses: [
        100.01, //1
        100, //2
        120, //3
        100, //4
        200, //5
        150, //6
        175, //7
        200, //8
        275, //9
        300, //10
        200, //11
        325,  //12
        100, //13
        50, //14
        500, //15
        200, //16
        400, //17
        0, //18
        0, //19
        0, //20
    ]
}
function loadEasyMode () {
    waves = easyMode.waves
    
    waveBonuses = easyMode.waveBonuses
    
    player.money = 500.001
    
    player.wave = 1
    player.health = 100
    player.selectedTower = null
    }