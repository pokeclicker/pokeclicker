class Lab implements Feature {
    name = 'Lab';
    saveKey = 'lab';

    researchList: Research[];

    defaults: Record<string, any>;

    constructor() {
        this.researchList = [];
    }

    initialize() {
        // TODO: HLXII - Add all Researches
        this.researchList = [
            new Research(Researches.Research.research_slot1, 'Research Slot I'),
            new Research(Researches.Research.type_fire, 'Type Booster - Fire'),
            new Research(Researches.Research.type_water, 'Type_Booster - Water'),
        ];
    }

    update(delta: number) {
        // TODO: HLXII - Handle updating research progress
    }

    canAccess(): boolean {
        // TODO: HLXII - Figure out how to access this.
        return true;
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
    }

    toJSON(): Record<string, any> {
        const save = {};

        save['researchList'] = {};
        for (let i = 0; i < this.researchList.length; i++) {
            save['researchList'][this.researchList[i].id] = this.researchList[i].toJSON();
        }

        return save;
    }

}

// TODO: HLXII - Add all Researches
namespace Researches {
    export enum Research {
        'research_slot1' = 0,
        'type_fire',
        'type_water',
    }
}
