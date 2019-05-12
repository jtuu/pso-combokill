const ATTACK_N = 0;
const ATTACK_H = 1;
const ATTACK_S = 2;
const ATTACK_N_GLITCH = 3;
const ATTACK_H_GLITCH = 4;
const ATTACK_S_GLITCH = 5;

const NUM_ATTACK_KINDS = 3;
const NUM_COMBO_STEPS = 3;

const atk_kind_names = [];
atk_kind_names[ATTACK_N]        = "N";
atk_kind_names[ATTACK_H]        = "H";
atk_kind_names[ATTACK_S]        = "S";
atk_kind_names[ATTACK_N_GLITCH] = "N=";
atk_kind_names[ATTACK_H_GLITCH] = "H=";
atk_kind_names[ATTACK_S_GLITCH] = "S=";

const atk_kind_ata_coeffs   = [1.00, 0.70, 0.50];
const combo_step_ata_coeffs = [1.00, 1.30, 1.69];
const atk_kind_dmg_coeffs   = [1.00, 1.89, 3.32];

const VJAYA_SPECIAL_DMG_COEFF = 5.56;
const CRIT_DMG_COEFF = 1.5;

const WEAPON_SABER        = 0;
const WEAPON_SWORD        = 1;
const WEAPON_DAGGER       = 2;
const WEAPON_PARTISAN     = 3;
const WEAPON_SLICER       = 4;
const WEAPON_DOUBLE_SABER = 5;
const WEAPON_CLAW         = 6;
const WEAPON_KATANA       = 7;
const WEAPON_TWIN_SWORD   = 8;
const WEAPON_FIST         = 9;
const WEAPON_HANDGUN      = 10;
const WEAPON_RIFLE        = 11;
const WEAPON_MECHGUN      = 12;
const WEAPON_SHOT         = 13;
const WEAPON_LAUNCHER     = 14;
const WEAPON_CANE         = 15;
const WEAPON_ROD          = 16;
const WEAPON_WAND         = 17;
const WEAPON_CARD         = 18;

const weapon_kinds = [
    WEAPON_SABER,
    WEAPON_SWORD,
    WEAPON_DAGGER,
    WEAPON_PARTISAN,
    WEAPON_SLICER,
    WEAPON_DOUBLE_SABER,
    WEAPON_CLAW,
    WEAPON_KATANA,
    WEAPON_TWIN_SWORD,
    WEAPON_FIST,
    WEAPON_HANDGUN,
    WEAPON_RIFLE,
    WEAPON_MECHGUN,
    WEAPON_SHOT,
    WEAPON_LAUNCHER,
    WEAPON_CANE,
    WEAPON_ROD,
    WEAPON_WAND,
    WEAPON_CARD
];

const weapon_kind_names = [];
weapon_kind_names[WEAPON_SABER] =        "Saber";
weapon_kind_names[WEAPON_SWORD] =        "Sword";
weapon_kind_names[WEAPON_DAGGER] =       "Dagger";
weapon_kind_names[WEAPON_PARTISAN] =     "Partisan";
weapon_kind_names[WEAPON_SLICER] =       "Slicer";
weapon_kind_names[WEAPON_DOUBLE_SABER] = "Double Saber";
weapon_kind_names[WEAPON_CLAW] =         "Claw";
weapon_kind_names[WEAPON_KATANA] =       "Katana";
weapon_kind_names[WEAPON_TWIN_SWORD] =   "Twin Sword";
weapon_kind_names[WEAPON_FIST] =         "Fist";
weapon_kind_names[WEAPON_HANDGUN] =      "Handgun";
weapon_kind_names[WEAPON_RIFLE] =        "Rifle";
weapon_kind_names[WEAPON_MECHGUN] =      "Mechgun";
weapon_kind_names[WEAPON_SHOT] =         "Shot";
weapon_kind_names[WEAPON_LAUNCHER] =     "Launcher";
weapon_kind_names[WEAPON_CANE] =         "Cane";
weapon_kind_names[WEAPON_ROD] =          "Rod";
weapon_kind_names[WEAPON_WAND] =         "Wand";
weapon_kind_names[WEAPON_CARD] =         "Card";

