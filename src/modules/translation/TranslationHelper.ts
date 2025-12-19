import type { TranslationNamespace } from './Translation';
import { pokemonList } from '../pokemons/PokemonList';
import * as DownloadUtil from '../utilities/DownloadUtil';
import GameHelper from '../GameHelper';

export default class TranslationHelper {
    /**
     * Converts translation key/defaults to a tree as in the actual translation files.
     * @param replaceFunction - function to modify the default translation text, i.e. for replacing text with translation keys
     */
    private static exportCachedTranslationDefaults(namespace: TranslationNamespace, replaceFunction?: (string) => string) {
        if (!GameHelper.isDevelopmentBuild()) {
            throw new Error('The translation cache is only available by default in development builds. To cache translatable text in this game version, add "?translationCache=true" to the end of the URL and reload the game.');
        }
        if (!App.game) {
            throw new Error('Translations may not be properly cached before the game is running.');
        }
        if (!App.translation.cachedTranslationDefaults?.[namespace]) {
            throw new Error(`Could not find cache for translation namespace '${namespace}'`);
        }

        const exportTree = Object.create(null);
        const namespaceCache = App.translation.cachedTranslationDefaults[namespace];

        // handle shared subkeys by dividing into a tree of objects
        Object.entries(namespaceCache).forEach(([key, defaultValue]) => {
            // modify default text if applicable
            const defval = replaceFunction ? replaceFunction(defaultValue) : defaultValue;
            // split key on periods, unless:
            // 1. adjacent to a space, in which case we assume it's part of a key's text
            // 2. the rest of the key is a hash 
            const subkeys = key.split(/(?<! )\.(?! |\d{10}$)/);
            let current = exportTree;
            // add to tree, creating new child objects if not yet present
            subkeys.forEach((subkey, i) => {
                if (i == subkeys.length - 1) {
                    // last key, add value as leaf
                    current[subkey] = defval;
                } else {
                    // traverse to next child branch
                    if (!current[subkey]) {
                        current[subkey] = {};
                    }
                    current = current[subkey];
                }
            });
        });

        // condense tree by combining subkeys with single children
        const queue = [exportTree];
        const findWithSoloChild = (node) => Object.keys(node).find(k => typeof node[k] == 'object' && Object.keys(node[k]).length == 1);
        // breadth-first search, though depth-first would have identical output
        while (queue.length) {
            const node = queue.shift();
            let soloChild;
            // find keys that lead to nodes with a single non-string child
            while (soloChild = findWithSoloChild(node)) {
                // merge key with its single child key
                const childKey = Object.keys(node[soloChild])[0];
                node[`${soloChild}.${childKey}`] = node[soloChild][childKey];
                delete node[soloChild];
            }
            // after merging keys, enqueue all child objects
            queue.push(...Object.keys(node).filter(k => typeof node[k] == 'object').map(k => node[k]));
        }
        return exportTree;
    }

    public static exportQuestlineTranslationDefaults(): void {
        // Make sure all questline translatable text has been loaded by App.translation
        App.game.quests.questLines().forEach(ql => {
            ql.displayName; // eslint-disable-line @typescript-eslint/no-unused-expressions
            ql.description; // eslint-disable-line @typescript-eslint/no-unused-expressions
            ql.quests().forEach(q => q.description);
        });
        // get default text, replacing pokemon names with their translation keys
        // reversed to catch more-specific alt forms before the base name
        // regex matches escaped pokemon name, if not adjacent to a word character (i.e. mid-string) and not already part of a translation key
        const pokemonNames = pokemonList.map(p => RegExp(String.raw`(?<!\w|\[\[pokemon::)(${p.name.replace(/([()-.?])/g, '\\$1')})(?!\w|]])`, 'g')).reverse();
        const replaceNames = (text) => pokemonNames.reduce((t, regex) => t.replace(regex, '[[pokemon::$1]]'), text);

        const defaultsTree = TranslationHelper.exportCachedTranslationDefaults('questlines', replaceNames);
        const questlineOrder = App.game.quests.questLines().map(ql => ql.name);
        const questlineNames = new Set(questlineOrder);
        // Use a sorted list of all keys as the sort order for stringify
        // Unfortunately JSON does not have a non-awkward-workaround solution to this
        const allKeys: Set<string> = new Set();
        JSON.stringify(defaultsTree, (key, value) => (allKeys.add(key), value));
        const keyOrder = Array.from(allKeys).sort((a, b) => {
            if (questlineNames.has(a) && questlineNames.has(b)) {
                // sort questline names to match game order
                return questlineOrder.indexOf(a) - questlineOrder.indexOf(b);
            } else if ((a.startsWith('displayName') && b.startsWith('description')) || (b.startsWith('displayName') && a.startsWith('description'))) {
                // sort displayName before description
                return a > b ? -1 : 1;
            } else if (a.startsWith('step ') && b.startsWith('step ')) {
                // sort steps in numeric order
                return Number(a.match(/step (\d+)/)[0]) - Number(b.match(/step (\d+)/)[0]);
            }
            return a < b ? -1 : 1;
        });
        const outputFile = JSON.stringify(defaultsTree, keyOrder, 2);
        DownloadUtil.downloadTextFile(outputFile, 'questlines.json');
    }
}
