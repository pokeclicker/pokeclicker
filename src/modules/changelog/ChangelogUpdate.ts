import Changelog, { changelogType } from './Changelog';

export default class ChangelogUpdate extends Changelog {
    constructor(
        public version: string,
        date: Date,
        desc: string = '',
    ) {
        super(changelogType.UPDATE, `<code>${version}${desc ? ` - ${desc}` : ''} -  ${date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</code>`);
    }
}
