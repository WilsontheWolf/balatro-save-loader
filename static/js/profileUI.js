import { makeValuesTab, rawTab } from "./sharedTabs.js";

const values = [
    {
        name: 'All Jokers Unlocked (Disables Achievements)',
        path: 'all_unlocked',
        type: 'checkbox',
        default: false,
    },
    {
        name: 'Profile Name',
        path: 'name',
        type: 'text',
    },

    {
        name: 'High Scores',
        type: 'label',
    },
    {
        name: 'Highest Round',
        path: 'high_scores.furthest_round.amt',
        type: 'number'
    },
    {
        name: 'Best Hand',
        path: 'high_scores.hand.amt',
        type: 'number'
    },
    {
        name: 'Best Win Streak',
        path: 'high_scores.win_streak.amt',
        type: 'number'
    },
    {
        name: 'Current Win Streak',
        path: 'high_scores.current_streak.amt',
        type: 'number'
    },
    {
        name: 'Collection',
        path: 'high_scores.collection.amt',
        type: 'number'
    },
    {
        name: 'Highest Ante',
        path: 'high_scores.furthest_ante.amt',
        type: 'number'
    },
    {
        name: 'Most Money',
        path: 'high_scores.most_money.amt',
        type: 'number'
    },
    // {
    //     name: 'Most Played Hand',
    //     path: 'high_scores.poker_hand.amt',
    //     type: 'number'
    // }, // IDK how this is validated rn
    {
        name: 'Most Bosses in a Row',
        path: 'high_scores.boss_streak.amt',
        type: 'number'
    },

    {
        name: 'Stats',
        type: 'label',
    },
    {
        name: 'Cards Discarded',
        path: 'career_stats.c_cards_discarded',
        type: 'number'
    },
    {
        name: 'Round Interest Cap Streak',
        path: 'career_stats.c_round_interest_cap_streak',
        type: 'number'
    },
    {
        name: 'Dollars Earned',
        path: 'career_stats.c_dollars_earned',
        type: 'number'
    },
    {
        name: 'Vouchers Bought',
        path: 'career_stats.c_vouchers_bought',
        type: 'number'
    },
    {
        name: 'Planetarium Used',
        path: 'career_stats.c_planetarium_used',
        type: 'number'
    },
    {
        name: 'Wins',
        path: 'career_stats.c_wins',
        type: 'number'
    },
    {
        name: 'Shop Rerolls',
        path: 'career_stats.c_shop_rerolls',
        type: 'number'
    },
    {
        name: 'Cards Played',
        path: 'career_stats.c_cards_played',
        type: 'number'
    },
    {
        name: 'Tarots Bought',
        path: 'career_stats.c_tarots_bought',
        type: 'number'
    },
    {
        name: 'Losses',
        path: 'career_stats.c_losses',
        type: 'number'
    },
    {
        name: 'Shop Dollars Spent',
        path: 'career_stats.c_shop_dollars_spent',
        type: 'number'
    },
    {
        name: 'Face Cards Played',
        path: 'career_stats.c_face_cards_played',
        type: 'number'
    },
    {
        name: 'Planets Bought',
        path: 'career_stats.c_planets_bought',
        type: 'number'
    },
    {
        name: 'Hands Played',
        path: 'career_stats.c_hands_played',
        type: 'number'
    },
    {
        name: 'Tarot Reading Used',
        path: 'career_stats.c_tarot_reading_used',
        type: 'number'
    },
    {
        name: 'Rounds',
        path: 'career_stats.c_rounds',
        type: 'number'
    },
    {
        name: 'Jokers Sold',
        path: 'career_stats.c_jokers_sold',
        type: 'number'
    },
    {
        name: 'Single Hand Round Streak',
        path: 'career_stats.c_single_hand_round_streak',
        type: 'number'
    },
    {
        name: 'Playing Cards Bought',
        path: 'career_stats.c_playing_cards_bought',
        type: 'number'
    },
    {
        name: 'Cards Sold',
        path: 'career_stats.c_cards_sold',
        type: 'number'
    }
];

const profileTabs = [
    makeValuesTab(values),
    rawTab,
];

export {
    profileTabs,
}