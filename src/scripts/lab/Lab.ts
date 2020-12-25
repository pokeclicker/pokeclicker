class Lab implements Feature {
    name = 'Lab';
    saveKey = 'lab';

    researchList: Research[];
    currentResearch: KnockoutObservableArray<ResearchSlot>;

    machines: Machine[];
    placedMachines: KnockoutObservableArray<PlacedMachine>;

    defaults = {
        researchList: [],
        currentResearch: [],
        machines: [],
        placedMachines: [],
    }

    /**
     * The number of Research Slots available. Will depend on the Research Slot research.
     */
    public unlockedResearchSlots: KnockoutComputed<number>;

    /**
     * Determines the size of the lab. Will depend on region progression.
     */
    public labLevel: KnockoutComputed<number>;

    /**
     * The set lab dimensions based on lab level.
     */
    public static labSizes: Record<number, {x: number, y: number}> = {
        1: {x: 6, y: 7},
        2: {x: 7, y: 8},
        3: {x: 8, y: 9},
        4: {x: 9, y: 10},
    };

    constructor() {
        this.researchList = this.defaults.researchList;
        this.currentResearch = ko.observableArray(this.defaults.currentResearch);

        this.unlockedResearchSlots = ko.pureComputed(() => {
            if (this.isResearched(Lab.Research.research_slot2)) {
                return 3;
            }
            if (this.isResearched(Lab.Research.research_slot1)) {
                return 2;
            }
            return 1;
        });

        this.labLevel = ko.pureComputed(() => {
            if (MapHelper.accessToTown('Sunyshore City')) {
                return 4;
            }
            if (MapHelper.accessToTown('Mauville City')) {
                return 3;
            }
            if (MapHelper.accessToTown('New Bark Town')) {
                return 2;
            }
            return 1;
        });

        this.machines = this.defaults.machines;
        this.placedMachines = ko.observableArray(this.defaults.placedMachines);

    }

    initialize() {
        // TODO: HLXII - Add all Researches
        // TODO: HLXII - Balance research point cost
        //#region Research

        /**
         * NOTE: We store the research save data in the JSON using the enum string value.
         * This will make things a bit easier down the line, as when loading saves, we can use the enum string value,
         * and thus adding new research in between existing ones can be done without additional save manipulation
         *
         * However, the index of the researchList must match the enum number value, as we index by the enum in
         * isResearched(). Adding new research in between older ones works, however the order in the enum must match.
         * We don't have to worry about the actual enum number values (aka shifting when adding new ones), since
         * We store research save data by the enum string value, which won't change.
         */

        this.researchList = [

            //#region Research

            // Research Slots
            new Research(Lab.Research.research_slot1, ResearchType.Research_Slot,
                'Research Slot I', 'Unlocks a second Research Slot.',
                10000),
            new Research(Lab.Research.research_slot2, ResearchType.Research_Slot,
                'Research Slot II', 'Unlocks a third Research Slot.',
                30000, { requirements: [new ResearchedRequirement(Lab.Research.research_slot1)] }),

            // Research Slot Workers
            new Research(Lab.Research.research_workers1, ResearchType.Research_Slot,
                'Research Workers I', 'Increases max research workers to 8.',
                1000),
            new Research(Lab.Research.research_workers2, ResearchType.Research_Slot,
                'Research Workers II', 'Increases max research workers to 12.',
                4000, { requirements: [new ResearchedRequirement(Lab.Research.research_workers1)] }),
            new Research(Lab.Research.research_workers3, ResearchType.Research_Slot,
                'Research Workers III', 'Increases max research workers to 16.',
                16000, { requirements: [new ResearchedRequirement(Lab.Research.research_workers2)] }),
            new Research(Lab.Research.research_workers4, ResearchType.Research_Slot,
                'Research Workers IV', 'Increases max research workers to 20.',
                64000, { requirements: [new ResearchedRequirement(Lab.Research.research_workers3)] }),

            //#endregion

            //#region Machines

            // Fabricator
            new Research(Lab.Research.fabricator, ResearchType.Machine,
                'Fabricator', 'Unlocks the Fabricator machine.',
                1000, {
                    completeDelegate: () => {
                        App.game.lab.machines[Lab.Machine.fabricator].amount = 1;
                    },
                }),
            new Research(Lab.Research.fabricator_speed1, ResearchType.Machine,
                'Fabricator Speed I', 'Increases fabrication speed by 25%.',
                5000, { requirements: [new ResearchedRequirement(Lab.Research.fabricator)] }),
            new Research(Lab.Research.fabricator_speed2, ResearchType.Machine,
                'Fabricator Speed II', 'Increases fabrication speed by 50%.',
                15000, { requirements: [new ResearchedRequirement(Lab.Research.fabricator_speed1)] }),
            new Research(Lab.Research.fabricator_speed3, ResearchType.Machine,
                'Fabricator Speed III', 'Increases fabrication speed by 75%.',
                45000, { requirements: [new ResearchedRequirement(Lab.Research.fabricator_speed2)] }),
            new Research(Lab.Research.fabricator_speed4, ResearchType.Machine,
                'Fabricator Speed IV', 'Increases fabrication speed by 100%.',
                135000, { requirements: [new ResearchedRequirement(Lab.Research.fabricator_speed3)] }),

            // Plate Deconstructor
            new Research(Lab.Research.plate_deconstructor, ResearchType.Machine,
                'Plate Deconstructor', 'Unlocks the Plate Deconstructor Machine.',
                2000),

            new Research(Lab.Research.plate_deconstructor_speed1, ResearchType.Machine,
                'Plate Deconstructor Speed I', 'Increases plate deconstruction speed by 25%.',
                3000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor)] }),
            new Research(Lab.Research.plate_deconstructor_speed2, ResearchType.Machine,
                'Plate Deconstructor Speed II', 'Increases plate deconstruction speed by 50%.',
                9000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor_speed1)] }),
            new Research(Lab.Research.plate_deconstructor_speed3, ResearchType.Machine,
                'Plate Deconstructor Speed III', 'Increases plate deconstruction speed by 75%.',
                27000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor_speed2)] }),
            new Research(Lab.Research.plate_deconstructor_speed4, ResearchType.Machine,
                'Plate Deconstructor Speed IV', 'Increases plate deconstruction speed by 100%.',
                81000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor_speed3)] }),

            new Research(Lab.Research.plate_deconstructor_eff1, ResearchType.Machine,
                'Plate Deconstructor Efficiency I', 'Increases amount of shards gained from plate deconstruction by 25%.',
                4000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor)] }),
            new Research(Lab.Research.plate_deconstructor_eff2, ResearchType.Machine,
                'Plate Deconstructor Efficiency I', 'Increases amount of shards gained from plate deconstruction by 50%.',
                12000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor_eff1)] }),
            new Research(Lab.Research.plate_deconstructor_eff3, ResearchType.Machine,
                'Plate Deconstructor Efficiency I', 'Increases amount of shards gained from plate deconstruction by 75%.',
                36000, { requirements: [new ResearchedRequirement(Lab.Research.plate_deconstructor_eff2)] }),

            // Plate Reconstructor
            new Research(Lab.Research.plate_reconstructor, ResearchType.Machine,
                'Plate Reconstructor', 'Unlocks the Plate Reconstructor Machine.',
                2000),

            new Research(Lab.Research.plate_reconstructor_speed1, ResearchType.Machine,
                'Plate Reconstructor Speed I', 'Increases plate reconstruction speed by 25%.',
                3000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor)] }),
            new Research(Lab.Research.plate_reconstructor_speed2, ResearchType.Machine,
                'Plate Reconstructor Speed II', 'Increases plate reconstruction speed by 50%.',
                9000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor_speed1)] }),
            new Research(Lab.Research.plate_reconstructor_speed3, ResearchType.Machine,
                'Plate Reconstructor Speed III', 'Increases plate reconstruction speed by 75%.',
                27000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor_speed2)] }),
            new Research(Lab.Research.plate_reconstructor_speed4, ResearchType.Machine,
                'Plate Reconstructor Speed IV', 'Increases plate reconstruction speed by 100%.',
                81000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor_speed3)] }),

            new Research(Lab.Research.plate_reconstructor_eff1, ResearchType.Machine,
                'Plate Reconstructor Efficiency I', 'Decreases amount of shards required for plate reconstruction by 12.5%.',
                4000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor)] }),
            new Research(Lab.Research.plate_reconstructor_eff2, ResearchType.Machine,
                'Plate Reconstructor Efficiency I', 'Decreases amount of shards required for plate reconstruction by 25%.',
                12000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor_eff1)] }),
            new Research(Lab.Research.plate_reconstructor_eff3, ResearchType.Machine,
                'Plate Reconstructor Efficiency I', 'Decreases amount of shards required for plate reconstruction by 50%.',
                36000, { requirements: [new ResearchedRequirement(Lab.Research.plate_reconstructor_eff2)] }),

            // Incubator
            /*
            'incubator',
            'incubator_capacity1',
            'incubator_capacity2',
            'incubator_capacity3',
            'incubator_capacity4',
            'incubator_fuel',
            'incubator_fuel_flame_plate',
            'incubator_fuel_fire_stone',
            'incubator_fuel_occa',
            'incubator_fuel_magmarizer',
            'incubator_fuel_eff1',
            'incubator_fuel_eff2',
            'incubator_fuel_eff3',
            */
            // Generator
            new Research(Lab.Research.generator, ResearchType.Machine,
                'Generator', 'Unlocks the Generator Machine.',
                9000),

            new Research(Lab.Research.generator_power1, ResearchType.Machine,
                'Generator Power I', 'Increases generator effect by 25%.',
                10000, { requirements: [new ResearchedRequirement(Lab.Research.generator)] }),
            new Research(Lab.Research.generator_power2, ResearchType.Machine,
                'Generator Power II', 'Increases generator effect by 50%.',
                30000, { requirements: [new ResearchedRequirement(Lab.Research.generator_power1)] }),
            new Research(Lab.Research.generator_power3, ResearchType.Machine,
                'Generator Power III', 'Increases generator effect by 75%.',
                90000, { requirements: [new ResearchedRequirement(Lab.Research.generator_power2)] }),

            new Research(Lab.Research.generator_fuel, ResearchType.Machine,
                'Generator Fuel', 'Upgrades Generators to allow for fuel.',
                15000, { requirements: [new ResearchedRequirement(Lab.Research.generator)] }),
            new ResearchWithCost(Lab.Research.generator_fuel_zap_plate, ResearchType.Machine,
                'Generator Fuel - Zap Plate', 'Configures Generators to use Zap Plates for fuel.',
                20000, [{item: {type: ItemType.underground, id: 'Zap Plate'}, amount: 10}], { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel)] }),
            new ResearchWithCost(Lab.Research.generator_fuel_thunder_stone, ResearchType.Machine,
                'Generator Fuel - Thunder Stone', 'Configures Generators to use Thunder Stones for fuel.',
                20000, [{item: {type: ItemType.item, id: 'Thunder_stone'}, amount: 10}], { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel)] }),
            new ResearchWithCost(Lab.Research.generator_fuel_wacan, ResearchType.Machine,
                'Generator Fuel - Wacan Berry', 'Configures Generators to use Wacan Berries for fuel.',
                20000, [{item: {type: ItemType.berry, id: BerryType.Wacan}, amount: 10}], { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel)] }),
            new ResearchWithCost(Lab.Research.generator_fuel_electirizer, ResearchType.Machine,
                'Generator Fuel - Electirizer', 'Configures Generators to use Electirizers for fuel.',
                20000, [{item: {type: ItemType.item, id: 'Electirizer'}, amount: 10}], { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel)] }),

            new Research(Lab.Research.generator_fuel_eff1, ResearchType.Machine,
                'Generator Efficiency I', 'Increases generator fuel efficiency by 25%.',
                10000, { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel)] }),
            new Research(Lab.Research.generator_fuel_eff2, ResearchType.Machine,
                'Generator Efficiency II', 'Increases generator fuel efficiency by 50%.',
                30000, { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel_eff2)] }),
            new Research(Lab.Research.generator_fuel_eff3, ResearchType.Machine,
                'Generator Efficiency III', 'Increases generator fuel efficiency by 75%.',
                90000, { requirements: [new ResearchedRequirement(Lab.Research.generator_fuel_eff3)] }),

            // Fossil Reviver
            /*
            'fossil_reviver',
            'fossil_reviver_speed1',
            'fossil_reviver_speed2',
            'fossil_reviver_speed3',
            'fossil_reviver_queue',
            'fossil_reviver_queue1',
            'fossil_reviver_queue2',
            'fossil_reviver_queue3',
            'fossil_reviver_queue4',
            'fossil_helix',
            'fossil_dome',
            'fossil_old_amber',
            'fossil_root',
            'fossil_claw',
            'fossil_skull',
            'fossil_armor',
            'fossil_cover',
            'fossil_plume',
            'fossil_jaw',
            'fossil_sail',
            */
            // Research Booster

            // Pokeball Factory
            /*
            'pokeball_factory',
            'pokeball_factory_speed1',
            'pokeball_factory_speed2',
            'pokeball_factory_speed3',
            'fastball',
            'quickball',
            'timerball',
            'duskball',
            'luxuryball',
            */
            // Type Boosters
            // TODO: HLXII - Implement after Typed BF is implemented
            /*
            new TypeBoosterResearch(Lab.Research.type_boost_normal, PokemonType.Normal, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_fire, PokemonType.Fire, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_water, PokemonType.Water, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_electric, PokemonType.Electric, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_grass, PokemonType.Grass, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_ice, PokemonType.Ice, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_fighting, PokemonType.Fighting, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_poison, PokemonType.Poison, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_ground, PokemonType.Ground, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_flying, PokemonType.Flying, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_psychic, PokemonType.Psychic, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_bug, PokemonType.Bug, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_rock, PokemonType.Rock, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_ghost, PokemonType.Ghost, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_dragon, PokemonType.Dragon, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_dark, PokemonType.Dark, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_steel, PokemonType.Steel, 100),
            new TypeBoosterResearch(Lab.Research.type_boost_fairy, PokemonType.Fairy, 100),
            */

            // Weather Controller

            // Time Machine
            // TODO: HLXII - Implement one day
            /*
            new Research(Lab.Research.time_machine, ResearchType.Machine,
                'Time Machine', 'Unlocks the Time Machine',
                100,
                {
                    requirements: [new ObtainedPokemonRequirement(pokemonMap.Celebi)],
                    workerFilter: new WorkerFilter((pokemon: PartyPokemon) => {
                        return pokemon.name == 'Dialga' || pokemon.name == 'Celebi';
                    }, 'Only Time Pokemon can work on this Research'),
                }),
            */

            //#endregion



            //#region Fabricator Item Blueprints
            /*
            'fire_stone',
            'water_stone',
            'thunder_stone',
            'leaf_stone',
            'moon_stone',
            'sun_stone',
            'dragon_scale',
            'metal_coat',
            'upgrade',
            'dubious_disc',
            'electirizer',
            'magmarizer',
            'protector',
            'reaper_cloth',
            */
            //#endregion

            //#region Genesect
            /*
            'drive_burner',
            'shock_drive',
            'burn_drive',
            'chill_drive',
            'douse_drive',
            */
            //#endregion

            //#region Arceus
            /*
            'legendary_plate',
            'legendary_draco_plate',
            'legendary_dread_plate',
            'legendary_earth_plate',
            'legendary_fist_plate',
            'legendary_flame_plate',
            'legendary_icicle_plate',
            'legendary_insect_plate',
            'legendary_iron_plate',
            'legendary_meadow_plate',
            'legendary_mind_plate',
            'legendary_sky_plate',
            'legendary_splash_plate',
            'legendary_spooky_plate',
            'legendary_stone_plate',
            'legendary_toxic_plate',
            'legendary_zap_plate',
            'legendary_pixie_plate',
            */
            //#endregion

        ];

        //#endregion

        //#region Machines

        // TODO: HLXII - Machines
        this.machines = [
            new Fabricator(Lab.Machine.fabricator, 'Fabricator', 'Creates new machines and items.', 2, 3),
            new PlateDeconstructor(Lab.Machine.plate_deconstructor, 'Plate Deconstructor', 'Deconstruct plates into shards.', 1, 2),
            new PlateReconstructor(Lab.Machine.plate_reconstructor, 'Plate Reconstructor', 'Reconstruct plates from shards.', 1, 2),
            new Incubator(Lab.Machine.incubator, 'Incubator', 'Increases the total Hatchery queue slots when placed.', 2, 3),
            new FossilReviver(Lab.Machine.fossil_reviver, 'Fossil Reviver', 'Revives Fossil Pokemon', 5, 2),
            new Generator(Lab.Machine.generator, 'Generator', 'Increases Machine speed when placed.', 4, 6),
        ];

        Generator.initialize();

        //#endregion
    }

    update(delta: number) {

        // Update Research Slots
        this.currentResearch().forEach(res => {
            const complete = res.update(delta);
            if (complete) {
                // TODO: HLXII - Update notification properties
                Notifier.notify({
                    message: 'Some Research has been completed!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.achievement,
                });
            }
        });

        // Update Machines
        this.placedMachines().forEach(placedMachine => {
            placedMachine.state.update(delta);
        });

        // Handle unlocked Research
        let notify = false;
        this.researchList.forEach(research => {
            if (research.canResearch() && !research.notified) {
                research.notified = true;
                notify = true;
            }
        });
        if (notify) {
            // TODO: HLXII - Update notification properties
            Notifier.notify({
                message: 'New Research is available!',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.achievement,
            });
        }
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Laboratory_key);
    }

    beginResearch(research: Research) {
        if (this.currentResearch().length < this.unlockedResearchSlots()) {
            this.currentResearch.push(new ResearchSlot(research, []));
            research.inProgress = true;
            research.progress = 0;
        }
    }

    cancelResearch(research: Research, shouldConfirm = false) {
        if (shouldConfirm && !confirm('Are you sure you want to cancel this research? All progress will be lost.')) {
            return;
        }
        const researchSlot = this.currentResearch().find(slot => slot.research.id === research.id);
        researchSlot.clear();
        this.currentResearch.remove(researchSlot);
    }

    completeResearch(research: Research) {
        research.completed = true;
        // Handle complete delegate
        if (research.completeDelegate) {
            research.completeDelegate();
        }
        this.cancelResearch(research);
    }

    isResearched(research: Lab.Research): boolean {
        return this.researchList[research].completed;
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            console.warn('Lab not loaded.');
            return;
        }

        if (json.hasOwnProperty('researchList')) {
            for (const key in json['researchList']) {
                if (json['researchList'].hasOwnProperty(key)) {
                    this.researchList[Lab.Research[key]].fromJSON(json['researchList'][key]);
                }
            }
        }

        if (json.hasOwnProperty('currentResearch')) {
            json['currentResearch'].forEach(res => {
                const slot = new ResearchSlot(undefined, []);
                slot.fromJSON(res);
                this.currentResearch.push(slot);
            });
        } else {
            this.currentResearch(this.defaults.currentResearch);
        }

        if (json.hasOwnProperty('machines')) {
            for (const key in json['machines']) {
                if (json['machines'].hasOwnProperty(key)) {
                    this.machines[Lab.Machine[key]].fromJSON(json['machines'][key]);
                }
            }
        }

        if (json.hasOwnProperty('placedMachines')) {
            json['placedMachines'].forEach(res => {
                const machine = new PlacedMachine();
                machine.fromJSON(res);
                this.placedMachines.push(machine);
            });
        } else {
            this.placedMachines(this.defaults.placedMachines);
        }
    }

    toJSON(): Record<string, any> {
        const save = {};

        save['researchList'] = {};
        for (let i = 0; i < this.researchList.length; i++) {
            save['researchList'][Lab.Research[this.researchList[i].id]] = this.researchList[i].toJSON();
        }

        save['currentResearch'] = this.currentResearch().map(res => res.toJSON());

        save['machines'] = {};
        for (let i = 0; i < this.machines.length; i++) {
            save['machines'][Lab.Machine[this.machines[i].id]] = this.machines[i].toJSON();
        }

        save['placedMachines'] = this.placedMachines().map(res => res.toJSON());

        return save;
    }

}

