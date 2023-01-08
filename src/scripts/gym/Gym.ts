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
    champion?: boolean;
}

/**
 * Gym class.
 */
class Gym extends TownContent {
    buttonText: string;
    public tooltip = 'Battle Gym Leaders to earn badges';
    public cssClass() {
        if (App.game.badgeCase.hasBadge(this.badgeReward)) {
            return 'btn btn-success';
        }
        return 'btn btn-secondary';
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
        champion: false,
    };

    public areaStatus(): areaStatus {
        if (!this.isUnlocked()) {
            return areaStatus.locked;
        } else if (!App.game.badgeCase.hasBadge(this.badgeReward)) {
            return areaStatus.unlockedUnfinished;
        } else if (this.isThereQuestAtLocation()) {
            return areaStatus.questAtLocation;
        } else if (!this.isAchievementsComplete()) {
            return areaStatus.missingAchievement;
        }
        return areaStatus.completed;
    }

    public clears() {
        if (!QuestLineHelper.isQuestLineCompleted('Tutorial Quests')) {
            return undefined;
        }
        return App.game.statistics.gymsDefeated[GameConstants.getGymIndex(this.town)]();
    }

    constructor(
        public leaderName: string,
        public town: string,
        private pokemons: GymPokemon[],
        public badgeReward: BadgeEnums,
        public moneyReward: number,
        public defeatMessage: string,
        requirements: Requirement[] = [],
        public rewardFunction = () => {},
        {
            quest = true,
            achievement = true,
            champion = false,
        }: gymFlags = {},
        public displayName?: string
    ) {
        super(requirements);
        this.flags.quest = quest;
        this.flags.achievement = achievement;
        this.flags.champion = champion;
        if (displayName) {
            this.buttonText = displayName;
        } else if (!town.includes('Elite') && !town.includes('Champion') && !town.includes('Supreme')) {
            this.buttonText = `${leaderName}'s Gym`;
        } else {
            this.buttonText = town;
        }
    }

    private isAchievementsComplete() {
        const gymIndex = GameConstants.getGymIndex(this.town);
        return AchievementHandler.achievementList.every(achievement => {
            return !(achievement.property instanceof ClearGymRequirement && achievement.property.gymIndex === gymIndex && !achievement.isCompleted());
        });
    }

    private isThereQuestAtLocation() {
        return App.game.quests.currentQuests().some(q => {
            return q instanceof DefeatGymQuest && q.gymTown == this.town;
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

    public getPokemonList() {
        return this.pokemons.filter((p) => p.requirements.every((r => r.isCompleted())));
    }
}
