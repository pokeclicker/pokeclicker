interface WorldRequirement {

    isCompleted(): boolean;

    lockedReason(): string;
}