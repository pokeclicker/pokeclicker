class KeyItems implements Feature {
    name = 'Key Items';
    saveKey = 'keyItems';

    itemList: KeyItem[];

    defaults: Record<string, any>;

    constructor() {
        this.itemList = [];
    }

    initialize() {
        this.itemList = [
            new KeyItem(KeyItems.KeyItem.Teachy_tv, 'A television set that is tuned to a program with useful tips for novice TRAINERS', null, true, undefined, 'Teachy TV'),
            new KeyItem(KeyItems.KeyItem.Coin_case, 'A case for holding money', null, true, undefined, 'Coin Case'),
            new KeyItem(KeyItems.KeyItem.Pokeball_bag, 'A small bag that can hold many different types of PokéBalls', null, true, undefined, 'Pokéball Bag'),
            new KeyItem(KeyItems.KeyItem.Town_map, 'A very convenient map that can be viewed anytime. It even shows you your present location in the region', () => {
                return App.game.statistics.routeKills[GameConstants.Region.kanto][1]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, false, () => {
                Information.show({
                    steps: [
                        {
                            element: document.getElementById('townMap'),
                            intro: 'This is the Town Map,<br/>Use this to move to between different Routes, Towns and Dungeons.',
                        },
                    ],
                });
            }, 'Town Map'),
            // TODO obtain somewhere at the start
            new KeyItem(KeyItems.KeyItem.Factory_key, 'This pass serves as an ID card for gaining access to the Pokéball factory that lies along Route 13', undefined, undefined, undefined, 'Factory Key'),
            new KeyItem(KeyItems.KeyItem.Dungeon_ticket, 'This ticket grants access to all dungeons in the Kanto region and beyond,<br/><strong>Tip:</strong> You gain Dungeon Tokens by capturing Pokémon', null, false, () => {
                Information.show({
                    steps: [
                        {
                            element: document.getElementById('pokeballSelector'),
                            intro: 'Select which Pokéball types to catch Pokémon with based on their caught/shiny status.<br/><i><sup>Hover over the column titles for more info.</sup></i><br/><br/>Capturing Pokémon gains you <img title="Dungeon Tokens\nGained by capturing Pokémon" src="assets/images/currency/dungeonToken.svg" height="25px"> Dungeon Tokens.<br/><br/>Try now by clicking the "Caught" selector to change it.',
                        },
                    ],
                    exitOnEsc: false,
                    showButtons: false,
                });
                const caughtSelector: HTMLElement = document.querySelector('.pokeball-small.clickable.pokeball-selected');
                caughtSelector.addEventListener('click', () => {
                    Information.hide();
                    $('#pokeballSelectorModal').one('shown.bs.modal', null, () => {
                        // Need to set a timeout, otherwise it messes up the modal layout
                        setTimeout(() => {
                            Information.show({
                                steps: [
                                    {
                                        element: document.querySelector('#pokeballSelectorModal .modal-body'),
                                        intro: 'Select the <img title="Pokéball" src="assets/images/pokeball/Pokeball.svg" height="25px"> Pokéball to use this type of ball to capture already caught Pokémon, which will give you <img title="Dungeon Tokens\nGained by capturing Pokémon" src="assets/images/currency/dungeonToken.svg" height="25px"> Dungeon Tokens when captured.',
                                    },
                                ],
                                // Needed for IntroJs on modals
                                overlayOpacity: 0,
                            });
                        }, 100);

                        // Hide the IntroJS overlay once the user selects the Pokeball
                        const selectPokeball = document.querySelectorAll('#pokeballSelectorModal .clickable')[1];
                        selectPokeball.addEventListener('click', () => {
                            Information.hide();
                        },{
                            once: true,
                        });
                    });
                },{
                    once: true,
                });
            }, 'Dungeon Ticket'),
            // Fishing Rods and other Pokémon unlockers
            new KeyItem(KeyItems.KeyItem.Kanto_old_rod, 'An old and beat-up fishing rod. Use it by any body of water in the Kanto region to fish for wild Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.kanto][6]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Kanto Old Rod'),
            new KeyItem(KeyItems.KeyItem.Kanto_good_rod, 'A new, good-quality fishing rod. Use it by any body of water in the Kanto region to fish for wild Pokémon.', () => {
                return MapHelper.accessToTown('Fuchsia City');
            }, undefined, undefined, 'Kanto Good Rod'),
            new KeyItem(KeyItems.KeyItem.Kanto_super_rod, 'An awesome, high-tech fishing rod. Use it by any body of water in the Kanto region to fish for wild Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.kanto][12]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Kanto Super Rod'),
            new KeyItem(KeyItems.KeyItem.Johto_old_rod, 'Use by water in the Johto region to fish for Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.johto][32]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Johto Old Rod'),
            new KeyItem(KeyItems.KeyItem.Johto_good_rod, 'A good Rod for catching Pokémon in the Johto region.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.johto][39]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Johto Good Rod'),
            new KeyItem(KeyItems.KeyItem.Johto_super_rod, 'The best Rod for catching Pokémon in the Johto region.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.johto][28]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Johto Super Rod'),
            new KeyItem(KeyItems.KeyItem.Hoenn_old_rod, 'Use by any body of water in the Hoenn region to fish for wild Pokémon.', undefined, undefined, undefined, 'Hoenn Old Rod'),
            new KeyItem(KeyItems.KeyItem.Hoenn_good_rod, 'A decent fishing rod for catching wild Pokémon in the Hoenn region.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.hoenn][118]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Hoenn Good Rod'),
            new KeyItem(KeyItems.KeyItem.Hoenn_super_rod, 'The best fishing rod for catching wild Pokémon in the Hoenn region.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.hoenn][125]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Hoenn Super Rod'),
            new KeyItem(KeyItems.KeyItem.Sinnoh_old_rod, 'An old and beat-up fishing rod. Use it by any body of water in the Sinnoh region to fish for wild aquatic Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.sinnoh][202]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Sinnoh Old Rod'),
            new KeyItem(KeyItems.KeyItem.Sinnoh_good_rod, 'A new, good-quality fishing rod. Use it by any body of water in the Sinnoh region to fish for wild aquatic Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.sinnoh][209]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Sinnoh Good Rod'),
            new KeyItem(KeyItems.KeyItem.Sinnoh_super_rod, 'An awesome, high-tech fishing rod. Use it at any body of water in the Sinnoh region to fish for wild aquatic Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.sinnoh][225]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Sinnoh Super Rod'),
            new KeyItem(KeyItems.KeyItem.Unova_super_rod, 'An awesome, high-tech fishing rod. Use it at any body of water in the Unova region to fish for wild aquatic Pokémon.', () => {
                return App.game.statistics.routeKills[GameConstants.Region.unova][1]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Unova Super Rod'),
            new KeyItem(KeyItems.KeyItem.Kanto_HM03_surf, 'Can be used for crossing water in the Kanto region.', undefined, undefined, undefined, 'Kanto HM03 Surf'),
            new KeyItem(KeyItems.KeyItem.Johto_TM02_headbutt, 'Can be used to knock wild Pokémon from trees in the Johto region. Warning, may cause concussion.', () => {
                return App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Ilex Forest')]() > 0;
            }, undefined, undefined, 'Johto TM02 Headbutt'),
            new KeyItem(KeyItems.KeyItem.Johto_HM03_surf, 'Can be used for crossing water in the Johto region.', undefined, undefined, undefined, 'Johto HM03 Surf'),
            new KeyItem(KeyItems.KeyItem.Hoenn_HM03_surf, 'Can be used for crossing water in the Hoenn region.', undefined, undefined, undefined, 'Hoenn HM03 Surf'),
            new KeyItem(KeyItems.KeyItem.Hoenn_HM08_dive, 'Can be used to dive to the bottom of Hoenn\'s oceans to find new kinds of Pokémon.', undefined, undefined, undefined, 'Hoenn HM08 Dive'),
            new KeyItem(KeyItems.KeyItem.Sinnoh_HM03_surf, 'Can be used for crossing water in the Sinnoh region.', undefined, undefined, undefined, 'Sinnoh HM03 Surf'),
            new KeyItem(KeyItems.KeyItem.Unova_HM03_surf, 'Can be used for crossing water in the Unova region.', undefined, undefined, undefined, 'Unova HM03 Surf'),
            // TODO obtain somewhere at the start
            new KeyItem(KeyItems.KeyItem.Holo_caster, 'A device that allows users to receive and view hologram clips at any time. It’s also used to chat with others', undefined, undefined, undefined, 'Holo Caster'),
            new KeyItem(KeyItems.KeyItem.Mystery_egg, 'A mysterious Egg obtained from Mr. Pokémon. This allows you to use the Pokémon Day Care to help improve your Pokémons attack; some baby Pokémon can only be found through breeding too!', () => {
                return App.game.statistics.routeKills[GameConstants.Region.kanto][5]() >= GameConstants.ROUTE_KILLS_NEEDED;
            }, undefined, undefined, 'Mystery Egg'),
            new KeyItem(KeyItems.KeyItem.Safari_ticket, 'This ticket grants access to the Safari Zone right outside Fuchsia City'),
            new KeyItem(KeyItems.KeyItem.Wailmer_pail, 'This is a tool for watering Berries to allow you to operate the farm.', () => {
                return MapHelper.accessToRoute(14, GameConstants.Region.kanto);
            }, undefined, undefined, 'Wailmer Pail'),

            new KeyItem(KeyItems.KeyItem.Explorer_kit, 'A bag filled with convenient tools for exploring. It provides access to the Underground', undefined, undefined, undefined, 'Explorer Kit'),
            // TODO buy for 500 quest points
            new KeyItem(KeyItems.KeyItem.Event_calendar, 'This calendar will keep you up to date on the latest events', undefined, undefined, undefined, 'Event Calender'),
            new KeyItem(KeyItems.KeyItem.Shard_case, 'A case specifically designed for holding shards', undefined, undefined, undefined, 'Shard Case'),
            new KeyItem(KeyItems.KeyItem.DNA_splicers, 'A splicer that fuses certain Pokémon', () => {
                return App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Giant Chasm')]() > 0;
            }, undefined, undefined, 'DNA Splicers'),
        ];
    }

    hasKeyItem(item: KeyItems.KeyItem) {
        if (this.itemList[item] == undefined) {
            return false;
        }
        return this.itemList[item].isUnlocked;
    }

    gainKeyItem(item: KeyItems.KeyItem, silent = false) {
        if (!this.hasKeyItem(item)) {
            if (!silent) {
                KeyItemController.showGainModal(item);
            }
            this.itemList[item].unlock();
        }
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key] === true) {
                    // Unlock to dispose unlocker if needed
                    this.itemList[KeyItems.KeyItem[key]].unlock();
                }
            }
        }

        // Gain the item in case the requirements changed.
        for (const keyItem of this.itemList) {
            if (!keyItem.isUnlocked && keyItem.unlockReq !== null) {
                if (keyItem.unlockReq()) {
                    App.game.keyItems.gainKeyItem(keyItem.name);
                }
            }
        }
    }

    toJSON(): Record<string, any> {
        const save = {};
        for (let i = 0; i < this.itemList.length; i++) {
            save[KeyItems.KeyItem[this.itemList[i].name]] = this.itemList[i].isUnlocked;
        }
        return save;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}

namespace KeyItems {
    export enum KeyItem {
        'Teachy_tv',
        'Coin_case',
        'Pokeball_bag',
        'Town_map',
        'Factory_key',
        'Dungeon_ticket',
        'Kanto_old_rod',
        'Kanto_good_rod',
        'Kanto_super_rod',
        'Johto_old_rod',
        'Johto_good_rod',
        'Johto_super_rod',
        'Hoenn_old_rod',
        'Hoenn_good_rod',
        'Hoenn_super_rod',
        'Sinnoh_old_rod',
        'Sinnoh_good_rod',
        'Sinnoh_super_rod',
        'Unova_super_rod',
        'Kanto_HM03_surf',
        'Johto_TM02_headbutt',
        'Johto_HM03_surf',
        'Hoenn_HM03_surf',
        'Hoenn_HM08_dive',
        'Sinnoh_HM03_surf',
        'Unova_HM03_surf',
        'Holo_caster',
        'Mystery_egg',
        'Safari_ticket',
        'Wailmer_pail',
        'Explorer_kit',
        'Event_calendar',
        'Shard_case',
        'DNA_splicers'
    }
}
