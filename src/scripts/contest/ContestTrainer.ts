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
        new ContestTrainer('Agatha', 'Aroma Lady', [new GymPokemon('Bulbasaur', 80, 10)]), // Bulby
        new ContestTrainer('Alec', 'Camper', [new GymPokemon('Slakoth', 130, 10)]), // Slokth
        new ContestTrainer('Beau', 'Hex Maniac', [new GymPokemon('Butterfree', 80, 10)]), // Futterbe
        new ContestTrainer('Caitlin', 'Tuber', [new GymPokemon('Poliwag', 100, 10)], '(female)'), // Wagil
        new ContestTrainer('Cale', 'Ruin Maniac', [new GymPokemon('Diglett', 100, 10)]), // Digle
        new ContestTrainer('Chance', 'Rich Boy', [
            new GymPokemon('Electrike', 100, 10, new GymBadgeRequirement(BadgeEnums.Dynamo, GameConstants.AchievementOption.less)),
            new GymPokemon('Manectric', 100, 10, new GymBadgeRequirement(BadgeEnums.Dynamo)),
        ]), // Rikelec
        new ContestTrainer('Colby', 'Ninja Boy', [new GymPokemon('Totodile', 120, 10)]), // Totdil
        new ContestTrainer('Edith', 'Parasol Lady', [
            new GymPokemon('Zigzagoon', 40, 10), // Zigoon
            new GymPokemon('Illumise', 40, 10), // Musille
        ]),
        new ContestTrainer('Evan', 'Bug Catcher', [new GymPokemon('Dustox', 50, 10)], 'gen4'), // Duster
        new ContestTrainer('Grant', 'Youngster', [new GymPokemon('Shroomish', 30, 10)]), // Smish
        new ContestTrainer('Jimmy', 'Preschooler', [new GymPokemon('Poochyena', 60, 10)], '(male)'), // Poochy
        new ContestTrainer('Kay', 'Cooltrainer', [new GymPokemon('Pidgeotto', 80, 10)], '(female)'), // Pideot
        new ContestTrainer('Kelsey', 'Picnicker', [new GymPokemon('Seedot', 80, 10)]), // Dots
        new ContestTrainer('Kylie', 'Beauty', [new GymPokemon('Ledyba', 100, 10)]), // Baledy
        new ContestTrainer('Liam', 'Bird Keeper', [new GymPokemon('Delibird', 140, 10)], 'gen3'), // Birdly
        new ContestTrainer('Madison', 'Pokéfan', [new GymPokemon('Taillow', 40, 10)], 'gen4 (female)'), // Tatay
        new ContestTrainer('Mariah', 'School Kid', [new GymPokemon('Aron', 110, 10)], '(female)'), // Ronar
        new ContestTrainer('Melanie', 'Twin', [new GymPokemon('Gulpin', 40, 10)], 'left frlg'), // Gulin
        new ContestTrainer('Milo', 'PokéManiac', [new GymPokemon('Larvitar', 50, 10)]), // Tarvitar
        new ContestTrainer('Morris', 'School Kid', [new GymPokemon('Makuhita', 100, 10)], '(male)'), // Mahita
        new ContestTrainer('Paige', 'Young Couple', [
            new GymPokemon('Wingull', 60, 10), // Gulwee
            new GymPokemon('Spheal', 60, 10), // Sleal
        ], '(female)'),
        new ContestTrainer('Raymond', 'Black Belt', [new GymPokemon('Nincada', 60, 10)]), // Ninda
        new ContestTrainer('Russell', 'Cooltrainer', [
            new GymPokemon('Zubat', 70, 10), // Zutzu
            new GymPokemon('Crobat', 70, 10), // Batro
        ], '(male)'),
        new ContestTrainer('Sydney', 'Lass', [new GymPokemon('Whismur', 80, 10)]), // Whiris
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 100, 10)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 100, 10)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
    ],
    [ContestRank.Super]: [
        new ContestTrainer('Aliyah', 'Nurse', [new GymPokemon('Blissey', 80, 20)]), // Bliss
        new ContestTrainer('Ariana', 'Reporter', [new GymPokemon('Kecleon', 80, 20)]), // Kecon
        new ContestTrainer('Ashton', 'Cooltrainer', [new GymPokemon('Goldeen', 80, 20)], '(male)'), // Golden
        new ContestTrainer('Audrey', 'Lass', [new GymPokemon('Swablu', 40, 20)]), // Swaby
        new ContestTrainer('Avery', 'School Kid', [
            new GymPokemon('Linoone', 50, 20), // Noone
            new GymPokemon('Spoink', 50, 20), // Poinker
        ], '(male)'),
        new ContestTrainer('Bobby', 'Triathlete', [
            new GymPokemon('Doduo', 110, 20, new GymBadgeRequirement(BadgeEnums.Balance, GameConstants.AchievementOption.less)),
            new GymPokemon('Dodrio', 110, 20, new GymBadgeRequirement(BadgeEnums.Balance)),
        ], 'gen3 (maleswimming)'), // Duodo
        new ContestTrainer('Cassidy', 'Pokéfan', [
            new GymPokemon('Sandshrew', 110, 20, new GymBadgeRequirement(BadgeEnums.Balance, GameConstants.AchievementOption.less)),
            new GymPokemon('Sandslash', 110, 20, new GymBadgeRequirement(BadgeEnums.Balance)),
        ], 'gen4 (female)'), // Shrand
        new ContestTrainer('Claire', 'Picnicker', [new GymPokemon('Trapinch', 40, 20)]), // Pinchin
        new ContestTrainer('Devin', 'Gentleman', [new GymPokemon('Snubbull', 20, 20)]), // Snubbins
        new ContestTrainer('Diego', 'Veteran', [new GymPokemon('Hitmonchan', 60, 20)], '(male)'), // Hitemon
        new ContestTrainer('Jada', 'Lady', [new GymPokemon('Seel', 40, 20)]), // Seeley
        new ContestTrainer('Karina', 'Pokemon Ranger', [new GymPokemon('Roselia', 30, 20)], '(female)'), // Relia
        new ContestTrainer('Katrina', 'Parasol Lady', [new GymPokemon('Lotad', 40, 20)]), // Tado
        new ContestTrainer('Luke', 'Collector', [new GymPokemon('Slowbro', 30, 20)]), // Browlo
        new ContestTrainer('Miles', 'Pokémon Ranger', [new GymPokemon('Spinda', 20, 20)], '(male)'), // Spinin
        new ContestTrainer('Morgan', 'Black Belt', [new GymPokemon('Baltoy', 60, 20)]), // Toybal
        new ContestTrainer('Natalia', 'Pokéfan', [new GymPokemon('Elekid', 40, 20)], '(female)'), // Kidlek
        new ContestTrainer('Raul', 'Bird Keeper', [new GymPokemon('Farfetch\'d', 20, 20)]), // Fetchin
        new ContestTrainer('Sandra', 'Twin', [new GymPokemon('Barboach', 60, 20)], 'right frlg'), // Boboach
        new ContestTrainer('Summer', 'Office Worker', [
            new GymPokemon('Medicham', 50, 20), // Chamcham
            new GymPokemon('Numel', 50, 20), // Lenum
        ], '(female)'),
        new ContestTrainer('Tylor', 'Hex Maniac', [new GymPokemon('Misdreavus', 30, 20)]), // Dreavis
        new ContestTrainer('Willie', 'Ninja Boy', [new GymPokemon('Cacnea', 50, 20)]), // Nacac
        new ContestTrainer('Zeek', 'Psychic', [new GymPokemon('Drowzee', 110, 20)], '(male)'), // Drowzin
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 100, 10)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 100, 10)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
    ],
    [ContestRank.Hyper]: [
        new ContestTrainer('Alisha', 'Young Couple', [new GymPokemon('Beautifly', 60, 30)], '(female)'), // Tifly
        new ContestTrainer('Bryce', 'Bug Catcher', [new GymPokemon('Pineco', 80, 30)]), // Pinoc
        new ContestTrainer('Claudia', 'Picnicker', [
            new GymPokemon('Nuzleaf', 60, 30), // Nuzle
            new GymPokemon('Shiftry', 60, 30), // Shifty
        ]),
        new ContestTrainer('Coltin', 'Pokémon Breeder', [new GymPokemon('Cubone', 50, 30)], '(male)'), // Cubin
        new ContestTrainer('Corbin', 'Collector', [
            new GymPokemon('Pelipper', 80, 30), //Pelipe
            new GymPokemon('Absol', 80, 30), // Abso
        ], 'gen3'),
        new ContestTrainer('Darryl', 'Cooltrainer', [new GymPokemon('Seviper', 60, 30)], '(male)'), //Vipes
        new ContestTrainer('Devon', 'Pokéfan', [new GymPokemon('Miltank', 90, 30)], '(male)'), // Milkan
        new ContestTrainer('Elias', 'Ninja Boy', [new GymPokemon('Ninjask', 100, 30)]), // Ninas
        new ContestTrainer('Ellie', 'Veteran', [new GymPokemon('Hitmonlee', 70, 30)], '(female)'), // Hitmon
        new ContestTrainer('Emilio', 'School Kid', [
            new GymPokemon('Machop', 20, 30), // Chopam
            new GymPokemon('Machoke', 50, 30), // Chokem
        ], '(male)'),
        new ContestTrainer('Felicia', 'Lass', [
            new GymPokemon('Castform', 130, 30, new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sandstorm, WeatherType.Windy])),
            new GymPokemon('Castform (Sunny)', 130, 30, new WeatherRequirement([WeatherType.Harsh_Sunlight])),
            new GymPokemon('Castform (Rainy)', 130, 30, new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])),
            new GymPokemon('Castform (Snowy)', 130, 30, new WeatherRequirement([WeatherType.Hail, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Fog])),
        ]), // Caster
        new ContestTrainer('Francis', 'Black Belt', [new GymPokemon('Mightyena', 60, 30)]), // Yena
        new ContestTrainer('Gracie', 'Pokemon Ranger', [new GymPokemon('Exeggutor', 70, 30)], '(female)'), //Eggsor
        new ContestTrainer('Jade', 'Pokéfan', [new GymPokemon('Swellow', 60, 30)], '(female)'), // Welow
        new ContestTrainer('Jamie', 'Cooltrainer', [new GymPokemon('Dunsparce', 70, 30)], '(female)'), //Diltot
        new ContestTrainer('Jorge', 'Gentleman', [new GymPokemon('Houndoom', 90, 30)]), // Doomond
        new ContestTrainer('Karla', 'Tuber', [new GymPokemon('Lombre', 90, 30)], '(female)'), // Lombe
        new ContestTrainer('Kiara', 'School Kid', [new GymPokemon('Kangaskhan', 100, 30)], '(female)'), //Khankan
        new ContestTrainer('Lacey', 'Psychic', [new GymPokemon('Lunatone', 40, 30)], '(female)'), // Lunone
        new ContestTrainer('Marcus', 'Sailor', [new GymPokemon('Squirtle', 60, 30)]), // Surtle
        new ContestTrainer('Noel', 'Youngster', [new GymPokemon('Magikarp', 120, 30)]), // Karpag
        new ContestTrainer('Ronnie', 'Hiker', [new GymPokemon('Lairon', 70, 30)]), // Lairn
        new ContestTrainer('Saul', 'Camper', [new GymPokemon('Seaking', 100, 30)]), // Kingsea
        new ContestTrainer('Selena', 'Madame', [new GymPokemon('Wailmer', 90, 30)]), // Merail
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 120, 10)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 120, 10)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
    ],
    [ContestRank.Master]: [
        new ContestTrainer('Aubrey', 'Young Couple', [
            new GymPokemon('Vileplume', 80, 40), // Plumile
            new GymPokemon('Bellossom', 80, 40), // Blossom
        ], '(female)'),
        new ContestTrainer('Camile', 'Hex Maniac', [new GymPokemon('Gengar', 80, 40)]), // Garen
        new ContestTrainer('Camille', 'Psychic', [
            new GymPokemon('Natu', 60, 40, new GymBadgeRequirement(BadgeEnums.Mind, GameConstants.AchievementOption.less)),
            new GymPokemon('Xatu', 60, 40, new GymBadgeRequirement(BadgeEnums.Mind)),
        ], '(female)'), // Utan
        new ContestTrainer('Clara', 'Pokémon Breeder', [new GymPokemon('Togepi', 40, 40)], '(female)'), // Gepito
        new ContestTrainer('Deon', 'School Kid', [new GymPokemon('Sharpedo', 30, 40)], '(male)'), // Pedos
        new ContestTrainer('Frankie', 'Youngster', [new GymPokemon('Pichu', 70, 40)]), // Chupy
        new ContestTrainer('Heath', 'Cooltrainer', [new GymPokemon('Heracross', 70, 40)], '(male)'), // Heross
        new ContestTrainer('Helen', 'Battle Girl', [new GymPokemon('Wobbuffet', 140, 40)]), // Wobet
        new ContestTrainer('Jakob', 'Psychic', [new GymPokemon('Espeon', 70, 40)], '(male)'), // Speon
        new ContestTrainer('Janelle', 'Lady', [new GymPokemon('Luvdisc', 50, 40)]), // Luvis
        new ContestTrainer('Justina', 'Picnicker', [new GymPokemon('Gyarados', 90, 40)]), // Rados
        new ContestTrainer('Kailey', 'Twin', [new GymPokemon('Meowth', 70, 40)], 'left frlg'), // Meowy
        new ContestTrainer('Keaton', 'Preschooler', [new GymPokemon('Slaking', 60, 40)], '(male)'), // Sling
        new ContestTrainer('Lamar', 'Rich Boy', [new GymPokemon('Kirlia', 60, 40)]), // Lirki
        new ContestTrainer('Lane', 'Black Belt', [new GymPokemon('Ursaring', 80, 40)]), // Ursing
        new ContestTrainer('Martin', 'Scientist', [new GymPokemon('Porygon', 100, 40)], '(male)'), // Gonpor
        new ContestTrainer('Mayra', 'Pokéfan', [new GymPokemon('Altaria', 50, 40)], 'gen4 (female)'), // Taria
        new ContestTrainer('Nigel', 'Camper', [
            new GymPokemon('Sableye', 100, 40), // Eyesab
            new GymPokemon('Duskull', 100, 40), // Kullusk
        ]),
        new ContestTrainer('Perla', 'Beauty', [new GymPokemon('Jynx', 40, 40)]), // Nyx
        new ContestTrainer('Ralph', 'Old Man', [new GymPokemon('Loudred', 70, 40)]), // Louderd
        new ContestTrainer('Rosa', 'Idol', [
            new GymPokemon('Skitty', 100, 40), // Sitty
            new GymPokemon('Delcatty', 100, 40), // Catted
        ]),
        new ContestTrainer('Sasha', 'Twin', [new GymPokemon('Electrode', 80, 40)], 'right frlg'), // Rodlect
        new ContestTrainer('Sergio', 'Dragon Tamer', [new GymPokemon('Dragonite', 60, 40)]), // Drite
        new ContestTrainer('Trey', 'Sailor', [new GymPokemon('Slowking', 60, 40)]), // Slowgo
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 120, 10)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 120, 10)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
    ],
    [ContestRank['Super Normal']]: [],
    [ContestRank['Super Great']]: [],
    [ContestRank['Super Ultra']]: [],
    [ContestRank['Super Master']]: [],
    [ContestRank.Spectacular]: [],
    [ContestRank['Brilliant Shining']]: [],
};
