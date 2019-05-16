function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

function multichoose(set, r) {
    const rmo = r - 1;
    const n = set.length - 1;
    const indices = Array(r).fill(0);
    const result = [indices.map(i => set[i])];
    while (true) {
        let found = false;
        let i = rmo;
        for (; i >= 0; i--) {
            if (indices[i] != n) {
                found = true;
                break;
            }
        }
        if (!found) {
            break;
        }
        indices.fill(indices[i] + 1, i);
        result.push(indices.map(i => set[i]));
    }
    return result;
}

function create_select(values, names, default_val) {
    return v("select", values.map(value => v("option", {
        selected: value === default_val,
        value: value
    }, names[value])));
}

function create_labeled_input(label_text, input = v("input")) {
    const container = v("div", {class: "labeled_input_container"}, [
        v("label", [
            v("div", label_text),
            input
        ])
    ]);
    return {
        container,
        input
    };
}

function create_vertical_rule() {
    return v("div", {class: "vertical_rule"});
}

function remove_children(element) {
    const delete_range = document.createRange();
    delete_range.setStartBefore(element.firstChild, 0);
    delete_range.setEndAfter(element.lastChild, 0);
    delete_range.deleteContents();
}

function create_text_field(value_index, keys, names, data_dst, data_src, input_el_dst, change_handler) {
    const key = keys[value_index];
    const name = names[value_index];
    const labeled = create_labeled_input(name);
    labeled.input.attrs.value = data_dst[key] = data_src[key];
    input_el_dst[key] = labeled.input.toDOM();
    labeled.input.addEventListener("change", change_handler.bind(null, value_index));
    return labeled.container;
}
