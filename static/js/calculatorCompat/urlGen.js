// This was modified from https://github.com/EFHIII/balatro-calculator/blob/main/hand-url.js
// Licensed Under the MIT License
// https://github.com/EFHIII/balatro-calculator/blob/main/LICENSE

import { getJokerValue } from "./jokerLogic.js";

/*
hand binary format:

joker:
number of jokers - 16 bits
type[0] - 4 bits
type[1] - 4 bits
edition? - 1 bit
edition - 2 bits
non-zero value? - 1 bit
value - 16 bits

cards:
number of cards - 16 bits
number of cards in hand - 3 bits
suit - 2 bits
value - 4 bits
edition? - 1 bit
edition - 2 bits
modifier - 4 bits

hands:
non-zero hand? 1 bits
value - 16 bits

the flint - 1 bit
plasmaDeck - 1 bit
observatory? - 1 bit
planet cards:
non-zero - 1 bit
value - 16 bits

*/
const idMap = {
    j_joker: { x: 0, y: 0 },
    j_greedy_joker: { x: 6, y: 1 },
    j_lusty_joker: { x: 7, y: 1 },
    j_wrathful_joker: { x: 8, y: 1 },
    j_gluttenous_joker: { x: 9, y: 1 },
    j_jolly: { x: 2, y: 0 },
    j_zany: { x: 3, y: 0 },
    j_mad: { x: 4, y: 0 },
    j_crazy: { x: 5, y: 0 },
    j_droll: { x: 6, y: 0 },
    j_sly: { x: 0, y: 14 },
    j_wily: { x: 1, y: 14 },
    j_clever: { x: 2, y: 14 },
    j_devious: { x: 3, y: 14 },
    j_crafty: { x: 4, y: 14 },

    j_half: { x: 7, y: 0 },
    j_stencil: { x: 2, y: 5 },
    j_four_fingers: { x: 6, y: 6 },
    j_mime: { x: 4, y: 1 },
    j_credit_card: { x: 5, y: 1 },
    j_ceremonial: { x: 5, y: 5 },
    j_banner: { x: 1, y: 2 },
    j_mystic_summit: { x: 2, y: 2 },
    j_marble: { x: 3, y: 2 },
    j_loyalty_card: { x: 4, y: 2 },
    j_8_ball: { x: 0, y: 5 },
    j_misprint: { x: 6, y: 2 },
    j_dusk: { x: 4, y: 7 },
    j_raised_fist: { x: 8, y: 2 },
    j_chaos: { x: 1, y: 0 },

    j_fibonacci: { x: 1, y: 5 },
    j_steel_joker: { x: 7, y: 2 },
    j_scary_face: { x: 2, y: 3 },
    j_abstract: { x: 3, y: 3 },
    j_delayed_grat: { x: 4, y: 3 },
    j_hack: { x: 5, y: 2 },
    j_pareidolia: { x: 6, y: 3 },
    j_gros_michel: { x: 7, y: 6 },
    j_even_steven: { x: 8, y: 3 },
    j_odd_todd: { x: 9, y: 3 },
    j_scholar: { x: 0, y: 4 },
    j_business: { x: 1, y: 4 },
    j_supernova: { x: 2, y: 4 },
    j_ride_the_bus: { x: 1, y: 6 },
    j_space: { x: 3, y: 5 },

    j_egg: { x: 0, y: 10 },
    j_burglar: { x: 1, y: 10 },
    j_blackboard: { x: 2, y: 10 },
    j_runner: { x: 3, y: 10 },
    j_ice_cream: { x: 4, y: 10 },
    j_dna: { x: 5, y: 10 },
    j_splash: { x: 6, y: 10 },
    j_blue_joker: { x: 7, y: 10 },
    j_sixth_sense: { x: 8, y: 10 },
    j_constellation: { x: 9, y: 10 },
    j_hiker: { x: 0, y: 11 },
    j_faceless: { x: 1, y: 11 },
    j_green_joker: { x: 2, y: 11 },
    j_superposition: { x: 3, y: 11 },
    j_todo_list: { x: 4, y: 11 },

    j_cavendish: { x: 5, y: 11 },
    j_card_sharp: { x: 6, y: 11 },
    j_red_card: { x: 7, y: 11 },
    j_madness: { x: 8, y: 11 },
    j_square: { x: 9, y: 11 },
    j_seance: { x: 0, y: 12 },
    j_riff_raff: { x: 1, y: 12 },
    j_vampire: { x: 2, y: 12 },
    j_shortcut: { x: 3, y: 12 },
    j_hologram: { x: 4, y: 12 },
    j_vagabond: { x: 5, y: 12 },
    j_baron: { x: 6, y: 12 },
    j_cloud_9: { x: 7, y: 12 },
    j_rocket: { x: 8, y: 12 },
    j_obelisk: { x: 9, y: 12 },

    j_midas_mask: { x: 0, y: 13 },
    j_luchador: { x: 1, y: 13 },
    j_photograph: { x: 2, y: 13 },
    j_gift: { x: 3, y: 13 },
    j_turtle_bean: { x: 4, y: 13 },
    j_erosion: { x: 5, y: 13 },
    j_reserved_parking: { x: 6, y: 13 },
    j_mail: { x: 7, y: 13 },
    j_to_the_moon: { x: 8, y: 13 },
    j_hallucination: { x: 9, y: 13 },
    j_fortune_teller: { x: 7, y: 5 },
    j_juggler: { x: 0, y: 1 },
    j_drunkard: { x: 1, y: 1 },
    j_stone: { x: 9, y: 0 },
    j_golden: { x: 9, y: 2 },

    j_lucky_cat: { x: 5, y: 14 },
    j_baseball: { x: 6, y: 14 },
    j_bull: { x: 7, y: 14 },
    j_diet_cola: { x: 8, y: 14 },
    j_trading: { x: 9, y: 14 },
    j_flash: { x: 0, y: 15 },
    j_popcorn: { x: 1, y: 15 },
    j_trousers: { x: 4, y: 15 },
    j_ancient: { x: 7, y: 15 },
    j_ramen: { x: 2, y: 15 },
    j_walkie_talkie: { x: 8, y: 15 },
    j_selzer: { x: 3, y: 15 },
    j_castle: { x: 9, y: 15 },
    j_smiley: { x: 6, y: 15 },
    j_campfire: { x: 5, y: 15 },

    j_ticket: { x: 5, y: 3 },
    j_mr_bones: { x: 3, y: 4 },
    j_acrobat: { x: 2, y: 1 },
    j_sock_and_buskin: { x: 3, y: 1 },
    j_swashbuckler: { x: 9, y: 5 },
    j_troubadour: { x: 0, y: 2 },
    j_certificate: { x: 8, y: 8 },
    j_smeared: { x: 4, y: 6 },
    j_throwback: { x: 5, y: 7 },
    j_hanging_chad: { x: 9, y: 6 },
    j_rough_gem: { x: 9, y: 7 },
    j_bloodstone: { x: 0, y: 8 },
    j_arrowhead: { x: 1, y: 8 },
    j_onyx_agate: { x: 2, y: 8 },
    j_glass: { x: 1, y: 3 },

    j_ring_master: { x: 6, y: 5 },
    j_flower_pot: { x: 0, y: 6 },
    j_blueprint: { x: 0, y: 3 },
    j_wee: { x: 0, y: 4 },
    j_merry_andy: { x: 8, y: 0 },
    j_oops: { x: 5, y: 6 },
    j_idol: { x: 6, y: 7 },
    j_seeing_double: { x: 4, y: 4 },
    j_matador: { x: 4, y: 5 },
    j_hit_the_road: { x: 8, y: 5 },
    j_duo: { x: 5, y: 4 },
    j_trio: { x: 6, y: 4 },
    j_family: { x: 7, y: 4 },
    j_order: { x: 8, y: 4 },
    j_tribe: { x: 9, y: 4 },

    j_stuntman: { x: 8, y: 6 },
    j_invisible: { x: 1, y: 7 },
    j_brainstorm: { x: 7, y: 7 },
    j_satellite: { x: 8, y: 7 },
    j_shoot_the_moon: { x: 2, y: 6 },
    j_drivers_license: { x: 0, y: 7 },
    j_cartomancer: { x: 7, y: 3 },
    j_astronomer: { x: 2, y: 7 },
    j_burnt: { x: 3, y: 7 },
    j_bootstraps: { x: 9, y: 8 },
    j_caino: { x: 3, y: 8 },
    j_triboulet: { x: 4, y: 9 },
    j_yorick: { x: 5, y: 8 },
    j_chicot: { x: 6, y: 8 },
    j_perkeo: { x: 7, y: 8 },
};

