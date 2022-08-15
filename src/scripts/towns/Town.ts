///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="NPC.ts"/>
///<reference path="KantoBerryMasterNPC.ts"/>
///<reference path="ProfNPC.ts"/>
///<reference path="RoamerNPC.ts"/>
///<reference path="TownContent.ts"/>

type TownOptionalArgument = {
    requirements?: Requirement[],
    npcs?: NPC[],
};

class Town {
    public name: string;
    public region: GameConstants.Region;
    public requirements: Requirement[];
    public dungeon?: Dungeon;
    public npcs?: NPC[];
    public startingTown: boolean;
    public content: TownContent[];

    constructor(
        name: string,
        region: GameConstants.Region,
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

    constructor(name: string, region: GameConstants.Region, requirements: Requirement[] = [], content: TownContent[] = [], npcs: NPC[] = []) {
        super(name, region, content, { requirements, npcs });
        this.dungeon = dungeonList[name];
    }
}
