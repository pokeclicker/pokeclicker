import '../koExtenders';
import type {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';
import GameHelper from '../GameHelper';

export default class Profile implements Saveable {
    public static MAX_TRAINER = 160;
    public static MAX_BACKGROUND = 40;

    saveKey = 'profile';

    defaults: Record<string, any> = {};

    public name: KnockoutObservable<string>;
    public trainer: KnockoutObservable<number>;
    public pokemon: KnockoutObservable<number>;
    public pokemonShiny: KnockoutObservable<boolean>;
    public pokemonShadow: KnockoutObservable<boolean>;
    public pokemonFemale: KnockoutObservable<boolean>;
    public background: KnockoutObservable<number>;
    public textColor: KnockoutObservable<string>;

    public pokemonSearch = ko.observable('');
    public getCaughtPokemonList = ko.pureComputed(() => {
        let caughtPokemon = [...App.game.party.caughtPokemon];
        if (/^\d+$/.test(this.pokemonSearch())) {
            // Search by ID
            caughtPokemon = caughtPokemon.filter((pokemon) => +this.pokemonSearch() == Math.floor(pokemon.id));
        } else if (this.pokemonSearch() != '') {
            // Search by name
            const regex = GameHelper.safelyBuildRegex(this.pokemonSearch());
            caughtPokemon = caughtPokemon.filter((pokemon) => regex.test(pokemon.name) || regex.test(pokemon.displayName));
        }
        return caughtPokemon;
    });

    constructor(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = 0,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = '#f5f5f5',
    ) {
        this.name = ko.observable(name);
        this.trainer = ko.observable(trainer).extend({ numeric: 0 });
        this.trainer.subscribe((t) => document.documentElement.style.setProperty('--trainer-image', `url('../assets/images/profile/trainer-${t}.png')`));
        this.pokemon = ko.observable(pokemon).extend({ numeric: 2 });
        this.pokemonShiny = ko.observable(false).extend({ boolean: null });
        this.pokemonShadow = ko.observable(false).extend({ boolean: null });
        this.pokemonFemale = ko.observable(false).extend({ boolean: null });
        this.background = ko.observable(background).extend({ numeric: 0 });
        this.textColor = ko.observable(textColor);
    }

    static getTrainerCard(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = Rand.intBetween(1, 151),
        pokemonShiny = false,
        pokemonShadow = false,
        pokemonFemale = false,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = 'whitesmoke',
        badges = 0,
        pokedex = 0,
        seconds = 0,
        version = '0.0.0',
        challenges = {},
        id = '',
        key?: string,
    ): Element {
        const template: HTMLTemplateElement = document.querySelector('#trainerCardTemplate');
        const node: DocumentFragment = template.content.cloneNode(true) as DocumentFragment;

        // Our container
        const container: HTMLElement = node.querySelector('.trainer-card-container');
        container.dataset.key = key;

        // Our trainer card
        const card: HTMLElement = node.querySelector('.trainer-card');
        card.classList.add(`trainer-bg-${background}`);
        card.style.color = textColor;
        card.dataset.key = key;
        card.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).classList.contains('context-menu-button')) {
                return;
            }
            // If no key provided, this is a preview
            if (key === undefined) {
                Notifier.notify({ message: 'What a lovely profile!' });
                return;
            }
            document.querySelector('#saveSelector').remove();
            Save.key = key;
            App.start();
        });
        const trainerImage: HTMLImageElement = node.querySelector('.trainer-image');
        trainerImage.src = `assets/images/profile/trainer-${trainer}.png`;
        const trainerName: HTMLElement = node.querySelector('.trainer-name');
        trainerName.innerText = name;
        const table: HTMLElement = node.querySelector('.table');
        table.style.color = textColor;
        const trainerBadges: HTMLElement = node.querySelector('.trainer-badges');
        trainerBadges.innerText = `${badges}`;
        const trainerPokedex: HTMLElement = node.querySelector('.trainer-pokedex');
        trainerPokedex.innerText = `${pokedex}`;
        const trainerTime: HTMLElement = node.querySelector('.trainer-time');
        trainerTime.innerText = GameConstants.formatTimeFullLetters(seconds);
        const trainerPokemonImage: HTMLImageElement = node.querySelector('.trainer-pokemon-image');
        trainerPokemonImage.src = `assets/images/${pokemonShiny ? 'shiny' : ''}${pokemonShadow ? 'shadow' : ''}pokemon/${pokemon}${pokemonFemale ? '-f' : ''}.png`;
        const trainerVersion: HTMLElement = node.querySelector('.trainer-version');
        trainerVersion.innerText = `v${version}`;
        const badgeContainer = node.querySelector('.challenge-badges');
        Object.entries(challenges)
            .filter(([, v]) => v)
            .forEach(([c]) => {
                const img: HTMLImageElement = document.createElement('img');
                img.onerror = () => img.remove();
                img.className = 'm-1';
                img.width = 18;
                img.src = `assets/images/challenges/${c}.png`;
                img.title = GameConstants.camelCaseToString(c);
                img.dataset.toggle = 'tooltip';
                img.dataset.placement = 'top';
                badgeContainer.appendChild(img);
            });
        const trainerId: HTMLElement = node.querySelector('.trainer-id');
        trainerId.innerText = id.length ? `#${id}` : '';
        if (key === undefined) {
            node.querySelector('.context-menu-button').remove();
        }
        return container;
    }

    initialize() {
        const throttledTimePlayed = ko.pureComputed(() => App.game.statistics.secondsPlayed()).extend({ rateLimit: 60 * 1000 });
        // Load trainer card preview
        const preview = ko.pureComputed(() => Profile.getTrainerCard(
            this.name(),
            this.trainer(),
            this.pokemon(),
            this.pokemonShiny(),
            this.pokemonShadow(),
            this.pokemonFemale(),
            this.background(),
            this.textColor(),
            App.game.badgeCase.badgeList.filter((b: () => boolean) => b()).length,
            App.game.party.caughtPokemon.length,
            throttledTimePlayed(),
            App.game.update.version,
            App.game.challenges.toJSON().list,
            player.trainerId,
        ));

        preview.subscribe((previewElement) => {
            document.getElementById('profile-trainer-card').innerHTML = '';
            document.getElementById('profile-trainer-card').appendChild(previewElement);
        });
    }

    fromJSON(json): void {
        if (!json || !json.name) {
            return;
        }

        if (json.name) this.name(json.name);
        if (json.trainer !== undefined) this.trainer(json.trainer);
        if (json.pokemon !== undefined) this.pokemon(json.pokemon);
        if (json.pokemonShiny !== undefined) this.pokemonShiny(json.pokemonShiny);
        if (json.pokemonShadow !== undefined) this.pokemonShadow(json.pokemonShadow);
        if (json.pokemonFemale !== undefined) this.pokemonFemale(json.pokemonFemale);
        if (json.background !== undefined) this.background(json.background);
        if (json.textColor) this.textColor(json.textColor);
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name(),
            trainer: this.trainer(),
            pokemon: this.pokemon(),
            pokemonShiny: this.pokemonShiny(),
            pokemonShadow: this.pokemonShadow(),
            pokemonFemale: this.pokemonFemale(),
            background: this.background(),
            textColor: this.textColor(),
        };
    }
}
