class fluteEffectRunner {
    public static counter = 0;
    public static numActiveFlutes = 0;

    public static initialize(multiplier: Multiplier) {
        GameHelper.enumStrings(GameConstants.FluteItemType).forEach((itemName) => {
            const item = (ItemList[itemName] as FluteItem);
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => this.isActive(itemName)() ? item.multiplyBy : 1);
            }
            if (EffectEngineRunner.isActive(GameConstants.FluteItemType[itemName])()) {
                fluteEffectRunner.numActiveFlutes += 1;
            }
        });
    }

    public static tick() {
        this.counter = 0;
        const shardsToReduce = fluteEffectRunner.numActiveFlutes;
        for (const itemName in GameConstants.FluteItemType) {
            const timeRemaining = player.effectList[itemName]();
            if (timeRemaining > 0) {
                player.effectList[itemName](Math.max(0, timeRemaining - shardsToReduce));
                this.updateFormattedTimeLeft(itemName);
            }
            if (player.effectList[itemName]() == 30) {
                Notifier.notify({
                    message: `The ${GameConstants.humanifyString(itemName)}s effect is about to wear off!`,
                    type: NotificationConstants.NotificationOption.warning,
                    sound: NotificationConstants.NotificationSound.battle_item_timer,
                    setting: NotificationConstants.NotificationSetting.battle_item_timer,
                });
            }
        }
    }

    public static getEffect(itemName: string) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static addEffect(itemName: string) {
        const item = (ItemList[itemName] as FluteItem);
        const shardArray = item.shardTypes.map(idx => App.game.shards.shardWallet[ShardType[idx]]());
        const shardMaxTime = Math.min(...shardArray);

        //NOTE: this if statement is untested
        if (shardMaxTime == 0) {
            Notifier.notify({
                message: 'You don\'t have enough shards to use this Flute',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + shardMaxTime));
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
