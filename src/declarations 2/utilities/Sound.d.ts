declare class Sound {
    sound: HTMLAudioElement;
    name: string;
    initialized: boolean;
    constructor(fileName: string, soundName: string);
    updateVolume(value: number): void;
    play(): void;
    stop(): void;
    remove(): void;
    canPlay(): boolean;
    toJSON(): {
        name: string;
    };
}
