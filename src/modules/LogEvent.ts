// For helper functions that may be needed across all files
// TODO: Convert this to not be a class after everything is TS modules
const LogEvent = (event: string, event_category: string, event_label?: string, value?: number) => {
    try {
        gtag('event', event, {
            event_category,
            event_label,
            value,
        });
    } catch (e) {
        console.warn('Failed to send event data.');
    }
};

export default LogEvent;
