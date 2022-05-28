import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import type { PureComputed, Observable } from 'knockout';
import GameHelper from '../GameHelper';
import type Setting from '../settings/Setting';
import Language from './Language';

export default class Translate {
    private languageUpdated: Observable<number>;

    constructor(languageSetting: Setting<Language>) {
        this.languageUpdated = ko.observable(0);

        i18next
            .use(Backend)
            .init({
                lng: languageSetting.value,
                debug: true,
                ns: ['test', 'pokemon'],
                fallbackLng: 'en',
            });

        languageSetting.observableValue.subscribe((val) => {
            i18next.changeLanguage(val, () => {
                GameHelper.incrementObservable(this.languageUpdated);
            });
        });
    }

    get(key: string, namespace: string): PureComputed<string> {
        return ko.pureComputed(() => {
            // recompute when language changes
            this.languageUpdated();

            return i18next.t(key, {
                ns: namespace,
            });
        });
    }
}
