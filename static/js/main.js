import { processFile, processJSON } from './balatro-save-loader.js';
import { profileTabs } from './profileUI.js';
import { guessFileType, handleKnownArrays } from './saveLogic.js';
import { saveTabs } from './saveUI.js';
import { settingsTabs } from './settingsUI.js';
import { renderTabs } from './tabs.js';
import { unknownTabs } from './unknownUI.js';

const file = document.getElementById('file');
const download = document.getElementById('download');
const dataDiv = document.getElementById('data');
const buttonDiv = document.getElementById('buttons');

let data = null;
let filename = 'save.jkr';
let saveEverything = null;

function setCanClose(canClose) {
    download.disabled = !canClose;
}

function initUI() {
    file?.addEventListener('change', readFile);

    download?.addEventListener('click', () => {
        if (!data) return;
        saveEverything?.()
        const buffer = processJSON(data);
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    });

    setCanClose(false);

    if (file?.files?.length) {
        readFile();
    }
}

function readFile() {
    const reader = new FileReader();
    reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
            try {
                window.debugData =
                    data = processFile(arrayBuffer);
                handleKnownArrays(data);
                filename = file?.files?.[0]?.name || filename;
                const type = guessFileType(data, filename);
                let tabs = unknownTabs;
                switch (type) {
                    case 'save':
                        tabs = saveTabs;
                        break;
                    case 'profile':
                        tabs = profileTabs;
                        break;
                    case 'settings':
                        tabs = settingsTabs;
                        break;
                }
                const tabData = renderTabs(tabs, { dataDiv, data, type }, buttonDiv, dataDiv);
                tabData.setCanClose = setCanClose;
                setCanClose(true);
                saveEverything = tabData.saveCurrent;
            } catch (e) {
                console.error(e);
                dataDiv.innerText = 'Error loading file: ' + e.message;
            }
        }
    };
    reader.readAsArrayBuffer(file?.files?.[0]);
}

initUI();