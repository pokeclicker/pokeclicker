class EffectEngineRunner {
    public static counter: number = 0;

    public static tick() {
        this.counter = 0;
        const timeToReduce = 1;
        for(let itemName in GameConstants.BattleItemType){
            player.effectList[itemName](Math.max(0, player.effectList[itemName]() - timeToReduce));
            if (player.effectList[itemName]() == 5){
              Notifier.notify(`The ${itemName}s effect is about to wear off!`, GameConstants.NotificationOption.warning);
            }
        }
    }

    public static getEffect(itemName: string) {
        if (!player) return 0;
        return player.effectList[itemName]();
    }

    public static addEffect(itemName: string){
        player.effectList[itemName](Math.max(0, player.effectList[itemName]() +  GameConstants.ITEM_USE_TIME));
    }

    public static formattedTimeLeft(itemName: string){
        return ko.computed(function () {
             const times = GameConstants.formatTime(player.effectList[itemName]()).split(':');
             if (+times[0] > 0) {
               return '60:00+';
             }
             times.shift();
             return times.join(':');
        }, this);
    }

    public static isActive(itemName: string): KnockoutComputed<boolean> {
        return ko.computed(function () {
            if (!player) return false;
            return !!player.effectList[itemName]();
        }, this);
    }
}
