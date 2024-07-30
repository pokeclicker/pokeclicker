import UndergroundTool from './UndergroundTool';
import UndergroundToolType from './UndergroundToolType';
import { Feature } from '../../DataStore/common/Feature';
import { Observable } from 'knockout';
import { UndergroundController } from '../UndergroundController';
import { Coordinate } from '../mine/Mine';
import Rand from '../../utilities/Rand';
import OakItemType from '../../enums/OakItemType';
import Settings from '../../settings';
import { UNDERGROUND_EXPERIENCE_CLEAR_LAYER, UNDERGROUND_EXPERIENCE_DIG_UP_ITEM } from '../../GameConstants';

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
            new UndergroundTool(UndergroundToolType.Chisel, 'Chisel', 20, 2, 50, 1, (x, y) => {
                const coordinatesActuallyMined: Array<Coordinate> = [];
                if (App.game.underground.mine?.attemptBreakTile({ x, y }, 2)) {
                    coordinatesActuallyMined.push({ x, y });
                    return coordinatesActuallyMined;
                }
                return null;
            }),
            new UndergroundTool(UndergroundToolType.Hammer, 'Hammer', 60, 4, 15, 2, (x, y) => {
                let hasMined = false;
                const coordinatesActuallyMined: Array<Coordinate> = [];
                for (let deltaX = -1; deltaX <= 1; deltaX++) {
                    for (let deltaY = -1; deltaY <= 1; deltaY++) {
                        if (App.game.underground.mine?.attemptBreakTile({ x: x + deltaX, y: y + deltaY }, 1)) {
                            coordinatesActuallyMined.push({ x: x + deltaX, y: y + deltaY });
                            hasMined = true;
                        }
                    }
                }
                return hasMined ? coordinatesActuallyMined : null;
            }),
            new UndergroundTool(UndergroundToolType.Bomb, 'Bomb', 180, 9, 5, 3, () => {
                const coordinatesActuallyMined: Array<Coordinate> = [];
                const baseBombTiles: number = 10;
                const extraBombTiles: number = App.game.oakItems.isActive(OakItemType.Explosive_Charge) ? App.game.oakItems.calculateBonus(OakItemType.Explosive_Charge) : 0;

                for (let i = 0; i < baseBombTiles + extraBombTiles; i++) {
                    const randomCoordinate = App.game.underground.mine.getRandomCoordinate();
                    if (App.game.underground.mine?.attemptBreakTile(randomCoordinate, 2)) {
                        coordinatesActuallyMined.push({ x: randomCoordinate.x, y: randomCoordinate.y });
                    }
                }
                return coordinatesActuallyMined;
            }),
            new UndergroundTool(UndergroundToolType.Survey, 'Survey', 300, 0, 0, 0, () => {
                // Get a list of unmined reward coordinates
                const unminedRewardCoordinates = App.game.underground.mine.grid.reduce<number[]>((previousValue, currentValue, currentIndex) => {
                    if (currentValue.reward && currentValue.layerDepth > 0)
                        previousValue.push(currentIndex);
                    return previousValue;
                }, []);

                // Determine the range of the survey box
                const range = UndergroundController.calculateSurveyRange();
                const halfShift = Math.floor(range / 2);

                // Make a random shift
                const xShift = Rand.intBetween(-halfShift, halfShift);
                const yShift = Rand.intBetween(-halfShift, halfShift);

                const { x, y } = App.game.underground.mine.getCoordinateForGridIndex(Rand.fromArray(unminedRewardCoordinates));
                const xSurveyCoordinate = Math.max(Math.min(x + xShift, App.game.underground.mine.width - 1), 0);
                const ySurveyCoordinate = Math.max(Math.min(y + yShift, App.game.underground.mine.height - 1), 0);

                App.game.underground.mine.survey({ x: xSurveyCoordinate, y: ySurveyCoordinate }, range);
                return null;
            }),
        ];
    }

    update(delta: number) {
        this.tools.forEach(tool => tool.tick(delta));
    }

    public getTool(toolType: UndergroundToolType): UndergroundTool {
        return this.tools.find(tool => tool.id === toolType);
    }

    public getRandomTool(): UndergroundTool {
        // Don't include survey into the random tools
        return Rand.fromArray(this.tools.filter(value => value.id !== UndergroundToolType.Survey));
    }

    public useTool(toolType: UndergroundToolType, x: number, y: number): void {
        const tool = this.getTool(toolType);

        if (!tool ||
            !App.game.underground.mine ||
            App.game.underground.mine.timeUntilDiscovery > 0 ||
            (App.game.underground.mine.itemsFound >= App.game.underground.mine.itemsBuried)) {
            return;
        }

        if (tool.canUseTool()) {
            const coordinatesMined: Array<Coordinate> | null = tool.action(x, y);

            if (coordinatesMined?.length > 0) {
                App.game.oakItems.use(OakItemType.Cell_Battery);

                const itemsFound = coordinatesMined.map(coordinate => App.game.underground.mine.attemptFindItem(coordinate));
                itemsFound.forEach(value => {
                    if (value) {
                        const { item, amount } = value;

                        UndergroundController.gainMineItem(item.id, amount);
                        UndergroundController.addPlayerUndergroundExp(UNDERGROUND_EXPERIENCE_DIG_UP_ITEM);
                        UndergroundController.addHiredHelperUndergroundExp(UNDERGROUND_EXPERIENCE_DIG_UP_ITEM);

                        UndergroundController.notifyItemFound(item, amount);
                    }
                });

                UndergroundController.addPlayerUndergroundExp(tool.experiencePerUse);
                UndergroundController.addHiredHelperUndergroundExp(tool.experiencePerUse);

                if (itemsFound.length > 0) {
                    if (App.game.underground.mine.attemptCompleteLayer()) {
                        UndergroundController.addPlayerUndergroundExp(UNDERGROUND_EXPERIENCE_CLEAR_LAYER);
                        UndergroundController.addHiredHelperUndergroundExp(UNDERGROUND_EXPERIENCE_CLEAR_LAYER);

                        UndergroundController.notifyMineCompleted();

                        if (Settings.getSetting('autoRestartUndergroundMine').observableValue()) {
                            App.game.underground.generateMine(App.game.underground.autoSearchMineType);
                        }
                    }
                }
            }

            // Use a stored use, or trigger the cooldown
            if (tool.bonusCharges > 0) tool.useBonusCharge();
            else tool.cooldown = UndergroundController.calculateToolCooldown(tool);

            // Put all other tools on cooldown
            this.tools.forEach(t => {
                if (t.id !== toolType) {
                    t.cooldown = UndergroundController.calculateGlobalCooldown();
                }
            });
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
