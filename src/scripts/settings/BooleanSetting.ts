/// <reference path="Setting.ts" />

class BooleanSetting extends Setting {
    constructor(name: string, displayName:string , defaultValue: boolean) {
        super(
            name,
            displayName,
            [
                new GameConstants.Option("On", true),
                new GameConstants.Option("Off", false)
            ],
            defaultValue
        );
    }

    toggle() {
        if (this.value){
            this.set(false)
        } else {
            this.set(true)
        }
    }
}
