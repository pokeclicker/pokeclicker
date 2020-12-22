import Changelog, { changelogType } from './Changelog';

export default class ChangelogUpdate extends Changelog {
    constructor(
        version: string,
        date: Date,
    ) {
        const dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const description = `<code>${version}  -  ${date.toLocaleDateString(undefined, dateFormat)}</code>`;
        super(changelogType.UPDATE, description);
    }
}
