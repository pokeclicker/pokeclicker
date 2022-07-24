import KeyItem from './KeyItem';
import KeyItemType from '../enums/KeyItemType';
import Information from '../utilities/Information';
import KeyItemController from './KeyItemController';
import { Feature } from '../DataStore/common/Feature';
import {
    getDungeonIndex, Region, ROUTE_KILLS_NEEDED, Starter, Pokerus,
} from '../GameConstants';
import LevelableKeyItem, { KeyItemLevel } from './LevelableKeyItem';

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
            // TODO obtain somewhere at the start
            new KeyItem(KeyItemType.Factory_key, 'This pass serves as an ID card for gaining access to the Poké Ball factory that lies along Route 13.', undefined, undefined, undefined, 'Factory Key'),
            new KeyItem(KeyItemType.Dungeon_ticket, 'This ticket grants access to all dungeons in the Kanto region and beyond.<br/><strong>Tip:</strong> You gain Dungeon Tokens by capturing Pokémon.', undefined, undefined, undefined, 'Dungeon Ticket'),

            // Fishing Rods and other Pokémon unlockers
            new LevelableKeyItem(KeyItemType.Fishing_rod, [
                new KeyItemLevel('Allows you to encounter common Pokémon that live in Kanto\'s waters.', () => App.game.statistics.routeKills[Region.kanto][6]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter uncommon Pokémon that live in Kanto\'s waters.', () => MapHelper.accessToTown('Fuchsia City')),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s waters.', () => App.game.statistics.routeKills[Region.kanto][12]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s waters and common Pokémon that live in Johto\'s waters.', () => App.game.statistics.routeKills[Region.johto][32]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s waters and uncommon Pokémon that live in Johto\'s waters.', () => App.game.statistics.routeKills[Region.johto][39]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s and Johto\'s waters.', () => App.game.statistics.routeKills[Region.johto][28]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s and Johto\'s waters and common Pokémon that live in Hoenn\'s waters.', undefined),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s and Johto\'s waters and uncommon Pokémon that live in Hoenn\'s waters.', () => App.game.statistics.routeKills[Region.hoenn][118]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s and Hoenn\'s waters.', () => App.game.statistics.routeKills[Region.hoenn][125]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s and Hoenn\'s waters and common Pokémon that live in Sinnoh\'s waters.', () => App.game.statistics.routeKills[Region.sinnoh][202]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s and Hoenn\'s waters and uncommon Pokémon that live in Sinnoh\'s waters.', () => App.game.statistics.routeKills[Region.sinnoh][209]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s and Sinnoh\'s waters.', () => App.game.statistics.routeKills[Region.sinnoh][225]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s and Sinnoh\'s waters and common Pokémon that live in Unova\'s waters.', undefined),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s and Sinnoh\'s waters and uncommon Pokémon that live in Unova\'s waters.', () => App.game.statistics.dungeonsCleared[getDungeonIndex('Reversal Mountain')]() > 0),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s and Unova\'s waters.', () => App.game.statistics.routeKills[Region.unova][1]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s and Unova\'s waters and common Pokémon that live in Kalos\' waters.', () => App.game.statistics.routeKills[Region.kalos][8]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s and Unova\'s waters and uncommon Pokémon that live in Kalos\' waters.', () => App.game.statistics.routeKills[Region.kalos][12]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s, Unova\'s and Kalos\' waters.', () => App.game.statistics.routeKills[Region.kalos][16]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s, Unova\'s and Kalos\' waters and common Pokémon that live in Alola\'s waters.', () => App.game.statistics.dungeonsCleared[getDungeonIndex('Brooklet Hill')]() > 0),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s, Unova\'s and Kalos\' waters and uncommon Pokémon that live in Alola\'s waters.', () => App.game.statistics.routeKills[Region.alola][13]() >= ROUTE_KILLS_NEEDED),
                new KeyItemLevel('Allows you to encounter rare Pokémon that live in Kanto\'s, Johto\'s, Hoenn\'s, Sinnoh\'s, Unova\'s, Kalos\' and Alola\'s waters.', () => App.game.statistics.dungeonsCleared[getDungeonIndex('Mina\'s Houseboat')]() > 0),
            ], undefined, undefined, 'Fishing Rod'),

            new LevelableKeyItem(KeyItemType.HM03_surf, [
                new KeyItemLevel('Can be used for crossing water in Kanto', undefined),
                new KeyItemLevel('Can be used for crossing water in Kanto and Johto', undefined),
                new KeyItemLevel('Can be used for crossing water in Kanto, Johto and Hoenn', undefined),
                new KeyItemLevel('Can be used for crossing water in Kanto, Johto, Hoenn and Sinnoh', undefined),
                new KeyItemLevel('Can be used for crossing water in Kanto, Johto, Hoenn, Sinnoh and Unova', undefined),
                new KeyItemLevel('Can be used for crossing water in Kanto, Johto, Hoenn, Sinnoh, Unova and Kalos', undefined),
                new KeyItemLevel('Can be used for crossing water in Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos and Alola', () => App.game.statistics.dungeonsCleared[getDungeonIndex('Brooklet Hill')]() > 0),
            ], undefined, undefined, 'HM03 Surf'),

            new KeyItem(KeyItemType.TM02_headbutt, 'Can be used to knock wild Pokémon from trees. Warning, may cause concussion.',
                () => App.game.statistics.dungeonsCleared[getDungeonIndex('Ilex Forest')]() > 0,
                undefined, undefined, 'TM02 Headbutt'),
            new KeyItem(KeyItemType.HM08_dive, 'Can be used to dive to the bottom of the ocean to find new kinds of Pokémon.', undefined, undefined, undefined, 'HM08 Dive'),
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
            new KeyItem(KeyItemType.DNA_splicers, 'A splicer that fuses certain Pokémon.',
                () => App.game.statistics.dungeonsCleared[getDungeonIndex('Giant Chasm')]() > 0,
                undefined, undefined, 'DNA Splicers'),
            new KeyItem(KeyItemType.Pokerus_virus, 'A virus sample collected from the Hatchery.',
                () => App.game.statistics.dungeonsCleared[getDungeonIndex('Distortion World')]() > 0,
                undefined, () => { App.game.party.getPokemon(pokemonMap[(Starter[player.starter()])].id).pokerus = Pokerus.Contagious; }, 'Pokérus Virus'),
        ];
    }

    hasKeyItem(item: KeyItemType): boolean {
        if (this.itemList[item] === undefined) {
            return false;
        }
        return this.itemList[item].isUnlocked();
    }

    hasKeyItemLevel(item: KeyItemType, level: number): boolean {
        if (this.itemList[item] === undefined) {
            return false;
        }
        return this.itemList[item].isUnlocked() && this.itemList[item] instanceof LevelableKeyItem && (this.itemList[item] as LevelableKeyItem).level >= level;
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
