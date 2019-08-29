class PrestigeUpgrade {

    public id: number;
    public description: string;
    public tooltip: string;
    public cost: number;
    public costType: GameConstants.PrestigeType;
    public bonus: number;

    constructor(id: number, description: string, cost: number, costType: GameConstants.PrestigeType, bonus = 0) {
        this.id = id;
        this.description = description;
        this.tooltip = description + `<br/>`;
        for (let i = 0; i < cost; i++)
            this.tooltip += `<img src="assets/images/currency/money.png" class="prestige-coins prestige-coin-${costType}" />`;
        this.cost = cost;
        this.costType = costType;
        this.bonus = bonus;
    }
}
