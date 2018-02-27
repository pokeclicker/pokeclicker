class PrestigeUpgrade {

    public id: number;
    public description: string;
    public cost: number;
    public costType: GameConstants.PrestigeType;
    public bonus: number;

    constructor(id: number, description: string, cost: number, costType: GameConstants.PrestigeType, bonus = 0) {
        this.id = id;
        this.description = description;
        this.cost = cost;
        this.costType = costType;
        this.bonus = bonus;
    }
}