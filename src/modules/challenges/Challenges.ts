/* eslint-disable no-console */
import { Saveable } from '../DataStore/common/Saveable';
import Challenge from './Challenge';

export default class Challenges implements Saveable {
    saveKey = 'challenges';

    defaults: Record<string, any> = {};

    list: Record<string, Challenge> = {
        regionalAttackDebuff: new Challenge('Regional Attack Debuff (recommended)', 'Lowers Pokémon attack based on native region and highest reached region', true),
        requireCompletePokedex: new Challenge('Require Complete Pokédex (recommended)', 'Requires a complete regional pokédex before moving on to the next region', true),
        disableClickAttack: new Challenge('No Click Attack', 'Disables the ability to use Click Attacks'),
        disableBattleItems: new Challenge('No Battle Item', 'Disables the usage of Battle Items'),
        disableMasterballs: new Challenge('No Masterball', 'Disables the usage of Masterballs'),
        disableOakItems: new Challenge('No Oak Item', 'Disables the usage of all Oak Items'),
        disableGems: new Challenge('No Gem', 'Disables the usage of Gems for increasing damage multipliers'),
        disableProteins: new Challenge('No Protein', 'Disables the usage of Proteins'),
        customStarter: new Challenge('Custom Starter', 'Choose a starter', false, true, true),
        monoType: new Challenge('Monotype', 'Choose type', false, true),
        teamRocket: new Challenge('Team Rocket', 'THIEFFFFFFF', false, false, true),
    };

    fromJSON(json): void {
        if (!json || !json.list) {
            return;
        }

        Object.entries(json.list).forEach(([challenge, value]) => {
            console.log(challenge);
            console.log(value);
            this.list[challenge]?.fromJSON(value);
        });
    }

    toJSON(): Record<string, any> {
        const list = {};
        Object.entries(this.list).forEach(([c, v]) => {
            list[c] = v.toJSON();
        });
        return {
            list,
        };
    }
}
