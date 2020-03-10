const logBookType = {
    NEW: '<span class="badge badge-primary">NEW</span>',
    SHINY: '<span class="badge badge-warning">SHINY</span>',
    CAUGHT: '<span class="badge badge-success">CAUGHT</span>',
    ESCAPED: '<span class="badge badge-danger">ESCAPED</span>',
    // unused - can be changed
    3: '<span class="badge badge-warning">-</span>',
    5: '<span class="badge badge-default">-</span>',
    INFO: '<span class="badge badge-info">INFO</span>',
};

class LogBook {
    public date: number;
    public type: string;
    public description: string;

    constructor(type: string, description: string) {
        this.date = Date.now() - Math.floor(Math.random() * (6e4 * 60 * 24));
        this.type = type;
        this.description = description;
        if (type == changelogType.VERSION) {
            this.description += '</code>';
        }
    }
}

/**
 * Add your changes to the top of the changelog. Please do not increase the version number.
 *
 * MAJOR - Will stay at 0 during development, 1 after the first public release
 * MINOR - Will increment for each feature refactor or large changes to a feature
 * PATCH - Increment for small changes, bugfixes, UI changes.
 */
const logBookItems = [
    new LogBook(logBookType.SHINY, 'You encountered a shiny Onix'),
    new LogBook(logBookType.CAUGHT, 'You caught a shiny Abra'),
    new LogBook(logBookType.SHINY, 'You encountered a shiny Abra'),
    new LogBook(logBookType.ESCAPED, 'Shiny Chansey Escaped'),
    new LogBook(logBookType.SHINY, 'You encountered a shiny Chansey'),
    new LogBook(logBookType.ESCAPED, 'Mew Escaped'),
    new LogBook(logBookType.NEW, 'You encountered a Mew'),
];
