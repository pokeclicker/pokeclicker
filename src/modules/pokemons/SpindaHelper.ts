import GameHelper from '../GameHelper';
import SpindaSpots from '../enums/SpindaSpots';
import Settings from '../settings';

export const isProfile = ko.observable(false);

export function getSettingsObject() {
    let settingsObject = {};
    
    GameHelper.enumStrings(SpindaSpots).forEach((spotPosition) => {
        settingsObject[spotPosition] = { 
            x: Settings.getSetting(`spinda.${spotPosition}X`).observableValue,
            y: Settings.getSetting(`spinda.${spotPosition}Y`).observableValue,
        }
    });
    
    return settingsObject;
}

export const profileDefaultValues = {
    topLeftSpot: { x: ko.observable(8), y: ko.observable(8) },
    topRightSpot: { x: ko.observable(8), y: ko.observable(8) },
    bottomLeftSpot: { x: ko.observable(8), y: ko.observable(8) },
    bottomRightSpot: { x: ko.observable(8), y: ko.observable(8) },
}

/**
     * Generate Spinda spots in the sprite
     * Spots info taken from:
     * https://gatorshark.webs.com/SpindaDocumentation.htm
     * https://github.com/magical/spinda/blob/master/spinda.py
     * @param spindaSpot String enum
     * @returns object
     */
export function generateSpindaSpots(spindaSpot: SpindaSpots | string, x = Math.random() * 16, y = Math.random() * 16, size = 96) {
    const originTop = 23;
    const originLeft = 15;
    const SpotsMinPosition = {
        topLeftSpot: { x: 0, y: 0 },
        topRightSpot: { x: 24, y: 2 },
        bottomLeftSpot: { x: 3, y: 18 },
        bottomRightSpot: { x: 15, y: 18 },
    };
    const percentage = 96 / size;
    //const spotMaxX = SpotsMinPosition[spindaSpot].x + 16;
    //const spotMaxY = SpotsMinPosition[spindaSpot].y + 16;
    
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
