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

json.GAME.dollars = 9999;
json.cardAreas.jokers.config.card_limit = 100;
json.cardAreas.consumeables.config.card_limit = 100;
json.cardAreas.hand.config.card_limit = 20;
json.GAME.round_resets.discards = 999;
json.GAME.round_resets.hands = 999;
json.GAME.round_resets.reroll_cost = 0;

if (json.cardAreas.shop_vouchers) {
  json.cardAreas.shop_vouchers.config.card_limit = 3;
  json.cardAreas.shop_booster.config.card_limit = 3;
  json.cardAreas.shop_jokers.config.card_limit = 4;
}
if (!json.cardAreas.jokers.cards[0]) // Note that if this is empty, it is an object not an array
  json.cardAreas.jokers.cards = [{
    "ability": {
      "bonus": 0,
      "d_size": 0,
      "effect": "Hand Size",
      "extra_value": 0,
      "h_dollars": 0,
      "h_mult": 0,
      "h_size": 1,
      "h_x_mult": 0,
      "hands_played_at_create": 6,
      "mult": 0,
      "name": "God Juggler",
      "order": 87,
      "p_dollars": 0,
      "perma_bonus": 0,
      "set": "Joker",
      "t_chips": 0,
      "t_mult": 0,
      "type": "",
      "x_mult": 1
    },
    "added_to_deck": true,
    "base": {
      "face_nominal": 0,
      "nominal": 0,
      "suit_nominal": 0,
      "times_played": 0
    },
    "base_cost": 4,
    "bypass_discovery_center": true,
    "bypass_discovery_ui": true,
    "bypass_lock": true,
    "cost": 4,
    "debuff": false,
    "edition": {
      "chips": 420,
      "mult": 69,
      "negative": true,
      "x_mult": 69420
    },
    "extra_cost": 0,
    "facing": "front",
    "label": "God Juggler",
    "params": {
      "bypass_back": {
        "x": 4,
        "y": 2
      },
      "bypass_discovery_center": true,
      "bypass_discovery_ui": true,
      "discover": false
    },
    "rank": 1,
    "save_fields": {
      "center": "j_juggler"
    },
    "sell_cost": 9999,
    "sort_id": 164,
    "sprite_facing": "front"
  }];

const newBuffer = processJSON(json);

fs.writeFileSync(path, newBuffer);