class Mine {
    public static grid: Array<Array<number>>;
    public static rewardGrid: Array<Array<any>>;
    public static itemsFound: KnockoutObservable<number>;
    public static itemsBuried: number;
    public static rewardNumbers: Array<number>;

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
}