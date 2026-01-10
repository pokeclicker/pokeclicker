///<reference path="BattleFrontierMilestone.ts"/>
///<reference path="BattleFrontierMilestoneItem.ts"/>

class BattleFrontierMilestones {

    public static milestoneRewards = [];

    public static addMilestone(milestone: BattleFrontierMilestone) {
        this.milestoneRewards.push(milestone);
    }

    public static availableMilestones() {
        const stage = BattleFrontierRunner.checkpoint();
        return BattleFrontierMilestones.milestoneRewards.filter(r => r.nextStageReward(stage) >= stage).sort((a, b) => a.nextStageReward(stage) - b.nextStageReward(stage))
    }

    public static gainReward(defeatedStage: number): void {
        this.milestoneRewards.forEach(r => r.clear(defeatedStage));
    }
}

BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(100, 'Deoxys', new QuestLineStepCompletedRequirement('Mystery of Deoxys', 2)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(110, 'Water_stone', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(120, 'Leaf_stone', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(130, 'Thunder_stone', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(140, 'Fire_stone', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(151, 'Deoxys (Attack)', new ObtainedPokemonRequirement('Deoxys')));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(177, 'Soul_Dew', 999, undefined, 0));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(240, 'Moon_stone', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(251, 'Deoxys (Defense)', new ObtainedPokemonRequirement('Deoxys')));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(275, 'Rare_Candy', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(320, 'Sun_stone', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(350, 'Upgrade', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(386, 'Deoxys (Speed)', new ObtainedPokemonRequirement('Deoxys')));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(400, 'Soothe_bell', 1));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(490, 'Dubious_disc', 1, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(525, 'Magmarizer', 1, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(550, 'Electirizer', 1, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(575, 'Protector', 1, new MaxRegionRequirement(GameConstants.Region.sinnoh)));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(666, 'Vivillon (Poké Ball)', new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 34), undefined, 0));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(690, 'Lopunnite', 1, new MultiRequirement([new MaxRegionRequirement(GameConstants.Region.kalos), new ObtainedPokemonRequirement('Lopunny')]), 0));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(1000, 'Masterball', 10));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(2000, 'Mismagius (Illusion)', new ObtainedPokemonRequirement('Mismagius')));
