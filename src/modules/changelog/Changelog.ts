export enum ChangeLogType {
    DEFAULT,
    UPDATE,
    NEW,
    CHANGE,
    FIXED,
    REMOVED,
    EVENT,
}

export type ChangelogConfig = {
    display: string,
    label: string,
};

export const changelogType: Record<keyof typeof ChangeLogType, ChangelogConfig> = {
    UPDATE: { display: 'dark', label: 'UPDATE' },
    NEW: { display: 'success', label: 'NEW' },
    CHANGE: { display: 'primary', label: 'CHANGE' },
    FIXED: { display: 'warning', label: 'FIXED' },
    REMOVED: { display: 'danger', label: 'REMOVED' },
    EVENT: { display: 'info', label: 'EVENT' },
    DEFAULT: { display: 'default', label: '-' }, // unused - can be changed
};

export default class Changelog {
    constructor(
        public type: ChangelogConfig = changelogType.DEFAULT,
        public description: string = '',
    ) {}
}
