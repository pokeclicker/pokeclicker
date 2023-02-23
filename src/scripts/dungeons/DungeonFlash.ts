type FlashConfigState = '-' | 'F' | 'P' // exclude, flash, player

class DungeonFlash {
    private playerOffset: [number, number];

    public static tiers = [
        new DungeonFlash([
            ['-', 'F', '-'],
            ['F', 'P', 'F'],
            ['-', 'F', '-'],
        ]),
        new DungeonFlash([
            ['F', 'F', 'F'],
            ['F', 'P', 'F'],
            ['F', 'F', 'F'],
        ]),
        new DungeonFlash([
            ['-', '-', 'F', '-', '-'],
            ['-', 'F', 'F', 'F', '-'],
            ['F', 'F', 'P', 'F', 'F'],
            ['-', 'F', 'F', 'F', '-'],
            ['-', '-', 'F', '-', '-'],
        ]),
    ] as const

    constructor(private flashConfig: FlashConfigState[][]) {
        this.playerOffset = [
            flashConfig.findIndex(row => row.includes('P')),
            flashConfig.find(row => row.includes('P'))
                ?.findIndex(state => state === 'P'),
        ];

        if (this.playerOffset.includes(-1)) {
            console.error('DungeonFlash definition does not specify player location', flashConfig);
        }
    }

    apply(board: DungeonTile[][][], position: Point) {
        const [pi, pj] = this.playerOffset;
        const { floor, x, y } = position;

        return this.flashConfig.forEach((row, i) => {
            row.forEach((s, j) => {
                if (s === 'F') {
                    const tile = board[floor][y + i - pi]?.[x + j - pj];
                    if (tile) {
                        tile.isVisible = true;
                    }
                }
            });
        });
    }
}

