/// <reference path="../../declarations/enums/BerryType.d.ts"/>
/// <reference path="../../declarations/enums/FlavorType.d.ts"/>
/// <reference path="../../declarations/enums/BerryColor.d.ts"/>
/// <reference path="../../declarations/enums/BerryFirmness.d.ts"/>
/// <reference path="../../declarations/enums/SizeUnits.d.ts"/>

interface BerryFlavor {
    type: FlavorType,
    value: number,
}

class Berry {
    public flavors: BerryFlavor[];
    public wander: PokemonNameType[];

    public static baseWander: PokemonNameType[] = [
        'Tangela', 'Scyther',
        'Pineco', 'Heracross',
        'Cherubi',
        'Sewaddle', 'Karrablast',
        'Scatterbug',
        'Cutiefly', 'Bounsweet',
        'Blipbug', 'Gossifleur',
    ];

    public static isBaseWanderer(pokemon: PokemonNameType): boolean {
        return this.baseWander.includes(pokemon);
    }

    public static colorWander: Record<BerryColor, PokemonNameType[]> = {
        [BerryColor.Red]: ['Ledyba', 'Flabébé (Red)', 'Oricorio (Baile)'],
        [BerryColor.Purple]: ['Illumise', 'Oricorio (Sensu)'],
        [BerryColor.Pink]: ['Spewpa', 'Oricorio (Pa\'u)'],
        [BerryColor.Green]: ['Burmy (Plant)'],
        [BerryColor.Yellow]: ['Combee', 'Flabébé (Yellow)', 'Oricorio (Pom-Pom)'],
        [BerryColor.Blue]: ['Volbeat', 'Flabébé (Blue)'],
        [BerryColor.Silver]: ['Flabébé (White)'],
        [BerryColor.Gold]: ['Flabébé (Orange)'],
    };

    constructor(
        public type: BerryType,
        public growthTime: number[],
        public harvestAmount: number,
        public replantRate: number,
        public farmValue: number,
        public exp: number,
        flavors: number[],
        public smoothness: number,
        public color: BerryColor,
        public size: number,
        public firmness: BerryFirmness,
        public description: string[],
        public aura?: Aura,
        wander?: PokemonNameType[]
    ) {
        this.flavors = [];
        for (let i = 0; i < 5; i++) {
            this.flavors.push({type: i, value: flavors[i]});
        }
        this.wander = Berry.baseWander.concat(Berry.colorWander[this.color], wander ?? []);
    }

    get descriptionHTML(): string {
        return this.description.join('<br/>');
    }
}
