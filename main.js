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
    root: document.getElementById("root"),
    character_stats: {
        class: HUCAST,
        level: CHARACTER_MAX_STATS_IDX
    },
    character_stat_elements: {},
    selected_episode: EPISODE_1,
    selected_difficulty: DIFFICULTY_U,
    selected_game_mode: GAME_MODE_MULTI,
    selected_weapon: weapon_data.findIndex(weapon => weapon.name === "Charge Vulcan"),
    weapon_stats: {},
    weapon_stat_elements: {},
    weapon_attributes: {
        native: 0,
        abeast: 0,
        machine: 0,
        dark: 0,
        hit: 0
    },
    weapon_attribute_elements: {},
    accuracy_treshold: 100
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
    const table_container = document.createElement("fieldset");
    table_container.className = "enemy_table";
    const title = document.createElement("legend");
    title.textContent = "Optimal combos";
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
    table_container.append(title, table_header, table_body);
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
    const enemy_data = await get_enemy_data(UI.selected_episode, UI.selected_difficulty, UI.selected_game_mode);
    const temp_table_body = document.createDocumentFragment();
    for (const enemy of enemy_data) {
        const cell = document.createElement("div");
        cell.className = "enemy_cell";
        const name_el = document.createElement("div");
        name_el.textContent = enemy.name;
        const combo_el = document.createElement("div");
        const combo = combo_kill(UI.character_stats, UI.weapon_stats, enemy, UI.accuracy_treshold);
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
        temp_table_body.appendChild(cell);
    }
    table_body.appendChild(temp_table_body);
}

async function create_character_settings() {
    const container = document.createElement("fieldset");
    container.className = "character_settings";
    const title = document.createElement("legend");
    title.textContent = "Character";
    const character_select = create_select(character_classes, character_names, UI.character_stats.class);
    const character_container = create_labeled_input("Class", character_select).parentElement;
    character_select.addEventListener("change", update_character_stats.bind(null, "class"));
    const level_indices = Array(NUM_CHARACTER_LEVELS + 1).fill().map((_, i) => i);
    const level_names = level_indices.map((_, i) => `Level ${i + 1}`);
    level_names[CHARACTER_MAX_STATS_IDX] = "Max stats";
    const level_select = create_select(level_indices, level_names, UI.character_stats.level);
    const level_container = create_labeled_input("Stat presets", level_select).parentElement;
    level_select.addEventListener("change", update_character_stats.bind(null, "level"));
    container.append(title, character_container, level_container, create_vertical_rule());
    const character_data = (await get_character_data(UI.character_stats.class))[UI.character_stats.level];
    for (const stat_name of character_stat_names) {
        const input_el = create_labeled_input(stat_name);
        input_el.value = UI.character_stats[stat_name] = character_data[stat_name];
        UI.character_stat_elements[stat_name] = input_el;
        input_el.addEventListener("change", update_character_stats.bind(null, stat_name));
        container.append(input_el.parentElement);
    }
    return container;
}

async function update_character_stats(stat_name, event) {
    if (event) {
        let new_val = null;
        try {
            new_val = parseInt(event.target.value);
        } catch (ex) {
            console.warn(`Invalid input value: ${stat_name}`);
            return;
        }
        UI.character_stats[stat_name] = new_val;
    }
    switch (stat_name) {
    case "class":
    case "level":
        const character_data = (await get_character_data(UI.character_stats.class))[UI.character_stats.level];
        for (const other_stat_name of character_stat_names) {
            UI.character_stat_elements[other_stat_name].value = UI.character_stats[other_stat_name] = character_data[other_stat_name];
        }
        break;
    default:
        // no need to update others if stat was edited manually
        break;
    }
    update_enemy_table();
}

