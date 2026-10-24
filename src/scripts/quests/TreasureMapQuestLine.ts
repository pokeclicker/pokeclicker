/// <reference path="./QuestLine.ts" />

class TreasureMapQuestLine extends QuestLine {
    public dungeon: string;
    public amount: number;

    constructor(saved?: { dungeon?: string, amount?: number }) {
        super('Pirate Treasure Map', 'You obtained a Treasure Map.');

        let dungeon = saved?.dungeon ? dungeonList[saved.dungeon] : undefined;
        let amount = saved?.amount;

        if (!dungeon || !(amount > 0)) {
            SeededRand.seedWithDate(new Date());
            const unlockedDungeons = Object.values(dungeonList).filter(x => x.difficulty == player.highestRegion() && TownList[x.name].isUnlocked());
            dungeon = SeededRand.fromArray(unlockedDungeons) ?? Object.values(dungeonList)[0];
            amount = SeededRand.intBetween(1, dungeon.difficulty);
        }

        this.dungeon = dungeon.name;
        this.amount = amount;

        const rewardTotal = 90 + 6 * player.highestRegion();

        this.addQuest(new DefeatDungeonQuest(amount, undefined, dungeon.name).withDescription(`The map you obtained says there is a treasure waiting in ${dungeon.name}. Go clear it out.`).withCustomReward(() => {
            BagHandler.gainItem({ type: ItemType.item, id: 'Relic_gold' }, rewardTotal);
            Notifier.notify({
                message: `You found the pirate treasure containing ${rewardTotal} Pirate Coins!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dropped_item,
            });
        }));
    }

    toJSON() {
        return {
            ...super.toJSON(),
            dungeon: this.dungeon,
            amount: this.amount,
        };
    }
}
