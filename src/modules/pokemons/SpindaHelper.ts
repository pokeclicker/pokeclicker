import GameHelper from '../GameHelper';
import SpindaSpots from '../enums/SpindaSpots';
import Settings from '../settings';

/**
 * Gets the values stored in the settings
 * @returns Object
 */
export function getSettingsObject() {
    let settingsObject = {};
    
    GameHelper.enumNumbers(SpindaSpots).forEach((position) => {
        settingsObject[position] = { 
            x: Settings.getSetting(`spinda.${SpindaSpots[position]}X`).observableValue,
            y: Settings.getSetting(`spinda.${SpindaSpots[position]}Y`).observableValue,
        }
    });
    
    return settingsObject;
}

export function axisObservableToNumber(spindaSpots): Partial<Record<SpindaSpots, Record<"x" | "y", KnockoutObservable<number>>>> {
    const spotObject = {}
    GameHelper.enumNumbers(SpindaSpots).forEach((position) => {
        if (!spotObject[position]) {
            spotObject[position] = { x: 8, y: 8 };
        }
        spotObject[position].x = spindaSpots[position].x();
        spotObject[position].y = spindaSpots[position].y();
    });
    return spotObject;
}

export function defaultValues(isObservable = false) {
    const spindaSpots = {};
    GameHelper.enumNumbers(SpindaSpots).forEach((position) => {
        spindaSpots[position] = { 
            x: isObservable ? ko.observable(8) : 8,
            y: isObservable ? ko.observable(8) : 8,
        };
    });
    return spindaSpots;
}

/**
 * Generate Spinda spots in the sprite based on a given X and Y
 * If no X or Y given, a random number between 0 to 16 will be used
 * Spots info taken from:
 * https://gatorshark.webs.com/SpindaDocumentation.htm
 * https://github.com/magical/spinda/blob/master/spinda.py
 * @param spindaSpot
 * @returns object
 */
export function generateSpindaSpots(spindaSpot: SpindaSpots, x = Math.random() * 16, y = Math.random() * 16, size = 96) {
    const originTop = 23;
    const originLeft = 15;
    const SpotsMinPosition = {
        [SpindaSpots.topLeftSpot]: { x: 0, y: 0 },
        [SpindaSpots.topRightSpot]: { x: 24, y: 2 },
        [SpindaSpots.bottomLeftSpot]: { x: 3, y: 18 },
        [SpindaSpots.bottomRightSpot]: { x: 15, y: 18 },
    };
    const percentage = 96 / size;
    const spotsPosition = {
        spotX: (originTop + Math.floor(+x + SpotsMinPosition[spindaSpot].x)) / percentage,
        spotY: (originLeft + Math.floor(+y + SpotsMinPosition[spindaSpot].y)) / percentage,
    };
    return spotsPosition;
}

/**
 * Determinates which Spinda mask should the game use (shiny or normal)
 * @param shiny
 * @returns string (image URL)
 */
export function getSpindaMask(shiny: boolean = undefined): string {
    if (shiny === undefined) {
        const spinda = App.game.party.getPokemon(327);
        shiny = spinda.shiny && !spinda.hideShinyImage() && !Settings.getSetting('partyHideShinySprites').observableValue();
    }
    let src = 'assets/images/';
    if (shiny) {
        src += 'shiny';
    }
    src += 'pokemon/327-mask.png';
    return src;
}