const rankMap = {
    '2': 0,
    '3': 1,
    '4': 2,
    '5': 3,
    '6': 4,
    '7': 5,
    '8': 6,
    '9': 7,
    '10': 8,
    Jack: 9,
    Queen: 10,
    King: 11,
    Ace: 12,
};

const suitMap = {
    Hearts: 0,
    Clubs: 1,
    Diamonds: 2,
    Spades: 3,
};

function editionBinary(modifiers) {
    if (modifiers.foil || modifiers.holographic || modifiers.polychrome || modifiers.disabled) {
        // edition - 2 bits
        if (modifiers.foil) {
            return [1, 0, 0];
        }
        else if (modifiers.holographic) {
            return [1, 1, 0];
        }
        else if (modifiers.polychrome) {
            return [1, 0, 1];
        }
        else {
            return [1, 1, 1];
        }
    }
    else {
        return [0];
    }
}

function modifiersBinary(modifiers) {
    let double = modifiers.double ? 1 : 0;

    if (modifiers.chance) {
        return [1, 0, 0, double];
    }
    else if (modifiers.glass) {
        return [0, 1, 0, double];
    }
    else if (modifiers.increment) {
        return [1, 1, 0, double];
    }
    else if (modifiers.mult) {
        return [0, 0, 1, double];
    }
    else if (modifiers.steel) {
        return [1, 0, 1, double];
    }
    else if (modifiers.stone) {
        return [0, 1, 1, double];
    }
    else if (modifiers.wild) {
        return [1, 1, 1, double];
    }
    else {
        return [0, 0, 0, double];
    }
}

