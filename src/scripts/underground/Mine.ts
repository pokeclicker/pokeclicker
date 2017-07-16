class Mine {
    public static grid: Array<Array<number>>;
    public static rewardGrid: Array<Array<any>>;
    public static itemsFound: KnockoutObservable<number>;
    public static itemsBuried: number;
    public static rewardNumbers: Array<number>;
    public static toolSelected: GameConstants.MineTool = GameConstants.MineTool["Chisel"];

    public static loadMine() {
        let tmpGrid = [];
        let tmpRewardGrid = [];
        Mine.rewardNumbers = [];
        for( let i = 0; i<GameConstants.Mine.sizeY; i++){
            let row = [];
            let rewardRow = [];
            for(let j = 0; j<GameConstants.Mine.sizeX; j++){
                row.push(Math.min(5, Math.max(1, Math.floor(Math.random()*2+Math.random()*3)+1)));
                rewardRow.push(0);
            }
            tmpGrid.push(row);
            tmpRewardGrid.push(rewardRow);
        }
        Mine.grid = tmpGrid;
        Mine.rewardGrid = tmpRewardGrid;
        
        for( let i = 0; i<3; i++){ //TODO: add maxUndergroundItems to player and use it here
            let x = Mine.getRandomCoord(GameConstants.Mine.sizeX);
            let y = Mine.getRandomCoord(GameConstants.Mine.sizeY);
            let item = UndergroundItem.getRandomItem();
            let res = Mine.canAddReward(x,y,item)
            if(res){
                Mine.addReward(x,y,item);
            }
        }
    }

    private static getRandomCoord(max: number): number {
        return Math.floor(Math.random()*(max-3)) + 1;
    }

    private static canAddReward(x: number, y: number, reward: UndergroundItem): boolean {
        console.log(reward)
        if(Mine.alreadyHasRewardId(reward.id)){
            return false;
        }
        if(y+reward.space.length >= GameConstants.Mine.sizeY || x+reward.space[0].length >= GameConstants.Mine.sizeX){
            return false;
        }
        for(let i = 0; i<reward.space.length; i++){
            for( let j = 0; j<reward.space[i].length; j++){
                if(reward.space[i][j] !== 0){
                    if(Mine.rewardGrid[i+y][j+x] !== 0){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private static alreadyHasRewardId(id: number): boolean {
        for (let row of Mine.rewardGrid) {
            for (let item of row) {
                if (item.value === id) {
                    return true;
                }
            }
        }
        return false;
    }

    private static addReward(x: number, y: number, reward: UndergroundItem) {
        for(let i = 0; i<reward.space.length; i++){
            for( let j = 0; j<reward.space[i].length; j++){
                if(reward.space[i][j] !== 0){
                    Mine.rewardGrid[i+y][j+x] = {
                        x: j,
                        y: i,
                        value: reward.space[i][j],
                        revealed: 0
                    };
                }
            }
        }
        Mine.itemsBuried++;
        Mine.rewardNumbers.push(reward.id);
    }

    public static click(i: number, j: number) {
        if (GameConstants.MineTool[Mine.toolSelected] == "Hammer") {
            Mine.hammer(i,j);
        } else {
            Mine.chisel(i,j);
        }
        Underground.showMine();
        //checkItemsRevealed();
        //showCurMine();
    }

    private static hammer(x: number, y: number) {
        if(player.mineEnergy >= GameConstants.HAMMER_ENERGY){
            if(x < 0 || y < 0){
                return;
            }
            let hasMined = false;
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if(Mine.grid[Mine.normalizeY(x+i)][Mine.normalizeX(y+j)] > 0){
                        hasMined = true;
                    }
                    Mine.grid[Mine.normalizeY(x+i)][Mine.normalizeX(y+j)] = Math.max(0, Mine.grid[Mine.normalizeY(x+i)][Mine.normalizeX(y+j)]-1);
                }
            }
            if(hasMined) {
                player.mineEnergy -= GameConstants.HAMMER_ENERGY;
            }
        }
    }

    private static chisel(x: number, y: number) {
        if(Mine.grid[x][y] > 0) {
            if (player.mineEnergy >= GameConstants.CHISEL_ENERGY) {
                Mine.grid[Mine.normalizeY(x)][Mine.normalizeX(y)] = Math.max(0, Mine.grid[Mine.normalizeY(x)][Mine.normalizeX(y)] - 2);
                player.mineEnergy -= GameConstants.CHISEL_ENERGY;
            }
        }
    }

    private static normalizeX(x: number): number {
        return Math.min(GameConstants.Mine.sizeX-1, Math.max(0, x));
    }

    private static normalizeY(y: number): number {
        return Math.min(GameConstants.Mine.sizeY-1, Math.max(0, y));
    }
}