
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
            { "delay": 0, "cooldown": 900, "amount": 21, "type": "res speedy" },
           
        ],
        [
            //8

            { "delay": 0, "cooldown": 800, "amount": 5, "type": "speedy" },
            { "delay": 3000, "cooldown": 1000, "amount": 2, "type": "armored normal" },

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
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "strong" },
            { "delay": 6000, "cooldown": 600, "amount": 10, "type": "res normal" },
            { "delay": 12000, "cooldown": 600, "amount": 10, "type": "res speedy" }
        ],
        [
            //12
            { "delay":0,"cooldown":600, "amount": 5, "type": "res strong" },
            { "delay": 4000, "cooldown": 1000, "amount": 1, "type": "res armored normal" },


        ],
        [
            //13
            { "delay": 0, "cooldown":600, "amount": 5, "type": "res speedy", },
        ],
        [
            //14
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "res  strong", },
        ],
        [
            //15
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "speedy boss" },
            { "delay": 0, "cooldown":600, "amount": 15, "type": "res normal" },
        ],
        [
            //16 
            { "delay": 0, "cooldown": 800, "amount": 10, "type": "armored strong" },
        ],
        [
            //17 midly diffucult
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "boss1", "stealth":true},
        ],
        [
            //18 
            { "delay": 0, "cooldown": 1600, "amount": 5, "type": "titan" },
            { "delay": 0, "cooldown": 1500, "amount": 15, "type": "res speedy" },
            { "delay": 4500, "cooldown": 800, "amount": 3, "type": "speedy boss" },
          
        ],
        [
            //19
            { "delay": 0, "cooldown": 1500, "amount": 3, "type": "res armored strong" },
            { "delay": 4500, "cooldown": 900, "amount": 20, "type": "res normal" },
          
        ],
        [
            //20
            { "delay": 0, "cooldown": 800, "amount": 3, "type": "res armored speedy" },
            { "delay": 4500, "cooldown": 1600, "amount": 20, "type": "res armored normal" },
            { "delay": 1500, "cooldown": 800, "amount": 3, "type": "speedy boss" },
          
        ],
        // Wave 21
        [
            { "delay": 0, "cooldown": 800, "amount": 25, "type": "strong" },
            { "delay": 4500, "cooldown": 1000, "amount": 5, "type": "res armored strong" }
        ],

        // Wave 22
        [{ "delay": 0, "cooldown": 800, "amount": 30, "type": "titan" }],

        // Wave 23
        [
            { "delay": 0, "cooldown": 1000, "amount": 12, "type": "boss1" },
            { "delay": 5000, "cooldown": 1200, "amount": 10, "type": "speedy boss" }
        ],

        // Wave 24
        [
            { "delay": 0, "cooldown": 1500, "amount": 10, "type": "rev strong" },
            { "delay": 5000, "cooldown": 800, "amount": 15, "type": "armored strong", "immunes": { "bullet": 0.5 } },
            { "delay": 1500, "cooldown": 600, "amount": 40, "type": "res normal" },
            { "delay": 1500, "cooldown": 400, "amount": 30, "type": "res speedy" }
        ],

        // Wave 25
        [
            { "delay": 0, "cooldown": 1300, "amount": 20, "type": "speedy" },
            { "delay": 4500, "cooldown": 1000, "amount": 6, "type": "boss1" },
            { "delay": 0, "cooldown": 1000, "amount": 1, "type": "res easy boss" }
        ],

        // Wave 26
        [
            { "delay": 0, "cooldown": 1000, "amount": 30, "type": "rev strong" },
            { "delay": 4000, "cooldown": 1200, "amount": 20, "type": "boss1" },
            { "delay": 0, "cooldown": 1000, "amount": 20, "type": "armored normal", "immunes": { "bullet": 0.5 } },
        ],

        // Wave 27
        [{ "delay": 0, "cooldown": 100, "amount": 200, "type": "armored normal", "immunes": { "bullet": 0.5 } }],

        // Wave 28
        [
            { "delay": 0, "cooldown": 1500, "amount": 6, "type": "boss1" },
            { "delay": 5000, "cooldown": 1500, "amount": 10, "type": "rev strong" }
        ],

        // Wave 29
        [{ "delay": 0, "cooldown": 500, "amount": 40, "type": "speedy boss" }],

        // Wave 30
        [
            { "delay": 0, "cooldown": 2000, "amount": 2, "type": "medium boss" }
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
        200, //13
        350, //14
        500, //15
        200, //16
        400, //17
        500, //18
        900, //19
        1700, //20
        550 + 50 + 100,  // 21
        1200/2 + 50 + 100,  // 22
        1300/2 + 50 + 100,  // 23
        2400 + 50 + 100,  // 24
        1500 + 50 + 100,  // 25
        1600 + 50 + 100,  // 26
        1700 + 50 + 100,  // 27
        1800 + 50 + 100,  // 28
        1900 + 50 + 100,  // 29
        2000 + 50 + 100   // 30
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