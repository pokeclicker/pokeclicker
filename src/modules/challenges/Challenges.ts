import { Saveable } from '../DataStore/common/Saveable';
import Challenge from './Challenge';
import { ChallengeType } from '../GameConstants';

export default class Challenges implements Saveable {
    saveKey = 'challenges';

    defaults: Record<string, any> = {};

    list: Record<string, Challenge> = {};

    constructor() {
        this.list.regionalAttackDebuff = new Challenge('Regional Attack Debuff', 'Lowers Pokémon attack based on native region and highest-reached region', ChallengeType.Recommended);
        this.list.requireCompletePokedex = new Challenge('Require Complete Pokédex', 'Requires a complete regional Pokédex before moving on to the next region', ChallengeType.Recommended);
        this.list.disableClickAttack = new Challenge('No Click Attack', 'Disables the ability to use Click Attacks', ChallengeType.Hard);
        this.list.disableBattleItems = new Challenge('No Battle Item', 'Disables the usage of Battle Items', ChallengeType.Hard);
        this.list.disableMasterballs = new Challenge('No Masterball', 'Disables the usage of Masterballs', ChallengeType.Hard);
        this.list.disableOakItems = new Challenge('No Oak Item', 'Disables the usage of all Oak Items', ChallengeType.Hard);
        this.list.disableGems = new Challenge('No Gem', 'Disables the usage of Gems for increasing damage multipliers', ChallengeType.Hard);
        this.list.disableProteins = new Challenge('No Protein', 'Disables the usage of Proteins', ChallengeType.Hard);
        this.list.slowEVs = new Challenge('Slow EVs', 'Gain EVs 10x slower', ChallengeType.Hard);
        this.list.requireCompleteShinyPokedex = new Challenge('Require Complete Shiny Pokédex', 'Requires a complete regional Shiny Pokédex before moving on to the next region', ChallengeType.Nightmare, [this.list.requireCompletePokedex]);
    }

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
