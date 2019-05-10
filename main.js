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

function combo_kill(attacker, weapon, defender, accuracy_treshold) {
    combos:
    for (const combo of normal_combos) {
        let combo_dmg = 0;
        // check combo accuracy
        for (let step = 0; step < combo.length; step++) {
            const attack_kind = combo[step];
            const accuracy = attack_accuracy(attack_kind, step, attacker.ATA, defender.EVP);
            if (accuracy < accuracy_treshold) {
                continue combos;
            }
        }
        // sum combo damage
        for (let step = 0; step < combo.length; step++) {
            const attack_kind = combo[step];
            combo_dmg += attack_damage(attack_kind, attacker.ATP, defender.DFP) * weapon_hit_counts[weapon.kind][step];
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
        const file_path = `/enemy_data/${data_key}.json`;
        const data = await fetch(file_path).then(res => res.json());
        enemy_data[data_key] = data;
    }
    return enemy_data[data_key];
}

const character_data = {};

async function get_character_data(character) {
    const character_name = character_names[character];
    if (!character_data.hasOwnProperty(character_name)) {
        const file_path = `/character_data/${character_name.toLowerCase()}.json`;
        const data = await fetch(file_path).then(res => res.json());
        character_data[character_name] = data;
    }
    return character_data[character_name];
}

const UI = {
    selected_character: HUCAST,
    selected_episode: EPISODE_1,
    selected_difficulty: DIFFICULTY_U,
    selected_game_mode: GAME_MODE_MULTI
};

function create_select(values, names, default_val) {
    const select = document.createElement("select");
    for (const value of values) {
        const option = document.createElement("option");
        if (value == default_val) {
            option.selected = true;
        }
        option.value = value;
        option.textContent = names[value];
        select.appendChild(option);
    }
    return select;
}

function create_enemy_table() {
    const table_container = document.createElement("div");
    table_container.className = "enemy_table";
    const table_header = document.createElement("div");
    table_header.className = "enemy_table_header";
    const episode_select = create_select(episodes, episode_names, UI.selected_episode);
    const difficulty_select = create_select(difficulties, difficulty_names, UI.selected_difficulty);
    const mode_select = create_select(game_modes, game_mode_names, UI.selected_game_mode);
    episode_select.addEventListener("change", update_enemy_table.bind(null, "selected_episode"));
    difficulty_select.addEventListener("change", update_enemy_table.bind(null, "selected_difficulty"));
    mode_select.addEventListener("change", update_enemy_table.bind(null, "selected_game_mode"));
    table_header.append(episode_select, difficulty_select, mode_select);
    const table_body = UI.enemy_table_body = document.createElement("div");
    table_body.className = "enemy_table_body";
    table_container.append(table_header, table_body);
    update_enemy_table();
    return table_container;
}

async function update_enemy_table(select_value_key, event) {
    if (event) {
        UI[select_value_key] = event.target.selectedIndex;
    }
    const table_body = UI.enemy_table_body;
    if (table_body.childElementCount > 0) {
        const delete_range = document.createRange();
        delete_range.setStartBefore(table_body.firstChild, 0);
        delete_range.setEndAfter(table_body.lastChild, 0);
        delete_range.deleteContents();
    }
    const character_data = await get_character_data(UI.selected_character);
    const enemy_data = await get_enemy_data(UI.selected_episode, UI.selected_difficulty, UI.selected_game_mode);
    for (const enemy of enemy_data) {
        const cell = document.createElement("div");
        cell.className = "enemy_cell";
        const name_el = document.createElement("div");
        name_el.textContent = enemy.name;
        const combo_el = document.createElement("div");
        const combo = combo_kill(character_data[200], {kind: WEAPON_MECHGUN}, enemy, 100);
        if (combo === null) {
            cell.classList.add("combo_fail");
        } else {
            cell.classList.add("combo_success");
        }
        combo_el.textContent = combo_to_string(combo);
        const name_container = document.createElement("div");
        const combo_container = document.createElement("div");
        name_container.appendChild(name_el);
        combo_container.appendChild(combo_el);
        cell.append(name_container, combo_container);
        table_body.appendChild(cell);
    }
}

function create_ui() {
    const control_panel = UI.control_panel = document.createElement("div");
    const character_select = create_select(character_classes, character_names, UI.selected_character);
    const enemy_table = create_enemy_table();
    control_panel.appendChild(character_select);
    document.body.append(control_panel, enemy_table);
}

function main() {
    create_ui();
}

main();
