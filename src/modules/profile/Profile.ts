import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../dataStore/common/Saveable';

export default class Profile implements Saveable {
    public static MAX_TRAINER = 20;
    public static MAX_BACKGROUND = 40;

    saveKey = 'profile';

    defaults: Record<string, any> = {};

    public name: KnockoutObservable<string>;
    public trainer: KnockoutObservable<number>;
    public pokemon: KnockoutObservable<number>;
    public background: KnockoutObservable<number>;
    public textColor: KnockoutObservable<string>;

    constructor(
        name = 'Trainer',
        trainer = Math.floor(Math.random() * Profile.MAX_TRAINER),
        pokemon = 1,
        background = Math.floor(Math.random() * Profile.MAX_BACKGROUND),
        textColor = 'whitesmoke',
    ) {
        this.name = ko.observable(name);
        this.trainer = ko.observable(trainer);
        this.pokemon = ko.observable(pokemon);
        this.background = ko.observable(background);
        this.textColor = ko.observable(textColor);
    }

    fromJSON(json): void {
        if (!json || !json.name) {
            return;
        }

        if (json.name) this.name(json.name);
        if (json.trainer !== undefined) this.trainer(json.trainer);
        if (json.pokemon !== undefined) this.pokemon(json.pokemon);
        if (json.background !== undefined) this.background(json.background);
        if (json.textColor) this.textColor(json.textColor);
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name(),
            trainer: this.trainer(),
            pokemon: this.pokemon(),
            background: this.background(),
            textColor: this.textColor(),
        };
    }
}
