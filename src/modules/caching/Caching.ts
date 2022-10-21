import NodeCache from 'node-cache';
import Settings from '../settings';

export default class Caching {
    private static caches: Map<string, NodeCache> = new Map();
    public static set(cacheName: string, key: string, val: any): void {
        if (Settings.getSetting('cacheTtlInSeconds').value) {
            console.log('Cache set ' + cacheName + ' - ' + key + ' - ' + val);
            this.getCache(cacheName).set(key, val);
        }
    }

    public static get(cacheName: string, key: string): any {
        if (Settings.getSetting('cacheTtlInSeconds').value) {
            console.log('Cache get ' + cacheName + ' - ' + key);
            return this.getCache(cacheName).get(key);
        }
        return null;
    }

    private static getCache(cacheName: string): NodeCache {
        if (!(cacheName in this.caches.keys)) {
            this.caches.set(cacheName, new NodeCache({ stdTTL: Settings.getSetting('cacheTtlInSeconds').value }));
        }
        return this.caches.get(cacheName);
    }
}
