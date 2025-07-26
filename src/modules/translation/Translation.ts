import i18next, { TOptions } from 'i18next';
import Backend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { PureComputed, Observable } from 'knockout';
import GameHelper from '../GameHelper';
import type Setting from '../settings/Setting';
import memoize from '../utilities/memoize';
import Language from './Language';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Notifier from '../notifications/Notifier';

export type TranslationNamespace = 'pokemon' | 'logbook' | 'settings' | 'questlines';
export type TranslationVar = string | number | PokemonNameType;
export type TranslationVars = Record<string, TranslationVar>;

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
    private languageUpdated: Observable<number>;
    // For easy exporting of translation keys/values from dev builds
    public cachedTranslationDefaults?: Record<string, TranslationVars>; // { namespace: { key: defaultValue }}

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

    constructor(languageSetting: Setting<Language>) {
        const namespaces: TranslationNamespace[] = ['pokemon', 'logbook', 'settings', 'questlines'];
        this.languageUpdated = ko.observable(0);

        let translationsUrlOverride = new URLSearchParams(window.location.search).get('translations');
        if (translationsUrlOverride?.startsWith('github:')) {
            translationsUrlOverride = `https://raw.githubusercontent.com/${translationsUrlOverride.split(':')[1]}`;
        }

        if (translationsUrlOverride != null) {
            Notifier.notify({ message: `Using ${translationsUrlOverride} for translations`, timeout: 5000 });
        }

        const cacheUrlOverride = new URLSearchParams(window.location.search).get('translationCache');
        if (cacheUrlOverride != null ? cacheUrlOverride.toLowerCase() == 'true' : GameHelper.isDevelopmentBuild()) {
            this.cachedTranslationDefaults = {};
            namespaces.forEach(ns => { this.cachedTranslationDefaults[ns] = {}; });
        }

        i18next
            .use(Backend)
            .use(LanguageDetector)
            .init({
                debug: GameHelper.isDevelopmentBuild(),
                ns: namespaces,
                fallbackNS: 'pokemon',
                fallbackLng: 'en',
                backend: {
                    // Two backend sources - tries the TRANSLATION_URL first, falls back to copy taken at build time
                    backends: [HttpBackend, HttpBackend],
                    backendOptions: [
                        { loadPath: `${translationsUrlOverride ?? '$TRANSLATIONS_URL'}/locales/{{lng}}/{{ns}}.json` },
                        { loadPath: './locales/{{lng}}/{{ns}}.json' },
                    ],
                },
                returnEmptyString: false,
                interpolation: {
                    nestingPrefix: '[[',
                    nestingSuffix: ']]',
                    escapeValue: false,
                },
                nsSeparator: '::',
            });

        i18next.on('initialized', () => {
            const lang = i18next.language;

            if (lang in Language) {
                languageSetting.observableValue(lang as Language);
            } else {
                i18next.changeLanguage(languageSetting.value);
            }
        });

        i18next.services.formatter.add('pokemon', (val, lng, opts) => this.get(val, 'pokemon', opts)());

        languageSetting.observableValue.subscribe((val) => {
            i18next.changeLanguage(val, () => {
                GameHelper.incrementObservable(this.languageUpdated);
            });
        });
    }

    public translationHashKey(key: string, defaultValue: string) {
        return `${key}.${GameHelper.nonnegativeHashString(defaultValue)}`;
    }

    /**
     * Combines the translation key with a hash of the default text, making the key change whenever the default text does.
     * This invalidates outdated translations instead of risking the translations becoming inaccurate. 
     */
    public getHashed(key: string, namespace: string, defaultValue: string, otherOptions?: TOptions) {
        if (!defaultValue?.length) {
            throw new Error(`Failed to create hashed translation key for '${namespace}.${key}' as the default translation was missing or blank`);
        }
        const hashedKey = this.translationHashKey(key, defaultValue);
        if (this.cachedTranslationDefaults) {
            this.cacheDefaultValue(hashedKey, namespace, defaultValue);
        }
        return this.get(hashedKey, namespace, { ...(otherOptions ?? {}), defaultValue });
    }

    private cacheDefaultValue(key: string, namespace: string, defaultValue: string) {
        let cached = this.cachedTranslationDefaults[namespace][key];
        if (cached && cached != defaultValue) {
            throw new Error(`Translation cache encountered conflicting default values for key '${namespace}.${key}':\n"${cached}"\n"${defaultValue}"`);
        }
        this.cachedTranslationDefaults[namespace][key] = defaultValue;
    }
}
