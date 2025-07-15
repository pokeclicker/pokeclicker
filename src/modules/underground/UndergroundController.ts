import OakItemType from '../enums/OakItemType';
import Rand from '../utilities/Rand';
import { MineConfig, MineConfigs, MineType } from './mine/MineConfig';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';
import { ItemList } from '../items/ItemList';
import Settings from '../settings';
import { PureComputed } from 'knockout';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import {
    camelCaseToString,
    DISCOVER_MINE_TIMEOUT_BASE,
    DISCOVER_MINE_TIMEOUT_LEVEL_START,
    DISCOVER_MINE_TIMEOUT_REDUCTION_PER_LEVEL,
    HELPER_EXPERIENCE_PLAYER_FRACTION,
    humanifyString,
    PLATE_VALUE,
    PLAYER_EXPERIENCE_HELPER_FRACTION,
    Region,
    SECOND,
    SPECIAL_MINE_CHANCE,
    SURVEY_RANGE_BASE,
    SURVEY_RANGE_REDUCTION_LEVELS,
    UNDERGROUND_EXPERIENCE_CLEAR_LAYER,
    UNDERGROUND_EXPERIENCE_DIG_UP_ITEM,
} from '../GameConstants';
import { UndergroundHelper } from './helper/UndergroundHelper';
import NotificationOption from '../notifications/NotificationOption';
import GameHelper from '../GameHelper';
import { Coordinate } from './mine/Mine';
import { SortOptionConfigs, SortOptions } from './UndergroundTreasuresSortOptions';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import UndergroundToolType from './tools/UndergroundToolType';

export const UNDERGROUND_MAX_CLICKS_PER_SECOND = 20;

export class UndergroundController {
    private static lastMineClick: number = Date.now();

    public static organisedTreasuresList = ko.pureComputed(() => {
        const exceptions = [ UndergroundItemValueType.MegaStone ];
        const list = UndergroundItems.list
            .filter(item => !exceptions.includes(item.valueType))
            .filter(item => item.isUnlocked() || Settings.getSetting('undergroundTreasureDisplayShowLocked').observableValue())
            .sort(UndergroundController.organisedTreasuresListCompareBy(Settings.getSetting('undergroundTreasureDisplaySorting').observableValue(), Settings.getSetting('undergroundTreasureDisplaySortingDirection').observableValue()));

        switch (Settings.getSetting('undergroundTreasureDisplayGrouping').observableValue()) {
            case 'type':
                return GameHelper.enumNumbers(UndergroundItemValueType)
                    .filter(value => !exceptions.includes(value))
                    .map(enumValue => {
                        return {
                            title: camelCaseToString(GameHelper.enumStrings(UndergroundItemValueType)[enumValue]),
                            treasures: list.filter(item => item.valueType === enumValue),
                        };
                    })
                    .filter(value => value.treasures.length > 0);
            case 'sellable':
                return [{
                    title: 'Can be sold',
                    treasures: list.filter(item => item.hasSellValue()),
                }, {
                    title: 'Cannot be sold',
                    treasures: list.filter(item => !item.hasSellValue()),
                }];
            case 'region':
                return GameHelper.enumNumbers(Region).sort((a, b) => a - b)
                    .map(enumValue => {
                        return {
                            title: camelCaseToString(Region[enumValue]),
                            treasures: list.filter(item => (!(item.requirement instanceof MaxRegionRequirement) && enumValue === Region.none) ||
                                (item.requirement instanceof MaxRegionRequirement && (item.requirement as MaxRegionRequirement).requiredValue === enumValue)),
                        };
                    })
                    .filter(value => value.treasures.length > 0);
            case 'none':
            default:
                return [{
                    title: 'All',
                    treasures: list,
                }];
        }
    });

    public static shortcutVisible: PureComputed<boolean> = ko.pureComputed(() => {
        return App.game.underground.canAccess() && !Settings.getSetting('showUndergroundModule').observableValue();
    });

    public static rotateMatrix90Clockwise<T>(matrix: Array<Array<T>>, rotations: number = 1): Array<Array<T>> {
        const rotate = (m) => m[0].map((_, colIndex) =>
            m.map(row => row[colIndex]).reverse(),
        );

        let returnMatrix = matrix;

        while (rotations > 0) {
            returnMatrix = rotate(returnMatrix);
            --rotations;
        }

        return returnMatrix;
    }

