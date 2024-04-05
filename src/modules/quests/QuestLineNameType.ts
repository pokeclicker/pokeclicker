/*
Generated with the following code snippet:

copy(`export type QuestLineNameType
    = ${App.game.quests.questLines().map(ql => `'${ql.name.replace(/([\'])/g, '\\$1')}'`).join('\n    | ')};`);

Replace everything in this file (except for this comment) with what was copied.
*/

export type QuestLineNameType
    = 'Tutorial Quests'
    | 'Team Rocket'
    | 'Bill\'s Grandpa Treasure Hunt'
    | 'Mining Expedition'
    | 'Bill\'s Errand'
    | 'Persons of Interest'
    | 'The Sick Ampharos'
    | 'Team Rocket Again'
    | 'The Legendary Beasts'
    | 'Eusine\'s Chase'
    | 'Whirl Guardian'
    | 'Rainbow Guardian'
    | 'Unfinished Business'
    | 'Land vs. Water'
    | 'The Weather Trio'
    | 'Mystery of Deoxys'
    | 'The Eon Duo'
    | 'Celio\'s Errand'
    | 'Team Rocket\'s Pinkan Theme Park'
    | 'The Three Golems'
    | 'Wish Maker'
    | 'A Meta Discovery'
    | 'Shadows in the Desert'
    | 'A New World'
    | 'Recover the Precious Egg!'
    | 'Zero\'s Ambition'
    | 'Hollow Truth and Ideals'
    | 'The Legend Awakened'
    | 'Gale of Darkness'
    | 'The Delta Episode'
    | 'Primal Reversion'
    | 'Detective Pikachu'
    | 'The Great Vivillon Hunt!'
    | 'A Beautiful World'
    | 'Princess Diancie'
    | 'Clash of Ages'
    | 'An Unrivaled Power'
    | 'Eater of Light'
    | 'Mina\'s Trial'
    | 'Typing some Memories'
    | 'Ultra Beast Hunt'
    | 'Magikarp Jump'
    | 'The Darkest Day'
    | 'Sword and Shield'
    | 'The Dojo\'s Armor'
    | 'Secrets of the Jungle'
    | 'The Crown of Galar'
    | 'The Birds of the Dyna Tree'
    | 'The Ancient Golems'
    | 'The Lair of Giants'
    | 'A Mystery Gift'
    | 'Incarnate Forces of Hisui'
    | 'Arceus: The Deified Pokémon'
    | 'Path of Legends'
    | 'Victory Road'
    | 'Starfall Street'
    | 'The Way Home'
    | 'Egg Hunt'
    | 'How blu mouse?'
    | 'Dr. Splash\'s Research Project'
    | 'Let\'s Go, Meltan!'
    | 'Defeat Rainbow Rocket';
