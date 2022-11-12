/* eslint-disable @typescript-eslint/member-ordering */
import {
    SHINY_CHANCE_BREEDING,
    MINUTE,
    SECOND,
    MaxIDPerRegion,
    Region,
} from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import Rand from '../utilities/Rand';

export default class DynamicBackground {
    public static autoUpdateScene;

    /* SUN & MOON */
    static setSunMoonPosition = (date = new Date()) => {
        const h = window.innerHeight;
        const w = window.innerWidth / 1.2;

        // Get the hours and minutes.
        const hours = date.getHours();
        const mins = date.getMinutes();

        // Calculate the position of the sun and moon based on the time.
        const sunRad = (((hours) * 60 + mins) / (24 * 60)) * Math.PI * 2;
        const moonRad = (((hours + 12) * 60 + mins) / (24 * 60)) * Math.PI * 2;

        // Calculate the axis
        const sunX = (w / 1.8) - (w * Math.sin(sunRad)) / 2;
        const sunY = (h / 2) + (h * Math.cos(sunRad)) / 2;
        const moonX = (w / 1.8) - (w * Math.sin(moonRad)) / 2;
        const moonY = (h / 1.4) + (h * Math.cos(moonRad)) / 2;

        // Apply the positions based on our previous calculations
        const sun = document.getElementById('sun');
        sun.style.top = `${sunY}px`;
        sun.style.left = `${sunX}px`;
        const moon = document.getElementById('moon');
        moon.style.top = `${moonY}px`;
        moon.style.left = `${moonX}px`;
    };

    /* SKY & GROUND */
    static updateBackgrounds = (d = new Date()) => {
        const hour = d.getHours();
        const minutes = d.getMinutes();
        const bgNumber = DynamicBackground.getPicture(hour);

        // Determine starting background images:
        const bgNumberNext = (bgNumber + 1) % 12;

        // Get opacity (i.e. how far (in percentage) are we in a certain time-block):
        // Every block is 2 hours, so 1 hour into a block would be 50% (0.50)
        // If we are in an even hour add 50%
        let opacity = hour % 2 ? 0 : 0.5;
        // Every minute would be 1/120th of a block (minutes / 120)
        opacity += minutes / 120;

        // Set sky image
        document.getElementById('sky1').classList.value = `sky sky-${bgNumber}`;
        document.getElementById('sky2').style.opacity = opacity.toString();
        document.getElementById('sky2').classList.value = `sky sky-${bgNumberNext}`;

        // Set ground image
        document.getElementById('ground1').classList.value = `ground ground-${bgNumber}`;
        document.getElementById('ground2').style.opacity = opacity.toString();
        document.getElementById('ground2').classList.value = `ground ground-${bgNumberNext}`;
    };

    // Determines the images to use based on the current hour
    static getPicture = (hour: number) => (hour ? Math.floor((hour - 1) / 2) : 11);

    /* POKEMON */

    // All the flying pokemon IDs (these pokemon can spawn in the sky)
    static flyingPokemon = [
        12, 15, 17, 18, 22, 41, 42, 49, 92, 93, 109, 110, 142, 144, 145, 146, 149, 151,
        164, 165, 166, 169, 176, 187, 188, 189, 193, 200, 206, 227, 249, 250, 251,
        267, 269, 277, 278, 279, 284, 291, 329, 330, 333, 334, 358, 380, 381, 384, 385,
        397, 398, 414, 415, 416, 425, 426, 429, 433, 462, 469, 479, 480, 481, 482, 488, 491,
        520, 521, 527, 528, 567, 581, 628, 630, 641, 642, 643, 644, 645, 646,
        662, 663, 666, 691, 707, 714, 715, 717,
        738, 742, 743, 746, 801,
        822, 823, 826, 841, 845, 854, 855, 873, 885, 886, 887, 890,
    ];

    public static MIN_SPEED_STAT = 20;
    public static MAX_SPEED_STAT = 180;
    public static MAX_SPEED = 10;

    // Add a pokemon to the scene
    static addPokemon = (id) => {
        const pokemonSpeed = pokemonMap[id].base.speed;
        let moveSpeed = Math.floor(((pokemonSpeed - DynamicBackground.MIN_SPEED_STAT) / (DynamicBackground.MAX_SPEED_STAT - DynamicBackground.MIN_SPEED_STAT)) * DynamicBackground.MAX_SPEED);
        // Adjust speed by -1 → +1 randomly
        moveSpeed += Rand.intBetween(-1, 1);
        moveSpeed = Math.max(0, Math.min(DynamicBackground.MAX_SPEED, moveSpeed));
        const flying = DynamicBackground.flyingPokemon.includes(id);
        const shiny = Rand.chance(SHINY_CHANCE_BREEDING);

        const pokeElement = document.createElement('div');
        pokeElement.style.bottom = flying ? `${Rand.intBetween(20, 90)}vh` : `${Rand.intBetween(5, 15)}vh`;
        pokeElement.style.backgroundImage = `${shiny ? 'url(\'assets/images/dynamic-background/pokemon/sparkle.png\'), ' : ''}url('assets/images/dynamic-background/pokemon/${id.toString().padStart(3, 0)}${shiny ? 's' : ''}.png')`;
        pokeElement.classList.add('pokemonSprite');
        pokeElement.classList.add(`speed-${moveSpeed}`);
        document.getElementById('dynamic-background').appendChild(pokeElement);
        setTimeout(() => {
            document.getElementById('dynamic-background').removeChild(pokeElement);
        }, 2 * MINUTE);
    };

    /* SCENE MANAGEMENT */
    static addPokemonTimeout;

    static startAddingPokemon = () => {
        // Random delay up to 10 seconds
        const delay = Rand.intBetween(0, 10 * SECOND);

        // Assign our timeout function so we can stop it later
        DynamicBackground.addPokemonTimeout = setTimeout(() => {
            // limited to players highest region
            DynamicBackground.addPokemon(Rand.intBetween(1, MaxIDPerRegion[player?.highestRegion() || Region.kanto]));
            // Add another pokemon
            DynamicBackground.startAddingPokemon();
        }, delay);
    };

    static stopAddingPokemon = () => {
        clearTimeout(DynamicBackground.addPokemonTimeout);
    };

    static updateScene = (date = new Date()) => {
        try {
            DynamicBackground.setSunMoonPosition(date);
            DynamicBackground.updateBackgrounds(date);
        } catch (e) { console.error(e); }
    };

    static startScene = () => {
        // Start adding the Pokemon images (manages it's own timer)
        DynamicBackground.startAddingPokemon();
        // Update the background now then every minute
        DynamicBackground.updateScene();
        DynamicBackground.autoUpdateScene = setInterval(DynamicBackground.updateScene, MINUTE);
    };

    static stopScene = () => {
        // Stop adding the pokemon images
        DynamicBackground.stopAddingPokemon();
        // Stop updating background images
        clearInterval(DynamicBackground.autoUpdateScene);
    };
}
