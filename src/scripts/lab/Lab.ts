class Lab implements Feature {
    name = 'Lab';
    saveKey = 'lab';

    researchList: Research[];

    currentResearch: KnockoutObservableArray<ResearchSlot>;

    defaults = {
        researchList: [],
        currentResearch: [],
    }

    /**
     * The number of Research Slots available. Will depend on the Research Slot research.
     */
    public unlockedResearchSlots: KnockoutComputed<number>;

    constructor() {
        this.researchList = this.defaults.researchList;
        this.currentResearch = ko.observableArray(this.defaults.currentResearch);

        this.unlockedResearchSlots = ko.pureComputed(function () {
            if (App.game.lab.researchList[Researches.Research.research_slot2].completed) {
                return 3;
            }
            if (App.game.lab.researchList[Researches.Research.research_slot1].completed) {
                return 2;
            }
            return 1;
        });


    }

    initialize() {
        // TODO: HLXII - Add all Researches
        // TODO: HLXII - Balance research point cost
        this.researchList = [
            new Research(Researches.Research.research_slot1, ResearchType.Research_Slot,
                'Research Slot I', 'Unlocks a second Research Slot.',
                1),
            new Research(Researches.Research.research_slot2, ResearchType.Research_Slot,
                'Research Slot II', 'Unlocks a third Research Slot.',
                1),
            new TypeBoosterResearch(Researches.Research.type_boost_normal, PokemonType.Normal, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_fire, PokemonType.Fire, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_water, PokemonType.Water, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_electric, PokemonType.Electric, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_grass, PokemonType.Grass, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_ice, PokemonType.Ice, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_fighting, PokemonType.Fighting, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_poison, PokemonType.Poison, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_ground, PokemonType.Ground, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_flying, PokemonType.Flying, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_psychic, PokemonType.Psychic, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_bug, PokemonType.Bug, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_rock, PokemonType.Rock, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_ghost, PokemonType.Ghost, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_dragon, PokemonType.Dragon, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_dark, PokemonType.Dark, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_steel, PokemonType.Steel, 100),
            new TypeBoosterResearch(Researches.Research.type_boost_fairy, PokemonType.Fairy, 100),

            new Research(Researches.Research.time_machine, ResearchType.Machine,
                'Time Machine', 'Unlocks the Time Machine',
                100,
                {
                    requirements: [new ObtainedPokemonRequirement(pokemonMap.Celebi)],
                    workerFilter: new WorkerFilter((pokemon: PartyPokemon) => {
                        return pokemon.name == 'Dialga' || pokemon.name == 'Celebi';
                    }, 'Only Time Pokemon can work on this Research'),
                }),
        ];
    }

    update(delta: number) {
        // TODO: HLXII - Handle updating research progress
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

    cancelResearch(research: Research) {
        const researchSlot = this.currentResearch().find(slot => slot.research.id === research.id);
        researchSlot.clear();
        this.currentResearch.remove(researchSlot);
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            console.warn('Lab not loaded.');
            return;
        }

        if (json.hasOwnProperty('researchList')) {
            for (const key in json['researchList']) {
                if (json['researchList'].hasOwnProperty(key)) {
                    this.researchList[key].fromJSON(json['researchList'][key]);
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
    }

    toJSON(): Record<string, any> {
        const save = {};

        save['researchList'] = {};
        for (let i = 0; i < this.researchList.length; i++) {
            save['researchList'][this.researchList[i].id] = this.researchList[i].toJSON();
        }

        save['currentResearch'] = this.currentResearch().map(res => res.toJSON());

        return save;
    }

}

// TODO: HLXII - Add all Researches
namespace Researches {
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
}
