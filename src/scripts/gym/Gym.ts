///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>
///<reference path="../worldmap/WorldLocation.ts"/>
///<reference path="../worldmap/worldRequirements/BadgeRequirement.ts"/>

/**
 * Gym class.
 */
class Gym extends WorldLocation {
    requirements: WorldRequirement[];

    leaderName: GymLeaderName;
    pokemons: GymPokemon[];
    badgeReward: BadgeCase.Badge;
    moneyReward: number;
    defeatMessage: string;

    constructor(leaderName: GymLeaderName, pokemons: GymPokemon[], badgeReward: BadgeCase.Badge, moneyReward: number, requirements: WorldRequirement[], rewardMessage: string) {
        super();
        this.leaderName = leaderName;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.requirements = requirements;
        this.defeatMessage = rewardMessage;
    }
}

// const indigoPlateauJohto = ['Elite Will', 'Elite Koga', 'Elite Bruno2', 'Elite Karen', 'Champion Lance'];
// TownList['Indigo Plateau Johto'] = new PokemonLeague('Indigo Plateau Johto', [27], ShopName.None,  null, indigoPlateauJohto);
// (<PokemonLeague>TownList['Indigo Plateau Johto']).setupGymTowns();
//

// // Hoenn Gyms
// new Gym(
//     GymLeaderName.Roxanne,
//     [
//         new GymPokemon('Geodude', 100000, 14),
//         new GymPokemon('Nosepass', 100000, 15),
//     ],
//     BadgeCase.Badge.Stone,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Elite_JohtoChampion)],
//     'So… I lost… It seems that I still have much more to learn… I understand.'
// );
// new Gym(
//     GymLeaderName.Brawly,
//     [
//         new GymPokemon('Machop', 100000, 17),
//         new GymPokemon('Makuhita', 100000, 18),
//     ],
//     BadgeCase.Badge.Knuckle,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Stone)],
//     'Whoah, wow! You made a much bigger splash than I expected! You swamped me! Okay, you've got me. Take this Gym Badge!'
// );
// new Gym(
//     GymLeaderName.Wattson,
//     [
//         new GymPokemon('Magnemite', 100000, 22),
//         new GymPokemon('Voltorb', 100000, 20),
//         new GymPokemon('Magneton', 100000, 23),
//     ],
//     BadgeCase.Badge.Dynamo,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Knuckle)],
//     'Wahahahah! Fine, I lost! You ended up giving me a thrill! Take this Badge!'
// );
// new Gym(
//     GymLeaderName.Flannery,
//     [
//         new GymPokemon('Slugma', 100000, 26),
//         new GymPokemon('Slugma', 100000, 26),
//         new GymPokemon('Torkoal', 100000, 28),
//     ],
//     BadgeCase.Badge.Heat,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Dynamo)],
//     'Oh... I guess I was trying too hard... I... I've only recently become a Gym Leader. I tried too hard to be someone I'm not. I have to do things my natural way. If I don't, my Pokémon will be confused. Thanks for teaching me that. For that, you deserve this.'
// );
// new Gym(
//     GymLeaderName.Norman,
//     [
//         new GymPokemon('Slaking', 100000, 28),
//         new GymPokemon('Vigoroth', 100000, 30),
//         new GymPokemon('Slaking', 100000, 31),
//     ],
//     BadgeCase.Badge.Balance,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Heat)],
//     '… I… I can't… I can't believe it. I lost to you? But, rules are rules! Here, take this.'
// );
// new Gym(
//     GymLeaderName.Winona,
//     [
//         new GymPokemon('Swellow', 100000, 31),
//         new GymPokemon('Pelipper', 100000, 30),
//         new GymPokemon('Skarmory', 100000, 32),
//         new GymPokemon('Altaria', 100000, 33),
//     ],
//     BadgeCase.Badge.Feather,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Balance)],
//     'Never before have I seen a Trainer command Pokémon with more grace than I... In recognition of your prowess, I present to you this Gym Badge.'
// );
// new Gym(
//     GymLeaderName.Tate & Liza,
//     [
//         new GymPokemon('Lunatone', 100000, 42),
//         new GymPokemon('Solrock', 100000, 42),
//     ],
//     BadgeCase.Badge.Mind,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Feather)],
//     'What? Our combination... Was shattered! It can't be helped. You've won... So, in recognition, take this Gym Badge.'
// );
// new Gym(
//     GymLeaderName.Juan,
//     [
//         new GymPokemon('Luvdisc', 100000, 41),
//         new GymPokemon('Whiscash', 100000, 41),
//         new GymPokemon('Sealeo', 100000, 43),
//         new GymPokemon('Crawdaunt', 100000, 43),
//         new GymPokemon('Kingdra', 100000, 46),
//     ],
//     BadgeCase.Badge.Rain,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Mind)],
//     'I realize now your authenticity and magnificence as a Pokémon Trainer. I find much joy in having met you and your Pokémon. You have proven yourself worthy of the Rain Badge. Accept it. Having that Badge assures you full obedience of all your Pokémon to every command you make.'
// );
//
// // Hoenn Elite 4
// new Gym(
//     GymLeaderName.Sidney,
//     [
//         new GymPokemon('Mightyena', 100000, 46),
//         new GymPokemon('Cacturne', 100000, 46),
//         new GymPokemon('Shiftry', 100000, 48),
//         new GymPokemon('Sharpedo', 100000, 48),
//         new GymPokemon('Absol', 100000, 49),
//     ],
//     BadgeCase.Badge.Elite_Sidney,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Rain)],
//     'Well, how do you like that? I lost! Eh, it was fun, so it doesn't matter.'
// );
// new Gym(
//     GymLeaderName.Phoebe,
//     [
//         new GymPokemon('Dusclops', 100000, 48),
//         new GymPokemon('Banette', 100000, 49),
//         new GymPokemon('Banette', 100000, 49),
//         new GymPokemon('Sableye', 100000, 50),
//         new GymPokemon('Dusclops', 100000, 51),
//     ],
//     BadgeCase.Badge.Elite_Phoebe,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Elite_Sidney)],
//     'Oh, darn. I've gone and lost.'
// );
// new Gym(
//     GymLeaderName.Glacia,
//     [
//         new GymPokemon('Glalie', 100000, 50),
//         new GymPokemon('Sealeo', 100000, 50),
//         new GymPokemon('Glalie', 100000, 52),
//         new GymPokemon('Sealeo', 100000, 52),
//         new GymPokemon('Walrein', 100000, 53),
//     ],
//     BadgeCase.Badge.Elite_Glacia,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Elite_Phoebe)],
//     'You and your Pokémon... How hot your spirits burn! The all-consuming heat overwhelms. It's no surprise that my icy skills failed to harm you.'
// );
// new Gym(
//     GymLeaderName.Drake,
//     [
//         new GymPokemon('Shelgon', 100000, 52),
//         new GymPokemon('Altaria', 100000, 54),
//         new GymPokemon('Flygon', 100000, 53),
//         new GymPokemon('Flygon', 100000, 53),
//         new GymPokemon('Salamence', 100000, 55),
//     ],
//     BadgeCase.Badge.Elite_Drake,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Elite_Glacia)],
//     'You deserve every credit for coming this far as a Trainer of Pokémon. You do seem to know what is needed. Yes, what a Trainer needs is a virtuous heart. Pokémon touch the good hearts of Trainers and learn good from wrong. They touch the good hearts of Trainers and grow strong. Go! Go onwards! The Champion is waiting!'
// );
// new Gym(
//     GymLeaderName.Wallace,
//     [
//         new GymPokemon('Wailord', 100000, 57),
//         new GymPokemon('Tentacruel', 100000, 55),
//         new GymPokemon('Ludicolo', 100000, 56),
//         new GymPokemon('Whiscash', 100000, 56),
//         new GymPokemon('Gyarados', 100000, 56),
//         new GymPokemon('Milotic', 100000, 58),
//     ],
//     BadgeCase.Badge.Elite_HoennChampion,
//     10000,
//     [new BadgeRequirement(BadgeCase.Badge.Elite_Drake)],
//     'I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!'
// );


// const pokemonLeagueHoenn = ['Elite Sidney', 'Elite Phoebe', 'Elite Glacia', 'Elite Drake', 'Champion Wallace'];
// TownList['Pokemon League Hoenn'] = new PokemonLeague('Pokemon League Hoenn', [128], ShopName.None, 'Victory Road Hoenn', pokemonLeagueHoenn);
// (<PokemonLeague>TownList['Pokemon League Hoenn']).setupGymTowns();
