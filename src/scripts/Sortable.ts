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
                currentSortable.el.innerHTML = currentSortable.el.innerHTML.replace(/>[\s\n\r\t]+</g, '><').trim();
            },
        });
    });

    // Sort the items between columns, in order
    columns.forEach(sortable => {
        const parent = document.getElementById(sortable);
        const itemOrder = localStorage.getItem(sortable);
        const itemOrderArr = itemOrder ? itemOrder.split('|') : [];

        let prevItem;
        itemOrderArr.forEach(item => {
            const child = document.getElementById(item);
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
        el.innerHTML = el.innerHTML.replace(/>[\s\n\r\t]+</g, '><').trim();
    });
});