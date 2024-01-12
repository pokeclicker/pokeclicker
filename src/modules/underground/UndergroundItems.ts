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
UndergroundItems.addItem(new UndergroundItem(1, 'Rare_bone', [[1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 1]], 3));
UndergroundItems.addItem(new UndergroundItem(2, 'Star_piece', [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 5));
UndergroundItems.addItem(new UndergroundItem(3, 'Revive', [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 2));
UndergroundItems.addItem(new UndergroundItem(4, 'Max_revive', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 4));
UndergroundItems.addItem(new UndergroundItem(5, 'Iron_ball', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2));
UndergroundItems.addItem(new UndergroundItem(6, 'Heart_scale', [[1, 0], [1, 1]], 10));
UndergroundItems.addItem(new UndergroundItem(7, 'Light_clay', [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1], [0, 1, 0, 1]], 2));
UndergroundItems.addItem(new UndergroundItem(8, 'Odd_keystone', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 6));
UndergroundItems.addItem(new UndergroundItem(9, 'Hard_stone', [[1, 1], [1, 1]], 4));
UndergroundItems.addItem(new UndergroundItem(10, 'Oval_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 3));
UndergroundItems.addItem(new UndergroundItem(11, 'Everstone', [[1, 1, 1, 1], [1, 1, 1, 1]], 3));
UndergroundItems.addItem(new UndergroundItem(12, 'Smooth_rock', [[0, 0, 1, 0], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 0, 0]], 2));
UndergroundItems.addItem(new UndergroundItem(13, 'Heat_rock', [[1, 0, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 2));
UndergroundItems.addItem(new UndergroundItem(14, 'Icy_rock', [[0, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]], 2));
UndergroundItems.addItem(new UndergroundItem(15, 'Damp_rock', [[1, 1, 1], [1, 1, 1], [1, 0, 1]], 2));

// Gem Plates
UndergroundItems.addItem(new UndergroundGemItem(100, 'Draco_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dragon));
UndergroundItems.addItem(new UndergroundGemItem(101, 'Dread_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dark));
UndergroundItems.addItem(new UndergroundGemItem(102, 'Earth_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ground));
UndergroundItems.addItem(new UndergroundGemItem(103, 'Fist_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fighting));
UndergroundItems.addItem(new UndergroundGemItem(104, 'Flame_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fire));
UndergroundItems.addItem(new UndergroundGemItem(105, 'Icicle_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ice));
UndergroundItems.addItem(new UndergroundGemItem(106, 'Insect_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Bug));
UndergroundItems.addItem(new UndergroundGemItem(107, 'Iron_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Steel));
UndergroundItems.addItem(new UndergroundGemItem(108, 'Meadow_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Grass));
UndergroundItems.addItem(new UndergroundGemItem(109, 'Mind_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Psychic));
UndergroundItems.addItem(new UndergroundGemItem(110, 'Sky_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Flying));
UndergroundItems.addItem(new UndergroundGemItem(111, 'Splash_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Water));
UndergroundItems.addItem(new UndergroundGemItem(112, 'Spooky_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ghost));
UndergroundItems.addItem(new UndergroundGemItem(113, 'Stone_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Rock));
UndergroundItems.addItem(new UndergroundGemItem(114, 'Toxic_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Poison));
UndergroundItems.addItem(new UndergroundGemItem(115, 'Zap_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Electric));
UndergroundItems.addItem(new UndergroundGemItem(116, 'Pixie_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fairy));
UndergroundItems.addItem(new UndergroundGemItem(117, 'Blank_plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Normal));

// Fossils/Fossil Pieces
UndergroundItems.addItem(new UndergroundItem(200, 'Helix_fossil', [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Omanyte') || player.itemList.Helix_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem(201, 'Dome_fossil', [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Kabuto') || player.itemList.Dome_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem(202, 'Old_amber', [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Aerodactyl') || player.itemList.Old_amber() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem(203, 'Root_fossil', [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [1, 0, 0, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Lileep') || player.itemList.Root_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem(204, 'Claw_fossil', [[1, 1, 1, 0, 0], [1, 1, 1, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Anorith') || player.itemList.Claw_fossil() > 0 ? 1 : 1.5)));
UndergroundItems.addItem(new UndergroundItem(205, 'Armor_fossil', [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem(206, 'Skull_fossil', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem(207, 'Cover_fossil', [[1, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova)));
UndergroundItems.addItem(new UndergroundItem(208, 'Plume_fossil', [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 0, 0, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova)));
UndergroundItems.addItem(new UndergroundItem(209, 'Jaw_fossil', [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem(210, 'Sail_fossil', [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem(211, 'Fossilized_bird', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem(212, 'Fossilized_fish', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem(213, 'Fossilized_drake', [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem(214, 'Fossilized_dino', [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar)));

// Evolution Stones
UndergroundItems.addItem(new UndergroundEvolutionItem(300, 'Fire_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Fire_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem(301, 'Water_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Water_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem(302, 'Thunder_stone', [[0, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Thunder_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem(303, 'Leaf_stone', [[0, 1, 0], [1, 1, 1], [1, 1, 1], [0, 1, 0]], StoneType.Leaf_stone));
UndergroundItems.addItem(new UndergroundEvolutionItem(304, 'Moon_stone', [[0, 1, 1, 1], [1, 1, 1, 0]], StoneType.Moon_stone));
// TODO: Replace these requirements with StoneUnlockedRequirement once moved to modules
UndergroundItems.addItem(new UndergroundEvolutionItem(305, 'Sun_stone', [[0, 1, 0], [1, 1, 1], [1, 1, 1]], StoneType.Sun_stone, 1, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundEvolutionItem(306, 'Shiny_stone', [[0, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Shiny_stone, 1, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem(307, 'Dusk_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Dusk_stone, 1, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem(308, 'Dawn_stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Dawn_stone, 1, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundEvolutionItem(309, 'Ice_stone', [[1, 1, 1], [1, 1, 1]], StoneType.Ice_stone, 1, new MaxRegionRequirement(Region.alola)));
UndergroundItems.addItem(new UndergroundEvolutionItem(310, 'Black_augurite', [[1, 0, 1], [1, 1, 1], [1, 1, 1]], StoneType.Black_augurite, 1, new MaxRegionRequirement(Region.hisui)));
UndergroundItems.addItem(new UndergroundEvolutionItem(311, 'Peat_block', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Peat_block, 1, new MaxRegionRequirement(Region.hisui)));
// UndergroundItems.addItem(new UndergroundEvolutionItem(305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], StoneType.Sun_stone, 1, new StoneUnlockedRequirement(StoneType.Sun_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem(306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Shiny_stone, 1, new StoneUnlockedRequirement(StoneType.Shiny_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem(307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Dusk_stone, 1, new StoneUnlockedRequirement(StoneType.Dusk_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem(308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Dawn_stone, 1, new StoneUnlockedRequirement(StoneType.Dawn_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem(309, [[1, 1, 1], [1, 1, 1]], StoneType.Ice_stone, 1, new StoneUnlockedRequirement(StoneType.Ice_stone)));

// Shards
UndergroundItems.addItem(new UndergroundItem(400, 'Red_shard', [[1, 1, 1], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem(401, 'Yellow_shard', [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem(402, 'Green_shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 1]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem(403, 'Blue_shard', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 0, UndergroundItemValueType.Shard));
UndergroundItems.addItem(new UndergroundItem(404, 'Grey_shard', [[1, 1, 1], [1, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundItem(405, 'Purple_shard', [[1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto)));
UndergroundItems.addItem(new UndergroundItem(406, 'Ochre_shard', [[1, 1, 0, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hoenn)));
UndergroundItems.addItem(new UndergroundItem(407, 'Black_shard', [[1, 1, 1], [0, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem(408, 'Crimson_shard', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem(409, 'Lime_shard', [[0, 0, 0, 0], [0, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem(410, 'White_shard', [[1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh)));
UndergroundItems.addItem(new UndergroundItem(411, 'Pink_shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.kalos)));
UndergroundItems.addItem(new UndergroundItem(412, 'Cyan_shard', [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.alola)));
UndergroundItems.addItem(new UndergroundItem(413, 'Rose_shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem(414, 'Brown_shard', [[1, 1, 0], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar)));
UndergroundItems.addItem(new UndergroundItem(415, 'Beige_shard', [[0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.paldea)));
UndergroundItems.addItem(new UndergroundItem(416, 'Slate_shard', [[0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.paldea)));

// MegaStones
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Aerodactylite, 500, 'Aerodactylite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Aerodactyl', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Mawilite, 501, 'Mawilite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Mawile', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Sablenite, 502, 'Sablenite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Sableye', 0, 0.1));
