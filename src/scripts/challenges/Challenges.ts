class Challenges implements Saveable {
    saveKey = 'challenges';

    defaults: Record<string, any> = {};

    current: Record<string, any> = {
        disableClickAttack: ko.observable(false),
        disableBattleItems: ko.observable(false),
        disableMasterballs: ko.observable(false),
        disableOakItems: ko.observable(false),
        disableShards: ko.observable(false),
        disableProteins: ko.observable(false),
    };

    constructor() {}

    fromJSON(json): void {
        if (!json || !json.current) {
            return;
        }

        Object.entries(json.current || this.defaults).forEach(([challenge, value]) => {
            this.current[challenge](!!value);
        });
    }

    toJSON(): Record<string, any> {
        return {
            current: ko.toJS(this.current),
        };
    }

}
