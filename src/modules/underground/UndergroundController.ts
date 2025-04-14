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
    DISCOVER_MINE_TIMEOUT_BASE,
    DISCOVER_MINE_TIMEOUT_LEVEL_START,
    DISCOVER_MINE_TIMEOUT_REDUCTION_PER_LEVEL,
    HELPER_EXPERIENCE_PLAYER_FRACTION,
    humanifyString,
    PLATE_VALUE,
    PLAYER_EXPERIENCE_HELPER_FRACTION,
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

export class UndergroundController {
    private static lastMineClick: number = Date.now();

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
        if (item.valueType == UndergroundItemValueType.Fossil) {
            amount = 1;
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
            case UndergroundItemValueType.Fossil:
                if (!App.game.breeding.hasFreeEggSlot()) {
                    return false;
                }
                success = App.game.breeding.gainEgg(App.game.breeding.createFossilEgg(item.name));
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
                message: 'You need the Explorer Kit to access this location.\n<i>Check out the shop at Cinnabar Island.</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static clickModalMineSquare(index: number) {
        const now = Date.now();

        if (this.lastMineClick > now - 50) {
            return;
        }
        this.lastMineClick = now;

        const coordinates = App.game.underground.mine.getCoordinateForGridIndex(index);
        App.game.underground.tools.useTool(App.game.underground.tools.selectedToolType, coordinates.x, coordinates.y);
    }

    public static handleCoordinatesMined(coordinates: Coordinate[], helper: UndergroundHelper = undefined) {
        if (coordinates.length === 0) {
            return;
        }

        const itemsFound = coordinates
            .map(coordinate => App.game.underground.mine.attemptFindItem(coordinate))
            .filter(item => item);

        // Handle gaining items
        itemsFound.forEach(value => {
            const { item, amount } = value;
            UndergroundController.notifyItemFound(item, amount, helper);

            if (helper) {
                if (Rand.chance(helper.rewardRetention)) {
                    // Helper keeps the reward
                    UndergroundController.notifyHelperItemRetention(item, amount, helper);
                } else {
                    // If we can auto sell then do so
                    if (helper.autoSellToggle && (item.valueType === UndergroundItemValueType.Diamond || item.valueType === UndergroundItemValueType.Gem)) {
                        UndergroundController.gainProfit(item, amount);
                    } else {
                        UndergroundController.gainMineItem(item.id, amount);
                    }
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
            message: helper ? `${helper.name} digging deeper...` : 'You dig deeper...',
            type: NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.Underground.underground_dig_deeper,
        });
    }

    public static notifyItemFound(item: UndergroundItem, amount: number, helper?: UndergroundHelper) {
        const { name: itemName } = item;

        Notifier.notify({
            message: `${helper ? `${helper.name}` : 'You'} found ${GameHelper.anOrA(itemName)} ${humanifyString(itemName)}.`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
            timeout: 3000,
        });

        for (let i = 1; i < amount; i++) {
            let message = `${helper ? `${helper.name}` : 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;
            if (i === 2) message = `Lucky! ${helper ? `${helper.name}` : 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;
            else if (i === 3) message = `Jackpot! ${helper ? `${helper.name}` : 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;
            else if (i > 3) message = `Jackpot ×${i - 2}! ${helper ? `${helper.name}` : 'You'} found an extra ${humanifyString(itemName)} in the Mine!`;

            Notifier.notify({
                title: 'Treasure Scanner',
                message: message,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
                timeout: 3000 + i * 2000,
            });
        }
    }

    public static notifyHelperItemRetention(item: UndergroundItem, amount: number, helper: UndergroundHelper) {
        Notifier.notify({
            message: `${helper.name} kept this treasure as payment.`,
            type: NotificationConstants.NotificationOption.warning,
            setting: NotificationConstants.NotificationSetting.Underground.underground_item_found,
            timeout: 3000,
        });
    }

    public static notifyBatteryFull() {
        Notifier.notify({
            message: 'Your Underground Battery has been fully charged and is ready to be discharged.',
            type: NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.Underground.battery_full,
            timeout: 10000,
        });
    }
}
