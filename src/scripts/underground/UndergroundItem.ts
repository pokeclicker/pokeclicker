class UndergroundItem {
    public name: string;
    public id: number;
    public shape: Array<Array<number>>;
    public value: number;
    public valueType: string;

    public static list: Array<UndergroundItem> = [];

    constructor(name: string, id: number, shape: Array<Array<number>>, value: number = 1, valueType: string = "Diamonds") {
        this.name = name;
        this.id = id;
        this.shape = shape;
        this.value = value;
        this.valueType = valueType;
    }

    private static addItem(name, id, shape, ...rest) {
        UndergroundItem.list.push(new UndergroundItem(name, id, shape, ...rest))
    }

    public static initialize() {
        this.addItem("Helix Fossil", 1, [[0,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1]], 0);
        this.addItem("Dome Fossil", 2, [[2,2,2,2,2], [2,2,2,2,2], [2,2,2,2,2], [0,2,2,2,0]], 0);
        this.addItem("Old Amber", 3, [[0,3,3,3], [3,3,3,3], [3,3,3,3], [3,3,3,0]], 0);
        // this.addItem("Root Fossil", 4, [[0,0,4,4,4], [0,0,4,4,4], [4,0,0,4,4], [4,4,4,4,4], [0,4,4,4,0]], 3);
        // this.addItem("Claw Fossil", 5, [[5,5,5,0,0], [5,5,5,5,0], [0,5,5,5,5], [0,0,0,5,5]], 3);
        // this.addItem("Armor Fossil", 6, [[0,6,6,6,0], [0,6,6,6,0], [6,6,6,6,6], [0,6,6,6,0]], 3);
        // this.addItem("Skull Fossil", 7, [[7,7,7,7], [7,7,7,7], [7,7,7,7], [0,7,7,0]], 3);
        this.addItem("Rare Bone", 8, [[8,0,0,0,0,8], [8,8,8,8,8,8], [8,0,0,0,0,8]], 3);
        this.addItem("Star Piece", 9, [[0,9,0,], [9,9,9], [0,9,0]], 5);
        this.addItem("Revive", 10, [[0,10,0], [10,10,10,], [0,10,0]], 2);
        this.addItem("Max Revive", 11, [[11,11,11], [11,11,11], [11,11,11]], 4);
        this.addItem("Iron Ball", 12, [[12,12,12], [12,12,12], [12,12,12]], 2);
        this.addItem("Heart Scale", 13, [[13,0], [13,13]], 10);
        this.addItem("Light Clay", 14, [[14,0,14,0], [14,14,14,0], [14,14,14,14], [0,14,0,14]], 2);
        this.addItem("Odd Keystone", 15, [[15,15,15,15], [15,15,15,15], [15,15,15,15], [15,15,15,15]], 6);
        this.addItem("Hard Stone", 16, [[16,16],[16,16]], 4);

        this.addItem("Fire Stone", 17, [[17,17,17], [17,17,17], [17,17,17]]);
        this.addItem("Water Stone", 18, [[18,18,18], [18,18,18], [18,18,0]]);
        this.addItem("Thunder Stone", 19, [[0,19,19], [19,19,19], [19,19,0]]);
        this.addItem("Leaf Stone", 20, [[0,20,0], [20,20,20], [20,20,20], [0,20,0]]);

        this.addItem("Moon Stone", 21, [[0,21,21,21], [21,21,21,0]], 4);
        this.addItem("Sun Stone", 22, [[0,22,0,], [22,22,22], [22,22,22]], 4);
        this.addItem("Oval Stone", 23, [[23,23,23], [23,23,23], [23,23,23]], 3);
        this.addItem("Everstone", 24, [[24,24,24], [24,24,24]], 3);
        this.addItem("Smooth Rock", 25, [[25,25,25], [25,25,25], [25,25,25]], 2);
        this.addItem("Heat Rock", 26, [[26,26,26], [26,26,26]], 2);
        this.addItem("Icy Rock", 27, [[27,27,27], [27,27,27], [27,27,27]], 2);
        this.addItem("Damp Rock", 28, [[28,28,28], [28,28,28], [28,0,28]], 2);

        this.addItem("Draco Plate", 29, [[29,29,29,29], [29,29,29,29], [29,29,29,29]], 25, "dragon");
        this.addItem("Dread Plate", 30, [[30,30,30,30], [30,30,30,30], [30,30,30,30]], 25, "dark");
        this.addItem("Earth Plate", 31, [[31,31,31,31], [31,31,31,31], [31,31,31,31]], 25, "ground");
        this.addItem("Fist Plate", 32, [[32,32,32,32], [32,32,32,32], [32,32,32,32]], 25, "fighting");
        this.addItem("Flame Plate", 33, [[33,33,33,33], [33,33,33,33], [33,33,33,33]], 25, "fire");
        this.addItem("Icicle Plate", 34, [[34,34,34,34], [34,34,34,34], [34,34,34,34]], 25, "ice");
        this.addItem("Insect Plate", 35, [[35,35,35,35], [35,35,35,35], [35,35,35,35]], 25, "bug");
        this.addItem("Iron Plate", 36, [[36,36,36,36], [36,36,36,36], [36,36,36,36]], 25, "steel");
        this.addItem("Meadow Plate", 37, [[37,37,37,37], [37,37,37,37], [37,37,37,37]], 25, "grass");
        this.addItem("Mind Plate", 38, [[38,38,38,38], [38,38,38,38], [38,38,38,38]], 25, "psychic");
        this.addItem("Sky Plate", 39, [[39,39,39,39], [39,39,39,39], [39,39,39,39]], 25, "flying");
        this.addItem("Splash Plate", 40, [[40,40,40,40], [40,40,40,40], [40,40,40,40]], 25, "water");
        this.addItem("Spooky Plate", 41, [[41,41,41,41], [41,41,41,41], [41,41,41,41]], 25, "ghost");
        this.addItem("Stone Plate", 42, [[42,42,42,42], [42,42,42,42], [42,42,42,42]], 25, "rock");
        this.addItem("Toxic Plate", 43, [[43,43,43,43], [43,43,43,43], [43,43,43,43]], 25, "poison");
        this.addItem("Zap Plate", 44, [[44,44,44,44], [44,44,44,44], [44,44,44,44]], 25, "electric");
        this.addItem("Pixie Plate", 45, [[45,45,45,45], [45,45,45,45], [45,45,45,45]], 25, "fairy");
    }

}