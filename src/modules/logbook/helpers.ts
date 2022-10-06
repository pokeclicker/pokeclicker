type RecordOf<Keys extends string[]> = {
    [K in Keys[number]]: string;
};

type ContentHelper<Vars = undefined>
    = Vars extends undefined ? () => { key: LogContentKey }
        : Vars extends string[] ? (vars: RecordOf<Vars>) => { key: LogContentKey; vars: RecordOf<Vars>; }
            : never;

export type LogContent = {
    key: LogContentKey,
    vars?: Record<string, string>
};

const contentHelper = <Vars>(key: LogContentKey) => (vars?: Vars) => ({
    key,
    vars,
});

// These should match the translation keys in the translation repo
export enum LogContentKey {
    'notTranslated' = 'notTranslated',
    'earnedAchievement' = 'earnedAchievement',
    'escapedShiny' = 'escapedShiny',
    'escapedWild' = 'escapedWild',
    'encounterShiny' = 'encounterShiny',
    'encounterWild' = 'encounterWild',
    'gainBattleFrontierReward' = 'gainBattleFrontierReward',
    'gainBattleFrontierPoints' = 'gainBattleFrontierPoints',
    'hatchedShiny' = 'hatchedShiny',
    'hatchedShinyDupe' = 'hatchedShinyDupe',
    'unableToPayHatcheryHelper' = 'unableToPayHatcheryHelper',
    'unableToPayFarmHand' = 'unableToPayFarmHand',
    'registeredBerry' = 'registeredBerry',
    'shinyWander' = 'shinyWander',
    'shinyWanderDupe' = 'shinyWanderDupe',
    'wildWander' = 'wildWander',
    'fluteRanOutOfGems' = 'fluteRanOutOfGems',
    'purchasedShiny' = 'purchasedShiny',
    'purchasedShinyDupe' = 'purchasedShinyDupe',
    'evolvedShiny' = 'evolvedShiny',
    'evolvedShinyDupe' = 'evolvedShinyDupe',
    'captured' = 'captured',
    'capturedShiny' = 'capturedShiny',
    'capturedShinyDupe' = 'capturedShinyDupe',
    'enemyDrop' = 'enemyDrop',
    'roamer' = 'roamer',
    'roamerShiny' = 'roamerShiny',
    'completedQuest' = 'completedQuest',
    'completedQuestWithPoints' = 'completedQuestWithPoints',
    'questLevelUp' = 'questLevelUp',
}

// helper functions to make sure we don't forget any needed parameters
// parameters for each translation are defined as a type level list
const notTranslated: ContentHelper<['text']> = contentHelper(LogContentKey.notTranslated);
const earnedAchievement: ContentHelper<['name']> = contentHelper(LogContentKey.earnedAchievement);
const escapedShiny: ContentHelper<['pokemon']> = contentHelper(LogContentKey.escapedShiny);
const escapedWild: ContentHelper<['pokemon']> = contentHelper(LogContentKey.escapedWild);
const encounterShiny: ContentHelper<['location', 'pokemon']> = contentHelper(LogContentKey.encounterShiny);
const encounterWild: ContentHelper<['location', 'pokemon']> = contentHelper(LogContentKey.encounterWild);
const gainBattleFrontierReward: ContentHelper<['reward', 'stage']> = contentHelper(LogContentKey.gainBattleFrontierReward);
const gainBattleFrontierPoints: ContentHelper<['stage', 'points']> = contentHelper(LogContentKey.gainBattleFrontierPoints);
const hatchedShiny: ContentHelper<['pokemon']> = contentHelper(LogContentKey.hatchedShiny);
const hatchedShinyDupe: ContentHelper<['pokemon']> = contentHelper(LogContentKey.hatchedShinyDupe);
const unableToPayHatcheryHelper: ContentHelper<['currency', 'name']> = contentHelper(LogContentKey.unableToPayHatcheryHelper);
const unableToPayFarmHand: ContentHelper<['name']> = contentHelper(LogContentKey.unableToPayFarmHand);
const registeredBerry: ContentHelper<['berry']> = contentHelper(LogContentKey.registeredBerry);
const shinyWander: ContentHelper<['pokemon']> = contentHelper(LogContentKey.shinyWander);
const shinyWanderDupe: ContentHelper<['pokemon']> = contentHelper(LogContentKey.shinyWanderDupe);
const wildWander: ContentHelper<['pokemon']> = contentHelper(LogContentKey.wildWander);
const fluteRanOutOfGems: ContentHelper<['flute']> = contentHelper(LogContentKey.fluteRanOutOfGems);
const purchasedShiny: ContentHelper<['pokemon']> = contentHelper(LogContentKey.purchasedShiny);
const purchasedShinyDupe: ContentHelper<['pokemon']> = contentHelper(LogContentKey.purchasedShinyDupe);
const evolvedShiny: ContentHelper<['basePokemon', 'evolvedPokemon']> = contentHelper(LogContentKey.evolvedShiny);
const evolvedShinyDupe: ContentHelper<['basePokemon', 'evolvedPokemon']> = contentHelper(LogContentKey.evolvedShinyDupe);
const captured: ContentHelper<['pokemon']> = contentHelper(LogContentKey.captured);
const capturedShiny: ContentHelper<['pokemon']> = contentHelper(LogContentKey.capturedShiny);
const capturedShinyDupe: ContentHelper<['pokemon']> = contentHelper(LogContentKey.capturedShinyDupe);
const enemyDrop: ContentHelper<['pokemon', 'item']> = contentHelper(LogContentKey.enemyDrop);
const roamer: ContentHelper<['location', 'pokemon']> = contentHelper(LogContentKey.roamer);
const roamerShiny: ContentHelper<['location', 'pokemon']> = contentHelper(LogContentKey.roamerShiny);
const completedQuest: ContentHelper<['quest']> = contentHelper(LogContentKey.completedQuest);
const completedQuestWithPoints: ContentHelper<['quest', 'questPoints']> = contentHelper(LogContentKey.completedQuestWithPoints);
const questLevelUp: ContentHelper<['level']> = contentHelper(LogContentKey.questLevelUp);

export const createLogContent = {
    notTranslated,
    earnedAchievement,
    escapedShiny,
    escapedWild,
    encounterShiny,
    encounterWild,
    gainBattleFrontierReward,
    gainBattleFrontierPoints,
    hatchedShiny,
    hatchedShinyDupe,
    unableToPayHatcheryHelper,
    unableToPayFarmHand,
    registeredBerry,
    shinyWander,
    shinyWanderDupe,
    wildWander,
    fluteRanOutOfGems,
    purchasedShiny,
    purchasedShinyDupe,
    evolvedShiny,
    evolvedShinyDupe,
    captured,
    capturedShiny,
    capturedShinyDupe,
    enemyDrop,
    roamer,
    roamerShiny,
    completedQuest,
    completedQuestWithPoints,
    questLevelUp,
};
