import BerryColor from '../enums/BerryColor';
import BerryFirmness from '../enums/BerryFirmness';
import BerryType from '../enums/BerryType';
import BerryFlavor from '../interfaces/BerryFlavor';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Aura from './Aura';

export default class Berry {
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
        wander?: PokemonNameType[],
    ) {
        this.flavors = [];
        for (let i = 0; i < 5; i++) {
            this.flavors.push({ type: i, value: flavors[i] });
        }
        this.wander = Berry.baseWander.concat(Berry.colorWander[this.color], wander ?? []);
    }

    public static isBaseWanderer(pokemon: PokemonNameType): boolean {
        return this.baseWander.includes(pokemon);
    }

    get descriptionHTML(): string {
        return this.description.join('<br/>');
    }
}