function intToBinary(num, bits) {
    let value = [];
    for (let i = 0; i < bits; i++) {
        value.push(num & (1 << i) ? 1 : 0);
    }
    return value;
}

function signed16(num) {
    return [num < 0 ? 1 : 0, ...intToBinary(Math.abs(num), 15)];
}

function bitsToBase64(bitsArray) {
    // Convert bits array to binary string
    const binaryString = bitsArray.join('');

    // Pad the binary string to make its length a multiple of 8
    const paddedBinaryString = binaryString.padEnd(Math.ceil(binaryString.length / 8) * 8, '0');

    // Convert binary string to bytes
    const bytes = [];
    for (let i = 0; i < paddedBinaryString.length; i += 8) {
        bytes.push(parseInt(paddedBinaryString.substr(i, 8), 2));
    }

    // Convert bytes to base64 string
    const base64String = btoa(String.fromCharCode.apply(null, bytes));

    return base64String.replace(/=/g, '');
}

function compileHand(data) {
    let binary = [];

    const jokers = data.cardAreas.jokers.cards;
    // number of jokers - 16 bits
    binary.push(...intToBinary(jokers.length, 16));

    for (let i = 0; i < jokers.length; i++) {
        let joker = jokers[i];

        const type = idMap[joker.save_fields.center];
        if (!type) throw new Error(`Could not resolve joker type for ${joker.save_fields.center}! (i = ${i})`);
        // type[0] - 4 bits
        binary.push(...intToBinary(type.y, 4));
        // type[1] - 4 bits
        binary.push(...intToBinary(type.x, 4));

        const modifiers = {
            disabled: !!joker.debuff,
            foil: !!joker.edition?.foil,
            holographic: !!joker.edition?.holo,
            polychrome: !!joker.edition?.polychrome,
        };

        // edition? - 1 bit
        // edition - 2 bits
        binary.push(...editionBinary(modifiers));

        const jokerValue = getJokerValue(joker, data);
        // non-zero value? - 1 bit
        if (jokerValue === 0) {
            binary.push(0);
        }
        else {
            binary.push(1);
            // value - 16 bits
            binary.push(...signed16(jokerValue));
        }

        // non-expected sell value? - 1 bit
        binary.push(1); // We always include the sell value
        // value - 16 bits
        binary.push(...intToBinary(joker.sell_cost, 16));
    }



    const playingCards = data.cardAreas.hand.cards;
    // number of cards - 16 bits
    binary.push(...intToBinary(playingCards.length, 16));
    // number of cards in hand - 3 bits
    binary.push(...intToBinary(0, 3)); // We do not know what cards the user will select

    for (let card of playingCards) {
        // suit - 2 bits
        binary.push(...intToBinary(suitMap[card.base.suit], 2));
        // value - 4 bits
        binary.push(...intToBinary(rankMap[card.base.value], 4));
        const modifiers = {
            disabled: !!card.debuff,
            foil: !!card.edition?.foil,
            holographic: !!card.edition?.holo,
            polychrome: !!card.edition?.polychrome,
            stone: card.ability.effect === 'Stone Card',
            mult: card.ability.effect === 'Mult Card',
            increment: card.ability.effect === 'Bonus Card',
            wild: card.ability.effect === 'Wild Card',
            chance: card.ability.effect === 'Lucky Card',
            glass: card.ability.effect === 'Glass Card',
            steel: card.ability.effect === 'Steel Card',
            double: card.seal === 'Red',
        };

        // edition? - 1 bit
        // edition - 2 bits
        binary.push(...editionBinary(modifiers));

        // modifier - 4 bits
        binary.push(...modifiersBinary(modifiers));
    }

    const theFlint = data.BLIND?.config_blind === 'bl_flint';
    const plasmaDeck = data.BACK.key === 'b_plasma';
    binary.push(theFlint ? 1 : 0);
    binary.push(plasmaDeck ? 1 : 0);

    const hands = Object.values(data.GAME.hands).sort((a, b) => a.order - b.order);
    for (let i = 0; i < hands.length; i++) {
        if (hands[i].level === 1) {
            binary.push(0);
        }
        else {
            binary.push(1);
            binary.push(...intToBinary(hands[i].level, 16));
        }
    }

    const observatory = data.GAME.used_vouchers?.v_observatory;
    binary.push(observatory ? 1 : 0);

    if (observatory) {
        const observatoryHands = hands.map(() => 0);
        data.cardAreas.consumeables.cards.forEach(card => {
            if (card.ability.effect !== 'Hand Upgrade') return;
            let index = data.GAME.hands[card.ability.consumeable.hand_type]?.order;
            if (!index) return;
            observatoryHands[index - 1] += 1;
        });

        for (let i = 0; i < observatoryHands.length; i++) {
            if (observatoryHands[i] > 0) {
                binary.push(1);
                binary.push(...intToBinary(observatoryHands[i], 16));
            }
            else {
                binary.push(0);
            }
        }
    }

    /*
    include hand counts? - 1 bit
    for each hand type:
        played this round? - 1 bit
        is non-zero? - 1 bit
        count if non-zero - 16 bit unsigned int
    */
    // hand counts (for supernova/obelisk/card sharp) - 1 bit
    binary.push(1);

    for (let i = 0; i < hands.length; i++) {
        // played this round? - 1 bit
        binary.push(hands[i].played_this_round ? 1 : 0);

        // is non-zero? - 1 bit
        binary.push(hands[i].played ? 1 : 0);
        if (hands[i].played) {
            // count if non-zero - 16 bit unsigned int
            binary.push(...intToBinary(hands[i].played, 16));
        }
    }

    while (binary.length > 0 && binary[binary.length - 1] === 0) {
        binary.pop();
    }

    const url = new URL('https://efhiii.github.io/balatro-calculator/');
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("h", toUrlSafe(bitsToBase64(binary)));
    url.search = queryParams.toString();
    return url.href;
}

function toUrlSafe(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_');
}

export {
    compileHand,
    rankMap,
    suitMap,
};