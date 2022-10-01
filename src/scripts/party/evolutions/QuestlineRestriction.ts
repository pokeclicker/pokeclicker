/// <reference path="../../GameConstants.d.ts" />

function QuestlineRestricted<T extends Constructor<any> & MinimalEvo>(Base: T): QuestlineRestrictedT<T> {
    const Mixin = class extends Base {
        questName: string

        constructor(...args: any[]) {
            const [questName, ...rest] = args;
            super(...rest);
            this.questName = questName;
            this.type.push(EvolutionType.Questline);
        }

        isSatisfied(): boolean {
            return App.game.quests.getQuestLine(this.questName).state() == QuestLineState.ended
                && super.isSatisfied();
        }
    };

    return Mixin;
}

type QuestlineRestrictedT<T extends Constructor<any>> =
    new (questName: string,
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>
