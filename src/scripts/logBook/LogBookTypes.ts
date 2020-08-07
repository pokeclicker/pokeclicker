interface LogBookType {
    display: string;
    label: string;
}

const LogBookTypes: Record<string, LogBookType> = {
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
    FOUND: {
        display: 'primary',
        label: 'FOUND',
    },
};
