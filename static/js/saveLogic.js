const knownArrays = [
    'cardAreas.jokers.cards',
    'cardAreas.consumeables.cards',
    'cardAreas.hand.cards',
    'cardAreas.deck.cards',
    'cardAreas.discard.cards',
    'cardAreas.hand.cards',
    'cardAreas.play.cards',
    'tags',
];

function handleKnownArrays(data) {
    for (let fullPath of knownArrays) {
        let path = fullPath.split('.');
        const last = path.pop();
        let obj = data;
        for (let key of path) {
            obj = obj?.[key];
        }
        if (obj?.[last]) {
            // If its an empty object, we set it to an empty array. 
            // This is because the save loader can't differentiate between an empty object and an empty array.
            if (Object.keys(obj[last]).length === 0) {
                obj[last] = [];
            }
        }

    }
}

function get(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function set(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const parent = keys.reduce((acc, key) => acc?.[key], obj);
    if (parent)
        parent[lastKey] = value;
}

function guessFileType(data, filename) {
    if (filename === 'meta.jkr') return 'meta';
    if (filename === 'save.jkr') return 'save';
    if (filename === 'profile.jkr') return 'profile';
    if (filename === 'settings.jkr') return 'settings';
    // These are mostly randomly selected keys that are likely to be in the file
    if (data?.GAME) return 'save';
    if (data?.unlocked) return 'meta';
    if (data?.progress) return 'profile';
    if (data?.crashreports) return 'settings';
    return 'unknown';
}

export {
    handleKnownArrays,
    guessFileType,
    get,
    set,
}