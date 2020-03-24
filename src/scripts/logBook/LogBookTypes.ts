interface LogBookType {
    display: string;
    label: string;
}

const LogBookTypes = {
    NEW: {
        display: 'primary',
        label: 'NEW',
    },
    SHINY: {
        display: 'warning',
        label: 'SHINY',
    },
    CAUGHT: {
        display: 'success',
        label: 'CAUGHT',
    },
    ESCAPED: {
        display: 'danger',
        label: 'ESCAPED',
    },
};
