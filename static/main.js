import { processFile, processJSON } from './balatro-save-loader.js';

const file = document.getElementById('file');
const download = document.getElementById('download');
const dataDiv = document.getElementById('data');
const raw = document.getElementById('raw');
const valuesButton = document.getElementById('values');

let data = null;
let active = null;
setCanSave(false);

let filename = 'save.jkr';

const values = [
    {
        name: 'Money',
        path: 'GAME.dollars',
        type: 'number',
    },
    {
        name: 'Joker Limit',
        path: 'cardAreas.jokers.config.card_limit',
        type: 'number',
    },
    {
        name: 'Consumable Limit',
        path: 'cardAreas.consumeables.config.card_limit',
        type: 'number',
    },
    {
        name: 'Hand Size',
        path: 'cardAreas.hand.config.card_limit',
        type: 'number',
    },
    {
        name: 'Discards',
        path: 'GAME.round_resets.discards',
        type: 'number',
    },
    {
        name: 'Hands',
        path: 'GAME.round_resets.hands',
        type: 'number',
    },
    {
        name: 'Reroll Cost',
        path: 'GAME.round_resets.reroll_cost',
        type: 'number',
    },
    {
        name: 'Max Shop Jokers',
        path: 'GAME.shop.joker_max',
        type: 'number',
    },
    {
        name: "Probabilities",
        path: 'GAME.probabilities.normal',
        type: 'number',
    }
];

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

function readFile() {
    const reader = new FileReader();
    reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
            try {
                window.debugData =
                    data = processFile(arrayBuffer);
                for (let fullPath of knownArrays) {
                    let path = fullPath.split('.');
                    const last = path.pop();
                    let obj = data;
                    for (let key of path) {
                        obj = obj?.[key];
                    }
                    if (obj?.[last]) {
                        // If its an empty object, we set it to an empty array
                        if (Object.keys(obj[last]).length === 0) {
                            obj[last] = [];
                        }
                    }

                }
                filename = file?.files?.[0]?.name || filename;
            } catch (e) {
                console.error(e);
                dataDiv.innerText = 'Error loading file: ' + e.message;
            }
            showInputs();
        }
    };
    reader.readAsArrayBuffer(file?.files?.[0]);

}

file?.addEventListener('change', readFile);

if (file?.files?.length) {
    readFile();
}

download?.addEventListener('click', () => {
    if (!data) return;
    saveEverything()
    const buffer = processJSON(data);
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
});

raw?.addEventListener('click', () => {
    saveEverything();
    showRaw();
});

valuesButton?.addEventListener('click', () => {
    saveEverything();
    showInputs();
});

function get(obj, path) {
    return path.split('.').reduce((acc, key) => acc[key], obj);
}

function set(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const parent = keys.reduce((acc, key) => acc[key], obj);
    parent[lastKey] = value;
}

function showInputs() {
    dataDiv.innerHTML = '';
    active = 'inputs';
    try {
        values.forEach((value) => {
            const label = document.createElement('label');
            label.textContent = value.name + ': ';
            dataDiv.appendChild(label);
            const input = document.createElement('input');
            input.type = value.type;
            input.value = get(data, value.path);
            input.placeholder = value.name;
            input.name = value.path;
            input.addEventListener('change', () => {
                validateInputs({ target: input });
                if (input.reportValidity()) {
                    setCanSave(true);
                    set(data, value.path, input.value);
                } else {
                    setCanSave(false);
                }
            });
            input.addEventListener('input', () => {
                validateInputs({ target: input });
                if (input.reportValidity()) {
                    setCanSave(true);
                    set(data, value.path, input.value);
                } else {
                    setCanSave(false);
                }
            });
            dataDiv.appendChild(input);
            dataDiv.appendChild(document.createElement('br'));
        });
        setCanSave(true);
    } catch (e) {
        console.error(e);
        dataDiv.innerText = 'Error processing save data: ' + e.message;
    }
}

function saveInputs() {
    values.forEach((value) => {
        const input = dataDiv.querySelector(`input[name="${value.path}"]`);
        if (!input) return;
        if (input.value === '') {
            return;
        }
        switch (value.type) {
            case 'number':
                const number = Number(input.value);
                if (isNaN(number)) {
                    return;
                }
                set(data, value.path, Number(input.value));
                break;
            default:
                set(data, value.path, input.value);
                break;
        }
    });
}

function validateInputs(e) {
    const input = e.target;
    switch (input.type) {
        case 'number':
            const number = Number(input.value);
            if (isNaN(number)) {
                input.setCustomValidity('Invalid number');
            } else {
                input.setCustomValidity('');
            }
            break;
    }
    input.reportValidity();

}

function validateRaw(area) {
    try {
        JSON.parse(area.value);
        area.setCustomValidity('');
        setCanSave(true);
    } catch (e) {
        area.setCustomValidity('Invalid JSON:\n' + e.message);
        setCanSave(false);
    }
    area.reportValidity();
}

function setCanSave(bool) {
    download.disabled = !bool;
    raw.disabled = !bool;
    valuesButton.disabled = !bool;
}

function showRaw() {
    dataDiv.innerHTML = '';
    active = 'raw';
    const textarea = document.createElement('textarea');
    textarea.value = JSON.stringify(data, null, 4);
    textarea.addEventListener('change', () => {
        validateRaw(textarea);
    });
    textarea.addEventListener('input', () => {
        validateRaw(textarea);
    });
    dataDiv.appendChild(textarea);
    setCanSave(true);
}

function saveRaw() {
    try {
        const raw = JSON.parse(dataDiv.querySelector('textarea')?.value);
        if (raw) {
            data = raw;
        }
    } catch (e) {
        console.error(e);
        dataDiv.innerText = 'Error parsing JSON: ' + e.message;
    }
}

function saveEverything() {
    switch (active) {
        case 'inputs':
            saveInputs();
            break;
        case 'raw':
            saveRaw();
            break;
    }
}