class DungeonMap {
    board: KnockoutObservable<DungeonTile[][]>;
    playerPosition: KnockoutObservable<Point>;
    playerMoved: KnockoutObservable<boolean>;

    constructor(
        public size: number,
        public flash = false
    ) {
        this.board = ko.observable(this.generateMap());

        this.playerPosition = ko.observable(new Point(Math.floor(size / 2), size - 1));
        this.playerMoved = ko.observable(false);

        // Move the boss if it spawns on the player.
        if (this.currentTile().type() == GameConstants.DungeonTile.boss) {
            this.currentTile().type(GameConstants.DungeonTile.entrance);
            const newX = Rand.intBetween(0, size - 1);
            const newY = Rand.intBetween(0, size - 2); // Don't allow it to be on the bottom row
            this.board()[newY][newX].type(GameConstants.DungeonTile.boss);
            this.board()[newY][newX].calculateCssClass();
        }
        this.currentTile().type(GameConstants.DungeonTile.entrance);
        this.currentTile().isVisible = true;
        this.currentTile().isVisited = true;
        this.currentTile().hasPlayer = true;
        if (this.flash) {
            this.nearbyTiles(this.playerPosition()).forEach(t => t.isVisible = true);
        }
    }

    public moveToCoordinates(x: number, y: number) {
        if (this.moveToTile(new Point(x, y))) {
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
        if (this.hasAccesToTile(point)) {
            this.currentTile().hasPlayer = false;
            this.playerPosition(point);
            if (this.flash) {
                this.nearbyTiles(point).forEach(t => t.isVisible = true);
            }
            this.currentTile().hasPlayer = true;
            this.currentTile().isVisible = true;
            this.currentTile().isVisited = true;
            if (this.currentTile().type() == GameConstants.DungeonTile.enemy) {
                DungeonBattle.generateNewEnemy();
            }
            return true;
        }
        return false;
    }

    public showChestTiles(): void {
        for (let i = 0; i < this.board().length; i++) {
            for (let j = 0; j < this.board()[i].length; j++) {
                if (this.board()[i][j].type() == GameConstants.DungeonTile.chest) {
                    this.board()[i][j].isVisible = true;
                }
            }
        }
    }

    public showAllTiles(): void {
        for (let i = 0; i < this.board().length; i++) {
            for (let j = 0; j < this.board()[i].length; j++) {
                this.board()[i][j].isVisible = true;
            }
        }
    }

    public currentTile(): DungeonTile {
        return this.board()[this.playerPosition().y][this.playerPosition().x];
    }

    public nearbyTiles(point: Point): DungeonTile[] {
        const tiles = [];
        tiles.push(this.board()[point.y - 1]?.[point.x]);
        tiles.push(this.board()[point.y + 1]?.[point.x]);
        tiles.push(this.board()[point.y]?.[point.x - 1]);
        tiles.push(this.board()[point.y]?.[point.x + 1]);
        return tiles.filter(t => t);
    }

    public hasAccesToTile(point: Point): boolean {
        // If player fighting/catching they cannot move right now
        if (DungeonRunner.fighting() || DungeonBattle.catching()) {
            return false;
        }

        // If tile out of bounds, it's invalid
        if (point.x < 0 || point.x >= this.size || point.y < 0 || point.y >= this.size) {
            return false;
        }

        //If any of the adjacent Tiles is visited, it's a valid Tile.
        return this.nearbyTiles(point).some(t => t.isVisited);
    }

    public generateMap(): DungeonTile[][] {
        // Fill mapList with required Tiles
        const mapList: DungeonTile[] = [];

        // Boss
        mapList.push(new DungeonTile(GameConstants.DungeonTile.boss));

        // Chests (leave 1 space for enemy and 1 space for empty tile)
        for (let i = 0; i < this.size && mapList.length < this.size * this.size - 2; i++) {
            mapList.push(new DungeonTile(GameConstants.DungeonTile.chest));
        }

        // Enemy Pokemon (leave 1 space for empty tile)
        for (let i = 0; i < this.size * 2 + 3 && mapList.length < this.size * this.size - 1; i++) {
            mapList.push(new DungeonTile(GameConstants.DungeonTile.enemy));
        }

        // Fill with empty tiles
        for (let i: number = mapList.length; i < this.size * this.size; i++) {
            mapList.push(new DungeonTile(GameConstants.DungeonTile.empty));
        }

        // Shuffle the tiles randomly
        this.shuffle(mapList);
        // Make sure the player tile is empty
        while (mapList[mapList.length - Math.floor(this.size / 2) - 1].type() != GameConstants.DungeonTile.empty) {
            this.shuffle(mapList);
        }

        // Create a 2d array
        const map: DungeonTile[][] = [];
        while (mapList.length) {
            map.push(mapList.splice(0, this.size));
        }
        return map;
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
