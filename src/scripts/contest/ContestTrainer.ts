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
        new ContestTrainer('Alec', 'Camper', [new GymPokemon('Slakoth', 13, 10)]), // Slokth
        new ContestTrainer('Beau', 'Hex Maniac', [new GymPokemon('Butterfree', 8, 10)]), // Futterbe
        new ContestTrainer('Caitlin', 'Tuber', [new GymPokemon('Poliwag', 10, 10)], '(female)'), // Wagil
        new ContestTrainer('Cale', 'Ruin Maniac', [new GymPokemon('Diglett', 10, 10)]), // Digle
        new ContestTrainer('Chance', 'Rich Boy', [
            new GymPokemon('Electrike', 10, 10, new GymBadgeRequirement(BadgeEnums.Dynamo, GameConstants.AchievementOption.less)),
            new GymPokemon('Manectric', 10, 10, new GymBadgeRequirement(BadgeEnums.Dynamo)),
        ]), // Rikelec
        new ContestTrainer('Colby', 'Ninja Boy', [new GymPokemon('Totodile', 12, 10)]), // Totdil
        new ContestTrainer('Edith', 'Parasol Lady', [
            new GymPokemon('Zigzagoon', 4, 10), // Zigoon
            new GymPokemon('Illumise', 4, 10), // Musille
        ]),
        new ContestTrainer('Evan', 'Bug Catcher', [new GymPokemon('Dustox', 5, 10)], 'gen4'), // Duster
        new ContestTrainer('Grant', 'Youngster', [new GymPokemon('Shroomish', 3, 10)]), // Smish
        new ContestTrainer('Jimmy', 'Preschooler', [new GymPokemon('Poochyena', 6, 10)], '(male)'), // Poochy
        new ContestTrainer('Kay', 'Cooltrainer', [new GymPokemon('Pidgeotto', 8, 10)], '(female)'), // Pideot
        new ContestTrainer('Kelsey', 'Picnicker', [new GymPokemon('Seedot', 8, 10)]), // Dots
        new ContestTrainer('Kylie', 'Beauty', [new GymPokemon('Ledyba', 10, 10)]), // Baledy
        new ContestTrainer('Liam', 'Bird Keeper', [new GymPokemon('Delibird', 14, 10)]), // Birdly
        new ContestTrainer('Madison', 'Pokéfan', [new GymPokemon('Taillow', 4, 10)], 'gen4 (female)'), // Tatay
        new ContestTrainer('Mariah', 'School Kid', [new GymPokemon('Aron', 11, 10)], '(female)'), // Ronar
        new ContestTrainer('Melanie', 'Twin', [new GymPokemon('Gulpin', 4, 10)], 'left frlg'), // Gulin
        new ContestTrainer('Milo', 'PokéManiac', [new GymPokemon('Larvitar', 5, 10)]), // Tarvitar
        new ContestTrainer('Morris', 'School Kid', [new GymPokemon('Makuhita', 10, 10)], '(male'), // Mahita
        new ContestTrainer('Paige', 'Young Couple', [
            new GymPokemon('Wingull', 6, 10), // Gulwee
            new GymPokemon('Spheal', 6, 10), // Sleal
        ], '(female)'),
        new ContestTrainer('Raymond', 'Black Belt', [new GymPokemon('Nincada', 6, 10)]), // Ninda
        new ContestTrainer('Russell', 'Cooltrainer', [
            new GymPokemon('Zubat', 7, 10), // Zutzu
            new GymPokemon('Crobat', 7, 10), // Batro
        ], '(male)'),
        new ContestTrainer('Sydney', 'Lass', [new GymPokemon('Whismur', 8, 10)]), // Whiris
        new ContestTrainer('Danial', 'Juggler', [new GymPokemon('Red Spearow', 10, 10)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
    ],
    [ContestRank.Super]: [
        new ContestTrainer('Aliyah', 'Nurse', [new GymPokemon('Blissey', 8, 20)]), // Bliss
        new ContestTrainer('Ariana', 'Lady', [new GymPokemon('Kecleon', 8, 20)], 'gen3'), // Kecon
        new ContestTrainer('Ashton', 'Cooltrainer', [new GymPokemon('Goldeen', 8, 20)], '(male)'), // Golden
        new ContestTrainer('Audrey', 'Lass', [new GymPokemon('Swablu', 4, 20)]), // Swaby
        new ContestTrainer('Avery', 'School Kid', [
            new GymPokemon('Linoone', 5, 20), // Noone
            new GymPokemon('Spoink', 5, 20), // Poinker
        ], '(male)'),
        new ContestTrainer('Bobby', 'Triathlete', [
            new GymPokemon('Doduo', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance, GameConstants.AchievementOption.less)),
            new GymPokemon('Dodrio', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance)),
        ], 'swimmer (male)'), // Duodo
        new ContestTrainer('Cassidy', 'Pokéfan', [
            new GymPokemon('Sandshrew', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance, GameConstants.AchievementOption.less)),
            new GymPokemon('Sandslash', 11, 20, new GymBadgeRequirement(BadgeEnums.Balance)),
        ], 'gen4 (female)'), // Shrand
        new ContestTrainer('Claire', 'Picnicker', [new GymPokemon('Trapinch', 4, 20)]), // Pinchin
        new ContestTrainer('Devin', 'Gentleman', [new GymPokemon('Snubbull', 2, 20)]), // Snubbins
        new ContestTrainer('Diego', 'Expert', [new GymPokemon('Hitmonchan', 6, 20)], '(male)'), // Hitemon
        new ContestTrainer('Jada', 'Lady', [new GymPokemon('Seel', 4, 20)], 'frlg'), // Seeley
        new ContestTrainer('Karina', 'Pokemon Ranger', [new GymPokemon('Roselia', 3, 20)], '(female)'), // Relia
        new ContestTrainer('Katrina', 'Parasol Lady', [new GymPokemon('Lotad', 4, 20)]), // Tado
        new ContestTrainer('Luke', 'Collector', [new GymPokemon('Slowbro', 3, 20)]), // Browlo
        new ContestTrainer('Miles', 'Pokemon Ranger', [new GymPokemon('Spinda', 2, 20)], '(male)'), // Spinin
        new ContestTrainer('Morgan', 'Black Belt', [new GymPokemon('Baltoy', 6, 20)]), // Toybal
        new ContestTrainer('Natalia', 'Pokéfan', [new GymPokemon('Elekid', 4, 20)], '(female)'), // Kidlek
        new ContestTrainer('Raul', 'Bird Keeper', [new GymPokemon('Farfetch\'d', 2, 20)]), // Fetchin
        new ContestTrainer('Sandra', 'Twin', [new GymPokemon('Barboach', 6, 20)], 'right frlg'), // Boboach
        new ContestTrainer('Summer', 'Office Worker', [
            new GymPokemon('Medicham', 5, 20), // Chamcham
            new GymPokemon('Numel', 5, 20), // Lenum
        ], '(female)'),
        new ContestTrainer('Tylor', 'Hex Maniac', [new GymPokemon('Misdreavus', 3, 20)]), // Dreavis
        new ContestTrainer('Willie', 'Ninja Boy', [new GymPokemon('Cacnea', 5, 20)]), // Nacac
        new ContestTrainer('Zeek', 'Psychic', [new GymPokemon('Drowzee', 11, 20)], '(male)'), // Drowzin
    ],
    [ContestRank.Hyper]: [
        new ContestTrainer('Alisha', 'Young Couple', [new GymPokemon('Beautifly', 6, 30)], '(female)'), // Tifly
        new ContestTrainer('Bryce', 'Bug Catcher', [new GymPokemon('Pineco', 8, 30)]), // Pinoc
        new ContestTrainer('Claudia', 'Picnicker', [
            new GymPokemon('Nuzleaf', 6, 30), // Nuzle
            new GymPokemon('Shiftry', 6, 30), // Shifty
        ]),
        new ContestTrainer('Coltin', 'Pokémon Breeder', [new GymPokemon('Cubone', 5, 30)], '(male)'), // Cubin
        new ContestTrainer('Corbin', 'Collector', [
            new GymPokemon('Pelipper', 8, 30), //Pelipe
            new GymPokemon('Absol', 8, 30), // Abso
        ], 'gen3'),
        new ContestTrainer('Darryl', 'Cooltrainer', [new GymPokemon('Seviper', 6, 30)], '(male)'), //Vipes
        new ContestTrainer('Devon', 'Pokéfan', [new GymPokemon('Miltank', 9, 30)], 'gen3 (male)'), // Milkan
        new ContestTrainer('Elias', 'Ninja Boy', [new GymPokemon('Ninjask', 10, 30)]), // Ninas
        new ContestTrainer('Ellie', 'Expert', [new GymPokemon('Hitmonlee', 7, 30)], '(female)'), // Hitmon
        new ContestTrainer('Emilio', 'School Kid', [
            new GymPokemon('Machop', 2, 30), // Chopam
            new GymPokemon('Machoke', 5, 30), // Chokem
        ], '(male)'),
        new ContestTrainer('Felicia', 'Lass', [
            new GymPokemon('Castform', 13, 30, new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sandstorm, WeatherType.Windy])),
            new GymPokemon('Castform (Sunny)', 13, 30, new WeatherRequirement([WeatherType.Sunny])),
            new GymPokemon('Castform (Rainy)', 13, 30, new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])),
            new GymPokemon('Castform (Snowy)', 13, 30, new WeatherRequirement([WeatherType.Hail, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Fog]))
        ]), // Caster
        new ContestTrainer('Francis', 'Black Belt', [new GymPokemon('Mightyena', 6, 30)]), // Yena
        new ContestTrainer('Gracie', 'Pokemon Ranger', [new GymPokemon('Exeggutor', 7, 30)],' (female)'), //Eggsor
        new ContestTrainer('Jade', 'Pokéfan', [new GymPokemon('Swellow', 6, 30)], '(female)'), // Welow
        new ContestTrainer('Jamie', 'Cooltrainer', [new GymPokemon('Dunsparce', 7, 30)], '(female)'), //Diltot
        new ContestTrainer('Jorge', 'Gentleman', [new GymPokemon('Houndoom', 9, 30)]), // Doomond
        new ContestTrainer('Karla', 'Lady', [new GymPokemon('Lombre', 9, 30)], 'gen3'), // Lombe
        new ContestTrainer('Kiara', 'School Kid', [new GymPokemon('Kangaskhan', 10, 30)], '(female)'), //Khankan
        new ContestTrainer('Lacey', 'Psychic', [new GymPokemon('Lunatone', 4, 30)], '(female)'), // Lunone
        new ContestTrainer('Marcus', 'Sailor', [new GymPokemon('Squirtle', 6, 30)]), // Surtle
        new ContestTrainer('Noel', 'Youngster', [new GymPokemon('Magikarp', 12, 30)]), // Karpag
        new ContestTrainer('Ronnie', 'Hiker', [new GymPokemon('Lairon', 7, 30)]), // Lairn
        new ContestTrainer('Saul', 'Camper', [new GymPokemon('Seaking', 10, 30)]), // Kingsea
        new ContestTrainer('Selena', 'Pokéfan', [new GymPokemon('Wailmer', 9, 30)], 'gen3 (female)'), // Merail
    ],
    [ContestRank.Master]: [
        new ContestTrainer('Aubrey', 'Young Couple', [
            new GymPokemon('Vileplume', 8, 40), // Plumile
            new GymPokemon('Bellossom', 8, 40), // Blossom
        ], '(female)'),
        new ContestTrainer('Camile', 'Hex Maniac', [new GymPokemon('Gengar', 8, 40)]), // Garen
        new ContestTrainer('Camille', 'Psychic', [
            new GymPokemon('Natu', 6, 40, new GymBadgeRequirement(BadgeEnums.Mind, GameConstants.AchievementOption.less)),
            new GymPokemon('Xatu', 6, 40, new GymBadgeRequirement(BadgeEnums.Mind)),
        ], '(female)'), // Utan
        new ContestTrainer('Clara', 'Pokémon Breeder', [new GymPokemon('Togepi', 4, 40)], '(female)'), // Gepito
        new ContestTrainer('Deon', 'School Kid', [new GymPokemon('Sharpedo', 3, 40)], '(male)'), // Pedos
        new ContestTrainer('Frankie', 'Youngster', [new GymPokemon('Pichu', 7, 40)]), // Chupy
        new ContestTrainer('Heath', 'Cooltrainer', [new GymPokemon('Heracross', 7, 40)], '(male)'), // Heross
        new ContestTrainer('Helen', 'Battle Girl', [new GymPokemon('Wobbuffet', 14, 40)]), // Wobet
        new ContestTrainer('Jakob', 'Psychic', [new GymPokemon('Espeon', 7, 40)], '(male)'), // Speon
        new ContestTrainer('Janelle', 'Lady', [new GymPokemon('Luvdisc', 5, 40)], 'frlg'), // Luvis
        new ContestTrainer('Justina', 'Picnicker', [new GymPokemon('Gyarados', 9, 40)]), // Rados
        new ContestTrainer('Kailey', 'Twin', [new GymPokemon('Meowth', 7, 40)], 'left frlg'), // Meowy
        new ContestTrainer('Keaton', 'Preschooler', [new GymPokemon('Slaking', 6, 40)], '(male)'), // Sling
        new ContestTrainer('Lamar', 'Rich Boy', [new GymPokemon('Kirlia', 6, 40)]), // Lirki
        new ContestTrainer('Lane', 'Black Belt', [new GymPokemon('Ursaring', 8, 40)]), // Ursing
        new ContestTrainer('Martin', 'Scientist', [new GymPokemon('Porygon', 10, 40)], '(male)'), // Gonpor
        new ContestTrainer('Mayra', 'Pokéfan', [new GymPokemon('Altaria', 5, 40)], 'gen3 (female)'), // Taria
        new ContestTrainer('Nigel', 'Camper', [
            new GymPokemon('Sableye', 10, 40), // Eyesab
            new GymPokemon('Duskull', 10, 40), // Kullusk
        ]),
        new ContestTrainer('Perla', 'Beauty', [new GymPokemon('Jynx', 4, 40)]), // Nyx
        new ContestTrainer('Ralph', 'Old Man', [new GymPokemon('Loudred', 7, 40)]), // Louderd
        new ContestTrainer('Rosa', 'Idol', [
            new GymPokemon('Skitty', 10, 40), // Sitty
            new GymPokemon('Delcatty', 10, 40), // Catted
        ]),
        new ContestTrainer('Sasha', 'Twin', [new GymPokemon('Electrode', 8, 40)], 'right frlg'), // Rodlect
        new ContestTrainer('Sergio', 'Dragon Tamer', [new GymPokemon('Dragonite', 6, 40)]), // Drite
        new ContestTrainer('Trey', 'Sailor', [new GymPokemon('Slowking', 6, 40)]), // Slowgo
    ],
    [ContestRank['Super Normal']]: [],
    [ContestRank['Super Great']]: [],
    [ContestRank['Super Ultra']]: [],
    [ContestRank['Super Master']]: [],
    [ContestRank.Spectacular]: [],
    [ContestRank['Brilliant Shining']]: [],
};
