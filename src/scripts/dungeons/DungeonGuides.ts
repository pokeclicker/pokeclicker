class DungeonGuide {
    public trainerSprite = 0;
    public hired: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public tooltip: KnockoutComputed<string>;
    public ticks = 0;
    public index = 0;

    constructor(
        public name: string,
        public description: string,
        public cost: Array<[number, GameConstants.Currency]>,
        public fixedCost: Array<Amount>,
        public interval: number, // how often they take a step in ms
        public walk: () => void,
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement,
        trainerSprite?: number
    ) {
        SeededRand.seed(parseInt(this.name, 36));
        this.trainerSprite = trainerSprite ?? SeededRand.intBetween(0, 118);
    }

    start() {
        DungeonRunner.map.playerMoved(true);
        GameHelper.incrementObservable(DungeonGuides.clears, -1);
        GameHelper.incrementObservable(App.game.statistics.dungeonGuideAttempts[this.index]);
    }

    tick() {
        this.ticks += GameConstants.DUNGEON_TICK;
        if (this.ticks >= this.interval) {
            this.ticks = 0;
            try {
                this.walk();

                // Interact with the current tile
                switch (DungeonRunner.map.currentTile().type()) {
                    case GameConstants.DungeonTileType.chest:
                    case GameConstants.DungeonTileType.boss:
                    case GameConstants.DungeonTileType.ladder:
                        DungeonRunner.handleInteraction(GameConstants.DungeonInteractionSource.DungeonGuide);
                        break;
                }
            } catch (e) {
                console.error('Dungeon Guide failed to walk correctly:\n', e);
            }
        }
    }

    end() {
        // Check if more clears already paid for
        if (DungeonGuides.clears() > 0) {
            if (DungeonRunner.canStartDungeon(DungeonRunner.dungeon)) {
                // Need to reset the map
                DungeonRunner.map.board([]);
                DungeonRunner.initializeDungeon(player.town.dungeon);
            } else {
                // Most likely, dungeon is not open anymore
                Notifier.notify({
                    title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
                    message: 'I could not enter the dungeon anymore. Here is a refund.',
                    type: NotificationConstants.NotificationOption.danger,
                    timeout: 5 * GameConstants.MINUTE,
                });
                const uncompleteRatio = DungeonGuides.clears() / DungeonGuides.totalClears;
                const refunds = this.calcCost(DungeonGuides.totalClears, DungeonRunner.dungeon.tokenCost, DungeonRunner.dungeon.difficulty, true);
                // Only refund for the cancelled attempts
                refunds.forEach((a) => {
                    a.amount = Math.round(uncompleteRatio * a.amount);
                    App.game.wallet.addAmount(a, true);
                });
                this.fire();
            }
        } else {
            // No more clears, fire the guide, reset clears to 1 for modal
            this.fire();
        }

    }

    isUnlocked(): boolean {
        return this.unlockRequirement?.isCompleted() ?? true;
    }

    calcCost(clears: number, price: number, region: GameConstants.Region, includeDungeonCost = false): Amount[] {
        const costs = [];
        let discount = clears ** 0.975;
        discount /= clears;
        this.cost.forEach(([multiplier, currency]) => {
            costs.push(new Amount(Math.round((price * clears * discount) ** (1 - region / 100)) * multiplier, currency));
        });
        this.fixedCost.forEach((cost) => {
            const newCost = {...cost};
            newCost.amount = Math.round(cost.amount * clears * discount);
            costs.push(new Amount(newCost.amount, newCost.currency));
        });
        if (includeDungeonCost) {
            let dtCost = costs.find(c => c.currency === GameConstants.Currency.dungeonToken);
            if (!dtCost) {
                dtCost = new Amount(0, GameConstants.Currency.dungeonToken);
                costs.push(dtCost);
            }
            dtCost.amount += price * clears;
        }
        return costs;
    }

    hire(): void {
        Notifier.notify({
            title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for hiring me,\nI won\'t let you down!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * GameConstants.SECOND,
        });
        DungeonGuides.hired(this);
    }

    fire(): void {
        Notifier.notify({
            title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for the work.\nLet me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.info,
            timeout: 30 * GameConstants.SECOND,
        });
        // Hide modals
        $('.modal.show').modal('hide');
        // Reset our clears
        DungeonGuides.clears(1);
        DungeonGuides.totalClears = 1;
        DungeonGuides.hired(null);
    }
}

