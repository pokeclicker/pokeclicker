class Mine {
    public static grid: Array<Array<KnockoutObservable<number>>>;
    public static rewardGrid: Array<Array<any>>;
    public static itemsFound: KnockoutObservable<number>;
    public static itemsBuried: number;
    public static rewardNumbers: Array<number>;
    public static toolSelected: KnockoutObservable<GameConstants.MineTool> = ko.observable(GameConstants.MineTool["Chisel"]);
    private static loadingNewLayer: boolean = true

    public static loadMine() {
        let tmpGrid = [];
        let tmpRewardGrid = [];
        Mine.rewardNumbers = [];
        Mine.itemsFound = ko.observable(0);
        Mine.itemsBuried = 0;
        for (let i = 0; i < GameConstants.Mine.sizeY; i++) {
            let row = [];
            let rewardRow = [];
            for (let j = 0; j < GameConstants.Mine.sizeX; j++) {
                row.push(ko.observable(Math.min(5, Math.max(1, Math.floor(Math.random() * 2 + Math.random() * 3) + 1))));
                rewardRow.push(0);
            }
            tmpGrid.push(row);
            tmpRewardGrid.push(rewardRow);
        }
        Mine.grid = tmpGrid;
        Mine.rewardGrid = tmpRewardGrid;

        for (let i = 0; i < player._maxUndergroundItems(); i++) {
            let x = Mine.getRandomCoord(GameConstants.Mine.sizeX);
            let y = Mine.getRandomCoord(GameConstants.Mine.sizeY);
            let item = UndergroundItem.getRandomItem();
            let res = Mine.canAddReward(x, y, item)
            if (res) {
                Mine.addReward(x, y, item);
            }
        }

        Mine.loadingNewLayer = false;
        Underground.showMine();
    }

    private static getRandomCoord(max: number): number {
        return Math.floor(Math.random() * (max - 3)) + 1;
    }

    private static canAddReward(x: number, y: number, reward: UndergroundItem): boolean {
        if (Mine.alreadyHasRewardId(reward.id)) {
            return false;
        }
        if (y + reward.space.length >= GameConstants.Mine.sizeY || x + reward.space[0].length >= GameConstants.Mine.sizeX) {
            return false;
        }
        for (let i = 0; i < reward.space.length; i++) {
            for (let j = 0; j < reward.space[i].length; j++) {
                if (reward.space[i][j] !== 0) {
                    if (Mine.rewardGrid[i + y][j + x] !== 0) {
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
        for (let i = 0; i < reward.space.length; i++) {
            for (let j = 0; j < reward.space[i].length; j++) {
                if (reward.space[i][j] !== 0) {
                    Mine.rewardGrid[i + y][j + x] = {
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
        if (GameConstants.MineTool[Mine.toolSelected()] == "Hammer") {
            Mine.hammer(i, j);
        } else {
            Mine.chisel(i, j);
        }
    }

    private static hammer(x: number, y: number) {
        if (player.mineEnergy >= GameConstants.HAMMER_ENERGY) {
            if (x < 0 || y < 0) {
                return;
            }
            let hasMined = false;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (Mine.grid[Mine.normalizeY(x + i)][Mine.normalizeX(y + j)]() > 0) {
                        hasMined = true;
                    }
                    Mine.grid[Mine.normalizeY(x + i)][Mine.normalizeX(y + j)](Math.max(0, Mine.grid[Mine.normalizeY(x + i)][Mine.normalizeX(y + j)]() - 1));
                }
            }
            if (hasMined) {
                player.mineEnergy -= GameConstants.HAMMER_ENERGY;
            }
        }
    }

    private static chisel(x: number, y: number) {
        if (Mine.grid[x][y]() > 0) {
            if (player.mineEnergy >= GameConstants.CHISEL_ENERGY) {
                Mine.grid[Mine.normalizeY(x)][Mine.normalizeX(y)](Math.max(0, Mine.grid[Mine.normalizeY(x)][Mine.normalizeX(y)]() - 2));
                player.mineEnergy -= GameConstants.CHISEL_ENERGY;
            }
        }
    }

    private static normalizeX(x: number): number {
        return Math.min(GameConstants.Mine.sizeX - 1, Math.max(0, x));
    }

    private static normalizeY(y: number): number {
        return Math.min(GameConstants.Mine.sizeY - 1, Math.max(0, y));
    }

    public static checkItemsRevealed() {
        for (let i = 0; i < Mine.rewardNumbers.length; i++) {
            if (Mine.checkItemRevealed(Mine.rewardNumbers[i])) {
                Underground.gainMineItem(Mine.rewardNumbers[i]);
                Notifier.notify("You found a " + Underground.getMineItemById(Mine.rewardNumbers[i]).name, GameConstants.NotificationOption.success);
                Mine.itemsFound(Mine.itemsFound() + 1);
                GameHelper.incrementObservable(player.statistics.digItems);
                Mine.rewardNumbers.splice(i, 1);
                i--;
                Mine.checkCompleted();
            }
        }
    }

    public static checkItemRevealed(id: number) {
        for (let i = 0; i < GameConstants.Mine.sizeX; i++) {
            for (let j = 0; j < GameConstants.Mine.sizeY; j++) {
                if (Mine.rewardGrid[j][i] != 0) {
                    if (Mine.rewardGrid[j][i].value == id) {
                        if (Mine.rewardGrid[j][i].revealed === 0) {
                            return false
                        }
                    }
                }
            }
        }
        return true;
    }

    private static checkCompleted() {
        if (Mine.itemsFound() >= Mine.itemsBuried) {
            setTimeout(Mine.completed, 1500);
            Mine.loadingNewLayer = true;
            GameHelper.incrementObservable(player.statistics.digDeeper)
        }
    }

    private static completed() {
        Notifier.notify("You dig deeper...", GameConstants.NotificationOption.info);
        ko.cleanNode(document.getElementById("mineBody"));
        Mine.loadMine();
        ko.applyBindings(Mine, document.getElementById("mineBody"));
        player.mineLayersCleared++;
    }

    public static loadSavedMine(mine) {
        this.grid = mine.grid.map((row) => {
            return row.map((num) => {
                return ko.observable(num)
            })
        });
        this.rewardGrid = mine.rewardGrid;
        this.itemsFound = ko.observable(mine.itemsFound);
        this.itemsBuried = mine.itemsBuried;
        this.rewardNumbers = mine.rewardNumbers;
        this.loadingNewLayer = false;

        Underground.showMine();
    }

    public static serialize() {
        let mine = {
            grid: this.grid,
            rewardGrid: this.rewardGrid,
            itemsFound: this.itemsFound,
            itemsBuried: this.itemsBuried,
            rewardNumbers: this.rewardNumbers
        }

        return ko.toJSON(mine);
    }
}