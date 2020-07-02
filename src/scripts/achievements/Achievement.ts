class Achievement {
    public name: string;
    public description: string;
    public property: Requirement;
    public unlocked: boolean;
    public bonus: number;

    constructor(name: string, description: string, property: Requirement, bonus: number, unlocked = false) {
        this.name = name;
        this.description = description;
        this.property = property;
        this.bonus = bonus;
        this.unlocked = unlocked;
    }

    public check() {
        if (this.isCompleted()) {
            Notifier.notify({ message: `${this.name}<br><small>${this.description}</small>`, type: GameConstants.NotificationOption.warning });
            player.achievementsCompleted[this.name] = true;
            this.unlocked = true;
        }
    }

    public getProgress() {
        return this.isCompleted() ? this.property.requiredValue : this.property.getProgress();
    }

    public getProgressPercentage() {
        return this.isCompleted() ? '100.0' : this.property.getProgressPercentage();
    }

    public isCompleted() {
        return this.unlocked || this.property.isCompleted();
    }

    public getBonus() {
        const max = AchievementHandler.calculateMaxBonus();
        return (this.bonus / max * 100).toFixed(2);
    }
}