class DungeonGuides {
    public static list: DungeonGuide[] = [];

    public static add(guide: DungeonGuide) {
        guide.index = this.list.length;
        this.list.push(guide);
    }

    public static available: KnockoutComputed<DungeonGuide[]> = ko.pureComputed(() => DungeonGuides.list.filter(f => f.isUnlocked()));
    public static selected: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public static hired: KnockoutObservable<DungeonGuide> = ko.observable(null);
    public static clears: KnockoutObservable<number> = ko.observable(1).extend({ numeric: 0 });
    public static totalClears = 1;

    public static startDungeon(): void {
        // Add steps and attack based on efficiency
        this.hired()?.start();
    }

    public static endDungeon(): void {
        // runEarly as deferred updates can fail to happen before the dungeon is started again, e.g. DefeatDungeonBossQuest
        ko.tasks.runEarly();
        this.hired()?.end();
    }

    public static calcCost(includeDungeonCost = false): Amount[] {
        return this.list[this.selected()].calcCost(this.clears(), player.town.dungeon.tokenCost, player.town.dungeon.difficulty, includeDungeonCost);
    }

    public static calcDungeonCost(): Amount {
        return new Amount(player.town.dungeon.tokenCost * this.clears(), GameConstants.Currency.dungeonToken);
    }

    public static canAfford(): boolean {
        const costs = {
            [GameConstants.Currency.dungeonToken]: this.calcDungeonCost(),
        };
        this.calcCost().forEach((cost) => {
            const tempAmount = costs[cost.currency] ?? new Amount(0, cost.currency);
            tempAmount.amount += cost.amount;
            costs[cost.currency] = tempAmount;
        });
        return Object.values(costs).every((cost) => App.game.wallet.hasAmount(cost));
    }

    public static hire(): void {
        if (DungeonGuides.hired()) {
            return;
        }
        const guide = this.list[this.selected()];
        const dungeon = player.town.dungeon;
        // Check player has enough currency
        if (!this.canAfford()) {
            Notifier.notify({
                title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${guide.trainerSprite}.png" height="24px" class="pixelated"/> ${guide.name}`,
                message: 'You can\'t currently afford to hire me...',
                type: NotificationConstants.NotificationOption.warning,
                timeout: 30 * GameConstants.SECOND,
            });
            return;
        }
        // Just in case the dungeon is locked or something
        if (!DungeonRunner.canStartDungeon(dungeon)) {
            Notifier.notify({
                title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${guide.trainerSprite}.png" height="24px" class="pixelated"/> ${guide.name}`,
                message: 'You can\'t access that dungeon right now!',
                type: NotificationConstants.NotificationOption.warning,
                timeout: 30 * GameConstants.SECOND,
            });
            return;
        }
        // Charge the player and hire the guide
        guide.hire();
        this.calcCost().forEach((cost) => App.game.wallet.loseAmount(cost));
        App.game.wallet.loseAmount(this.calcDungeonCost());
        DungeonGuides.totalClears = DungeonGuides.clears();
        // Hide modals
        $('.modal.show').modal('hide');
        // Start the dungeon
        DungeonRunner.initializeDungeon(dungeon);
    }

