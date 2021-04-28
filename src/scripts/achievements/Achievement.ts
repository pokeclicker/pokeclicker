class Achievement {
    constructor(
        public name: string,
        public description: string,
        public property: AchievementRequirement,
        public bonus: number,
        public region: GameConstants.Region,
        public unlocked = false,
        public achievableFunction: () => boolean | null = null
    ) {}

    public check() {
        if (this.isCompleted()) {
            Notifier.notify({
                title: `[Achievement] ${this.name}`,
                message: this.description,
                type: NotificationConstants.NotificationOption.warning,
                timeout: 1e4,
                sound: NotificationConstants.NotificationSound.achievement,
            });
            App.game.logbook.newLog(
                LogBookTypes.ACHIEVEMENT,
                `Earned "${this.name}".`);
            player.achievementsCompleted[this.name] = true;
            this.unlocked = true;
            AchievementHandler.filterAchievementList(true);
            // Track when users gains an achievement and their total playtime
            LogEvent('completed achievement', 'achievements', `completed achievement (${this.name})`, App.game.statistics.secondsPlayed());
        }
    }

    public getProgress() {
        return this.isCompleted() ? this.property.requiredValue : this.property.getProgress();
    }

    public getProgressPercentage() {
        return this.isCompleted() ? '100.0' : this.property.getProgressPercentage();
    }

    public isCompleted: KnockoutComputed<boolean> = ko.pureComputed(() => {
        return this.unlocked || this.property.isCompleted();
    })

    public getBonus() {
        if (!this.achievable()) {
            return 0;
        }
        const max = AchievementHandler.maxBonus()[this.region];
        return (this.bonus / max * 100).toFixed(2);
    }

    public achievable() {
        if (typeof this.achievableFunction === 'function') {
            return this.achievableFunction();
        }
        return true;
    }

    public getProgressText: KnockoutComputed<string> = ko.pureComputed(() => {
        return `${this.getProgress()}/${this.property.requiredValue}`;
    })
}
