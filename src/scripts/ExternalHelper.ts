class ExternalHelper {
    private static townCache: {[name: string] : boolean} = {};
    private static questlineCache: {[name: string] : boolean} = {};
    private static temporaryBattleCache: {[name: string] : boolean} = {};
    private static routeCache: {[name: string] : boolean} = {};
    private static gymCache: {[name: string] : boolean} = {};

    public static isInLiveVersion(content: Town | QuestLine | TemporaryBattle | RegionRoute | Gym) {
        if (content instanceof Town) {
            if (content.region > GameConstants.MAX_AVAILABLE_REGION) {
                return false;
            }
            if (ExternalHelper.townCache[content.name] == undefined) {
                ExternalHelper.townCache[content.name] = ExternalHelper.containsDevRequirement(content.requirements);
            }
            return !ExternalHelper.townCache[content.name];
        }
        if (content instanceof QuestLine) {
            if (ExternalHelper.questlineCache[content.name] == undefined) {
                ExternalHelper.questlineCache[content.name] = ExternalHelper.containsDevRequirement(content.requirement);
            }
            return !ExternalHelper.questlineCache[content.name];
        }
        if (content instanceof TemporaryBattle) {
            if (ExternalHelper.temporaryBattleCache[content.name] == undefined) {
                ExternalHelper.temporaryBattleCache[content.name] = ExternalHelper.containsDevRequirement(content.requirements);
            }
            return !ExternalHelper.temporaryBattleCache[content.name];
        }
        if (content instanceof RegionRoute) {
            if (content.region > GameConstants.MAX_AVAILABLE_REGION) {
                return false;
            }
            if (ExternalHelper.routeCache[content.routeName] == undefined) {
                ExternalHelper.routeCache[content.routeName] = ExternalHelper.containsDevRequirement(content.requirements);
            }
            return !ExternalHelper.routeCache[content.routeName];
        }
        if (content instanceof Gym) {
            if (ExternalHelper.gymCache[content.town] == undefined) {
                ExternalHelper.gymCache[content.town] = ExternalHelper.containsDevRequirement(content.requirements);
            }
            return !ExternalHelper.gymCache[content.town];
        }
        return true;
    }

    private static containsDevRequirement(requirements?: Requirement | Requirement[]) {
        if (!requirements) {
            return false;
        }
        if (requirements instanceof Requirement) {
            requirements = [requirements];
        }

        let containsDevRequirement = false;
        requirements.forEach((r) => {
            if (r instanceof DevelopmentRequirement) {
                containsDevRequirement = true;
            } else if (r instanceof QuestLineCompletedRequirement) {
                containsDevRequirement = ExternalHelper.isInLiveVersion(r.cachedQuest);
            } else if (r instanceof QuestLineStartedRequirement) {
                containsDevRequirement = ExternalHelper.isInLiveVersion(r.cachedQuest);
            } else if (r instanceof QuestLineStepCompletedRequirement) {
                containsDevRequirement = ExternalHelper.isInLiveVersion(r.cachedQuest);
            } else if (r instanceof TemporaryBattleRequirement) {
                containsDevRequirement = ExternalHelper.isInLiveVersion(TemporaryBattleList[r.battleName]);
            } else if (r instanceof RouteKillRequirement) {
                containsDevRequirement = ExternalHelper.isInLiveVersion(Routes.getRoute(r.region, r.route));
            } else if (r instanceof ClearGymRequirement) {
                containsDevRequirement = ExternalHelper.isInLiveVersion(Object.values(GymList).find(g => GameConstants.getGymIndex(g.town) == r.gymIndex));
            } else if (r instanceof MaxRegionRequirement) {
                containsDevRequirement = r.requiredValue > GameConstants.MAX_AVAILABLE_REGION;
            } else if (r instanceof ObtainedPokemonRequirement) {
                containsDevRequirement = ExternalHelper.pokemonIsInLiveVersion(r.pokemon);
            } else if (r instanceof PokemonLevelRequirement) {
                containsDevRequirement = ExternalHelper.pokemonIsInLiveVersion(r.pokemon);
            } else if (r instanceof StarterRequirement) {
                containsDevRequirement = r.region > GameConstants.MAX_AVAILABLE_REGION;
            } else if (r instanceof MultiRequirement) {
                r.requirements.forEach(r2 => {
                    if (!containsDevRequirement) {
                        containsDevRequirement = ExternalHelper.containsDevRequirement(r2);
                    }
                });
            } else if (r instanceof OneFromManyRequirement) {
                let containsNonDevRequirement = false;
                r.requirements.forEach(r2 => {
                    if (!containsNonDevRequirement) {
                        containsNonDevRequirement = !ExternalHelper.containsDevRequirement(r2);
                    }
                    containsDevRequirement = !containsNonDevRequirement;
                });
            }

            if (containsDevRequirement) {
                return false;
            }
        });
        return containsDevRequirement;
    }

    public static pokemonIsInLiveVersion(name: PokemonNameType) {
        if (PokemonHelper.calcNativeRegion(name) > GameConstants.MAX_AVAILABLE_REGION) {
            return false;
        }

        const locations = PokemonLocations.getPokemonLocations(name);
        if (!locations) {
            return false;
        }
        //TODO: run ExternalHelper.isInLiveVersion for each location

        return true;
    }
}
