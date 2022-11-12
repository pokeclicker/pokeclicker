import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { Region, StoneType } from '../GameConstants';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import Rand from '../utilities/Rand';
import UndergroundEvolutionItem from './UndergroundEvolutionItem';
import UndergroundGemItem from './UndergroundGemItem';
import UndergroundItem from './UndergroundItem';

export default class UndergroundItems {
    public static list: Array<UndergroundItem> = [];

    public static addItem(item: UndergroundItem) {
        this.list.push(item);
    }

    public static getByName(name: string): UndergroundItem {
        return this.list.find((item) => item.name === name);
    }

    public static getById(id: number): UndergroundItem {
        return this.list.find((item) => item.id === id);
    }

    // Returns a random unlocked item
    public static getRandomItem(): UndergroundItem {
        const unlockedItems = this.list.filter((item) => item.isUnlocked());
        return Rand.fromWeightedArray(unlockedItems, unlockedItems.map((i) => i.getWeight())) || this.list[0];
    }

    public static getFullResourceName(item: UndergroundItem, amt: number): string {
        let output = '';
        const uItem = this.getById(item.id);
        switch (item.valueType) {
            case UndergroundItemValueType.Gem:
                output = `${PokemonType[uItem.type]} Gem`;
                break;
            default:
                output = UndergroundItemValueType[item.valueType];
        }
        if (amt > 1) {
            output += 's';
        }
        return output;
    }
}