namespace Lab {
    // TODO: HLXII - Add all Researches
    export enum Research {
        // Research
        'research_slot1' = 0,
        'research_slot2',
        'research_workers1',
        'research_workers2',
        'research_workers3',
        'research_workers4',
        // Fabricator
        'fabricator',
        'fabricator_speed1',
        'fabricator_speed2',
        'fabricator_speed3',
        'fabricator_speed4',
        // Plate Deconstructor
        'plate_deconstructor',
        'plate_deconstructor_speed1',
        'plate_deconstructor_speed2',
        'plate_deconstructor_speed3',
        'plate_deconstructor_speed4',
        'plate_deconstructor_eff1',
        'plate_deconstructor_eff2',
        'plate_deconstructor_eff3',
        // Plate Reconstructor
        'plate_reconstructor',
        'plate_reconstructor_speed1',
        'plate_reconstructor_speed2',
        'plate_reconstructor_speed3',
        'plate_reconstructor_speed4',
        'plate_reconstructor_eff1',
        'plate_reconstructor_eff2',
        'plate_reconstructor_eff3',
        // Incubator
        /*
        'incubator',
        'incubator_capacity1',
        'incubator_capacity2',
        'incubator_capacity3',
        'incubator_capacity4',
        'incubator_fuel',
        'incubator_fuel_flame_plate',
        'incubator_fuel_fire_stone',
        'incubator_fuel_occa',
        'incubator_fuel_magmarizer',
        'incubator_fuel_eff1',
        'incubator_fuel_eff2',
        'incubator_fuel_eff3',
        */
        // Generator
        'generator',
        'generator_power1',
        'generator_power2',
        'generator_power3',
        'generator_fuel',
        'generator_fuel_zap_plate',
        'generator_fuel_thunder_stone',
        'generator_fuel_wacan',
        'generator_fuel_electirizer',
        'generator_fuel_eff1',
        'generator_fuel_eff2',
        'generator_fuel_eff3',
        // Fossil Reviver
        'fossil_reviver',
        'fossil_reviver_speed1',
        'fossil_reviver_speed2',
        'fossil_reviver_speed3',
        'fossil_reviver_queue',
        'fossil_reviver_queue1',
        'fossil_reviver_queue2',
        'fossil_reviver_queue3',
        'fossil_reviver_queue4',
        'fossil_helix',
        'fossil_dome',
        'fossil_old_amber',
        'fossil_root',
        'fossil_claw',
        'fossil_skull',
        'fossil_armor',
        'fossil_cover',
        'fossil_plume',
        'fossil_jaw',
        'fossil_sail',
        // TODO: HLXII - Add VIII fossils
        // Research Booster

