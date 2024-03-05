import { rankMap, suitMap } from "./urlGen.js";

const valueGetters = {
    j_stone: (joker) => joker.ability.stone_tally,
    j_acrobat: (joker, save) => Number(save.GAME.current_round.hands_left === 1),
    j_banner: (joker, save) => save.GAME.current_round.discards_left,
    j_mystic_summit: (joker, save) => Number(save.GAME.current_round.discards_left === 1),
    j_loyalty_card: (joker) => joker.ability.loyalty_remaining,
    j_steel_joker: (joker) => joker.ability.steel_tally,
    j_glass: (joker) => (joker.ability.x_mult - 1.0) / 0.5,
    j_abstract: (joker, save) => save.cardAreas.jokers.cards.length - 1,
    j_wee: (joker) => (joker.ability.extra.chips - 10) / 8,
    j_stencil: (joker) => joker.ability.x_mult,
    j_ceremonial: (joker) => joker.ability.mult,
    j_fortune_teller: (joker, save) => save.GAME.consumeable_usage_total?.tarot || 0,
    j_hit_the_road: (joker) => (joker.ability.x_mult - 1.0) / 0.5,
    j_ride_the_bus: (joker) => joker.ability.mult,
    j_drivers_license: (joker) => joker.ability.driver_tally,
    j_invisible: (joker) => joker.ability.invis_rounds,
    j_dusk: (joker, save) => Number(save.GAME.current_round.hands_left === 1),
    j_throwback: (joker) => (joker.ability.x_mult - 1.0) / 0.25,
    j_idol: (joker, save) => rankMap[save.GAME.current_round.idol_card.rank] * 4 + suitMap[save.GAME.current_round.idol_card.suit],
    j_satellite: (joker, save) => save.GAME.consumeable_usage_total?.planet || 0,
    j_caino: (joker) => joker.ability.caino_xmult - 1.0,
    j_yorick: (joker) => joker.ability.yorick_discards,
    j_bootstraps: (joker, save) => save.GAME.dollars / 5,
    j_runner: (joker) => (joker.ability.extra.chips - 20) / 10,
    j_ice_cream: (joker) => (100 - joker.ability.extra.chips) / 5,
    j_blue_joker: (joker, save) => save.cardAreas.deck.cards.length - 52,
    j_constellation: (joker) => (joker.ability.x_mult - 1.0) / 0.1,
    j_green_joker: (joker) => joker.ability.mult,
    j_red_card: (joker) => joker.ability.mult / 3,
    j_madness: (joker) => (joker.ability.x_mult - 1.0) / 0.5,
    j_square: (joker) => (joker.ability.extra.chips - 16) / 4,
    j_vampire: (joker) => (joker.ability.x_mult - 1.0) / 0.2,
    j_hologram: (joker) => (joker.ability.x_mult - 1.0) / 0.25,
    j_cloud_9: (joker) => joker.ability.nine_tally,
    j_rocket: (joker) => (joker.ability.extra.dollars - 1) / 2,
    j_obelisk: (joker) => (joker.ability.x_mult - 1.0) / 0.2,
    j_erosion: (joker, save) => save.GAME.starting_deck_size - save.cardAreas.deck.config.card_limit,
    j_mail: (joker, save) => rankMap[save.GAME.current_round.mail_card.rank],
    j_lucky_cat: (joker) => (joker.ability.x_mult - 1.0) / 0.2,
    j_bull: (joker, save) => save.GAME.dollars,
    j_flash: (joker) => joker.ability.mult / 2,
    j_popcorn: (joker) => (20 - joker.ability.mult) / 4,
    j_ramen: (joker) => (2.0 - joker.ability.x_mult) / 0.01,
    j_selzer: (joker) => joker.ability.extra,
    j_trousers: (joker) => joker.ability.mult / 2,
    j_campfire: (joker) => (joker.ability.x_mult - 1.0) / 0.5,
    j_ancient: (joker, save) => suitMap[save.GAME.current_round.ancient_card?.suit],
    j_castle: (joker) => joker.ability.extra.chips / 3, // This will probably be changed in the future. For future reference "G.GAME.current_round.castle_card.suit"
}

function getJokerValue(joker, save) {
    if (valueGetters[joker.save_fields.center]?.toString() === "(joker) => 0") {
        console.warn('Unimplemented joker center:', joker.save_fields.center);
    }
    return Math.round(valueGetters[joker.save_fields.center]?.(joker, save) ?? 0);
}

export {
    getJokerValue,
}