/// <reference path="../../declarations/GameHelper.d.ts" />

class DungeonRunner {

    public static dungeon: Dungeon;
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.DUNGEON_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static fighting: KnockoutObservable<boolean> = ko.observable(false);
    public static map: DungeonMap;
    public static chestsOpened: number;
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
            Notifier.notify({
                message: 'You don\'t have enough dungeon tokens',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        App.game.wallet.loseAmount(new Amount(DungeonRunner.dungeon.tokenCost, GameConstants.Currency.dungeonToken));
        // Reset any trainers/pokemon if there was one previously
        DungeonBattle.trainer(null);
        DungeonBattle.trainerPokemonIndex(0);
        DungeonBattle.enemyPokemon(null);
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        DungeonRunner.timeLeft(GameConstants.DUNGEON_TIME * this.timeBonus());

        DungeonRunner.timeLeftPercentage(100);
        // Dungeon size increases with each region
        let dungeonSize = GameConstants.BASE_DUNGEON_SIZE + player.region;
        // Decrease dungeon size by 1 for every 10, 100, 1000 etc completes
        dungeonSize -= Math.max(0, App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]().toString().length - 1);
        const flash = App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]() >= 200;
        // Dungeon size minimum of MIN_DUNGEON_SIZE
        DungeonRunner.map = new DungeonMap(Math.max(GameConstants.MIN_DUNGEON_SIZE, dungeonSize), flash);

