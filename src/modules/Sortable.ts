import Sortable from 'sortablejs';
import Settings from './settings/Settings';
import Setting from './settings/Setting';

const columns = ['left-column', 'left-column-2', 'middle-top-sort-column', 'middle-bottom-sort-column', 'right-column', 'right-column-2'];

// Create the settings to be loaded/saved
columns.forEach((column) => {
    Settings.add(new Setting(`modules.${column}`, `Modules sort order ${column}`, [], ''));
});

export const SortModules = () => {
    // Enable sorting of items
    columns.forEach((column) => {
        Sortable.create(document.getElementById(column), {
            animation: 100,
            group: 'main-sortable',
            draggable: '.card.sortable',
            handle: '.card-header',
            dataIdAttr: 'id',
            sort: true,
            delay: 500,
            delayOnTouchOnly: true,
            touchStartThreshold: 20,
            store: {
                get: null,
                set: (sortable) => {
                    const order = sortable.toArray();
                    Settings.setSettingByName(`modules.${column}`, order.join('|'));
                    // Clear out whitespace
                    if (/^([\s\r\n\t]|<!--.*-->)+$/.test(sortable.el.innerHTML)) {
                        // eslint-disable-next-line no-param-reassign
                        sortable.el.innerHTML = '';
                    }
                },
            },
            onSort: (evt) => {
                const currentSortable = evt.to[Object.keys(evt.to)[0]];
                const order = currentSortable.toArray();
                Settings.setSettingByName(`modules.${column}`, order.join('|'));
            },
        });
    });

    // Sort the items between columns, in order
    columns.forEach((sortable) => {
        const parent = document.getElementById(sortable);
        const itemOrder = Settings.getSetting(`modules.${sortable}`).observableValue();
        const itemOrderArr = itemOrder ? itemOrder.split('|') : [];

        let prevItem;
        itemOrderArr.forEach((item) => {
            const child = document.getElementById(item);
            // If the element doesn't exist anymore, skip it
            if (!child) {
                return;
            }
            if (!prevItem) {
                parent.insertBefore(child, parent.firstChild);
            } else {
                const prevChild = document.getElementById(prevItem);
                prevChild.parentNode.insertBefore(child, prevChild.nextSibling);
            }
            prevItem = item;
        });
    });

    // Clear out whitespace
    columns.forEach((sortable) => {
        const el = document.getElementById(sortable);
        if (/^([\s\r\n\t]|<!--.*-->)+$/.test(el.innerHTML)) {
            el.innerHTML = '';
        }
    });
};

export const SortSaves = () => {
    // Enable sorting of saves
    const settingName = 'sort.saveSelector';
    Sortable.create(document.querySelector('#saveSelector .save-container'), {
        animation: 100,
        group: settingName,
        draggable: '.trainer-card-container',
        handle: '.trainer-card',
        dataIdAttr: 'data-key',
        sort: true,
        delay: 500,
        delayOnTouchOnly: true,
        touchStartThreshold: 20,
        store: {
            get: () => {
                const order = Settings.getSetting(settingName).observableValue();
                return order ? order.split('|') : [];
            },
            set: (sortable) => {
                const order = sortable.toArray();
                Settings.setSettingByName(settingName, order.join('|'));
                Settings.saveDefault();
            },
        },
    });
};
