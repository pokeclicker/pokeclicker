import UndergroundTool from './UndergroundTool';
import UndergroundToolType from './UndergroundToolType';
import { Underground } from '../Underground';
import { Feature } from '../../DataStore/common/Feature';

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
            new UndergroundTool(UndergroundToolType.Chisel, 20, 2, 50, 1),
            new UndergroundTool(UndergroundToolType.Hammer, 60, 4, 15, 2),
            new UndergroundTool(UndergroundToolType.Bomb, 180, 9, 5, 3),
        ];
    }

    update(delta: number) {
        this.tools.forEach(tool => tool.tick(delta));
    }

    public getTool(toolType: UndergroundToolType) {
        return this.tools.find(tool => tool.id === toolType);
    }

    public canUseTool(toolType: UndergroundToolType): boolean {
        return this.tools.find(tool => tool.id === toolType)?.canUseTool() || false;
    }

    public useTool(toolType: UndergroundToolType): void {
        // Put the current tool on cooldown
        this.tools.find(tool => tool.id === toolType).use();

        // Put all tools on global cooldown
        this.tools.forEach(tool => {
            // Only put the other tools on cooldown
            if (tool.id === toolType) return;

            tool.cooldown = Underground.globalCooldown;
        });
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
