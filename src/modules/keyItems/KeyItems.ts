import KeyItem from './KeyItem';
import KeyItemType from '../enums/KeyItemType';
import Information from '../utilities/Information';
import KeyItemController from './KeyItemController';
import { Feature } from '../DataStore/common/Feature';
import {
    getDungeonIndex, Region, RegionalStarters, ROUTE_KILLS_NEEDED, Pokerus,
} from '../GameConstants';

export default class KeyItems implements Feature {
    name = 'Key Items';
    saveKey = 'keyItems';

    itemList: KeyItem[];

    defaults: Record<string, any>;

    constructor() {
        this.itemList = [];
    }

    initialize(): void {
        this.itemList = [
            new KeyItem(KeyItemType.Teachy_tv, 'A television set that is tuned to a program with useful tips for novice TRAINERS.', null, true, undefined, 'Teachy TV'),
            new KeyItem(KeyItemType.Coin_case, 'A case for holding Pokédollars.', null, true, undefined, 'Coin Case'),
            new KeyItem(KeyItemType.Pokeball_bag, 'A small bag that can hold many different types of Poké Balls.', null, true, undefined, 'Poké Ball Bag'),
            new KeyItem(KeyItemType.Town_map, 'A very convenient map that can be viewed anytime. It even shows you your present location in the region.',
                () => App.game.statistics.routeKills[Region.kanto][1]() >= ROUTE_KILLS_NEEDED,
                false,
                () => {
                    Information.show({
                        steps: [
                            {
                                element: document.getElementById('townMap'),
                                intro: 'This is the Town Map.<br/>Use this to move to between different Routes, Towns and Dungeons.',
                            },
                        ],
                    });
                }, 'Town Map'),
            new KeyItem(KeyItemType.Dungeon_ticket, 'This ticket grants access to all dungeons in the Kanto region and beyond.<br/><strong>Tip:</strong> You gain Dungeon Tokens by capturing Pokémon.', undefined, undefined, undefined, 'Dungeon Ticket'),
            new KeyItem(KeyItemType.Super_rod, 'The best fishing rod for catching wild water Pokémon.',
                () => App.game.statistics.routeKills[Region.kanto][12]() >= ROUTE_KILLS_NEEDED, undefined, undefined, 'Super Rod'),
            new KeyItem(KeyItemType.Holo_caster, 'A device that allows users to see and track Achievements. Completing Achievements gives useful bonuses.',
                () => App.game.statistics.dungeonsCleared[getDungeonIndex('Victory Road')]() > 0, undefined, undefined, 'Holo Caster'),
            new KeyItem(KeyItemType.Mystery_egg, 'A mysterious Egg obtained from Mr. Pokémon. This allows you to use the Pokémon Day Care to help improve your Pokémon Attack. Some baby Pokémon can only be found through breeding, too!',
                () => App.game.statistics.routeKills[Region.kanto][3]() >= ROUTE_KILLS_NEEDED, undefined, undefined, 'Mystery Egg'),
            new KeyItem(KeyItemType.Safari_ticket, 'This ticket grants access to the Safari Zone right outside Fuchsia City.', undefined, undefined, undefined, 'Safari Ticket'),
            new KeyItem(KeyItemType.Wailmer_pail, 'This is a tool for watering Berries to allow you to operate the farm.',
                () => MapHelper.accessToRoute(11, Region.kanto), undefined, undefined, 'Wailmer Pail'),

            new KeyItem(KeyItemType.Explorer_kit, 'A bag filled with convenient tools for exploring. It provides access to the Underground.', undefined, undefined, undefined, 'Explorer Kit'),
            new KeyItem(KeyItemType.Eon_ticket, 'A limited edition ticket for a cruise to the Southern Island.', undefined, undefined, undefined, 'Eon Ticket'),
            new KeyItem(KeyItemType.Event_calendar, 'This calendar will keep you up to date on the latest events and let you start events early.', undefined, undefined, undefined, 'Event Calendar'),
            new KeyItem(KeyItemType.Gem_case, 'A case specifically designed for holding gems.', undefined, undefined, undefined, 'Gem Case'),
            new KeyItem(KeyItemType.DNA_splicers, 'A splicer that fuses certain Pokémon.', undefined, undefined, undefined, 'DNA Splicers'),
            new KeyItem(KeyItemType.Reins_of_unity, 'Reins that people presented to the king. They enhance Calyrex’s power over bountiful harvests and unite Calyrex with its beloved steeds.', undefined, undefined, undefined, 'Reins of Unity'),
            new KeyItem(KeyItemType.Pokerus_virus,
                'A virus sample collected from your starter Pokémon. Infect more Pokémon in the hatchery, and use the new Pokérus Poké Ball option to focus catching Contagious pokemon for a damage boost.',
                () => App.game.statistics.dungeonsCleared[getDungeonIndex('Distortion World')]() > 0,
                undefined,
                () => {
                    App.game.pokeballs.alreadyCaughtContagiousSelection = App.game.pokeballs.alreadyCaughtSelection;
                    Information.show({
                        steps: [
                            {
                                element: document.getElementById('pokeballSelector'),
                                intro: 'You can now choose a different ball for Pokémon which are Contagious with Pokérus. This will be helpful for gaining EVs on those Pokémon.</br></br>Note: If you set the Contagious selector to "Do not catch", you will not catch Contagious pokemon - even if your Caught selector is set to catch Pokémon.',
                            },
                        ],
                        exitOnEsc: false,
                    });
                },
                'Pokérus Virus',
                () => {
                    const patientZero = App.game.party.getPokemon(
                        RegionalStarters[Region.kanto][player.regionStarters[Region.kanto]()],
                    ) || App.game.party.caughtPokemon[0];
                    patientZero.pokerus = Pokerus.Contagious;
                }),
            /*new KeyItem(KeyItemType['Z-Power_Ring'],
                // Using a Z-Crystal boosts the power of all your Pokémon of a shared type for a short while, after which some time is needed to recharge.'
                'A gift from Melemele\'s kahuna that enables the use of Z-Crystals. What they do is still under development.',
                undefined, undefined, undefined, 'Z-Power Ring'),*/
        ];
    }

    hasKeyItem(item: KeyItemType): boolean {
        const keyItem = this.itemList.find(k => k.id === item);
        if (keyItem === undefined) {
            return false;
        }
        return keyItem.isUnlocked();
    }

    gainKeyItem(item: KeyItemType, silent = false): void {
        if (!this.hasKeyItem(item)) {
            const keyItem = this.itemList.find(k => k.id === item);
            keyItem.unlock();
            keyItem.unlockRewardOnUnlock();
            if (!silent) {
                KeyItemController.showGainModal(item);
            }
        }
    }

    // eslint-disable-next-line class-methods-use-this
    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        this.itemList.forEach((keyItem) => {
            const key = KeyItemType[keyItem.id];
            if (json[key] === true) {
                // Unlock to dispose unlocker if needed
                keyItem.unlock();
            }

            // Gain the item in case the requirements changed.
            if (!keyItem.isUnlocked && keyItem.unlockReq !== null) {
                if (keyItem.unlockReq()) {
                    App.game.keyItems.gainKeyItem(keyItem.id);
                }
            }
        });
    }

    toJSON(): Record<string, any> {
        const save = {};
        for (let i = 0; i < this.itemList.length; i++) {
            save[KeyItemType[this.itemList[i].id]] = this.itemList[i].isUnlocked();
        }
        return save;
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    update(delta: number): void {}
}

namespace KeyItems {
}
