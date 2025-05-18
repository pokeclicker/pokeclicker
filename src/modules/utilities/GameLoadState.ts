enum LoadingStates {
    none = -1,
    initialized = 0,
    appliedBindings = 1,
    running = 2,
}

const currentState: KnockoutObservable<LoadingStates> = ko.observable(LoadingStates.none);

export default class GameLoadState {
    static readonly states = LoadingStates;

    static getLoadState(): LoadingStates {
        return currentState();
    }

    static reachedLoadState(state: LoadingStates) {
        return state <= currentState();
    }

    /**
	 *  Should only be set by App.ts
	 */
    static updateLoadState(newState: LoadingStates) {
        if (newState <= currentState()) {
            throw new Error(`GameLoadState: cannot set to invalid state '${LoadingStates[newState]}' while already at state '${LoadingStates[currentState()]}'!`);
        }
        currentState(newState);
    }

    /**
	 * Runs a callback function once the game has reached a given step of the load process. If the game has
	 * already reached that step, the callback function will run immediately.
	 * 
	 * @param targetState - Load state upon which to run the callback function
	 * @param callback - Function run after the desired state of loading
	 * @param [exactState=false] - If set to true, will only run [callback] while the loading state is *exactly* [targetState], and will throw an error if already past [targetState]
	 * 
	 */
    static onLoadState(targetState: LoadingStates, callback: () => void, exactState = false) {
        if (exactState && targetState < currentState()) {
            throw new Error(`GameLoadState: cannot run callback at exactly state '${LoadingStates[targetState]}' while already at state '${LoadingStates[currentState()]}'!`);
        }
        if (targetState === LoadingStates.none) {
            // Run callback immediately instead of via ko.when(), trying to access the subscription synchronously that way can error
            callback();
        } else {
            const subscription = ko.when(() => targetState <= currentState(), () => {
                if (exactState && targetState < currentState()) {
                    throw new Error(`GameLoadState: callback scheduled to run at exactly state '${LoadingStates[targetState]}' tried to run at state '${LoadingStates[currentState()]}'!`);
                }
                callback();
                subscription.dispose();
            });
        }
    }
}