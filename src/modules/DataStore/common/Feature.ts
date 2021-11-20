import { Saveable } from './Saveable';

export interface Feature extends Saveable {
    name: string;

    initialize(): void;

    canAccess(): boolean;
    update(delta: number): void;

}