        // Pokeball Factory
        'pokeball_factory',
        'pokeball_factory_speed1',
        'pokeball_factory_speed2',
        'pokeball_factory_speed3',
        'fastball',
        'quickball',
        'timerball',
        'duskball',
        'luxuryball',
        // Type Booster
        /*
        'type_boost',
        'type_boost_normal',
        'type_boost_fire',
        'type_boost_water',
        'type_boost_electric',
        'type_boost_grass',
        'type_boost_ice',
        'type_boost_fighting',
        'type_boost_poison',
        'type_boost_ground',
        'type_boost_flying',
        'type_boost_psychic',
        'type_boost_bug',
        'type_boost_rock',
        'type_boost_ghost',
        'type_boost_dragon',
        'type_boost_dark',
        'type_boost_steel',
        'type_boost_fairy',
        */
        // Weather Controller

        // Time Machine
        //'time_machine',
        // Fabricator Item Blueprints
        'fire_stone',
        'water_stone',
        'thunder_stone',
        'leaf_stone',
        'moon_stone',
        'sun_stone',
        'dragon_scale',
        'metal_coat',
        'upgrade',
        'dubious_disc',
        'electirizer',
        'magmarizer',
        'protector',
        'reaper_cloth',
        // Genesect
        'drive_burner',
        'shock_drive',
        'burn_drive',
        'chill_drive',
        'douse_drive',
        // Arceus
        'legendary_plate',
        'legendary_draco_plate',
        'legendary_dread_plate',
        'legendary_earth_plate',
        'legendary_fist_plate',
        'legendary_flame_plate',
        'legendary_icicle_plate',
        'legendary_insect_plate',
        'legendary_iron_plate',
        'legendary_meadow_plate',
        'legendary_mind_plate',
        'legendary_sky_plate',
        'legendary_splash_plate',
        'legendary_spooky_plate',
        'legendary_stone_plate',
        'legendary_toxic_plate',
        'legendary_zap_plate',
        'legendary_pixie_plate',
    }

    // TODO: HLXII - Add all Machines
    export enum Machine {
        'fabricator' = 0,
        'plate_deconstructor',
        'plate_reconstructor',
        'incubator',
        'fossil_reviver',
        'generator',
    }
}
