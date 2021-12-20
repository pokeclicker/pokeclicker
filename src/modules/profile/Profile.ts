import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import * as GameConstants from '../GameConstants';
import Rand from '../utilities/Rand';

export default class Profile implements Saveable {
    public static MAX_TRAINER = 119;
    public static MAX_BACKGROUND = 40;

    saveKey = 'profile';

    defaults: Record<string, any> = {};

    public name: KnockoutObservable<string>;
    public trainer: KnockoutObservable<number>;
    public pokemon: KnockoutObservable<number>;
    public pokemonShiny: KnockoutObservable<boolean>;
    public background: KnockoutObservable<number>;
    public textColor: KnockoutObservable<string>;

    constructor(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = 0,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = '#f5f5f5',
    ) {
        this.name = ko.observable(name);
        this.trainer = ko.observable(trainer).extend({ numeric: 0 });
        this.pokemon = ko.observable(pokemon).extend({ numeric: 2 });
        this.pokemonShiny = ko.observable(false).extend({ boolean: null });
        this.background = ko.observable(background).extend({ numeric: 0 });
        this.textColor = ko.observable(textColor);
    }

    static getTrainerCard(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = Rand.intBetween(1, 151),
        pokemonShiny = false,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = 'whitesmoke',
        badges = 0,
        pokedex = 0,
        seconds = 0,
        version = '0.0.0',
        challenges = {},
        key?: string,
    ): string {
        const challengeRibbonsPath = 'assets/images/challenges/';
        return `
        <div class="mb-3 ${key === undefined ? 'p-2 col-12' : 'col-lg-4 col-md-6 col-sm-12 xol-xs-12'}">
            <div class="trainer-card clickable trainer-bg-${background} card font-weight-bold"
                ${key === undefined ? '' : `data-key="${key}"`}
                style="color: ${textColor}"
                onclick="${key === undefined ? "Notifier.notify({ message: 'What a lovely profile!' });" : `Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();`}">
                <div class="card-body">
                    <h5 class="align-middle font-weight-bold"><img src="assets/images/profile/trainer-${trainer}.png"/> ${GameConstants.cleanHTMLString(name)}</h5>
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
                        </tbody>
                    </table>
                    <img class="pokemon-0" src="assets/images/${pokemonShiny ? 'shiny' : ''}pokemon/${pokemon}.png"/>
                    <small class="version">v${version}</small>
                    <div class="challenge-badges">${Object.entries(challenges).filter(([, v]) => v).map(([c]) => `<img class="m-1" width="24px" src="${challengeRibbonsPath}${c}.png" onerror="this.remove()" data-toggle="tooltip" data-placement="top" title="${GameConstants.camelCaseToString(c)}"/>`).join('')}</div>
                </div>
            </div>
        </div>
        `;
    }

    initialize() {
        // Load trainer card preview
        this.name.subscribe(() => this.updatePreview());
        this.trainer.subscribe(() => this.updatePreview());
        this.pokemon.subscribe((value: number) => {
            const shiny = App.game.party.alreadyCaughtPokemon(value, true);
            this.pokemonShiny(shiny);
            // Update preview after checking for shiny
            this.updatePreview();
        });
        this.background.subscribe(() => this.updatePreview());
        this.textColor.subscribe(() => this.updatePreview());
        this.updatePreview();
    }

    updatePreview(): void {
        document.getElementById('profile-trainer-card').innerHTML = Profile.getTrainerCard(
            this.name(),
            this.trainer(),
            this.pokemon(),
            this.pokemonShiny(),
            this.background(),
            this.textColor(),
            App.game.badgeCase.badgeList.filter((b: () => boolean) => b()).length,
            App.game.party.caughtPokemon.length,
            App.game.statistics.secondsPlayed(),
            App.game.update.version,
            App.game.challenges.toJSON().list,
        );
    }

    fromJSON(json): void {
        if (!json || !json.name) {
            return;
        }

        if (json.name) this.name(decodeURI(json.name));
        if (json.trainer !== undefined) this.trainer(json.trainer);
        if (json.pokemon !== undefined) this.pokemon(json.pokemon);
        if (json.pokemonShiny !== undefined) this.pokemonShiny(json.pokemonShiny);
        if (json.background !== undefined) this.background(json.background);
        if (json.textColor) this.textColor(json.textColor);
    }

    toJSON(): Record<string, any> {
        return {
            name: encodeURI(this.name()),
            trainer: this.trainer(),
            pokemon: this.pokemon(),
            pokemonShiny: this.pokemonShiny(),
            background: this.background(),
            textColor: this.textColor(),
        };
    }
}
