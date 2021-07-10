declare class DynamicBackground {
    static autoUpdateScene: any;
    static setSunMoonPosition: (date?: Date) => void;
    static updateBackgrounds: (d?: Date) => void;
    static getPicture: (hour: number) => number;
    static flyingPokemon: number[];
    static MIN_SPEED_STAT: number;
    static MAX_SPEED_STAT: number;
    static MAX_SPEED: number;
    static addPokemon: (id: any) => void;
    static addPokemonTimeout: any;
    static startAddingPokemon: () => void;
    static stopAddingPokemon: () => void;
    static updateScene: (date?: Date) => void;
    static startScene: () => void;
    static stopScene: () => void;
}
