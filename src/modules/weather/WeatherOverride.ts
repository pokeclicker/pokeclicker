import { Feature } from '../DataStore/common/Feature';

export class WeatherOverride implements Feature {
    name = 'Weather Override';
    saveKey = 'weatheroverride';

    defaults: Record<string, any> = {

    };

    canAccess(): boolean {
        return true;
    }

    initialize() {

    }

    update(delta: number) {
        if (delta > 0) {

        }
    }

    toJSON(): Record<string, any> {
        return {

        };
    }

    fromJSON(json: Record<string, any>) {
        if (json !== null) {

        }
    }
}
