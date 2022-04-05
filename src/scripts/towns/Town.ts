///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="NPC.ts"/>
///<reference path="KantoBerryMasterNPC.ts"/>
///<reference path="ProfOakNPC.ts"/>
///<reference path="RoamerNPC.ts"/>

type TownOptionalArgument = {
    requirements?: (Requirement | OneFromManyRequirement)[],
    shops?: Shop[],
    dungeon?: Dungeon,
    npcs?: NPC[],
};

class Town {
    public name: string;
    public region: GameConstants.Region;
    public gym?: Gym;
    public requirements: (Requirement | OneFromManyRequirement)[];
    public shops: Shop[];
    public dungeon?: Dungeon;
    public npcs?: NPC[];
    public startingTown: boolean;

    constructor(
        name: string,
        region: GameConstants.Region,
        // Optional arguments are in a named object, so that we don't need
        // to pass undefined to get to the one we want
        optional: TownOptionalArgument = {}
    ) {
        this.name = name;
        this.region = region;
        this.gym = gymList[name];
        this.requirements = optional.requirements || [];
        this.shops = optional.shops || [];
        this.dungeon = optional.dungeon;
        this.npcs = optional.npcs;
        this.startingTown = GameConstants.StartingTowns.includes(this.name);
    }

    public isUnlocked() {
        return this.requirements.every(requirement => requirement.isCompleted());
    }
}

class DungeonTown extends Town {
    constructor(name: string, region: GameConstants.Region, requirements: (Requirement | OneFromManyRequirement)[] = []) {
        super(name, region, { requirements, dungeon: dungeonList[name] });
    }
}
