class DungeonRunner {

    public static dungeon: Dungeon;
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.DUNGEON_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);

    public static fighting: KnockoutObservable<boolean> = ko.observable(false);
    public static map: DungeonMap;
    public static pokemonDefeated: number;
    public static chestsOpened: number;
    public static loot: string[];
    public static currentTileType;
    public static fightingBoss: KnockoutObservable<boolean> = ko.observable(false);

    public static initializeDungeon(dungeon) {
        if (!dungeon.isUnlocked()) {
            return false;
        }
        DungeonRunner.dungeon = dungeon;

        if (!DungeonRunner.hasEnoughTokens()) {
            Notifier.notify("You don't have enough dungeon tokens", GameConstants.NotificationOption.danger);
            return false;
        }
        DungeonRunner.payTokens();
        DungeonRunner.timeLeft(GameConstants.DUNGEON_TIME);
        DungeonRunner.map = new DungeonMap(GameConstants.DUNGEON_SIZE);
        DungeonRunner.pokemonDefeated = 0;
        DungeonRunner.chestsOpened = 0;
        DungeonRunner.loot = [];
        DungeonRunner.currentTileType = ko.computed(function () {
            return DungeonRunner.map.currentTile().type;
        });
        DungeonRunner.fightingBoss(false);
        Game.gameState(GameConstants.GameState.dungeon);
    }

    public static tick() {
        if (this.timeLeft() < 0) {
            this.dungeonLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.DUNGEON_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.DUNGEON_TIME * 100))
    }

    public static openChest() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.chest) {
            return;
        }

        DungeonRunner.chestsOpened++;
        let random: number = GameConstants.randomIntBetween(0, DungeonRunner.dungeon.itemList.length - 1);
        let input = GameConstants.BattleItemType[DungeonRunner.dungeon.itemList[random]];
        let amount = 1;
        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Item_magnet)()) {
            if (Math.random() < 0.5) {
                amount += 1
            }
        }
        Notifier.notify(`Found ${amount} ${input} in a dungeon chest`, GameConstants.NotificationOption.success);
        player.gainItem(input, amount);
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();
        if (DungeonRunner.chestsOpened == GameConstants.DUNGEON_CHEST_SHOW) {
            DungeonRunner.map.showChestTiles();
        }
        if (DungeonRunner.chestsOpened == GameConstants.DUNGEON_MAP_SHOW) {
            DungeonRunner.map.showAllTiles();
        }
    }

    public static startBossFight() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.boss || DungeonRunner.fightingBoss()) {
            return;
        }

        DungeonRunner.fightingBoss(true);
        DungeonBattle.generateNewBoss();
    }

    private static dungeonLost() {
        DungeonRunner.fighting(false);
        Game.gameState(GameConstants.GameState.town);
        Notifier.notify("You could not complete the dungeon in time", GameConstants.NotificationOption.danger);
    }

    public static dungeonWon() {
        GameHelper.incrementObservable(player.statistics.dungeonsCleared[Statistics.getDungeonIndex(DungeonRunner.dungeon.name())]);
        GameHelper.incrementObservable(player.dungeonsCleared[Statistics.getDungeonIndex(DungeonRunner.dungeon.name())]);
        Game.gameState(GameConstants.GameState.town);
        // TODO award loot with a special screen
        Notifier.notify("You have successfully completed the dungeon", GameConstants.NotificationOption.success);
    }

    public static timeLeftSeconds = ko.computed(function () {
        return (Math.ceil(DungeonRunner.timeLeft() / 10) / 10).toFixed(1);
    })

    public static dungeonCompleted(dungeon: Dungeon, includeShiny: boolean) {
        let possiblePokemon: string[] = dungeon.allPokemonNames;
        return RouteHelper.listCompleted(possiblePokemon, includeShiny);
    }

    public static hasEnoughTokens() {
        return player.dungeonTokens() >= DungeonRunner.dungeon.tokenCost;
    }

    public static payTokens() {
        player.dungeonTokens(player.dungeonTokens() - DungeonRunner.dungeon.tokenCost);
    }

}
