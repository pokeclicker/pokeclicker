import UndergroundTool from './UndergroundTool';
import UndergroundToolType from './UndergroundToolType';
import { Feature } from '../../DataStore/common/Feature';
import { Observable } from 'knockout';
import { UndergroundController } from '../UndergroundController';

export default class UndergroundTools implements Feature {
    name = 'Underground Tools';
    saveKey = 'undergroundTools';

    tools: UndergroundTool[] = [];
    private _selectedToolType: Observable<UndergroundToolType> = ko.observable<UndergroundToolType>(UndergroundToolType.Chisel);

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
                return App.game.underground.mine?.attemptBreakTile({ x, y }, 2);
            }),
            new UndergroundTool(UndergroundToolType.Hammer, 60, 4, 15, 2, (x, y) => {
                let hasMined = false;
                for (let deltaX = -1; deltaX <= 1; deltaX++) {
                    for (let deltaY = -1; deltaY <= 1; deltaY++) {
                        hasMined = App.game.underground.mine?.attemptBreakTile({ x: x + deltaX, y: y + deltaY }, 1) || hasMined;
                    }
                }
                return hasMined;
            }),
            new UndergroundTool(UndergroundToolType.Bomb, 180, 9, 5, 3, () => {
                for (let i = 0; i < 20; i++) {
                    App.game.underground.mine?.attemptBreakTile(App.game.underground.mine.getRandomCoordinate(), 2);
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

        if (!tool ||
            !App.game.underground.mine ||
            App.game.underground.mine.timeUntilDiscovery > 0 ||
            (App.game.underground.mine.itemsFound >= App.game.underground.mine.itemsBuried)) {
            return;
        }

        if (forced) {
            tool.action(x, y);
        } else if (tool.canUseTool()) {
            tool.action(x, y);

            // Use a stored use, or trigger the cooldown
            if (tool.storedUses > 0) tool.useStoredUse();
            else tool.cooldown = UndergroundController.calculateToolCooldown(tool);

            // Put all other tools on cooldown
            this.tools.forEach(t => {
                if (t.id !== toolType) {
                    t.cooldown = UndergroundController.calculateGlobalCooldown();
                }
            });

            App.game.underground.addUndergroundExp(tool.experiencePerUse);
        }
    }

    get selectedToolType(): UndergroundToolType {
        return this._selectedToolType();
    }

    set selectedToolType(type: UndergroundToolType) {
        this._selectedToolType(type);
    }

    fromJSON(json: Record<string, any>) {
        if (json == null) {
            return;
        }

        this.tools.forEach(tool => {
            tool.fromJSON(json[tool.id]);
        });
        this._selectedToolType(json.selectedToolType);
    }

    toJSON(): Record<string, any> {
        const save: Record<string, any> = {};
        this.tools.forEach(tool => {
            save[tool.id] = tool.toJSON();
        });
        save.selectedToolType = this._selectedToolType();
        return save;
    }
}
