import GemDeal from './GemDeal';
import { GemShops } from '../GameConstants';
import PokemonType from '../enums/PokemonType';
import { ItemList } from '../items/ItemList';

const hoennFluteDeals = [
    new GemDeal(
	    [
	        { gemType: PokemonType.Grass, amount: 5000 },
	        { gemType: PokemonType.Flying, amount: 5000 },
	        { gemType: PokemonType.Electric, amount: 5000 },
	    ],
	    ItemList.Yellow_Flute,
	    1,
    ),
    new GemDeal(
	    [
	        { gemType: PokemonType.Ground, amount: 5000 },
	        { gemType: PokemonType.Poison, amount: 5000 },
	        { gemType: PokemonType.Steel, amount: 5000 },
	    ],
	    ItemList.Time_Flute,
	    1,
    ),
    new GemDeal(
	    [
	        { gemType: PokemonType.Dark, amount: 5000 },
	        { gemType: PokemonType.Psychic, amount: 5000 },
	        { gemType: PokemonType.Fighting, amount: 5000 },
	    ],
	    ItemList.Black_Flute,
	    1,
    ),
];

const hoennStoneDeals = [
    new GemDeal(
        [
            { gemType: PokemonType.Grass, amount: 125000 },
            { gemType: PokemonType.Dragon, amount: 125000 },
        ],
        ItemList.Sceptilite,
        1,
    ),
    new GemDeal(
        [
            { gemType: PokemonType.Fire, amount: 125000 },
            { gemType: PokemonType.Fighting, amount: 125000 },
        ],
        ItemList.Blazikenite,
        1,
    ),
    new GemDeal(
        [
            { gemType: PokemonType.Water, amount: 125000 },
            { gemType: PokemonType.Ground, amount: 125000 },
        ],
        ItemList.Swampertite,
        1,
    ),
];

const unovaFluteDeals = [
    new GemDeal(
        [
            { gemType: PokemonType.Fire, amount: 10000 },
            { gemType: PokemonType.Rock, amount: 10000 },
            { gemType: PokemonType.Dragon, amount: 10000 },
        ],
        ItemList.Red_Flute,
        1,
    ),
    new GemDeal(
        [
            { gemType: PokemonType.Normal, amount: 10000 },
            { gemType: PokemonType.Fairy, amount: 10000 },
            { gemType: PokemonType.Ice, amount: 10000 },
        ],
        ItemList.White_Flute,
        1,
    ),
    new GemDeal(
        [
            { gemType: PokemonType.Water, amount: 10000 },
            { gemType: PokemonType.Bug, amount: 10000 },
            { gemType: PokemonType.Ghost, amount: 10000 },
        ],
        ItemList.Blue_Flute,
        1,
    ),
];

const kalosFurfrouDeal = [
    new GemDeal(
        [
            { gemType: PokemonType.Normal, amount: 1000000 },
            { gemType: PokemonType.Water, amount: 1000000 },
            { gemType: PokemonType.Grass, amount: 500000 },
            { gemType: PokemonType.Fighting, amount: 500000 },
            { gemType: PokemonType.Poison, amount: 500000 },
            { gemType: PokemonType.Ground, amount: 500000 },
            { gemType: PokemonType.Flying, amount: 500000 },
            { gemType: PokemonType.Bug, amount: 500000 },
            { gemType: PokemonType.Rock, amount: 500000 },
            { gemType: PokemonType.Fire, amount: 250000 },
            { gemType: PokemonType.Electric, amount: 250000 },
            { gemType: PokemonType.Ice, amount: 250000 },
            { gemType: PokemonType.Ghost, amount: 250000 },
            { gemType: PokemonType.Steel, amount: 250000 },
            { gemType: PokemonType.Psychic, amount: 250000 },
            { gemType: PokemonType.Dragon, amount: 100000 },
            { gemType: PokemonType.Dark, amount: 100000 },
            { gemType: PokemonType.Fairy, amount: 100000 },
        ],
        ItemList['Furfrou (La Reine)'],
        1,
    ),
];

