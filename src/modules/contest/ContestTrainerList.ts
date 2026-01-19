import BadgeEnums from '../enums/Badges';
import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import { AchievementOption, BattlePokemonGender } from '../GameConstants';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import WeatherRequirement from '../requirements/WeatherRequirement';
import WeatherType from '../weather/WeatherType';
import ContestPokemon from './ContestPokemon';
import ContestTrainer from './ContestTrainer';

export default class ContestTrainerList {
    public static ContestOpponents: Partial<Record<ContestRank, ContestTrainer[]>> = {
        // Hoenn Contests
        [ContestRank.Normal]: [
            new ContestTrainer('Agatha', 'Aroma Lady', [new ContestPokemon('Bulbasaur', 'Bulby', [ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Smart, ContestType.Tough, ContestType.Cute])]),
            new ContestTrainer('Alec', 'Camper', [new ContestPokemon('Slakoth', 'Slokth', [ContestType.Beautiful, ContestType.Cute, ContestType.Tough], [ContestType.Tough, ContestType.Tough, ContestType.Cute, ContestType.Cute])]),
            new ContestTrainer('Beau', 'Hex Maniac', [new ContestPokemon('Butterfree', 'Futterbe', [ContestType.Beautiful, ContestType.Smart], [ContestType.Smart, ContestType.Smart, ContestType.Beautiful, ContestType.Beautiful], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Caitlin', 'Tuber', [new ContestPokemon('Poliwag', 'Wagil', [ContestType.Beautiful, ContestType.Tough], [ContestType.Beautiful, ContestType.Tough, ContestType.Tough, ContestType.Beautiful])], '(female)'),
            new ContestTrainer('Cale', 'Ruin Maniac', [new ContestPokemon('Diglett', 'Digle', [ContestType.Smart, ContestType.Tough], [ContestType.Smart, ContestType.Tough, ContestType.Tough, ContestType.Tough])]),
            new ContestTrainer('Chance', 'Rich Boy', [
                new ContestPokemon('Electrike', 'Rikelec', [ContestType.Beautiful], [ContestType.Cool, ContestType.Cool, ContestType.Cool, ContestType.Cool], new GymBadgeRequirement(BadgeEnums.Dynamo, AchievementOption.less)),
                new ContestPokemon('Manectric', 'Rikelec', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Cool, ContestType.Cool, ContestType.Cool], new GymBadgeRequirement(BadgeEnums.Dynamo)),
            ]),
            new ContestTrainer('Colby', 'Ninja Boy', [new ContestPokemon('Totodile', 'Totdil', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Smart, ContestType.Beautiful, ContestType.Beautiful])]),
            new ContestTrainer('Edith', 'Parasol Lady', [
                new ContestPokemon('Zigzagoon', 'Zigoon', [ContestType.Cute], [ContestType.Cute, ContestType.Cute, ContestType.Tough, ContestType.Cute]),
                new ContestPokemon('Illumise', 'Musille', [ContestType.Beautiful, ContestType.Cute], [ContestType.Cute, ContestType.Cute, ContestType.Tough, ContestType.Cute]),
            ]),
            new ContestTrainer('Evan', 'Bug Catcher', [new ContestPokemon('Dustox', 'Duster', [ContestType.Beautiful], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart], undefined, BattlePokemonGender.Male)], 'gen4'),
            new ContestTrainer('Grant', 'Youngster', [new ContestPokemon('Shroomish', 'Smish', [ContestType.Smart], [ContestType.Smart, ContestType.Smart, ContestType.Smart, ContestType.Cute])]),
            new ContestTrainer('Jimmy', 'Preschooler', [new ContestPokemon('Poochyena', 'Poochy', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Tough, ContestType.Tough, ContestType.Cool])], '(male)'),
            new ContestTrainer('Kay', 'Cooltrainer', [new ContestPokemon('Pidgeotto', 'Pideot', [ContestType.Cool, ContestType.Beautiful], [ContestType.Smart, ContestType.Cool, ContestType.Cool, ContestType.Beautiful])], '(female)'),
            new ContestTrainer('Kelsey', 'Picnicker', [new ContestPokemon('Seedot', 'Dots', [ContestType.Smart, ContestType.Tough], [ContestType.Tough, ContestType.Smart, ContestType.Cool, ContestType.Beautiful])]),
            new ContestTrainer('Kylie', 'Beauty', [new ContestPokemon('Ledyba', 'Baledy', [ContestType.Cool, ContestType.Cute], [ContestType.Cute, ContestType.Cool, ContestType.Cool, ContestType.Cute], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Liam', 'Bird Keeper', [new ContestPokemon('Delibird', 'Birdly', [ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Cute, ContestType.Cute, ContestType.Tough, ContestType.Cute])], 'gen3'),
            new ContestTrainer('Madison', 'Pokéfan', [new ContestPokemon('Taillow', 'Tatay', [ContestType.Cool], [ContestType.Cool, ContestType.Cool, ContestType.Cool, ContestType.Cute])], 'gen4 (female)'),
            new ContestTrainer('Mariah', 'School Kid', [new ContestPokemon('Aron', 'Ronar', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Tough, ContestType.Tough, ContestType.Tough])], '(female)'),
            new ContestTrainer('Melanie', 'Twin', [new ContestPokemon('Gulpin', 'Gulin', [ContestType.Cute], [ContestType.Tough, ContestType.Cute, ContestType.Smart, ContestType.Cute], undefined, BattlePokemonGender.Male)], 'left frlg'),
            new ContestTrainer('Milo', 'PokéManiac', [new ContestPokemon('Larvitar', 'Tarvitar', [ContestType.Tough], [ContestType.Tough, ContestType.Tough, ContestType.Tough, ContestType.Smart])]),
            new ContestTrainer('Morris', 'School Kid', [new ContestPokemon('Makuhita', 'Mahita', [ContestType.Cool, ContestType.Tough], [ContestType.Tough, ContestType.Cool, ContestType.Tough, ContestType.Cool])], '(male)'),
            new ContestTrainer('Paige', 'Young Couple', [
                new ContestPokemon('Wingull', 'Gulwee', [ContestType.Cute], [ContestType.Beautiful, ContestType.Cute, ContestType.Cute, ContestType.Smart]),
                new ContestPokemon('Spheal', 'Sleal', [ContestType.Beautiful], [ContestType.Beautiful, ContestType.Cute, ContestType.Cute, ContestType.Smart]),
            ], '(female)'),
            new ContestTrainer('Raymond', 'Black Belt', [new ContestPokemon('Nincada', 'Ninda', [ContestType.Smart], [ContestType.Smart, ContestType.Cool, ContestType.Tough, ContestType.Smart])]),
            new ContestTrainer('Russell', 'Cooltrainer', [
                new ContestPokemon('Zubat', 'Zutzu', [ContestType.Cute, ContestType.Smart], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart, ContestType.Smart], undefined, BattlePokemonGender.Male),
                new ContestPokemon('Crobat', 'Batro', [ContestType.Beautiful, ContestType.Cute], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart, ContestType.Smart]),
            ], '(male)'),
            new ContestTrainer('Sydney', 'Lass', [new ContestPokemon('Whismur', 'Whiris', [ContestType.Cool, ContestType.Smart], [ContestType.Smart, ContestType.Smart, ContestType.Cute, ContestType.Cool])]),
        ],
        [ContestRank.Super]: [
            new ContestTrainer('Aliyah', 'Nurse', [new ContestPokemon('Blissey', 'Bliss', [ContestType.Beautiful, ContestType.Cute, ContestType.Tough], [ContestType.Cute, ContestType.Beautiful, ContestType.Tough, ContestType.Tough])]),
            new ContestTrainer('Ariana', 'Reporter', [new ContestPokemon('Kecleon', 'Kecon', [ContestType.Smart, ContestType.Tough], [ContestType.Tough, ContestType.Smart, ContestType.Tough, ContestType.Tough])]),
            new ContestTrainer('Ashton', 'Cooltrainer', [new ContestPokemon('Goldeen', 'Golden', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Cool, ContestType.Cool, ContestType.Cute], undefined, BattlePokemonGender.Male)], '(male)'),
            new ContestTrainer('Audrey', 'Lass', [new ContestPokemon('Swablu', 'Swaby', [ContestType.Beautiful, ContestType.Smart], [ContestType.Smart, ContestType.Beautiful, ContestType.Beautiful, ContestType.Beautiful])]),
            new ContestTrainer('Avery', 'School Kid', [
                new ContestPokemon('Linoone', 'Noone', [ContestType.Beautiful, ContestType.Cute], [ContestType.Cute, ContestType.Cute, ContestType.Cute, ContestType.Cute]),
                new ContestPokemon('Spoink', 'Poinker', [ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Smart, ContestType.Cute, ContestType.Cute]),
            ], '(male)'),
            new ContestTrainer('Bobby', 'Triathlete', [
                new ContestPokemon('Doduo', 'Duodo', [ContestType.Cool, ContestType.Cute], [ContestType.Cool, ContestType.Cool, ContestType.Cute, ContestType.Cute], new GymBadgeRequirement(BadgeEnums.Balance, AchievementOption.less), BattlePokemonGender.Female),
                new ContestPokemon('Dodrio', 'Duodo', [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Cool, ContestType.Cool, ContestType.Cute, ContestType.Cute], new GymBadgeRequirement(BadgeEnums.Balance), BattlePokemonGender.Female),
            ], 'gen3 (maleswimming)'),
            new ContestTrainer('Carson', 'Youngster', [new ContestPokemon('Skarmory', 'Corpy', [ContestType.Cool, ContestType.Beautiful, ContestType.Tough], [ContestType.Cool, ContestType.Cool, ContestType.Cool, ContestType.Cool])]),
            new ContestTrainer('Cassidy', 'Pokéfan', [
                new ContestPokemon('Sandshrew', 'Shrand', [ContestType.Cool], [ContestType.Cool, ContestType.Cute, ContestType.Cool, ContestType.Tough], new GymBadgeRequirement(BadgeEnums.Balance, AchievementOption.less)),
                new ContestPokemon('Sandslash', 'Shrand', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Cute, ContestType.Cool, ContestType.Tough], new GymBadgeRequirement(BadgeEnums.Balance)),
            ], 'gen4 (female)'),
            new ContestTrainer('Claire', 'Picnicker', [new ContestPokemon('Trapinch', 'Pinchin', [ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Tough, ContestType.Cute, ContestType.Smart, ContestType.Smart])]),
            new ContestTrainer('Devin', 'Gentleman', [new ContestPokemon('Snubbull', 'Snubbins', [ContestType.Cute, ContestType.Tough], [ContestType.Tough, ContestType.Smart, ContestType.Cute, ContestType.Tough])]),
            new ContestTrainer('Diego', 'Veteran', [new ContestPokemon('Hitmonchan', 'Hitemon', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Cool, ContestType.Tough, ContestType.Tough])], '(male)'),
            new ContestTrainer('Jada', 'Lady', [new ContestPokemon('Seel', 'Seeley', [ContestType.Beautiful, ContestType.Cute], [ContestType.Cute, ContestType.Beautiful, ContestType.Beautiful, ContestType.Cute])]),
            new ContestTrainer('Karina', 'Pokemon Ranger', [new ContestPokemon('Roselia', 'Relia', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart, ContestType.Smart], undefined, BattlePokemonGender.Male)], '(female)'),
            new ContestTrainer('Katrina', 'Parasol Lady', [new ContestPokemon('Lotad', 'Tado', [ContestType.Beautiful, ContestType.Cute, ContestType.Smart], [ContestType.Smart, ContestType.Cute, ContestType.Tough, ContestType.Beautiful])]),
            new ContestTrainer('Luke', 'Collector', [new ContestPokemon('Slowbro', 'Browlo', [ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Smart, ContestType.Cute, ContestType.Smart])]),
            new ContestTrainer('Miles', 'Pokémon Ranger', [new ContestPokemon('Spinda', 'Spinin', [ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Smart, ContestType.Smart, ContestType.Cute])], '(male)'),
            new ContestTrainer('Morgan', 'Black Belt', [new ContestPokemon('Baltoy', 'Toybal', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Smart, ContestType.Beautiful, ContestType.Smart])]),
            new ContestTrainer('Natalia', 'Pokéfan', [new ContestPokemon('Elekid', 'Kidlek', [ContestType.Cool, ContestType.Cute], [ContestType.Cool, ContestType.Cool, ContestType.Smart, ContestType.Cute])], '(female)'),
            new ContestTrainer('Raul', 'Bird Keeper', [new ContestPokemon('Farfetch\'d', 'Fetchin', [ContestType.Cool, ContestType.Cute], [ContestType.Cute, ContestType.Cool, ContestType.Smart, ContestType.Cute])]),
            new ContestTrainer('Sandra', 'Twin', [new ContestPokemon('Barboach', 'Boboach', [ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Cute, ContestType.Cute, ContestType.Tough, ContestType.Smart])], 'right frlg'),
            new ContestTrainer('Summer', 'Office Worker', [
                new ContestPokemon('Medicham', 'Chamcham', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Cool, ContestType.Beautiful, ContestType.Beautiful], undefined, BattlePokemonGender.Female),
                new ContestPokemon('Numel', 'Lenum', [ContestType.Cool, ContestType.Beautiful], [ContestType.Tough, ContestType.Tough, ContestType.Beautiful, ContestType.Beautiful], undefined, BattlePokemonGender.Female),
            ], '(female)'),
            new ContestTrainer('Tylor', 'Hex Maniac', [new ContestPokemon('Misdreavus', 'Dreavis', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart, ContestType.Smart])]),
            new ContestTrainer('Willie', 'Ninja Boy', [new ContestPokemon('Cacnea', 'Nacac', [ContestType.Cool, ContestType.Smart], [ContestType.Smart, ContestType.Cool, ContestType.Smart, ContestType.Cute])]),
            new ContestTrainer('Zeek', 'Psychic', [new ContestPokemon('Drowzee', 'Drowzin', [ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Smart, ContestType.Smart, ContestType.Smart, ContestType.Cute])], '(male)'),
        ],
        [ContestRank.Hyper]: [
            new ContestTrainer('Alisha', 'Young Couple', [new ContestPokemon('Beautifly', 'Tifly', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart, ContestType.Smart], undefined, BattlePokemonGender.Female)], '(female)'),
            new ContestTrainer('Bryce', 'Bug Catcher', [new ContestPokemon('Pineco', 'Pinoc', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Smart, ContestType.Beautiful, ContestType.Smart])]),
            new ContestTrainer('Claudia', 'Picnicker', [
                new ContestPokemon('Nuzleaf', 'Nuzle', [ContestType.Cool], [ContestType.Beautiful, ContestType.Cool, ContestType.Beautiful, ContestType.Cool], undefined, BattlePokemonGender.Male),
                new ContestPokemon('Shiftry', 'Shifty', [ContestType.Beautiful], [ContestType.Beautiful, ContestType.Cool, ContestType.Beautiful, ContestType.Cool], undefined, BattlePokemonGender.Male),
            ]),
            new ContestTrainer('Coltin', 'Pokémon Breeder', [new ContestPokemon('Cubone', 'Cubin', [ContestType.Cute, ContestType.Tough], [ContestType.Tough, ContestType.Tough, ContestType.Tough, ContestType.Cute])], '(male)'),
            new ContestTrainer('Corbin', 'Collector', [
                new ContestPokemon('Pelipper', 'Pelipe', [ContestType.Beautiful], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Cool, ContestType.Cool]),
                new ContestPokemon('Absol', 'Abso', [ContestType.Cool], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Cool, ContestType.Cool]),
            ], 'gen3'),
            new ContestTrainer('Darryl', 'Cooltrainer', [new ContestPokemon('Seviper', 'Vipes', [ContestType.Cool, ContestType.Smart], [ContestType.Smart, ContestType.Tough, ContestType.Tough, ContestType.Smart])], '(male)'),
            new ContestTrainer('Devon', 'Pokéfan', [new ContestPokemon('Miltank', 'Milkan', [ContestType.Beautiful, ContestType.Cute], [ContestType.Cute, ContestType.Beautiful, ContestType.Cute, ContestType.Beautiful])], '(male)'),
            new ContestTrainer('Elias', 'Ninja Boy', [new ContestPokemon('Ninjask', 'Ninas', [ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Smart, ContestType.Tough, ContestType.Cute, ContestType.Cute])]),
            new ContestTrainer('Ellie', 'Veteran', [new ContestPokemon('Hitmonlee', 'Hitmon', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Tough, ContestType.Cool, ContestType.Cool])], '(female)'),
            new ContestTrainer('Emilio', 'School Kid', [
                new ContestPokemon('Machop', 'Chopam', [ContestType.Tough], [ContestType.Tough, ContestType.Cool, ContestType.Tough, ContestType.Tough]),
                new ContestPokemon('Machoke', 'Chokem', [ContestType.Cool], [ContestType.Tough, ContestType.Cool, ContestType.Tough, ContestType.Tough]),
            ], '(male)'),
            new ContestTrainer('Felicia', 'Lass', [
                new ContestPokemon('Camerupt', 'Erupam', [ContestType.Cool, ContestType.Beautiful], [ContestType.Tough, ContestType.Tough, ContestType.Beautiful, ContestType.Cool]),
                new ContestPokemon('Castform', 'Caster', [ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Beautiful, ContestType.Smart, ContestType.Tough, ContestType.Cute], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sandstorm, WeatherType.Windy])),
                new ContestPokemon('Castform (Sunny)', 'Caster', [ContestType.Cute], [ContestType.Beautiful, ContestType.Smart, ContestType.Tough, ContestType.Cute], new WeatherRequirement([WeatherType.Harsh_Sunlight])),
                new ContestPokemon('Castform (Rainy)', 'Caster', [ContestType.Smart], [ContestType.Beautiful, ContestType.Smart, ContestType.Tough, ContestType.Cute], new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])),
                new ContestPokemon('Castform (Snowy)', 'Caster', [ContestType.Tough], [ContestType.Beautiful, ContestType.Smart, ContestType.Tough, ContestType.Cute], new WeatherRequirement([WeatherType.Hail, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Fog])),
            ]),
            new ContestTrainer('Francis', 'Black Belt', [new ContestPokemon('Mightyena', 'Yena', [ContestType.Cool, ContestType.Smart], [ContestType.Smart, ContestType.Tough, ContestType.Smart, ContestType.Tough])]),
            new ContestTrainer('Gracie', 'Pokemon Ranger', [new ContestPokemon('Exeggutor', 'Eggsor', [ContestType.Smart, ContestType.Tough], [ContestType.Tough, ContestType.Smart, ContestType.Tough, ContestType.Smart])], '(female)'),
            new ContestTrainer('Jade', 'Pokéfan', [new ContestPokemon('Swellow', 'Welow', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Cool, ContestType.Cool, ContestType.Smart])], '(female)'),
            new ContestTrainer('Jamie', 'Cooltrainer', [new ContestPokemon('Dunsparce', 'Diltot', [ContestType.Cute, ContestType.Tough], [ContestType.Tough, ContestType.Cute, ContestType.Cute, ContestType.Smart])], '(female)'),
            new ContestTrainer('Jorge', 'Gentleman', [new ContestPokemon('Houndoom', 'Doomond', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Beautiful, ContestType.Smart, ContestType.Beautiful], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Karla', 'Tuber', [new ContestPokemon('Lombre', 'Lombe', [ContestType.Beautiful, ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Beautiful, ContestType.Cute, ContestType.Cute])], '(female)'),
            new ContestTrainer('Kiara', 'School Kid', [new ContestPokemon('Kangaskhan', 'Khankan', [ContestType.Cool, ContestType.Cute], [ContestType.Tough, ContestType.Cool, ContestType.Tough, ContestType.Cute])], '(female)'),
            new ContestTrainer('Lacey', 'Psychic', [new ContestPokemon('Lunatone', 'Lunone', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Smart, ContestType.Smart, ContestType.Smart])], '(female)'),
            new ContestTrainer('Marcus', 'Sailor', [new ContestPokemon('Squirtle', 'Surtle', [ContestType.Cute, ContestType.Tough], [ContestType.Cute, ContestType.Cute, ContestType.Tough, ContestType.Cute])]),
            new ContestTrainer('Noel', 'Youngster', [new ContestPokemon('Magikarp', 'Karpag', [ContestType.Cute, ContestType.Tough], [ContestType.Tough, ContestType.Cute, ContestType.Cute, ContestType.Tough], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Ronnie', 'Hiker', [new ContestPokemon('Lairon', 'Lairn', [ContestType.Smart, ContestType.Tough], [ContestType.Smart, ContestType.Cool, ContestType.Tough, ContestType.Tough])]),
            new ContestTrainer('Saul', 'Camper', [new ContestPokemon('Seaking', 'Kingsea', [ContestType.Cool, ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Cute, ContestType.Smart, ContestType.Cool, ContestType.Cool], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Selena', 'Madame', [new ContestPokemon('Wailmer', 'Merail', [ContestType.Beautiful, ContestType.Cute], [ContestType.Beautiful, ContestType.Cute, ContestType.Beautiful, ContestType.Cute])]),
        ],
        [ContestRank.Master]: [
            new ContestTrainer('Aubrey', 'Young Couple', [
                new ContestPokemon('Vileplume', 'Plumile', [ContestType.Beautiful, ContestType.Cute], [ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Beautiful], undefined, BattlePokemonGender.Male),
                new ContestPokemon('Bellossom', 'Blossom', [ContestType.Cute, ContestType.Smart], [ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Beautiful]),
            ], '(female)'),
            new ContestTrainer('Camile', 'Hex Maniac', [new ContestPokemon('Gengar', 'Garen', [ContestType.Cool, ContestType.Tough], [ContestType.Smart, ContestType.Smart, ContestType.Tough, ContestType.Tough])]),
            new ContestTrainer('Camille', 'Psychic', [
                new ContestPokemon('Natu', 'Utan', [ContestType.Cute, ContestType.Smart], [ContestType.Smart, ContestType.Smart, ContestType.Smart, ContestType.Smart], new GymBadgeRequirement(BadgeEnums.Mind, AchievementOption.less)),
                new ContestPokemon('Xatu', 'Utan', [ContestType.Beautiful, ContestType.Cute, ContestType.Smart], [ContestType.Smart, ContestType.Smart, ContestType.Smart, ContestType.Smart], new GymBadgeRequirement(BadgeEnums.Mind), BattlePokemonGender.Female),
            ], '(female)'),
            new ContestTrainer('Clara', 'Pokémon Breeder', [new ContestPokemon('Togepi', 'Gepito', [ContestType.Cute], [ContestType.Cute, ContestType.Cute, ContestType.Cute, ContestType.Cute])], '(female)'),
            new ContestTrainer('Deon', 'School Kid', [new ContestPokemon('Sharpedo', 'Pedos', [ContestType.Cool, ContestType.Cute, ContestType.Tough], [ContestType.Cool, ContestType.Cute, ContestType.Smart, ContestType.Tough])], '(male)'),
            new ContestTrainer('Frankie', 'Youngster', [new ContestPokemon('Pichu', 'Chupy', [ContestType.Beautiful, ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Cute, ContestType.Cute, ContestType.Cute])]),
            new ContestTrainer('Heath', 'Cooltrainer', [new ContestPokemon('Heracross', 'Heross', [ContestType.Cool, ContestType.Tough], [ContestType.Tough, ContestType.Tough, ContestType.Cool, ContestType.Smart], undefined, BattlePokemonGender.Male)], '(male)'),
            new ContestTrainer('Helen', 'Battle Girl', [new ContestPokemon('Wobbuffet', 'Wobet', [ContestType.Cool, ContestType.Beautiful, ContestType.Smart, ContestType.Tough], [ContestType.Tough, ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Jakob', 'Psychic', [new ContestPokemon('Espeon', 'Speon', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Cool, ContestType.Beautiful, ContestType.Cute])], '(male)'),
            new ContestTrainer('Janelle', 'Lady', [new ContestPokemon('Luvdisc', 'Luvis', [ContestType.Cute, ContestType.Tough], [ContestType.Cute, ContestType.Cute, ContestType.Tough, ContestType.Cute])]),
            new ContestTrainer('Justina', 'Picnicker', [new ContestPokemon('Gyarados', 'Rados', [ContestType.Cool, ContestType.Beautiful, ContestType.Tough], [ContestType.Cool, ContestType.Beautiful, ContestType.Tough, ContestType.Tough], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Kailey', 'Twin', [new ContestPokemon('Meowth', 'Meowy', [ContestType.Cute, ContestType.Smart], [ContestType.Cute, ContestType.Smart, ContestType.Smart, ContestType.Tough])], 'left frlg'),
            new ContestTrainer('Keaton', 'Preschooler', [new ContestPokemon('Slaking', 'Sling', [ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Cute, ContestType.Tough, ContestType.Cute, ContestType.Cute])], '(male)'),
            new ContestTrainer('Lamar', 'Rich Boy', [new ContestPokemon('Kirlia', 'Lirki', [ContestType.Cool, ContestType.Smart], [ContestType.Cool, ContestType.Smart, ContestType.Smart, ContestType.Cute])]),
            new ContestTrainer('Lane', 'Black Belt', [new ContestPokemon('Ursaring', 'Ursing', [ContestType.Cool, ContestType.Tough], [ContestType.Tough, ContestType.Cool, ContestType.Smart, ContestType.Cool], undefined, BattlePokemonGender.Male)]),
            new ContestTrainer('Martin', 'Scientist', [new ContestPokemon('Porygon', 'Gonpor', [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Cute, ContestType.Smart])], '(male)'),
            new ContestTrainer('Mayra', 'Pokéfan', [new ContestPokemon('Altaria', 'Taria', [ContestType.Cool, ContestType.Beautiful], [ContestType.Cool, ContestType.Cool, ContestType.Beautiful, ContestType.Beautiful])], 'gen4 (female)'),
            new ContestTrainer('Nigel', 'Camper', [
                new ContestPokemon('Sableye', 'Eyesab', [ContestType.Cool, ContestType.Tough], [ContestType.Beautiful, ContestType.Smart, ContestType.Smart, ContestType.Smart]),
                new ContestPokemon('Duskull', 'Kullusk', [ContestType.Smart, ContestType.Tough], [ContestType.Smart, ContestType.Smart, ContestType.Smart, ContestType.Smart]),
            ]),
            new ContestTrainer('Perla', 'Beauty', [new ContestPokemon('Jynx', 'Nyx', [ContestType.Beautiful, ContestType.Smart], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Beautiful, ContestType.Smart])]),
            new ContestTrainer('Ralph', 'Old Man', [new ContestPokemon('Loudred', 'Louderd', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Tough, ContestType.Cool, ContestType.Cool])]),
            new ContestTrainer('Rosa', 'Idol', [
                new ContestPokemon('Skitty', 'Sitty', [ContestType.Beautiful, ContestType.Cute], [ContestType.Cute, ContestType.Cute, ContestType.Smart, ContestType.Cute]),
                new ContestPokemon('Delcatty', 'Catted', [ContestType.Beautiful, ContestType.Smart], [ContestType.Cute, ContestType.Cute, ContestType.Smart, ContestType.Cute]),
            ]),
            new ContestTrainer('Sasha', 'Twin', [new ContestPokemon('Electrode', 'Rodlect', [ContestType.Cool, ContestType.Beautiful], [ContestType.Beautiful, ContestType.Beautiful, ContestType.Cool, ContestType.Beautiful])], 'right frlg'),
            new ContestTrainer('Sergio', 'Dragon Tamer', [new ContestPokemon('Dragonite', 'Drite', [ContestType.Cool, ContestType.Tough], [ContestType.Cool, ContestType.Tough, ContestType.Cool, ContestType.Tough])]),
            new ContestTrainer('Trey', 'Sailor', [new ContestPokemon('Slowking', 'Slowgo', [ContestType.Cute, ContestType.Tough], [ContestType.Cute, ContestType.Tough, ContestType.Cute, ContestType.Tough])]),
        ],
    };
}
