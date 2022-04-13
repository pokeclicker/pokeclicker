///<reference path="BattleFrontierMilestone.ts"/>
///<reference path="BattleFrontierMilestoneItem.ts"/>

class BattleFrontierMilestones {

    public static milestoneRewards = [];

    public static addMilestone(milestone: BattleFrontierMilestone) {
        this.milestoneRewards.push(milestone);
        // Sort the milestones by lowest to highest stage incase they are added out of order
        this.milestoneRewards.sort((a, b) => a.stage - b.stage);
    }

    public static nextMileStone() {
        // Get the next possible reward
        return this.milestoneRewards.find(r => !r.obtained());
    }

    public static availableMilestones() {
        return BattleFrontierMilestones.milestoneRewards.filter(r => !r.obtained());
    }

    public static nextMileStoneStage(): number {
        // Return the stage number the next reward is unlocked at
        const reward = this.nextMileStone();
        if (reward) {
            return reward.stage;
        } else {
            return Infinity;
        }
    }

    public static nextMileStoneRewardDescription(): string {
        // Return the description of the next reward
        const reward = this.nextMileStone();
        if (reward) {
            return reward.description;
        } else {
            return 'Nothing';
        }
    }

    public static gainReward(defeatedStage: number): void {
        const reward = this.nextMileStone();
        if (reward && reward.stage == defeatedStage) {
            Notifier.notify({
                title: '[Battle Frontier]',
                message: `You've successfully defeated stage ${defeatedStage} and earned:\n<span>${reward.description}</span>!`,
                type: NotificationConstants.NotificationOption.info,
                setting: NotificationConstants.NotificationSetting.General.battle_frontier,
                timeout: 1e4,
            });
            reward.gain();
        }
    }
}

// TODO: update rewards
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(5, 'Pokeball', 25));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(10, 'Pokeball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(20, 'Greatball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(30, 'Ultraball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(35, 'xClick', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(40, 'xAttack', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(50, 'SmallRestore', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(100, 'Deoxys'));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(110, 'Water_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(120, 'Leaf_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(130, 'Thunder_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(140, 'Fire_stone', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(150, 'MediumRestore', 200));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(151, 'Deoxys (attack)'));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(160, 'Lucky_egg', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(170, 'Lucky_incense', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(180, 'Item_magnet', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(190, 'Mystery_egg', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(200, 'LargeRestore', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(210, 'Water_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(220, 'Leaf_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(230, 'Thunder_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(240, 'Moon_stone', 40));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(250, 'Ultraball', 6400));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(251, 'Deoxys (defense)'));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(300, 'Trade_stone', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(386, 'Deoxys (speed)'));
