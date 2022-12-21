import { Saveable } from '../DataStore/common/Saveable';
import Challenge from './Challenge';

export default class Challenges implements Saveable {
    saveKey = 'challenges';

    defaults: Record<string, any> = {};

    list: Record<string, Challenge> = {
        regionalAttackDebuff: new Challenge('Regional Attack Debuff (recommended)', 'Lowers Pokémon attack based on native region and highest-reached region', true),
        requireCompletePokedex: new Challenge('Require Complete Pokédex (recommended)', 'Requires a complete regional Pokédex before moving on to the next region', true),
        disableClickAttack: new Challenge('No Click Attack', 'Disables the ability to use Click Attacks'),
        disableBattleItems: new Challenge('No Battle Item', 'Disables the usage of Battle Items'),
        disableMasterballs: new Challenge('No Master Ball', 'Disables the usage of Master Balls'),
        disableOakItems: new Challenge('No Oak Item', 'Disables the usage of all Oak Items'),
        disableGems: new Challenge('No Gem', 'Disables the usage of Gems for increasing damage multipliers'),
        disableVitamins: new Challenge('No Vitamins', 'Disables the usage of Vitamins'),
        slowEVs: new Challenge('Slow EVs', 'Gain EVs 10x slower'),
        realEvolutions: new Challenge('Real evolutions', 'Your Pokémon go away, when they evolve'),
    };

    fromJSON(json): void {
        if (!json || !json.list) {
            return;
        }

        Object.entries(json.list).forEach(([challenge, value]) => {
            this.list[challenge]?.active(!!value);
        });
    }

    toJSON(): Record<string, any> {
        const list = {};
        Object.entries(this.list).forEach(([c, v]) => {
            list[c] = v.active();
        });
        return {
            list,
        };
    }
}
