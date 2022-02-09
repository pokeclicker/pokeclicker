class fluteEffectRunner {
    public static counter = 0;
    public static numActiveFlutes: KnockoutObservable<number> = ko.observable(0);
    public static activeShardTypes: KnockoutObservableArray<number> = ko.observableArray();

    public static initialize(multiplier: Multiplier) {
        fluteEffectRunner.numActiveFlutes(0);
        GameHelper.enumStrings(GameConstants.FluteItemType).forEach((itemName) => {
            const item = (ItemList[itemName] as FluteItem);
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => this.isActive(itemName)() ? 1 + ((item.multiplyBy - 1) * AchievementHandler.achievementBonus()) : 1);
            }
            if (this.isActive(GameConstants.FluteItemType[itemName])()) {
                GameHelper.incrementObservable(this.numActiveFlutes,1);
            }
        });
        this.getActiveShardTypes();
    }

    public static tick() {
        this.counter = 0;

        for (const itemName in GameConstants.FluteItemType) {
            if (this.getLowestShard(itemName) > 0 && this.isActive(GameConstants.FluteItemType[itemName])()) {
                player.effectList[itemName](Math.max(0, this.getLowestShard(itemName) - this.numActiveFlutes()));
                this.updateFormattedTimeLeft(itemName);
                if (this.numActiveFlutes() >= this.getLowestShard(itemName)) {
                    this.removeEffect(itemName);
                    Notifier.notify({
                        message: `The ${GameConstants.humanifyString(itemName)}'s effect ran out!`,
                        type: NotificationConstants.NotificationOption.danger,
                        sound: NotificationConstants.NotificationSound.battle_item_timer,
                        setting: NotificationConstants.NotificationSetting.battle_item_timer,
                    });
                }
            }
        }
        this.shardCost();
    }

    public static getLowestShard(itemName: string) {
        const item = (ItemList[itemName] as FluteItem);
        const shardArray = item.shardTypes.map(idx => App.game.shards.shardWallet[ShardType[idx]]());
        const shardMaxTime = Math.min(...shardArray);
        return shardMaxTime;
    }

    public static getActiveShardTypes() {
        this.activeShardTypes.removeAll();
        let shardNames = [];
        for (const itemName in GameConstants.FluteItemType) {
            if (fluteEffectRunner.isActive(GameConstants.FluteItemType[itemName])()) {
                const item = (ItemList[itemName] as FluteItem);
                item.shardTypes.forEach(idx => shardNames.push(ShardType[idx]));
            }
        }
        shardNames = [...new Set(shardNames)];
        shardNames.forEach(x => this.activeShardTypes.push(x));
    }

    public static shardCost() {
        this.activeShardTypes().forEach(idx => App.game.shards.gainShards(-this.numActiveFlutes(), idx));
    }

    public static getEffect(itemName: string) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static addEffect(itemName: string) {

        //NOTE: this if statement is untested
        if (fluteEffectRunner.getLowestShard(itemName) == 0) {
            Notifier.notify({
                message: 'You don\'t have enough shards to use this Flute',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }
        if (this.isActive(GameConstants.FluteItemType[itemName])()) {
            this.removeEffect(itemName);
            return;
        }

        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + fluteEffectRunner.getLowestShard(itemName)));
        GameHelper.incrementObservable(this.numActiveFlutes,1);
        this.updateFormattedTimeLeft(itemName);
        this.getActiveShardTypes();
    }

    public static removeEffect(itemName: string) {
        player.effectList[itemName](0);
        GameHelper.incrementObservable(this.numActiveFlutes, -1);
        this.updateFormattedTimeLeft(itemName);
        player.gainItem(itemName, 1);
        this.getActiveShardTypes();
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

    public static getFluteMultiplier(itemName: string) {
        return this.isActive(GameConstants.FluteItemType[itemName])() ? (1 + 0.02 * AchievementHandler.achievementBonus()) : 1;
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