        DungeonRunner.chestsOpened = 0;
        DungeonRunner.currentTileType = ko.pureComputed(() => {
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
        if (this.map.playerMoved()) {
            this.timeLeft(this.timeLeft() - GameConstants.DUNGEON_TICK);
            this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.DUNGEON_TIME * 100));
        }
        const currentFluteBonus = FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute);
        if (currentFluteBonus != this.timeBonus()) {
            if (currentFluteBonus > this.timeBonus()) {
                this.timeBonus(currentFluteBonus);
                this.timeLeft(this.timeLeft() * this.timeBonus());
            } else {
                this.timeLeft(this.timeLeft() / this.timeBonus());
                this.timeBonus(currentFluteBonus);
            }
        }
    }

    /**
     * Handles the click event in the dungeon view
     */
    public static handleClick() {
        if (DungeonRunner.fighting() && !DungeonBattle.catching()) {
            DungeonBattle.clickAttack();
        } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.entrance) {
            DungeonRunner.dungeonLeave();
        } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.chest) {
            DungeonRunner.openChest();
        } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.boss && !DungeonRunner.fightingBoss()) {
            DungeonRunner.startBossFight();
        }
    }

    public static lootInput() {
        const generatedLoot = Rand.fromWeightedArray(DungeonRunner.dungeon.itemList, DungeonRunner.dungeon.lootWeightList);
        return generatedLoot;
    }

    public static openChest() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.chest) {
            return;
        }

        DungeonRunner.chestsOpened++;
        const loot = DungeonRunner.lootInput();
        let amount = loot.amount || 1;

        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Item_magnet)()) {
            // Decreasing chance for rarer items (62.5% → 12.5%)
            const magnetChance = 0.5 / (4 / (loot.weight + 1));
            if (Rand.chance(magnetChance)) {
                // Gain more items in higher regions
                amount += Math.max(1, Math.round(Math.max(loot.weight,2) / 8 * (GameConstants.getDungeonRegion(DungeonRunner.dungeon.name) + 1)));
            }
        }

        DungeonRunner.gainLoot(loot.loot, amount);

        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();
        if (DungeonRunner.chestsOpened == Math.floor(DungeonRunner.map.size / 3)) {
            DungeonRunner.map.showChestTiles();
        }
        if (DungeonRunner.chestsOpened == Math.ceil(DungeonRunner.map.size / 2)) {
            DungeonRunner.map.showAllTiles();
        }
    }

    public static gainLoot(input, amount) {
        if (typeof BerryType[input] == 'number') {
            Notifier.notify({
                message: `Found ${amount} × ${GameConstants.humanifyString(input)} Berry in a dungeon chest`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });

            return App.game.farming.gainBerry(BerryType[GameConstants.humanifyString(input)], amount, false);

        } else if (ItemList[input] instanceof PokeballItem) {
            Notifier.notify({
                message: `Found ${amount} × ${GameConstants.humanifyString(input)} in a dungeon chest`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });

            return App.game.pokeballs.gainPokeballs(GameConstants.Pokeball[GameConstants.humanifyString(input)],amount, false);

        }  else if (Underground.getMineItemByName(input) instanceof UndergroundItem) {
            Notifier.notify({
                message: `Found ${amount} × ${GameConstants.humanifyString(input)} in a dungeon chest`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });

            return Underground.gainMineItem(Underground.getMineItemByName(input).id, amount);

        }  else if (PokemonHelper.getPokemonByName(input).name != 'MissingNo.') {
            Notifier.notify({
                message: `Found ${1} × ${GameConstants.humanifyString(input)} in a dungeon chest`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });

            return DungeonBattle.generateNewLootEnemy(input);

        }   else if (ItemList[input] instanceof EvolutionStone || EggItem || BattleItem || Vitamin || EnergyRestore) {
            Notifier.notify({
                message: `Found ${amount} × ${GameConstants.humanifyString(input)} in a dungeon chest`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });

            return player.gainItem(ItemList[input].name, amount);

        }  else {
            return player.gainItem(ItemList['xAttack'], 1);
        }
    }

    public static startBossFight() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.boss || DungeonRunner.fightingBoss()) {
            return;
        }

        DungeonRunner.fightingBoss(true);
        DungeonBattle.generateNewBoss();
    }

    public static dungeonLeave() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.entrance || DungeonRunner.dungeonFinished() || !DungeonRunner.map.playerMoved()) {
            return;
        }

        DungeonRunner.dungeonFinished(true);
        DungeonRunner.fighting(false);
        DungeonRunner.fightingBoss(false);
        MapHelper.moveToTown(DungeonRunner.dungeon.name);
    }

    private static dungeonLost() {
        if (!DungeonRunner.dungeonFinished()) {
            DungeonRunner.dungeonFinished(true);
            DungeonRunner.fighting(false);
            DungeonRunner.fightingBoss(false);
            MapHelper.moveToTown(DungeonRunner.dungeon.name);
            Notifier.notify({
                message: 'You could not complete the dungeon in time',
                type: NotificationConstants.NotificationOption.danger,
            });
        }
    }

    public static dungeonWon() {
        if (!DungeonRunner.dungeonFinished()) {
            DungeonRunner.dungeonFinished(true);
            GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]);
            MapHelper.moveToTown(DungeonRunner.dungeon.name);
            DungeonRunner.dungeon.rewardFunction();
            // TODO award loot with a special screen
            Notifier.notify({
                message: 'You have successfully completed the dungeon',
                type: NotificationConstants.NotificationOption.success,
            });
        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(DungeonRunner.timeLeft() / 100) / 10).toFixed(1);
    })

    public static dungeonCompleted(dungeon: Dungeon, includeShiny: boolean) {
        const possiblePokemon: PokemonNameType[] = dungeon.allAvailablePokemon();
        return RouteHelper.listCompleted(possiblePokemon, includeShiny);
    }

    public static isAchievementsComplete(dungeon: Dungeon) {
        const dungeonIndex = GameConstants.getDungeonIndex(dungeon.name);
        return AchievementHandler.achievementList.every(achievement => {
            return !(achievement.property instanceof ClearDungeonRequirement && achievement.property.dungeonIndex === dungeonIndex && !achievement.isCompleted());
        });
    }

    public static isThereQuestAtLocation(dungeon: Dungeon) {
        return App.game.quests.currentQuests().some(q => {
            return q instanceof DefeatDungeonQuest && q.dungeon == dungeon.name;
        });
    }

    public static hasEnoughTokens() {
        return App.game.wallet.hasAmount(new Amount(DungeonRunner.dungeon.tokenCost, GameConstants.Currency.dungeonToken));
    }

    public static dungeonLevel(): number {
        return PokemonFactory.routeLevel(this.dungeon.difficultyRoute, player.region);
    }
}
