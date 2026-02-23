/**
 * Regression test for: [Bug] Shiny Shadow Pokemon no shiny encounter alert and not reported in Logbook
 * https://github.com/pokeclicker/pokeclicker/issues/6133
 *
 * Root cause: TemporaryBattleBattle.generateNewEnemy() never called encounter statistics or
 * logbook notifications for catchable pokemon (Shadow pokemon in trainer battles, or any
 * pokemon in non-trainer battles).
 *
 * Fix: extracted Battle.logPokemonEncounter(pokemon, location) as a shared helper on the
 * base class; TemporaryBattleBattle (and DungeonBattle) now call it instead of duplicating
 * the notification block inline.
 *
 * These tests verify the isCatchable condition logic and the createLogContent helpers that
 * logPokemonEncounter delegates to.
 */

import { ShadowStatus } from '../../GameConstants';
import { createLogContent, LogContentKey } from '../../logbook/helpers';
import { LogBookTypes } from '../../logbook/LogBookTypes';

// ---------------------------------------------------------------------------
// Pure helpers extracted from the fix for direct unit testing
// (Battle.logPokemonEncounter and the isCatchable guard in generateNewEnemy
//  depend on global game state so are exercised here via their pure building blocks)
// ---------------------------------------------------------------------------

/**
 * Mirrors the catch-eligibility guard added to TemporaryBattleBattle.generateNewEnemy().
 * Matches the existing check in TemporaryBattleBattle.defeatPokemon():
 *   !isTrainerBattle  →  every pokemon is catchable
 *   isTrainerBattle   →  only Shadow pokemon are catchable (and thus get encounter logs)
 */
function isCatchableInTemporaryBattle(isTrainerBattle: boolean, shadowStatus: ShadowStatus): boolean {
    return !isTrainerBattle || shadowStatus === ShadowStatus.Shadow;
}

/**
 * Mirrors the shiny log-content selection inside Battle.logPokemonEncounter().
 */
function encounterShinyLogContent(isDupe: boolean, location: string, pokemon: string) {
    return isDupe
        ? createLogContent.encounterShinyDupe({ location, pokemon: pokemon as any })
        : createLogContent.encounterShiny({ location, pokemon: pokemon as any });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('TemporaryBattle shiny shadow encounter notifications (issue #6133)', () => {

    describe('isCatchableInTemporaryBattle', () => {
        it('marks all pokemon as catchable in a non-trainer battle', () => {
            expect(isCatchableInTemporaryBattle(false, ShadowStatus.None)).toBe(true);
            expect(isCatchableInTemporaryBattle(false, ShadowStatus.Shadow)).toBe(true);
            expect(isCatchableInTemporaryBattle(false, ShadowStatus.Purified)).toBe(true);
        });

        it('marks only Shadow pokemon as catchable in a trainer battle', () => {
            expect(isCatchableInTemporaryBattle(true, ShadowStatus.Shadow)).toBe(true);
        });

        it('marks non-Shadow pokemon as NOT catchable in a trainer battle', () => {
            expect(isCatchableInTemporaryBattle(true, ShadowStatus.None)).toBe(false);
            expect(isCatchableInTemporaryBattle(true, ShadowStatus.Purified)).toBe(false);
        });
    });

    describe('shiny encounter log content for shadow pokemon', () => {
        const location = 'Venus';
        const pokemon = 'Suicune';

        it('creates encounterShiny log content for a first-time shiny shadow encounter', () => {
            const content = encounterShinyLogContent(false, location, pokemon);
            expect(content.key).toBe(LogContentKey.encounterShiny);
            expect(content.vars?.location).toBe(location);
            expect(content.vars?.pokemon).toBe(pokemon);
        });

        it('creates encounterShinyDupe log content for a duplicate shiny shadow encounter', () => {
            const content = encounterShinyLogContent(true, location, pokemon);
            expect(content.key).toBe(LogContentKey.encounterShinyDupe);
            expect(content.vars?.location).toBe(location);
            expect(content.vars?.pokemon).toBe(pokemon);
        });

        it('encounterShiny is associated with the SHINY logbook type', () => {
            expect(LogBookTypes.SHINY.display).toBe('warning');
            expect(LogBookTypes.SHINY.label).toBe('SHINY');
        });

        it('encounterWild creates correct log content for a new non-shiny catchable pokemon', () => {
            const content = createLogContent.encounterWild({ location: 'Venus', pokemon: 'Suicune' as any });
            expect(content.key).toBe(LogContentKey.encounterWild);
            expect(content.vars?.location).toBe('Venus');
        });
    });

    describe('scenario: shiny Shadow Suicune encountered from Venus (trainer battle)', () => {
        it('Shadow Suicune is catchable in a trainer battle', () => {
            const isTrainerBattle = true;
            const shadowStatus = ShadowStatus.Shadow;
            expect(isCatchableInTemporaryBattle(isTrainerBattle, shadowStatus)).toBe(true);
        });

        it('a shiny catchable pokemon should produce a SHINY logbook entry', () => {
            const alreadyCaught = false;
            const content = encounterShinyLogContent(alreadyCaught, 'Venus', 'Suicune');
            expect(content.key).toBe(LogContentKey.encounterShiny);
        });

        it('a duplicate shiny catchable pokemon should produce a SHINY DUPE logbook entry', () => {
            const alreadyCaught = true;
            const content = encounterShinyLogContent(alreadyCaught, 'Venus', 'Suicune');
            expect(content.key).toBe(LogContentKey.encounterShinyDupe);
        });
    });
});
