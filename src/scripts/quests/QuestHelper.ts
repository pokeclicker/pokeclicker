/// <reference path="./questTypes/DefeatPokemonsQuest.ts" />
/// <reference path="./questTypes/CapturePokemonsQuest.ts" />
/// <reference path="./questTypes/GainMoneyQuest.ts" />
/// <reference path="./questTypes/GainTokensQuest.ts" />
/// <reference path="./questTypes/GainShardsQuest.ts" />
/// <reference path="./questTypes/HatchEggsQuest.ts" />
/// <reference path="./questTypes/MineLayersQuest.ts" />
/// <reference path="./questTypes/MineItemsQuest.ts" />
/// <reference path="./questTypes/CatchShiniesQuest.ts" />
/// <reference path="./questTypes/DefeatGymQuest.ts" />
/// <reference path="./questTypes/DefeatDungeonQuest.ts" />
/// <reference path="./questTypes/UsePokeballQuest.ts" />
/// <reference path="./questTypes/UseOakItemQuest.ts" />
/// <reference path="./questTypes/HarvestBerriesQuest.ts" />

class QuestHelper {

    public static quests = {
        DefeatPokemonsQuest,
        CapturePokemonsQuest,
        GainMoneyQuest,
        GainTokensQuest,
        GainShardsQuest,
        HatchEggsQuest,
        MineLayersQuest,
        MineItemsQuest,
        CatchShiniesQuest,
        DefeatGymQuest,
        DefeatDungeonQuest,
        UsePokeballQuest,
        UseOakItemQuest,
        HarvestBerriesQuest,
    }

    public static createQuest(questType: string, data?: any[]): Quest {
        if (!this.quests[questType]) {
            console.error(`Error: Invalid quest type - ${questType}.`);
            return;
        }
        // Creating randomly generated quest
        if (!data) {
            const QuestClass = this.quests[questType];
            return new QuestClass(...QuestClass.generateData());
        }
        return new this.quests[questType](...data);
    }

    public static generateQuestList(seed: number, amount = 10, uniqueQuestTypes = true) {
        const quests = [];

        SeededRand.seed(+seed);

        const QuestTypes = new Set(Object.keys(this.quests));
        const maxAttempts = 20;
        let attempts = 0;
        while (quests.length < amount && attempts++ < maxAttempts) {
            const questType = SeededRand.fromArray(Array.from(QuestTypes));
            if (uniqueQuestTypes) {
                QuestTypes.delete(questType);
            }
            if (questType == 'UseOakItemQuest' && App.game.challenges.list.disableOakItems.active()) {
                continue;
            }
            const quest = this.createQuest(questType);
            quest.index = quests.length;
            quests.push(quest);
        }
        return quests;
    }

    public static highestOneShotRoute(region: GameConstants.Region): number {
        const routes = Routes.getRoutesByRegion(region).map(r => r.number);
        const first = Math.min(...routes);
        const last = Math.max(...routes);
        const attack = Math.max(1, App.game.party.calculatePokemonAttack(PokemonType.None, PokemonType.None, false, region, true, false, false));

        for (let route = last; route >= first; route--) {
            if (PokemonFactory.routeHealth(route, region) < attack) {
                return route;
            }
        }

        return 0;
    }
}
