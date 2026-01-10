class BattleFrontierMilestone {
    public obtained = ko.observable(0);
    public stageCount = ko.observable(0);

    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public requirement?: Requirement,
        public _image?: string,
        private _description?: string,
        public repeatStage = Math.max(100, stage)
    ) { }

    public isRepeatable(): boolean {
        return !!this.repeatStage;
    }

    public isObtainable(): boolean {
        return (this.isRepeatable() || !this.obtained()) && (this.requirement?.isCompleted() ?? true);
    }

    private gain(defeatedStage: number) {
        Notifier.notify({
            title: 'Battle Frontier',
            message: `You've successfully defeated stage ${defeatedStage.toLocaleString('en-US')} and earned:\n<span><img src="${this.image}" height="24px"/> ${this.description}</span>!`,
            type: NotificationConstants.NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.General.battle_frontier,
            timeout: (this.stage) / 10 * GameConstants.SECOND,
        });
        App.game.logbook.newLog(
            LogBookTypes.FRONTIER,
            createLogContent.gainBattleFrontierReward({
                reward: this.description,
                stage: defeatedStage.toLocaleString('en-US'),
            })
        );
        this.rewardFunction();
        GameHelper.incrementObservable(this.obtained);
        this.stageCount(0);
    }

    public nextStageReward(stage: number): number {
        if (!this.isObtainable()) {
            return 0;
        }
        if (!this.obtained()) {
            return stage <= this.stage ? this.stage : 0;
        }
        return Math.max(stage, this.minStage()) + this.repeatStage - this.stageCount() - 1;
    }

    public minStage() {
        return this.obtained() <= 1 ? this.stage : this.stage + (this.obtained() - 1) * 10;
    }

    clear(stage: number) {
        if (!this.isObtainable()) {
            return;
        }
        if (!this.obtained()) {
            if (stage == this.stage) {
                this.gain(stage);
            }
            return;
        }
        if (stage > this.minStage()) {
            GameHelper.incrementObservable(this.stageCount);
            if (this.stageCount() == this.repeatStage) {
                this.gain(stage);
            }
        }
    }

    public fromJSON(json: Array<number>) {
        if (!json) {
            return;
        }
        this.obtained(json[0]);
        this.stageCount(json[1]);
    }

    public toJSON() {
        if (this.obtained()) {
            return [this.obtained(), this.stageCount()];
        }
        return 0;
    }

    get image() {
        return this._image;
    }

    get description() {
        return this._description;
    }

    get displayName(): string | KnockoutObservable<string> {
        return this.description;
    }
}