const weapon_hit_counts = [];
weapon_hit_counts[WEAPON_SABER]        = [1, 1, 1];
weapon_hit_counts[WEAPON_SWORD]        = [1, 1, 1];
weapon_hit_counts[WEAPON_DAGGER]       = [2, 2, 2];
weapon_hit_counts[WEAPON_PARTISAN]     = [1, 1, 1];
weapon_hit_counts[WEAPON_SLICER]       = [1, 1, 1];
weapon_hit_counts[WEAPON_DOUBLE_SABER] = [2, 1, 3];
weapon_hit_counts[WEAPON_CLAW]         = [1, 1, 1];
weapon_hit_counts[WEAPON_KATANA]       = [1, 1, 1];
weapon_hit_counts[WEAPON_TWIN_SWORD]   = [1, 2, 2];
weapon_hit_counts[WEAPON_FIST]         = [1, 1, 1];
weapon_hit_counts[WEAPON_HANDGUN]      = [1, 1, 1];
weapon_hit_counts[WEAPON_RIFLE]        = [1, 1, 1];
weapon_hit_counts[WEAPON_MECHGUN]      = [3, 3, 3];
weapon_hit_counts[WEAPON_SHOT]         = [1, 1, 1];
weapon_hit_counts[WEAPON_LAUNCHER]     = [1, 1, 1];
weapon_hit_counts[WEAPON_CANE]         = [1, 1, 1];
weapon_hit_counts[WEAPON_ROD]          = [1, 1, 1];
weapon_hit_counts[WEAPON_WAND]         = [1, 1, 1];
weapon_hit_counts[WEAPON_CARD]         = [1, 1, 3];

const SPECIAL_NONE     = 0;
const SPECIAL_DRAW     = 1;
const SPECIAL_DRAIN    = 2;
const SPECIAL_FILL     = 3;
const SPECIAL_GUSH     = 4;
const SPECIAL_HEART    = 5;
const SPECIAL_MIND     = 6;
const SPECIAL_SOUL     = 7;
const SPECIAL_GEIST    = 8;
const SPECIAL_MASTERS  = 9;
const SPECIAL_LORDS    = 10;
const SPECIAL_KINGS    = 11;
const SPECIAL_CHARGE   = 12;
const SPECIAL_SPIRIT   = 13;
const SPECIAL_BERSERK  = 14;
const SPECIAL_ICE      = 15;
const SPECIAL_FROST    = 16;
const SPECIAL_FREEZE   = 17;
const SPECIAL_BLIZZARD = 18;
const SPECIAL_BIND     = 19;
const SPECIAL_HOLD     = 20;
const SPECIAL_SEIZE    = 21;
const SPECIAL_ARREST   = 22;
const SPECIAL_HEAT     = 23;
const SPECIAL_FIRE     = 24;
const SPECIAL_FLAME    = 25;
const SPECIAL_BURNING  = 26;
const SPECIAL_SHOCK    = 27;
const SPECIAL_THUNDER  = 28;
const SPECIAL_STORM    = 29;
const SPECIAL_TEMPEST  = 30;
const SPECIAL_DIM      = 31;
const SPECIAL_SHADOW   = 32;
const SPECIAL_DARK     = 33;
const SPECIAL_HELL     = 34;
const SPECIAL_PANIC    = 35;
const SPECIAL_RIOT     = 36;
const SPECIAL_HAVOC    = 37;
const SPECIAL_CHAOS    = 38;
const SPECIAL_DEVILS   = 39;
const SPECIAL_DEMONS   = 40;
const SPECIAL_HARD     = 41;

const special_attacks = [
    SPECIAL_NONE,
    SPECIAL_DRAW,
    SPECIAL_DRAIN,
    SPECIAL_FILL,
    SPECIAL_GUSH,
    SPECIAL_HEART,
    SPECIAL_MIND,
    SPECIAL_SOUL,
    SPECIAL_GEIST,
    SPECIAL_MASTERS,
    SPECIAL_LORDS,
    SPECIAL_KINGS,
    SPECIAL_CHARGE,
    SPECIAL_SPIRIT,
    SPECIAL_BERSERK,
    SPECIAL_ICE,
    SPECIAL_FROST,
    SPECIAL_FREEZE,
    SPECIAL_BLIZZARD,
    SPECIAL_BIND,
    SPECIAL_HOLD,
    SPECIAL_SEIZE,
    SPECIAL_ARREST,
    SPECIAL_HEAT,
    SPECIAL_FIRE,
    SPECIAL_FLAME,
    SPECIAL_BURNING,
    SPECIAL_SHOCK,
    SPECIAL_THUNDER,
    SPECIAL_STORM,
    SPECIAL_TEMPEST,
    SPECIAL_DIM,
    SPECIAL_SHADOW,
    SPECIAL_DARK,
    SPECIAL_HELL,
    SPECIAL_PANIC,
    SPECIAL_RIOT,
    SPECIAL_HAVOC,
    SPECIAL_CHAOS,
    SPECIAL_DEVILS,
    SPECIAL_DEMONS
];

const sacrificial_specials = [
    SPECIAL_CHARGE,
    SPECIAL_SPIRIT,
    SPECIAL_BERSERK
];

