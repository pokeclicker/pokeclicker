import BerryColor from '../enums/BerryColor';
import BerryFirmness from '../enums/BerryFirmness';
import BerryType from '../enums/BerryType';
import BerryFlavor from '../interfaces/BerryFlavor';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';
import WandererOnFarmRequirement from '../requirements/WandererOnFarmRequirement';
import Aura from './Aura';
import BerryWandererGroup from './BerryWandererGroup';

export default class Berry {
    public flavors: BerryFlavor[];
    public wander: BerryWandererGroup[];

    // Base wanderers should never have requirements
    public static baseWander: BerryWandererGroup[] = [
        new BerryWandererGroup([
            'Tangela', 'Scyther',
            'Pineco', 'Heracross',
            'Cherubi',
            'Sewaddle', 'Karrablast',
            'Scatterbug',
            'Cutiefly', 'Bounsweet',
            'Blipbug', 'Gossifleur',
        ]),
    ];

    public static colorWander: Record<BerryColor, BerryWandererGroup[]> = {
        [BerryColor.Red]: [new BerryWandererGroup(['Ledyba', 'Flabébé (Red)', 'Oricorio (Baile)'])],
        [BerryColor.Purple]: [new BerryWandererGroup(['Illumise', 'Oricorio (Sensu)'])],
        [BerryColor.Pink]: [new BerryWandererGroup(['Spewpa', 'Oricorio (Pa\'u)'])],
        [BerryColor.Green]: [new BerryWandererGroup(['Burmy (Plant)'])],
        [BerryColor.Yellow]: [
            new BerryWandererGroup(['Combee', 'Flabébé (Yellow)', 'Oricorio (Pom-Pom)']),
            new BerryWandererGroup(['Combee (Wall)'], new WandererOnFarmRequirement(['Combee'], 3)),
        ],
        [BerryColor.Blue]: [new BerryWandererGroup(['Volbeat', 'Flabébé (Blue)'])],
        [BerryColor.Silver]: [new BerryWandererGroup(['Flabébé (White)'])],
        [BerryColor.Gold]: [new BerryWandererGroup(['Flabébé (Orange)'])],
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
        wander?: BerryWandererGroup[],
    ) {
        this.flavors = [];
        for (let i = 0; i < 5; i++) {
            this.flavors.push({ type: i, value: flavors[i] });
        }
        this.wander = Berry.baseWander.concat(Berry.colorWander[this.color], wander ?? []);
    }

    public static isBaseWanderer(pokemon: PokemonNameType): boolean {
        return this.baseWander.some(wanderer => wanderer.pokemon.includes(pokemon));
    }

    public getWandererRequirement(pokemon: PokemonNameType): Requirement {
        const groups = this.wander.filter(group => group.pokemon.includes(pokemon));
        if (!groups.length || groups.some(group => !group.req)) {
            return undefined;
        }
        return groups.length === 1 ? groups[0].req : new OneFromManyRequirement(groups.map(group => group.req));
    }

    get descriptionHTML(): string {
        return this.description.join('<br/>');
    }
}
