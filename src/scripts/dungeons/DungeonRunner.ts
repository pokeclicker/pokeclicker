/// <reference path="../../declarations/GameHelper.d.ts" />

class DungeonRunner {

    public static dungeon: Dungeon;
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.DUNGEON_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static fighting: KnockoutObservable<boolean> = ko.observable(false);
    public static map: DungeonMap;
    public static chestsOpened: KnockoutObservable<number> = ko.observable(0);
    private static chestsOpenedPerFloor: number[];
    public static currentTileType;
    public static encountersWon: KnockoutObservable<number> = ko.observable(0);
    public static fightingBoss: KnockoutObservable<boolean> = ko.observable(false);
    public static defeatedBoss: KnockoutObservable<boolean> = ko.observable(false);
    public static dungeonFinished: KnockoutObservable<boolean> = ko.observable(false);
    public static fightingLootEnemy: boolean;

    public static initializeDungeon(dungeon) {
        if (!dungeon.isUnlocked()) {
            return false;
        }
        DungeonRunner.dungeon = dungeon;

        if (!DungeonRunner.hasEnoughTokens()) {
            Notifier.notify({
                message: 'You don\'t have enough Dungeon Tokens.',
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
        let dungeonSize = GameConstants.BASE_DUNGEON_SIZE + (dungeon.optionalParameters.dungeonRegionalDifficulty ?? player.region);
        // Decrease dungeon size by 1 for every 10, 100, 1000 etc completes
        dungeonSize -= Math.max(0, App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]().toString().length - 1);
        const flash = App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]() >= 200;
        // Dungeon size minimum of MIN_DUNGEON_SIZE
        DungeonRunner.map = new DungeonMap(Math.max(GameConstants.MIN_DUNGEON_SIZE, dungeonSize), flash);

        DungeonRunner.chestsOpened(0);
        DungeonRunner.encountersWon(0);
        DungeonRunner.chestsOpenedPerFloor = new Array<number>(DungeonRunner.map.board().length).fill(0);
        DungeonRunner.currentTileType = ko.pureComputed(() => {
            return DungeonRunner.map.currentTile().type;
        });
        DungeonRunner.fightingLootEnemy = false;
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
            this.timeLeftPercentage(Math.floor(this.timeLeft() / (GameConstants.DUNGEON_TIME * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute)) * 100));
        }
        const currentFluteBonus = FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute);
        if (currentFluteBonus != this.timeBonus()) {
            if (currentFluteBonus > this.timeBonus()) {
                if (this.timeBonus() === 1) {
                    this.timeBonus(currentFluteBonus);
                    this.timeLeft(this.timeLeft() * this.timeBonus());
                } else {
                    this.timeLeft(this.timeLeft() / this.timeBonus());
                    this.timeBonus(currentFluteBonus);
                    this.timeLeft(this.timeLeft() * this.timeBonus());
                }
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
        } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.ladder) {
            DungeonRunner.nextFloor();
        }
    }

    public static openChest() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.chest) {
            return;
        }

        GameHelper.incrementObservable(DungeonRunner.chestsOpened);
        DungeonRunner.chestsOpenedPerFloor[DungeonRunner.map.playerPosition().floor]++;

        const clears = App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]();
        const debuffed = (DungeonRunner.dungeon.optionalParameters?.dungeonRegionalDifficulty ?? GameConstants.getDungeonRegion(DungeonRunner.dungeon.name)) < player.highestRegion() - 2;
        // Ignores debuff on first attempt to get loot that ignores debuff.
        let tier = DungeonRunner.dungeon.getRandomLootTier(clears);
        let loot = DungeonRunner.dungeon.getRandomLoot(tier);
        if (!loot.ignoreDebuff && debuffed) {
            tier = DungeonRunner.dungeon.getRandomLootTier(clears, debuffed);
            loot = DungeonRunner.dungeon.getRandomLoot(tier, true);
        }

        let amount = loot.amount || 1;

        const tierWeight = {
            common: 4,
            rare: 3,
            epic: 2,
            legendary: 1,
            mythic: 0,
        }[tier];

        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Dowsing_machine)()) {
            // Decreasing chance for rarer items (62.5% → 12.5%)
            const magnetChance = 0.5 / (4 / (tierWeight + 1));
            if (Rand.chance(magnetChance)) {
                // Gain more items in higher regions
                amount += Math.max(1, Math.round(Math.max(tierWeight, 2) / 8 * (GameConstants.getDungeonRegion(DungeonRunner.dungeon.name) + 1)));
            }
        }

        DungeonRunner.gainLoot(loot.loot, amount, tierWeight);

        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();
        if (DungeonRunner.chestsOpenedPerFloor[DungeonRunner.map.playerPosition().floor] == Math.floor(DungeonRunner.map.floorSizes[DungeonRunner.map.playerPosition().floor] / 3)) {
            DungeonRunner.map.showChestTiles();
        }
        if (DungeonRunner.chestsOpenedPerFloor[DungeonRunner.map.playerPosition().floor] == Math.ceil(DungeonRunner.map.floorSizes[DungeonRunner.map.playerPosition().floor] / 2)) {
            DungeonRunner.map.showAllTiles();
        }
    }

    public static gainLoot(input, amount, weight) {
        if (typeof BerryType[input] == 'number') {
            DungeonRunner.lootNotification(input, amount, weight, FarmController.getBerryImage(BerryType[GameConstants.humanifyString(input)]));
            return App.game.farming.gainBerry(BerryType[GameConstants.humanifyString(input)], amount, false);
        } else if (ItemList[input] instanceof PokeballItem) {
            DungeonRunner.lootNotification(input, amount, weight, ItemList[input].image);
            return App.game.pokeballs.gainPokeballs(GameConstants.Pokeball[GameConstants.humanifyString(input)],amount, false);
        } else if (UndergroundItems.getByName(input) instanceof UndergroundItem) {
            DungeonRunner.lootNotification(input, amount, weight, UndergroundItems.getByName(input).image);
            return Underground.gainMineItem(UndergroundItems.getByName(input).id, amount);
        } else if (PokemonHelper.getPokemonByName(input).name != 'MissingNo.') {
            const image = `assets/images/pokemon/${PokemonHelper.getPokemonByName(input).id}.png`;
            DungeonRunner.lootNotification(input, amount, weight, image);
            DungeonRunner.fightingLootEnemy = true;
            return DungeonBattle.generateNewLootEnemy(input);
        } else if (ItemList[input] instanceof MegaStoneItem) {
            DungeonRunner.lootNotification(input, amount, weight, ItemList[input].image);
            ItemList[input].gain(1);
        } else if (ItemList[input] instanceof EvolutionStone || EggItem || BattleItem || Vitamin || EnergyRestore) {
            if (ItemList[input] instanceof Vitamin) {
                GameHelper.incrementObservable(App.game.statistics.totalVitaminsObtained, amount);
            }
            DungeonRunner.lootNotification(input, amount, weight, ItemList[input].image);
            return player.gainItem(ItemList[input].name, amount);
        } else {
            DungeonRunner.lootNotification(input, amount, weight, ItemList[input].image);
            return player.gainItem(ItemList.xAttack, 1);
        }
    }

    public static lootNotification(input, amount, weight, image) {
        let message = `Found ${amount} × <img src="${image}" height="24px"/> ${GameConstants.pluralizeString(GameConstants.camelCaseToString(GameConstants.humanifyString(input)), amount)} in a dungeon chest.`;
        let type = NotificationConstants.NotificationOption.success;
        let setting = NotificationConstants.NotificationSetting.Dungeons.common_dungeon_item_found;

        if (typeof BerryType[input] == 'number') {
            message = `Found ${Math.floor(amount)} × <img src="${image}" height="24px"/> ${GameConstants.humanifyString(input)} ${GameConstants.pluralizeString('Berry', amount)} in a dungeon chest.`;
        } if (ItemList[input] instanceof PokeballItem) {
            message = `Found ${amount} × <img src="${image}" height ="24px"/> ${GameConstants.pluralizeString(ItemList[input].displayName, amount)} in a dungeon chest.`;
        } else if (PokemonHelper.getPokemonByName(input).name != 'MissingNo.') {
            message = `Encountered ${GameHelper.anOrA(input)} <img src="${image}" height="40px"/> ${GameConstants.humanifyString(input)} in a dungeon chest.`;
        }

        if (weight <= 2) {
            setting = NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found;
            if (weight <= 0.5) {
                type = NotificationConstants.NotificationOption.danger;
            } else {
                type = NotificationConstants.NotificationOption.warning;
            }
        }

        return Notifier.notify({
            message: message,
            type: type,
            setting: setting,
        });
    }

    public static startBossFight() {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.boss || DungeonRunner.fightingBoss()) {
            return;
        }

        DungeonRunner.fightingBoss(true);
        DungeonBattle.generateNewBoss();
    }

    public static nextFloor() {
        DungeonRunner.map.moveToCoordinates(
            Math.floor(DungeonRunner.map.floorSizes[DungeonRunner.map.playerPosition().floor + 1] / 2),
            DungeonRunner.map.floorSizes[DungeonRunner.map.playerPosition().floor + 1] - 1,
            DungeonRunner.map.playerPosition().floor + 1
        );
        DungeonRunner.map.playerPosition.notifySubscribers();
        DungeonRunner.timeLeft(DungeonRunner.timeLeft() + GameConstants.DUNGEON_LADDER_BONUS);
        DungeonRunner.map.playerMoved(false);
    }

    public static async dungeonLeave(shouldConfirm = Settings.getSetting('confirmLeaveDungeon').observableValue()): Promise<void> {
        if (DungeonRunner.map.currentTile().type() !== GameConstants.DungeonTile.entrance || DungeonRunner.dungeonFinished() || !DungeonRunner.map.playerMoved()) {
            return;
        }

        if (!shouldConfirm || await Notifier.confirm({
            title: 'Dungeon',
            message: 'Leave the dungeon?\n\nCurrent progress will be lost, but you will keep any items obtained from chests.',
            type: NotificationConstants.NotificationOption.warning,
            confirm: 'Leave',
            timeout: 1 * GameConstants.MINUTE,
        })) {
            DungeonRunner.dungeonFinished(true);
            DungeonRunner.fighting(false);
            DungeonRunner.fightingBoss(false);
            MapHelper.moveToTown(DungeonRunner.dungeon.name);
        }
    }

    private static dungeonLost() {
        if (!DungeonRunner.dungeonFinished()) {
            DungeonRunner.dungeonFinished(true);
            DungeonRunner.fighting(false);
            DungeonRunner.fightingBoss(false);
            MapHelper.moveToTown(DungeonRunner.dungeon.name);
            Notifier.notify({
                message: 'You could not complete the dungeon in time.',
                type: NotificationConstants.NotificationOption.danger,
            });
        }
    }

    public static dungeonWon() {
        if (!DungeonRunner.dungeonFinished()) {
            DungeonRunner.dungeonFinished(true);
            if (!App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]()) {
                DungeonRunner.dungeon.rewardFunction();
            }
            GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]);
            MapHelper.moveToTown(DungeonRunner.dungeon.name);
            Notifier.notify({
                message: 'You have successfully completed the dungeon.',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Dungeons.dungeon_complete,
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
