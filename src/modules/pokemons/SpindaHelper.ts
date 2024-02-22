import GameHelper from '../GameHelper';
import SpindaSpots from '../enums/SpindaSpots';
import Settings from '../settings';

export const isProfile = ko.observable(false);

export function getSettingsObject() {
    let settingsObject = {};
    
    GameHelper.enumNumbers(SpindaSpots).forEach((spotPosition) => {
        settingsObject[spotPosition] = { 
            x: Settings.getSetting(`spinda.${SpindaSpots[spotPosition]}X`).observableValue,
            y: Settings.getSetting(`spinda.${SpindaSpots[spotPosition]}Y`).observableValue,
        }
    });
    
    return settingsObject;
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
        [SpindaSpots.topLeftSpot]: { x: 0, y: 0 },
        [SpindaSpots.topRightSpot]: { x: 24, y: 2 },
        [SpindaSpots.bottomLeftSpot]: { x: 3, y: 18 },
        [SpindaSpots.bottomRightSpot]: { x: 15, y: 18 },
    };
    const percentage = 96 / size;
    //console.log(spindaSpot);
    //const spotMaxX = SpotsMinPosition[spindaSpot].x + 16;
    //const spotMaxY = SpotsMinPosition[spindaSpot].y + 16;
    
    const spotsPosition = {
        spotX: (originTop + Math.floor(+x + SpotsMinPosition[SpindaSpots[spindaSpot]].x)) / percentage,
        spotY: (originLeft + Math.floor(+y + SpotsMinPosition[SpindaSpots[spindaSpot]].y)) / percentage,
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
