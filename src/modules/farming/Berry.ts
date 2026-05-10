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

    /**
     * @param type The name as a `BerryType` enum
     * @param growthTime The seconds it takes to reach each growth stage: `[Sprout, Taller, Bloom, Berry, Wither]`
     * @param harvestAmount The amount of berries harvested from the Berry growth stage. Decimals are rounded down, and affected by the Harvest aura
     * @param replantRate The chance of an automatic replant after withering. A value of `1` is 100%
     * @param farmValue The amount of Farm Point currency obtained per harvest
     * @param exp The amount by which the price of Farm Point shop items are reduced to their initial cost
     * @param flavors The amount of each flavor within the berry `[Spicy, Dry, Sweet, Bitter, Sour]`. Used for mutations
     * @param smoothness The smoothness of the berry as a whole number from 20 to 60
     * @param color The color of the berry as a `BerryColor` enum. Used for wandering Pokémon
     * @param size The size of the berry in cm
     * @param firmness The firmness of the berry as a `BerryFirmness` enum
     * @param description Text that appears in the Berrydex
     * @param aura (Optional) An `AuraType` enum and modifiers during Taller, Bloom, and Berry stages as `new Aura()`
     * @param wander (Optional) Specific Pokémon that are attracted to the plant during its Berry stage
     */
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
