import * as TempTypes from './TemporaryScriptTypes';

// Where all the magic happens
declare global {
    const App: TempTypes.TmpAppType;
    const player: any;
    const Save: TempTypes.TmpSaveType;
    const MapHelper: TempTypes.TmpMapHelperType;
    const DungeonRunner: TempTypes.TmpDungeonRunnerType;
    const GymRunner: TempTypes.TmpGymRunnerType;
    const AchievementHandler: TempTypes.TmpAchievementHandlerType;
}
