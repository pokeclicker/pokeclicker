class DungeonGuide {
  public trainerSprite = 0;
  public hired: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
  public tooltip: KnockoutComputed<string>;
  public intervalRunner: NodeJS.Timeout;

  constructor(
      public name: string,
      public description: string,
      public cost: Array<[number, Currency]>,
      public interval: number, // how often they take a step in ms
      public walk: () => void,
      public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement
  ) {
      SeededRand.seed(parseInt(this.name, 36));
      this.trainerSprite = SeededRand.intBetween(0, 118);

      this.tooltip = ko.pureComputed(() => `<strong>${this.name}</strong><br/>
          ${/*TODO: Cost: ${this.cost.forEach((cost) => `<img src="assets/images/currency/${GameConstants.Currency[cost.currency]}.svg" width="20px">&nbsp;${(cost.amount).toLocaleString('en-US')}`)}<br/>*/ ''}
          Efficiency: ${this.interval}ms<br/>`
      );
  }

  start() {
      clearInterval(this.intervalRunner);
      this.intervalRunner = setInterval(() => {
          try {
              this.walk();
          } catch (e) {
              console.error('Dungeon Guide failed to walk correctly:\n', e);
          }
      }, this.interval);
      GameHelper.incrementObservable(DungeonGuides.clears, -1);
  }

  end() {
      clearInterval(this.intervalRunner);
      if (DungeonGuides.clears() > 0) {
          // Add slight delay so map can keep up
          setTimeout(() => DungeonRunner.initializeDungeon(player.town().dungeon), 1);
      } else {
          this.fire();
          DungeonGuides.clears(1);
      }

  }

  isUnlocked(): boolean {
      return this.unlockRequirement?.isCompleted() ?? true;
  }

  calcCost(clears, price): Amount[] {
      const costs = [];
      this.cost.forEach(([multiplier, currency]) => {
          const temp = clears ** 0.975;
          const discount = temp / clears;
          costs.push(new Amount(Math.round(price * discount) * clears * multiplier, currency));
      });
      return costs;
  }

  hire(): void {
      Notifier.notify({
          title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
          message: 'Thanks for hiring me,\nI won\'t let you down!',
          type: NotificationConstants.NotificationOption.success,
          timeout: 30 * GameConstants.SECOND,
          setting: NotificationConstants.NotificationSetting.Hatchery.hatchery_helper,
      });
      DungeonGuides.hired(this);
  }

  fire(): void {
      Notifier.notify({
          title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
          message: 'Thanks for the work.\nLet me know when you\'re hiring again!',
          type: NotificationConstants.NotificationOption.info,
          timeout: 30 * GameConstants.SECOND,
          setting: NotificationConstants.NotificationSetting.Hatchery.hatchery_helper,
      });
      DungeonGuides.hired(null);
  }
}

class DungeonGuides {
  public static list: DungeonGuide[] = [];

  public static add(helper: DungeonGuide) {
      this.list.push(helper);
  }

  public static available: KnockoutComputed<DungeonGuide[]> = ko.pureComputed(() => DungeonGuides.list.filter(f => f.isUnlocked()));
  public static selected: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
  public static hired: KnockoutObservable<DungeonGuide> = ko.observable(null);
  public static clears: KnockoutObservable<number> = ko.observable(1).extend({ numeric: 0 });

  public static startDungeon(): void {
      // Add steps and attack based on efficiency
      this.hired()?.start();
  }

  public static endDungeon(): void {
      this.hired()?.end();
  }

  public static calcCost(): Amount[] {
      return this.available()[this.selected()].calcCost(this.clears(), player.town().dungeon.tokenCost);
  }

  public static canAfford(): boolean {
      return this.calcCost().every((cost) => this.canAffordCurrency(cost));
  }

  public static canAffordCurrency(cost: Amount): boolean {
      return App.game.wallet.hasAmount(cost);
  }

  public static hire(): void {
      const guide = this.available()[this.selected()];
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
      // Charge the player
      this.calcCost().forEach((cost) => App.game.wallet.loseAmount(cost));
      // Hire the guide
      guide.hire();
      // Start the dungeon
      DungeonRunner.initializeDungeon(player.town().dungeon);
  }
}

// Note: Mostly Gender-neutral names used as the trainer sprite is (seeded) randomly generated, or check the sprite
DungeonGuides.add(new DungeonGuide('Jimmy', 'Doesn\'t really know their way around, but will give it their best try!', [[10, Currency.money]], 1000, () => {
    // We just want to move randomly
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
        case 0:
            DungeonRunner.map.moveUp();
            break;
        case 1:
            DungeonRunner.map.moveRight();
            break;
        case 2:
            DungeonRunner.map.moveDown();
            break;
        case 3:
        default:
            DungeonRunner.map.moveLeft();
            break;
    }

    // Interact with the tile
    switch (DungeonRunner.map.currentTile().type()) {
        case GameConstants.DungeonTile.chest:
        case GameConstants.DungeonTile.boss:
        case GameConstants.DungeonTile.ladder:
            DungeonRunner.handleInteraction();
            break;
    }
}, new HatchRequirement(100)));


DungeonGuides.add(new DungeonGuide('Timmy', 'Doesn\'t really know their way around, but will give it their best try!', [[1, Currency.money],[10, Currency.dungeonToken]], 1000, () => {
    // We just want to move randomly
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
        case 0:
            DungeonRunner.map.moveUp();
            break;
        case 1:
            DungeonRunner.map.moveRight();
            break;
        case 2:
            DungeonRunner.map.moveDown();
            break;
        case 3:
        default:
            DungeonRunner.map.moveLeft();
            break;
    }

    // Interact with the tile
    switch (DungeonRunner.map.currentTile().type()) {
        case GameConstants.DungeonTile.chest:
        case GameConstants.DungeonTile.boss:
        case GameConstants.DungeonTile.ladder:
            DungeonRunner.handleInteraction();
            break;
    }
}, new HatchRequirement(100)));
