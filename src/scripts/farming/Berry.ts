///<reference path="./BerryType.ts"/>

interface BerryFlavor {
    type: FlavorType,
    value: number,
}

class Berry {
    public flavors: BerryFlavor[];
    public wander: PokemonNameType[];

    private static baseWander: PokemonNameType[] = [
        'Tangela', 'Scyther',
        'Pineco', 'Heracross',
        'Volbeat', 'Illumise',
        'Burmy (plant)', 'Combee', 'Cherubi', 'Munchlax',
    ];

    constructor(
        public type: BerryType,
        public growthTime: number[],
        public harvestAmount: number,
        public replantRate: number,
        public farmValue: number,
        public exp: number,
        flavors: number[],
        public color: BerryColor,
        public description: string[],
        public aura?: Aura,
        wander?: PokemonNameType[]
    ) {
        this.flavors = [];
        for (let i = 0; i < 5; i++) {
            this.flavors.push({type: i, value: flavors[i]});
        }
        this.wander = wander ? Berry.baseWander.concat(wander) : Berry.baseWander;
    }

    get descriptionHTML(): string {
        return this.description.join('<br/>');
    }
}
