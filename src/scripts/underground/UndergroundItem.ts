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

    private static addItem(name, id, space, ...rest) {
        UndergroundItem.list.push(new UndergroundItem(name, id, space, ...rest));
    }

    public static initialize() {
        this.addItem('Helix Fossil', 1, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1]], 0, 'Mine Egg');
        this.addItem('Dome Fossil', 2, [[2,2,2,2,2], [2,2,2,2,2], [2,2,2,2,2], [0,2,2,2,0]], 0, 'Mine Egg');
        this.addItem('Old Amber', 3, [[0,3,3,3], [3,3,3,3], [3,3,3,3], [3,3,3,0]], 0, 'Mine Egg');
        this.addItem('Root Fossil', 4, [[0,0,4,4,4], [0,0,4,4,4], [4,0,0,4,4], [4,4,4,4,4], [0,4,4,4,0]], 0, 'Mine Egg');
        this.addItem('Claw Fossil', 5, [[5,5,5,0,0], [5,5,5,5,0], [0,5,5,5,5], [0,0,0,5,5]], 0, 'Mine Egg');
        // this.addItem('Armor Fossil', 6, [[0,6,6,6,0], [0,6,6,6,0], [6,6,6,6,6], [0,6,6,6,0]], 3);
        // this.addItem('Skull Fossil', 7, [[7,7,7,7], [7,7,7,7], [7,7,7,7], [0,7,7,0]], 3);
        this.addItem('Rare Bone', 8, [[8,0,0,0,0,8], [8,8,8,8,8,8], [8,0,0,0,0,8]], 3);
        this.addItem('Star Piece', 9, [[0,9,0], [9,9,9], [0,9,0]], 5);
        this.addItem('Revive', 10, [[0,10,0], [10,10,10], [0,10,0]], 2);
        this.addItem('Max Revive', 11, [[11,11,11], [11,11,11], [11,11,11]], 4);
        this.addItem('Iron Ball', 12, [[12,12,12], [12,12,12], [12,12,12]], 2);
        this.addItem('Heart Scale', 13, [[13,0], [13,13]], 10);
        this.addItem('Light Clay', 14, [[14,0,14,0], [14,14,14,0], [14,14,14,14], [0,14,0,14]], 2);
        this.addItem('Odd Keystone', 15, [[15,15,15,15], [15,15,15,15], [15,15,15,15], [15,15,15,15]], 6);
        this.addItem('Hard Stone', 16, [[16,16],[16,16]], 4);

        this.addItem('Fire Stone', 17, [[17,17,17], [17,17,17], [17,17,17]], 1, 'Fire_stone');
        this.addItem('Water Stone', 18, [[18,18,18], [18,18,18], [18,18,18]], 1, 'Water_stone');
        this.addItem('Thunder Stone', 19, [[19,19,19], [19,19,19], [19,19,19]], 1, 'Thunder_stone');
        this.addItem('Leaf Stone', 20, [[20,20,20], [20,20,20], [20,20,20], [20,20,20]], 1, 'Leaf_stone');
        this.addItem('Moon Stone', 21, [[21,21,21], [21,21,21], [21,21,21]], 1, 'Moon_stone');
        this.addItem('Sun Stone', 22, [[22,22,22], [22,22,22], [22,22,22]], 1, 'Sun_stone');

        this.addItem('Oval Stone', 23, [[23,23,23], [23,23,23], [23,23,23]], 3);
        this.addItem('Everstone', 24, [[24,24,24], [24,24,24]], 3);
        this.addItem('Smooth Rock', 25, [[25,25,25], [25,25,25], [25,25,25]], 2);
        this.addItem('Heat Rock', 26, [[26,26,26], [26,26,26]], 2);
        this.addItem('Icy Rock', 27, [[27,27,27], [27,27,27], [27,27,27]], 2);
        this.addItem('Damp Rock', 28, [[28,28,28], [28,28,28], [28,0,28]], 2);

        this.addItem('Draco Plate', 29, [[29,29,29,29], [29,29,29,29], [29,29,29,29]], 100, 'dragon');
        this.addItem('Dread Plate', 30, [[30,30,30,30], [30,30,30,30], [30,30,30,30]], 100, 'dark');
        this.addItem('Earth Plate', 31, [[31,31,31,31], [31,31,31,31], [31,31,31,31]], 100, 'ground');
        this.addItem('Fist Plate', 32, [[32,32,32,32], [32,32,32,32], [32,32,32,32]], 100, 'fighting');
        this.addItem('Flame Plate', 33, [[33,33,33,33], [33,33,33,33], [33,33,33,33]], 100, 'fire');
        this.addItem('Icicle Plate', 34, [[34,34,34,34], [34,34,34,34], [34,34,34,34]], 100, 'ice');
        this.addItem('Insect Plate', 35, [[35,35,35,35], [35,35,35,35], [35,35,35,35]], 100, 'bug');
        this.addItem('Iron Plate', 36, [[36,36,36,36], [36,36,36,36], [36,36,36,36]], 100, 'steel');
        this.addItem('Meadow Plate', 37, [[37,37,37,37], [37,37,37,37], [37,37,37,37]], 100, 'grass');
        this.addItem('Mind Plate', 38, [[38,38,38,38], [38,38,38,38], [38,38,38,38]], 100, 'psychic');
        this.addItem('Sky Plate', 39, [[39,39,39,39], [39,39,39,39], [39,39,39,39]], 100, 'flying');
        this.addItem('Splash Plate', 40, [[40,40,40,40], [40,40,40,40], [40,40,40,40]], 100, 'water');
        this.addItem('Spooky Plate', 41, [[41,41,41,41], [41,41,41,41], [41,41,41,41]], 100, 'ghost');
        this.addItem('Stone Plate', 42, [[42,42,42,42], [42,42,42,42], [42,42,42,42]], 100, 'rock');
        this.addItem('Toxic Plate', 43, [[43,43,43,43], [43,43,43,43], [43,43,43,43]], 100, 'poison');
        this.addItem('Zap Plate', 44, [[44,44,44,44], [44,44,44,44], [44,44,44,44]], 100, 'electric');
        this.addItem('Pixie Plate', 45, [[45,45,45,45], [45,45,45,45], [45,45,45,45]], 100, 'fairy');

        this.addItem('Trade Stone', 46, [[46,46,46], [46,46,46], [46,46,46]], 1, 'Trade_stone');
        this.addItem('Dragon Scale', 47, [[47,47,47], [47,47,47], [47,47,47]], 1, 'Dragon_scale');
        this.addItem('Metal Coat', 48, [[48,48,48], [48,48,48], [48,48,48]], 1, 'Metal_coat');
        this.addItem('Kings Rock', 49, [[49,49,49], [49,49,49], [49,49,49]], 1, 'Kings_rock');
        this.addItem('Upgrade', 50, [[50,50,50], [50,50,50], [50,50,50]], 1, 'Upgrade');
        this.addItem('Time Stone', 51, [[51,51,51], [51,51,51], [51,51,51]], 1, 'Time_stone');
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