    public static calculateRewardAmountFromMining(): number {
        if (!App.game.oakItems.isActive(OakItemType.Treasure_Scanner)) {
            return 1;
        }

        // Treasure scanner bonus is listed as integers, so we need to divide by 100
        const treasureScannerChance = App.game.oakItems.calculateBonus(OakItemType.Treasure_Scanner) / 100;

        let amount = 1;
        while (Rand.chance(treasureScannerChance)) {
            ++amount;
        }
        return amount;
    }

    public static generateMineConfig(mineType: MineType, helper: UndergroundHelper = undefined): MineConfig {
        if (Rand.chance(SPECIAL_MINE_CHANCE) && (!helper || helper.canGenerateSpecial) && MineConfigs.find(MineType.Special).getAvailableItems().length > 0) {
            return MineConfigs.find(MineType.Special);
        }

        return MineConfigs.find(mineType) || MineConfigs.find(MineType.Random);
    }

    public static getMineConfig(mineType: MineType) {
        return MineConfigs.find(mineType);
    }

    public static calculateDiscoverMineTimeout(mineType: MineType): number {
        const baseTimeout = Math.max(
            DISCOVER_MINE_TIMEOUT_BASE - DISCOVER_MINE_TIMEOUT_REDUCTION_PER_LEVEL * Math.max(0, App.game.underground.undergroundLevel - DISCOVER_MINE_TIMEOUT_LEVEL_START),
            0,
        );

        if (mineType === MineType.Random) {
            if (App.game.underground.mine?.mineType === MineType.Random) {
                const rewardTiles = App.game.underground.mine.grid.filter(tile => tile.reward);
                const unminedRewardTiles = rewardTiles.filter(tile => tile.layerDepth > 0);
                return baseTimeout * (unminedRewardTiles.length / rewardTiles.length);
            }
        } else {
            return baseTimeout;
        }

        return 0;
    }

    public static calculateSurveyRange(): number {
        return Math.max(SURVEY_RANGE_BASE - 2 * Math.floor(App.game.underground.undergroundLevel / SURVEY_RANGE_REDUCTION_LEVELS), 1);
    }

    public static gainMineItem(id: number, amount: number = 1) {
        const item = UndergroundItems.getById(id);
        ItemList[item.itemName].gain(amount);
    }

