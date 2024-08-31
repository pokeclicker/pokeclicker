/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Saveable.d.ts" />

class BlendingMachine implements Saveable {
    saveKey = '';

    defaults = {
        blendSlots: new Array(4).fill(null).map((index) => {
            return new BlendingSlot(index === 0, BerryType.None, 0);
        }),
        timer: 0,
        isUnlocked: false,
        degreesRotated: 0,
    };

    blendSlots: Array<BlendingSlot>;
    _timer: KnockoutObservable<number>;
    _degreesRotated: KnockoutObservable<number>;
    _isUnlocked: KnockoutObservable<boolean>;
    isEmpty: KnockoutComputed<boolean>;

    constructor(isUnlocked: boolean, public index) {
        this.blendSlots = this.defaults.blendSlots;
        this._timer = ko.observable(0);
        this._degreesRotated = ko.observable(0);
        this._isUnlocked = ko.observable(isUnlocked);
        this.isEmpty = ko.pureComputed(() => {
            return this.blendSlots.filter(slot => slot.isEmpty()).length === 4;
        });
    }

    update(seconds: number): void {
        if (this.blendSlots.some(slot => !slot.isEmpty())) {

            this.timer += seconds * App.game.blending.rpm(this.blendSlots)/100;

            if (this.timer >= 60) {
                this.blendSlots.filter(slot => !slot.isEmpty()).forEach(slot => {
                    GameHelper.incrementObservable(App.game.farming.berryList[slot.berry], -1);
                    App.game.blending.gainFlavor(slot.berry);
                    return;
                }
            )
                this.timer = 0
                return;
            }

            // Don't let player use berry if there is only one left
            this.blendSlots.filter(slot => !slot.isEmpty()).forEach(slot => {
                if (App.game.farming.berryList[slot.berry]() <= 1) {
                        slot.berry = BerryType.None;
                    }
                return;
            })

        } else {
            this.timer = 0;
        }
    }

    animate(): void {
        if (this.blendSlots.some(slot => !slot.isEmpty())) {
        
            this.degreesRotated = this.degreesRotated + 6 * App.game.blending.rpm(this.blendSlots) / 1000;

            if (this.degreesRotated > 360) {
                this.degreesRotated = 0;
            }
        } else {
            this.degreesRotated = 0;
        }
    }

    toJSON(): Record<string, any> {
        return {
            blendSlots: this.blendSlots.map(slot => slot.toJSON()),
            timer: this.timer,
            isUnlocked: this.isUnlocked,
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedSlots = json.blendSlots;
        if (savedSlots == null) {
            this.blendSlots = this.defaults.blendSlots;
        } else {
            (savedSlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const slot: BlendingSlot = new BlendingSlot(false, BerryType.None, 0);
                slot.fromJSON(value);
                this.blendSlots[index] = slot;
            });
        }
        this.timer = json.timer ?? this.defaults.timer;
        this.isUnlocked = json.isUnlocked ?? this.defaults.isUnlocked;
    }

    // Knockout getters
    get isUnlocked(): boolean {
        return this._isUnlocked();
    }
    set isUnlocked(value: boolean) {
        this._isUnlocked(value);
    }

    get timer(): number {
        return this._timer();
    }
    set timer(value: number) {
        this._timer(value);
    }

    get degreesRotated(): number {
        return this._degreesRotated();
    }
    set degreesRotated(value: number) {
        this._degreesRotated(value);
    }
}
