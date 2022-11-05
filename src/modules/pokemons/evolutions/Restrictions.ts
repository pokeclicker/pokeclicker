import { GameState, Region, Environment } from '../../GameConstants';
import { ItemNameType } from '../../items/ItemNameType';
import QuestLineState from '../../quests/QuestLineState';
import Weather from '../../weather/Weather';
import WeatherType from '../../weather/WeatherType';
import { EvoData, restrict } from './Base';

export type EvoFn = (...args: unknown[]) => EvoData;

export const anyDungeonRestrict = (evo: EvoFn) => (
    ...rest: Parameters<EvoFn>
) => restrict(
    evo(...rest),
    () => App.game.gameState === GameState.dungeon,
);

export const dungeonRestrict = <T extends EvoFn>(evo: T) => (
    dungeon: string,
    ...rest: Parameters<T>
) => restrict(
    anyDungeonRestrict(evo)(...rest),
    () => DungeonRunner.dungeon.name === dungeon,
);

export const anyGymRestrict = (evo: EvoFn) => (
    ...rest: Parameters<EvoFn>
) => restrict(
    evo(...rest),
    () => App.game.gameState === GameState.gym,
);

export const GymRestrict = <T extends EvoFn>(evo: T) => (
    town: string,
    ...rest: Parameters<T>
) => restrict(
    anyGymRestrict(evo)(...rest),
    () => GymRunner.gymObservable().town === town,
);

export const regionRestrict = <T extends EvoFn>(evo: T) => (
    regions: Region[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => regions.includes(player.region),
);

export const environmentRestrict = <T extends EvoFn>(evo: T) => (
    environment: Environment,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => MapHelper.getCurrentEnvironment() === environment,
);

export const heldItemRestrict = <T extends EvoFn>(evo: T) => (
    heldItemName: ItemNameType,
    ...rest: Parameters<T>
) => {
    const data = evo(...rest);
    return restrict(
        data,
        () => {
            const heldItem = App.game.party.getPokemonByName(data.basePokemon).heldItem();
            return heldItem && heldItem.name === heldItemName;
        },
    );
};

export const questlineRestrict = <T extends EvoFn>(evo: T) => (
    questName: string,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => App.game.quests.getQuestLine(questName).state() === QuestLineState.ended,
);

export const weatherRestrict = <T extends EvoFn>(evo: T) => (
    weather: WeatherType[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => weather.includes(Weather.currentWeather()),
);

export const timeRestrict = <T extends EvoFn>(evo: T) => (
    startHour: number,
    endHour: number,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => {
        const currentHour = new Date().getHours();
        return startHour < endHour
            // If the start time is before the end time, both need to be true
            ? currentHour >= startHour && currentHour < endHour
            // If the start time is after the end time, only 1 needs to be true
            : currentHour >= startHour || currentHour < endHour;
    },
);

export const dayRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => timeRestrict(evo)(6, 18, ...rest);

export const nightRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => timeRestrict(evo)(18, 6, ...rest);
