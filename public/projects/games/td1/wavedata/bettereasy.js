const easyBMode = {
    waves:[
        [
            
                 //1
             { "delay": 0, "cooldown": 1800, "amount": 6, "type": "normal" }
            
        ],
        [
             //2
             { "delay": 0, "cooldown": 1800, "amount": 14, "type": "normal" }
        ],
        [
             //3
             { "delay": 0, "cooldown": 1200, "amount": 8, "type": "normal" },
             { "delay": 6500, "cooldown": 400, "amount": 3, "type": "speedy" }
        ],
        [
            //4
            { "delay": 0, "cooldown": 400, "amount": 5, "type": "speedy" },
            { "delay": 2000, "cooldown": 1000, "amount": 15, "type": "normal"}
        ],
        [
            //5
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "strong" }
        ],
        [
            //6
            { "delay": 0, "cooldown": 900, "amount": 15, "type": "speedy" },
            { "delay": 4500, "cooldown": 1000, "amount": 3, "type": "strong" }
        ],
        [
            //7
            { "delay": 0, "cooldown": 1000, "amount": 30, "type": "normal" },
        ],
        [
            //8
            { "delay": 0, "cooldown": 1000, "amount": 3, "type": "armored normal", "immune":{bullet:0.5} },

        ],
        [
            //9
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "armored normal", "immune":{bullet:0.5} },
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
            { "delay": 0, "cooldown":600, "amount": 3, "type": "speedy", "stealth": true },
           
        ],
        [
            //13
            { "delay":0,"cooldown":700, "amount": 10, "type": "speedy" },
            { "delay": 2000, "cooldown": 1000, "amount": 1, "type": "boss1" },
            { "delay": 5000, "cooldown": 1300, "amount": 3, "type": "armored strong", "immune":{bullet:0.5} },
            { "delay": 1000, "cooldown": 1000, "amount": 5, "type": "normal" },
        ],
        [
            //14
            { "delay": 0, "cooldown": 600, "amount": 10, "type": "strong", "stealth":true },
        ],
        [
            //15
            { "delay": 0, "cooldown": 800, "amount": 20, "type": "strong" },
            { "delay": 8000, "cooldown": 1000, "amount": 5, "type": "armored normal", "immune":{bullet:0.5}, "stealth":true },
        ],
        [
            //16
            { "delay": 0, "cooldown": 600, "amount": 1, "type": "speedy boss" },
            { "delay": 0, "cooldown":600, "amount": 5, "type": "normal" },
        ],
     
        [
            //17
            { "delay": 0, "cooldown": 1300, "amount": 3, "type": "boss1", "stealth":true},
        ],
        [
            //18

            { "delay": 0, "cooldown": 1500, "amount": 1, "type": "speedy boss" },
            { "delay": 4500, "cooldown": 2000, "amount": 5, "type": "armored strong", "immune":{bullet:0.5} },
          
        ],
        [
            //19
            { "delay": 0, "cooldown": 1550, "amount": 20, "type": "normal" },
            { "delay": 5000, "cooldown": 850, "amount": 25, "type": "armored speedy", "immune":{bullet:0.5} },
        ],
        [
            //20

            { "delay": 0, "cooldown": 1400, "amount": 5, "type": "armored strong", "immune":{bullet:0.5} },
            { "delay": 4000, "cooldown": 1800, "amount": 1, "type": "rev strong" },
        ],
        [
            //21
            { "delay": 0, "cooldown": 1700, "amount": 3, "type": "boss1" },
            { "delay": 4700, "cooldown": 1000, "amount": 20, "type": "armored normal", "immune":{bullet:0.5} },
           
        ],
        [
            //22
            { "delay": 0, "cooldown": 1500, "amount": 3, "type": "speedy boss", "stealth":true },
            { "delay": 4700, "cooldown": 1000, "amount": 20, "type": "armored strong", "immune":{bullet:0.5} },
        ],
        [
            //23
            { "delay": 0, "cooldown": 1500, "amount": 3, "type": "boss1" },
            { "delay": 6000, "cooldown": 1000, "amount": 2, "type": "rev strong" },
        ],
        [
            //24
            { "delay": 0, "cooldown": 800, "amount": 40, "type": "armored strong", "immune":{bullet:0.5} },
            { "delay": 4500, "cooldown": 600, "amount": 45, "type": "armored normal", "immune":{bullet:0.5} 
                ,"stealth":true
             },
        ],

        [
            //25
            { "delay": 0, "cooldown": 1500, "amount": 1, "type": "easy boss" },
        ]
        


    ],
    waveBonuses: [
        100+50+100, //1
        150+50+100, //2
        120+50+100, //3
        100+50+100, //4
        200+50+100, //5
        150+50+100, //6
        175+50+100, //7
        200+50+100, //8
        275+50+100, //9
        300+50+100, //10
        200+50+100, //11
        50+100+100,  //12
        300+100+100, //13
        150+100+100, //14
        400+100+100, //15
        200+100+100, //16
        400+100+100, //17
        325+100+100, //18
        550+100+100, //19
        500+100+100, //20
        300+100+100, //21
        400+100+100, //22
        200+100+100, //23
        2750+100+100, //24
        0, //25
    ],
    dialogues: [
     /*1 */   'Welcome to your first mission Commander! I will help you with defending our town and what you can do here.',
      /*2 */    'You can choose from many towers to protect your base. Each tower has its own strength and weaknesses. Remember, the more towers you have, the more damage you can deal!',
       /*3 */     'You can also buy upgrades for your towers to improve their effectiveness. Each upgrade has its own cost and benefits.',
        /*4 */      null,
         /*5*/       "Strong Enemies Detected! Upgrade your towers to improve their strength",
        null,
        null,
        "Armored Enemies Detected! These guys are no joke. Or whatever gender they identify as nowadays. They're not a threat right now but they are resistent to bullets, so I recommend getting some explosion towers.",
        /*9 */ "Uh oh... Radar has detected a very big enemy. This might be our very first boss",
        "Boss 1 Detected! Attack him with all your might!",
        /*11*/"Hang on... There arent any rovers next wave? I think they might be camoflauged. Give me a second to upgrade the radar to detect them",
        /*12*/null,
        /*13*/"And there... Radar upgraded! Now I should be able to see the stealth rovers better. Looks like some more might come next wave? Make your towers be able to see them right now!",
        /*14*/"I really hope you got that stealth detection. This might reach our base if we don't eliminate them.",
       null,
         /*16*/"Speedy Boss Detected! High damage is needed!",,
        null,
       /*18 */ "Lots of rovers detected next wave! Low reload time is needed!",
        /*19*/"The radar is picking up a really tough enemy. He looks really heavy, no offense",
        /*20*/ null,
         /*21*/null,
         /*22*/,
        /*23*/ null,
        "Looks like the radar is picking up a really huge enemy. Next wave could be our last.",
 /*25*/"Wow he is huge! We need all the fire power we got! They ain't sending out anything else so we just need to survive this wave.",

    




       
    ]
}

function loadBEasyMode () {
    waves = easyBMode.waves
    
    waveBonuses = easyBMode.waveBonuses

    dialogues = easyBMode.dialogues
    
    player.money = 650.001

    player.wave = 1

    waveBonuses.forEach(function (bonus, index){
        if (index < player.wave-1) {
            player.money += bonus+30

        }
    })
    

    player.health = 100
    player.selectedTower = null
    }