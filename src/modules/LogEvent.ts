// For helper functions that may be needed across all files
// TODO: Convert this to not be a class after everything is TS modules
const LogEvent = (event: string, event_category: string, event_label?: string, value?: number) => {
    try {
        gtag('event', event, {
            event_category,
            event_label,
            value,
        });
    // eslint-disable-next-line no-empty
    } catch (e) {}
};

export default LogEvent;
