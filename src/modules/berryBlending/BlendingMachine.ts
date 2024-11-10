import type {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import BerryType from '../enums/BerryType';
import GameHelper from '../GameHelper';
import BlendingSlot from './BlendingSlot';
import NotificationOption from '../notifications/NotificationOption';
import Notifier from '../notifications/Notifier';
import { SECOND, camelCaseToString } from '../GameConstants';

export default class BlendingMachine implements Saveable {
    saveKey = '';

    defaults = {
        blendSlots: new Array(4).fill(null).map((value, index) => {
            return new BlendingSlot(index === 0 && this.index === 0, BerryType.None, index);
        }),
        timer: 0,
        degreesRotated: 0,
    };

    blendSlots: Array<BlendingSlot>;
    _timer: KnockoutObservable<number>;
    _degreesRotated: KnockoutObservable<number>;
    isEmpty: KnockoutComputed<boolean>;

    constructor(public index: number) {
        this.blendSlots = this.defaults.blendSlots;
        this._timer = ko.observable(0);
        this._degreesRotated = ko.observable(0);
        this.isEmpty = ko.pureComputed(() => {
            return this.blendSlots.filter(slot => slot.isEmpty()).length === 4;
        });
    }

    update(seconds: number): void {
        if (this.blendSlots.some(slot => !slot.isEmpty())) {

            this.timer += seconds * App.game.blending.rpm(this.blendSlots) / 100;

            if (this.timer >= 60) {
                this.blendSlots.filter(slot => !slot.isEmpty()).forEach(slot => {
                    GameHelper.incrementObservable(App.game.farming.berryList[slot.berry], -1);
                    App.game.blending.gainFlavorByBerry(slot.berry);
                    return;
                });
                this.timer = 0;
                return;
            }

            // Remove berry if there is only one left
            this.blendSlots.filter(slot => !slot.isEmpty()).forEach(slot => {
                if (!(App.game.blending.hasEnoughBerries(slot.berry, true))) {
                    if (!App.game.blending.otherMachineHasBerry(slot.berry)) {
                        Notifier.notify({
                            message: `You are done blending ${BerryType[slot.berry]} berries!</br>
                                <i>All ${BerryType[slot.berry]} berries have been removed from your Berry Blenders</br>
                                Remaining ${BerryType[slot.berry]} berries: ${App.game.farming.berryList[slot.berry]().toLocaleString('en-US')}</i>`,
                            type: NotificationOption.danger,
                            title: 'Berry Blender',
                            image: `assets/images/items/berry/${BerryType[slot.berry]}.png`,
                            timeout: 12 * SECOND,
                        });
                    }
                    if (App.game.blending.otherMachineHasBerry(slot.berry)) {
                        Notifier.notify({
                            message: `You are almost done blending ${BerryType[slot.berry]} berries!</br><i>${camelCaseToString(GameHelper.anOrA(BerryType[slot.berry]))} ${BerryType[slot.berry]} Berry was removed from a Blending Slot</i>`,
                            type: NotificationOption.warning,
                            title: 'Berry Blender',
                            image: `assets/images/items/berry/${BerryType[slot.berry]}.png`,
                            timeout: 7 * SECOND,
                        });
                    }
                    slot.berry = BerryType.None;
                }
                return;
            });

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
                const slot: BlendingSlot = new BlendingSlot(false, BerryType.None, index);
                slot.fromJSON(value);
                this.blendSlots[index] = slot;
            });
        }
        this.timer = json.timer ?? this.defaults.timer;
    }

    // Knockout getters
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
