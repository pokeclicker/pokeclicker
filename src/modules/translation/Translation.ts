import i18next, { TOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { PureComputed, Observable } from 'knockout';
import GameHelper from '../GameHelper';
import type Setting from '../settings/Setting';
import memoize from '../utilities/memoize';
import Language from './Language';

const getTranslatedMemoResolver = (
    key: string,
    namespace: string,
    otherOptions?: TOptions,
) => {
    if (otherOptions) {
        return null;
    }

    return `${namespace}:${key}`;
};
export default class Translate {
    get = memoize((
        key: string,
        namespace: string,
        otherOptions?: TOptions,
    ): PureComputed<string> => ko.pureComputed(() => {
        // recompute when language changes
        this.languageUpdated();

        return i18next.t(key, {
            ...(otherOptions ?? {}),
            ns: namespace,
        });
    }), getTranslatedMemoResolver);

    private languageUpdated: Observable<number>;

    constructor(languageSetting: Setting<Language>) {
        this.languageUpdated = ko.observable(0);

        i18next
            .use(Backend)
            .use(LanguageDetector)
            .init({
                debug: true,
                ns: ['pokemon'],
                fallbackLng: 'en',
                backend: {
                    loadPath: '$TRANSLATIONS_URL/locales/{{lng}}/{{ns}}.json',
                },
                returnEmptyString: false,
                interpolation: {
                    nestingPrefix: '[[',
                    nestingSuffix: ']]',
                },
            });

        i18next.on('initialized', () => {
            const lang = i18next.language;

            if (lang in Language) {
                languageSetting.observableValue(lang as Language);
            } else {
                i18next.changeLanguage(languageSetting.value);
            }
        });

        languageSetting.observableValue.subscribe((val) => {
            i18next.changeLanguage(val, () => {
                GameHelper.incrementObservable(this.languageUpdated);
            });
        });
    }
}
