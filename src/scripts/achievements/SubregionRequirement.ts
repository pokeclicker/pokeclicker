///<reference path="../../declarations/requirements/Requirement.d.ts"/>
///<reference path="../../declarations/subRegion/SubRegions.d.ts"/>

class SubregionRequirement extends Requirement {
    constructor(public region: GameConstants.Region, public subregion: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(subregion, option);
    }

    public getProgress() {
        return player.subregion;
    }

    public hint(): string {
        return `You need to be in the ${SubRegions.getSubRegionById(this.region, this.subregion)} subregion of ${GameConstants.camelCaseToString(GameConstants.Region[this.region])}.`;
    }

    public getProgressPercentage() {
        return this.region == player.region && this.subregion == player.subregion ? '100' : '0';
    }

    public isCompleted() {
        return this.region == player.region && this.subregion == player.subregion;
    }
}
