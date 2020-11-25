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
        2: {x: 8, y: 9},
        3: {x: 10, y: 11},
        4: {x: 12, y: 13},
    };

    constructor() {
        this.researchList = this.defaults.researchList;
        this.currentResearch = ko.observableArray(this.defaults.currentResearch);

        this.unlockedResearchSlots = ko.pureComputed(() => {
            if (App.game.lab.researchList[Lab.Research.research_slot2].completed) {
                return 3;
            }
            if (App.game.lab.researchList[Lab.Research.research_slot1].completed) {
                return 2;
            }
            return 1;
        });

        this.labLevel = ko.pureComputed(() => {
            return 1;
            // TODO: HLXII - Use this logic when lab size is implemented
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

        this.researchList = [
            new Research(Lab.Research.research_slot1, ResearchType.Research_Slot,
                'Research Slot I', 'Unlocks a second Research Slot.',
                1000),
            new Research(Lab.Research.research_slot2, ResearchType.Research_Slot,
                'Research Slot II', 'Unlocks a third Research Slot.',
                1000, { requirements: [new ResearchedRequirement(Lab.Research.research_slot1)] }),
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

            new Research(Lab.Research.time_machine, ResearchType.Machine,
                'Time Machine', 'Unlocks the Time Machine',
                100,
                {
                    requirements: [new ObtainedPokemonRequirement(pokemonMap.Celebi)],
                    workerFilter: new WorkerFilter((pokemon: PartyPokemon) => {
                        return pokemon.name == 'Dialga' || pokemon.name == 'Celebi';
                    }, 'Only Time Pokemon can work on this Research'),
                }),
        ];

        //#endregion

        //#region Machines

        // TODO: HLXII - Machines
        this.machines = [
            new Fabricator(Lab.Machine.fabricator, 'Fabricator', 'Creates new machines and items.', 2, 3),
            new PlateDeconstructor(Lab.Machine.plate_deconstructor, 'Plate Deconstructor', 'Deconstruct plates into shards.', 1, 2),
            new PlateReconstructor(Lab.Machine.plate_reconstructor, 'Plate Reconstructor', 'Reconstruct plates from shards.', 1, 2),
        ];

        //#endregion
    }

    update(delta: number) {
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

        this.placedMachines().forEach(placedMachine => {
            placedMachine.state.update(delta);
        });
    }

    canAccess(): boolean {
        // TODO: HLXII - Figure out how to access this.
        return true;
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
        this.cancelResearch(research);
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
        'research_slot1' = 0,
        'research_slot2',
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
        'time_machine',
    }

    // TODO: HLXII - Add all Machines
    export enum Machine {
        'fabricator' = 0,
        'plate_deconstructor',
        'plate_reconstructor',
    }
}
