import * as TempTypes from './TemporaryScriptTypes';

/*
    Globals declared here also need to be listed in .eslintrc.js
*/

// Where all the magic happens
declare global {
    const App: TempTypes.TmpAppType;
    const player: TempTypes.TmpPlayerType;
    const Save: TempTypes.TmpSaveType;
    const MapHelper: TempTypes.TmpMapHelperType;
    const DungeonRunner: TempTypes.TmpDungeonRunnerType;
    const GymRunner: TempTypes.TmpGymRunnerType;
    const AchievementHandler: TempTypes.TmpAchievementHandlerType;
    const PokemonLocations: TempTypes.TmpPokemonLocationsType;
    const PokemonFactory: TempTypes.TmpPokemonFactoryType;
    const PartyController: TempTypes.TmpPartyControllerType;
    const TemporaryBattleList: TempTypes.TmpTemporaryBattleListType;
    const BagHandler: TempTypes.TmpBagHandlerType;
    const EvolutionStone: TempTypes.TmpEvolutionStoneType;
    const GymList: TempTypes.TmpGymListType;
    const VeteranShop: TempTypes.TmpVeteranShopType;
    const dungeonList: TempTypes.TmpDungeonListType;
    const TownList: TempTypes.TmpTownListType;
    const DisplayObservables: TempTypes.TmpDisplayObservablesType;
}
