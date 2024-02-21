import fs from 'fs';
import { decompress, processFile, processJSON } from '../src/helpers/loading.js';

const path = process.argv[2];
if (!path) {
    console.log('Usage: node godemode.js <path to save file>');
    process.exit(1);
}

const file = fs.readFileSync(path);
const arrayBuffer = new Uint8Array(file).buffer;

const json = processFile(arrayBuffer);

console.log(decompress(arrayBuffer));
console.log(json);