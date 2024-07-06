import { Observable } from 'knockout';
import GameHelper from '../../GameHelper';
import UndergroundToolType from './UndergroundToolType';
import { Underground } from '../Underground';

export default class UndergroundTool {
    private _nextAllowedUse = ko.observable(Date.now());
    private _freeUses: Observable<number> = ko.observable(0);

    public cooldownForDisplay = ko.observable(0);

    private _counter = ko.observable(0);

    constructor(
        public id: UndergroundToolType,
        public baseCooldown: number,
        public cooldownReductionPerLevel: number,
        public maximumStoredUsages: number,
        public experiencePerUse: number,
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public tick(deltaTime: number) {
        this.handleFreeUsesTick(deltaTime);
        this.cooldownForDisplay(this.cooldown);
    }

    private handleFreeUsesTick(deltaTime: number) {
        if (this.cooldown > 0) return;
        if (this.freeUses >= this.maximumStoredUsages) return;

        GameHelper.incrementObservable(this._counter, deltaTime);

        if (this._counter() >= this.baseCooldown) {
            GameHelper.incrementObservable(this._freeUses);
            GameHelper.incrementObservable(this._counter, -this.baseCooldown);
        }
    }

    canUseTool(): boolean {
        return this.cooldown <= 0;
    }

    public use(): void {
        if (!this.canUseTool()) return;

        if (this.freeUses > 0) {
            GameHelper.incrementObservable(this._freeUses, -1);
        } else if (this.freeUses === 0) {
            this.cooldown = this.baseCooldown - this.cooldownReductionPerLevel * Underground.undergroundLevel();
        }

        Underground.addUndergroundExp(this.experiencePerUse);
    }

    get freeUses(): number {
        return Math.floor(this._freeUses());
    }

    get cooldown(): number {
        return Math.max(this._nextAllowedUse() - Date.now(), 0) / 1000;
    }

    set cooldown(seconds: number) {
        this._nextAllowedUse(Math.max( this._nextAllowedUse(), Date.now() + seconds * 1000));
    }

    get counter(): number {
        return this._counter();
    }

    public fromJSON(save) {
        this.cooldown = save.cooldown || 0;
        this._freeUses(save?.freeUses || 0);
        this._counter(save?.counter || 0);
    }

    public toJSON() {
        return {
            cooldown: this.cooldown,
            freeUses: this._freeUses(),
            counter: this._counter(),
        };
    }
}