    public static sellMineItem(item: UndergroundItem, amount: number = 1) {
        if (item.sellLocked()) {
            Notifier.notify({
                message: 'Item is locked for selling, you first have to unlock it.',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }
        if (amount <= 0) {
            return;
        }
        const curAmt = player.itemList[item.itemName]();
        if (curAmt > 0) {
            const sellAmt = Math.min(curAmt, amount);
            const success = UndergroundController.gainProfit(item, sellAmt);
            if (success) {
                player.loseItem(item.itemName, sellAmt);
            }
            return;
        }
    }

    public static gainProfit(item: UndergroundItem, amount: number, percentage: number = 1): boolean {
        if (amount <= 0) {
            return false;
        }
        let success = true;
        switch (item.valueType) {
            case UndergroundItemValueType.Diamond:
                App.game.wallet.gainDiamonds(Math.floor(item.value * amount * percentage));
                break;
            case UndergroundItemValueType.Gem:
                const type = item.type;
                App.game.gems.gainGems(Math.floor(PLATE_VALUE * amount * percentage), type);
                break;
            // Nothing else can be sold
            default:
                return false;
        }
        return success;
    }

    public static openUndergroundModal() {
        if (App.game.underground.canAccess()) {
            $('#mineModal').modal('show');
        } else {
            Notifier.notify({
                title: 'Underground',
                message: 'You need the Explorer Kit to access this location.\n<i>Check out the shop at Cinnabar Island.</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static clickModalMineSquare(index: number) {
        const now = Date.now();

        if (this.lastMineClick > now - (1000 / UNDERGROUND_MAX_CLICKS_PER_SECOND)) {
            return;
        }
        this.lastMineClick = now;

        const coordinates = App.game.underground.mine.getCoordinateForGridIndex(index);
        App.game.underground.tools.useTool(App.game.underground.tools.selectedToolType, coordinates.x, coordinates.y);
    }

    public static handleCoordinatesMined(coordinates: Coordinate[], toolType: UndergroundToolType | null, helper: UndergroundHelper = undefined) {
        if (coordinates.length === 0) {
            return;
        }

        const itemsFound = coordinates
            .map(coordinate => App.game.underground.mine.attemptFindItem(coordinate))
            .filter(item => item);

        // Handle gaining items
        itemsFound.forEach(item => {
            const amount = UndergroundController.calculateRewardAmountFromMining();

            App.game.oakItems.use(OakItemType.Treasure_Scanner);
            GameHelper.incrementObservable(App.game.statistics.undergroundItemsFound, amount);
            GameHelper.incrementObservable(App.game.statistics.undergroundSpecificItemsFound[item.id], amount);

            if (Rand.chance(App.game.underground.tools.getTool(toolType)?.itemDestroyChance ?? 0)) {
                UndergroundController.notifyItemDestroyed(item, amount, helper);
                return;
            }

            UndergroundController.notifyItemFound(item, amount, helper);

            if (helper) {
                if (Rand.chance(helper.rewardRetention)) {
                    // Helper keeps the reward
                    helper.retainItem(item, amount);
                } else {
                    UndergroundController.gainMineItem(item.id, amount);
                }

                UndergroundController.addHiredHelperUndergroundExp(UNDERGROUND_EXPERIENCE_DIG_UP_ITEM, true);
            } else {
                UndergroundController.gainMineItem(item.id, amount);
                UndergroundController.addPlayerUndergroundExp(UNDERGROUND_EXPERIENCE_DIG_UP_ITEM, true);
            }
        });

        // Handle new mine
        if (itemsFound.length > 0) {
            if (App.game.underground.mine.attemptCompleteLayer()) {
                UndergroundController.notifyMineCompleted(helper);

                if (App.game.underground.mine.grid.every((tile) => tile.layerDepth === 0)) {
                    GameHelper.incrementObservable(App.game.statistics.undergroundLayersFullyMined);
                }

                if (helper) {
                    UndergroundController.addHiredHelperUndergroundExp(UNDERGROUND_EXPERIENCE_CLEAR_LAYER, true);

                    if (helper.shouldDiscoverFavorite) {
                        App.game.underground.generateMine(Rand.chance(helper.favoriteMineChance) ? helper.favoriteMine : MineType.Random, helper);
                    } else {
                        App.game.underground.generateMine(MineType.Random, helper);
                    }
                } else {
                    UndergroundController.addPlayerUndergroundExp(UNDERGROUND_EXPERIENCE_CLEAR_LAYER, true);

                    if (Settings.getSetting('autoRestartUndergroundMine').observableValue()) {
                        App.game.underground.generateMine(App.game.underground.autoSearchMineType);
                    }
                }
            }
        }
    }

    public static calculateMineTileStyle(index: number) {
        if (!App.game.underground.mine.grid[index]?.reward) {
            return {};
        }

        const { layerDepth, reward } = App.game.underground.mine.grid[index];

        if (layerDepth === 0 && reward) {
            const { space, undergroundImage } = UndergroundItems.getById(reward.undergroundItemID);

            return {
                'background-image': `url('${undergroundImage}')`,
                'background-position': reward.backgroundPosition,
                'background-size': `${space[0].length * 100}% ${space.length * 100}%`,
                'transform': `rotate(${reward.rotations * 90}deg)`,
                'filter': `opacity(${reward.rewarded ? '25%' : '100%'})`,
            };
        }
        return {};
    }

    public static addGlobalUndergroundExp(experience: number) {
        this.addPlayerUndergroundExp(experience, false);
        this.addHiredHelperUndergroundExp(experience, false);
    }

    public static addPlayerUndergroundExp(experience: number, share: boolean = false) {
        App.game.underground.addUndergroundExp(experience);

        if (share) {
            this.addHiredHelperUndergroundExp(+(experience * PLAYER_EXPERIENCE_HELPER_FRACTION).toFixed(1), false);
        }
    }

    public static addHiredHelperUndergroundExp(experience: number, share: boolean = false) {
        App.game.underground.helpers.hired().forEach(value => value.addExp(experience));

        if (share) {
            this.addPlayerUndergroundExp(+(experience * HELPER_EXPERIENCE_PLAYER_FRACTION).toFixed(1), false);
        }
    }

    public static notifyMineCompleted(helper?: UndergroundHelper) {
        Notifier.notify({
            title: 'Underground',
            message: helper ? `${helper.name} dug deeper...` : 'You dug deeper...',
            type: NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.Underground.underground_dig_deeper,
        });
    }

    public static notifyItemFound(item: UndergroundItem, amount: number, helper?: UndergroundHelper) {
        const { name: itemName, image } = item;

        Notifier.notify({
            title: 'Underground',
            message: `<img src="${image}" height="24px" class="pixelated"/> ${helper?.name ?? 'You'} found ${GameHelper.anOrA(itemName)} ${humanifyString(itemName)}.`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
            timeout: 3000,
        });

        for (let i = 1; i < amount; i++) {
            let message = `${helper?.name ?? 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;
            if (i === 2) message = `Lucky! ${helper?.name ?? 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;
            else if (i === 3) message = `Jackpot! ${helper?.name ?? 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;
            else if (i > 3) message = `Jackpot ×${i - 2}! ${helper?.name ?? 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;

            Notifier.notify({
                title: 'Treasure Scanner',
                message: `<img src="${image}" height="24px" class="pixelated"/> ${message}`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
                timeout: 3000 + i * 2000,
            });
        }
    }

    public static notifyItemDestroyed(item: UndergroundItem, amount: number, helper?: UndergroundHelper) {
        const { name: itemName, image } = item;

        Notifier.notify({
            title: 'Underground',
            message: `<img src="${image}" height="24px" class="pixelated"/> ${helper?.name ?? 'You'} found ${GameHelper.anOrA(itemName)} ${humanifyString(itemName)}, but the item was destroyed in the process.`,
            type: NotificationConstants.NotificationOption.warning,
            setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
            timeout: 3000,
        });
    }

    public static notifyHelperHired(helper: UndergroundHelper) {
        Notifier.notify({
            title: `${this.buildHelperNotificationTitle(helper)} ${helper.name}`,
            message: 'Thanks for hiring me,\nI won\'t let you down!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * SECOND,
            setting: NotificationConstants.NotificationSetting.Underground.helper,
        });
    }

    public static notifyHelperFired(helper: UndergroundHelper) {
        Notifier.notify({
            title: `${this.buildHelperNotificationTitle(helper)} ${helper.name}`,
            message: 'Happy to work for you! Let me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * SECOND,
            setting: NotificationConstants.NotificationSetting.Underground.helper,
        });
    }

    public static notifyHelperItemRetention(item: UndergroundItem, amount: number, helper: UndergroundHelper) {
        Notifier.notify({
            title: `${this.buildHelperNotificationTitle(helper)} ${helper.name}`,
            message: `<img src="${item.image}" height="24px" class="pixelated"/> ${helper.retentionText}`,
            type: NotificationConstants.NotificationOption.warning,
            setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
            timeout: 3 * SECOND,
        });
    }

    public static notifyBatteryFull() {
        Notifier.notify({
            message: 'Your Underground Battery has been fully charged and is ready to be discharged.',
            type: NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.Underground.battery_full,
            timeout: 10 * SECOND,
        });
    }

    private static buildHelperNotificationTitle(helper: UndergroundHelper) {
        return [
            '<div class="d-inline-flex align-items-center justify-content-center position-relative mr-2">',
            ...helper.images.map(image => `<img src="${image}" height="24px" class="pixelated"/>`),
            (helper.hasStolenItem(600) ? '<img class="pixelated position-absolute" src="assets/images/pokemon/25.23.png" alt="" style="width: 24px; right: -16px; bottom: -10px;">' : ''),
            '</div>',
        ].join('');
    }

    private static organisedTreasuresListCompareBy(option: SortOptions, direction: boolean): (a: UndergroundItem, b: UndergroundItem) => number {
        return function (a, b) {
            const config = SortOptionConfigs[option];

            if (config.getValue(a) < config.getValue(b))
                return direction ? 1 : -1;
            if (config.getValue(a) > config.getValue(b))
                return direction ? -1 : 1;
            return 0;
        };
    }
}
