/// <reference path="./Machine.ts" />

/**
 * The Plate Reconstructor machine is used to reconstruct plates from shards.
 */
class PlateReconstructor extends Machine {

    createState(json?: any): MachineState {
        const state = new GeneralMachineState();
        state.fromJSON(json);
        return state;
    }

}
