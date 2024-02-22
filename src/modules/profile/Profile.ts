import '../koExtenders';
import type {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import * as GameConstants from '../GameConstants';
import * as SpindaHelper from '../pokemons/SpindaHelper';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';
import SpindaSpots from '../enums/SpindaSpots';
import GameHelper from '../GameHelper';
import Settings from '../settings';
import TmpPokemonHelper from '../pokemons/TmpPokemonHelper';

export default class Profile implements Saveable {
    public static MAX_TRAINER = 157;
    public static MAX_BACKGROUND = 40;

    saveKey = 'profile';

    defaults: Record<string, any> = {};

    public name: KnockoutObservable<string>;
    public trainer: KnockoutObservable<number>;
    public pokemon: KnockoutObservable<number>;
    public pokemonShiny: KnockoutObservable<boolean>;
    public pokemonFemale: KnockoutObservable<boolean>;
    public background: KnockoutObservable<number>;
    public textColor: KnockoutObservable<string>;
    /*
    public spindaSpots: {
        topLeftSpot: { x: KnockoutObservable<number>, y: KnockoutObservable<number> },
        topRightSpot: { x: KnockoutObservable<number>, y: KnockoutObservable<number> },
        bottomLeftSpot: { x: KnockoutObservable<number>, y: KnockoutObservable<number> },
        bottomRightSpot: { x: KnockoutObservable<number>, y: KnockoutObservable<number> },
    };
    */
    public spindaSpots: Record<SpindaSpots, Record<string, KnockoutObservable<number>>>;

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
        this.pokemonFemale = ko.observable(false).extend({ boolean: null });
        this.background = ko.observable(background).extend({ numeric: 0 });
        this.textColor = ko.observable(textColor);
        this.spindaSpots = {
            [SpindaSpots.topLeftSpot]: { x: ko.observable(8), y: ko.observable(8) },
            [SpindaSpots.topRightSpot]: { x: ko.observable(8), y: ko.observable(8) },
            [SpindaSpots.bottomLeftSpot]: { x: ko.observable(8), y: ko.observable(8) },
            [SpindaSpots.bottomRightSpot]: { x: ko.observable(8), y: ko.observable(8) },
        };
    }

    static getTrainerCard(
        name = 'Trainer',
        trainer = Rand.floor(Profile.MAX_TRAINER),
        pokemon = Rand.intBetween(1, 151),
        pokemonShiny = false,
        pokemonFemale = false,
        background = Rand.floor(Profile.MAX_BACKGROUND),
        textColor = 'whitesmoke',
        badges = 0,
        pokedex = 0,
        seconds = 0,
        version = '0.0.0',
        challenges = {},
        id = '',
        spindaSpots = {
            topLeftSpot: { x: 8, y: 8 },
            topRightSpot: { x: 8, y: 8 },
            bottomLeftSpot: { x: 8, y: 8 },
            bottomRightSpot: { x: 8, y: 8 },
        },
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
        card.addEventListener('click', () => {
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
        trainerPokemonImage.src = `assets/images/${pokemonShiny ? 'shiny' : ''}pokemon/${pokemon}${pokemonFemale ? '-f' : ''}.png`;

        // Spinda
        if (pokemon === 327) {
            GameHelper.enumStrings(SpindaSpots).forEach((spotPosition) => {
                const spotContainer: HTMLElement = node.querySelector(`.${spotPosition}`);
                const settingsPositions = spindaSpots;
                const positions = SpindaHelper.generateSpindaSpots(spotPosition, settingsPositions[spotPosition].x, settingsPositions[spotPosition].y);
                spotContainer.style.backgroundImage = `url(${SpindaHelper.getSpindaMask(pokemonShiny)})`;
                spotContainer.style.maskPosition = `${positions.spotX}px ${positions.spotY}px`;
            });
        } else {
            const spotsElements: HTMLElement = node.querySelector('.spots');
            spotsElements.style.display = 'none';
        }

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
            this.pokemonFemale(),
            this.background(),
            this.textColor(),
            App.game.badgeCase.badgeList.filter((b: () => boolean) => b()).length,
            App.game.party.caughtPokemon.length,
            throttledTimePlayed(),
            App.game.update.version,
            App.game.challenges.toJSON().list,
            player.trainerId,
            {
                topLeftSpot: { x: this.spindaSpots[SpindaSpots.topLeftSpot].x(), y: this.spindaSpots[SpindaSpots.topLeftSpot].y() },
                topRightSpot: { x: this.spindaSpots[SpindaSpots.topRightSpot].x(), y: this.spindaSpots[SpindaSpots.topRightSpot].y() },
                bottomLeftSpot: { x: this.spindaSpots[SpindaSpots.bottomLeftSpot].x(), y: this.spindaSpots[SpindaSpots.bottomLeftSpot].y() },
                bottomRightSpot: { x: this.spindaSpots[SpindaSpots.bottomRightSpot].x(), y: this.spindaSpots[SpindaSpots.bottomRightSpot].y() },
            }
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
        if (json.pokemonFemale !== undefined) this.pokemonFemale(json.pokemonFemale);
        if (json.background !== undefined) this.background(json.background);
        if (json.textColor) this.textColor(json.textColor);
        if (json.spindaSpots) {
            GameHelper.enumStrings(SpindaSpots).forEach((spotPosition) => {
                this.spindaSpots[SpindaSpots[spotPosition]].x(json.spindaSpots[spotPosition].x);
                this.spindaSpots[SpindaSpots[spotPosition]].y(json.spindaSpots[spotPosition].y);
            });
        }
    }

    toJSON(): Record<string, any> {
        const spindaSpots = {
            topLeftSpot: { x: 8, y: 8 },
            topRightSpot: { x: 8, y: 8 },
            bottomLeftSpot: { x: 8, y: 8 },
            bottomRightSpot: { x: 8, y: 8 },
        };
        GameHelper.enumStrings(SpindaSpots).forEach((spotPosition) => {
            spindaSpots[spotPosition].x = this.spindaSpots[SpindaSpots[spotPosition]].x();
            spindaSpots[spotPosition].y = this.spindaSpots[SpindaSpots[spotPosition]].y();
        });
        

        return {
            name: this.name(),
            trainer: this.trainer(),
            pokemon: this.pokemon(),
            pokemonShiny: this.pokemonShiny(),
            pokemonFemale: this.pokemonFemale(),
            background: this.background(),
            textColor: this.textColor(),
            spindaSpots: spindaSpots, //CHECK OBSEVABLES // TEMPLATES
        };
    }
}
