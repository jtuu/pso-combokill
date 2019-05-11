const ARMOR_EFFECT_SET_BONUS = 0;
const ARMOR_EFFECT_PROXIMITY = 1;

const armor_data = [
    {
        "id": -1,
        "name": "None",
        "ATP": 0,
        "ATA": 0
    },
    {
        "id": 65822,
        "name": "D-Parts ver1.01",
        "ATP": 35,
        "ATA": 0
    },
    {
        "id": 65823,
        "name": "D-Parts ver2.10",
        "ATP": 10,
        "ATA": 0
    },
    {
        "id": 65857,
        "name": "Thirteen",
        "ATP": 0,
        "ATA": 0,
        "effects": [
            {
                "kind": ARMOR_EFFECT_SET_BONUS,
                "id": 1285,
                "ATP": 0,
                "ATP_percent": 50,
                "ATA": 30
            },
            {
                "kind": ARMOR_EFFECT_SET_BONUS,
                "id": 1286,
                "ATP": 0,
                "ATP_percent": 50,
                "ATA": 30
            },
            {
                "kind": ARMOR_EFFECT_SET_BONUS,
                "id": 1287,
                "ATP": 0,
                "ATP_percent": 50,
                "ATA": 30
            }
        ]
    },
    {
        "id": 65861,
        "name": "Sweetheart",
        "ATP": 0,
        "ATA": 0,
        "effects": [
            {
                "kind": ARMOR_EFFECT_PROXIMITY,
                "num_players": [
                    {
                        "ATP": 0,
                        "ATP_percent": 15,
                        "ATA": 0
                    },
                    {
                        "ATP": 0,
                        "ATP_percent": 20,
                        "ATA": 0
                    },
                    {
                        "ATP": 0,
                        "ATP_percent": 25,
                        "ATA": 0
                    }
                ]
            },
            {
                "kind": ARMOR_EFFECT_SET_BONUS,
                "id": 39168,
                "ATP": 0,
                "ATP_percent": 30,
                "ATA": 12
            }
        ]
    },
];

const shield_data = [
    {
        "id": -1,
        "name": "None",
        "ATP": 0,
        "ATA": 0
    },
    {
        "id": 66072,
        "name": "S-Parts ver2.01",
        "ATP": 0,
        "ATA": 15
    },
    {
        "id": 66076,
        "name": "Ranger Wall",
        "ATP": 0,
        "ATA": 20
    },
    {
        "id": 66077,
        "name": "Hunter Wall",
        "ATP": 15,
        "ATA": 0
    },
    {
        "id": 66080,
        "name": "Combat Gear",
        "ATP": 35,
        "ATA": 0
    },
    {
        "id": 66087,
        "name": "Red Ring",
        "ATP": 20,
        "ATA": 20
    },
    {
        "id": 66090,
        "name": "Safety Heart",
        "ATP": 0,
        "ATA": 0,
        "effects": [
            {
                "kind": ARMOR_EFFECT_SET_BONUS,
                "id": 5121,
                "ATP": 0,
                "ATP_percent": 0,
                "ATA": 30
            }
        ]
    },
    {
        "id": 66091,
        "name": "Kasami Bracer",
        "ATP": 35,
        "ATA": 0
    },
    {
        "id": 66183,
        "name": "Striker Plus",
        "ATP": 0,
        "ATA": 0,
        "effects": [
            {
                "kind": ARMOR_EFFECT_SET_BONUS,
                "id": 48896,
                "ATP": 30,
                "ATP_percent": 0,
                "ATA": 0
            }
        ]
    },
    {
        "id": 66143,
        "name": "Green Ring",
        "ATP": 0,
        "ATA": 0,
        "effects": [
            {
                "kind": ARMOR_EFFECT_PROXIMITY,
                "num_players": [
                    {
                        "ATP": 0,
                        "ATP_percent": 0,
                        "ATA": 10
                    },
                    {
                        "ATP": 0,
                        "ATP_percent": 0,
                        "ATA": 20
                    },
                    {
                        "ATP": 0,
                        "ATP_percent": 0,
                        "ATA": 30
                    }
                ]
            }
        ]
    },
    {
        "id": 66176,
        "name": "Black Ring",
        "ATP": 0,
        "ATA": 0,
        "effects": [
            {
                "kind": ARMOR_EFFECT_PROXIMITY,
                "num_players": [
                    {
                        "ATP": 50,
                        "ATP_percent": 0,
                        "ATA": 0
                    },
                    {
                        "ATP": 100,
                        "ATP_percent": 0,
                        "ATA": 0
                    },
                    {
                        "ATP": 150,
                        "ATP_percent": 0,
                        "ATA": 0
                    }
                ]
            }
        ]
    },
    {
        "id": 66186,
        "name": "Yata Mirror",
        "ATP": 35,
        "ATA": 0
    },
];
