import {
    Computed as KnockoutComputed,
} from 'knockout';
import { GameState } from '../GameConstants';
import Requirement from '../requirements/Requirement';

export default class SettingOption<T> {
    
    // We can't set this up in the constructor because App.translation doesn't exist yet
    private cachedTranslatedName: KnockoutComputed<string>;
    private _text: string;
    private name: string;
    private _defaultDisplayName: string;
    public value: T;
    public requirement: Requirement;

    constructor(_text: string, value: T, requirement? : Requirement);
    constructor(name: string, _defaultDisplayName: string, value: T, requirement?: Requirement);
    constructor(..._arr: any[]) {
        if (_arr.length === 2) {
            this._text = _arr[0];
            this.value = _arr[1];
            this.nb(2);
        } else if (_arr.length === 3) {
            if (typeof _arr[3] === 'boolean') {
                this._text = _arr[0];
                this.value = _arr[1];
                this.requirement = _arr[2];                
            } else {
                this.name = _arr[0];
                this._defaultDisplayName = _arr[1];
                this.value = _arr[2];
            }
            this.nb(3);
        } else if (_arr.length === 4) {
            this.name = _arr[0];
            this._defaultDisplayName = _arr[1];
            this.value = _arr[2];
            this.requirement = _arr[3];
            this.nb(4);
        }
    }

    nb(count: number) {
        console.warn(count);
    }
    
    isUnlocked() : boolean {
        if (!this.requirement) {
            return true;
        }
        if (App.game.gameState === GameState.loading) {
            // Requirements will error, assume the value is fine
            return true;
        }
        return this.requirement.isCompleted();
    }

    get text(): string {
        if (this.name) {
            if (!this.cachedTranslatedName) {
                this.cachedTranslatedName = App.translation.get(
                    this.name,
                    'settings',
                    { defaultValue: this._defaultDisplayName },
                );
            }
            return this.cachedTranslatedName();
        }
        return this._text;
    }
}
