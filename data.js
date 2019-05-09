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

const EPISODE_1 = 0;
const EPISODE_2 = 1;
const EPISODE_4 = 2;

const DIFFICULTY_N  = 0;
const DIFFICULTY_H  = 1;
const DIFFICULTY_VH = 2;
const DIFFICULTY_U  = 3;

const GAME_MODE_MULTI = 0;
const GAME_MODE_SOLO  = 1;
