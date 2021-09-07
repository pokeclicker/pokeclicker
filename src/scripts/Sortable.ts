declare const Sortable: any;

const columns = ['left-column', 'middle-top-sort-column', 'middle-bottom-sort-column', 'right-column'];

// Create the settings to be loaded/saved
columns.forEach(column => {
    Settings.add(new Setting(`modules.${column}`, `Modules sort order ${column}`, [], ''));
});

const SortModules = () => {
    // Enable sorting of items
    columns.forEach(column => {
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
                set: sortable => {
                    const order = sortable.toArray();
                    Settings.setSettingByName(`modules.${column}`, order.join('|'));
                    // Clear out whitespace
                    if (/^([\s\r\n\t]|<!--.*-->)+$/.test(sortable.el.innerHTML)) {
                        sortable.el.innerHTML = '';
                    }
                },
            },
            onSort: evt => {
                const currentSortable = evt.to[Object.keys(evt.to)[0]];
                const order = currentSortable.toArray();
                Settings.setSettingByName(`modules.${column}`, order.join('|'));
            },
        });
    });

    // Sort the items between columns, in order
    columns.forEach(sortable => {
        const parent = document.getElementById(sortable);
        const itemOrder = Settings.getSetting(`modules.${sortable}`).observableValue();
        const itemOrderArr = itemOrder ? itemOrder.split('|') : [];

        let prevItem;
        itemOrderArr.forEach(item => {
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
    columns.forEach(sortable => {
        const el = document.getElementById(sortable);
        if (/^([\s\r\n\t]|<!--.*-->)+$/.test(el.innerHTML)) {
            el.innerHTML = '';
        }
    });
};
