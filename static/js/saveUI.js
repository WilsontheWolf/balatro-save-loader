import { get, set } from "./saveLogic.js";

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

const saveTabs = [
    {
        name: 'Values',
        shouldShow: (ctx) => true,
        render: (ctx) => {
            try {
                const { dataDiv, data, setCanClose } = ctx;
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
                            setCanClose(true);
                            saveFormInput(input.value, value.type, value.path, data);
                        } else {
                            setCanClose(false);
                        }
                    });
                    input.addEventListener('input', () => {
                        validateInputs({ target: input });
                        if (input.reportValidity()) {
                            setCanClose(true);
                            saveFormInput(input.value, value.type, value.path, data);
                        } else {
                            setCanClose(false);
                        }
                    });
                    dataDiv.appendChild(input);
                    dataDiv.appendChild(document.createElement('br'));
                });
            } catch (e) {
                console.error(e);
                ctx.dataDiv.innerText = 'Error processing save data: ' + e.message;
            }
        },
        save: (ctx) => {
            values.forEach((value) => {
                const input = ctx.dataDiv.querySelector(`input[name="${value.path}"]`);
                if (!input) return;
                if (input.value === '') {
                    return;
                }
                saveFormInput(input.value, value.type, value.path, ctx.data);
            });
        }
    },
    {
        name: 'Raw', 
        render: (ctx) => {
            const textarea = document.createElement('textarea');
            textarea.value = JSON.stringify(ctx.data, null, 4);
            textarea.addEventListener('change', () => {
                validateRaw(textarea, ctx.setCanClose);
            });
            textarea.addEventListener('input', () => {
                validateRaw(textarea, ctx.setCanClose);
            });
            ctx.dataDiv.appendChild(textarea);
            ctx.setCanClose(true);
        },
        save: (ctx) => {
            try {
                const raw = JSON.parse(ctx.dataDiv.querySelector('textarea')?.value);
                if (raw) {
                    // If I set this directly, it will not update the data elsewhere
                    Object.assign(ctx.data, raw);
                    Object.keys(ctx.data).forEach((key) => {
                        if (!raw.hasOwnProperty(key)) {
                            delete ctx.data[key];
                        }
                    });
                }
            } catch (e) {
                console.error(e);
                ctx.dataDiv.innerText = 'Error processing raw data: ' + e.message;
            }
        }
    }
];

function validateInputs(e) {
    const input = e.target;
    switch (input.type) {
        case 'number':
            const number = Number(input.value);
            if (input.value === '') {
                input.setCustomValidity('Please enter a valid number');
            } else if (isNaN(number)) {
                input.setCustomValidity('Please enter a valid number');
            } else {
                input.setCustomValidity('');
            }
            break;
    }
    input.reportValidity();
}

function validateRaw(area, setCanClose) {
    try {
        JSON.parse(area.value);
        area.setCustomValidity('');
        setCanClose(true);
    } catch (e) {
        area.setCustomValidity('Invalid JSON:\n' + e.message);
        setCanClose(false);
    }
    area.reportValidity();
}

function saveFormInput(value, type, path, data) {
    switch (type) {
        case 'number':
            const number = Number(value);
            if (isNaN(number)) {
                return;
            }
            set(data, path, Number(value));
            break;
        default:
            set(data, path, value);
            break;
    }
}

export {
    saveTabs,
}