/// <reference path="../Machine.ts" />
/// <reference path="../MachineState.ts" />

/**
 * The Fabricator machine is used to create new machines as well as other items.
 */
class Fabricator extends Machine {

    createState(json?: any): MachineState {
        const state = new FabricatorState();
        state.fromJSON(json);
        return state;
    }

    // Handle research upgrades

}

/**
 * The MachineState for the Fabricator
 */
class FabricatorState extends MachineState {

    private _selectedBlueprint: KnockoutObservable<BlueprintType>;

    constructor() {
        super();
        this._selectedBlueprint = ko.observable();
    }

    update(delta: number) {
        return;
    }

    handleActivate(): void {
        return;
    }
    handleDeactivate(): void {
        return;
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
    }

}
