class DungeonRunner {

    public static dungeon: Dungeon;
    public static timeLeft: KnockoutObservable<number>;
    public static timeLimit: KnockoutObservable<number>;
    public static map: DungeonMap;
    public static pokemonDefeated: number;
    public static chestsOpenend: number;
    public static loot: string[];

    public static tick() {
        DungeonBattle.tick();
    }

    public static initializeDungeon(dungeon) {
        DungeonRunner.dungeon = dungeon;
        DungeonRunner.timeLeft = ko.observable(GameConstants.DUNGEON_TIME_LIMIT);
        DungeonRunner.timeLimit = ko.observable(GameConstants.DUNGEON_TIME_LIMIT);
        DungeonRunner.map = new DungeonMap(GameConstants.DUNGEON_SIZE);
        DungeonRunner.pokemonDefeated = 0;
        DungeonRunner.chestsOpenend = 0;
        DungeonRunner.loot = [];
    }
}