/// <reference path="../trainers/Trainer.ts"/>
/// <reference path="../gym/GymPokemon.ts"/>
/// <reference path="../../declarations/enums/ContestRank.d.ts"/>

class ContestTrainer extends Trainer {

    constructor(
        name: string,
        trainerClass: string,
        team: GymPokemon[],
        subTrainerClass?: string,
        public options?: EnemyOptions) {
        super(trainerClass, team, name, subTrainerClass);
    }

}

// TODO: correct trainer sprites, add nicknames, combine same trainers with reqs on different mons
const ContestOpponents: Record<ContestRank, ContestTrainer[]> = {
    [ContestRank.Practice]: [],
    [ContestRank.Normal]: [
        new ContestTrainer('Agatha', 'Aroma Lady', [new GymPokemon('Bulbasaur', 8, 10)]), // Bulby
        new ContestTrainer('Alec', 'Camper', [new GymPokemon('Slakoth', 13, 10)], '(male)'), // Slokth
        new ContestTrainer('Beau', 'Hex Maniac', [new GymPokemon('Butterfree', 8, 10)]), // Futterbe
        new ContestTrainer('Caitlin', 'Tuber', [new GymPokemon('Poliwag', 10, 10)]), // Wagil
        new ContestTrainer('Cale', 'Hiker', [new GymPokemon('Diglett', 10, 10)]), // Digle
        new ContestTrainer('Chance', 'Rich Boy', [
            new GymPokemon('Electrike', 10, 10, new GymBadgeRequirement(BadgeEnums.Dynamo, GameConstants.AchievementOption.less)),
            new GymPokemon('Manectric', 10, 10, new GymBadgeRequirement(BadgeEnums.Dynamo)),
        ]), // Rikelec
        new ContestTrainer('Colby', 'Ninja Boy', [new GymPokemon('Totodile', 12, 10)]), // Totdil
        new ContestTrainer('Edith', 'Yellow Dress Girl', [new GymPokemon('Zigzagoon', 4, 10)]), // Zigoon
        new ContestTrainer('Edith', 'Yellow Dress Girl', [new GymPokemon('Illumise', 4, 10)]), // Musille
        new ContestTrainer('Evan', 'Ninja Boy', [new GymPokemon('Dustox', 5, 10)]), // Duster
        new ContestTrainer('Grant', 'Youngster', [new GymPokemon('Shroomish', 3, 10)]), // Smish
        new ContestTrainer('Jimmy', 'Green Shoes Boy', [new GymPokemon('Poochyena', 6, 10)]), // Poochy
        new ContestTrainer('Kay', 'Cooltrainer', [new GymPokemon('Pidgeotto', 8, 10)], '(female)'), // Pideot
        new ContestTrainer('Kelsey', 'Flowers Girl', [new GymPokemon('Seedot', 8, 10)]), // Dots
        new ContestTrainer('Kylie', 'Beauty', [new GymPokemon('Ledyba', 10, 10)]), // Baledy
        new ContestTrainer('Liam', 'Guitarist', [new GymPokemon('Delibird', 14, 10)], '(male)'), // Birdly
        new ContestTrainer('Madison', 'Pokéfan', [new GymPokemon('Taillow', 4, 10)], '(female)'), // Tatay
        new ContestTrainer('Mariah', 'Kiri', [new GymPokemon('Aron', 11, 10)]), // Ronar
        new ContestTrainer('Melanie', 'Twins', [new GymPokemon('Gulpin', 4, 10)]), // Gulin
        new ContestTrainer('Milo', 'PokéManiac', [new GymPokemon('Larvitar', 5, 10)]), // Tarvitar
        new ContestTrainer('Morris', 'School Kid', [new GymPokemon('Makuhita', 10, 10)], '(male'), // Mahita
        new ContestTrainer('Paige', 'Young Couple', [new GymPokemon('Wingull', 6, 10)]),// '(female)'), // Gulwee
        new ContestTrainer('Paige', 'Young Couple', [new GymPokemon('Spheal', 6, 10)]),// '(female)'), // Sleal
        new ContestTrainer('Raymond', 'Black Belt', [new GymPokemon('Nincada', 6, 10)]), // Ninda
        new ContestTrainer('Russell', 'Cooltrainer', [new GymPokemon('Zubat', 7, 10)], '(male)'), // Zutzu
        new ContestTrainer('Russell', 'Cooltrainer', [new GymPokemon('Crobat', 7, 10)], '(male)'), // Batro
        new ContestTrainer('Sydney', 'Lass', [new GymPokemon('Whismur', 8, 10)]), // Whiris
        new ContestTrainer('Daniel', 'Juggler', [new GymPokemon('Red Spearow', 10, 10)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
    ],
    [ContestRank.Super]: [
        new ContestTrainer('Aliyah', 'Teala', [new GymPokemon('Blissey', 8, 20)]), // Bliss
        new ContestTrainer('Ariana', 'Kiri', [new GymPokemon('Kecleon', 8, 20)]), // Kecon
        new ContestTrainer('Ashton', 'Cooltrainer', [new GymPokemon('Goldeen', 8, 20)], '(male)'), // Golden
        new ContestTrainer('Audrey', 'Lass', [new GymPokemon('Swablu', 4, 20)]), // Swaby
        new ContestTrainer('Avery', 'School Kid', [new GymPokemon('Linoone', 5, 20)], '(male)'), // Noone
        new ContestTrainer('Avery', 'School Kid', [new GymPokemon('Spoink', 5, 20)], '(male)'), // Poinker
        new ContestTrainer('Bobby', 'Triathlete', [
            new GymPokemon('Doduo', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance, GameConstants.AchievementOption.less)),
            new GymPokemon('Dodrio', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance)),
        ], 'Runner (male)'), // Duodo
        new ContestTrainer('Cassidy', 'Pokéfan', [
            new GymPokemon('Sandshrew', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance, GameConstants.AchievementOption.less)),
            new GymPokemon('Sandslash', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance)),
        ], '(female)'), // Shrand
        new ContestTrainer('Claire', 'Yellow Dress Girl', [new GymPokemon('Trapinch', 4, 20)]), // Pinchin
        new ContestTrainer('Devin', 'Gentleman', [new GymPokemon('Snubbull', 2, 20)]), // Snubbins
        new ContestTrainer('Diego', 'Old Man', [new GymPokemon('Hitmonchan', 6, 20)]), // Hitemon
        new ContestTrainer('Jada', 'Lady', [new GymPokemon('Seel', 4, 20)]), // Seeley
        new ContestTrainer('Karina', 'Picnicker', [new GymPokemon('Roselia', 3, 20)]), // Relia
        new ContestTrainer('Katrina', 'Kiri', [new GymPokemon('Lotad', 4, 20)]), // Tado
        new ContestTrainer('Luke', 'Collector', [new GymPokemon('Slowbro', 3, 20)]), // Browlo
        new ContestTrainer('Miles', 'Camper', [new GymPokemon('Spinda', 2, 20)]), // Spinin
        new ContestTrainer('Morgan', 'Black Belt', [new GymPokemon('Baltoy', 6, 20)]), // Toybal
        new ContestTrainer('Natalia', 'Pokéfan', [new GymPokemon('Elekid', 4, 20)], '(female)'), // Kidlek
        new ContestTrainer('Raul', 'Guitarist', [new GymPokemon('Farfetch\'d', 2, 20)], '(male)'), // Fetchin
        new ContestTrainer('Sandra', 'Twins', [new GymPokemon('Barboach', 6, 20)]), // Boboach
        new ContestTrainer('Summer', 'Young Couple', [new GymPokemon('Medicham', 5, 20)]),// '(female)'), // Chamcham
        new ContestTrainer('Summer', 'Young Couple', [new GymPokemon('Numel', 5, 20)]),// '(female)'), // Lenum
        new ContestTrainer('Tylor', 'Hex Maniac', [new GymPokemon('Misdreavus', 3, 20)]), // Dreavis
        new ContestTrainer('Willie', 'Ninja Boy', [new GymPokemon('Cacnea', 5, 20)]), // Nacac
        new ContestTrainer('Zeek', 'Psychic', [new GymPokemon('Drowzee', 11, 20)], '(male)'), // Drowzin
    ],
    [ContestRank.Hyper]: [
        new ContestTrainer('Alisha', 'Young Couple', [new GymPokemon('Beautifly', 6, 30)]),// '(female)'), // Tifly
        new ContestTrainer('Bryce', 'Bug Catcher', [new GymPokemon('Pineco', 8, 30)]), // Pinoc
        new ContestTrainer('Claudia', 'Yellow Dress Girl', [new GymPokemon('Nuzleaf', 6, 30)]), // Nuzle
        new ContestTrainer('Claudia', 'Yellow Dress Girl', [new GymPokemon('Shiftry', 6, 30)]), // Shifty
        new ContestTrainer('Coltin', 'Pokémon Breeder', [new GymPokemon('Cubone', 5, 30)], '(male)'), // Cubin
        new ContestTrainer('Corbin', 'PokéManiac', [new GymPokemon('Pelipper', 8, 30)]), //Pelipe
        new ContestTrainer('Corbin', 'PokéManiac', [new GymPokemon('Absol', 8, 30)]), //Abso
        new ContestTrainer('Darryl', 'Cooltrainer', [new GymPokemon('Seviper', 6, 30)], '(male)'), //Vipes
        new ContestTrainer('Devon', 'Pokéfan', [new GymPokemon('Miltank', 9, 30)], '(male)'), // Milkan
        new ContestTrainer('Elias', 'Ninja Boy', [new GymPokemon('Ninjask', 10, 30)]), // Ninas
        new ContestTrainer('Ellie', 'Old Lady', [new GymPokemon('Hitmonlee', 7, 30)]), // Hitmon
        new ContestTrainer('Emilio', 'School Kid', [new GymPokemon('Machop', 2, 30)], '(male)'), // Chopam
        new ContestTrainer('Emilio', 'School Kid', [new GymPokemon('Machoke', 5, 30)], '(male)'), // Chokem
        new ContestTrainer('Felicia', 'Lass', [
            new GymPokemon('Castform', 13, 30, new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sandstorm, WeatherType.Windy])),
            new GymPokemon('Castform (Sunny)', 13, 30, new WeatherRequirement([WeatherType.Sunny])),
            new GymPokemon('Castform (Rainy)', 13, 30, new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])),
            new GymPokemon('Castform (Snowy)', 13, 30, new WeatherRequirement([WeatherType.Hail, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Fog]))
        ]), // Caster
        new ContestTrainer('Francis', 'Black Belt', [new GymPokemon('Mightyena', 6, 30)]), // Yena
        new ContestTrainer('Gracie', 'Picnicker', [new GymPokemon('Exeggutor', 7, 30)]), //Eggsor
        new ContestTrainer('Jade', 'Pokéfan', [new GymPokemon('Swellow', 6, 30)], '(female)'), // Welow
        new ContestTrainer('Jamie', 'Cooltrainer', [new GymPokemon('Dunsparce', 7, 30)], '(female)'), //Diltot
        new ContestTrainer('Jorge', 'Gentleman', [new GymPokemon('Houndoom', 9, 30)]), // Doomond
        new ContestTrainer('Karla', 'Kiri', [new GymPokemon('Lombre', 9, 30)]), // Lombe
        new ContestTrainer('Kiara', 'Battle Girl', [new GymPokemon('Kangaskhan', 10, 30)]), //Khankan
        new ContestTrainer('Lacey', 'Flowers Girl', [new GymPokemon('Lunatone', 4, 30)]), // Lunone
        new ContestTrainer('Marcus', 'Sailor', [new GymPokemon('Squirtle', 6, 30)]), // Surtle
        new ContestTrainer('Noel', 'Youngster', [new GymPokemon('Magikarp', 12, 30)]), // Karpag
        new ContestTrainer('Ronnie', 'Hiker', [new GymPokemon('Lairon', 7, 30)]), // Lairn
        new ContestTrainer('Saul', 'Camper', [new GymPokemon('Seaking', 10, 30)]), // Kingsea
        new ContestTrainer('Selena', 'Old Lady', [new GymPokemon('Wailmer', 9, 30)]), // Merail
    ],
    [ContestRank.Master]: [
        new ContestTrainer('Aubrey', 'Young Couple', [new GymPokemon('Vileplume', 8, 40)]),// '(female)'), // Plumile
        new ContestTrainer('Aubrey', 'Young Couple', [new GymPokemon('Bellossom', 8, 40)]),// '(female)'), // Blossom
        new ContestTrainer('Camile', 'Hex Maniac', [new GymPokemon('Gengar', 8, 40)]), // Garen
        new ContestTrainer('Camille', 'Psychic', [
            new GymPokemon('Natu', 6, 40, new GymBadgeRequirement(BadgeEnums.Mind, GameConstants.AchievementOption.less)),
            new GymPokemon('Xatu', 6, 40, new GymBadgeRequirement(BadgeEnums.Mind)),
        ], '(female)'), // Utan
        new ContestTrainer('Clara', 'Lady', [new GymPokemon('Togepi', 4, 40)]), // Gepito
        new ContestTrainer('Deon', 'School Kid', [new GymPokemon('Sharpedo', 3, 40)], '(male)'), // Pedos
        new ContestTrainer('Frankie', 'Youngster', [new GymPokemon('Pichu', 7, 40)]), // Chupy
        new ContestTrainer('Heath', 'Cooltrainer', [new GymPokemon('Heracross', 7, 40)], '(male)'), // Heross
        new ContestTrainer('Helen', 'Flowers Girl', [new GymPokemon('Wobbuffet', 14, 40)]), // Wobet
        new ContestTrainer('Jakob', 'Psychic', [new GymPokemon('Espeon', 7, 40)], '(male)'), // Speon
        new ContestTrainer('Janelle', 'Kiri', [new GymPokemon('Luvdisc', 5, 40)]), // Luvis
        new ContestTrainer('Justina', 'Picnicker', [new GymPokemon('Gyarados', 9, 40)]), // Rados
        new ContestTrainer('Kailey', 'Twins', [new GymPokemon('Meowth', 7, 40)]), // Meowy
        new ContestTrainer('Keaton', 'Ninja Boy', [new GymPokemon('Slaking', 6, 40)]), // Sling
        new ContestTrainer('Lamar', 'Rich Boy', [new GymPokemon('Kirlia', 6, 40)]), // Lirki
        new ContestTrainer('Lane', 'Black Belt', [new GymPokemon('Ursaring', 8, 40)]), // Ursing
        new ContestTrainer('Martin', 'Scientist', [new GymPokemon('Porygon', 10, 40)], '(male)'), // Gonpor
        new ContestTrainer('Mayra', 'Pokéfan', [new GymPokemon('Altaria', 5, 40)], '(female)'), // Taria
        new ContestTrainer('Nigel', 'Camper', [new GymPokemon('Sableye', 10, 40)]), // Eyesab
        new ContestTrainer('Nigel', 'Camper', [new GymPokemon('Duskull', 10, 40)]), // Kullusk
        new ContestTrainer('Perla', 'Beauty', [new GymPokemon('Jynx', 4, 40)]), // Nyx
        new ContestTrainer('Ralph', 'Old Man', [new GymPokemon('Loudred', 7, 40)]), // Louderd
        new ContestTrainer('Rosa', 'Yellow Dress Girl', [new GymPokemon('Skitty', 10, 40)]), // Sitty
        new ContestTrainer('Rosa', 'Yellow Dress Girl', [new GymPokemon('Delcatty', 10, 40)]), // Catted
        new ContestTrainer('Sasha', 'Twins', [new GymPokemon('Electrode', 8, 40)]), // Rodlect
        new ContestTrainer('Sergio', 'Green Shoes Boy', [new GymPokemon('Dragonite', 6, 40)]), // Drite
        new ContestTrainer('Trey', 'Sailor', [new GymPokemon('Slowking', 6, 40)]), // Slowgo
    ],
    [ContestRank['Super Normal']]: [],
    [ContestRank['Super Great']]: [],
    [ContestRank['Super Ultra']]: [],
    [ContestRank['Super Master']]: [],
    [ContestRank.Spectacular]: [],
    [ContestRank['Brilliant Shining']]: [],
};
