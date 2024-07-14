import UndergroundTool from './UndergroundTool';
import UndergroundToolType from './UndergroundToolType';
import { Underground } from '../Underground';
import { Feature } from '../../DataStore/common/Feature';
import { Mine, MineStateType } from '../Mine';
import Rand from '../../utilities/Rand';

export default class UndergroundTools implements Feature {
    name = 'Underground Tools';
    saveKey = 'undergroundTools';

    tools: UndergroundTool[] = [];

    defaults: Record<string, any>;

    constructor() {
        this.tools = [];
    }

    canAccess(): boolean {
        return true;
    }

    initialize() {
        this.tools = [
            new UndergroundTool(UndergroundToolType.Chisel, 20, 2, 50, 1, (x, y) => {
                return Mine.attemptBreakTile(x, y, 2);
            }),
            new UndergroundTool(UndergroundToolType.Hammer, 60, 4, 15, 2, (x, y) => {
                let hasMined = false;
                for (let deltaX = -1; deltaX <= 1; deltaX++) {
                    for (let deltaY = -1; deltaY <= 1; deltaY++) {
                        hasMined = Mine.attemptBreakTile(x + deltaX, y + deltaY, 1) || hasMined;
                    }
                }
                return hasMined;
            }),
            new UndergroundTool(UndergroundToolType.Bomb, 180, 9, 5, 3, () => {
                for (let i = 0; i < App.game.underground.getBombEfficiency(); i++) {
                    Mine.attemptBreakTile(Rand.floor(Mine.columnCount), Rand.floor(Mine.rowCount), 2);
                }
                return true;
            }),
        ];
    }

    update(delta: number) {
        this.tools.forEach(tool => tool.tick(delta));
    }

    private getTool(toolType: UndergroundToolType): UndergroundTool {
        return this.tools.find(tool => tool.id === toolType);
    }

    public useTool(toolType: UndergroundToolType, x: number, y: number, forced: boolean = false): void {
        const tool = this.getTool(toolType);

        if (!tool || Mine.mineState !== MineStateType.Active) return;

        if (forced) {
            tool.action(x, y);
        } else if (tool.canUseTool()) {
            tool.action(x, y);

            // Use a stored use, or trigger the cooldown
            if (tool.storedUses > 0) tool.useStoredUse();
            else tool.cooldown = tool.baseCooldown - tool.cooldownReductionPerLevel * Underground.undergroundLevel();

            // Put all other tools on cooldown
            this.tools.forEach(t => {
                if (t.id !== toolType) {
                    t.cooldown = Underground.globalCooldown;
                }
            });

            Underground.addUndergroundExp(tool.experiencePerUse);
        }
    }

    fromJSON(json: Record<string, any>) {
        if (json == null) {
            return;
        }

        this.tools.forEach(tool => {
            tool.fromJSON(json[tool.id]);
        });
    }

    toJSON(): Record<string, any> {
        const save = {};
        this.tools.forEach(tool => {
            save[tool.id] = tool.toJSON();
        });
        return save;
    }
}
