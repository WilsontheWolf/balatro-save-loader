import { calculatorTab } from "./calculatorCompat/calculatorExport.js";
import { makeValuesTab, rawTab } from "./sharedTabs.js";

const values = [
    {
        name: 'Round',
        path: 'GAME.round',
        type: 'number',
    },
    {
        name: 'Ante',
        path: 'GAME.round_resets.ante',
        type: 'number',
    },
    {
        name: 'Win Ante',
        path: 'GAME.win_ante',
        type: 'number',
    },
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
    },
    {
        name: 'Bankrupt At',
        path: 'GAME.bankrupt_at',
        type: 'number',
    }
];

const saveTabs = [
    makeValuesTab(values),
    calculatorTab,
    rawTab,
];

export {
    saveTabs,
}