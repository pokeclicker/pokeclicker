/**
  * Knockout.js extenders
  */
$.extend(ko.extenders, {
    // Only numeric values allowed - usage: ko.observable(0).extend({ numeric: 0 });
    numeric: function(target, precision) {
        //create a writable computed observable to intercept writes to our observable
        const result = ko.pureComputed({
            read: target,  //always return the original observables value
            write: function(newValue: string) {
                if (!isNaN(+newValue)) {
                    const current = target(),
                        roundingMultiplier = Math.pow(10, precision),
                        newValueAsNum = +newValue,
                        valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                    //only write if it changed
                    if (valueToWrite !== current) {
                        target(valueToWrite);
                    } else {
                    //if the rounded value is the same, but a different value was written, force a notification for the current field
                        if (newValue !== current) {
                            target.notifySubscribers(valueToWrite);
                        }
                    }
                }
            },
        }).extend({ notify: 'always' });

        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    },
});

/**
 * TODO(@Isha) refactor this to no longer be global but App properties.
 * Will be done after the major player refactor.
 */
let player;

/**
 * Start the application when all html elements are loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    App.start();
});