const kalosStoneDeals = [
    new GemDeal(
        [
            { gemType: PokemonType.Grass, amount: 125000 },
            { gemType: PokemonType.Poison, amount: 125000 },
        ],
        ItemList.Venusaurite,
        1,
    ),
    new GemDeal(
        [
            { gemType: PokemonType.Fire, amount: 125000 },
            { gemType: PokemonType.Dragon, amount: 125000 },
        ],
        ItemList.Charizardite_X,
        1,
    ),
    new GemDeal(
        [
            { gemType: PokemonType.Fire, amount: 125000 },
            { gemType: PokemonType.Flying, amount: 125000 },
        ],
        ItemList.Charizardite_Y,
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Water, amount: 250000 }],
        ItemList.Blastoisinite,
        1,
    ),
];

const alolaSilvallyDeals = [
    new GemDeal(
        [{ gemType: PokemonType.Fighting, amount: 1000 }],
        ItemList['Silvally (Fighting) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Fighting, amount: 75000 }],
        ItemList['Silvally (Fighting) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Rock, amount: 1000 }],
        ItemList['Silvally (Rock) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Rock, amount: 150000 }],
        ItemList['Silvally (Rock) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Dark, amount: 1000 }],
        ItemList['Silvally (Dark) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Dark, amount: 45000 }],
        ItemList['Silvally (Dark) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Fairy, amount: 1000 }],
        ItemList['Silvally (Fairy) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Fairy, amount: 45000 }],
        ItemList['Silvally (Fairy) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Water, amount: 1000 }],
        ItemList['Silvally (Water) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Water, amount: 250000 }],
        ItemList['Silvally (Water) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Grass, amount: 1000 }],
        ItemList['Silvally (Grass) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Grass, amount: 150000 }],
        ItemList['Silvally (Grass) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Fire, amount: 1000 }],
        ItemList['Silvally (Fire) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Fire, amount: 150000 }],
        ItemList['Silvally (Fire) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Electric, amount: 1000 }],
        ItemList['Silvally (Electric) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Electric, amount: 150000 }],
        ItemList['Silvally (Electric) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Ice, amount: 1000 }],
        ItemList['Silvally (Ice) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Ice, amount: 75000 }],
        ItemList['Silvally (Ice) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Ground, amount: 1000 }],
        ItemList['Silvally (Ground) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Ground, amount: 150000 }],
        ItemList['Silvally (Ground) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Bug, amount: 1000 }],
        ItemList['Silvally (Bug) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Bug, amount: 150000 }],
        ItemList['Silvally (Bug) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Flying, amount: 1000 }],
        ItemList['Silvally (Flying) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Flying, amount: 250000 }],
        ItemList['Silvally (Flying) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Poison, amount: 1000 }],
        ItemList['Silvally (Poison) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Poison, amount: 150000 }],
        ItemList['Silvally (Poison) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Ghost, amount: 1000 }],
        ItemList['Silvally (Ghost) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Ghost, amount: 75000 }],
        ItemList['Silvally (Ghost) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Psychic, amount: 1000 }],
        ItemList['Silvally (Psychic) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Psychic, amount: 75000 }],
        ItemList['Silvally (Psychic) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Steel, amount: 1000 }],
        ItemList['Silvally (Steel) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Steel, amount: 45000 }],
        ItemList['Silvally (Steel) 2'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Dragon, amount: 1000 }],
        ItemList['Silvally (Dragon) 1'],
        1,
    ),
    new GemDeal(
        [{ gemType: PokemonType.Dragon, amount: 45000 }],
        ItemList['Silvally (Dragon) 2'],
        1,
    ),
];

const alolaMagikarpJumpDeal = [
    new GemDeal(
        [{ gemType: PokemonType.Water, amount: 1500000 }],
        ItemList['Magikarp Brown Stripes'],
        1,
    ),
];

const dealList = {
    [GemShops.HoennFluteMaster]: ko.observableArray(hoennFluteDeals),
    [GemShops.HoennStoneSalesman]: ko.observableArray(hoennStoneDeals),
    [GemShops.UnovaFluteMaster]: ko.observableArray(unovaFluteDeals),
    [GemShops.FurfrouGemTrader]: ko.observableArray(kalosFurfrouDeal),
    [GemShops.KalosStoneSalesman]: ko.observableArray(kalosStoneDeals),
    [GemShops.SilvallyTrader]: ko.observableArray(alolaSilvallyDeals),
    [GemShops.MagikarpJumpGemTrader]: ko.observableArray(alolaMagikarpJumpDeal),
};

export default dealList;