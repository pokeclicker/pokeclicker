import NodeCache from 'node-cache';
import Settings from '../settings/Settings';

export default class Caching {
    private static caches: Map<string, NodeCache> = new Map();
    public static set(cacheName: string, key: string, val: any): void {
        if (Settings.getSetting('cacheTtlInSeconds').value > 0) {
            this.getCache(cacheName).set(key, val);
        }
    }

    public static get(cacheName: string, key: string): any {
        if (Settings.getSetting('cacheTtlInSeconds').value > 0) {
            return this.getCache(cacheName).get(key);
        }
        return undefined;
    }

    private static getCache(cacheName: string): NodeCache {
        if (!this.caches.has(cacheName)) {
            this.caches.set(cacheName, new NodeCache({ stdTTL: Settings.getSetting('cacheTtlInSeconds').value }));
        }
        return this.caches.get(cacheName);
    }
}
