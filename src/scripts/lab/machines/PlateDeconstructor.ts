/// <reference path="./Machine.ts" />

/**
 * The Plate Deconstructor machine is used to deconstruct plates into shards.
 */
class PlateDeconstructor extends Machine {

    createState(json?: any): MachineState {
        const state = new GeneralMachineState();
        state.fromJSON(json);
        return state;
    }

}
