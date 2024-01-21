/* eslint-disable no-param-reassign */
/// <reference path="./koExtenders.d.ts" />

import Sortable from 'sortablejs';
import type { Subscribable, Observable, Computed } from 'knockout';
import Settings from './settings';

// Only numeric values allowed - usage: ko.observable(0).extend({ numeric: 0 });
ko.extenders.numeric = (target: Subscribable, precision: number) => {
    // create a writable computed observable to intercept writes to our observable
    const result = ko.pureComputed<number>({
        read: target, // always return the original observable's value
        write: (newValueRaw: string | number) => {
            const newValue = Number(newValueRaw);
            if (Number.isNaN(newValue)) { return; }

            const current = target();
            const roundingMultiplier = 10 ** precision;
            const valueToWrite = Math.round(newValue * roundingMultiplier) / roundingMultiplier;

            // only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            } else if (newValue !== current) {
                // if the rounded value is the same, but a different value was
                // written, force a notification for the current field
                target.notifySubscribers(valueToWrite);
            }
        },
    }).extend({ notify: 'always' });

    // initialize with current value to make sure it is rounded appropriately
    result(target());

    // return the new computed observable
    return result;
};

ko.extenders.boolean = (target: Subscribable) => {
    // create a writable computed observable to intercept writes to our observable
    const result = ko.pureComputed<boolean>({
        read: target, // always return the original observable's value
        write: (newValueRaw: boolean) => {
            target(!!newValueRaw);
        },
    }).extend({ notify: 'always' });

    // initialize with current value to make sure it is rounded appropriately
    result(target());

    // return the new computed observable
    return result;
};

// Don't treat shallowly-equal arrays as new values, i.e. don't notify subscribers
// Usage: ko.observable([]).extend({ arrayEquals: true });
ko.extenders.arrayEquals = (target: Observable<any[]> | Computed<any[]>) => {
    const defaultComparer = target.equalityComparer;
    target.equalityComparer = function (a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            // Compare arrays by element
            return a.length === b.length && a.every((x, i) => x === b[i]);
        }
        // Default comparator always treats non-primitive values as changed
        return defaultComparer(a, b);
    };
    return target;
};

// A modified version of the rateLimit extender that can be forced to evaluate early
// Usage: const example = ko.pureComputed(() => { whatever }).extend({ skippableRateLimit: GameConstants.WEEK });
//        example.evaluateEarly();
ko.extenders.skippableRateLimit = (target: Subscribable, delay: number) => {
    // Custom rate limiter function, see https://knockoutjs.com/documentation/rateLimit-observable.html#custom-rate-limit-methods
    const skippableLimiter = (callback, timeout) => {
        var timeoutInstance = null;
        var skipNextLimit = false;
        const startEvaluation = () => {
            timeoutInstance = null;
            skipNextLimit = false;
            // Starts target evaluation
            callback();
        };
        const evaluateEarly = () => {
            if (timeoutInstance) {
                // Already rate-limited, evaluate now
                clearTimeout(timeoutInstance);
                startEvaluation();
            } else {
                // Not yet rate-limited, be ready to skip the limit
                // (This often happens when waiting for subscription notifications to propogate or for a dependency to reevaluate)
                skipNextLimit = true;
            }
        };
        const startRateLimit = () => {
            // Do nothing if already rate-limited
            if (!timeoutInstance) {
                if (skipNextLimit) {
                    // Skipping rate limit this time and going straight to evaluation
                    startEvaluation();
                } else {
                    // Start rate limit delay
                    timeoutInstance = setTimeout(startEvaluation, timeout);
                }
            }
        };
        Object.assign(target, { evaluateEarly });
        return startRateLimit;
    };
    return target.extend({ rateLimit: { timeout: delay, method: skippableLimiter } }) as typeof target & SkippableRateLimit;
};

ko.bindingHandlers.contentEditable = {
    init: (element: HTMLElement, valueAccessor) => {
        const value = valueAccessor();

        function onBlur() {
            if (ko.isWriteableObservable(value)) {
                value(this.textContent);
            }
        }

        element.textContent = value();
        element.contentEditable = 'true';
        element.addEventListener('blur', onBlur);
    },
};

