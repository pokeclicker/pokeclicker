class DungeonMap {
    size: number;
    map: DungeonTile[][];
    playerPosition: Point;


    constructor(size: number) {
        this.size = size;
        this.map = this.generateMap();

        this.playerPosition = new Point(Math.floor(size / 2), size - 1);
        this.map[this.playerPosition.y][this.playerPosition.x].isVisible = true;
    }

    public moveToCoordinates(x:number, y:number){
        this.moveToTile(new Point(x, y));
    }

    public moveToTile(point:Point){
        console.log(this.hasAccesToTile(point));
        if(this.hasAccesToTile(point)){
            this.map[this.playerPosition.y][this.playerPosition.x].hasPlayer = false;
            this.playerPosition = point;
            this.map[this.playerPosition.y][this.playerPosition.x].hasPlayer = true;
            this.map[this.playerPosition.y][this.playerPosition.x].isVisible = true;
        }
    }

    public hasAccesToTile(point:Point){
        //If any of the adjacent Tiles is visited, it's a valid Tile.
        if(point.x < 0 || point.x >= this.size || point.y < 0 || point.y >= this.size){
            return false
        }

        // If the point is visible, we can move there.
        if(this.map[point.y][point.x].isVisible){
            return true;
        }

        if(point.y < this.size-1 &&this.map[point.y+1][point.x].isVisible){
            return true;
        }

        if(point.y > 0 && this.map[point.y-1][point.x].isVisible){
            return true;
        }

        if(point.x < this.size-1 && this.map[point.y][point.x+1].isVisible){
            return true;
        }

        if(point.x > 0 && this.map[point.y][point.x-1].isVisible){
            return true;
        }

        return false;

    }


    public generateMap() {
        // Fill mapList with required Tiles
        let mapList: DungeonTile[] = [];

        mapList.push(new DungeonTile(GameConstants.DungeonTile.boss));
        for (let i: number = 0; i < this.size; i++) {
            mapList.push(new DungeonTile(GameConstants.DungeonTile.chest));
        }

        for (let i: number = 0; i < this.size * 2; i++) {
            mapList.push(new DungeonTile(GameConstants.DungeonTile.enemy));
        }

        for (let i: number = mapList.length; i < this.size * this.size; i++) {
            mapList.push(new DungeonTile(GameConstants.DungeonTile.empty));
        }

        // Shuffle the tiles randomly
        this.shuffle(mapList);

        // Create a 2d array
        let map: DungeonTile[][] = [];
        while (mapList.length) {
            map.push(mapList.splice(0, this.size));
        }
        return map;
    }


    /**
     * Shuffles array in place.
     * @param {Array} a items The array containing the items.
     */
    public shuffle(a) {
        let j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
}