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

    // TODO: HLXII - Handle with Research Upgrades
    public static queueSlots: KnockoutComputed<number> = ko.pureComputed(() => {
        return 4;
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

    update(delta: number) {
        switch (this.stage) {
            case MachineStage.disabled: {
                return;
            }
            case MachineStage.idle: {
                // Fossil added
                if (this.fossil) {
                    this.stage = MachineStage.active;
                    this.progress = 0;
                    return;
                }
                // Reviving fossil from queue
                if (this.queue.length > 0) {
                    this.stage = MachineStage.active;
                    this.fossil = this._queue.shift();
                    this.progress = 0;
                    return;
                }
                return;
            }
            case MachineStage.active: {
                // TODO: HLXII - Handle Research Upgrades (?)
                this.progress += delta;
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
                return;
            }
        }
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
            const fossilItem = player.mineInventory().find(i => i.name == this.fossil);
            GameHelper.incrementObservable(fossilItem.amount, 1);
        }
        if (this.queue.length) {
            this.queue.forEach(fossil => {
                const fossilItem = player.mineInventory().find(i => i.name == fossil);
                GameHelper.incrementObservable(fossilItem.amount, 1);
            });
        }
    }

    addToQueue(fossil: UndergroundItem): boolean {
        const queueSize = this.queue.length;
        if (this.fossil == '') {
            this.fossil = fossil.name;
            // Removing from inventory
            const fossilItem = player.mineInventory().find(i => i.name == fossil.name);
            GameHelper.incrementObservable(fossilItem.amount, -1);
            return true;
        }
        if (this.queue.length < FossilReviver.queueSlots()) {
            this._queue.push(fossil.name);
            // Removing from inventory
            const fossilItem = player.mineInventory().find(i => i.name == fossil.name);
            GameHelper.incrementObservable(fossilItem.amount, -1);
            return true;
        }
        return false;
    }

    removeFromQueue(index: number): boolean {
        if (this.queue.length > index) {
            const fossil = this._queue.splice(index, 1)[0];
            // Adding back to inventory
            const fossilItem = player.mineInventory().find(i => i.name == fossil);
            GameHelper.incrementObservable(fossilItem.amount, 1);
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
