import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import * as ts from 'typescript';

const mapHelperSource = readFileSync(resolve('src/scripts/worldmap/MapHelper.ts'), 'utf8');
const galarMapSource = readFileSync(resolve('src/components/regionMaps/GalarSVG.html'), 'utf8');

function loadMapHelper(spikemuthUnlocked: boolean, modal: ReturnType<typeof vi.fn>, notify: ReturnType<typeof vi.fn>) {
    const dockTowns = [];
    dockTowns[7] = 'Hulbury';
    const context = {
        GameConstants: {
            DockTowns: dockTowns,
            Region: { kanto: 0, galar: 7 },
            GalarSubRegions: { NorthGalar: 1 },
        },
        TownList: {
            Hulbury: { isUnlocked: () => true },
            Spikemuth: { isUnlocked: () => spikemuthUnlocked },
        },
        player: {
            highestRegion: () => 7,
            region: 7,
            subregion: 1, // GalarSubRegions.NorthGalar
        },
        $: () => ({ modal }),
        Notifier: { notify },
        NotificationConstants: { NotificationOption: { warning: 'warning' } },
    };

    const compiled = ts.transpile(mapHelperSource, { target: ts.ScriptTarget.ES2020 });
    runInNewContext(`${compiled}\nglobalThis.MapHelper = MapHelper;`, context);
    return (context as unknown as { MapHelper: { openShipModal(dockTown: string): void } }).MapHelper;
}

describe('North Galar dock', () => {
    it('checks Spikemuth for both the dock and ship map clicks', () => {
        const spikemuthDockClicks = galarMapSource.match(/click:function\(\)\{MapHelper\.openShipModal\('Spikemuth'\)\}/g);
        expect(spikemuthDockClicks).toHaveLength(2);
    });

    it('does not open the ship menu while Spikemuth is locked', () => {
        const modal = vi.fn();
        const notify = vi.fn();
        const mapHelper = loadMapHelper(false, modal, notify);

        mapHelper.openShipModal('Spikemuth');

        expect(modal).not.toHaveBeenCalled();
        expect(notify).toHaveBeenCalledOnce();
    });

    it('opens the ship menu after Spikemuth is unlocked', () => {
        const modal = vi.fn();
        const notify = vi.fn();
        const mapHelper = loadMapHelper(true, modal, notify);

        mapHelper.openShipModal('Spikemuth');

        expect(modal).toHaveBeenCalledWith('show');
        expect(notify).not.toHaveBeenCalled();
    });
});
