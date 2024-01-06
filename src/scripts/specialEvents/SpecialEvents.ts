/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;
    public counter = 0;

    public events: SpecialEvent[] = [];

    public newEvent(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback, hideFromEventCalendar = false) {
        // Check if the event exist before adding it again
        if (!this.events.find(event => event.title == title)) {
            this.events.push(new SpecialEvent(title, description, startTime, startFunction, endTime, endFunction, hideFromEventCalendar));
        }
    }

    constructor() {
        this.addEvents();
    }

    initialize(): void {
        this.events.forEach(event => event.initialize());
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
        json.events?.forEach(event => {
            this.getEvent(event.name)?.fromJSON(event);
        });
    }

    toJSON() {
        return {
            events: this.events.map((event) => event.toJSON()),
        };
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank

    getEvent(eventName: string) {
        return this.events.find((e) => e.title == eventName);
    }

    tick(): void {
        this.events?.forEach(event => {
            event.tick();
        });
        this.counter = 0;
    }

    addEvents(): void {
        /* Lunar New Year
        RoamingPokemonList.ts:
            Vivillon (Meadow)
            Vivillon (Fancy)
        Dungeon.ts:
            Vivillon (High Plains) in Mt. Moon
            Vivillon (Modern) in Cerulean Cave
            Vivillon (Archipelago) in Sprout Tower
            Vivillon (Monsoon) in Dark Cave
            Vivillon (Sun) in Mt. Chimney Crater
            Vivillon (Continental) in New Mauville
            Vivillon (Polar) in Sky Pillar
            Vivillon (River) in Eterna Forest
            Vivillon (Marine) in Lake Valor, Verity, and Acuity
            Vivillon (Garden) in Flower Paradise
            Vivillon (Sandstorm) in Relic Castle
            Vivillon (Savanna) in Dragonspiral Tower
            Vivillon (Jungle) in Moor of Icirrus
            Vivillon (Ocean) in Dreamyard
            Vivillon (Tundra) in Poké Ball Factory
            Vivillon (Elegant) in Lost Hotel
            Vivillon (Icy Snow) in Frost Cavern
            Vivillon (Poké Ball) in Thrifty Megamart
        TownList.ts:
            Vivillon Photobook in Santalune
        */
        this.newEvent('Lunar New Year', 'Two kinds of Vivillon are roaming Kalos and later regions, and ones you\'ve previously caught have returned. Check the Photobook in Santalune City for hints!',
            // Start
            new Date(new Date().getFullYear(), 0, 24, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 1, 7, 23), () => {
            }
        );
        //Hoopa Day
        /*
        TownList.ts and TemporaryBattleList.ts: Youngster Joey in Cherrygrove
        QuestLineHelper.ts: Pikablu (literally Marill) quest; 'How blu mouse?'
        */
        this.newEvent('Hoopa Day', 'The Mischief Pokémon unleashes his tricks upon the world.',
            // Start
            new Date(new Date().getFullYear(), 3, 1, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 3, 2, 1), () => {
            }
        );
        // Easter
        // QuestLineHelper.ts: Introduction questline; 'Egg Hunt'
        // Dungeons.ts: Togepi (Flowering Crown), Torchic (Egg) and Pikachu (Easter) jumping from dungeon to dungeon
        this.newEvent('Easter', 'Encounter 3 special egg-related forms for a limited time with a dedicated Quest Line.',
            // Start
            new Date(new Date().getFullYear(), 3, 8, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 3, 29, 23), () => {
            }
        );
        /* Golden Week
        Dungeon.ts:
            Bulbasaur (Rose) in Flower Paradise
        */
        this.newEvent('Golden Week', 'Enjoy your time off in the "Golden Week"! Travel tip: Visit the Flower Paradise in Sinnoh on your well earned vacation and enjoy the bloom of roses.',
            // Start
            new Date(new Date().getFullYear(), 3, 29, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 4, 6, 23), () => {
            }
        );
        /* First Event
        RoamingPokemonList.ts:
            Flying Pikachu
            Red Spearow
        */
        this.newEvent('Flying Pikachu', 'Encounter Flying Pikachu and Red Spearow for a limited time roaming Kanto.',
            // Start
            new Date(new Date().getFullYear(), 6, 6, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 6, 12, 23), () => {
            }
        );
        /* Pokemon the first movie release date
        RoamingPokemonList.ts:
            Bulbausaur (Clone)
            Charmander (Clone)
            Squirtle (Clone)
            Pikachu (Clone)
        Dungeon.ts:
            New Island as a dungeon
            Armored Mewtwo in New Island
        */
        this.newEvent('Mewtwo strikes back!', '"New Island" has appeared off the coast of Kanto. Go stop Mewtwo!',
            // Start
            new Date(new Date().getFullYear(), 6, 18, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 6, 24, 23), () => {
            }
        );
        // Halloween
        this.newEvent('Halloween!', 'Encounter Spooky Pokémon for a limited time around Kanto, Johto and Hoenn.',
            // Start
            new Date(new Date().getFullYear(), 9, 30, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 10, 5, 23), () => {
            }
        );
        /* Let's Go P/E release date
        RoamingPokemonList.ts:
            Let's Go Pikachu
            Let's Go Eevee
        */
        this.newEvent('Let\'s GO!', 'Encounter special Eevee and Pikachu roaming in the Kanto region.',
            // Start
            new Date(new Date().getFullYear(), 10, 16, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 10, 23, 23), () => {
            }
        );
        /* Christmas
        RoamingPokemonList.ts:
            Santa Snorlax
            Reindeer Stantler
        Dungeon.ts:
            Grinch Celebi in Ilex Forest
            Snorlax (Snowman) in Seafoam Islands
        RouteData.ts:
            Santa Jynx
        ShardDeal.ts:
            Elf Munchlax
        */
        this.newEvent('Merry Christmas!', 'Encounter Santa Snorlax roaming the regions and Reindeer Stantler in Johto, discover the mystical creatures of Ilex Forest, Seafoam Islands and Sandgem Town or party at Bill\'s House.',
            // Start
            new Date(new Date().getFullYear(), 11, 18, 1), () => {
            },
            // End
            new Date(new Date().getFullYear(), 11, 31, 23), () => {
            }
        );
    }
}
