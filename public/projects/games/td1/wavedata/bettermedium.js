const medMode = {
    waves: [
        // Wave 1
        [{ "delay": 0, "cooldown": 1000, "amount": 5, "type": "normal" }],
        
        // Wave 2
        [{ "delay": 0, "cooldown": 800, "amount": 5, "type": "speedy" }],
        
        // Wave 3
        [
            { "delay": 0, "cooldown": 800, "amount": 8, "type": "normal" },
            { "delay": 3500, "cooldown": 400, "amount": 4, "type": "speedy" }
        ],

        // Wave 4
        [
            { "delay": 0, "cooldown": 700, "amount": 10, "type": "speedy" },
            { "delay": 1000, "cooldown": 700, "amount": 5, "type": "strong" }
        ],

        // Wave 5 (Halved bonus, doubled enemies)
        [{ "delay": 0, "cooldown": 1000, "amount": 5, "type": "res normal" }],

        // Wave 6 (Halved bonus, doubled enemies)
        [
            { "delay": 0, "cooldown": 1000, "amount": 5, "type": "speedy" },
            { "delay": 1500, "cooldown": 600, "amount": 4, "type": "res normal" }
        ],

        // Wave 7 (Halved bonus, doubled enemies)
        [{ "delay": 0, "cooldown": 900, "amount": 21, "type": "res speedy" }],

        // Wave 8 (Halved bonus, doubled enemies)
        [
            { "delay": 0, "cooldown": 800, "amount": 5, "type": "speedy" },
            { "delay": 3000, "cooldown": 1500, "amount": 2, "type": "res armored normal", "immunes": { "bullet": 80 } }
        ],

        // Wave 9 (Halved bonus, doubled enemies)
        [
            { "delay": 0, "cooldown": 600, "amount": 16, "type": "res normal" },
            { "delay": 1000, "cooldown": 600, "amount": 6, "type": "strong" }
        ],

        // Wave 10
        [{ "delay": 0, "cooldown": 1000, "amount": 2, "type": "titan" }],

        // Wave 11
        [
            { "delay": 0, "cooldown": 500, "amount": 6, "type": "strong"},
            { "delay": 6000, "cooldown": 300, "amount": 8, "type": "res normal" },
            { "delay": 12000, "cooldown": 700, "amount": 20, "type": "res speedy" }
        ],

        // Wave 12
        [
            
            { "delay": 0, "cooldown": 600, "amount": 8, "type": "res speedy" },
            { "delay": 5000, "cooldown": 2500, "amount": 4, "type": "res armored normal", "immunes": { "bullet": 0.5} }
        ],

        // Wave 13
        [{ "delay": 0, "cooldown": 700, "amount": 10, "type": "res speedy" }],

        // Wave 14
        [
            { "delay": 0, "cooldown": 1200, "amount": 20, "type": "res speedy" },
            { "delay": 4000, "cooldown": 1000, "amount": 10, "type": "res armored normal", "immunes": { "bullet": 0.5} },
            { "delay": 0, "cooldown": 600, "amount": 5, "type": "res strong" }
        ],

        // Wave 15
        [
            { "delay": 0, "cooldown": 600, "amount": 2, "type": "speedy boss" },
            { "delay": 0, "cooldown": 600, "amount": 10, "type": "normal" }
        ],

        // Wave 16
        [{ "delay": 0, "cooldown": 800, "amount": 20, "type": "armored strong", "immunes": { "bullet": 0.5 } }],

        // Wave 17
        [{ "delay": 0, "cooldown": 1000, "amount": 10, "type": "boss1", "stealth": true }],

        // Wave 18
        [
            { "delay": 0, "cooldown": 1600, "amount": 15, "type": "boss1" },
            { "delay": 4500, "cooldown": 800, "amount": 9, "type": "speedy boss" }
        ],

        // Wave 19
        [
            { "delay": 0, "cooldown": 800, "amount": 25, "type": "res armored strong" },
            { "delay": 4500, "cooldown": 600, "amount": 30, "type": "res normal" }
        ],

        // Wave 20
        [
            { "delay": 0, "cooldown": 1000, "amount": 13, "type": "res armored strong", "immunes": { "bullet": 0.5} },
            { "delay": 500, "cooldown": 1000, "amount": 30, "type": "armored strong", "immunes": { "bullet": 0.5 } },
            { "delay": 3500, "cooldown": 700, "amount": 30, "type": "res speedy" }
        ],

        // Wave 21
        [
            { "delay": 0, "cooldown": 800, "amount": 25, "type": "strong" },
            { "delay": 4500, "cooldown": 1000, "amount": 26, "type": "res armored strong", "immunes": { "bullet": 0.5 } }
        ],

        // Wave 22
        [{ "delay": 0, "cooldown": 1200, "amount": 15, "type": "titan" }],

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
        150 + 50 + 100,  // 1
        175 + 50 + 100,  // 2
        200 + 50 + 100,  // 3
        250 + 50 + 100,  // 4
        225 + 50 + 100,  // 5 (Halved bonus)
        175 + 50 + 100,  // 6 (Halved bonus)
        150 + 50 + 100,  // 7 (Halved bonus)
        175 + 50 + 100,  // 8 (Halved bonus)
        200 + 50 + 100,  // 9 (Halved bonus)
        250 + 50 + 100,  // 10
        300 + 50 + 100,  // 11
        400 + 50 + 100,  // 12
        450 + 50 + 100,  // 13
        500 + 50 + 100,  // 14
        600 + 50 + 100,  // 15
        700 + 50 + 100,  // 16
        750 + 50 + 100,  // 17
        800 + 50 + 100,  // 18
        900 + 50 + 100,  // 19
        1000 + 50 + 100,  // 20
        1100 + 50 + 100,  // 21
        1200 + 50 + 100,  // 22
        1300 + 50 + 100,  // 23
        1400 + 50 + 100,  // 24
        1500 + 50 + 100,  // 25
        1600 + 50 + 100,  // 26
        1700 + 50 + 100,  // 27
        1800 + 50 + 100,  // 28
        1900 + 50 + 100,  // 29
        2000 + 50 + 100   // 30
    ],
    dialogues:[

    ]
};
function loadBMediumMode() {
    waves = medMode.waves;
    waveBonuses = medMode.waveBonuses.map((x)=>x/2);
    dialogues = medMode.dialogues;
    
    player.money = 750; // Slightly more to handle the tougher mode
    player.wave = 1;

    waveBonuses.forEach(function (bonus, index) {
        if (index < player.wave-1) {
            player.money += bonus + 50;
        }
    });
    
    player.health = 100;
    player.selectedTower = null;
}