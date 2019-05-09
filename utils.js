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
