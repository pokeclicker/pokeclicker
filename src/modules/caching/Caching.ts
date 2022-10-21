import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import Settings from '../settings';

export default class Caching {
    private static caches: Map<string, CacheContainer> = new Map();
    public static set(cacheName: string, key: string, val: any): void {
        if (Settings.getSetting('cacheTtlInSeconds').value) {
            // TODO remove this log
            console.log('Cache set ' + cacheName + ' - ' + key + ' - ' + val);
            this.getCache(cacheName).setItem(key, val, { ttl: Settings.getSetting('cacheTtlInSeconds').value });
        }
    }

    public static get(cacheName: string, key: string): any {
        if (Settings.getSetting('cacheTtlInSeconds').value) {
            // TODO remove this log
            console.log('Cache get ' + cacheName + ' - ' + key);
            return this.getCache(cacheName).getItem(key);
        }
        return null;
    }

    private static getCache(cacheName: string): CacheContainer {
        if (!(cacheName in this.caches.keys)) {
            this.caches.set(cacheName, new CacheContainer(new MemoryStorage()));
        }
        return this.caches.get(cacheName);
    }
}
