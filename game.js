function combo_to_string(combo) {
    return combo ? combo.map(kind => atk_kind_names[kind]).join("") : "None";
}

function attack_accuracy(kind, step, ata, evp) {
    const kind_coeff = atk_kind_ata_coeffs[kind];
    const step_coeff = combo_step_ata_coeffs[step];
    const evp_coeff = 0.2;
    return clamp((ata * kind_coeff * step_coeff - evp * evp_coeff), 0.0, 100.0);
}

function attack_damage(kind, atp, dfp) {
    const base_dmg_coeff = 0.18;
    const base = (atp - dfp) * base_dmg_coeff;
    return base * atk_kind_dmg_coeffs[kind];
}

const normal_combos = (function make_normal_combos() {
    const combo_set = [ATTACK_N, ATTACK_H, ATTACK_S];
    const combos = [];
    for (let i = 0; i < combo_set.length; i++) {
        combos.push(...multichoose(combo_set, i + 1));
    }
    return combos;
})();

const glitch_combos = (function make_glitch_combos() {
    const combo_set = [ATTACK_S, ATTACK_H, ATTACK_N];
    const glitch_subcombos = multichoose(combo_set, 2);
    const combos = [];
    for (let i = 0; i < glitch_subcombos.length; i++) {
        const glitch_subcombo = glitch_subcombos[i];
        for (let j = 0; j < combo_set.length; j++) {
            combos.push([combo_set[j], glitch_subcombo[0] + NUM_ATTACK_KINDS, glitch_subcombo[1]]);
            combos.push([glitch_subcombo[0] + NUM_ATTACK_KINDS, glitch_subcombo[1], combo_set[j]]);
        }
    }
    return combos;
})();

function modify_attack_kind(orig_kind, special) {
    if (orig_kind === ATTACK_S) {
        switch (special) {
        case SPECIAL_HARD:
            return ATTACK_H;
        case SPECIAL_CHARGE:
        case SPECIAL_SPIRIT:
        case SPECIAL_BERSERK:
            return ATTACK_S;
        default:
            // pretend non-sacrificals do no damage for now
            return ATTACK_NONE;
        }
    }
    return orig_kind;
}

function combo_kill(
    attacker, defender,
    weapon, armor, shield,
    shifta_level, zalure_level,
    frozen, paralyzed,
    accuracy_treshold) {
    const attribute_mod = weapon[weapon_attribute_keys[defender.attribute]] / 100 + 1;
    const base_atp = attacker.ATP;
    const grind_atp = weapon.grind * 2;
    const equip_atp = (weapon.ATP_min + armor.ATP + shield.ATP + grind_atp) * attribute_mod;
    let shifta_atp = 0;
    if (shifta_level > 0) {
        const shifta_mod = ((shifta_level - 1) * 1.3 + 10) / 100 + 1;
        shifta_atp = base_atp * shifta_mod + ((weapon.ATP_max + grind_atp) - (weapon.ATP_min + grind_atp)) * shifta_mod;
    }
    const total_atp = base_atp + equip_atp + shifta_atp;
    let effective_dfp = defender.DFP;
    if (zalure_level > 0) {
        const zalure_mod = Math.max(0, 1 - ((zalure_level - 1) * 1.3 + 10) / 100);
        effective_dfp *= zalure_mod;
    }
    const total_ata = attacker.ATA + weapon.ATA + armor.ATA + shield.ATA + weapon.hit;
    let evp_mod = 1;
    if (frozen) {
        evp_mod -= 0.30;
    }
    if (paralyzed) {
        evp_mod -= 0.15;
    }
    const effective_evp = defender.EVP * evp_mod;
    combos:
    for (const combo of normal_combos) {
        let combo_dmg = 0;
        // check combo accuracy
        for (let step = 0; step < combo.length; step++) {
            const attack_kind = modify_attack_kind(combo[step], weapon.special);
            const accuracy = attack_accuracy(attack_kind, step, total_ata, effective_evp);
            if (accuracy < accuracy_treshold) {
                continue combos;
            }
        }
        // sum combo damage
        for (let step = 0; step < combo.length; step++) {
            const attack_kind = modify_attack_kind(combo[step], weapon.special);
            const hit_dmg = attack_damage(attack_kind, total_atp, effective_dfp);
            combo_dmg += hit_dmg * weapon_hit_counts[weapon.kind][step];
        }
        // did it die?
        if (combo_dmg >= defender.HP) {
            return combo;
        }
    }
    return null;
}

const enemy_data = {};

async function get_enemy_data(episode, difficulty, game_mode) {
    let episode_name = "";
    let difficulty_name = "";
    let game_mode_name = "";
    switch (episode) {
    case EPISODE_1:
        episode_name = "1";
        break;
    case EPISODE_2:
        episode_name = "2";
        break;
    case EPISODE_4:
        episode_name = "4";
        break;
    default:
        throw new TypeError("Invalid argument: episode");
    }
    switch (difficulty) {
    case DIFFICULTY_N:
        difficulty_name = "n";
        break;
    case DIFFICULTY_H:
        difficulty_name = "h";
        break;
    case DIFFICULTY_VH:
        difficulty_name = "vh";
        break;
    case DIFFICULTY_U:
        difficulty_name = "u";
        break;
    default:
        throw new TypeError("Invalid argument: difficulty");
    }
    switch (game_mode) {
    case GAME_MODE_MULTI:
        game_mode_name = "online";
        break;
    case GAME_MODE_SOLO:
        game_mode_name = "offline";
        break;
    default:
        throw new TypeError("Invalid argument: game_mode");
    }
    const data_key = `ep${episode_name}_${difficulty_name}_${game_mode_name}`;
    // download if not cached
    if (!enemy_data.hasOwnProperty(data_key)) {
        const file_path = `enemy_data/${data_key}.json`;
        const data = await fetch(file_path).then(res => res.json());
        enemy_data[data_key] = data;
    }
    return enemy_data[data_key];
}

const character_data = {};

async function get_character_data(character) {
    const character_name = character_names[character];
    if (!character_data.hasOwnProperty(character_name)) {
        const file_path = `character_data/${character_name.toLowerCase()}.json`;
        const data = await fetch(file_path).then(res => res.json());
        character_data[character_name] = data;
    }
    return character_data[character_name];
}
