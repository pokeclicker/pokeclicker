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

    /**
     * Fabricator Blueprints
     */
    public static blueprints: Blueprint[];
    public static initialize() {
        this.blueprints = [];
        // Items
        this.blueprints[BlueprintType.fire_stone] = new Blueprint(BlueprintType.fire_stone, 1000, [{item: {type: ItemType.shard, id: PokemonType.Fire}, amount: 10000}], Lab.Research.fire_stone);
        this.blueprints[BlueprintType.water_stone] = new Blueprint(BlueprintType.water_stone, 1000, [], Lab.Research.water_stone);
        this.blueprints[BlueprintType.thunder_stone] = new Blueprint(BlueprintType.thunder_stone, 1000, [], Lab.Research.thunder_stone);
        this.blueprints[BlueprintType.leaf_stone] = new Blueprint(BlueprintType.leaf_stone, 1000, [], Lab.Research.leaf_stone);
        this.blueprints[BlueprintType.moon_stone] = new Blueprint(BlueprintType.moon_stone, 1000, [], Lab.Research.moon_stone);
        this.blueprints[BlueprintType.sun_stone] = new Blueprint(BlueprintType.sun_stone, 1000, [], Lab.Research.sun_stone);
        this.blueprints[BlueprintType.dragon_scale] = new Blueprint(BlueprintType.dragon_scale, 1000, [], Lab.Research.dragon_scale);
        this.blueprints[BlueprintType.metal_coat] = new Blueprint(BlueprintType.metal_coat, 1000, [], Lab.Research.metal_coat);
        this.blueprints[BlueprintType.upgrade] = new Blueprint(BlueprintType.upgrade, 1000, [], Lab.Research.upgrade);
        this.blueprints[BlueprintType.dubious_disc] = new Blueprint(BlueprintType.dubious_disc, 1000, [], Lab.Research.dubious_disc);
        this.blueprints[BlueprintType.electirizer] = new Blueprint(BlueprintType.electirizer, 1000, [], Lab.Research.electirizer);
        this.blueprints[BlueprintType.magmarizer] = new Blueprint(BlueprintType.magmarizer, 1000, [], Lab.Research.magmarizer);
        this.blueprints[BlueprintType.protector] = new Blueprint(BlueprintType.protector, 1000, [], Lab.Research.protector);
        this.blueprints[BlueprintType.reaper_cloth] = new Blueprint(BlueprintType.reaper_cloth, 1000, [], Lab.Research.reaper_cloth);
        // Machines
        this.blueprints[BlueprintType.fabricator] = new Blueprint(BlueprintType.fabricator, 1000, [], Lab.Research.fabricator);
        this.blueprints[BlueprintType.plate_deconstructor] = new Blueprint(BlueprintType.plate_deconstructor, 40000,
            [
                {item: {type: ItemType.shard, id: PokemonType.Normal}, amount: 100000},
                {item: {type: ItemType.underground, id: 'Hard Stone'}, amount: 10},
            ], Lab.Research.plate_deconstructor);
        this.blueprints[BlueprintType.plate_reconstructor] = new Blueprint(BlueprintType.plate_reconstructor, 40000,
            [
                {item: {type: ItemType.shard, id: PokemonType.Normal}, amount: 100000},
                {item: {type: ItemType.underground, id: 'Upgrade'}, amount: 10},
            ], Lab.Research.plate_reconstructor);
        //this.blueprints[BlueprintType.incubator] = new Blueprint(BlueprintType.incubator, 1000, [], Lab.Research);
        this.blueprints[BlueprintType.generator] = new Blueprint(BlueprintType.generator, 1000, [], Lab.Research.generator);
        this.blueprints[BlueprintType.fossil_reviver] = new Blueprint(BlueprintType.fossil_reviver, 1000, [], Lab.Research.fossil_reviver);
        this.blueprints[BlueprintType.pokeball_factory] = new Blueprint(BlueprintType.pokeball_factory, 1000, [], Lab.Research.pokeball_factory);
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
