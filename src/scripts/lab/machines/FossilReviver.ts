/// <reference path="./Machine.ts" />
/// <reference path="./MachineState.ts" />
/**
 * The Fossil Reviver will be used to revive Fossil Pokemon.
 */
class FossilReviver extends Machine {

    createState(json?: any): MachineState {
        const state = new FossilReviverState();
        state.fromJSON(json);
        return state;
    }

    public static getImage(fossil: string): string {
        return `assets/images/breeding/${fossil}.png`;
    }

    public static getAvailableFossils() {
        return Object.keys(GameConstants.FossilToPokemon).filter(fossilName => {
            return BagHandler.amount({type: ItemType.underground, id: fossilName})() > 0;
        });
    }

    public static fossilToResearch: Record<string, Lab.Research> = {
        'Helix Fossil': Lab.Research.fossil_helix,
        'Dome Fossil': Lab.Research.fossil_dome,
        'Old Amber': Lab.Research.fossil_old_amber,
        'Root Fossil': Lab.Research.fossil_root,
        'Claw Fossil': Lab.Research.fossil_claw,
        'Armor Fossil': Lab.Research.fossil_armor,
        'Skull Fossil': Lab.Research.fossil_skull,
        'Cover Fossil': Lab.Research.fossil_cover,
        'Plume Fossil': Lab.Research.fossil_plume,
        'Jaw Fossil': Lab.Research.fossil_jaw,
        'Sail Fossil': Lab.Research.fossil_sail,
    }

    public static isDisabled(state: FossilReviverState, fossil: string) {
        // Check fossil research
        const research = this.fossilToResearch[fossil];
        if (!research) {
            console.error(`Error: Fossil Research not found - ${fossil}`);
            return true;
        }
        if (!App.game.lab.isResearched(research)) {
            return true;
        }

        // Checking fossil added (if no queue slots)
        if (!App.game.lab.isResearched(Lab.Research.fossil_reviver_queue)) {
            // Check if fossil already added
            if (state.fossil) {
                return true;
            } else {
                return false;
            }
        }

        // Checking fossil queue
        if (state.queue.length < FossilReviver.queueSlots()) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Determines the speed of revival
     * Dependent on Research Upgrades
     */
    public static revivalSpeed: KnockoutComputed<number> = ko.pureComputed(() => {
        if (App.game.lab.isResearched(Lab.Research.fossil_reviver_speed1)) {
            return 1.75;
        } else if (App.game.lab.isResearched(Lab.Research.fossil_reviver_speed1)) {
            return 1.5;
        } else if (App.game.lab.isResearched(Lab.Research.fossil_reviver_speed1)) {
            return 1.25;
        } else {
            return 1;
        }
    });

    /**
     * Determines the number of queue slots
     * Dependent on Research Upgrades
     */
    public static queueSlots: KnockoutComputed<number> = ko.pureComputed(() => {
        if (App.game.lab.isResearched(Lab.Research.fossil_reviver_queue4)) {
            return 64;
        } else if (App.game.lab.isResearched(Lab.Research.fossil_reviver_queue3)) {
            return 32;
        } else if (App.game.lab.isResearched(Lab.Research.fossil_reviver_queue2)) {
            return 16;
        } else if (App.game.lab.isResearched(Lab.Research.fossil_reviver_queue1)) {
            return 8;
        } else if (App.game.lab.isResearched(Lab.Research.fossil_reviver_queue)) {
            return 4;
        } else {
            return 0;
        }
    });
}

class FossilReviverState extends MachineState {

    private _fossil: KnockoutObservable<string>;

    private _queue: KnockoutObservableArray<string>;

    constructor() {
        super();
        this._fossil = ko.observable<string>('');
        this._queue = ko.observableArray([]);

        this.tooltip = ko.pureComputed(() => {
            switch (this.stage) {
                case MachineStage.disabled: {
                    return 'Disabled';
                }
                case MachineStage.idle: {
                    return 'Idle';
                }
                case MachineStage.active: {
                    const tooltip = [];
                    tooltip.push(`Reviving a ${this.fossil}`);
                    return tooltip.join('<br>');
                }
            }
        });
        this.progressAmount = ko.pureComputed(() => {
            if (!this.fossil) {
                return 0;
            } else {
                const pokemon = GameConstants.FossilToPokemon[this.fossil];
                const dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(pokemon);
                const steps =  App.game.breeding.getSteps(dataPokemon.eggCycles);
                return steps;
            }
        });
    }

    update(delta: number, multiplier: Multiplier): MachineUpdateInfo {
        const info: MachineUpdateInfo = {};
        switch (this.stage) {
            case MachineStage.disabled: {
                break;
            }
            case MachineStage.idle: {
                // Fossil added
                if (this.fossil) {
                    this.stage = MachineStage.active;
                    this.progress = 0;
                    break;
                }
                // Reviving fossil from queue
                if (this.queue.length > 0) {
                    this.stage = MachineStage.active;
                    this.fossil = this._queue.shift();
                    this.progress = 0;
                    break;
                }
                break;
            }
            case MachineStage.active: {
                this.progress += delta * FossilReviver.revivalSpeed() * multiplier.getBonus('machine');
                // Checking Completion
                if (this.progress >= this.progressAmount()) {
                    // Reviving Fossil
                    // Reusing old Fossil Egg framework. This could possibly be refactored later on to be separate.
                    const egg = App.game.breeding.createFossilEgg(this.fossil);
                    egg.steps(this.progress);
                    egg.hatch();
                    // Checking queue
                    if (this.queue.length > 0) {
                        this.fossil = this._queue.shift();
                    } else {
                        this.fossil = '';
                        this.stage = MachineStage.idle;
                    }
                    this.progress = 0;
                }
                break;
            }
        }
        return info;
    }

    handleActivate(): void {
        this.stage = MachineStage.active;
    }
    handleDeactivate(): void {
        this.stage = MachineStage.disabled;
    }

    /**
     * Handles removing the machine from the lab
     */
    remove(): void {
        super.remove();
        // Handle removing fossils
        if (this.fossil) {
            BagHandler.gainItem({type: ItemType.underground, id: this.fossil}, 1);
        }
        if (this.queue.length) {
            this.queue.forEach(fossil => {
                BagHandler.gainItem({type: ItemType.underground, id: fossil}, 1);
            });
        }
    }

    addToQueue(fossil: string): boolean {
        const queueSize = this.queue.length;
        if (this.fossil == '') {
            this.fossil = fossil;
            // Removing from inventory
            BagHandler.gainItem({type: ItemType.underground, id: fossil}, -1);
            return true;
        }
        if (this.queue.length < FossilReviver.queueSlots()) {
            this._queue.push(fossil);
            // Removing from inventory
            BagHandler.gainItem({type: ItemType.underground, id: fossil}, -1);
            return true;
        }
        return false;
    }

    removeFromQueue(index: number): boolean {
        if (this.queue.length > index) {
            const fossil = this._queue.splice(index, 1)[0];
            // Adding back to inventory
            BagHandler.gainItem({type: ItemType.underground, id: fossil}, 1);
            return true;
        }
        return false;
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json['fossil'] = this.fossil;
        json['queue'] = this.queue;
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        if (!json) {
            return;
        }
        this.fossil = json.hasOwnProperty('fossil') ? json['fossil'] : '';
        this.queue = json.hasOwnProperty('queue') ? json['queue'] : [];
    }

    get fossil(): string {
        return this._fossil();
    }

    set fossil(fossil: string) {
        this._fossil(fossil);
    }

    get queue(): string[] {
        return this._queue();
    }

    set queue(value: string[]) {
        this._queue(value);
    }

}
