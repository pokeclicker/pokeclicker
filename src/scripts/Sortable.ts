declare const Sortable: any;

$(() => {
    const columns = ['left-column', 'middle-sort-column', 'right-column'];

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
                    localStorage.setItem(sortable.el.id, order.join('|'));
                },
            },
            onSort: evt => {
                const currentSortable = evt.to[Object.keys(evt.to)[0]];
                const order = currentSortable.toArray();
                localStorage[currentSortable.el.id] = order.join('|');
            },
        });
    });

    // Sort the items between columns, in order
    columns.forEach(storageName => {
        const itemOrder = localStorage.getItem(storageName);
        const itemOrderArr = itemOrder ? itemOrder.split('|') : [];
        let prevItem;
        itemOrderArr.forEach(item => {
            if (!prevItem) {
                $(`#${item}`).prependTo(`#${storageName}`);
            } else {
                $(`#${item}`).insertAfter(`#${prevItem}`);
            }
            prevItem = item;
        });
    });
});