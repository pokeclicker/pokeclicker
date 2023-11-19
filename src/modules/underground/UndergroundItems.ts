import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { MegaStoneType, Region, StoneType } from '../GameConstants';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import Rand from '../utilities/Rand';
import UndergroundEvolutionItem from './UndergroundEvolutionItem';
import UndergroundGemItem from './UndergroundGemItem';
import UndergroundItem from './UndergroundItem';
import UndergroundMegaStoneItem from './UndergroundMegaStoneItem';

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

    public static getUnlockedItems(): UndergroundItem[] {
        return this.list.filter((item) => item.isUnlocked());
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
UndergroundItems.addItem(new UndergroundItem('Rare Bone', 1, 'Rare_bone', [[1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 1]], 3));
UndergroundItems.addItem(new UndergroundItem('Star Piece', 2, 'Star_piece', [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 5));
UndergroundItems.addItem(new UndergroundItem('Revive', 3, 'Revive', [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 2));
UndergroundItems.addItem(new UndergroundItem('Max Revive', 4, 'Max_revive', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 4));
UndergroundItems.addItem(new UndergroundItem('Iron Ball', 5, 'Iron_ball', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Heart Scale', 6, 'Heart_scale', [[1, 0], [1, 1]], 10));
UndergroundItems.addItem(new UndergroundItem('Light Clay', 7, 'Light_clay', [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1], [0, 1, 0, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Odd Keystone', 8, 'Odd_keystone', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 6));
UndergroundItems.addItem(new UndergroundItem('Hard Stone', 9, 'Hard_stone', [[1, 1], [1, 1]], 4));
UndergroundItems.addItem(new UndergroundItem('Oval Stone', 10, 'Oval_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 3));
UndergroundItems.addItem(new UndergroundItem('Everstone', 11, 'Everstone', [[1, 1, 1, 1], [1, 1, 1, 1]], 3));
UndergroundItems.addItem(new UndergroundItem('Smooth Rock', 12, 'Smooth_rock', [[0, 0, 1, 0], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 0, 0]], 2));
UndergroundItems.addItem(new UndergroundItem('Heat Rock', 13, 'Heat_rock', [[1, 0, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Icy Rock', 14, 'Icy_rock', [[0, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]], 2));
UndergroundItems.addItem(new UndergroundItem('Damp Rock', 15, 'Damp_rock', [[1, 1, 1], [1, 1, 1], [1, 0, 1]], 2));

// Gem Plates
UndergroundItems.addItem(new UndergroundGemItem('Draco Plate', 100, 'Draco_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dragon));
UndergroundItems.addItem(new UndergroundGemItem('Dread Plate', 101, 'Dread_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dark));
UndergroundItems.addItem(new UndergroundGemItem('Earth Plate', 102, 'Earth_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ground));
UndergroundItems.addItem(new UndergroundGemItem('Fist Plate', 103, 'Fist_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fighting));
UndergroundItems.addItem(new UndergroundGemItem('Flame Plate', 104, 'Flame_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fire));
UndergroundItems.addItem(new UndergroundGemItem('Icicle Plate', 105, 'Icicle_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ice));
UndergroundItems.addItem(new UndergroundGemItem('Insect Plate', 106, 'Insect_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Bug));
UndergroundItems.addItem(new UndergroundGemItem('Iron Plate', 107, 'Iron_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Steel));
UndergroundItems.addItem(new UndergroundGemItem('Meadow Plate', 108, 'Meadow_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Grass));
UndergroundItems.addItem(new UndergroundGemItem('Mind Plate', 109, 'Mind_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Psychic));
UndergroundItems.addItem(new UndergroundGemItem('Sky Plate', 110, 'Sky_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Flying));
UndergroundItems.addItem(new UndergroundGemItem('Splash Plate', 111, 'Splash_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Water));
UndergroundItems.addItem(new UndergroundGemItem('Spooky Plate', 112, 'Spooky_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ghost));
UndergroundItems.addItem(new UndergroundGemItem('Stone Plate', 113, 'Stone_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Rock));
UndergroundItems.addItem(new UndergroundGemItem('Toxic Plate', 114, 'Toxic_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Poison));
UndergroundItems.addItem(new UndergroundGemItem('Zap Plate', 115, 'Zap_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Electric));
UndergroundItems.addItem(new UndergroundGemItem('Pixie Plate', 116, 'Pixie_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fairy));

// Fossils/Fossil Pieces
UndergroundItems.addItem(new UndergroundItem('Helix Fossil', 200, 'Helix_fossil', [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Omanyte') || player.itemList.Helix_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Dome Fossil', 201, 'Dome_fossil', [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Kabuto') || player.itemList.Dome_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Old Amber', 202, 'Old_amber', [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Aerodactyl') || player.itemList.Old_amber() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Root Fossil', 203, 'Root_fossil', [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [1, 0, 0, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Lileep') || player.itemList.Root_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Claw Fossil', 204, 'Claw_fossil', [[1, 1, 1, 0, 0], [1, 1, 1, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Anorith') || player.itemList.Claw_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem('Armor Fossil', 205, 'Armor_fossil', [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Skull Fossil', 206, 'Skull_fossil', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Cover Fossil', 207, 'Cover_fossil', [[1, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova)));
UndergroundItems.addItem(new UndergroundItem('Plume Fossil', 208, 'Plume_fossil', [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 0, 0, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova)));
UndergroundItems.addItem(new UndergroundItem('Jaw Fossil', 209, 'Jaw_fossil', [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem('Sail Fossil', 210, 'Sail_fossil', [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Bird', 211, 'Fossilized_bird', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Fish', 212, 'Fossilized_fish', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Drake', 213, 'Fossilized_drake', [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Dino', 214, 'Fossilized_dino', [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));

// Evolution Stones
UndergroundItems.addItem(new UndergroundEvolutionItem('Fire Stone', 300, 'Fire_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Fire_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Water Stone', 301, 'Water_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Water_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Thunder Stone', 302, 'Thunder_stone', [[0, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Thunder_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Leaf Stone', 303, 'Leaf_stone', [[0, 1, 0], [1, 1, 1], [1, 1, 1], [0, 1, 0]], StoneType.Leaf_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem('Moon Stone', 304, 'Moon_stone', [[0, 1, 1, 1], [1, 1, 1, 0]], StoneType.Moon_stone));
// TODO: Replace these requirements with StoneUnlockedRequirement once moved to modules
UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, 'Sun_stone', [[0, 1, 0], [1, 1, 1], [1, 1, 1]], StoneType.Sun_stone, 1, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, 'Shiny_stone', [[0, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Shiny_stone, 1, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, 'Dusk_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Dusk_stone, 1, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, 'Dawn_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Dawn_stone, 1, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, 'Ice_stone', [[1, 1, 1], [1, 1, 1]], StoneType.Ice_stone, 1, new MaxRegionRequirement(Region.alola)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], StoneType.Sun_stone, 1, new StoneUnlockedRequirement(StoneType.Sun_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Shiny_stone, 1, new StoneUnlockedRequirement(StoneType.Shiny_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Dusk_stone, 1, new StoneUnlockedRequirement(StoneType.Dusk_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Dawn_stone, 1, new StoneUnlockedRequirement(StoneType.Dawn_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, [[1, 1, 1], [1, 1, 1]], StoneType.Ice_stone, 1, new StoneUnlockedRequirement(StoneType.Ice_stone)));

// Shards
UndergroundItems.addItem(new UndergroundItem('Red Shard', 400, 'Red_shard', [[1, 1, 1], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Yellow Shard', 401, 'Yellow_shard', [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Green Shard', 402, 'Green_shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Blue Shard', 403, 'Blue_shard', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem('Grey Shard', 404, 'Grey_shard', [[1, 1, 1], [1, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundItem('Purple Shard', 405, 'Purple_shard', [[1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundItem('Ochre Shard', 406, 'Ochre_shard', [[1, 1, 0, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hoenn)));
UndergroundItems.addItem(new UndergroundItem('Black Shard', 407, 'Black_shard', [[1, 1, 1], [0, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Crimson Shard', 408, 'Crimson_shard', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Lime Shard', 409, 'Lime_shard', [[0, 0, 0, 0], [0, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('White Shard', 410, 'White_shard', [[1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem('Pink Shard', 411, 'Pink_shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem('Cyan Shard', 412, 'Cyan_shard', [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.alola)));
UndergroundItems.addItem(new UndergroundItem('Rose Shard', 413, 'Rose_shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem('Brown Shard', 414, 'Brown_shard', [[1, 1, 0], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar)));
//UndergroundItems.addItem(new UndergroundItem('Beige Shard', 415, [[0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hisui)));

// MegaStones
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Aerodactylite, 500, 'Aerodactylite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Aerodactyl', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Mawilite, 501, 'Mawilite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Mawile', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Sablenite, 502, 'Sablenite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Sableye', 0, 0.1));
