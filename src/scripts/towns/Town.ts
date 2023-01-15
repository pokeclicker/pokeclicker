///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="NPC.ts"/>
///<reference path="KantoBerryMasterNPC.ts"/>
///<reference path="ProfNPC.ts"/>
///<reference path="RoamerNPC.ts"/>
///<reference path="TownContent.ts"/>

type TownOptionalArgument = {
    requirements?: Requirement[],
    npcs?: NPC[],
    ignoreAreaStatus?: boolean
};

class Town {
    public name: string;
    public region: GameConstants.Region;
    public requirements: Requirement[];
    public dungeon?: Dungeon;
    public npcs?: NPC[];
    public startingTown: boolean;
    public content: TownContent[];
    public subRegion: GameConstants.SubRegions;
    public ignoreAreaStatus: boolean;

    constructor(
        name: string,
        region: GameConstants.Region,
        subRegion: GameConstants.SubRegions,
        content: TownContent[] = [],
        // Optional arguments are in a named object, so that we don't need
        // to pass undefined to get to the one we want
        optional: TownOptionalArgument = {}
    ) {
        this.name = name;
        this.region = region;
        this.requirements = optional.requirements || [];
        this.npcs = optional.npcs;
        this.startingTown = GameConstants.StartingTowns.includes(this.name);
        this.content = content;
        this.subRegion = subRegion;
        this.ignoreAreaStatus = optional.ignoreAreaStatus ?? false;

        if (GymList[name]) {
            const gym = GymList[name];
            this.content.unshift(gym);
        }
        if (GameConstants.DockTowns.includes(name)) {
            this.content.push(new DockTownContent());
        }
        if (GameConstants.StartingTowns.includes(name)) {
            this.content.push(new NextRegionTownContent());
        }
        content.forEach((c) => {
            c.addParent(this);
        });
    }

    public isUnlocked() {
        return this.requirements.every(requirement => requirement.isCompleted());
    }
}

class DungeonTown extends Town {
    dungeon: Dungeon

    constructor(name: string, region: GameConstants.Region, subregion: GameConstants.SubRegions, requirements: Requirement[] = [], content: TownContent[] = [], optional: TownOptionalArgument = {}) {
        optional.requirements = requirements;
        super(name, region, subregion, content, optional);
        this.dungeon = dungeonList[name];
    }
}
