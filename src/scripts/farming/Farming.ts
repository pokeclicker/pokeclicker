/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    mutations: Mutation[] = [];
    farmHands = new FarmHands();

    externalAuras: KnockoutObservable<number>[];

    mutationCounter = 0;
    wanderCounter = 0;
    mulchCounter = 0;

    defaults = {
        berryInventory: Array<number>(GameHelper.enumLength(BerryType) - 1).fill(0),
        unlockedBerries: Array<boolean>(GameHelper.enumLength(BerryType) - 1).fill(false),
        mulchList: Array<number>(GameHelper.enumLength(MulchType)).fill(0),
        plotList: new Array(GameConstants.FARM_PLOT_WIDTH * GameConstants.FARM_PLOT_HEIGHT).fill(null).map((value, index) => {
            const middle = Math.floor(GameConstants.FARM_PLOT_HEIGHT / 2) * GameConstants.FARM_PLOT_WIDTH + Math.floor(GameConstants.FARM_PLOT_WIDTH / 2);
            return new Plot(index === middle, BerryType.None, 0, MulchType.None, 0, index);
        }),
        shovelAmt: 0,
        mulchShovelAmt: 0,
    };

    berryInventory: KnockoutObservable<number>[];
    unlockedBerries: KnockoutObservable<boolean>[];
    mulchList: KnockoutObservable<number>[];
    plotList: Array<Plot>;
    unlockedPlotCount: KnockoutObservable<number>;
    shovelAmt: KnockoutObservable<number>;
    mulchShovelAmt: KnockoutObservable<number>;

    highestUnlockedBerry: KnockoutComputed<number>;
    possiblePlotMutations: KnockoutComputed<Array<Array<string>>>;

    constructor(private multiplier: Multiplier) {
        this.berryInventory = this.defaults.berryInventory.map((v) => ko.observable<number>(v));
        this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        this.plotList = this.defaults.plotList;
        this.unlockedPlotCount = ko.observable(0);
        this.shovelAmt = ko.observable(this.defaults.shovelAmt);
        this.mulchShovelAmt = ko.observable(this.defaults.mulchShovelAmt);

        this.externalAuras = [];
        this.externalAuras[AuraType.Attract] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Attract));
        this.externalAuras[AuraType.Egg] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Egg));
        this.externalAuras[AuraType.Shiny] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Shiny));
        this.externalAuras[AuraType.Roaming] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Roaming));
        this.externalAuras[AuraType.Ev] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Ev));
        this.externalAuras[AuraType.Xp] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Xp));
        this.externalAuras[AuraType.Pickup] = ko.pureComputed<number>(() => this.multiplyPlotAuras(AuraType.Pickup));

        const multiplierSource = 'Farm Aura';
        this.multiplier.addBonus('shiny', () => this.externalAuras[AuraType.Shiny](), multiplierSource);
        this.multiplier.addBonus('eggStep', () => this.externalAuras[AuraType.Egg](), multiplierSource);
        this.multiplier.addBonus('roaming', () => this.externalAuras[AuraType.Roaming](), multiplierSource);
        this.multiplier.addBonus('ev', () => this.externalAuras[AuraType.Ev](), multiplierSource);
        this.multiplier.addBonus('exp', () => this.externalAuras[AuraType.Xp](), multiplierSource);
        this.multiplier.addBonus('rareItemDropRate', () => this.externalAuras[AuraType.Pickup](), multiplierSource);

        this.highestUnlockedBerry = ko.pureComputed(() => {
            for (let i = GameHelper.enumLength(BerryType) - 2; i >= 0; i--) {
                if (this.unlockedBerries[i]()) {
                    return i;
                }
            }
            return 0;
        });

        this.possiblePlotMutations = ko.pureComputed(() => {
            const plotMutations = [...Array(GameConstants.FARM_PLOT_WIDTH * GameConstants.FARM_PLOT_HEIGHT)].map(() => []);
            App.game.farming.mutations.forEach((mutation) => {
                if (!mutation.unlocked) {
                    return;
                }
                const isUnlocked = App.game.farming.unlockedBerries[mutation.mutatedBerry]();
                mutation.getMutationPlots().forEach((plot) => {
                    if (mutation.getTotalMutationChance(plot) > 0) {
                        const berry = isUnlocked || mutation.hintSeen ? BerryType[mutation.mutatedBerry] : '???';
                        plotMutations[plot].push(berry);
                    }
                });
            });
            return plotMutations;
        });
    }

    initialize(): void {
        //#region Mutations

        /**
         * NOTE: ONLY ADD NEW MUTATIONS AT THE END OF THE LIST. MUTATION INDEX IS USED TO STORE HINT SEEN DATA
         */

        //#region Second Generation

        // Persim
        this.mutations.push(new GrowNearBerryMutation(.02, BerryType.Persim,
            [
                BerryType.Pecha,
                BerryType.Oran,
            ]));
        // Razz
        this.mutations.push(new GrowNearBerryMutation(.019, BerryType.Razz,
            [
                BerryType.Cheri,
                BerryType.Leppa,
            ]));
        // Bluk
        this.mutations.push(new GrowNearBerryMutation(.018, BerryType.Bluk,
            [
                BerryType.Chesto,
                BerryType.Leppa,
            ]));
        // Nanab
        this.mutations.push(new GrowNearBerryMutation(.017, BerryType.Nanab,
            [
                BerryType.Pecha,
                BerryType.Aspear,
            ]));
        // Wepear
        this.mutations.push(new GrowNearBerryMutation(.016, BerryType.Wepear,
            [
                BerryType.Rawst,
                BerryType.Oran,
            ]));
        // Pinap
        this.mutations.push(new GrowNearBerryMutation(.015, BerryType.Pinap,
            [
                BerryType.Sitrus,
                BerryType.Aspear,
            ]));

        // Figy
        this.mutations.push(new GrowNearFlavorMutation(.009, BerryType.Figy,
            [[25, 80], [0, 5], [0, 5], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too spicy!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Cheri]();
                },
            }
        ));
        // Wiki
        this.mutations.push(new GrowNearFlavorMutation(.008, BerryType.Wiki,
            [[0, 5], [25, 80], [0, 5], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too dry!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Chesto]();
                },
            }
        ));
        // Mago
        this.mutations.push(new GrowNearFlavorMutation(.007, BerryType.Mago,
            [[0, 5], [0, 5], [25, 80], [0, 5], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too sweet!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Pecha]();
                },
            }
        ));
        // Aguav
        this.mutations.push(new GrowNearFlavorMutation(.006, BerryType.Aguav,
            [[0, 5], [0, 5], [0, 5], [25, 80], [0, 5]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too bitter!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Rawst]();
                },
            }
        ));
        // Iapapa
        this.mutations.push(new GrowNearFlavorMutation(.005, BerryType.Iapapa,
            [[0, 5], [0, 5], [0, 5], [0, 5], [25, 80]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings get too sour!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Aspear]();
                },
            }
        ));

        // Lum
        this.mutations.push(new GrowNearBerryMutation(.001, BerryType.Lum,
            [
                BerryType.Cheri,
                BerryType.Chesto,
                BerryType.Pecha,
                BerryType.Rawst,
                BerryType.Aspear,
                BerryType.Leppa,
                BerryType.Oran,
                BerryType.Sitrus,
            ], {
                hint: 'I\'ve heard that there\'s a legendary Berry that only appears when fully surrounded by the 8 different Berries that wild Pokémon hold!',
            }));

        //#endregion

        //#region Third Generation

        // Pomeg
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Pomeg,
            [
                BerryType.Iapapa,
                BerryType.Mago,
            ]));
        // Kelpsy
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Kelpsy,
            [
                BerryType.Chesto,
                BerryType.Persim,
            ]));
        // Qualot
        this.mutations.push(new GrowNearFlavorMutation(.0005, BerryType.Qualot,
            [[10, 15], [0, 0], [10, 15], [0, 0], [10, 15]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy, a little sweet, and a little sour at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Cheri]() &&
                    App.game.farming.unlockedBerries[BerryType.Pecha]() &&
                    App.game.farming.unlockedBerries[BerryType.Aspear]();
                },
            }));
        // Hondew
        this.mutations.push(new GrowNearFlavorMutation(.0004, BerryType.Hondew,
            [[15, 15], [15, 15], [0, 0], [15, 15], [0, 0]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted fairly spicy, dry, and bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Figy]() &&
                    App.game.farming.unlockedBerries[BerryType.Wiki]() &&
                    App.game.farming.unlockedBerries[BerryType.Aguav]();
                },
            }));
        // Grepa
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Grepa,
            [
                BerryType.Aguav,
                BerryType.Figy,
            ]));
        // Tamato
        this.mutations.push(new EvolveNearBerryMutation(.0005, BerryType.Tamato, BerryType.Razz, [BerryType.Pomeg]));
        // Cornn
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Cornn,
            [
                BerryType.Leppa,
                BerryType.Bluk,
                BerryType.Wiki,
            ]));
        // Magost
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Magost,
            [
                BerryType.Pecha,
                BerryType.Nanab,
                BerryType.Mago,
            ]));
        // Rabuta
        this.mutations.push(new EvolveNearBerryMutation(.0003, BerryType.Rabuta, BerryType.Aspear, [BerryType.Aguav]));
        // Nomel
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Nomel,
            [
                BerryType.Wepear,
                BerryType.Pinap,
            ]));
        // Spelon
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Spelon, BerryType.Tamato,
            [[130, 160], [0, 80], [0, 80], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Tamato berry will change if its surroundings get extremely spicy!',
            }));
        // Pamtre
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Pamtre, BerryType.Cornn,
            [[0, 80], [130, 160], [0, 80], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Cornn berry will change if its surroundings get extremely dry!',
            }));
        // Pamtre Overgrow
        this.mutations.push(new GrowNearBerryMutation(.0004, BerryType.Pamtre,
            [BerryType.Pamtre], { showHint: false }));
        // Watmel
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Watmel, BerryType.Magost,
            [[0, 80], [0, 80], [130, 160], [0, 80], [0, 80]], {
                hint: 'I\'ve heard that a Magost berry will change if its surroundings get extremely sweet!',
            }));
        // Durin
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Durin, BerryType.Rabuta,
            [[0, 80], [0, 80], [0, 80], [130, 160], [0, 80]], {
                hint: 'I\'ve heard that a Rabuta berry will change if its surroundings get extremely bitter!',
            }));
        // Belue
        this.mutations.push(new EvolveNearFlavorMutation(.0002, BerryType.Belue, BerryType.Nomel,
            [[0, 80], [0, 80], [0, 80], [0, 80], [130, 160]], {
                hint: 'I\'ve heard that a Nomel berry will change if its surroundings get extremely sour!',
            }));

        // Pinkan
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Pinkan,
            [
                BerryType.Pecha,
                BerryType.Persim,
                BerryType.Nanab,
                BerryType.Mago,
                BerryType.Qualot,
                BerryType.Magost,
                BerryType.Watmel,
            ], {
                hint: 'I\'ve heard that there\'s a special Pink Berry that only appears when surrounded by a bunch of different types of Pink Berries!',
                unlockReq: function(): boolean {
                    return App.game.quests.getQuestLine('Team Rocket\'s Pinkan Theme Park').state() > QuestLineState.inactive;
                },
            }));

        //#endregion

        //#region Fourth Generation

        // Occa
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Occa,
            [
                BerryType.Razz,
                BerryType.Figy,
                BerryType.Tamato,
                BerryType.Spelon,
            ]));
        // Occa Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Occa));
        // Passho
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Passho,
            [
                BerryType.Oran,
                BerryType.Chesto,
                BerryType.Kelpsy,
                BerryType.Coba,
            ]));
        // Wacan
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Wacan,
            [
                BerryType.Pinap,
                BerryType.Iapapa,
                BerryType.Qualot,
                BerryType.Grepa,
            ]));
        // Rindo
        this.mutations.push(new GrowNearFlavorMutation(.0001, BerryType.Rindo,
            [[10, 15], [0, 0], [0, 0], [15, 20], [0, 0]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy and fairly bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Aguav]() &&
                    App.game.farming.unlockedBerries[BerryType.Cheri]();
                },
            }));
        // Rindo Overgrow
        this.mutations.push(new GrowNearBerryMutation(.0004, BerryType.Rindo, [BerryType.Rindo], {showHint: false }));
        // Yache
        this.mutations.push(new EvolveNearBerryStrictMutation(.0001, BerryType.Yache, BerryType.Passho, {}, PlotStage.Seed, {
            hint: 'I\'ve heard that growing a Passho Berry alone will cause it to change!',
        }));
        // Chople
        this.mutations.push(new OakMutation(.0001, BerryType.Chople, BerryType.Spelon, OakItemType.Magma_Stone));
        // Kebia
        this.mutations.push(new OakMutation(.0001, BerryType.Kebia, BerryType.Pamtre, OakItemType.Rocky_Helmet));
        // Kebia Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Kebia));
        // Shuca
        this.mutations.push(new OakMutation(.0001, BerryType.Shuca, BerryType.Watmel, OakItemType.Sprinklotad));
        // Coba
        this.mutations.push(new GrowNearFlavorMutation(.0001, BerryType.Coba,
            [[0, 0], [10, 15], [0, 0], [15, 20], [0, 0]], {
                hint: 'I\'ve heard that a special Berry can appear if its surroundings match its flavor profile! If I recall, it tasted a little dry and fairly bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Chesto]() &&
                    App.game.farming.unlockedBerries[BerryType.Aguav]();
                },
            }));
        // Payapa
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Payapa,
            [
                BerryType.Wiki,
                BerryType.Bluk,
                BerryType.Cornn,
                BerryType.Pamtre,
            ]));
        // Tanga
        let berryReqs = {};
        berryReqs[BerryType.Rindo] = 8;
        this.mutations.push(new GrowNearBerryStrictMutation(.0001, BerryType.Tanga, berryReqs, {
            hint: 'I\'ve heard that a special Berry can appear after being surrounded by Rindo Berries!',
        }));
        // Charti
        this.mutations.push(new OakMutation(.0001, BerryType.Charti, BerryType.Cornn, OakItemType.Cell_Battery));
        // Kasib
        // No mutation, will check withers
        // Haban
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Haban,
            [
                BerryType.Occa,
                BerryType.Rindo,
                BerryType.Passho,
                BerryType.Wacan,
            ]));
        // Colbur
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Colbur,
            [
                BerryType.Rabuta,
                BerryType.Kasib,
                BerryType.Payapa,
            ]));
        // Colbur Parasite
        this.mutations.push(new ParasiteMutation(.0004, BerryType.Colbur));
        // Babiri
        berryReqs = {};
        berryReqs[BerryType.Shuca] = 4;
        berryReqs[BerryType.Charti] = 4;
        this.mutations.push(new GrowNearBerryStrictMutation(.0001, BerryType.Babiri, berryReqs, {
            hint: 'I\'ve heard that a special Berry can appear after being surrounded by Shuca and Charti Berries!',
        }));
        // Chilan
        berryReqs = {};
        berryReqs[BerryType.Chople] = 3;
        this.mutations.push(new EvolveNearBerryMinMutation(.0001, BerryType.Chilan, BerryType.Chople, berryReqs, {
            hint: 'I\'ve heard that Chople Berries will turn into a different Berry if surrounded by more than two of their own kind.',
        }));
        // Roseli
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Roseli,
            [
                BerryType.Mago,
                BerryType.Nanab,
                BerryType.Magost,
                BerryType.Watmel,
            ]));
        // Snover
        this.mutations.push(new FieldMutation(.00002, BerryType.Snover, [{ berry: BerryType.Babiri, amountRequired: 20 }], {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Snover').id]() > 0,
            hint: 'I\'ve heard of a Berry that can appear in a field of Babiri when Snover are around.',
        }));
        //#endregion

        //#region Fifth Generation

        // Micle
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Micle, [0, 600, 0, 0, 0], {
            hint: 'I\'ve heard of a Berry that only appears in the driest of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Pamtre](),
        }));
        // Custap
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Custap, [0, 0, 600, 0, 0], {
            hint: 'I\'ve heard of a Berry that only appears in the sweetest of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Watmel](),
        }));
        // Jaboca
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Jaboca, [0, 0, 0, 600, 0], {
            hint: 'I\'ve heard of a Berry that only appears in the most bitter of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Durin](),
        }));
        // Rowap
        this.mutations.push(new FieldFlavorMutation(.0003, BerryType.Rowap, [0, 0, 0, 0, 600], {
            hint: 'I\'ve heard of a Berry that only appears in the most sour of fields.',
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Belue](),
        }));
        // Kee
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Kee,
            [
                BerryType.Liechi,
                BerryType.Ganlon,
            ]));
        // Maranga
        this.mutations.push(new GrowNearBerryMutation(.0003, BerryType.Maranga,
            [
                BerryType.Salac,
                BerryType.Petaya,
            ]));

        // Liechi
        this.mutations.push(new FieldMutation(.00001, BerryType.Liechi, [{ berry: BerryType.Passho, amountRequired: 23 }], {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Kyogre').id]() > 0,
        }));
        // Ganlon
        this.mutations.push(new FieldMutation(.00001, BerryType.Ganlon, [{ berry: BerryType.Shuca, amountRequired: 23 }], {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Groudon').id]() > 0,
        }));
        // Salac
        this.mutations.push(new FieldMutation(.00001, BerryType.Salac, [{ berry: BerryType.Coba, amountRequired: 23 }], {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Rayquaza').id]() > 0,
        }));
        // Petaya
        this.mutations.push(new PetayaMutation(.00001));
        // Apicot
        this.mutations.push(new FieldMutation(.00001, BerryType.Apicot, [{ berry: BerryType.Chilan, amountRequired: 23 }], {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Palkia').id]() > 0,
        }));
        // Lansat
        this.mutations.push(new FieldMutation(.00001, BerryType.Lansat, [{ berry: BerryType.Roseli, amountRequired: 23 }], {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[PokemonHelper.getPokemonByName('Dialga').id]() > 0,
        }));

        // Starf
        // No mutation, obtained by wandering shiny pokemon
        // Enigma
        this.mutations.push(new EnigmaMutation(.0001));
        // Enigma Mutations
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Liechi, BerryType.Passho, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Liechi](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Ganlon, BerryType.Shuca, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Ganlon](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Salac, BerryType.Coba, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Salac](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Petaya, BerryType.Payapa, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Petaya](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Apicot, BerryType.Chilan, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Apicot](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Lansat, BerryType.Roseli, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Lansat](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.0004, BerryType.Starf, BerryType.Haban, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Starf](),
        }));

        // Hopo
        this.mutations.push(new FieldMutation(.00001, BerryType.Hopo,
            [
                { berry: BerryType.Lansat, amountRequired: 2},
                { berry: BerryType.Apicot, amountRequired: 2},
                { berry: BerryType.Micle, amountRequired: 4},
                { berry: BerryType.Custap, amountRequired: 4},
                { berry: BerryType.Jaboca, amountRequired: 4},
                { berry: BerryType.Rowap, amountRequired: 4},
            ], {
                unlockReq: function(): boolean {
                    return App.game.quests.getQuestLine('Arceus: The Deified Pokémon').state() > QuestLineState.inactive;
                },
            }));

        // Empty Mutations for hints

        // Kasib
        this.mutations.push(new BlankMutation(0, BerryType.Kasib,
            {
                hint: 'I\'ve heard of a Berry that only appears after a Berry plant has withered, but is repelled by Colbur plants.',
                unlockReq: () => App.game.farming.highestUnlockedBerry() >= BerryType.Occa,
            }));

        // Starf
        this.mutations.push(new BlankMutation(0, BerryType.Starf,
            {
                hint: 'I\'ve heard of a Berry that only appears after a Shiny Pokémon wanders and is caught near open soil.',
                unlockReq: () => App.game.farming.highestUnlockedBerry() >= BerryType.Occa,
            }));

        //#endregion
    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Sprayduck);
        return multiplier;
    }

    getReplantMultiplier(): number {
        return 1;
    }

    getMulchDurationMultiplier(): number {
        return App.game.oakItems.calculateBonus(OakItemType.Sprinklotad);
    }

    getMutationMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItemType.Squirtbottle);
        return multiplier;
    }

    update(delta: number): void {
        const timeToReduce = delta;

        const notifications = new Set<FarmNotificationType>();

        let change = false;

        // Updating Berries
        this.plotList.forEach(plot => {
            if (plot.update(timeToReduce)) {
                change = true;
            }
            if (plot.notifications) {
                plot.notifications.forEach(n => notifications.add(n));
                plot.notifications = [];
            }
        });

        // Running Mutations
        this.mutationCounter += GameConstants.TICK_TIME;
        if (this.mutationCounter >= GameConstants.MUTATION_TICK) {
            this.mutations.forEach(mutation => {
                if (mutation.mutate()) {
                    GameHelper.incrementObservable(App.game.statistics.totalBerriesMutated, 1);
                    notifications.add(FarmNotificationType.Mutated);
                    change = true;
                }
            });
            this.mutationCounter = 0;
        }

        // Wandering Pokemon
        this.wanderCounter += GameConstants.TICK_TIME;
        let wanderPokemon: WandererPokemon;
        const wanderList: WandererPokemon[] = [];
        if (this.wanderCounter >= GameConstants.WANDER_TICK) {
            for (let i = 0; i < App.game.farming.plotList.length; i++) {
                const plot = App.game.farming.plotList[i];
                // generate or get rid of a wanderer
                wanderPokemon = plot.generateWanderPokemon();
                if (wanderPokemon) {
                    wanderList.push(wanderPokemon);
                    notifications.add(FarmNotificationType.Wander);
                }
            }
            this.wanderCounter = 0;

        }

        if (notifications.size) {
            notifications.forEach((n) => this.handleNotification(n, wanderList));
        }

        this.farmHands.tick();

        this.mulchCounter += GameConstants.TICK_TIME;
        if (this.mulchCounter >= GameConstants.MULCH_OAK_ITEM_TICK) {
            App.game.oakItems.use(OakItemType.Sprinklotad, this.plotList.filter(value => value.isMulched()).length);
            this.mulchCounter = 0;
        }
    }

    handleNotification(farmNotiType: FarmNotificationType, wanderList?: WandererPokemon[]): void {
        let message = '';
        let image = null;
        let type = NotificationConstants.NotificationOption.success;
        let sound = NotificationConstants.NotificationSound.Farming.ready_to_harvest;
        let setting = NotificationConstants.NotificationSetting.Farming.ready_to_harvest;

        switch (farmNotiType) {
            case FarmNotificationType.Ripe:
                message = 'A Berry is ready to harvest!';
                break;
            case FarmNotificationType.AboutToWither:
                message = 'A Berry plant is about to wither!';
                type = NotificationConstants.NotificationOption.warning;
                sound = NotificationConstants.NotificationSound.Farming.berry_wither;
                setting = NotificationConstants.NotificationSetting.Farming.about_to_wither;
                break;
            case FarmNotificationType.Withered:
                message = 'A Berry plant has withered!';
                type = NotificationConstants.NotificationOption.warning;
                sound = NotificationConstants.NotificationSound.Farming.berry_wither;
                setting = NotificationConstants.NotificationSetting.Farming.berry_withered;
                break;
            case FarmNotificationType.Mutated:
                message = 'A Berry plant has mutated!';
                sound = NotificationConstants.NotificationSound.Farming.berry_mutated;
                setting = NotificationConstants.NotificationSetting.Farming.berry_mutated;
                break;
            case FarmNotificationType.Replanted:
                message = 'A Berry has been replanted!';
                sound = NotificationConstants.NotificationSound.Farming.berry_replanted;
                setting = NotificationConstants.NotificationSetting.Farming.berry_replanted;
                break;
            case FarmNotificationType.Dropped:
                message = 'A Berry has been dropped!';
                sound = NotificationConstants.NotificationSound.Farming.berry_dropped;
                setting = NotificationConstants.NotificationSetting.Farming.berry_dropped;
                break;
            case FarmNotificationType.MulchRanOut:
                message = 'A plot has run out of mulch!';
                type = NotificationConstants.NotificationOption.warning;
                sound = NotificationConstants.NotificationSound.Farming.mulch_ran_out;
                setting = NotificationConstants.NotificationSetting.Farming.mulch_ran_out;
                break;
            case FarmNotificationType.Wander:
                // Only notify for one wanderer, randomly picked, shiny priorized; there will rarely be more than one
                const shinyList = wanderList.filter(w => w.shiny);
                const displayWanderer = shinyList.length ? Rand.fromArray(shinyList) : Rand.fromArray(wanderList);
                message = `A wild ${(displayWanderer.shiny ? 'shiny ' : '')}${displayWanderer.name} has wandered onto the farm!`;
                image = PokemonHelper.getImage(PokemonHelper.getPokemonByName(displayWanderer.name).id, displayWanderer.shiny, undefined, GameConstants.ShadowStatus.None);
                type = displayWanderer.shiny ? NotificationConstants.NotificationOption.warning : NotificationConstants.NotificationOption.success;
                sound = displayWanderer.shiny ? NotificationConstants.NotificationSound.General.shiny_long : NotificationConstants.NotificationSound.Farming.wandering_pokemon;
                setting = displayWanderer.shiny ? NotificationConstants.NotificationSetting.General.encountered_shiny : NotificationConstants.NotificationSetting.Farming.wandering_pokemon;
                break;
        }

        Notifier.notify({
            message,
            image,
            type,
            sound,
            setting,
        });
    }

    multiplyPlotAuras(auraType: AuraType): number {
        return this.plotList
            .filter(p => p.emittingAura.type() === auraType)
            .reduce((acc, p) => acc * (p.emittingAura.value() ?? 1), 1);
    }

    addPlotAuras(auraType: AuraType): number {
        return this.plotList
            .filter(p => p.emittingAura.type() === auraType)
            .reduce((acc, p) => acc + (p.emittingAura.value() ?? 0), 0);
    }

    //#region Plot Unlocking

    static unlockMatrix = [
        BerryType.Kelpsy, BerryType.Mago, BerryType.Persim, BerryType.Wepear, BerryType.Qualot,
        BerryType.Wiki, BerryType.Aspear, BerryType.Cheri, BerryType.Leppa, BerryType.Aguav,
        BerryType.Nanab, BerryType.Rawst, BerryType.None, BerryType.Chesto, BerryType.Razz,
        BerryType.Pomeg, BerryType.Sitrus, BerryType.Pecha, BerryType.Oran, BerryType.Pinap,
        BerryType.Grepa, BerryType.Figy, BerryType.Bluk, BerryType.Iapapa, BerryType.Hondew,
    ]

    unlockPlot(index: number) {
        if (this.allPlotsUnlocked()) {
            return;
        }
        if (this.canBuyPlot(index)) {
            const berryData = this.plotBerryCost(index);
            GameHelper.incrementObservable(this.berryInventory[berryData.type], -berryData.amount);
            const cost = this.plotFPCost(index);
            App.game.wallet.loseAmount(new Amount(cost, GameConstants.Currency.farmPoint));
            this.plotList[index].isUnlocked = true;
            this.unlockedPlotCount(this.plotList.filter(p => p.isUnlocked).length);
        }
    }

    allPlotsUnlocked() {
        return this.plotList.every(plot => plot.isUnlocked);
    }

    canBuyPlot(index: number): boolean {
        const berryData = this.plotBerryCost(index);
        if (App.game.farming.berryInventory[berryData.type]() < berryData.amount) {
            return false;
        }
        const cost = this.plotFPCost(index);
        if (!App.game.wallet.hasAmount(new Amount(cost, GameConstants.Currency.farmPoint))) {
            return false;
        }
        return true;
    }

    plotFPCost(index: number): number {
        const berryType = Farming.unlockMatrix[index];
        return 10 * Math.floor(Math.pow(berryType + 1, 2));
    }

    plotBerryCost(index: number): {type: BerryType, amount: number} {
        const berryType = Farming.unlockMatrix[index];
        return { type: berryType, amount: 10 * (berryType + 1) };
    }

    //#endregion

    togglePlotSafeLock(index: number) {
        this.plotList[index].isSafeLocked = !this.plotList[index].isSafeLocked;
    }

    plant(index: number, berry: BerryType) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasBerry(berry) || plot.isSafeLocked) {
            return;
        }

        GameHelper.incrementObservable(this.berryInventory[berry], -1);
        plot.plant(berry);
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry);
        });
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number): void {
        const plot = this.plotList[index];
        if (plot.berry === BerryType.None || plot.stage() != PlotStage.Berry || plot.isSafeLocked) {
            return;
        }

        App.game.wallet.gainFarmPoints(BerryList[plot.berry].farmValue);

        const amount = plot.harvestAmount();

        this.gainBerry(plot.berry, amount);

        App.game.oakItems.use(OakItemType.Sprayduck, BerryList[plot.berry].exp);
        GameHelper.incrementObservable(App.game.statistics.totalManualHarvests, 1);

        player.lowerItemMultipliers(MultiplierDecreaser.Berry, BerryList[plot.berry].exp);

        plot.die(true);
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index);
        });
    }

    /**
     * Handles using the Berry Shovel to remove a Berry plant
     * @param index The plot index
     */
    public shovel(index: number): void {
        const plot = this.plotList[index];
        if (!plot.isUnlocked) {
            return;
        }
        if (plot.isSafeLocked) {
            return;
        }
        if (plot.isEmpty()) {
            return;
        }
        if (plot.stage() == PlotStage.Berry) {
            this.harvest(index);
            return;
        }
        if (this.shovelAmt() <= 0) {
            return;
        }
        plot.die(true);
        GameHelper.incrementObservable(this.shovelAmt, -1);
        GameHelper.incrementObservable(App.game.statistics.totalShovelsUsed, 1);
    }

    /**
     * Handles using the Mulch Shovel to remove mulch from a plot
     * @param index The plot index
     */
    public shovelMulch(index: number): void {
        const plot = this.plotList[index];
        if (!plot.isUnlocked || plot.isSafeLocked) {
            return;
        }
        if (this.mulchShovelAmt() <= 0) {
            return;
        }

        if (plot.clearMulch()) {
            GameHelper.incrementObservable(this.mulchShovelAmt, -1);
            GameHelper.incrementObservable(App.game.statistics.totalShovelsUsed, 1);
        }
    }

    /**
     * Adds mulch to a plot
     * @param index The plot index
     * @param mulch The MulchType to be added
     * @param amount The amount of mulch to apply. Defaults to 1
     */
    public addMulch(index: number, mulch: MulchType, amount = 1) {
        const plot = this.plotList[index];
        if (!this.canMulch(index, mulch)) {
            return;
        }

        amount = Math.min(this.mulchList[mulch](), amount);

        GameHelper.incrementObservable(this.mulchList[mulch], -amount);
        GameHelper.incrementObservable(App.game.statistics.totalMulchesUsed, amount);
        GameHelper.incrementObservable(App.game.statistics.mulchesUsed[mulch], amount);

        plot.mulch = +mulch;
        plot.mulchTimeLeft += GameConstants.MULCH_USE_TIME * amount;
    }

    /**
     * Attempts to add mulch to all plots
     * @param mulch The MulchType to be added
     * @param amount The amount of mulch to apply to each plot. Defaults to 1
     */
    public mulchAll(mulch: MulchType, amount = 1) {
        const mulchPlots = this.plotList.filter((_, index) => this.canMulch(index, mulch));
        amount *= mulchPlots.length;
        amount = Math.min(this.mulchList[mulch](), amount);

        const sharedMulch = Math.floor(amount / mulchPlots.length);
        if (sharedMulch <= 0) {
            return;
        }

        this.plotList.forEach((_, index) => {
            this.addMulch(index, mulch, sharedMulch);
        });
    }

    private canMulch(index: number, mulch: MulchType) {
        const plot = this.plotList[index];
        if (!plot.isUnlocked || !this.hasMulch(mulch) || plot.isSafeLocked) {
            return false;
        }
        if (plot.mulch != MulchType.None && plot.mulch != mulch) {
            return false;
        }
        return true;
    }

    /**
     * Gives the player a random Berry from the first 8 types
     * @param amount Amount of berries to give. Defaults to 1.
     * @param disableNotification Set to true to not notify the player. Defaults to false.
     */
    gainRandomBerry(amount = 1, disableNotification = false) {
        const berry = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        if (!disableNotification) {
            Notifier.notify({
                message: `You found ${GameHelper.anOrA(BerryType[berry])} ${BerryType[berry]} Berry!`,
                image: FarmController.getBerryImage(berry),
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.route_item_found,
            });
        }
        this.gainBerry(berry, amount, false);
    }

    gainBerry(berry: BerryType, amount = 1, farming = true) {
        GameHelper.incrementObservable(this.berryInventory[berry], Math.floor(amount));

        if (amount > 0) {
            this.unlockBerry(berry);
            GameHelper.incrementObservable(App.game.statistics.totalBerriesObtained, amount);
            GameHelper.incrementObservable(App.game.statistics.berriesObtained[berry], amount);
            if (farming === true) {
                GameHelper.incrementObservable(App.game.statistics.totalBerriesHarvested, amount);
                GameHelper.incrementObservable(App.game.statistics.berriesHarvested[berry], amount);
            }
        }
    }

    hasBerry(berry: BerryType) {
        return this.berryInventory[berry]() > 0;
    }

    hasMulch(mulch: MulchType) {
        return this.mulchList[mulch]() > 0;
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Wailmer_pail);
    }

    unlockBerry(berry: BerryType) {
        if (!this.unlockedBerries[berry]()) {
            Notifier.notify({
                message: `You've discovered the ${BerryType[berry]} Berry!`,
                image: FarmController.getBerryImage(berry),
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Farming.berry_discovered,
                sound: NotificationConstants.NotificationSound.Farming.berry_discovered,
            });
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.registeredBerry({ berry: BerryType[berry] }));
            this.unlockedBerries[berry](true);
        }
    }

    /**
     * Checks whether a Berry plant exists on the farm
     * @param berry The Berry type
     * @param stage The stage of the Berry plant. Defaults to PlotStage.Berry
     */
    berryInFarm(berry: BerryType, stage = PlotStage.Berry, ignoreFrozen = false) {
        return this.plotList.some(plot => plot.berry == berry && plot.stage() >= stage && (!ignoreFrozen || plot.mulch !== MulchType.Freeze_Mulch));
    }

    toJSON(): Record<string, any> {
        return {
            berryInventory: this.berryInventory.map(ko.unwrap),
            unlockedBerries: this.unlockedBerries.map(ko.unwrap),
            mulchList: this.mulchList.map(ko.unwrap),
            plotList: this.plotList.map(plot => plot.toJSON()),
            shovelAmt: this.shovelAmt(),
            mulchShovelAmt: this.mulchShovelAmt(),
            mutations: this.mutations.map(mutation => mutation.toJSON()),
            farmHands: this.farmHands.toJSON(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedBerries = json.berryInventory;
        if (savedBerries == null) {
            this.berryInventory = this.defaults.berryInventory.map((v) => ko.observable<number>(v));
        } else {
            (savedBerries as number[]).forEach((value: number, index: number) => {
                this.berryInventory[index](value);
            });
        }

        const savedUnlockedBerries = json.unlockedBerries;
        if (savedUnlockedBerries == null) {
            this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        } else {
            (savedUnlockedBerries as boolean[]).forEach((value: boolean, index: number) => {
                this.unlockedBerries[index](value);
            });
        }

        const savedMulches = json.mulchList;
        if (savedMulches == null) {
            this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        } else {
            (savedMulches as number[]).forEach((value: number, index: number) => {
                this.mulchList[index](value);
            });
        }

        const savedPlots = json.plotList;
        if (savedPlots == null) {
            this.plotList = this.defaults.plotList;
        } else {
            (savedPlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const plot: Plot = new Plot(false, BerryType.None, 0, MulchType.None, 0, index);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }
        this.unlockedPlotCount(this.plotList.filter(p => p.isUnlocked).length);

        const shovelAmt = json.shovelAmt;
        if (shovelAmt == null) {
            this.shovelAmt = ko.observable(this.defaults.shovelAmt);
        } else {
            this.shovelAmt(shovelAmt);
        }

        const mulchShovelAmt = json.mulchShovelAmt;
        if (mulchShovelAmt == null) {
            this.mulchShovelAmt = ko.observable(this.defaults.mulchShovelAmt);
        } else {
            this.mulchShovelAmt(mulchShovelAmt);
        }

        const mutations = json.mutations;
        if (mutations) {
            this.mutations.forEach((mutation, i) => mutation.fromJSON(mutations[i]));
        }

        this.farmHands.fromJSON(json.farmHands);
    }

    public static genBounds = [8, 20, 36, 54, Infinity];
    public static getGeneration(gen: number): BerryType[] {
        const genBounds = Farming.genBounds;
        const minBound = genBounds[gen - 1] || 0;
        const maxBound = genBounds[gen] || Infinity;
        return BerryList.filter(berry => berry.type >= minBound && berry.type < maxBound).map(berry => berry.type);
    }

    public static getColor(color: BerryColor): BerryType[] {
        return BerryList.filter(berry => berry.color === color).map(berry => berry.type);
    }
    public static getFirmness(firmness: BerryFirmness): BerryType[] {
        return BerryList.filter(berry => berry.firmness === firmness).map(berry => berry.type);
    }
    public static sizeUnitConverter: Record<SizeUnits, ((num: number) => string)> = {
        [SizeUnits.cm]: (num) => `${num.toFixed(1)} cm`, // default is cm
        [SizeUnits.inch]: (num) => `${(num / 2.54).toFixed(1)}\u2033`, // inches
    };

    public auraDisplay(berry: BerryType, stage: number) {
        return `×${BerryList[berry].aura.auraMultipliers[stage].toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 3 })}`;
    }

    public handleWanderer(plot: Plot) {
        if (!plot.canCatchWanderer()) {
            return;
        }
        const wanderer = plot.wanderer;
        const pokemonData = PokemonHelper.getPokemonByName(wanderer.name);
        const berry = BerryList[plot.wanderer.berry];

        const farmPoints = Math.floor(berry.farmValue / (4 + berry.growthTime[PlotStage.Bloom] / 1800));
        const shinyModifier = wanderer.shiny ? GameConstants.WANDER_SHINY_FP_MODIFIER : 1;
        const amount = App.game.wallet.gainFarmPoints(farmPoints * shinyModifier);
        GameHelper.incrementObservable(App.game.statistics.farmWandererFarmPointsObtained, amount.amount);
        player.lowerItemMultipliers(MultiplierDecreaser.Berry, berry.exp);

        const pokeball = App.game.pokeballs.calculatePokeballToUse(pokemonData.id, wanderer.shiny, false, EncounterType.wanderer);
        if (pokeball !== GameConstants.Pokeball.None) {
            wanderer.pokeball(pokeball);
            wanderer.catching(true);
            App.game.pokeballs.usePokeball(pokeball);
            // Halved catch time in farm, it does not matter in the balance
            setTimeout(() => this.attemptCatchWanderer(plot), App.game.pokeballs.calculateCatchTime(pokeball) / 2);
        } else {
            this.wandererIsFleeing(plot);
        }

    }

    public attemptCatchWanderer(plot: Plot) {
        const wanderer = plot.wanderer;
        const catchChance = GameConstants.clipNumber(
            wanderer.catchRate
                + App.game.pokeballs.getCatchBonus(wanderer.pokeball(), { pokemon: wanderer.name, encounterType: EncounterType.wanderer })
                + App.game.oakItems.calculateBonus(OakItemType.Magic_Ball)
                + (plot.mulch === MulchType.Gooey_Mulch ? GameConstants.GOOEY_MULCH_CATCH_BONUS : 0),
            0, 100);
        if (Rand.chance(catchChance / 100)) { // Successfully caught
            App.game.oakItems.use(OakItemType.Magic_Ball);
            App.game.party.gainPokemonByName(wanderer.name, wanderer.shiny, undefined, wanderer.gender);

            // EV
            const partyPokemon = App.game.party.getPokemonByName(wanderer.name);
            const wandererEPGain = App.game.pokeballs.getEPBonus(wanderer.pokeball())
                * GameConstants.BASE_EP_YIELD
                * (Berry.isBaseWanderer(wanderer.name) ? GameConstants.BASE_WANDERER_EP_MODIFIER : GameConstants.WANDERER_EP_MODIFIER);
            partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, wanderer.shiny, undefined, wandererEPGain);

            // DT
            const fakedRoute = FarmController.wandererToRoute(wanderer.name);
            const amount = Battle.gainTokens(fakedRoute.number, fakedRoute.region, wanderer.pokeball());
            GameHelper.incrementObservable(App.game.statistics.farmWandererDungeonTokensObtained, amount.amount);

            // Check for Starf berry generation
            if (wanderer.shiny) {
                const emptyPlots = App.game.farming.plotList.filter(plot => plot.isUnlocked && plot.isEmpty());
                // No Starf generation if no empty plots :(
                if (emptyPlots.length) {
                    const chosenPlot = emptyPlots[Rand.floor(emptyPlots.length)];
                    chosenPlot.plant(BerryType.Starf);
                    App.game.farming.unlockBerry(BerryType.Starf);
                }
            }

            plot.wanderer = undefined;
            return;
        } else if (wanderer.shiny) { // Failed to catch, Shiny
            App.game.logbook.newLog(
                LogBookTypes.ESCAPED,
                App.game.party.alreadyCaughtPokemonByName(wanderer.name, true)
                    ? createLogContent.escapedShinyDupe({ pokemon: wanderer.name })
                    : createLogContent.escapedShiny({ pokemon: wanderer.name })
            );
        } else if (!App.game.party.alreadyCaughtPokemonByName(wanderer.name)) { // Failed to catch, Uncaught
            App.game.logbook.newLog(
                LogBookTypes.ESCAPED,
                createLogContent.escapedWild({ pokemon: wanderer.name})
            );
        }
        plot.wanderer.catching(false);
        this.wandererIsFleeing(plot);
    }

    public wandererIsFleeing(plot: Plot) {
        if (!plot.wanderer) {
            return;
        }
        plot.wanderer.fleeing(true);
        setTimeout(() => {
            plot.wanderer = undefined;
        }, 250);
    }
}
