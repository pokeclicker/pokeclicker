class FluteEffectRunner {
    public static counter = 0;
    public static numActiveFlutes: KnockoutObservable<number> = ko.observable(0);
    public static activeGemTypes: KnockoutObservableArray<number> = ko.observableArray();

    public static initialize(multiplier: Multiplier) {
        FluteEffectRunner.numActiveFlutes(0);
        GameHelper.enumStrings(GameConstants.FluteItemType).forEach((itemName: GameConstants.FluteItemType) => {
            const item = (ItemList[itemName] as FluteItem);
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => this.getFluteMultiplier(itemName));
            }
            if (this.isActive(itemName)()) {
                GameHelper.incrementObservable(this.numActiveFlutes,1);
            }
        });
        this.updateActiveGemTypes();
    }

    public static tick() {
        this.counter = 0;

        GameHelper.enumStrings(GameConstants.FluteItemType).forEach((itemName: GameConstants.FluteItemType) => {
            if (this.getLowestGem(itemName) > 0 && this.isActive(itemName)()) {
                player.effectList[itemName](Math.max(0, this.getLowestGem(itemName) - this.numActiveFlutes()));
                this.updateFormattedTimeLeft(itemName);
                if (this.numActiveFlutes() >= this.getLowestGem(itemName)) {
                    this.removeEffect(itemName);
                    Notifier.notify({
                        message: `You ran out of gems for the ${GameConstants.humanifyString(itemName)}'s effect!`,
                        type: NotificationConstants.NotificationOption.danger,
                        sound: NotificationConstants.NotificationSound.General.battle_item_timer,
                        setting: NotificationConstants.NotificationSetting.Items.battle_item_timer,
                        timeout: 1 * GameConstants.MINUTE,
                    });
                    App.game.logbook.newLog(
                        LogBookTypes.OTHER,
                        createLogContent.fluteRanOutOfGems({ flute: GameConstants.humanifyString(itemName) })
                    );
                }
            }
        });
        this.gemCost();
    }

    public static getLowestGem(itemName: string) {
        const item = (ItemList[itemName] as FluteItem);
        const gemArray = item.gemTypes.map(idx => App.game.gems.gemWallet[PokemonType[idx]]());
        const gemMaxTime = Math.min(...gemArray);
        return gemMaxTime;
    }

    public static updateActiveGemTypes() {
        this.activeGemTypes.removeAll();
        const gemTypes: Set<number> = new Set();
        GameHelper.enumStrings(GameConstants.FluteItemType).forEach((itemName: GameConstants.FluteItemType) => {
            if (FluteEffectRunner.isActive(itemName)()) {
                const item = (ItemList[itemName] as FluteItem);
                item.gemTypes.forEach(idx => gemTypes.add(PokemonType[idx]));
            }
        });
        [...gemTypes].forEach(x => this.activeGemTypes.push(x));
    }

    public static gemCost() {
        this.activeGemTypes().forEach(idx => App.game.gems.gainGems(-this.numActiveFlutes(), idx));
    }

    public static getEffect(itemName: GameConstants.FluteItemType) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static toggleEffect(itemName: GameConstants.FluteItemType) {

        if (this.isActive(itemName)()) {
            this.removeEffect(itemName);
            return;
        }

        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + FluteEffectRunner.getLowestGem(itemName)));
        GameHelper.incrementObservable(this.numActiveFlutes,1);
        this.updateFormattedTimeLeft(itemName);
        this.updateActiveGemTypes();
    }

    public static removeEffect(itemName: GameConstants.FluteItemType) {
        player.effectList[itemName](0);
        GameHelper.incrementObservable(this.numActiveFlutes, -1);
        this.updateFormattedTimeLeft(itemName);
        player.gainItem(itemName, 1);
        this.updateActiveGemTypes();
    }

    public static fluteFormattedTime(itemName: GameConstants.FluteItemType): number {
        return (player.effectList[itemName]() / this.numActiveFlutes());
    }

    public static fluteTooltip(itemName: GameConstants.FluteItemType): string {
        const str = [];
        str.push(`Gems/Second: ${FluteEffectRunner.numActiveFlutes()} <br><br>Gem Types Used:`);
        const item = (ItemList[itemName] as FluteItem);
        item.gemTypes.forEach(t => {
            str.push(`${t}: ${App.game.gems.gemWallet[PokemonType[t]]().toLocaleString('en-US')}`);
        });
        str.push(`<br>Time Remaining:<br> ${GameConstants.formatSecondsToTime(this.fluteFormattedTime(itemName))}`);
        return str.join('<br>');
    }

    public static updateFormattedTimeLeft(itemName: GameConstants.FluteItemType) {
        const times = GameConstants.formatTime(this.fluteFormattedTime(itemName)).split(':');
        if (+times[0] > 99) {
            return player.effectTimer[itemName]('99h+');
        } else if (+times[0] > 0) {
            return player.effectTimer[itemName](`${+times[0]}h`);
        }
        times.shift();
        player.effectTimer[itemName](times.join(':'));
    }

    public static getFluteMultiplier(itemName: GameConstants.FluteItemType) {
        const flute = (ItemList[itemName] as FluteItem);
        return this.isActive(flute.name)() ? flute.getMultiplier() : 1;
    }


    public static isActive(itemName: GameConstants.FluteItemType): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            if (!player) {
                return false;
            }
            return !!player.effectList[itemName]();
        });
    }
}