const special_attack_names = [];
special_attack_names[SPECIAL_NONE]     = "None";
special_attack_names[SPECIAL_DRAW]     = "Draw";
special_attack_names[SPECIAL_DRAIN]    = "Drain";
special_attack_names[SPECIAL_FILL]     = "Fill";
special_attack_names[SPECIAL_GUSH]     = "Gush";
special_attack_names[SPECIAL_HEART]    = "Heart";
special_attack_names[SPECIAL_MIND]     = "Mind";
special_attack_names[SPECIAL_SOUL]     = "Soul";
special_attack_names[SPECIAL_GEIST]    = "Geist";
special_attack_names[SPECIAL_MASTERS]  = "Master's";
special_attack_names[SPECIAL_LORDS]    = "Lord's";
special_attack_names[SPECIAL_KINGS]    = "King's";
special_attack_names[SPECIAL_CHARGE]   = "Charge";
special_attack_names[SPECIAL_SPIRIT]   = "Spirit";
special_attack_names[SPECIAL_BERSERK]  = "Berserk";
special_attack_names[SPECIAL_ICE]      = "Ice";
special_attack_names[SPECIAL_FROST]    = "Frost";
special_attack_names[SPECIAL_FREEZE]   = "Freeze";
special_attack_names[SPECIAL_BLIZZARD] = "Blizzard";
special_attack_names[SPECIAL_BIND]     = "Bind";
special_attack_names[SPECIAL_HOLD]     = "Hold";
special_attack_names[SPECIAL_SEIZE]    = "Seize";
special_attack_names[SPECIAL_ARREST]   = "Arrest";
special_attack_names[SPECIAL_HEAT]     = "Heat";
special_attack_names[SPECIAL_FIRE]     = "Fire";
special_attack_names[SPECIAL_FLAME]    = "Flame";
special_attack_names[SPECIAL_BURNING]  = "Burning";
special_attack_names[SPECIAL_SHOCK]    = "Shock";
special_attack_names[SPECIAL_THUNDER]  = "Thunder";
special_attack_names[SPECIAL_STORM]    = "Storm";
special_attack_names[SPECIAL_TEMPEST]  = "Tempest";
special_attack_names[SPECIAL_DIM]      = "Dim";
special_attack_names[SPECIAL_SHADOW]   = "Shadow";
special_attack_names[SPECIAL_DARK]     = "Dark";
special_attack_names[SPECIAL_HELL]     = "Hell";
special_attack_names[SPECIAL_PANIC]    = "Panic";
special_attack_names[SPECIAL_RIOT]     = "Riot";
special_attack_names[SPECIAL_HAVOC]    = "Havoc";
special_attack_names[SPECIAL_CHAOS]    = "Chaos";
special_attack_names[SPECIAL_DEVILS]   = "Devil's";
special_attack_names[SPECIAL_DEMONS]   = "Demon's";
special_attack_names[SPECIAL_HARD]     = "Hard Attack";

const ATTRIBUTE_NATIVE  = 0;
const ATTRIBUTE_ABEAST  = 1;
const ATTRIBUTE_MACHINE = 2;
const ATTRIBUTE_DARK    = 3;
const ATTRIBUTE_HIT     = 4;

const weapon_attributes = [
    ATTRIBUTE_NATIVE,
    ATTRIBUTE_ABEAST,
    ATTRIBUTE_MACHINE,
    ATTRIBUTE_DARK,
    ATTRIBUTE_HIT
];

const weapon_attribute_keys = [];
weapon_attribute_keys[ATTRIBUTE_NATIVE]  = "native";
weapon_attribute_keys[ATTRIBUTE_ABEAST]  = "abeast";
weapon_attribute_keys[ATTRIBUTE_MACHINE] = "machine";
weapon_attribute_keys[ATTRIBUTE_DARK]    = "dark";
weapon_attribute_keys[ATTRIBUTE_HIT]     = "hit";

const weapon_attribute_names = [];
weapon_attribute_names[ATTRIBUTE_NATIVE]  = "Native";
weapon_attribute_names[ATTRIBUTE_ABEAST]  = "A. Beast";
weapon_attribute_names[ATTRIBUTE_MACHINE] = "Machine";
weapon_attribute_names[ATTRIBUTE_DARK]    = "Dark";
weapon_attribute_names[ATTRIBUTE_HIT]     = "Hit";

const EPISODE_1 = 0;
const EPISODE_2 = 1;
const EPISODE_4 = 2;

const episodes = [
    EPISODE_1,
    EPISODE_2,
    EPISODE_4
];

const episode_names = [];
episode_names[EPISODE_1] = "Episode 1";
episode_names[EPISODE_2] = "Episode 2";
episode_names[EPISODE_4] = "Episode 4";

const DIFFICULTY_N  = 0;
const DIFFICULTY_H  = 1;
const DIFFICULTY_VH = 2;
const DIFFICULTY_U  = 3;

