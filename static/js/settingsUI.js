import { makeValuesTab, rawTab } from "./sharedTabs.js";

const values = [
    {
        name: 'Loaded Profile',
        path: 'profile',
        type: 'number',
    },
    {
        name: 'Send Crash Reports',
        path: 'crashreports',
        type: 'checkbox',
    },
    {
        name: 'Tutorial Completed',
        path: 'tutorial_complete',
        type: 'checkbox',
    },
    {
        name: 'Game Speed', 
        path: 'GAMESPEED',
        type: 'number',
    },
    {
        name: 'Language',
        path: 'language',
        type: 'text',
    },
];

const settingsTabs = [
    makeValuesTab(values),
    rawTab,
];

export {
    settingsTabs,
}