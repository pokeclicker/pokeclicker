/* eslint-disable no-param-reassign */
/// <reference path="./koExtenders.d.ts" />

import Sortable from 'sortablejs';

// Only numeric values allowed - usage: ko.observable(0).extend({ numeric: 0 });
ko.extenders.numeric = (target: ko.Subscribable, precision: number) => {
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

ko.extenders.boolean = (target: ko.Subscribable) => {
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

//TODO: Replace with logic that maintains a singular PlayerSpriteSVG rather than clone re-rendering
ko.bindingHandlers.playerSpriteMove = {
    init: function (element) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
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
                        //console.log('Element is rotated? :', rotate, ' : ', x, ':', y);
                    }
                }
            });
        });
        observer.observe(element);
    },
};

ko.bindingHandlers.sortable = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        bindingContext.extend({ sortableController: null });
        // Needed to remove elements when the knockout array removes something
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => bindingContext.sortableController?.destroy());
        return ko.bindingHandlers.template.init(element, valueAccessor);
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        bindingContext.sortableController?.destroy();

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

        bindingContext.sortableController = Sortable.create(element, options);

        return ko.bindingHandlers.template.update(element, valueAccessor, allBindings, viewModel, bindingContext);
    },
};
