import {
    Computed as KnockoutComputed,
} from 'knockout';
import { GameState } from '../GameConstants';
import Requirement from '../requirements/Requirement';

interface SettingOptionArgs {
    requirement?: Requirement,
    translateKey?: string
}

export default class SettingOption<T> {

    // We can't set this up in the constructor because App.translation doesn't exist yet
    private cachedTranslatedName: KnockoutComputed<string>;
    public requirement: Requirement;
    private translateKey: string;

    constructor(private _text: string, public value: T, { requirement, translateKey }: SettingOptionArgs = {}) {
        this.requirement = requirement;
        this.translateKey = translateKey;
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
        if (this.translateKey) {
            if (!this.cachedTranslatedName) {
                this.cachedTranslatedName = App.translation.get(
                    this.translateKey,
                    'settings',
                    { defaultValue: this._text },
                );
            }
            return this.cachedTranslatedName();
        }
        return this._text;
    }
}
