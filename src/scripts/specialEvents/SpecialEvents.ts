/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;

    static events: { [event: number]: SpecialEvent } = {};

    initialize(): void {
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
    }

    toJSON() {
        return {
            // no data to save yet
        };
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank
}


SpecialEvents.events[GameConstants.SpecialEvents.LunarNewYear] = new SpecialEvent('Lunar New Year',
    'Encounter Fancy Pattern Vivillon for a limited time roaming Kalos.',
    new Date(new Date().getFullYear(), 0, 24, 1),
    new Date(new Date().getFullYear(), 1, 7, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.Easter] = new SpecialEvent('Easter',
    'Encounter Surprise Togepi for a limited time with a dedicated Quest Line.',
    new Date(new Date().getFullYear(), 3, 8, 1),
    new Date(new Date().getFullYear(), 3, 29, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.FlyingPikachu] = new SpecialEvent('Flying Pikachu',
    'Encounter Flying Pikachu and Red Spearow for a limited time roaming Kanto.',
    new Date(new Date().getFullYear(), 6, 6, 1),
    new Date(new Date().getFullYear(), 6, 12, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.MewtwoStrikesBack] = new SpecialEvent('Mewtwo strikes back!',
    'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokémon roaming in Kanto.',
    new Date(new Date().getFullYear(), 6, 18, 1),
    new Date(new Date().getFullYear(), 6, 24, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.Halloween] = new SpecialEvent('Halloween!',
    'Encounter Spooky Pokémon for a limited time around Kanto, Johto and Hoenn.',
    new Date(new Date().getFullYear(), 9, 30, 1),
    new Date(new Date().getFullYear(), 10, 5, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.LetsGo] = new SpecialEvent('Let\'s GO!',
    'Encounter special Eevee and Pikachu roaming in the Kanto region.',
    new Date(new Date().getFullYear(), 10, 16, 1),
    new Date(new Date().getFullYear(), 10, 23, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.Christmas] = new SpecialEvent('Merry Christmas!',
    'Encounter Santa Snorlax roaming the regions and discover the Grinch of Ilex Forest.',
    new Date(new Date().getFullYear(), 11, 24, 1),
    new Date(new Date().getFullYear(), 11, 30, 23)
);
SpecialEvents.events[GameConstants.SpecialEvents.GoldenWeek] = new SpecialEvent('Golden Week',
    'Enjoy your time off in the "Golden Week"! Travel tip: Visit the Flower Paradise in Sinnoh on your well earned vacation and enjoy the bloom of roses.',
    new Date(new Date().getFullYear(), 3, 29, 1),
    new Date(new Date().getFullYear(), 4, 6, 23)
);
