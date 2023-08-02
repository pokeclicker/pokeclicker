abstract class SafariBody {
    grid: Array<Array<number>>;
    type: string;

    constructor() {

    }

    public getTileNeighbours(x: number, y: number) {
        const ret = Array<boolean>(4);//["N", "E", "S", "W"]
        const cross = Array<boolean>(4);//["NE", "SE", "SW", "NW"]
        if (x === 0) {
            ret[3] = false;
        } else {
            ret[3] = this.grid[y][x - 1] !== SafariTiles.ground;
        }
        if (y === 0) {
            ret[0] = false;
        } else {
            ret[0] = this.grid[y - 1][x] !== SafariTiles.ground;
        }
        if (x === this.grid[0].length - 1) {
            ret[1] = false;
        } else {
            ret[1] = this.grid[y][x + 1] !== SafariTiles.ground;
        }

        if (y === this.grid.length - 1) {
            ret[2] = false;
        } else {
            ret[2] = this.grid[y + 1][x] !== SafariTiles.ground && this.grid[y + 1][x] !== undefined;
        }

        if (ret.equals([true, true, true, true])) {
            cross[0] = this.grid[y - 1][x + 1] !== SafariTiles.ground;
            cross[1] = this.grid[y + 1][x + 1] !== SafariTiles.ground;
            cross[2] = this.grid[y + 1][x - 1] !== SafariTiles.ground;
            cross[3] = this.grid[y - 1][x - 1] !== SafariTiles.ground;
        }
        return {
            plus: ret,
            cross: cross,
        };
    }

    //duplicated in DungeonMap
    public static shuffle(a) {
        let j, x, i;
        for (i = a.length; i; i--) {
            j = Rand.floor(i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    public maxY() {
        return this.grid.length;
    }

    public maxX() {
        let max = 0;
        for (const row of this.grid) {
            if (row.length > max) {
                max = row.length;
            }
        }
        return max;
    }
}


class SandBody extends SafariBody {
    edgeDetectCheck = SafariTiles.sandC;

    constructor(
        x: number = SandBody.randomInt(),
        y: number = SandBody.randomInt(),
        type = 'sand'
    ) {
        super();
        this.type = type;
        this.grid = this.generateCube(x, y);

        this.edgeDetect();
    }

    static randomInt(): number {
        return Rand.intBetween(3, 5);
    }

    private generateCube(sizeX: number, sizeY: number): Array<Array<number>> {
        let body = [];
        for (let i = 0; i < sizeY; i++) {
            const row = [...Array(sizeX)].map(Number.prototype.valueOf, 0);
            body.push(row);
        }

        const amount = this.type === 'fence' ? 20 : 4;
        for (let i = 0; i < amount; i++) {
            const x = Rand.floor(sizeX - 2);
            const y = Rand.floor(sizeY - 2);
            body = SandBody.addCube(x,y,body);
        }
        return body;
    }

    private static addCube(x: number, y: number, body: Array<Array<number>>): Array<Array<number>> {
        if (Rand.boolean()) {
            body[y + 2][x] = SafariTiles.sandC;
            body[y + 2][x + 1] = SafariTiles.sandC;
            body[y][x + 2] = SafariTiles.sandC;
            body[y + 1][x + 2] = SafariTiles.sandC;
            body[y + 2][x + 2] = SafariTiles.sandC;
        }
        body[y][x] = SafariTiles.sandC;
        body[y + 1][x] = SafariTiles.sandC;
        body[y][x + 1] = SafariTiles.sandC;
        body[y + 1][x + 1] = SafariTiles.sandC;
        return body;
    }

    private edgeDetect() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === this.edgeDetectCheck) {
                    this.grid[i][j] = this.getNumber(this.getTileNeighbours(j, i));
                }
            }
        }
    }

    getNumber(neighbours): number {
        const plus = neighbours.plus;
        const cross = neighbours.cross;
        if (plus.equals([false, true, true, false])) {
            return SafariTiles.sandUL;
        }
        if (plus.equals([false, true, true, true])) {
            return SafariTiles.sandU;
        }
        if (plus.equals([false, false, true, true])) {
            return SafariTiles.sandUR;
        }
        if (plus.equals([true, true, true, false])) {
            return SafariTiles.sandL;
        }
        if (plus.equals([true, true, true, true])) {
            if (!cross[0]) {
                return SafariTiles.sandURinverted;
            }
            if (!cross[1]) {
                return SafariTiles.sandDRinverted;
            }
            if (!cross[2]) {
                return SafariTiles.sandDLinverted;
            }
            if (!cross[3]) {
                return SafariTiles.sandULinverted;
            }
            return SafariTiles.sandC;
        }
        if (plus.equals([true, false, true, true])) {
            return SafariTiles.sandR;
        }
        if (plus.equals([true, true, false, false])) {
            return SafariTiles.sandDL;
        }
        if (plus.equals([true, true, false, true])) {
            return SafariTiles.sandD;
        }
        if (plus.equals([true, false, false, true])) {
            return SafariTiles.sandDR;
        }
        return SafariTiles.grass;
    }
}


