///<reference path="./BerryType.ts"/>

interface BerryFlavor {
    type: FlavorType,
    value: number,
}

class Berry {
    public type: BerryType;
    public growthTime: number[];
    public harvestAmount: number;
    public replantRate: number;
    public farmValue: number;

    public flavors: BerryFlavor[];
    public color: BerryColor;

    public description: string[];

    public aura?: Aura;

    public wander: string[];

    private static baseWander = [
        'Butterfree', 'Weedle', 'Tangela', 'Scyther',
        'Ledyba', 'Pineco', 'Heracross',
        'Wurmple', 'Volbeat', 'Illumise',
        'Burmy (plant)', 'Combee', 'Cherubi', 'Munchlax',
    ];

    constructor(type: BerryType, growthTime: number[],
        harvestAmount: number, replantRate: number, farmValue: number,
        flavors: number[], color: BerryColor, description: string[],
        aura?: Aura, wander?: string[]) {
        this.type = type;
        this.growthTime = growthTime;
        this.harvestAmount = harvestAmount;
        this.replantRate = replantRate;
        this.farmValue = farmValue;
        this.flavors = [];
        for (let i = 0;i < 5;i++) {
            this.flavors.push({type: i, value: flavors[i]});
        }
        this.color = color;
        this.description = description;
        this.aura = aura;
        this.wander = Berry.baseWander.concat(wander);
    }

    get descriptionHTML(): string {
        return this.description.join('<br/>');
    }
}