function create_weapon_settings() {
    const container = document.createElement("fieldset");
    container.className = "weapon_settings";
    const title = document.createElement("legend");
    title.textContent = "Weapon";
    const weapon_indices = weapon_data.map((_, i) => i);
    const weapon_names = weapon_data.map(weapon => weapon.name);
    const weapon_select = create_select(weapon_indices, weapon_names, UI.selected_weapon);
    const preset_container = create_labeled_input("Presets", weapon_select).parentElement;
    weapon_select.addEventListener("change", event => {
        UI.selected_weapon = event.target.selectedIndex;
        const weapon = weapon_data[UI.selected_weapon];
        for (const other_stat of editable_weapon_stats) {
            const stat_key = weapon_stat_keys[other_stat];
            UI.weapon_stat_elements[stat_key].value = UI.weapon_stats[stat_key] = weapon[stat_key];
        }
        UI.weapon_stats.special = UI.weapon_special_select.value = weapon.special;
        UI.weapon_stats.kind = UI.weapon_kind_select.value = weapon.kind;
        update_enemy_table();
    });
    const special_select = UI.weapon_special_select = create_select(special_attacks, special_attack_names, UI.selected_weapon_special);
    const special_container = create_labeled_input("Special", special_select).parentElement;
    special_select.addEventListener("change", event => {
        UI.selected_weapon_special = event.target.selectedIndex;
        update_enemy_table();
    });
    const kind_select = UI.weapon_kind_select = create_select(weapon_kinds, weapon_kind_names, UI.weapon_stats.kind);
    const kind_container = create_labeled_input("Kind", kind_select).parentElement;
    kind_select.addEventListener("change", event => {
        UI.weapon_stats.kind = event.target.selectedIndex;
        update_enemy_table();
    });
    container.append(title, preset_container, kind_container, special_container, create_vertical_rule());
    const weapon = weapon_data[UI.selected_weapon];
    UI.weapon_stats.special = special_select.value = weapon.special;
    UI.weapon_stats.kind = kind_select.value = weapon.kind;
    for (const stat of editable_weapon_stats) {
        const stat_name = weapon_stat_names[stat];
        const stat_key = weapon_stat_keys[stat];
        const input_el = create_labeled_input(stat_name);
        input_el.value = UI.weapon_stats[stat_key] = weapon[stat_key];
        UI.weapon_stat_elements[stat_key] = input_el;
        input_el.addEventListener("change", update_weapon_stats.bind(null, stat));
        container.appendChild(input_el.parentElement);
    }
    container.appendChild(create_vertical_rule());
    for (const attr of weapon_attributes) {
        const attr_name = weapon_attribute_names[attr];
        const attr_key = weapon_attribute_keys[attr];
        const input_el = create_labeled_input(attr_name);
        input_el.value = UI.weapon_attributes[attr_key];
        UI.weapon_attribute_elements[attr_key] = input_el;
        input_el.addEventListener("change", update_weapon_attributes.bind(null, attr));
        container.append(input_el.parentElement);
    }
    return container;
}

function update_weapon_stats(stat, event) {
    const stat_key = weapon_stat_keys[stat];
    if (event) {
        let new_val = null;
        try {
            new_val = parseInt(event.target.value);
        } catch (ex) {
            console.warn(`Invalid input value: ${stat_name}`);
            return;
        }
        UI.weapon_stats[stat_key] = new_val;
    }
    switch (stat) {
    case WEAPON_STAT_ATP_MIN:
        if (!UI.weapon_stat_elements[weapon_stat_keys[WEAPON_STAT_ATP_MAX]].value) {
            UI.weapon_stat_elements[weapon_stat_keys[WEAPON_STAT_ATP_MAX]].value = UI.weapon_stat_elements[stat_key].value;
        }
        break;
    }
    update_enemy_table();
}

function update_weapon_attributes(attribute, event) {
    if (event) {
        let new_val = null;
        try {
            new_val = parseInt(event.target.value);
        } catch (ex) {
            console.warn(`Invalid input value: ${stat_name}`);
            return;
        }
        UI.weapon_attributes[weapon_attribute_keys[attribute]] = new_val;
    }
    update_enemy_table();
}

async function create_ui() {
    const control_panel = UI.control_panel = document.createElement("div");
    const character_settings = await create_character_settings();
    const weapon_settings = create_weapon_settings();
    const enemy_table = create_enemy_table();
    control_panel.append(character_settings, weapon_settings);
    UI.root.append(control_panel, enemy_table);
    update_enemy_table();
}

function main() {
    create_ui();
}

main();
