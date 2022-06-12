class EffectEngineRunner {
    public static counter = 0;
    public static multipliers = ['×1', '×10', '×100', '×1000', 'All'];
    public static multIndex = ko.observable(0);

    public static initialize(multiplier: Multiplier) {
        GameHelper.enumStrings(GameConstants.BattleItemType).forEach((itemName) => {
            const item = (ItemList[itemName] as BattleItem);
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => this.isActive(itemName)() ? item.multiplyBy : 1);
            }
        });
    }

    public static amountToUse = ko.pureComputed(() => {
        // Either the digits specified, or All (Infinity)
        return Number(EffectEngineRunner.multipliers[EffectEngineRunner.multIndex()].replace(/\D/g, '')) || Infinity;
    })

    public static tick() {
        this.counter = 0;
        const timeToReduce = 1;
        for (const itemName in GameConstants.BattleItemType) {
            const timeRemaining = player.effectList[itemName]();
            if (timeRemaining > 0) {
                player.effectList[itemName](Math.max(0, timeRemaining - timeToReduce));
                this.updateFormattedTimeLeft(itemName);
            }
            if (player.effectList[itemName]() == 5) {
                Notifier.notify({
                    message: `The ${GameConstants.humanifyString(itemName)}'s effect is about to wear off!`,
                    type: NotificationConstants.NotificationOption.warning,
                    sound: NotificationConstants.NotificationSound.General.battle_item_timer,
                    setting: NotificationConstants.NotificationSetting.Items.battle_item_timer,
                });
            }
        }
    }

    public static incrementMultiplier() {
        this.multIndex((this.multIndex() + 1) % this.multipliers.length);
    }

    public static decrementMultiplier() {
        this.multIndex((this.multIndex() + this.multipliers.length - 1) % this.multipliers.length);
    }

    public static getEffect(itemName: string) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static addEffect(itemName: string, amount: number) {
        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + (GameConstants.ITEM_USE_TIME * amount)));
        this.updateFormattedTimeLeft(itemName);
    }

    public static updateFormattedTimeLeft(itemName: string) {
        const times = GameConstants.formatTime(player.effectList[itemName]()).split(':');
        if (+times[0] > 99) {
            return player.effectTimer[itemName]('99h+');
        } else if (+times[0] > 0) {
            return player.effectTimer[itemName](`${+times[0]}h`);
        }
        times.shift();
        player.effectTimer[itemName](times.join(':'));
    }

    public static getDungeonTokenMultiplier() {
        return this.isActive(GameConstants.BattleItemType.Token_collector)() ? 1.5 : 1;
    }


    public static isActive(itemName: string): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            if (!player) {
                return false;
            }
            return !!player.effectList[itemName]();
        });
    }
}