    public static getRandomWeightedNearbyTile(nearbyTiles: DungeonTile[]): DungeonTile {
        const weightedTiles = nearbyTiles.map(t => {
            let weight = 0.5;
            weight += !t.isVisited ? 1.5 : 0;
            weight += [GameConstants.DungeonTileType.enemy].includes(t.type()) ? 1 : 0;
            weight += [GameConstants.DungeonTileType.chest].includes(t.type()) ? 2 : 0;
            weight += [GameConstants.DungeonTileType.boss, GameConstants.DungeonTileType.ladder].includes(t.type()) ? 4 : 0;
            return weight;
        });
        return Rand.fromWeightedArray(nearbyTiles, weightedTiles);
    }
}

// Note: Trainer sprite is (seeded) randomly generated, or can be set manually, please make sure it kind of matches the name
DungeonGuides.add(new DungeonGuide('Jimmy', 'Doesn\'t really know their way around a dungeon, but gives it their best try!',
    [[4, GameConstants.Currency.money]], [],
    2000,
    () => {
        // Get current position
        const pos = DungeonRunner.map.playerPosition();
        const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

        // We just want to move weighted randomly
        const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
        DungeonRunner.map.moveToTile(randomTile.position);
    }));


DungeonGuides.add(new DungeonGuide('Timmy', 'Can smell when there is a treasure chest on a tile near them!',
    [[4, GameConstants.Currency.money],[1, GameConstants.Currency.dungeonToken]], [],
    2000,
    () => {
        // Get current position
        const pos = DungeonRunner.map.playerPosition();
        const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

        // Check if any tiles within 3 spaces contain a chest
        const treasureTiles = DungeonRunner.map.board()[pos.floor].flat().filter(t => t.type() == GameConstants.DungeonTileType.chest);
        if (treasureTiles.length) {
            const paths = treasureTiles.map(t => DungeonRunner.map.findShortestPath(pos, t.position)).filter(t => t.length <= 3);
            if (paths?.length) {
                const shortestPath = Math.min(...paths.map(p => p.length));
                const path = Rand.fromArray(paths.filter(p => p.length == shortestPath));
                // We found some treasure, move to it
                DungeonRunner.map.moveToTile(path[0]);
                return;
            }
        }

        // We didn't find what we were looking for, We just want to move weighted randomly
        const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
        DungeonRunner.map.moveToTile(randomTile.position);
    }, new MaxRegionRequirement(GameConstants.Region.johto)));

DungeonGuides.add(new DungeonGuide('Shelly', 'Prefers to explore the unknown!',
    [[4, GameConstants.Currency.money],[4, GameConstants.Currency.dungeonToken]], [new Amount(5, GameConstants.Currency.questPoint)],
    1500,
    () => {
        // Get current position
        const pos = DungeonRunner.map.playerPosition();
        const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

        // Check if any tiles within 3 spaces are unexplored
        const unexploredTiles = DungeonRunner.map.board()[pos.floor].flat().filter(t => !t.isVisited);
        if (unexploredTiles.length) {
            const paths = unexploredTiles.map(t => DungeonRunner.map.findShortestPath(pos, t.position)).filter(t => t.length <= 3);
            if (paths?.length) {
                const shortestPath = Math.min(...paths.map(p => p.length));
                const path = Rand.fromArray(paths.filter(p => p.length == shortestPath));
                // We found an unexplored tile, move to it
                DungeonRunner.map.moveToTile(path[0]);
                return;
            }
        }

        // We didn't find what we were looking for, We just want to move weighted randomly
        const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
        DungeonRunner.map.moveToTile(randomTile.position);
    }, new MaxRegionRequirement(GameConstants.Region.hoenn)));

