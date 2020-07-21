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
    public static defeatedBoss: KnockoutObservable<boolean> = ko.observable(false);
    public static dungeonFinished: KnockoutObservable<boolean> = ko.observable(false);

    public static initializeDungeon(dungeon) {
        if (!dungeon.isUnlocked()) {
            return false;
        }
        DungeonRunner.dungeon = dungeon;

        if (!DungeonRunner.hasEnoughTokens()) {
            Notifier.notify({ message: "You don't have enough dungeon tokens", type: GameConstants.NotificationOption.danger });
            return false;
        }
        App.game.wallet.loseAmount(new Amount(DungeonRunner.dungeon.tokenCost, GameConstants.Currency.dungeonToken));

        DungeonRunner.timeLeft(GameConstants.DUNGEON_TIME);
        DungeonRunner.map = new DungeonMap(GameConstants.DUNGEON_SIZE + player.region);
        DungeonRunner.pokemonDefeated = 0;
        DungeonRunner.chestsOpened = 0;
        DungeonRunner.loot = [];
        DungeonRunner.currentTileType = ko.pureComputed(function () {
            return DungeonRunner.map.currentTile().type;
        });
        DungeonRunner.fightingBoss(false);
        DungeonRunner.defeatedBoss(false);
        DungeonRunner.dungeonFinished(false);
        App.game.gameState = GameConstants.GameState.dungeon;
    }

    public static tick() {
        if (this.timeLeft() <= 0) {
            if (this.defeatedBoss()) {
                this.dungeonWon();
            } else {
                this.dungeonLost();
            }
        }
        this.timeLeft(this.timeLeft() - GameConstants.DUNGEON_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.DUNGEON_TIME * 100));
    }

    public static openChest() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.chest) {
            return;
        }

        DungeonRunner.chestsOpened++;
        const random: number = GameConstants.randomIntBetween(0, DungeonRunner.dungeon.itemList.length - 1);
        const input = GameConstants.BattleItemType[DungeonRunner.dungeon.itemList[random]];
        let amount = 1;
        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Item_magnet)()) {
            if (Math.random() < 0.5) {
                amount += 1;
            }
        }
        Notifier.notify({ message: `Found ${amount} ${GameConstants.humanifyString(input)} in a dungeon chest`, type: GameConstants.NotificationOption.success });
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
        if (!DungeonRunner.dungeonFinished()) {
            DungeonRunner.dungeonFinished(true);
            DungeonRunner.fighting(false);
            DungeonRunner.fightingBoss(false);
            MapHelper.moveToTown(DungeonRunner.dungeon.name());
            Notifier.notify({ message: 'You could not complete the dungeon in time', type: GameConstants.NotificationOption.danger });
        }
    }

    public static dungeonWon() {
        if (!DungeonRunner.dungeonFinished()) {
            DungeonRunner.dungeonFinished(true);
            GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(DungeonRunner.dungeon.name())]);
            MapHelper.moveToTown(DungeonRunner.dungeon.name());
            // TODO award loot with a special screen
            Notifier.notify({ message: 'You have successfully completed the dungeon', type: GameConstants.NotificationOption.success });
        }
    }

    public static timeLeftSeconds = ko.pureComputed(function () {
        return (Math.ceil(DungeonRunner.timeLeft() / 10) / 10).toFixed(1);
    })

    public static dungeonCompleted(dungeon: Dungeon, includeShiny: boolean) {
        const possiblePokemon: string[] = dungeon.allPokemonNames;
        return RouteHelper.listCompleted(possiblePokemon, includeShiny);
    }

    public static hasEnoughTokens() {
        return App.game.wallet.hasAmount(new Amount(DungeonRunner.dungeon.tokenCost, GameConstants.Currency.dungeonToken));
    }
}
