import GameHelper from '../GameHelper';
import SpindaSpots from '../enums/SpindaSpots';
import Settings from '../settings';

export function getSettingsObject() {
    const settingsObject = {};
    GameHelper.enumStrings(SpindaSpots).forEach((spotPosition) => {
        settingsObject[spotPosition] = { 
            x: +Settings.getSetting(`spinda.${spotPosition}X`).observableValue(),
            y: +Settings.getSetting(`spinda.${spotPosition}Y`).observableValue(),
        }
    });
    return settingsObject;
}