class FenceBody extends SandBody {
    edgeDetectCheck = 0;

    constructor() {
        super(7, 7, 'fence');
        this.openFence();
    }

    getNumber(neighbours): number {
        const plus = neighbours.plus;
        const cross = neighbours.cross;
        if (plus.equals([false, true, true, false])) {
            return SafariTiles.fenceUL;
        }
        if (plus.equals([false, true, true, true])) {
            return SafariTiles.fenceU;
        }
        if (plus.equals([false, false, true, true])) {
            return SafariTiles.fenceUR;
        }
        if (plus.equals([true, true, true, false])) {
            return SafariTiles.fenceL;
        }
        if (plus.equals([true, true, true, true])) {
            if (!cross[0]) {
                return SafariTiles.fenceDRend;
            }
            if (!cross[1]) {
                return SafariTiles.fenceURend;
            }
            if (!cross[2]) {
                return SafariTiles.fenceULend;
            }
            if (!cross[3]) {
                return SafariTiles.fenceDLend;
            }
            return SafariTiles.grass;
        }
        if (plus.equals([true, false, true, true])) {
            return SafariTiles.fenceR;
        }
        if (plus.equals([true, true, false, false])) {
            return SafariTiles.fenceDL;
        }
        if (plus.equals([true, true, false, true])) {
            return SafariTiles.fenceD;
        }
        if (plus.equals([true, false, false, true])) {
            return SafariTiles.fenceDR;
        }
        return SafariTiles.grass;
    }

    private openFence() {
        const removedTiles = [];
        const options = [SafariTiles.fenceU, SafariTiles.fenceL, SafariTiles.fenceR, SafariTiles.fenceD];
        const pick = Rand.fromArray(options);
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j] === pick) {
                    if (pick == SafariTiles.fenceL || pick == SafariTiles.fenceR) { // Only tiles connected to the left/right fence tiles are broken
                        removedTiles.push({x: j, y: i});
                    }
                    this.grid[i][j] = SafariTiles.ground;
                }
            }
        }
        // Check tiles above and below the removed ones to avoid broken fences tiles
        removedTiles?.map((pos) => {
            const tileAbove = this.grid[pos.y - 1] ? this.grid[pos.y - 1][pos.x] : undefined;
            const tileBelow = this.grid[pos.y + 1] ? this.grid[pos.y + 1][pos.x] : undefined;
            switch (pick) {
                case SafariTiles.fenceL: // Left fence tile
                    if (tileAbove === SafariTiles.fenceUL || tileAbove === SafariTiles.fenceULend) {
                        this.grid[pos.y - 1][pos.x] = SafariTiles.fenceU;
                    }
                    if (tileBelow === SafariTiles.fenceDL || tileBelow === SafariTiles.fenceDLend) {
                        this.grid[pos.y + 1][pos.x] = SafariTiles.fenceD;
                    }
                    break;
                case SafariTiles.fenceR: // Right fence tile
                    if (tileAbove === SafariTiles.fenceUR || tileAbove === SafariTiles.fenceURend) {
                        this.grid[pos.y - 1][pos.x] = SafariTiles.fenceU;
                    }
                    if (tileBelow === SafariTiles.fenceDR || tileBelow === SafariTiles.fenceDRend) {
                        this.grid[pos.y + 1][pos.x] = SafariTiles.fenceD;
                    }
                    break;
                default:
            }
        });
    }
}