DungeonGuides.add(new DungeonGuide('Angeline', 'Can find treasure anywhere, loves to explore new areas!',
    [[15, GameConstants.Currency.money],[10, GameConstants.Currency.dungeonToken]], [new Amount(150, GameConstants.Currency.diamond)],
    1000,
    () => {
        // Get current position
        const pos = DungeonRunner.map.playerPosition();
        const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

        // Look for any unopened chest
        const treasureTiles = DungeonRunner.map.board()[pos.floor].flat().filter(t => t.type() == GameConstants.DungeonTileType.chest);
        if (treasureTiles.length) {
            const paths = treasureTiles.map(t => DungeonRunner.map.findShortestPath(pos, t.position));
            if (paths?.length) {
                const shortestPath = Math.min(...paths.map(p => p.length));
                const path = Rand.fromArray(paths.filter(p => p.length == shortestPath));
                // We found some treasure, move to it
                DungeonRunner.map.moveToTile(path[0]);
                return;
            }
        }

        // Look for any unexplored areas
        const unexploredTiles = DungeonRunner.map.board()[pos.floor].flat().filter(t => !t.isVisited);
        if (unexploredTiles.length) {
            const paths = unexploredTiles.map(t => DungeonRunner.map.findShortestPath(pos, t.position));
            if (paths?.length) {
                const shortestPath = Math.min(...paths.map(p => p.length));
                const path = Rand.fromArray(paths.filter(p => p.length == shortestPath));
                // We found an unexplored tile, move to it
                DungeonRunner.map.moveToTile(path[0]);
                return;
            }
        }

        // We didn't find what we were looking for, We just want to move weighted randomly
        const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
        DungeonRunner.map.moveToTile(randomTile.position);
    }, new MaxRegionRequirement(GameConstants.Region.kalos)));

DungeonGuides.add(new DungeonGuide('Georgia', 'Knows the path to the boss, avoids random encounters when possible.',
    [[20, GameConstants.Currency.money],[20, GameConstants.Currency.dungeonToken]], [new Amount(300, GameConstants.Currency.diamond)],
    900,
    () => {
        // Get current position
        const pos = DungeonRunner.map.playerPosition();
        const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

        const bossPosition = DungeonRunner.map.board()[pos.floor].flat().find(t => t.type() == GameConstants.DungeonTileType.boss)?.position;
        const ladderPosition = DungeonRunner.map.board()[pos.floor].flat().find(t => t.type() == GameConstants.DungeonTileType.ladder)?.position;

        // Shortest path to the boss avoiding enemies
        let path = bossPosition || ladderPosition ? DungeonRunner.map.findShortestPath(pos, bossPosition || ladderPosition, [GameConstants.DungeonTileType.enemy]) : [];
        // If no path avoiding enemies, then any path will do
        if (path?.length <= 1) {
            path = bossPosition || ladderPosition ? DungeonRunner.map.findShortestPath(pos, bossPosition || ladderPosition) : [];
        }

        if (path?.length) {
            // We found the boss or a ladder, move to it
            DungeonRunner.map.moveToTile(path[0]);
            return;
        }

        // We didn't find what we were looking for, We just want to move weighted randomly
        const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
        DungeonRunner.map.moveToTile(randomTile.position);
    }, new MaxRegionRequirement(GameConstants.Region.alola)));

DungeonGuides.add(new DungeonGuide('Drake', 'Knows the shortest path to the boss!',
    [[20, GameConstants.Currency.money],[20, GameConstants.Currency.dungeonToken]], [new Amount(450, GameConstants.Currency.diamond)],
    800,
    () => {
        // Get current position
        const pos = DungeonRunner.map.playerPosition();
        const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

        const bossPosition = DungeonRunner.map.board()[pos.floor].flat().find(t => t.type() == GameConstants.DungeonTileType.boss)?.position;
        const ladderPosition = DungeonRunner.map.board()[pos.floor].flat().find(t => t.type() == GameConstants.DungeonTileType.ladder)?.position;

        const path = bossPosition || ladderPosition ? DungeonRunner.map.findShortestPath(pos, bossPosition || ladderPosition) : [];

        if (path?.length) {
            // We found the boss or a ladder, move to it
            DungeonRunner.map.moveToTile(path[0]);
            return;
        }

        // We didn't find what we were looking for, We just want to move weighted randomly
        const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
        DungeonRunner.map.moveToTile(randomTile.position);
    }, new MaxRegionRequirement(GameConstants.Region.galar)));
