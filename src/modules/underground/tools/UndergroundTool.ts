import { Observable } from 'knockout';
import GameHelper from '../../GameHelper';
import UndergroundToolType from './UndergroundToolType';
import {Coordinate} from '../mine/Mine';

export default class UndergroundTool {
    private _nextAllowedUse = ko.observable(Date.now());
    private _storedUses: Observable<number> = ko.observable(0);

    public cooldownForDisplay = ko.observable(0);

    private _counter = ko.observable(0);

    constructor(
        public id: UndergroundToolType,
        public baseCooldown: number,
        public cooldownReductionPerLevel: number,
        public maximumStoredUsages: number,
        public experiencePerUse: number,
        public action: (x: number, y: number) => Array<Coordinate>,
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public tick(deltaTime: number) {
        this.handleStoredUsesTick(deltaTime);
        this.cooldownForDisplay(this.cooldown);
    }

    private handleStoredUsesTick(deltaTime: number) {
        if (this.cooldown > 0) return;
        if (this.storedUses >= this.maximumStoredUsages) return;

        GameHelper.incrementObservable(this._counter, deltaTime);

        if (this._counter() >= this.baseCooldown) {
            GameHelper.incrementObservable(this._storedUses);
            GameHelper.incrementObservable(this._counter, -this.baseCooldown);
        }
    }

    canUseTool(): boolean {
        return this.cooldown <= 0;
    }

    get storedUses(): number {
        return Math.floor(this._storedUses());
    }

    public useStoredUse(): void {
        GameHelper.incrementObservable(this._storedUses, -1);
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
        this._storedUses(save?.storedUses || 0);
        this._counter(save?.counter || 0);
    }

    public toJSON() {
        return {
            cooldown: this.cooldown,
            storedUses: this._storedUses(),
            counter: this._counter(),
        };
    }
}