//Fixes the PlayerSVG rendering beneath other SVGs by rerendering the current PlayerSVG in the forefront. #4306
//TODO: Replace with logic that maintains a singular PlayerSpriteSVG (Might be performance costly over a simple observer)
function handleVisibleElement(element) {
    if (element.classList.contains('iconLocation')) {
        if (element.classList.contains('iconLocation')) {
            var targetElement = document.getElementById('playerSprite');
            var imageElement = element.cloneNode(true);
            imageElement.classList.remove('hide');

            targetElement.innerHTML = '';
            targetElement.appendChild(imageElement);

            //Get required variables to replicate the rotate on parent group as well
            var rotate = imageElement.getAttribute('rotate');
            var x = imageElement.getAttribute('localx');
            var y = imageElement.getAttribute('localy');

            if (rotate) {
                targetElement.setAttribute('transform', 'rotate(90,' + x + ', ' + y + ')');
            } else {
                targetElement.setAttribute('transform', '');
            }
        }
    }
}

ko.bindingHandlers.playerSpriteMove = {
    init: function (element) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target as HTMLElement;
                    const displayStyle = window.getComputedStyle(target).getPropertyValue('display');

                    const isVisible = displayStyle !== 'none';
                    if (isVisible) {
                        handleVisibleElement(element);
                    }
                }
            }
        });

        // Observe changes to the 'style' attribute of the target element
        observer.observe(element, { attributes: true });

        // Trigger initial visibility check on load
        const displayStyle = window.getComputedStyle(element).getPropertyValue('display');
        const isVisible = displayStyle !== 'none';
        if (isVisible) {
            handleVisibleElement(element);
        }
    },
};
//TODO END

const sortableControllers = new WeakMap();
ko.bindingHandlers.sortable = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        sortableControllers.set(element, null);
        const value = valueAccessor();
        ko.applyBindingsToNode(element, {
            template: {
                ...value,
                afterRender(nodes, el) {
                    nodes.forEach((n) => {
                        if (n.dataset) {
                            n.dataset.sortableId = value.options.getId(el);
                        }
                    });
                },
                beforeRemove(node: HTMLElement, idx, el) {
                    // Sortable may have cloned the node, so we need to get the real one
                    const found = element.querySelector(`[data-sortable-id="${value.options.getId(el)}"]`);
                    (found ?? node)?.remove();
                },
            },
        }, viewModel);
        return { controlsDescendantBindings: true };
    },
    update: function (element, valueAccessor) {
        const value = ko.unwrap(valueAccessor());
        const options = {
            // defaults
            animation: 100,
            sort: true,
            delay: 500,
            delayOnTouchOnly: true,
            touchStartThreshold: 20,

            // override with options passed through knockout binding
            ...(value.options ?? {}),
            dataIdAttr: 'data-sortable-id',

            // handle updating underlying knockout array when moving items
            onEnd: (evt, originalEvt) => {
                value.options?.onEnd?.(evt, originalEvt);

                const { oldIndex, newIndex } = evt;
                const list = [...value.foreach()];
                const movedItem = list.splice(oldIndex, 1)[0];

                const newList = [
                    ...list.slice(0, newIndex),
                    movedItem,
                    ...list.slice(newIndex),
                ];
                value.foreach(newList);
            },
        };

        sortableControllers.set(element, Sortable.create(element, options));
    },
};

const moduleResizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const height = entry.target.getBoundingClientRect().height;
        if (height > 0) {
            const resizeId = (entry.target as HTMLElement).dataset.resizeId;
            Settings.setSettingByName(`moduleHeight.${resizeId}`, height);
        }
    });
});

ko.bindingHandlers.resizable = {
    init: function (element, valueAccessor) {
        const value = valueAccessor();
        element.classList.add('resizable-container');
        element.style.height = `${Settings.getSetting(`moduleHeight.${value.setting}`).value}px`;
        element.dataset.resizeId = value.setting;
        moduleResizeObserver.observe(element);
    },
};
