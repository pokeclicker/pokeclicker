import type { PureComputed } from 'knockout';
import { createLogContent, LogContent, LogContentKey } from './helpers';
import { LogBookType } from './LogBookTypes';

export default class LogBookLog {
    public description = this.content.key === LogContentKey.notTranslated
        ? this.content.vars.text
        : App.translation.get(this.content.key, 'logbook', this.content.vars);

    constructor(
        public type: LogBookType = {
            display: 'dark',
            label: 'OTHER',
        },
        public content: LogContent = createLogContent.notTranslated({ text: 'Unknown Entry' }),
        public date: number = Date.now(),
    ) {}

    get displayLabel(): PureComputed<string> {
        return App.translation.get(
            `type.${this.type.label}`,
            'logbook',
        );
    }
}
