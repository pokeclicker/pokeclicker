class DungeonRunner {

    public static dungeon: Dungeon;
    public static timeLimit: KnockoutObservable<number>;
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.DUNGEON_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static fighting: KnockoutObservable<boolean> = ko.observable(false);
    public static map: DungeonMap;
    public static pokemonDefeated: number;
    public static chestsOpened: number;
    public static loot: string[];
    public static currentTileType;

    public static initializeDungeon(dungeon) {
        DungeonRunner.dungeon = dungeon;
        DungeonRunner.timeLeft = ko.observable(GameConstants.DUNGEON_TIME_LIMIT);
        DungeonRunner.timeLimit = ko.observable(GameConstants.DUNGEON_TIME_LIMIT);
        DungeonRunner.map = new DungeonMap(GameConstants.DUNGEON_SIZE);
        DungeonRunner.pokemonDefeated = 0;
        DungeonRunner.chestsOpened = 0;
        DungeonRunner.loot = [];
        DungeonRunner.fighting(false);
        DungeonRunner.currentTileType = ko.computed(function () {
            return DungeonRunner.map.currentTile().type;
        });
        Game.gameState(GameConstants.GameState.dungeon);
    }

    public static tick() {
        if (this.timeLeft() < 0) {
            DungeonRunner.dungeonLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.DUNGEON_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.DUNGEON_TIME * 100))
    }

    public static openChest(){
        console.log("Chest opened");
        DungeonRunner.chestsOpened++;
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();
        // TODO add loot
    }

    private static dungeonLost() {
        Game.gameState(GameConstants.GameState.town);
        console.log("You lost... loser!");
    }

}