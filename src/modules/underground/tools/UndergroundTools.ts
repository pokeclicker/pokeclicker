import UndergroundTool from './UndergroundTool';
import UndergroundToolType from './UndergroundToolType';
import { Observable } from 'knockout';
import { UndergroundController } from '../UndergroundController';
import { Coordinate, Mine } from '../mine/Mine';
import Rand from '../../utilities/Rand';
import OakItemType from '../../enums/OakItemType';
import { clipNumber, SURVEY_RANGE_BASE, SURVEY_RANGE_REDUCTION_LEVELS } from '../../GameConstants';
import GameHelper from '../../GameHelper';

export default class UndergroundTools {
    tools: UndergroundTool[] = [];
    private _selectedToolType: Observable<UndergroundToolType> = ko.observable<UndergroundToolType>(UndergroundToolType.Chisel);

    constructor() {
        this.tools = [];
    }

    initialize() {
        this.tools = [
            new UndergroundTool({
                id: UndergroundToolType.Chisel,
                displayName: 'Chisel',
                description: 'Mines 2 layers on the selected spot.',
                durabilityPerUse: 0.02,
                action: (x, y) => {
                    const coordinatesActuallyMined: Array<Coordinate> = [];
                    if (App.game.underground.mine?.attemptBreakTile({ x, y }, 2)) {
                        coordinatesActuallyMined.push({ x, y });
                    }
                    return {
                        coordinatesMined: coordinatesActuallyMined,
                        success: coordinatesActuallyMined.length > 0,
                    };
                },
            }),
            new UndergroundTool({
                id: UndergroundToolType.Hammer,
                displayName: 'Hammer',
                description: 'Mines 1 layer on all 9 tiles in a 3x3 grid.',
                durabilityPerUse: 0.06,
                action: (x, y) => {
                    const coordinatesActuallyMined: Array<Coordinate> = [];
                    for (let deltaX = -1; deltaX <= 1; deltaX++) {
                        for (let deltaY = -1; deltaY <= 1; deltaY++) {
                            if (App.game.underground.mine?.attemptBreakTile({ x: x + deltaX, y: y + deltaY }, 1)) {
                                coordinatesActuallyMined.push({ x: x + deltaX, y: y + deltaY });
                            }
                        }
                    }
                    return {
                        coordinatesMined: coordinatesActuallyMined,
                        success: coordinatesActuallyMined.length > 0,
                    };
                },
            }),
            new UndergroundTool({
                id: UndergroundToolType.Bomb,
                displayName: 'Bomb',
                description: 'Mines a maximum of 2 layers on each of 10 random tiles (including fully mined tiles). The number of tiles increases when equipped with the Explosive Charge Oak Item. Items mined with the Bomb tool will have a high chance of getting destroyed in the process. You will not receive XP for destroyed items.',
                durabilityPerUse: 0.18,
                itemDestroyChance: 0.875,
                action: () => {
                    const coordinatesActuallyMined: Array<Coordinate> = [];
                    const baseBombTiles: number = 10;
                    const extraBombTiles: number = App.game.oakItems.isActive(OakItemType.Explosive_Charge) ? App.game.oakItems.calculateBonus(OakItemType.Explosive_Charge) : 0;

                    for (let i = 0; i < baseBombTiles + extraBombTiles; i++) {
                        const randomCoordinate = App.game.underground.mine.getRandomCoordinate();
                        if (App.game.underground.mine?.attemptBreakTile(randomCoordinate, 2)) {
                            coordinatesActuallyMined.push({ x: randomCoordinate.x, y: randomCoordinate.y });
                        }
                    }
                    return {
                        coordinatesMined: coordinatesActuallyMined,
                        success: true,
                    };
                },
            }),
            new UndergroundTool({
                id: UndergroundToolType.Survey,
                displayName: 'Survey',
                description: `Indicates a ${SURVEY_RANGE_BASE}x${SURVEY_RANGE_BASE} grid where at least one tile contains a treasure. The grid shrinks by two tiles in each direction every ${SURVEY_RANGE_REDUCTION_LEVELS} levels.`,
                durabilityPerUse: 1,
                customRestoreRateFn: (tool, level) => {
                    const [minimumLevel, maximumLevel] = [15, 40];
                    const deltaLevel = maximumLevel - minimumLevel;

                    const baseLog = (base, value) => Math.log(value) / Math.log(base);
                    const scale = baseLog(deltaLevel + 1, Math.min(Math.max(level - minimumLevel, 0), deltaLevel) + 1);

                    // Scale from 15 minutes to 1 minute
                    return 1 / (900 - (900 - 60) * scale);
                },
                action: () => {
                    const hiddenItemsIDSet: Set<number> = Mine.hiddenItemsIDSet(App.game.underground.mine);

                    // Get a list of unmined reward coordinates, focus on fully hidden treasures first if there are any
                    const unminedRewardCoordinates = App.game.underground.mine.grid
                        .map((tile, index) => {
                            if (!tile.reward)
                                return null;
                            if (hiddenItemsIDSet.size > 0)
                                return hiddenItemsIDSet.has(tile.reward.rewardID) ? index : null;
                            return tile.layerDepth > 0 ? index : null;
                        })
                        .filter(Number.isInteger);

                    // Determine the range of the survey box
                    const range = UndergroundController.calculateSurveyRange();
                    const halfShift = Math.floor(range / 2);

                    // Make a random shift
                    const xShift = Rand.intBetween(-halfShift, halfShift);
                    const yShift = Rand.intBetween(-halfShift, halfShift);

                    const randomUnminedGridIndex = Rand.fromArray(unminedRewardCoordinates);
                    const { x, y } = App.game.underground.mine.getCoordinateForGridIndex(randomUnminedGridIndex);
                    const xSurveyCoordinate = clipNumber(x + xShift, halfShift, App.game.underground.mine.width - 1 - halfShift);
                    const ySurveyCoordinate = clipNumber(y + yShift, halfShift, App.game.underground.mine.height - 1 - halfShift);

                    App.game.underground.mine.survey({ x: xSurveyCoordinate, y: ySurveyCoordinate }, range, App.game.underground.mine.grid[randomUnminedGridIndex].reward.rewardID);
                    return {
                        coordinatesMined: [],
                        success: true,
                    };
                },
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
            const { coordinatesMined, success } = tool.action(x, y);

            if (success) {
                GameHelper.incrementObservable(App.game.statistics.undergroundToolsUsed[tool.id]);
                UndergroundController.handleCoordinatesMined(coordinatesMined, tool.id);
                tool.reduceDurabilityByUse();
            }
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
