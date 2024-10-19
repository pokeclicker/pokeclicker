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

const ContestOpponents: Record<ContestRank, ContestTrainer[]> = {
    [ContestRank.Practice]: [
        new ContestTrainer('Gage', 'Ace Trainer', [new GymPokemon('Pikachu', 10, 1)], '(male)'), // Chuchu
        new ContestTrainer('Raven', 'Aroma Lady', [new GymPokemon('Hoothoot', 10, 1)]), // Tootie
        new ContestTrainer('Marquis', 'School Kid', [new GymPokemon('Geodude', 10, 1)], '(male)'), // Iggy
        new ContestTrainer('Jocelyn', 'Madame', [new GymPokemon('Machop', 20, 1)]), // Punchy
        new ContestTrainer('Carson', 'Psychic', [new GymPokemon('Psyduck', 10, 1)], '(male)'), // Quackers
        new ContestTrainer('Jade', 'Beauty', [new GymPokemon('Cherubi', 10, 1)]), // Juicy
        new ContestTrainer('Zane', 'Pokémon Breeder', [new GymPokemon('Barboach', 20, 1)], '(male)'), // Stubby
        new ContestTrainer('Kiara', 'Lass', [new GymPokemon('Mime Jr.', 20, 1)]), // Kiddo
        new ContestTrainer('Allan', 'Camper', [new GymPokemon('Bidoof', 10, 1)]), // Smiley
        new ContestTrainer('Evelyn', 'Lass', [new GymPokemon('Glameow', 10, 1)]), // Fluffy
        new ContestTrainer('Celeste', 'Ace Trainer', [new GymPokemon('Starly', 10, 1)], '(female)'), // Chirpy
        new ContestTrainer('Jakob', 'Rancher', [new GymPokemon('Shellos (West)', 10, 1)]), // Zoomer
    ],
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
        new ContestTrainer('Ultima', 'Ruin Maniac', [
            new GymPokemon('Marill', 100000000, 10, new QuestLineCompletedRequirement('How blu mouse?')),
            new GymPokemon('Pikachu', 100000000, 10, new QuestLineCompletedRequirement('How blu mouse?', GameConstants.AchievementOption.less)),
        ], 'gen3', {requirement: new SpecialEventRequirement('Hoopa Day')}), // Pikablu
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
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 100, 20)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 100, 20)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
        new ContestTrainer('Ultima', 'Ruin Maniac', [
            new GymPokemon('Marill', 100000000, 20, new QuestLineCompletedRequirement('How blu mouse?')),
            new GymPokemon('Pikachu', 100000000, 20, new QuestLineCompletedRequirement('How blu mouse?', GameConstants.AchievementOption.less)),
        ], 'gen3', {requirement: new SpecialEventRequirement('Hoopa Day')}), // Pikablu
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
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 120, 30)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 120, 30)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
        new ContestTrainer('Ultima', 'Ruin Maniac', [
            new GymPokemon('Marill', 100000000, 30, new QuestLineCompletedRequirement('How blu mouse?')),
            new GymPokemon('Pikachu', 100000000, 30, new QuestLineCompletedRequirement('How blu mouse?', GameConstants.AchievementOption.less)),
        ], 'gen3', {requirement: new SpecialEventRequirement('Hoopa Day')}), // Pikablu
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
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 120, 40)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 120, 40)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
        new ContestTrainer('Ultima', 'Ruin Maniac', [
            new GymPokemon('Marill', 100000000, 40, new QuestLineCompletedRequirement('How blu mouse?')),
            new GymPokemon('Pikachu', 100000000, 40, new QuestLineCompletedRequirement('How blu mouse?', GameConstants.AchievementOption.less)),
        ], 'gen3', {requirement: new SpecialEventRequirement('Hoopa Day')}), // Pikablu
    ],
    [ContestRank['Super Normal']]: [
        new ContestTrainer('Luis', 'Camper', [new GymPokemon('Pikachu', 20, 50)]), // Sparky
        new ContestTrainer('Lacey', 'Lass', [new GymPokemon('Barboach', 20, 50)]), // Whiskers
        new ContestTrainer('Connor', 'Ninja Boy', [new GymPokemon('Starly', 10, 50)]), // Flappy
        new ContestTrainer('Dakota', 'School Kid', [new GymPokemon('Bidoof', 20, 50)], '(female)'), // Dots
        new ContestTrainer('Gabriel', 'Artist', [new GymPokemon('Glameow', 30, 50)]), // Precious
        new ContestTrainer('Tiffany', 'Parasol Lady', [new GymPokemon('Shinx', 20, 50)]), // Flick
        new ContestTrainer('Westley', 'School Kid', [new GymPokemon('Psyduck', 20, 50)], '(male)'), // Dizzy
        new ContestTrainer('Anna', 'Picnicker', [new GymPokemon('Bonsly', 10, 50)]), // Sprout
        new ContestTrainer('Corey', 'School Kid', [new GymPokemon('Hoothoot', 20, 50)], '(male)'), // Hootie
        new ContestTrainer('Sara', 'Beauty', [new GymPokemon('Zubat', 10, 50)]), // Batty
        new ContestTrainer('Ian', 'Fisherman', [new GymPokemon('Shellos (West)', 20, 50)]), // Wiggy
        new ContestTrainer('Heather', 'Lass', [new GymPokemon('Cherubi', 20, 50)]), // Pit
        new ContestTrainer('Marcus', 'Psychic', [new GymPokemon('Mime Jr.', 20, 50)], '(male)'), // Merry
        new ContestTrainer('Erin', 'Aroma Lady', [new GymPokemon('Buizel', 20, 50)]), // Weasy
        new ContestTrainer('Shane', 'Scientist', [new GymPokemon('Bronzor', 10, 50)], '(male)'), // Wheelie
        new ContestTrainer('Marissa', 'Battle Girl', [new GymPokemon('Machop', 40, 50)]), // Choppy
        new ContestTrainer('Victor', 'Hiker', [new GymPokemon('Geodude', 10, 50)]), // Rocky
        new ContestTrainer('Brooke', 'School Kid', [new GymPokemon('Goldeen', 40, 50)], '(female)'), // Goldy
        new ContestTrainer('Tanner', 'Collector', [new GymPokemon('Clefairy', 10, 50)]), // Buffy
        new ContestTrainer('Renee', 'Lady', [new GymPokemon('Pachirisu', 10, 50)]), // Bucky
    ],
    [ContestRank['Super Great']]: [
        new ContestTrainer('Isaac', 'Pokémon Breeder', [new GymPokemon('Pikachu', 30, 60)], '(male)'), // Chewy
        new ContestTrainer('Alexus', 'Bird Keeper', [new GymPokemon('Hoothoot', 50, 60)]), // Hoots
        new ContestTrainer('Jorge', 'Pokéfan', [new GymPokemon('Geodude', 10, 60)], '(male)'), // Pebbles
        new ContestTrainer('Cora', 'Cowgirl', [new GymPokemon('Ponyta', 40, 60)]), // Blaze
        new ContestTrainer('Chase', 'Psychic', [new GymPokemon('Meditite', 50, 60)], '(male)'), // Ohm
        new ContestTrainer('Katie', 'Lass', [new GymPokemon('Psyduck', 30, 60)]), // Slappy
        new ContestTrainer('Dominic', 'Fisherman', [new GymPokemon('Barboach', 60, 60)]), // Beardy
        new ContestTrainer('Sierra', 'Parasol Lady', [new GymPokemon('Bidoof', 30, 60)]), // Gnawby
        new ContestTrainer('Keith', 'Guitarist', [new GymPokemon('Pachirisu', 20, 60)]), // Stripe
        new ContestTrainer('Julia', 'Cowgirl', [new GymPokemon('Shellos (West)', 30, 60)]), // Sluggo
        new ContestTrainer('Brendan', 'Sailor', [new GymPokemon('Goldeen', 30, 60)]), // Auric
        new ContestTrainer('Amy', 'Aroma Lady', [new GymPokemon('Stunky', 30, 60)]), // Stinky
        new ContestTrainer('Chad', 'Ruin Maniac', [new GymPokemon('Bronzor', 10, 60)]), // Saucy
        new ContestTrainer('Caitlin', 'Picnicker', [new GymPokemon('Mime Jr.', 70, 60)]), // Mimi
        new ContestTrainer('Martin', 'Camper', [new GymPokemon('Cherubi', 20, 60)]), // Cheri
        new ContestTrainer('Kathryn', 'Battle Girl', [new GymPokemon('Onix', 40, 60)]), // Flex
        new ContestTrainer('Randal', 'Ninja Boy', [new GymPokemon('Misdreavus', 60, 60)]), // Missy
        new ContestTrainer('Sidney', 'Bird Keeper', [new GymPokemon('Starly', 50, 60)]), // Happy
        new ContestTrainer('Xavier', 'Artist', [new GymPokemon('Chingling', 50, 60)]), // Chimer
        new ContestTrainer('Monica', 'Lady', [new GymPokemon('Glameow', 60, 60)]), // Glimmer
    ],
    [ContestRank['Super Ultra']]: [
        new ContestTrainer('Frank', 'Ace Trainer', [new GymPokemon('Pikachu', 100, 70)], '(male)'), // Piki
        new ContestTrainer('Leah', 'Aroma Lady', [new GymPokemon('Clefairy', 70, 70)]), // Blingy
        new ContestTrainer('Julian', 'Jogger', [new GymPokemon('Machop', 60, 70)]), // Kata
        new ContestTrainer('Bianca', 'Cowgirl', [new GymPokemon('Ponyta', 80, 70)]), // Flash
        new ContestTrainer('Mario', 'Ninja Boy', [new GymPokemon('Gastly', 50, 70)]), // Spooky
        new ContestTrainer('Lara', 'Madame', [new GymPokemon('Onix', 70, 70)]), // Gem
        new ContestTrainer('Alan', 'Rancher', [new GymPokemon('Hoothoot', 80, 70)]), // Brainy
        new ContestTrainer('Bria', 'Ace Trainer', [new GymPokemon('Murkrow', 40, 70)], '(female)'), // Ebony
        new ContestTrainer('Collin', 'Ace Trainer', [new GymPokemon('Misdreavus', 130, 70)], '(male)'), // Malice
        new ContestTrainer('Alexis', 'Psychic', [new GymPokemon('Meditite', 120, 70)], '(female)'), // Ponder
        new ContestTrainer('Andre', 'Camper', [new GymPokemon('Budew', 70, 70)]), // Buddy
        new ContestTrainer('Bridget', 'Beauty', [new GymPokemon('Chatot', 100, 70)]), // Tweety
        new ContestTrainer('Damien', 'Artist', [new GymPokemon('Chingling', 80, 70)]), // Jangle
        new ContestTrainer('Kara', 'Battle Girl', [new GymPokemon('Bronzor', 120, 70)]), // Bronzy
        new ContestTrainer('Angus', 'Sailor', [new GymPokemon('Bonsly', 60, 70)]), // Chokkan
        new ContestTrainer('Kiana', 'Ace Trainer', [new GymPokemon('Zubat', 90, 70)], '(female)'), // Midnight
        new ContestTrainer('Jonesy', 'Collector', [new GymPokemon('Pichu', 80, 70)]), // Sweetie
        new ContestTrainer('Hayley', 'Cowgirl', [new GymPokemon('Buneary', 140, 70)]), // Floppy
        new ContestTrainer('Alfredo', 'Ace Trainer', [new GymPokemon('Stunky', 100, 70)], '(male)'), // Honey
        new ContestTrainer('Bailey', 'Picnicker', [new GymPokemon('Happiny', 80, 70)]), // Baby
    ],
    [ContestRank['Super Master']]: [
        new ContestTrainer('Josiah', 'Ace Trainer', [new GymPokemon('Pikachu', 40, 80)], '(male)'), // Ziggy
        new ContestTrainer('Carly', 'Aroma Lady', [new GymPokemon('Clefairy', 120, 80)]), // Bumbles
        new ContestTrainer('Bryant', 'Ace Trainer', [new GymPokemon('Machop', 110, 80)], '(male)'), // Chopper
        new ContestTrainer('Nancy', 'Beauty', [new GymPokemon('Gastly', 120, 80)]), // Boo
        new ContestTrainer('Zackery', 'Artist', [new GymPokemon('Turtwig', 100, 80)]), // Speedy
        new ContestTrainer('Tanya', 'Pokéfan', [new GymPokemon('Chimchar', 100, 80)], '(female)'), // Chimpy
        new ContestTrainer('Elias', 'Ace Trainer', [new GymPokemon('Piplup', 140, 80)], '(male)'), // Penny
        new ContestTrainer('Marisa', 'Aroma Lady', [new GymPokemon('Shieldon', 100, 80)]), // Rampy
        new ContestTrainer('Kelvin', 'Sailor', [new GymPokemon('Buizel', 140, 80)]), // Zippy
        new ContestTrainer('Chloe', 'Lady', [new GymPokemon('Chatot', 90, 80)]), // Bebop
        new ContestTrainer('Rodney', 'Collector', [new GymPokemon('Bonsly', 80, 80)]), // Twigs
        new ContestTrainer('Hailey', 'Parasol Lady', [new GymPokemon('Mime Jr.', 90, 80)]), // Moppet
        new ContestTrainer('Kaleb', 'Pokéfan', [new GymPokemon('Hoothoot', 40, 80)], '(male)'), // Strix
        new ContestTrainer('Ashlyn', 'Ace Trainer', [new GymPokemon('Murkrow', 90, 80)], '(female)'), // Murky
        new ContestTrainer('Alberto', 'Artist', [new GymPokemon('Meditite', 140, 80)]), // Noodle
        new ContestTrainer('', 'Fantina', [new GymPokemon('Drifblim', 230, 80)]), // Loony
        new ContestTrainer('Johanna', 'Contest Champion', [new GymPokemon('Kangaskhan', 180, 80)], '(Johanna)'), // Jumpy
        new ContestTrainer('Kristin', 'Reporter', [new GymPokemon('Magneton', 80, 80)]), // Jolt
        new ContestTrainer('Casey', 'Nurse', [new GymPokemon('Chansey', 90, 80)]), // Pinky
        new ContestTrainer('', 'Jasmine', [new GymPokemon('Steelix', 210, 80)]), // Rusty
    ],
    [ContestRank.Spectacular]: [
        // Normal
        new ContestTrainer('Micah', 'Youngster', [new GymPokemon('Poochyena', 24, 90)]), // Poochin
        new ContestTrainer('Shannon', 'Lady', [new GymPokemon('Zigzagoon', 10, 90)]), // Gonzer
        new ContestTrainer('Mateo', 'Bug Catcher', [new GymPokemon('Dustox', 12, 90)]), // Nox
        new ContestTrainer('Jordyn', 'School Kid', [new GymPokemon('Seedot', 22, 90)], '(female)'), // Seedottie
        new ContestTrainer('Gianna', 'Lass', [new GymPokemon('Taillow', 20, 90)]), // Tailster
        new ContestTrainer('Declan', 'Ninja Boy', [new GymPokemon('Nincada', 17, 90)]), // Ninny
        new ContestTrainer('Carlton', 'School Kid', [new GymPokemon('Shroomish', 20, 90)], '(male)'), // Shrewmish
        new ContestTrainer('Adeine', 'Tuber', [new GymPokemon('Wingull', 31, 90)], '(female)'), // Win
        new ContestTrainer('Asher', 'Pokéfan', [new GymPokemon('Slakoth', 42, 90)], '(male)'), // Visikoth
        new ContestTrainer('Lauren', 'Pokéfan', [new GymPokemon('Whismur', 28, 90)], '(female)'), // Whizz
        new ContestTrainer('Jeremiah', 'Black Belt', [new GymPokemon('Makuhita', 32, 90)]), // Makuwaku
        new ContestTrainer('Molly', 'Picnicker', [new GymPokemon('Aron', 34, 90)]), // Ronnie
        new ContestTrainer('Martinus', 'Camper', [new GymPokemon('Zubat', 22, 90)]), // Zoonby
        new ContestTrainer('Liliana', 'Aroma Lady', [new GymPokemon('Gulpin', 22, 90)]), // Guligan
        new ContestTrainer('Camden', 'Guitarist', [new GymPokemon('Electrike', 44, 90)]), // Bolt
        // Super
        new ContestTrainer('Keira', 'Aroma Lady', [new GymPokemon('Roselia', 76, 90)]), // Rosalie
        new ContestTrainer('Bentley', 'Bird Keeper', [new GymPokemon('Doduo', 76, 90)]), // Dodon't
        new ContestTrainer('Plum', 'Lass', [new GymPokemon('Trapinch', 43, 90)]), // Tracy
        new ContestTrainer('Zacahry', 'Pokémon Breeder', [new GymPokemon('Cacnea', 42, 90)], '(male)'), // Succulus
        new ContestTrainer('Alyssa', 'Picnicker', [new GymPokemon('Sandshrew', 50, 90)]), // Sandyclaws
        new ContestTrainer('Brody', 'Ruin Maniac', [new GymPokemon('Baltoy', 60, 90)]), // Baltop
        new ContestTrainer('Mila', 'Parasol Lady', [new GymPokemon('Numel', 60, 90)]), // Mel
        new ContestTrainer('Rohan', 'Camper', [new GymPokemon('Spinda', 83, 90)]), // Spinmaster
        new ContestTrainer('Alaina', 'Lady', [new GymPokemon('Swablu', 81, 80)]), // Swellbell
        new ContestTrainer('Levi', 'Triathlete', [new GymPokemon('Linoone', 88, 90)], '(maleswimming)'), // Noone
        new ContestTrainer('Gabriella', 'Ace Trainer', [new GymPokemon('Kecleon', 94, 90)], '(female)'), // Leon
        new ContestTrainer('Dominic', 'School Kid', [new GymPokemon('Corphish', 67, 90)], '(male)'), // Snip
        new ContestTrainer('Kaitlyn', 'Pokémon Breeder', [new GymPokemon('Barboach', 85, 90)], '(female)'), // Barbra
        new ContestTrainer('Tyler', 'Psychic', [new GymPokemon('Spoink', 82, 90)], '(male)'), // Spearl
        new ContestTrainer('Adalyn', 'Pokémon Ranger', [new GymPokemon('Lotad', 56, 90)], '(female)'), // Tad
        // Hyper
        new ContestTrainer('Landon', 'Pokémaniac', [new GymPokemon('Lairon', 205, 90)]), // Wonwon
        new ContestTrainer('Mckenzie', 'Pokémon Ranger', [new GymPokemon('Nuzleaf', 235, 90)], '(female)'), // Nuzlad
        new ContestTrainer('Nelson', 'Ninja Boy', [new GymPokemon('Ninjask', 78, 90)]), // Ninjackie
        new ContestTrainer('Riley', 'Lady', [new GymPokemon('Swellow', 74, 90)]), // Wollew
        new ContestTrainer('Nathan', 'Gentleman', [new GymPokemon('Mightyena', 84, 90)]), // Mighty
        new ContestTrainer('Twyla', 'Beauty', [new GymPokemon('Beautifly', 128, 90)]), // Papi
        new ContestTrainer('Gavin', 'Fisherman', [new GymPokemon('Seaking', 190, 90)]), // The King
        new ContestTrainer('Lily', 'Parasol Lady', [new GymPokemon('Camerupt', 230, 90)]), // Camelot
        new ContestTrainer('Primo', 'Hiker', [new GymPokemon('Machop', 170, 90)]), // Chopchop
        new ContestTrainer('Alejandra', 'Pokémon Breeder', [new GymPokemon('Lombre', 200, 90)], '(female)'), // Nombre
        new ContestTrainer('Yoshinari', 'Collector', [new GymPokemon('Seviper', 213, 90)]), // Crawly
        new ContestTrainer('Lacy', 'Tuber', [new GymPokemon('Wailmer', 84, 90)], '(female)'), // Bobble
        new ContestTrainer('Owen', 'Swimmer', [new GymPokemon('Magikarp', 270, 90)], '(male)'), // Magi
        new ContestTrainer('Addison', 'Hex Maniac', [new GymPokemon('Lunatone', 128, 90)]), // Moony
        new ContestTrainer('Jayce', 'Sailor', [new GymPokemon('Pelipper', 104, 90)]), // Piper
        // Master
        new ContestTrainer('Yoko', 'Delinquent', [new GymPokemon('Gyarados', 382, 90)]), // Gyalaxy
        new ContestTrainer('Jeff', 'Guitarist', [new GymPokemon('Loudred', 174, 90)]), // Louduff
        new ContestTrainer('Elsie', 'Pokéfan', [new GymPokemon('Delcatty', 166, 90)], '(female)'), // Mione
        new ContestTrainer('Jaylon', 'Expert', [new GymPokemon('Slaking', 403, 90)]), // Slacker
        new ContestTrainer('Layla', 'Free Diver', [new GymPokemon('Gorebyss', 194, 90)]), // Gorflir
        new ContestTrainer('Ruslan', 'Psychic', [new GymPokemon('Kirlia', 186, 90)], '(male)'), // Lia
        new ContestTrainer('Lilias', 'Aroma Lady', [new GymPokemon('Vileplume', 170, 90)]), // Plumette
        new ContestTrainer('Aiden', 'Street Thug', [new GymPokemon('Dusclops', 289, 90)]), // Topclops
        new ContestTrainer('Madelyn', 'Beauty', [new GymPokemon('Illumise', 346, 90)]), // Princess
        new ContestTrainer('Elijah', 'Sailor', [new GymPokemon('Sharpedo', 380, 90)]), // Shargob
        new ContestTrainer('Hailey', 'Swimmer', [new GymPokemon('Luvdisc', 384, 90)], '(female)'), // Lovelynn
        new ContestTrainer('Clayton', 'Black Belt', [new GymPokemon('Heracross', 274, 90)]), // Heracles
        new ContestTrainer('Audrey', 'Lass', [new GymPokemon('Electrode', 358, 90)]), // Trode
        new ContestTrainer('Evan', 'Pokéfan', [new GymPokemon('Pichu', 208, 90)], '(male)'), // Pinchurlink
        new ContestTrainer('Julia', 'Fairy Tale Girl', [new GymPokemon('Wobbuffet', 256, 90)]), // Elizabeth
        new ContestTrainer('Chaz', 'Rich Boy', [new GymPokemon('Machoke', 355, 90)]), // Macherie
        new ContestTrainer('', 'Wallace', [new GymPokemon('Milotic', 320, 90)]),
        // Lisia - TODO: Mega Altaria
        new ContestTrainer('', 'Lisia', [
            new GymPokemon('Altaria', 378, 90), // Cool
            new GymPokemon('Altaria', 388, 90), // Beautiful
            new GymPokemon('Altaria', 388, 90), // Cute
            new GymPokemon('Altaria', 378, 90), // Smart
            new GymPokemon('Altaria', 368, 90), // Tough
        ]), // Ali
        // Event
        new ContestTrainer('Red', 'Juggler', [new GymPokemon('Red Spearow', 300, 40)], undefined, {requirement: new SpecialEventRequirement('Flying Pikachu')}), // Sparrow
        new ContestTrainer('Dice', 'Painter', [new GymPokemon('Bulbasaur (Rose)', 300, 40)], undefined, {requirement: new SpecialEventRequirement('Golden Week')}), // Nice
        new ContestTrainer('Ultima', 'Ruin Maniac', [
            new GymPokemon('Marill', 100000000, 40, new QuestLineCompletedRequirement('How blu mouse?')),
            new GymPokemon('Pikachu', 100000000, 40, new QuestLineCompletedRequirement('How blu mouse?', GameConstants.AchievementOption.less)),
        ], 'gen3', {requirement: new SpecialEventRequirement('Hoopa Day')}), // Pikablu
    ],
    [ContestRank['Brilliant Shining']]: [
        new ContestTrainer('Luis', 'Camper', [new GymPokemon('Pikachu', 180, 100)]), // Sparky
        new ContestTrainer('', 'Fantina', [new GymPokemon('Drifblim', 970, 100)]), // Loony
        new ContestTrainer('Johanna', 'Contest Champion', [new GymPokemon('Kangaskhan', 780, 100)], '(Johanna)'), // Jumpy
        new ContestTrainer('', 'Jasmine', [new GymPokemon('Steelix', 970, 100)]), // Rusty
    ],
};
