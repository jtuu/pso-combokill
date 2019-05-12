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

function create_enemy_table() {
    const episode_select = create_select(episodes, episode_names, UI.selected_episode);
    const difficulty_select = create_select(difficulties, difficulty_names, UI.selected_difficulty);
    const mode_select = create_select(game_modes, game_mode_names, UI.selected_game_mode);
    episode_select.addEventListener("change", update_enemy_table.bind(null, "selected_episode"));
    difficulty_select.addEventListener("change", update_enemy_table.bind(null, "selected_difficulty"));
    mode_select.addEventListener("change", update_enemy_table.bind(null, "selected_game_mode"));
    const table_body = v("div", {class: "enemy_table_body"});
    UI.enemy_table_body = table_body.toDOM();
    return v("fieldset", {class: "enemy_table"}, [
        v("legend", "Optimal combos"),
        v("div", {class: "enemy_table_header"}, [
            episode_select,
            difficulty_select,
            mode_select
        ]),
        table_body
    ]);
}

async function update_enemy_table(select_value_key, event) {
    if (event) {
        UI[select_value_key] = event.target.selectedIndex;
    }
    const table_body = UI.enemy_table_body;
    if (table_body.childElementCount > 0) {
        remove_children(table_body);
    }
    const enemy_data = await get_enemy_data(UI.selected_episode, UI.selected_difficulty, UI.selected_game_mode);
    const temp_table_body = document.createDocumentFragment();
    for (const enemy of enemy_data) {
        const combo = combo_kill(UI.character_stats, UI.weapon_stats, enemy, UI.accuracy_treshold);
        v("div", {class: "enemy_cell " + (combo === null ? "combo_fail" : "combo_success")}, [
            v("div", [
                v("div", enemy.name)
            ]),
            v("div", [
                v("div", combo_to_string(combo))
            ])
        ]).appendTo(temp_table_body);
    }
    table_body.appendChild(temp_table_body);
}

async function create_character_settings() {
    const character_select = create_select(character_classes, character_names, UI.character_stats.class);
    character_select.addEventListener("change", update_character_stats.bind(null, CHARACTER_STAT_CLASS));
    const level_indices = Array(NUM_CHARACTER_LEVELS + 1).fill().map((_, i) => i);
    const level_names = level_indices.map((_, i) => `Level ${i + 1}`);
    level_names[CHARACTER_MAX_STATS_IDX] = "Max stats";
    const level_select = create_select(level_indices, level_names, UI.character_stats.level);
    level_select.addEventListener("change", update_character_stats.bind(null, CHARACTER_STAT_LEVEL));
    const character_data = (await get_character_data(UI.character_stats.class))[UI.character_stats.level];
    return v("fieldset", [
        v("legend", "Character"),
        create_labeled_input("Class", character_select).container,
        create_labeled_input("Stat presets", level_select).container,
        create_vertical_rule(),
        ...editable_character_stats.map(stat => create_text_field(
            stat, character_stat_keys, character_names,
            UI.character_stats, character_data,
            UI.character_stat_elements,
            update_character_stats
        ))
    ]);
}

async function update_character_stats(stat, event) {
    const stat_key = character_stat_keys[stat];
    if (event) {
        let new_val = null;
        try {
            new_val = parseInt(event.target.value);
        } catch (ex) {
            console.warn(`Invalid input value: ${stat_key}`);
            return;
        }
        UI.character_stats[stat_key] = new_val;
    }
    switch (stat) {
    case CHARACTER_STAT_CLASS:    
    case CHARACTER_STAT_LEVEL:
        const character_data = (await get_character_data(UI.character_stats.class))[UI.character_stats.level];
        for (const other_stat of editable_character_stats) {
            const other_stat_key = character_stat_keys[other_stat];
            UI.character_stat_elements[other_stat_key].value = UI.character_stats[other_stat_key] = character_data[other_stat_key];
        }
        break;
    default:
        // no need to update others if stat was edited manually
        break;
    }
    update_enemy_table();
}

function create_weapon_settings() {
    const weapon_indices = weapon_data.map((_, i) => i);
    const weapon_names = weapon_data.map(weapon => weapon.name);
    const weapon_select = create_select(weapon_indices, weapon_names, UI.selected_weapon);
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
    const weapon = weapon_data[UI.selected_weapon];
    UI.weapon_stats.special = weapon.special;
    UI.weapon_stats.kind = weapon.kind;
    const special_select = create_select(special_attacks, special_attack_names, UI.weapon_stats.special);
    special_select.addEventListener("change", event => {
        UI.weapon_stats.special = event.target.selectedIndex;
        update_enemy_table();
    });
    const kind_select = create_select(weapon_kinds, weapon_kind_names, UI.weapon_stats.kind);
    kind_select.addEventListener("change", event => {
        UI.weapon_stats.kind = event.target.selectedIndex;
        update_enemy_table();
    });
    UI.weapon_special_select = special_select.toDOM();
    UI.weapon_kind_select = kind_select.toDOM();
    return v("fieldset", {class: "weapon_settings"}, [
        v("legend", "Weapon"),
        create_labeled_input("Presets", weapon_select).container,
        create_labeled_input("Kind", kind_select).container,
        create_labeled_input("Special", special_select).container,
        create_vertical_rule(),
        ...editable_weapon_stats.map(stat => create_text_field(
            stat, weapon_stat_keys, weapon_stat_names,
            UI.weapon_stats, weapon,
            UI.weapon_stat_elements,
            update_weapon_stats
        )),
        create_vertical_rule(),
        ...weapon_attributes.map(attr => create_text_field(
            attr, weapon_attribute_keys, weapon_attribute_names,
            UI.weapon_attributes, UI.weapon_attributes,
            UI.weapon_attribute_elements,
            update_weapon_attributes
        ))
    ]);
}

function update_weapon_stats(stat, event) {
    const stat_key = weapon_stat_keys[stat];
    if (event) {
        let new_val = null;
        try {
            new_val = parseInt(event.target.value);
        } catch (ex) {
            console.warn(`Invalid input value: ${stat_key}`);
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
    v("div", [
        await create_character_settings(),
        create_weapon_settings()
    ]).appendTo(UI.root);
    create_enemy_table().appendTo(UI.root);
    update_enemy_table();
}

function main() {
    create_ui();
}

main();
