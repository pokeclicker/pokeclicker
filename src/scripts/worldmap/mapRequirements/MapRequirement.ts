interface MapRequirement {

    canAccess(): boolean;

    lockedReason(): string;
}