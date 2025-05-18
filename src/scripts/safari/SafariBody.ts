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
            ret[3] = this.grid[y][x - 1] !== GameConstants.SafariTile.ground;
        }
        if (y === 0) {
            ret[0] = false;
        } else {
            ret[0] = this.grid[y - 1][x] !== GameConstants.SafariTile.ground;
        }
        if (x === this.grid[0].length - 1) {
            ret[1] = false;
        } else {
            ret[1] = this.grid[y][x + 1] !== GameConstants.SafariTile.ground;
        }

        if (y === this.grid.length - 1) {
            ret[2] = false;
        } else {
            ret[2] = this.grid[y + 1][x] !== GameConstants.SafariTile.ground && this.grid[y + 1][x] !== undefined;
        }

        if (ret.equals([true, true, true, true])) {
            cross[0] = this.grid[y - 1][x + 1] !== GameConstants.SafariTile.ground;
            cross[1] = this.grid[y + 1][x + 1] !== GameConstants.SafariTile.ground;
            cross[2] = this.grid[y + 1][x - 1] !== GameConstants.SafariTile.ground;
            cross[3] = this.grid[y - 1][x - 1] !== GameConstants.SafariTile.ground;
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
    edgeDetectCheck = GameConstants.SafariTile.sandC;

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
            body[y + 2][x] = GameConstants.SafariTile.sandC;
            body[y + 2][x + 1] = GameConstants.SafariTile.sandC;
            body[y][x + 2] = GameConstants.SafariTile.sandC;
            body[y + 1][x + 2] = GameConstants.SafariTile.sandC;
            body[y + 2][x + 2] = GameConstants.SafariTile.sandC;
        }
        body[y][x] = GameConstants.SafariTile.sandC;
        body[y + 1][x] = GameConstants.SafariTile.sandC;
        body[y][x + 1] = GameConstants.SafariTile.sandC;
        body[y + 1][x + 1] = GameConstants.SafariTile.sandC;
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
            return GameConstants.SafariTile.sandUL;
        }
        if (plus.equals([false, true, true, true])) {
            return GameConstants.SafariTile.sandU;
        }
        if (plus.equals([false, false, true, true])) {
            return GameConstants.SafariTile.sandUR;
        }
        if (plus.equals([true, true, true, false])) {
            return GameConstants.SafariTile.sandL;
        }
        if (plus.equals([true, true, true, true])) {
            if (!cross[0]) {
                return GameConstants.SafariTile.sandURinverted;
            }
            if (!cross[1]) {
                return GameConstants.SafariTile.sandDRinverted;
            }
            if (!cross[2]) {
                return GameConstants.SafariTile.sandDLinverted;
            }
            if (!cross[3]) {
                return GameConstants.SafariTile.sandULinverted;
            }
            return GameConstants.SafariTile.sandC;
        }
        if (plus.equals([true, false, true, true])) {
            return GameConstants.SafariTile.sandR;
        }
        if (plus.equals([true, true, false, false])) {
            return GameConstants.SafariTile.sandDL;
        }
        if (plus.equals([true, true, false, true])) {
            return GameConstants.SafariTile.sandD;
        }
        if (plus.equals([true, false, false, true])) {
            return GameConstants.SafariTile.sandDR;
        }
        return GameConstants.SafariTile.grass;
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
            return GameConstants.SafariTile.fenceUL;
        }
        if (plus.equals([false, true, true, true])) {
            return GameConstants.SafariTile.fenceU;
        }
        if (plus.equals([false, false, true, true])) {
            return GameConstants.SafariTile.fenceUR;
        }
        if (plus.equals([true, true, true, false])) {
            return GameConstants.SafariTile.fenceL;
        }
        if (plus.equals([true, true, true, true])) {
            if (!cross[0]) {
                return GameConstants.SafariTile.fenceDRend;
            }
            if (!cross[1]) {
                return GameConstants.SafariTile.fenceURend;
            }
            if (!cross[2]) {
                return GameConstants.SafariTile.fenceULend;
            }
            if (!cross[3]) {
                return GameConstants.SafariTile.fenceDLend;
            }
            return GameConstants.SafariTile.grass;
        }
        if (plus.equals([true, false, true, true])) {
            return GameConstants.SafariTile.fenceR;
        }
        if (plus.equals([true, true, false, false])) {
            return GameConstants.SafariTile.fenceDL;
        }
        if (plus.equals([true, true, false, true])) {
            return GameConstants.SafariTile.fenceD;
        }
        if (plus.equals([true, false, false, true])) {
            return GameConstants.SafariTile.fenceDR;
        }
        return GameConstants.SafariTile.grass;
    }

    private openFence() {
        const removedTiles = [];
        const options = [GameConstants.SafariTile.fenceU, GameConstants.SafariTile.fenceL, GameConstants.SafariTile.fenceR, GameConstants.SafariTile.fenceD];
        const pick = Rand.fromArray(options);
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j] === pick) {
                    if (pick == GameConstants.SafariTile.fenceL || pick == GameConstants.SafariTile.fenceR) { // Only tiles connected to the left/right fence tiles are broken
                        removedTiles.push({x: j, y: i});
                    }
                    this.grid[i][j] = GameConstants.SafariTile.ground;
                }
            }
        }
        // Check tiles above and below the removed ones to avoid broken fences tiles
        removedTiles?.map((pos) => {
            const tileAbove = this.grid[pos.y - 1] ? this.grid[pos.y - 1][pos.x] : undefined;
            const tileBelow = this.grid[pos.y + 1] ? this.grid[pos.y + 1][pos.x] : undefined;
            switch (pick) {
                case GameConstants.SafariTile.fenceL: // Left fence tile
                    if (tileAbove === GameConstants.SafariTile.fenceUL || tileAbove === GameConstants.SafariTile.fenceULend) {
                        this.grid[pos.y - 1][pos.x] = GameConstants.SafariTile.fenceU;
                    }
                    if (tileBelow === GameConstants.SafariTile.fenceDL || tileBelow === GameConstants.SafariTile.fenceDLend) {
                        this.grid[pos.y + 1][pos.x] = GameConstants.SafariTile.fenceD;
                    }
                    break;
                case GameConstants.SafariTile.fenceR: // Right fence tile
                    if (tileAbove === GameConstants.SafariTile.fenceUR || tileAbove === GameConstants.SafariTile.fenceURend) {
                        this.grid[pos.y - 1][pos.x] = GameConstants.SafariTile.fenceU;
                    }
                    if (tileBelow === GameConstants.SafariTile.fenceDR || tileBelow === GameConstants.SafariTile.fenceDRend) {
                        this.grid[pos.y + 1][pos.x] = GameConstants.SafariTile.fenceD;
                    }
                    break;
                default:
            }
        });
    }
}


