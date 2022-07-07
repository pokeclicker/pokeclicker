///<reference path="../../declarations/requirements/MaxRegionRequirement.d.ts"/>
///<reference path="StoneUnlockedRequirement.ts"/>

class UndergroundItem {
    public space: Array<Array<any>>;

    public static list: Array<UndergroundItem> = [];

    constructor(
        public name: string,
        public id: number,
        space: Array<Array<number>>,
        public value = 1,
        public valueType = 'Diamond',
        public requirement?: Requirement
    ) {
        this.space = space.map((r, y) => r.map((v, x) => ({
            sizeX: r.length,
            sizeY: space.length,
            x,
            y,
            value: v ? this.id : 0,
            rotations: 0,
        })));
    }

    public static addItem(
        name: string,
        id: number,
        space: Array<Array<number>>,
        value = 1,
        valueType = 'Diamond',
        requirement?: Requirement
    ) {
        UndergroundItem.list.push(new UndergroundItem(name, id, space, value, valueType, requirement));
    }

    // Returns a random unlocked item
    public static getRandomItem(): UndergroundItem {
        const unlockedItems = UndergroundItem.list.filter(i => i.isUnlocked());
        return Rand.fromArray(unlockedItems) || UndergroundItem.list[0];
    }

    public static getFullResourceName(valuetype: string, amt: number): string {
        if (valuetype != 'Diamond' && amt >= 50) {
            valuetype += ' gem';
        }
        if (amt > 1) {
            valuetype += 's';
        }
        return GameConstants.humanifyString(valuetype);
    }

    public isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }

    public isStone(): boolean {
        return ItemList[this.valueType] instanceof EvolutionStone;
    }

    get displayName() {
        return this.name;
    }

    get image() {
        // Have to add extra logic here since images are all over the place in location and naming standards
        // Maybe one day we refactor the item system to be cleaner
        if (this.isStone()) {
            const evostone: EvolutionStone = (ItemList[this.valueType] as EvolutionStone);
            return evostone.image;
        } else if (this.valueType == 'Mine Egg') {
            return `assets/images/breeding/${this.name}.png`;
        } else {
            return `assets/images/items/underground/${this.name}.png`;
        }
    }

    get undergroundImage() {
        return `assets/images/underground/${this.name}.png`;
    }

}

// Diamond Items
UndergroundItem.addItem('Rare Bone',    1, [[1,0,0,0,0,1], [1,1,1,1,1,1], [1,0,0,0,0,1]], 3);
UndergroundItem.addItem('Star Piece',   2, [[0,1,0], [1,1,1], [0,1,0]], 5);
UndergroundItem.addItem('Revive',       3, [[0,1,0], [1,1,1], [0,1,0]], 2);
UndergroundItem.addItem('Max Revive',   4, [[1,1,1], [1,1,1], [1,1,1]], 4);
UndergroundItem.addItem('Iron Ball',    5, [[1,1,1], [1,1,1], [1,1,1]], 2);
UndergroundItem.addItem('Heart Scale',  6, [[1,0], [1,1]], 10);
UndergroundItem.addItem('Light Clay',   7, [[1,0,1,0], [1,1,1,0], [1,1,1,1], [0,1,0,1]], 2);
UndergroundItem.addItem('Odd Keystone', 8, [[1,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1]], 6);
UndergroundItem.addItem('Hard Stone',   9, [[1,1],[1,1]], 4);
UndergroundItem.addItem('Oval Stone',   10, [[1,1,1], [1,1,1], [1,1,1]], 3);
UndergroundItem.addItem('Everstone',    11, [[1,1,1,1], [1,1,1,1]], 3);
UndergroundItem.addItem('Smooth Rock',  12, [[0,0,1,0], [1,1,1,0], [0,1,1,1], [0,1,0,0]], 2);
UndergroundItem.addItem('Heat Rock',    13, [[1,0,1,0], [1,1,1,1], [1,1,1,1]], 2);
UndergroundItem.addItem('Icy Rock',     14, [[0,1,1,0], [1,1,1,1], [1,1,1,1], [1,0,0,1]], 2);
UndergroundItem.addItem('Damp Rock',    15, [[1,1,1], [1,1,1], [1,0,1]], 2);

// Gem Plates
UndergroundItem.addItem('Draco Plate',  100, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'dragon');
UndergroundItem.addItem('Dread Plate',  101, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'dark');
UndergroundItem.addItem('Earth Plate',  102, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'ground');
UndergroundItem.addItem('Fist Plate',   103, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'fighting');
UndergroundItem.addItem('Flame Plate',  104, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'fire');
UndergroundItem.addItem('Icicle Plate', 105, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'ice');
UndergroundItem.addItem('Insect Plate', 106, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'bug');
UndergroundItem.addItem('Iron Plate',   107, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'steel');
UndergroundItem.addItem('Meadow Plate', 108, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'grass');
UndergroundItem.addItem('Mind Plate',   109, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'psychic');
UndergroundItem.addItem('Sky Plate',    110, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'flying');
UndergroundItem.addItem('Splash Plate', 111, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'water');
UndergroundItem.addItem('Spooky Plate', 112, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'ghost');
UndergroundItem.addItem('Stone Plate',  113, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'rock');
UndergroundItem.addItem('Toxic Plate',  114, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'poison');
UndergroundItem.addItem('Zap Plate',    115, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'electric');
UndergroundItem.addItem('Pixie Plate',  116, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 100, 'fairy');

