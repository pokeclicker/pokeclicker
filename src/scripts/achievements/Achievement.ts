class Achievement {
    public name: string;
    public description: string;
    public property: Requirement;
    public unlocked: boolean;
    public bonus: number;

    constructor(name: string, description: string, property: Requirement, bonus:number, unlocked: boolean = false) {
        this.name = name;
        this.description = description;
        this.property = property;
        this.bonus = bonus;
        this.unlocked = unlocked;
    }

    public check() {
        if (this.isCompleted()) {
            Notifier.notify("Achievement completed: " + this.name + "!", GameConstants.NotificationOption.warning)
            player.achievementsCompleted[this.name] = true;
            this.unlocked = true;
        }
    }

    public isCompleted() {
        return this.unlocked || this.property.isCompleted();
    }
}