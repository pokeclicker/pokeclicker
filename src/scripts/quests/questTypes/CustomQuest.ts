type CustomQuestOptionalArgument = {
    clearedMessage?: string;
    npcDisplayName?: string,
    npcImageName?: string,
};

class CustomQuest extends Quest implements QuestInterface {
    public static questObservable: KnockoutObservable<CustomQuest> = ko.observable();
    initialValue?: number;
    customReward?: () => void;

    public getClearedMessage() {
        return this.optionalArgs.clearedMessage;
    }

    public getNpcDisplayName() {
        return this.optionalArgs.npcDisplayName;
    }

    public getNpcImageName() {
        return this.optionalArgs.npcImageName;
    }

    public getNpcImage() {
        const npcImageName = this.optionalArgs?.npcImageName;
        return `assets/images/npcs/${npcImageName}.png`;
    }

    constructor(amount: number, reward: (() => void) | number, description: string, focus: () => any, initialValue?: number, onLoad?: (() => void), public optionalArgs: CustomQuestOptionalArgument = {}) {
        super(amount, typeof reward == 'number' ? reward : 0);
        this.customDescription = description;
        this.focus = ko.pureComputed(focus);
        this.initialValue = initialValue;
        this.customReward = typeof reward == 'function' ? reward : undefined;
        this._onLoad = typeof onLoad == 'function' ? onLoad : undefined;
    }

    begin() {
        this.onLoad();
        if (this.initialValue !== undefined) {
            this.initial(this.initialValue);
        } else {
            super.begin();
        }
    }

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        if (this.optionalArgs?.clearedMessage !== undefined) {
            CustomQuest.questObservable(this);
            $('#customQuestStepClearedModal').modal('show');
        }
        return super.claim();
    }
}
