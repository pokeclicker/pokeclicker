class UndergroundItem {
    public name: string;
    public id: number;
    public space: Array<Array<number>>;
    public value: number;
    public valueType: string;

    public static list: Array<UndergroundItem> = [];

    constructor(name: string, id: number, space: Array<Array<number>>, value = 1, valueType = 'Diamond') {
        this.name = name;
        this.id = id;
        this.space = space;
        this.value = value;
        this.valueType = valueType;
    }

    public static addItem(name, id, space, ...rest) {
        UndergroundItem.list.push(new UndergroundItem(name, id, space, ...rest));
    }

    public static initialize() {
    }

    public static getRandomItem(): UndergroundItem {
        const i = Math.floor(Math.random() * (UndergroundItem.list.length));
        return UndergroundItem.list[i] || UndergroundItem.list[0];
    }

    public isStone(): boolean {
        return ItemList[this.valueType] instanceof EvolutionStone;
    }

    public static getFullResourceName(valuetype: string, amt: number): string {
        if (valuetype != 'Diamond' && amt >= 50) {
            valuetype += ' shard';
        }
        if (amt > 1) {
            valuetype += 's';
        }
        return GameConstants.humanifyString(valuetype);
    }

}

UndergroundItem.addItem('Helix Fossil', 1, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Dome Fossil', 2, [[2,2,2,2,2], [2,2,2,2,2], [2,2,2,2,2], [0,2,2,2,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Old Amber', 3, [[0,3,3,3], [3,3,3,3], [3,3,3,3], [3,3,3,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Root Fossil', 4, [[0,0,4,4,4], [0,0,4,4,4], [4,0,0,4,4], [4,4,4,4,4], [0,4,4,4,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Claw Fossil', 5, [[5,5,5,0,0], [5,5,5,5,0], [0,5,5,5,5], [0,0,0,5,5]], 0, 'Mine Egg');
UndergroundItem.addItem('Armor Fossil', 6, [[0,6,6,6,0], [0,6,6,6,0], [6,6,6,6,6], [0,6,6,6,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Skull Fossil', 7, [[7,7,7,7], [7,7,7,7], [7,7,7,7], [0,7,7,0]], 0, 'Mine Egg');
UndergroundItem.addItem('Rare Bone', 8, [[8,0,0,0,0,8], [8,8,8,8,8,8], [8,0,0,0,0,8]], 3);
UndergroundItem.addItem('Star Piece', 9, [[0,9,0], [9,9,9], [0,9,0]], 5);
UndergroundItem.addItem('Revive', 10, [[0,10,0], [10,10,10], [0,10,0]], 2);
UndergroundItem.addItem('Max Revive', 11, [[11,11,11], [11,11,11], [11,11,11]], 4);
UndergroundItem.addItem('Iron Ball', 12, [[12,12,12], [12,12,12], [12,12,12]], 2);
UndergroundItem.addItem('Heart Scale', 13, [[13,0], [13,13]], 10);
UndergroundItem.addItem('Light Clay', 14, [[14,0,14,0], [14,14,14,0], [14,14,14,14], [0,14,0,14]], 2);
UndergroundItem.addItem('Odd Keystone', 15, [[15,15,15,15], [15,15,15,15], [15,15,15,15], [15,15,15,15]], 6);
UndergroundItem.addItem('Hard Stone', 16, [[16,16],[16,16]], 4);

UndergroundItem.addItem('Fire Stone', 17, [[17,17,17], [17,17,17], [17,17,17]], 1, 'Fire_stone');
UndergroundItem.addItem('Water Stone', 18, [[18,18,18], [18,18,18], [18,18,18]], 1, 'Water_stone');
UndergroundItem.addItem('Thunder Stone', 19, [[19,19,19], [19,19,19], [19,19,19]], 1, 'Thunder_stone');
UndergroundItem.addItem('Leaf Stone', 20, [[20,20,20], [20,20,20], [20,20,20]], 1, 'Leaf_stone');
UndergroundItem.addItem('Moon Stone', 21, [[21,21,21], [21,21,21], [21,21,21]], 1, 'Moon_stone');
UndergroundItem.addItem('Sun Stone', 22, [[22,22,22], [22,22,22], [22,22,22]], 1, 'Sun_stone');

UndergroundItem.addItem('Oval Stone', 23, [[23,23,23], [23,23,23], [23,23,23]], 3);
UndergroundItem.addItem('Everstone', 24, [[24,24,24], [24,24,24]], 3);
UndergroundItem.addItem('Smooth Rock', 25, [[25,25,25], [25,25,25], [25,25,25]], 2);
UndergroundItem.addItem('Heat Rock', 26, [[26,26,26], [26,26,26]], 2);
UndergroundItem.addItem('Icy Rock', 27, [[27,27,27], [27,27,27], [27,27,27]], 2);
UndergroundItem.addItem('Damp Rock', 28, [[28,28,28], [28,28,28], [28,0,28]], 2);

UndergroundItem.addItem('Draco Plate', 29, [[29,29,29,29], [29,29,29,29], [29,29,29,29]], 100, 'dragon');
UndergroundItem.addItem('Dread Plate', 30, [[30,30,30,30], [30,30,30,30], [30,30,30,30]], 100, 'dark');
UndergroundItem.addItem('Earth Plate', 31, [[31,31,31,31], [31,31,31,31], [31,31,31,31]], 100, 'ground');
UndergroundItem.addItem('Fist Plate', 32, [[32,32,32,32], [32,32,32,32], [32,32,32,32]], 100, 'fighting');
UndergroundItem.addItem('Flame Plate', 33, [[33,33,33,33], [33,33,33,33], [33,33,33,33]], 100, 'fire');
UndergroundItem.addItem('Icicle Plate', 34, [[34,34,34,34], [34,34,34,34], [34,34,34,34]], 100, 'ice');
UndergroundItem.addItem('Insect Plate', 35, [[35,35,35,35], [35,35,35,35], [35,35,35,35]], 100, 'bug');
UndergroundItem.addItem('Iron Plate', 36, [[36,36,36,36], [36,36,36,36], [36,36,36,36]], 100, 'steel');
UndergroundItem.addItem('Meadow Plate', 37, [[37,37,37,37], [37,37,37,37], [37,37,37,37]], 100, 'grass');
UndergroundItem.addItem('Mind Plate', 38, [[38,38,38,38], [38,38,38,38], [38,38,38,38]], 100, 'psychic');
UndergroundItem.addItem('Sky Plate', 39, [[39,39,39,39], [39,39,39,39], [39,39,39,39]], 100, 'flying');
UndergroundItem.addItem('Splash Plate', 40, [[40,40,40,40], [40,40,40,40], [40,40,40,40]], 100, 'water');
UndergroundItem.addItem('Spooky Plate', 41, [[41,41,41,41], [41,41,41,41], [41,41,41,41]], 100, 'ghost');
UndergroundItem.addItem('Stone Plate', 42, [[42,42,42,42], [42,42,42,42], [42,42,42,42]], 100, 'rock');
UndergroundItem.addItem('Toxic Plate', 43, [[43,43,43,43], [43,43,43,43], [43,43,43,43]], 100, 'poison');
UndergroundItem.addItem('Zap Plate', 44, [[44,44,44,44], [44,44,44,44], [44,44,44,44]], 100, 'electric');
UndergroundItem.addItem('Pixie Plate', 45, [[45,45,45,45], [45,45,45,45], [45,45,45,45]], 100, 'fairy');
