class AchievementTracker implements Feature {
    name = 'AchievementTracker';
    saveKey = 'achievementTracker';
    trackedAchievement: KnockoutObservable<Achievement>;

    defaults = {
        'trackedAchievement': null,
    };

    constructor() {
        this.trackedAchievement = ko.observable(this.defaults.trackedAchievement);
    }

    initialize(): void {

    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Holo_caster);
    }

    update(delta: number): void {
    }

    nextAchievement(): void {
        if (!this.hasTrackedAchievement()) {
            return;
        }
        const tracked = this.trackedAchievement();
        let next = tracked;
        let max = Infinity;
        AchievementHandler.achievementList.forEach((current) => {
            if (tracked.property.constructor == current.property.constructor
            && (tracked.property as CaughtUniquePokemonsByRegionRequirement).region == (current.property as CaughtUniquePokemonsByRegionRequirement).region
            && (tracked.property as RouteKillRequirement).route == (current.property as RouteKillRequirement).route
            && (tracked.property as PokeballRequirement).pokeball == (current.property as PokeballRequirement).pokeball
            && (tracked.property as ClearGymRequirement).gymIndex == (current.property as ClearGymRequirement).gymIndex
            && (tracked.property as ClearDungeonRequirement).dungeonIndex == (current.property as ClearDungeonRequirement).dungeonIndex
            && (tracked.property as SeviiCaughtRequirement).shiny == (current.property as SeviiCaughtRequirement).shiny
            && (tracked.property as HatcheryHelperRequirement).bonusRequired == (current.property as HatcheryHelperRequirement).bonusRequired
            && (tracked.property as PokerusStatusRequirement).statusRequired == (current.property as PokerusStatusRequirement).statusRequired
            && tracked.property.requiredValue < current.property.requiredValue
            && current.property.requiredValue < max) {
                next = current;
                max = current.property.requiredValue;
            }
        });
        if (tracked !== next) {
            this.trackAchievement(next);
        }
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (!!json.trackedAchievementName) {
            const achievement: Achievement = AchievementHandler.findByName(json.trackedAchievementName);
            if (!!achievement) {
                this.trackedAchievement(achievement);
            }
        }
    }

    toJSON(): Record<string, any> {
        return {
            trackedAchievementName: this.hasTrackedAchievement() ? this.trackedAchievement().name : null,
        };
    }

    trackAchievement(achievement: Achievement): void {
        this.trackedAchievement(achievement);
    }

    hasTrackedAchievement(): boolean {
        return this.trackedAchievement() !== null;
    }
}
