/// <reference path="./Saveable.d.ts"/>
declare interface Feature extends Saveable {
    name: string;
    initialize(): void;
    canAccess(): boolean;
    update(delta: number): void;
}
