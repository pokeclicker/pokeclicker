class Changelog {
    public type: string;
    public description: string;

    constructor(type: string, description: string) {
        this.type = type;
        this.description = description;
        if (type == changelogType.VERSION)
            this.description += '</code>';
    }
}

const changelogType = {
    VERSION: '<code>',
    NEW: '<span class="badge badge-success">NEW</span>',
    CHANGE: '<span class="badge badge-primary">CHANGE</span>',
    FIXED: '<span class="badge badge-warning">FIXED</span>',
    REMOVED: '<span class="badge badge-danger">REMOVED</span>',
    DEFAULT: '<span class="badge badge-default">-</span>', // unused - can be changed
    INFO: '<span class="badge badge-info">INFO</span>', // unused - can be changed
};

const changelogItems = [
    new Changelog(changelogType.VERSION, 'v1.0.1'),
        new Changelog(changelogType.NEW, 'Added changelog'),
        new Changelog(changelogType.CHANGE, 'Show battle item names and descriptions'),
        new Changelog(changelogType.FIXED, 'Item magnet now works in dungeons'),
        new Changelog(changelogType.FIXED, 'Battle items no longer always active'),
    new Changelog(changelogType.VERSION, 'v1.0.0'),
        new Changelog(changelogType.NEW, 'Add battle items'),
];