// Diamond Items
UndergroundItems.addItem(new UndergroundItem('Rare Bone', 1, [[1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 1]], 3));
UndergroundItems.addItem(new UndergroundItem('Star Piece', 2, [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 5));
UndergroundItems.addItem(new UndergroundItem('Revive', 3, [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 2));
UndergroundItems.addItem(new UndergroundItem('Max Revive', 4, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 4));
UndergroundItems.addItem(new UndergroundItem('Iron Ball', 5, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Heart Scale', 6, [[1, 0], [1, 1]], 10));
UndergroundItems.addItem(new UndergroundItem('Light Clay', 7, [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1], [0, 1, 0, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Odd Keystone', 8, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 6));
UndergroundItems.addItem(new UndergroundItem('Hard Stone', 9, [[1, 1], [1, 1]], 4));
UndergroundItems.addItem(new UndergroundItem('Oval Stone', 10, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 3));
UndergroundItems.addItem(new UndergroundItem('Everstone', 11, [[1, 1, 1, 1], [1, 1, 1, 1]], 3));
UndergroundItems.addItem(new UndergroundItem('Smooth Rock', 12, [[0, 0, 1, 0], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 0, 0]], 2));
UndergroundItems.addItem(new UndergroundItem('Heat Rock', 13, [[1, 0, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Icy Rock', 14, [[0, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Damp Rock', 15, [[1, 1, 1], [1, 1, 1], [1, 0, 1]], 2));

// Gem Plates
UndergroundItems.addItem(new UndergroundGemItem('Draco Plate', 100, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Dragon));
UndergroundItems.addItem(new UndergroundGemItem('Dread Plate', 101, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Dark));
UndergroundItems.addItem(new UndergroundGemItem('Earth Plate', 102, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Ground));
UndergroundItems.addItem(new UndergroundGemItem('Fist Plate', 103, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Fighting));
UndergroundItems.addItem(new UndergroundGemItem('Flame Plate', 104, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Fire));
UndergroundItems.addItem(new UndergroundGemItem('Icicle Plate', 105, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Ice));
UndergroundItems.addItem(new UndergroundGemItem('Insect Plate', 106, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Bug));
UndergroundItems.addItem(new UndergroundGemItem('Iron Plate', 107, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Steel));
UndergroundItems.addItem(new UndergroundGemItem('Meadow Plate', 108, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Grass));
UndergroundItems.addItem(new UndergroundGemItem('Mind Plate', 109, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Psychic));
UndergroundItems.addItem(new UndergroundGemItem('Sky Plate', 110, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Flying));
UndergroundItems.addItem(new UndergroundGemItem('Splash Plate', 111, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Water));
UndergroundItems.addItem(new UndergroundGemItem('Spooky Plate', 112, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Ghost));
UndergroundItems.addItem(new UndergroundGemItem('Stone Plate', 113, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Rock));
UndergroundItems.addItem(new UndergroundGemItem('Toxic Plate', 114, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Poison));
UndergroundItems.addItem(new UndergroundGemItem('Zap Plate', 115, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Electric));
UndergroundItems.addItem(new UndergroundGemItem('Pixie Plate', 116, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 100, PokemonType.Fairy));

// Fossils/Fossil Pieces
UndergroundItems.addItem(new UndergroundItem('Helix Fossil', 200, [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Omanyte') || player.getUndergroundItemAmount(200) > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Dome Fossil', 201, [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Kabuto') || player.getUndergroundItemAmount(201) > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Old Amber', 202, [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Aerodactyl') || player.getUndergroundItemAmount(202) > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Root Fossil', 203, [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [1, 0, 0, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Lileep') || player.getUndergroundItemAmount(203) > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Claw Fossil', 204, [[1, 1, 1, 0, 0], [1, 1, 1, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Anorith') || player.getUndergroundItemAmount(204) > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Armor Fossil', 205, [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Skull Fossil', 206, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Cover Fossil', 207, [[1, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova)));
UndergroundItems.addItem(new UndergroundItem('Plume Fossil', 208, [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 0, 0, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova)));
UndergroundItems.addItem(new UndergroundItem('Jaw Fossil', 209, [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem('Sail Fossil', 210, [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Bird', 211, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Fish', 212, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Drake', 213, [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Dino', 214, [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));

// Evolution Stones
UndergroundItems.addItem(new UndergroundEvolutionItem('Fire Stone', 300, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Fire_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Water Stone', 301, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Water_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Thunder Stone', 302, [[0, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Thunder_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Leaf Stone', 303, [[0, 1, 0], [1, 1, 1], [1, 1, 1], [0, 1, 0]], 1, StoneType.Leaf_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Moon Stone', 304, [[0, 1, 1, 1], [1, 1, 1, 0]], 1, StoneType.Moon_stone));
// TODO: Replace these requirements with StoneUnlockedRequirement once moved to modules
UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], 1, StoneType.Sun_stone, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Shiny_stone, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Dusk_stone, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Dawn_stone, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, [[1, 1, 1], [1, 1, 1]], 1, StoneType.Ice_stone, new MaxRegionRequirement(Region.alola)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], 1, StoneType.Sun_stone, new StoneUnlockedRequirement(StoneType.Sun_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Shiny_stone, new StoneUnlockedRequirement(StoneType.Shiny_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Dusk_stone, new StoneUnlockedRequirement(StoneType.Dusk_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Dawn_stone, new StoneUnlockedRequirement(StoneType.Dawn_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, [[1, 1, 1], [1, 1, 1]], 1, StoneType.Ice_stone, new StoneUnlockedRequirement(StoneType.Ice_stone)));

// Shards
UndergroundItems.addItem(new UndergroundItem('Red Shard', 400, [[1, 1, 1], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Yellow Shard', 401, [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Green Shard', 402, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Blue Shard', 403, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Grey Shard', 404, [[1, 1, 1], [1, 1, 1], [0, 0, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundItem('Purple Shard', 405, [[1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundItem('Ochre Shard', 406, [[1, 1, 0], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hoenn)));
UndergroundItems.addItem(new UndergroundItem('Black Shard', 407, [[1, 1, 1], [0, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Crimson Shard', 408, [[0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Lime Shard', 409, [[0, 0, 0, 0], [0, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('White Shard', 410, [[1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Pink Shard', 411, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem('Cyan Shard', 412, [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.alola)));
UndergroundItems.addItem(new UndergroundItem('Rose Shard', 413, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Brown Shard', 414, [[1, 1, 0], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar)));
