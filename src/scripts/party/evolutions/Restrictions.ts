type EvoFn = (...args: unknown[]) => EvoData;

const anyDungeonRestrict = (evo: EvoFn) => (
    ...rest: Parameters<EvoFn>
) => restrict(
    evo(...rest),
    () => App.game.gameState == GameConstants.GameState.dungeon
);

const dungeonRestrict = <T extends EvoFn>(evo: T) => (
    dungeon: string,
    ...rest: Parameters<T>
) => restrict(
    anyDungeonRestrict(evo)(...rest),
    () => DungeonRunner.dungeon.name == dungeon
);

const anyGymRestrict = (evo: EvoFn) => (
    ...rest: Parameters<EvoFn>
) => restrict(
    evo(...rest),
    () => App.game.gameState == GameConstants.GameState.gym
);

const GymRestrict = <T extends EvoFn>(evo: T) => (
    town: string,
    ...rest: Parameters<T>
) => restrict(
    anyGymRestrict(evo)(...rest),
    () => GymRunner.gymObservable().town == town
);

const regionRestrict = <T extends EvoFn>(evo: T) => (
    regions: GameConstants.Region[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => regions.includes(player.region)
);

const environmentRestrict = <T extends EvoFn>(evo: T) => (
    environment: GameConstants.Environment,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => MapHelper.getCurrentEnvironment() == environment
);

const heldItemRestrict = <T extends EvoFn>(evo: T) => (
    heldItemName: ItemNameType,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => {
        const heldItem = App.game.party.getPokemonByName(this.basePokemon).heldItem();
        return heldItem && heldItem.name == heldItemName;
    }
);

const questlineRestrict = <T extends EvoFn>(evo: T) => (
    questName: string,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => App.game.quests.getQuestLine(questName).state() == QuestLineState.ended
);

const weatherRestrict = <T extends EvoFn>(evo: T) => (
    weather: WeatherType[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => weather.includes(Weather.currentWeather())
);

const timeRestrict = <T extends EvoFn>(evo: T) => (
    startHour: number,
    endHour: number,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    () => {
        const currentHour = new Date().getHours();
        return startHour < endHour ?
            // If the start time is before the end time, both need to be true
            currentHour >= startHour && currentHour < endHour :
            // If the start time is after the end time, only 1 needs to be true
            currentHour >= startHour || currentHour < endHour;

    }
);

const dayRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => timeRestrict(evo)(6, 18, ...rest);

const nightRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => timeRestrict(evo)(18, 6, ...rest);
