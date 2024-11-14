class DungeonMap {
    board: KnockoutObservable<DungeonTile[][][]>;
    playerPosition: KnockoutObservable<Point>;
    playerMoved: KnockoutObservable<boolean>;
    totalFights: KnockoutObservable<number>;
    totalChests: KnockoutObservable<number>;
    floorSizes: number[];

    constructor(
        size: number,
        private generateChestLoot: () => { loot: Loot, tier: LootTier },
        private flash?: DungeonFlash
    ) {
        if (size <= GameConstants.MAX_DUNGEON_SIZE) {
            this.floorSizes = [size];
        } else {
            this.floorSizes = [GameConstants.MAX_DUNGEON_SIZE, size - GameConstants.MAX_DUNGEON_SIZE + GameConstants.MIN_DUNGEON_SIZE - 1];
        }

        this.board = ko.observable(this.generateMap());

        this.playerPosition = ko.observable(new Point(Math.floor(this.floorSizes[0] / 2), this.floorSizes[0] - 1));
        this.playerMoved = ko.observable(false);

        this.currentTile().hasPlayer = true;
        this.flash?.apply(this.board(), this.playerPosition());

        this.totalFights = ko.observable(this.board().flat().flat().filter((t) => t.type() == GameConstants.DungeonTileType.enemy).length);
        this.totalChests = ko.observable(this.board().flat().flat().filter((t) => t.type() == GameConstants.DungeonTileType.chest).length);
    }

    public moveToCoordinates(x: number, y: number, floor = undefined) {
        if (this.moveToTile(new Point(x, y, floor ?? this.playerPosition().floor))) {
            this.playerMoved(true);
        }
    }

    public moveUp() {
        this.moveToCoordinates(this.playerPosition().x, this.playerPosition().y - 1);
    }

    public moveRight() {
        this.moveToCoordinates(this.playerPosition().x + 1, this.playerPosition().y);
    }

    public moveDown() {
        this.moveToCoordinates(this.playerPosition().x, this.playerPosition().y + 1);
    }

    public moveLeft() {
        this.moveToCoordinates(this.playerPosition().x - 1, this.playerPosition().y);
    }

    public moveToTile(point: Point): boolean {
        if (this.hasAccessToTile(point)) {
            this.currentTile().hasPlayer = false;
            this.playerPosition(point);
            this.flash?.apply(this.board(), this.playerPosition());

            this.currentTile().hasPlayer = true;
            this.currentTile().isVisible = true;
            this.currentTile().isVisited = true;
            if (this.currentTile().type() == GameConstants.DungeonTileType.enemy) {
                DungeonBattle.generateNewEnemy();
            }
            return true;
        }
        return false;
    }

    public showChestTiles(): void {
        for (let i = 0; i < this.board()[this.playerPosition().floor].length; i++) {
            for (let j = 0; j < this.board()[this.playerPosition().floor][i].length; j++) {
                if (this.board()[this.playerPosition().floor][i][j].type() == GameConstants.DungeonTileType.chest) {
                    this.board()[this.playerPosition().floor][i][j].isVisible = true;
                }
            }
        }
    }

    public showAllTiles(): void {
        for (let i = 0; i < this.board()[this.playerPosition().floor].length; i++) {
            for (let j = 0; j < this.board()[this.playerPosition().floor][i].length; j++) {
                this.board()[this.playerPosition().floor][i][j].isVisible = true;
            }
        }
    }

    public currentTile(): DungeonTile {
        return this.board()[this.playerPosition().floor][this.playerPosition().y][this.playerPosition().x];
    }

    public nearbyTiles(point: Point, avoidTiles: GameConstants.DungeonTileType[] = []): DungeonTile[] {
        const tiles: DungeonTile[] = [];
        tiles.push(this.board()[point.floor][point.y - 1]?.[point.x]);
        tiles.push(this.board()[point.floor][point.y + 1]?.[point.x]);
        tiles.push(this.board()[point.floor][point.y]?.[point.x - 1]);
        tiles.push(this.board()[point.floor][point.y]?.[point.x + 1]);
        return tiles.filter(t => t && !avoidTiles.includes(t.type()));
    }

    public findShortestPath(start: Point, goal: Point, avoidTiles: GameConstants.DungeonTileType[] = []) {
        const pathing = [start];
        const fromPos = {};
        fromPos[`${start.x},${start.y}`] = null;
        while (pathing.length > 0) {
            const current = pathing.shift();
            if (current.x === goal.x && current.y === goal.y) {
                break;
            }

            const neighbors = this.nearbyTiles(current, avoidTiles);
            const randNeighbors = Rand.shuffleArray(neighbors);
            randNeighbors.forEach(neighbor => {
                if (!fromPos[`${neighbor.position.x},${neighbor.position.y}`]) {
                    pathing.push(neighbor.position);
                    fromPos[`${neighbor.position.x},${neighbor.position.y}`] = current;
                }
            });
        }

        let current = goal;
        const path = [];
        while (current != undefined && (current.x !== start.x || current.y !== start.y)) {
            path.unshift(current);
            current = fromPos[`${current.x},${current.y}`];
        }
        return path;
    }


    public hasAccessToTile(point: Point): boolean {
        // If player fighting/catching they cannot move right now
        if (DungeonRunner.fighting() || DungeonBattle.catching()) {
            return false;
        }

        // If tile out of bounds, it's invalid
        if (point.x < 0 || point.x >= this.floorSizes[point.floor] || point.y < 0 || point.y >= this.floorSizes[point.floor]) {
            return false;
        }

        if (this.board()[point.floor][point.y]?.[point.x].isVisited) {
            return true;
        }

        //If any of the adjacent Tiles is visited, it's a valid Tile.
        return this.nearbyTiles(point).some(t => t.isVisited);
    }

    public generateMap(): DungeonTile[][][] {
        const map: DungeonTile[][][] = [];

        this.floorSizes.forEach((size, index) => {
            // Fill mapList with required Tiles
            const mapList: DungeonTile[] = [];

            // Boss or ladder
            if (index == this.floorSizes.length - 1) {
                mapList.push(new DungeonTile(GameConstants.DungeonTileType.boss, null));
            } else {
                mapList.push(new DungeonTile(GameConstants.DungeonTileType.ladder, null));
            }

            // Chests (leave 1 space for enemy and 1 space for entrance)
            for (let i = 0; i < size && mapList.length < size * size - 2; i++) {
                mapList.push(new DungeonTile(GameConstants.DungeonTileType.chest, this.generateChestLoot()));
            }

            // Enemy Pokemon (leave 1 space for entrance)
            for (let i = 0; i < size * 2 + 3 && mapList.length < size * size - 1; i++) {
                mapList.push(new DungeonTile(GameConstants.DungeonTileType.enemy, null));
            }

            // Fill with empty tiles (leave 1 space for entrance)
            for (let i: number = mapList.length; i < size * size - 1; i++) {
                mapList.push(new DungeonTile(GameConstants.DungeonTileType.empty, null));
            }

            // Shuffle the tiles randomly
            this.shuffle(mapList);
            // Then place the entrance tile
            const entranceTile = new DungeonTile(GameConstants.DungeonTileType.entrance, null);
            entranceTile.isVisible = true;
            entranceTile.isVisited = true;
            mapList.splice(mapList.length + 1 - Math.ceil(size / 2), 0, entranceTile);

            // Create a 2d array
            const floor: DungeonTile[][] = [];
            while (mapList.length) {
                floor.push(mapList.splice(0, size));
            }
            map.push(floor);
        });
        // Map positions to each tile
        return map.map((floor, floorIndex) => {
            return floor.map((row, rowIndex) => {
                return row.map((tile, tileIndex) => {
                    tile.position = new Point(tileIndex, rowIndex, floorIndex);
                    return tile;
                });
            });
        });
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items The array containing the items.
     */
    public shuffle(a): void {
        let j, x, i;
        for (i = a.length; i; i--) {
            j = Rand.floor(i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
}
