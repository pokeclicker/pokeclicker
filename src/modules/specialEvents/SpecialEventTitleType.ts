/*
Generated with the following code snippet:

copy(`export type QuestLineNameType
    = ${App.game.quests.questLines().map(ql => `'${ql.name.replace(/([\'])/g, '\\$1')}'`).join('\n    | ')};`);

Replace everything in this file (except for this comment) with what was copied.
*/

export type SpecialEventTitleType
    = 'Lunar New Year'
    | 'Hoopa Day'
    | 'Easter'
    | 'Golden Week'
    | 'Flying Pikachu'
    | 'Mewtwo strikes back!'
    | 'Halloween!'
    | 'Let\'s GO!'
    | 'Merry Christmas!';