class WaterBody extends SafariBody {
    constructor(x = Rand.intBetween(3, 5), y = Rand.intBetween(3, 5)) {
        super();
        const body = [];
        for (let i = 0; i < y; i++) {
            const row = [];
            for (let j = 0; j < x; j++) {
                if (i === 0) {
                    if ( j === 0) {
                        row.push(GameConstants.SafariTile.waterUL);
                    } else if (j < x - 1) {
                        row.push(GameConstants.SafariTile.waterU);
                    } else if (j === x - 1) {
                        row.push(GameConstants.SafariTile.waterUR);
                    }
                } else if (i < y - 1) {
                    if ( j === 0) {
                        row.push(GameConstants.SafariTile.waterL);
                    } else if (j < x - 1) {
                        row.push(GameConstants.SafariTile.waterC);
                    } else if (j === x - 1) {
                        row.push(GameConstants.SafariTile.waterR);
                    }
                } else if (i === y - 1) {
                    if ( j === 0) {
                        row.push(GameConstants.SafariTile.waterDL);
                    } else if (j < x - 1) {
                        row.push(GameConstants.SafariTile.waterD);
                    } else if (j === x - 1) {
                        row.push(GameConstants.SafariTile.waterDR);
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
                    row.push(GameConstants.SafariTile.grass);
                } else {
                    row.push(GameConstants.SafariTile.ground);
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
                if (this.grid[i][j] === GameConstants.SafariTile.ground) {
                    if (i !== 0 && i !== this.grid.length - 1) {
                        if (this.grid[i - 1][j] === GameConstants.SafariTile.grass && this.grid[i + 1][j] === GameConstants.SafariTile.grass) {
                            this.grid[i][j] = GameConstants.SafariTile.grass;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j] === GameConstants.SafariTile.ground) {

                    if (j !== 0 && j !== this.grid[0].length - 1) {
                        if (this.grid[i][j - 1] === GameConstants.SafariTile.grass && this.grid[i][j + 1] === GameConstants.SafariTile.grass) {
                            this.grid[i][j] = GameConstants.SafariTile.grass;
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
            [GameConstants.SafariTile.treeTopL, GameConstants.SafariTile.treeTopC, GameConstants.SafariTile.treeTopR],
            [GameConstants.SafariTile.treeLeavesL, GameConstants.SafariTile.treeLeavesC, GameConstants.SafariTile.treeLeavesR],
            [GameConstants.SafariTile.treeTrunkL, GameConstants.SafariTile.treeTrunkC, GameConstants.SafariTile.treeTrunkR],
            [GameConstants.SafariTile.treeRootsL, GameConstants.SafariTile.treeRootsC, GameConstants.SafariTile.treeRootsR],
        ];
        this.type = 'tree';
    }
}

class LandBody extends SafariBody {
    constructor(x: number, y: number) {
        super();

        this.grid = new Array(y - 2).fill(new Array(x - 2).fill(GameConstants.SafariTile.sandC));
        this.grid[0].unshift(GameConstants.SafariTile.waterR);
        this.grid[0].push(GameConstants.SafariTile.waterL);
        this.grid.unshift([GameConstants.SafariTile.waterDRCorner, ...new Array(x - 2).fill(GameConstants.SafariTile.waterD), GameConstants.SafariTile.waterDLCorner]);
        this.grid.push([GameConstants.SafariTile.waterURCorner, ...new Array(x - 2).fill(GameConstants.SafariTile.waterU), GameConstants.SafariTile.waterULCorner]);
        this.type = 'land';
    }
}

class ShapedLandBody extends SafariBody {

    /** Replace illegal configurations and place edge tiles */
    fulfill() {
        let change = false;
        const UP = 1, UPRIGHT = 2, RIGHT = 4, DOWNRIGHT = 8, DOWN = 16, DOWNLEFT = 32, LEFT = 64, UPLEFT = 128;
        // We prevent tiles whose significant edges are more than two or not adjacent
        // Otherwise, we would need something like 50 different sprites...
        do {
            change = false;
            this.grid.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell === GameConstants.SafariTile.sandC) {
                        return;
                    }
                    let mapValue = 0;
                    let tile = cell;
                    if (this.grid[y - 1]?.[x] === GameConstants.SafariTile.sandC) {
                        mapValue += UP;
                    }
                    if (this.grid[y + 1]?.[x] === GameConstants.SafariTile.sandC) {
                        mapValue += DOWN;
                    }
                    if (this.grid[y][x - 1] === GameConstants.SafariTile.sandC) {
                        mapValue += LEFT;
                    }
                    if (this.grid[y][x + 1] === GameConstants.SafariTile.sandC) {
                        mapValue += RIGHT;
                    }

                    if (this.grid[y - 1]?.[x - 1] === GameConstants.SafariTile.sandC && (mapValue & (UP + LEFT)) === 0) {
                        mapValue += UPLEFT;
                    }
                    if (this.grid[y - 1]?.[x + 1] === GameConstants.SafariTile.sandC && (mapValue & (UP + RIGHT)) === 0) {
                        mapValue += UPRIGHT;
                    }
                    if (this.grid[y + 1]?.[x + 1] === GameConstants.SafariTile.sandC && (mapValue & (DOWN + RIGHT)) === 0) {
                        mapValue += DOWNRIGHT;
                    }
                    if (this.grid[y + 1]?.[x - 1] === GameConstants.SafariTile.sandC && (mapValue & (DOWN + LEFT)) === 0) {
                        mapValue += DOWNLEFT;
                    }

                    switch (mapValue) {
                        case 0: tile = GameConstants.SafariTile.ground;
                            break;
                        case UP: tile = GameConstants.SafariTile.waterU;
                            break;
                        case DOWN: tile = GameConstants.SafariTile.waterD;
                            break;
                        case LEFT: tile = GameConstants.SafariTile.waterL;
                            break;
                        case RIGHT: tile = GameConstants.SafariTile.waterR;
                            break;
                        case UP | LEFT: tile = GameConstants.SafariTile.waterUL;
                            break;
                        case UP | RIGHT: tile = GameConstants.SafariTile.waterUR;
                            break;
                        case DOWN | LEFT: tile = GameConstants.SafariTile.waterDL;
                            break;
                        case DOWN | RIGHT: tile = GameConstants.SafariTile.waterDR;
                            break;
                        case UPRIGHT: tile = GameConstants.SafariTile.waterURCorner;
                            break;
                        case UPLEFT: tile = GameConstants.SafariTile.waterULCorner;
                            break;
                        case DOWNRIGHT: tile = GameConstants.SafariTile.waterDRCorner;
                            break;
                        case DOWNLEFT: tile = GameConstants.SafariTile.waterDLCorner;
                            break;
                        // Illegal water tile
                        default: change = true;
                            tile = GameConstants.SafariTile.sandC;
                    }
                    this.grid[y][x] = tile;
                });
            });
        } while (change);
    }

    trim() {
        let change = false;
        do {
            change = false;
            if (this.grid[this.grid.length - 1].every(tile => tile === GameConstants.SafariTile.ground)) {
                this.grid.pop();
                change = true;
            }
            if (this.grid[0].every(tile => tile === GameConstants.SafariTile.ground)) {
                this.grid.shift();
                change = true;
            }
        } while (change);
        do {
            change = false;
            if (this.grid.every(row => row[0] === GameConstants.SafariTile.ground)) {
                this.grid.forEach(r => r.shift());
                change = true;
            }
            if (this.grid.every(row => row[row.length - 1] === GameConstants.SafariTile.ground)) {
                this.grid.forEach(r => r.pop());
                change = true;
            }
        } while (change);
    }

    /** sand is temporarily used as ground, because ground is temporarily used as water. This so we do not change too much code everywhere */
    constructor() {
        super();
        this.type = 'land';
        const tileArray = [];
        // The chance is weird, but it makes well-sized islands
        while (tileArray.length < 9 && Rand.chance(1 + tileArray.length / 5)) {
            tileArray.push(GameConstants.SafariTile.sandC);
        }
        // Fill the rest with "water" tiles
        while (tileArray.length < 9) {
            tileArray.push(GameConstants.SafariTile.ground);
        }
        LandBody.shuffle(tileArray);
        this.grid = [];
        while (tileArray.length > 0) {
            this.grid.push(tileArray.splice(0, 3));
        }
        this.fulfill();
        // Fulfill is directional so flippings will make it look more random
        if (Rand.boolean()) {
            this.grid.reverse();
        }
        if (Rand.boolean()) {
            this.grid.forEach(r => r.reverse());
        }
        this.grid.push(new Array(3).fill(GameConstants.SafariTile.ground));
        this.grid.unshift(new Array(3).fill(GameConstants.SafariTile.ground));
        this.grid.forEach(r => {
            r.push(GameConstants.SafariTile.ground);
            r.unshift(GameConstants.SafariTile.ground);
        });
        this.fulfill();
        this.trim();
        // https://static.wixstatic.com/media/997b44_90b0ef0cb8ef477c9d750565def78d0b~mv2.gif
        const landSize = this.grid.flat().reduce((acc, t) => acc + +(t === GameConstants.SafariTile.sandC), 0);
        this.grid.forEach((r, y) => {
            r.forEach((t, x) => {
                if (t === GameConstants.SafariTile.sandC && Rand.chance(Math.sqrt(landSize - 3) / 6)) {
                    this.grid[y][x] = GameConstants.SafariTile.grass;
                }
            });
        });
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
