const medMode = {
    waves:[
        [
            
                 //1
             { "delay": 0, "cooldown": 1000, "amount": 5, "type": "normal" }
            
        ],
        [
             //2
             { "delay": 0, "cooldown": 800, "amount": 5, "type": "speedy" }
        ],
        [
             //3
             { "delay": 0, "cooldown": 800, "amount": 8, "type": "normal" },
             { "delay": 3500, "cooldown": 400, "amount": 4, "type": "speedy" }
        ],
        [
            //4
            { "delay": 0, "cooldown": 700, "amount": 10, "type": "speedy" },
            { "delay": 1000, "cooldown": 700, "amount": 5, "type": "strong"}
        ],
        [
            //5
            { "delay": 0, "cooldown": 1000, "amount": 4, "type": "res normal" }
        ],
        [
            //6
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "speedy" },
            { "delay": 1500, "cooldown": 600, "amount": 5, "type": "res normal" }
        ],
        [
            //7
            { "delay": 0, "cooldown": 700, "amount": 21, "type": "res speedy" },
           
        ],
        [
            //8

            { "delay": 0, "cooldown": 800, "amount": 5, "type": "speedy" },
            { "delay": 3000, "cooldown": 1000, "amount": 2, "type": "res armored normal", "immunes":{"bullet":50} },

        ],
        [
            //9
            { "delay": 0, "cooldown": 600, "amount": 8, "type": "res normal" },
            { "delay": 1000, "cooldown": 600, "amount": 3, "type": "strong" }
        ],
        [
            //10
            { "delay": 0, "cooldown": 1000, "amount": 1, "type": "titan" },
          
        ],
        [
            //11
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "strong", "stealth":true },
            { "delay": 6000, "cooldown": 600, "amount": 10, "type": "res normal" },
            { "delay": 12000, "cooldown": 600, "amount": 10, "type": "res speedy" }
        ],
        [
            //12
            { "delay":0,"cooldown":600, "amount": 5, "type": "res strong" },
            { "delay": 4000, "cooldown": 1000, "amount": 5, "type": "res armored normal", "immunes":{"bullet":.8} },


        ],
        [
            //13
            { "delay": 0, "cooldown":600, "amount": 5, "type": "res speedy", },
        ],
        [
            //14
            { "delay": 4000, "cooldown": 1000, "amount": 5, "type": "res armored normal", "immunes":{"bullet":.8} },
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "res  strong", },
        ],
        [
            //15
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "speedy boss" },
            { "delay": 0, "cooldown":600, "amount": 5, "type": "normal" },
        ],
        [
            //16 will take damage
            { "delay": 0, "cooldown": 800, "amount": 10, "type": "armored strong", "immunes":{"bullet":.5} },
        ],
        [
            //17 will take damage
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "boss1", "stealth":true},
        ],
        [
            //18 will take damage (a lot)
            { "delay": 0, "cooldown": 1600, "amount": 5, "type": "boss1" },
            { "delay": 4500, "cooldown": 800, "amount": 3, "type": "speedy boss" },
          
        ],
        [
            //19
            { "delay": 0, "cooldown": 800, "amount": 5, "type": "res armored strong" },
            { "delay": 4500, "cooldown": 800, "amount": 20, "type": "res normal" },
          
        ]
        


    ],
    waveBonuses: [
        150, //1
        200, //2
        200, //3
        150, //4
        400, //5
        250, //6
        375, //7
        350, //8
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
function loadBMediumMode () {
    waves = medMode.waves
    
    waveBonuses = medMode.waveBonuses
    
    player.money = 750.00000002

    player.wave = 1

    waveBonuses.forEach(function (bonus, index){
        if (index < player.wave-1) {
            player.money += bonus+30

        }
    })

    player.health = 100
    player.selectedTower = null
    }