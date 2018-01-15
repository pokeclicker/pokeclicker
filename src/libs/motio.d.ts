declare class Motio {
    element: HTMLelement;
    options: Object;
    width: number;
    height: number;
    isPaused: boolean;
    pos: Object;
    frame: number;
    frames: number;


    constructor(element: HTMLelement, options: Object)

    play(reverse?: boolean): Motio;
    pause(): Motio;
    toggle(): Motio;
    toStart(immediate?: boolean, callback?: Function): Motio;
    toEnd(immediate?: boolean, callback?: Function): Motio;
    to(frame: number, immediate?: boolean, callback?: Function): Motio;
    set(name: string, value: any): Motio;
    on(eventName: string, callback: Function): Motio;
    off(eventName: string, callback: Function): Motio;
}