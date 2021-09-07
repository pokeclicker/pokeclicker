
class CellularAutomata {
    constructor(
        public x: number,
        public y: number,
        public weight: number,
        public grid: Array<Array<boolean>> = new Array(x).fill(new Array(y).fill(true))
    ) {
        this.construct();
    }
    public construct() {
        let arr: Array<Array<boolean>> = this.grid;
        let p: Array<Array<boolean>> = [];
        for (let j = 0; j < 21; j++) {
            if (j === 0) {
                arr = this.cellular_automaton(this.grid);
                p = arr;
            } else {
                arr = this.cellular_automaton(p);
                p = arr;
            }
        }
    }
    public cellular_automaton(map: Array<Array<boolean>>): Array<Array<boolean>> {
        let count;
        const arr: Array<Array<boolean>> = [];
        let r: Array<boolean> = [];
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                r[j] = true;
            }
            arr[i] = r;
            r = [];
        }
        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                count = this.check_total(map, i, j);
                if (map[i][j]) {
                    if (count < 3) {
                        arr[i][j] = false;
                    } else {
                        arr[i][j] = true;
                    }
                } else {
                    if (count > 4) {
                        arr[i][j] = true;
                    } else {
                        arr[i][j] = false;
                    }
                }
            }
        }
        return arr;
    }
    public check_total(arr: Array<Array<boolean>>, x: number, y: number): number {
        let t = 0;
        let nx, ny;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                nx = x + i;
                ny = y + j;
                if (i === 0 && j === 0) {
                    continue;
                } else if (nx < 0 || ny < 0 || nx >= arr.length || ny >= arr[0].length) {
                    t += 1;
                } else if (arr[nx][ny]) {
                    t += 1;
                }
            }
        }
        return t;
    }
}
