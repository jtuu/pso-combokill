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

const racast = {
    atp: 1350,
    ata: 224
};

const cvulc = {
    kind: WEAPON_MECHGUN
};

const bartle = {
  hp: 2335,
  dfp: 600,
  evp: 593
};

function combo_kill(attacker, weapon, defender, accuracy_treshold) {
    combos:
    for (const combo of normal_combos) {
        let combo_dmg = 0;
        // check combo accuracy
        for (let step = 0; step < combo.length; step++) {
            const attack_kind = combo[step];
            const accuracy = attack_accuracy(attack_kind, step, attacker.ata, defender.evp);
            if (accuracy < accuracy_treshold) {
                continue combos;
            }
        }
        // sum combo damage
        for (let step = 0; step < combo.length; step++) {
            const attack_kind = combo[step];
            combo_dmg += attack_damage(attack_kind, attacker.atp, defender.dfp) * weapon_hit_counts[weapon.kind][step];
        }
        // did it die?
        if (combo_dmg >= defender.hp) {
            return combo;
        }
    }
    return null;
}
