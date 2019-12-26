class CustomQuest extends Quest implements QuestInterface {
    constructor(amount: number, reward: number, description: string, focus) {
        super(amount, reward);
        this.description = description;
        this.questFocus = focus;
    }
}
