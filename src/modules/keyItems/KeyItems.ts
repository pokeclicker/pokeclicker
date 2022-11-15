import KeyItem from './KeyItem';
import KeyItemType from '../enums/KeyItemType';
import Information from '../utilities/Information';
import KeyItemController from './KeyItemController';
import { Feature } from '../DataStore/common/Feature';
import {
    getDungeonIndex, Region, ROUTE_KILLS_NEEDED, Pokerus,
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
                () => App.game.party.caughtPokemon.length >= 110, undefined, undefined, 'Holo Caster'),
            new KeyItem(KeyItemType.Mystery_egg, 'A mysterious Egg obtained from Mr. Pokémon. This allows you to use the Pokémon Day Care to help improve your Pokémon Attack. Some baby Pokémon can only be found through breeding, too!',
                () => App.game.statistics.routeKills[Region.kanto][5]() >= ROUTE_KILLS_NEEDED, undefined, undefined, 'Mystery Egg'),
            new KeyItem(KeyItemType.Safari_ticket, 'This ticket grants access to the Safari Zone right outside Fuchsia City.', undefined, undefined, undefined, 'Safari Ticket'),
            new KeyItem(KeyItemType.Wailmer_pail, 'This is a tool for watering Berries to allow you to operate the farm.',
                () => MapHelper.accessToRoute(14, Region.kanto), undefined, undefined, 'Wailmer Pail'),

            new KeyItem(KeyItemType.Explorer_kit, 'A bag filled with convenient tools for exploring. It provides access to the Underground.', undefined, undefined, undefined, 'Explorer Kit'),
            // TODO buy for 500 quest points
            new KeyItem(KeyItemType.Event_calendar, 'This calendar will keep you up to date on the latest events.', undefined, undefined, undefined, 'Event Calendar'),
            new KeyItem(KeyItemType.Gem_case, 'A case specifically designed for holding gems.', undefined, undefined, undefined, 'Gem Case'),
            new KeyItem(KeyItemType.DNA_splicers, 'A splicer that fuses certain Pokémon.', undefined, undefined, undefined, 'DNA Splicers'),
            new KeyItem(KeyItemType.Reins_of_unity, 'Reins that people presented to the king. They enhance Calyrex’s power over bountiful harvests and unite Calyrex with its beloved steeds.', undefined, undefined, undefined, 'Reins of Unity'),
            new KeyItem(KeyItemType.Pokerus_virus, 'A virus sample collected from the Hatchery.',
                () => App.game.statistics.dungeonsCleared[getDungeonIndex('Distortion World')]() > 0,
                undefined, () => { App.game.party.getPokemonById(player.regionStarters[Region.kanto]).pokerus = Pokerus.Contagious; }, 'Pokérus Virus'),
        ];
    }

    hasKeyItem(item: KeyItemType): boolean {
        if (this.itemList[item] === undefined) {
            return false;
        }
        return this.itemList[item].isUnlocked();
    }

    gainKeyItem(item: KeyItemType, silent = false): void {
        if (!this.hasKeyItem(item)) {
            this.itemList[item].unlock();
            this.itemList[item].unlockRewardOnUnlock();
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
        Object.keys(json).forEach((key) => {
            if (json[key] !== undefined) {
                if (json[key] === true) {
                    // Unlock to dispose unlocker if needed
                    this.itemList[KeyItemType[key]].unlock();
                }
            }
        });

        // Gain the item in case the requirements changed.
        this.itemList.forEach((keyItem) => {
            if (!keyItem.isUnlocked && keyItem.unlockReq !== null) {
                if (keyItem.unlockReq()) {
                    App.game.keyItems.gainKeyItem(keyItem.name);
                }
            }
        });
    }

    toJSON(): Record<string, any> {
        const save = {};
        for (let i = 0; i < this.itemList.length; i++) {
            save[KeyItemType[this.itemList[i].name]] = this.itemList[i].isUnlocked();
        }
        return save;
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    update(delta: number): void {}
}

namespace KeyItems {
}
