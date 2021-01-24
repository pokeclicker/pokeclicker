import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../dataStore/common/Saveable';
import * as GameConstants from '../GameConstants';

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
        this.trainer = ko.observable(trainer).extend({ numeric: 0 });
        this.pokemon = ko.observable(pokemon).extend({ numeric: 2 });
        this.background = ko.observable(background).extend({ numeric: 0 });
        this.textColor = ko.observable(textColor);
    }

    static getTrainerCard(
        name = 'Trainer',
        trainer = Math.floor(Math.random() * Profile.MAX_TRAINER),
        pokemon = Math.floor(Math.random() * 151) + 1,
        background = Math.floor(Math.random() * Profile.MAX_BACKGROUND),
        textColor = 'whitesmoke',
        badges = 0,
        pokedex = 0,
        seconds = 0,
        version = '0.0.0',
        key?: string,
    ): string {
        return `
        <div class="mb-3 ${key === undefined ? 'p-2 col-12' : 'col-4'}">
            <div class="trainer-card clickable trainer-bg-${background} card font-weight-bold"
                style="color: ${textColor}"
                onclick="${key === undefined ? "Notifier.notify({ message: 'What a lovely profile!' });" : `Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();`}">
                <div class="card-body">
                    <h5 class="align-middle font-weight-bold"><img src="assets/images/profile/trainer-${trainer}.png"/> ${decodeURI(name)}</h5>
                    <table class="table table-sm table-borderless col-8" style="color: ${textColor}">
                        <tbody>
                            <tr>
                                <td>Badges:</td>
                                <td class="text-right">${badges}</td>
                            </tr>
                            <tr>
                                <td>Pokédex:</td>
                                <td class="text-right">${pokedex}</td>
                            </tr>
                            <tr>
                                <td>Time:</td>
                                <td class="text-right">${GameConstants.formatTimeFullLetters(seconds)}</td>
                            </tr>
                        <tbody>
                    </table>
                    <img class="pokemon-0" src="assets/images/pokemon/${pokemon}.png"/>
                    <small class="version">v${version}</small>
                </div>
            </div>
        </div>
        `;
    }

    initialize() {
        // Load trainer card preview
        this.name.subscribe(() => this.updatePreview());
        this.trainer.subscribe(() => this.updatePreview());
        this.pokemon.subscribe(() => this.updatePreview());
        this.background.subscribe(() => this.updatePreview());
        this.textColor.subscribe(() => this.updatePreview());
        this.updatePreview();
    }

    updatePreview(): void {
        document.getElementById('profile-trainer-card').innerHTML = Profile.getTrainerCard(
            this.name(),
            this.trainer(),
            this.pokemon(),
            this.background(),
            this.textColor(),
            // @ts-ignore
            // eslint-disable-next-line no-undef
            App.game.badgeCase.badgeList.filter((b: () => boolean) => b()).length,
            // @ts-ignore
            // eslint-disable-next-line no-undef
            App.game.party.caughtPokemon.length,
            // @ts-ignore
            // eslint-disable-next-line no-undef
            App.game.statistics.secondsPlayed,
            // @ts-ignore
            // eslint-disable-next-line no-undef
            App.game.update.version,
        );
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
