///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../../declarations/enums/Badges.d.ts"/>

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
class Gym {
    public flags = {
        quest: true,
        achievement: true,
    };

    constructor(
        public leaderName: string,
        public town: string,
        public pokemons: GymPokemon[],
        public badgeReward: BadgeEnums,
        public moneyReward: number,
        public defeatMessage: string,
        public requirements: (OneFromManyRequirement | Requirement)[] = [],
        public rewardFunction = () => {},
        {
            quest = true,
            achievement = true,
        }: gymFlags = {}
    ) {
        this.flags.quest = quest;
        this.flags.achievement = achievement;
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

    public static calculateCssClass(gym: Gym): KnockoutComputed<string> {
        return ko.pureComputed(() => {
            if (App.game.badgeCase.hasBadge(gym.badgeReward)) {
                return 'btn btn-success';
            }
            return 'btn btn-secondary';
        });
    }

    public static getLeaderByBadge(badge: BadgeEnums): string {
        for (const item in gymList) {
            const gym = gymList[item];
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
