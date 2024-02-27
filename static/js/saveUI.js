import { makeValuesTab, rawTab } from "./sharedTabs.js";

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
    },
    {
        name: 'Bankrupt At',
        path: 'GAME.bankrupt_at',
        type: 'number',
    }
];

const saveTabs = [
    makeValuesTab(values),
    rawTab,
];

export {
    saveTabs,
}