/// <reference path="knockout.d.ts"/>
declare class Challenge {
    type: string;
    description: string;
    active: KnockoutObservable<boolean>;
    constructor(type: string, description: string, active?: boolean);
    activate(): void;
    toJSON(): boolean;
}