class WaterBody extends SafariBody {
    constructor() {
        super();
        const x = Rand.intBetween(3, 5);
        const y = Rand.intBetween(3, 5);
        const body = [];
        for (let i = 0; i < y; i++) {
            const row = [];
            for (let j = 0; j < x; j++) {
                if (i === 0) {
                    if ( j === 0) {
                        row.push(SafariTiles.waterUL);
                    } else if (j < x - 1) {
                        row.push(SafariTiles.waterU);
                    } else if (j === x - 1) {
                        row.push(SafariTiles.waterUR);
                    }
                } else if (i < y - 1) {
                    if ( j === 0) {
                        row.push(SafariTiles.waterL);
                    } else if (j < x - 1) {
                        row.push(SafariTiles.waterC);
                    } else if (j === x - 1) {
                        row.push(SafariTiles.waterR);
                    }
                } else if (i === y - 1) {
                    if ( j === 0) {
                        row.push(SafariTiles.waterDL);
                    } else if (j < x - 1) {
                        row.push(SafariTiles.waterD);
                    } else if (j === x - 1) {
                        row.push(SafariTiles.waterDR);
                    }
                }
            }
            body.push(row);
        }

        this.grid = body;
        this.type = 'water';
    }
}

class GrassBody extends SafariBody {
    constructor() {
        super();
        const x = Rand.intBetween(4, 6);
        const y = Rand.intBetween(4, 6);
        const body = [];
        for (let i = 0; i < y; i++) {
            const row = [];
            for (let j = 0; j < x; j++) {
                if (j < x * 2 / 3 - 1) {
                    row.push(SafariTiles.grass);
                } else {
                    row.push(SafariTiles.ground);
                }
            }
            SafariBody.shuffle(row);
            body.push(row);
        }

        this.grid = body;
        this.fillHoles();
        this.type = 'grass';
    }

    private fillHoles() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j] === SafariTiles.ground) {
                    if (i !== 0 && i !== this.grid.length - 1) {
                        if (this.grid[i - 1][j] === SafariTiles.grass && this.grid[i + 1][j] === SafariTiles.grass) {
                            this.grid[i][j] = SafariTiles.grass;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j] === SafariTiles.ground) {

                    if (j !== 0 && j !== this.grid[0].length - 1) {
                        if (this.grid[i][j - 1] === SafariTiles.grass && this.grid[i][j + 1] === SafariTiles.grass) {
                            this.grid[i][j] = SafariTiles.grass;
                        }
                    }
                }
            }
        }
    }
}

class TreeBody extends SafariBody {
    constructor() {
        super();
        this.grid = [
            [SafariTiles.treeTopL, SafariTiles.treeTopC, SafariTiles.treeTopR],
            [SafariTiles.treeLeavesL, SafariTiles.treeLeavesC, SafariTiles.treeLeavesR],
            [SafariTiles.treeTrunkL, SafariTiles.treeTrunkC, SafariTiles.treeTrunkR],
            [SafariTiles.treeRootsL, SafariTiles.treeRootsC, SafariTiles.treeRootsR],
        ];
        this.type = 'tree';
    }
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) {
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length != array.length) {
        return false;
    }

    for (let i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i])) {
                return false;
            }
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

interface Array<T> {
    equals(array: Array<T>): boolean;
}

enum SafariTiles {
    ground = 0,
    waterUL = 1,
    waterU = 2,
    waterUR = 3,
    waterL = 4,
    waterC = 5,
    waterR = 6,
    waterDL = 7,
    waterD = 8,
    waterDR = 9,
    grass = 10,
    sandUL = 11,
    sandU = 12,
    sandUR = 13,
    sandL = 14,
    sandC = 15,
    sandR = 16,
    sandDL = 17,
    sandD = 18,
    sandDR = 19,
    sandURinverted = 21,
    sandDRinverted = 22,
    sandDLinverted = 23,
    sandULinverted = 24,
    fenceUL = 25,
    fenceU = 26,
    fenceUR = 27,
    fenceL = 28,
    fenceR = 29,
    fenceDL = 30,
    fenceD = 31,
    fenceDR = 32,
    fenceDRend = 33,
    fenceURend = 34,
    fenceULend = 35,
    fenceDLend = 36,
    treeTopL = 37,
    treeTopC = 38,
    treeTopR = 39,
    treeLeavesL = 40,
    treeLeavesC = 41,
    treeLeavesR = 42,
    treeTrunkL = 43,
    treeTrunkC = 44,
    treeTrunkR = 45,
    treeRootsL = 46,
    treeRootsC = 47,
    treeRootsR = 48,
    sign = 51,
}
