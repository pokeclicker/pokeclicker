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

/**
 * Creates a foreach binding where the user can drag elements to reorder them, and updates the underlying array's order
 * 
 * Syntax: sortable: { foreach: <observable array>, options: { ... } }
 *  - foreach: the observable array used for the foreach binding
 *  - dataToId: optional function that maps array elements to unique (when converted to strings) IDs 
 *  - options: optional object for Sortablejs options
 */
const sortableControllers = new WeakMap();
const sortableHandler = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        const bindingParameters = valueAccessor();
        const getDataId = bindingParameters.getDataId ? (data) => String(bindingParameters.getDataId(data)) : (data) => String(data);

        // Create Sortable instance
        const options = {
            // defaults
            animation: 100,
            sort: true,
            delay: 500,
            delayOnTouchOnly: true,
            touchStartThreshold: 20,
            dataIdAttr: 'data-sortable-id',
            
            // override with options passed through knockout binding
            ...(bindingParameters.options ?? {}),

            // not used by Sortable, but putting it in the instance anyway for ease of access
            getDataId,

            // handle updating underlying knockout array when moving items
            onEnd: (evt, originalEvt) => {
                // If an onEnd function was supplied, call that first
                bindingParameters.options?.onEnd?.(evt, originalEvt);

                const list = [...bindingParameters.foreach()]; // shallow copy of the observable array
                const sortableList = sortableControllers.get(element).toArray();

                // Find the current indices of each element in the UI and sort the underlying array to match
                // This avoids potential desync issues
                const newIndices = new Map();
                list.forEach(val => newIndices.set(val, sortableList.indexOf(options.getDataId(val))));
                list.sort((a, b) => newIndices.get(a)  - newIndices.get(b));

                // Update the observable array's order
                bindingParameters.foreach(list);
            },
        };
        // If some elements aren't draggable, prevent dragging other elements onto them
        if (options.filter) {
            options.preventOnFilter = false;
            options.onMove = (evt) => !evt.related.matches(options.filter);
        }
        sortableControllers.set(element, Sortable.create(element, options));

        // Apply the sortable binding
        ko.applyBindingsToNode(element, {
            template: {
                foreach: bindingParameters.foreach,
                afterRender(nodes, el) {
                    nodes.forEach((n) => {
                        if (n instanceof Element) {
                            n.setAttribute(options.dataIdAttr, options.getDataId(el));
                        }
                    });
                },
                beforeRemove(node: HTMLElement, idx, el) {
                    // Sortable may have cloned the node, so we need to get the real one
                    const found = element.querySelector(`[${options.dataIdAttr}="${options.getDataId(el)}"]`);
                    (found ?? node)?.remove();
                },
            },
        }, viewModel);
        return { controlsDescendantBindings: true };
    },
    update: function (element, valueAccessor) {
        // When the observable array changes, keep the UI order synced
        // It should always match for changes via the user dragging elements
        // but this lets us safely change the order via code
        const sortInstance = sortableControllers.get(element);
        const internalOrder = valueAccessor().foreach().map(x => sortInstance.options.getDataId(x));
        const visibleOrder = sortInstance.toArray();
        if (internalOrder.some((x, i) => x !== visibleOrder[i])) {
            // Out of sync, reorder the UI to match the internal model
            sortInstance.sort(internalOrder);
        }
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
        const local = ko.utils.unwrapObservable(valueAccessor());
        const options = {} as any;

        ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
        ko.utils.extend(options, local);

        // TODO Bootstrap 5: Use customClass rather than rewriting the template
        options.template = `<div class="tooltip ${options.class ?? ''}" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>`;

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