// Fossils
UndergroundItem.addItem('Helix Fossil', 200, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Dome Fossil',  201, [[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Old Amber',    202, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Root Fossil',  203, [[0,0,1,1,1], [0,0,1,1,1], [1,0,0,1,1], [1,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.hoenn));
UndergroundItem.addItem('Claw Fossil',  204, [[1,1,1,0,0], [1,1,1,1,0], [0,1,1,1,1], [0,0,0,1,1]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.hoenn));
UndergroundItem.addItem('Armor Fossil', 205, [[0,1,1,1,0], [0,1,1,1,0], [1,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Skull Fossil', 206, [[1,1,1,1], [1,1,1,1], [1,1,1,1], [0,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Cover Fossil', 207, [[1,1,1,1,0], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [0,1,1,1,1]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.unova));
UndergroundItem.addItem('Plume Fossil', 208, [[0,0,1,1,1], [0,1,1,1,1], [1,1,1,1,0], [1,1,1,1,0], [1,1,0,0,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.unova));
UndergroundItem.addItem('Jaw Fossil',   209, [[0,0,1,1,1], [0,1,1,1,1], [1,1,1,1,1], [1,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.kalos));
UndergroundItem.addItem('Sail Fossil',  210, [[1,1,1,0,0], [1,1,1,1,1], [0,1,1,1,1], [0,1,1,1,0]], 0, 'Mine Egg', new MaxRegionRequirement(GameConstants.Region.kalos));

// Evolution Stones
UndergroundItem.addItem('Fire Stone',    300, [[1,1,1], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Fire_stone]);
UndergroundItem.addItem('Water Stone',   301, [[1,1,1], [1,1,1], [1,1,0]], 1, GameConstants.StoneType[GameConstants.StoneType.Water_stone]);
UndergroundItem.addItem('Thunder Stone', 302, [[0,1,1], [1,1,1], [1,1,0]], 1, GameConstants.StoneType[GameConstants.StoneType.Thunder_stone]);
UndergroundItem.addItem('Leaf Stone',    303, [[0,1,0], [1,1,1], [1,1,1], [0,1,0]], 1, GameConstants.StoneType[GameConstants.StoneType.Leaf_stone]);
UndergroundItem.addItem('Moon Stone',    304, [[0,1,1,1], [1,1,1,0]], 1, GameConstants.StoneType[GameConstants.StoneType.Moon_stone]);
UndergroundItem.addItem('Sun Stone',     305, [[0,1,0], [1,1,1], [1,1,1]], 1, GameConstants.StoneType[GameConstants.StoneType.Sun_stone], new StoneUnlockedRequirement(GameConstants.StoneType.Sun_stone));

// Shards
UndergroundItem.addItem('Red Shard', 400, [[1,1,1], [1,1,0], [1,1,1]], 1);
UndergroundItem.addItem('Yellow Shard', 401, [[1,0,1,0], [1,1,1,0], [1,1,1,1]], 1);
UndergroundItem.addItem('Green Shard', 402, [[1,1,1,1], [1,1,1,1], [1,1,0,1]], 1);
UndergroundItem.addItem('Blue Shard', 403, [[1,1,1], [1,1,1], [1,1,0]], 1);
UndergroundItem.addItem('Grey Shard', 404, [[1,1,1], [1,1,1], [0,0,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.johto));
UndergroundItem.addItem('Purple Shard', 405, [[1,1,1], [1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.johto));
UndergroundItem.addItem('Ochre Shard', 406, [[1,1,0], [1,1,1], [1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.hoenn));
UndergroundItem.addItem('Black Shard', 407, [[1,1,1], [0,1,1], [0,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Crimson Shard', 408, [[0,1,1,1], [0,1,1,1], [0,1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Lime Shard', 409, [[0,0,0,0], [0,1,1,1], [1,1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('White Shard', 410, [[1,1,1,1], [0,1,1,1], [0,1,1,0]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.sinnoh));
UndergroundItem.addItem('Pink Shard', 411, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.kalos));
UndergroundItem.addItem('Cyan Shard', 412, [[1,1,1,1], [0,1,1,1], [0,0,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.alola));
UndergroundItem.addItem('Rose Shard', 413, [[0,0,1,1], [1,1,1,1], [0,1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.galar));
UndergroundItem.addItem('Brown Shard', 414, [[1,1,0], [1,1,1], [1,1,1]], 1, undefined, new MaxRegionRequirement(GameConstants.Region.galar));
