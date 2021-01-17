/// <reference path="../Mutation.ts" />

/**
 * A Blank Mutation to be used to store hint data.
 * This is mostly because the Mutation framework controls the hints, but some mutations are outside of the Mutation framework
 */
class BlankMutation extends Mutation {
    getMutationPlots(): number[] {
        return [];
    }
    handleMutation(index: number): void {
        return;
    }
}
