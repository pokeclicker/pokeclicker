/// <reference path="./koBindingHandlers.d.ts" />

import Sortable from 'sortablejs';
import Settings from './settings/Settings';

const contentEditableHandler = {
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

const playerSpriteMoveHandler = {
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
const sortableHandler = {
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

const resizableHandler = {
    init: function (element, valueAccessor) {
        const value = valueAccessor();
        element.classList.add('resizable-container');
        element.style.height = `${Settings.getSetting(`moduleHeight.${value.setting}`).value}px`;
        element.dataset.resizeId = value.setting;
        moduleResizeObserver.observe(element);
    },
};

const tooltipHandler = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const local = ko.utils.unwrapObservable(valueAccessor()),
            options = {};

        ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
        ko.utils.extend(options, local);

        $(element).tooltip(options);

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            $(element).tooltip('dispose');
        });
    },
    'update': function (element, valueAccessor) {
        const local = ko.utils.unwrapObservable(valueAccessor());
        const options = {};

        ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
        ko.utils.extend(options, local);

        // Update the config of the tooltip
        const tooltipData = $(element).data('bs.tooltip');
        tooltipData.config.title = (options as any).title;

        // If the tooltip is visible, update its text
        const tooltipInner = tooltipData.tip && tooltipData.tip.querySelector('.tooltip-inner');
        if (tooltipInner) {
            tooltipInner.innerHTML = tooltipData.config.title || '';
        }
        if (tooltipData && tooltipData.config) {
            if (tooltipData.config.title === '') {
                $(element).tooltip('hide');
            }
        }
    },
    options: {
        placement: 'bottom',
        trigger: 'click',
    },
};

Object.assign(ko.bindingHandlers, {
    contentEditable: contentEditableHandler,
    playerSpriteMove: playerSpriteMoveHandler,
    sortable: sortableHandler,
    resizable: resizableHandler,
    tooltip: tooltipHandler,
});