const difficulties = [
    DIFFICULTY_N,
    DIFFICULTY_H,
    DIFFICULTY_VH,
    DIFFICULTY_U
];

const difficulty_names = [];
difficulty_names[DIFFICULTY_N] = "Normal";
difficulty_names[DIFFICULTY_H] = "Hard";
difficulty_names[DIFFICULTY_VH] = "Very Hard";
difficulty_names[DIFFICULTY_U] = "Ultimate";

const GAME_MODE_MULTI = 0;
const GAME_MODE_SOLO  = 1;

const game_modes = [
    GAME_MODE_MULTI,
    GAME_MODE_SOLO
];

const game_mode_names = [];
game_mode_names[GAME_MODE_MULTI] = "Multiplayer";
game_mode_names[GAME_MODE_SOLO] = "Solomode";

const HUMAR     = 0;
const HUNEWEARL = 1;
const HUCAST    = 2;
const HUCASEAL  = 3;
const RAMAR     = 4;
const RAMARL    = 5;
const RACAST    = 6;
const RACASEAL  = 7;
const FOMAR     = 8;
const FOMARL    = 9;
const FONEWM    = 10;
const FONEWEARL = 11;

const character_classes = [
    HUMAR,
    HUNEWEARL,
    HUCAST,
    HUCASEAL,
    RAMAR,
    RAMARL,
    RACAST,
    RACASEAL,
    FOMAR,
    FOMARL,
    FONEWM,
    FONEWEARL
];

const character_names = [];
character_names[HUMAR]      = "HUmar";
character_names[HUNEWEARL]  = "HUnewearl";
character_names[HUCAST]     = "HUcast";
character_names[HUCASEAL]   = "HUcaseal";
character_names[RAMAR]      = "RAmar";
character_names[RAMARL]     = "RAmarl";
character_names[RACAST]     = "RAcast";
character_names[RACASEAL]   = "RAcaseal";
character_names[FOMAR]      = "FOmar";
character_names[FOMARL]     = "FOmarl";
character_names[FONEWM]     = "FOnewm";
character_names[FONEWEARL]  = "FOnewearl";

const NUM_CHARACTER_LEVELS = 200;
const CHARACTER_MAX_STATS_IDX = 200;

const CHARACTER_STAT_ATP   = 0;
const CHARACTER_STAT_ATA   = 1;
const CHARACTER_STAT_LEVEL = 2;
const CHARACTER_STAT_CLASS = 3;

const editable_character_stats = [
    CHARACTER_STAT_ATP,
    CHARACTER_STAT_ATA
];

const character_stat_keys = [];
character_stat_keys[CHARACTER_STAT_ATP]   = "ATP";
character_stat_keys[CHARACTER_STAT_ATA]   = "ATA";
character_stat_keys[CHARACTER_STAT_LEVEL] = "level";
character_stat_keys[CHARACTER_STAT_CLASS] = "class";

const character_stat_names = [];
character_stat_names[CHARACTER_STAT_ATP]   = "ATP";
character_stat_names[CHARACTER_STAT_ATA]   = "ATA";
character_stat_names[CHARACTER_STAT_LEVEL] = "Level";
character_stat_names[CHARACTER_STAT_CLASS] = "Class";

const WEAPON_STAT_ATA     = 0;
const WEAPON_STAT_ATP_MIN = 1;
const WEAPON_STAT_ATP_MAX = 2;
const WEAPON_STAT_GRIND   = 3;
const WEAPON_STAT_KIND    = 4;
const WEAPON_STAT_SPECIAL = 5;

const editable_weapon_stats = [
    WEAPON_STAT_ATA,
    WEAPON_STAT_ATP_MIN,
    WEAPON_STAT_ATP_MAX,
    WEAPON_STAT_GRIND
];

const weapon_stat_keys = [];
weapon_stat_keys[WEAPON_STAT_ATA]     = "ATA";
weapon_stat_keys[WEAPON_STAT_ATP_MIN] = "ATP_min";
weapon_stat_keys[WEAPON_STAT_ATP_MAX] = "ATP_max";
weapon_stat_keys[WEAPON_STAT_GRIND]   = "grind";
weapon_stat_keys[WEAPON_STAT_KIND]    = "kind";
weapon_stat_keys[WEAPON_STAT_SPECIAL] = "special";

const weapon_stat_names = [];
weapon_stat_names[WEAPON_STAT_ATA]     = "ATA";
weapon_stat_names[WEAPON_STAT_ATP_MIN] = "ATP Min";
weapon_stat_names[WEAPON_STAT_ATP_MAX] = "ATP Max";
weapon_stat_names[WEAPON_STAT_GRIND]   = "Grind";
weapon_stat_names[WEAPON_STAT_KIND]    = "Kind";
weapon_stat_names[WEAPON_STAT_SPECIAL] = "Special";
