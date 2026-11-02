import { vi } from 'vitest';
import LogBook from './LogBook';
import { LogBookTypes } from './LogBookTypes';
import { createLogContent } from './helpers';

describe('LogBook.newShinyLog', () => {
    it('also logs new shinies as NEW', () => {
        const logbook = new LogBook();
        const newLog = vi.spyOn(logbook, 'newLog').mockImplementation(() => {});
        const content = createLogContent.hatchedShiny({ pokemon: 'Pikachu' });
        logbook.newShinyLog(LogBookTypes.SHINY, content, false);
        expect(newLog.mock.calls).toEqual([[LogBookTypes.SHINY, content], [LogBookTypes.NEW, content]]);
    });

    it('logs duplicate shinies only under their own type', () => {
        const logbook = new LogBook();
        const newLog = vi.spyOn(logbook, 'newLog').mockImplementation(() => {});
        const content = createLogContent.hatchedShinyDupe({ pokemon: 'Pikachu' });
        logbook.newShinyLog(LogBookTypes.SHINY, content, true);
        expect(newLog.mock.calls).toEqual([[LogBookTypes.SHINY, content]]);
    });
});
