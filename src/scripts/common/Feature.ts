interface Feature extends Saveable {
    initialize(): void;

    canAccess(): boolean;
    update(delta: number) : void;

}
