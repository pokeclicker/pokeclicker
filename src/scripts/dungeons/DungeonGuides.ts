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
  }

  end() {
      clearInterval(this.intervalRunner);
  }

  isUnlocked(): boolean {
      return this.unlockRequirement?.isCompleted() ?? true;
  }

  // String for currency in Notifications and Logs
  currencyString(amount: Amount) {
      switch (GameConstants.Currency[amount.currency]) {
          case 'money':
              return 'Pokédollars';
          default:
              return `${GameConstants.camelCaseToString(GameConstants.Currency[amount.currency])}s`;
      }
  }

  calcCost(clears, cost) {
      const temp = clears ** 0.975;
      const discount = temp / clears;
      return new Amount(Math.round(cost * discount) * clears, Currency.money);
  }

  canAfford(): boolean {
      return true;
      // TODO: Check if the player can afford to hire the Dungeon Guide
      // return this.cost.every((cost) => this.canAffordCurrency(cost));
  }

  canAffordCurrency(cost: Amount): boolean {
      return App.game.wallet.hasAmount(cost);
  }

  hire(): void {

      // Check the player has enough Currency to hire this Dungeon Guide
      if (!this.canAfford()) {
          Notifier.notify({
              title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
              message: 'You can\'t currently afford to hire me...',
              type: NotificationConstants.NotificationOption.warning,
              timeout: 30 * GameConstants.SECOND,
          });
          return;
      }

      // Dungeon Guide is hired
      this.hired(true);
      Notifier.notify({
          title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
          message: 'Thanks for hiring me,\nI won\'t let you down!',
          type: NotificationConstants.NotificationOption.success,
          timeout: 30 * GameConstants.SECOND,
          setting: NotificationConstants.NotificationSetting.Hatchery.hatchery_helper,
      });
  }

  fire(): void {
      Notifier.notify({
          title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
          message: 'Thanks for the work.\nLet me know when you\'re hiring again!',
          type: NotificationConstants.NotificationOption.info,
          timeout: 30 * GameConstants.SECOND,
          setting: NotificationConstants.NotificationSetting.Hatchery.hatchery_helper,
      });
      this.hired(false);
  }

  charge(): void {
      // Check the player can afford to pay the dungeon guide
      if (!this.canAfford()) {
          Notifier.notify({
              title: `[DUNGEON GUIDE] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
              message: 'It looks like you are a little short on payment right now...\nLet me know when you\'re hiring again!',
              type: NotificationConstants.NotificationOption.danger,
              timeout: 30 * GameConstants.MINUTE,
          });
          this.hired(false);
          // TODO: Create log for payment failure
          // App.game.logbook.newLog(
          //     LogBookTypes.OTHER,
          //     createLogContent.unableToPayDungeonGuide({
          //         currency: this.currencyString(),
          //         name: this.name,
          //     })
          // );
          return;
      }
      // TODO: Charge amount
      // this.cost.forEach((cost) => App.game.wallet.loseAmount(cost));
  }

  toJSON(): Record<string, any> {
      return {
          name: this.name,
          hired: this.hired(),
      };
  }

  fromJSON(json: Record<string, any>): void {
      if (!json) {
          return;
      }
      this.hired(json.hired || false);
  }
}

class DungeonGuides {
  public static list: DungeonGuide[] = [];

  public static add(helper: DungeonGuide) {
      this.list.push(helper);
  }

  public MAX_HIRES = 1;
  public available: KnockoutComputed<DungeonGuide[]>;
  public hired: KnockoutComputed<DungeonGuide[]>;
  public canHire: KnockoutComputed<boolean>;
  public requirement = new HatchRequirement(100);

  constructor() {
      this.available = ko.pureComputed(() => DungeonGuides.list.filter(f => f.isUnlocked()));
      this.hired = ko.pureComputed(() => DungeonGuides.list.filter(f => f.hired()));
      // TODO: Check if the player can hire a Dungeon Guide
      this.canHire =  ko.pureComputed(() => true);
  }

  public isUnlocked() {
      return this.requirement.isCompleted();
  }

  public startDungeon(): void {
      // Add steps and attack based on efficiency
      this.hired().forEach((helper, index) => {
          helper.start();
      });
  }

  public endDungeon(): void {
      // Charge the player for the work done
      this.hired().forEach((helper, index) => {
          helper.end();
      });
  }

  public toJSON(): Record<string, any>[] {
      return this.available().map(f => f.toJSON());
  }

  public fromJSON(json: Array<any>): void {
      if (!json || !json.length) {
          return;
      }

      DungeonGuides.list.forEach(f => {
          const data = json?.find(_f => _f.name == f.name);
          if (data) {
              f.fromJSON(data);
          }
      });
  }
}

// Note: Mostly Gender-neutral names used as the trainer sprite is (seeded) randomly generated, or check the sprite
DungeonGuides.add(new DungeonGuide('Joel', 'Doesn\'t really know their way around, but will give it their best try!', [[100, Currency.money]], 1000, () => {
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
