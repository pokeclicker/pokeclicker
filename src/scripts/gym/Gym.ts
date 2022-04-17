///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="../towns/TownContent.ts"/>

/**
 * Data list that contains all gymLeaders, accessible by townName.
 */
interface gymFlags {
    quest?: boolean;
    achievement?: boolean;
}

/**
 * Gym class.
 */
class Gym extends TownContent {
    buttonText: string;
    public tooltip = 'Battle Gym Leaders to earn badges';
    public cssClass() {
        return ko.pureComputed(() => {
            if (App.game.badgeCase.hasBadge(this.badgeReward)) {
                return 'btn btn-success';
            }
            return 'btn btn-secondary';
        });
    }
    public text(): string {
        return this.buttonText;
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        GymRunner.startGym(this);
    }
    public flags = {
        quest: true,
        achievement: true,
    };

    public areaStatus(): areaStatus {
        if (Gym.isUnlocked(this)) {
            if (!App.game.badgeCase.hasBadge(this.badgeReward)) {
                return areaStatus.unlockedUnfinished;
            } else if (!Gym.isAchievementsComplete(this)) {
                return areaStatus.missingAchievement;
            }
        }
        return areaStatus.completed;
    }

    constructor(
        public leaderName: string,
        public town: string,
        public pokemons: GymPokemon[],
        public badgeReward: BadgeEnums,
        public moneyReward: number,
        public defeatMessage: string,
        requirements: (OneFromManyRequirement | Requirement)[] = [],
        public rewardFunction = () => {},
        {
            quest = true,
            achievement = true,
        }: gymFlags = {},
        buttonText = 'Gym'
    ) {
        super(requirements);
        this.flags.quest = quest;
        this.flags.achievement = achievement;
        this.buttonText = buttonText;
    }

    public static isUnlocked(gym: Gym): boolean {
        return gym.requirements.every(requirement => requirement.isCompleted());
    }

    public static isAchievementsComplete(gym: Gym) {
        const gymIndex = GameConstants.getGymIndex(gym.town);
        return AchievementHandler.achievementList.every(achievement => {
            return !(achievement.property instanceof ClearGymRequirement && achievement.property.gymIndex === gymIndex && !achievement.isCompleted());
        });
    }

    public static getLeaderByBadge(badge: BadgeEnums): string {
        for (const item in GymList) {
            const gym = GymList[item];
            if (BadgeEnums[gym.badgeReward] == BadgeEnums[BadgeEnums[badge]]) {
                return gym.leaderName;
            }
        }
        return 'Brock';
    }

    public firstWinReward() {
        // Give the player this gyms badge
        App.game.badgeCase.gainBadge(this.badgeReward);
        // Show the badge modal
        $('#receiveBadgeModal').modal('show');
        // Run the first time reward function
        this.rewardFunction();
    }

    get imagePath(): string {
        return `assets/images/gymLeaders/${GymBattle.gym.leaderName}.png`;
    }
}
