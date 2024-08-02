import OakItemType from '../enums/OakItemType';
import Rand from '../utilities/Rand';
import { MineConfig, MineConfigs, MineType } from './mine/MineConfig';
import UndergroundTool from './tools/UndergroundTool';
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
    GLOBAL_COOLDOWN_BASE,
    GLOBAL_COOLDOWN_MINIMUM,
    GLOBAL_COOLDOWN_REDUCTION_PER_LEVEL, HELPER_EXPERIENCE_PLAYER_FRACTION,
    humanifyString,
    PLATE_VALUE,
    PLAYER_EXPERIENCE_HELPER_FRACTION,
    SPECIAL_MINE_CHANCE,
    SURVEY_RANGE_BASE,
    SURVEY_RANGE_REDUCTION_LEVELS,
    TOOL_COOLDOWN_MINIMUM,
} from '../GameConstants';
import { UndergroundHelper } from './helper/UndergroundHelper';
import NotificationOption from '../notifications/NotificationOption';
import GameHelper from '../GameHelper';

export class UndergroundController {
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

    public static calculateGlobalCooldown(): number {
        const cellBatteryBonus = App.game.oakItems.calculateBonus(OakItemType.Cell_Battery);
        return Math.max(GLOBAL_COOLDOWN_BASE - GLOBAL_COOLDOWN_REDUCTION_PER_LEVEL * App.game.underground.undergroundLevel, GLOBAL_COOLDOWN_MINIMUM) / cellBatteryBonus;
    }

    public static calculateToolCooldown(tool: UndergroundTool): number {
        // const cellBatteryBonus = App.game.oakItems.calculateBonus(OakItemType.Cell_Battery);
        const cellBatteryBonus = 1;
        return Math.max(tool.baseCooldown - tool.cooldownReductionPerLevel * App.game.underground.undergroundLevel, TOOL_COOLDOWN_MINIMUM) / cellBatteryBonus;
    }

    public static calculateDiscoverMineTimeout(mineType: MineType): number {
        if (mineType != MineType.Random || (App.game.underground.mine && !App.game.underground.mine.completed)) {
            return Math.max(DISCOVER_MINE_TIMEOUT_BASE - DISCOVER_MINE_TIMEOUT_REDUCTION_PER_LEVEL * Math.max(0, App.game.underground.undergroundLevel - DISCOVER_MINE_TIMEOUT_LEVEL_START), 0);
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
        const coordinates = App.game.underground.mine.getCoordinateForGridIndex(index);
        App.game.undergroundTools.useTool(App.game.undergroundTools.selectedToolType, coordinates.x, coordinates.y);
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
            message: helper ? `${helper.name} digs deeper...` : 'You dig deeper...',
            type: NotificationOption.info,
            setting: NotificationConstants.NotificationSetting.Underground.underground_dig_deeper,
        });
    }

    public static notifyItemFound(item: UndergroundItem, amount: number, helper?: UndergroundHelper) {
        const { itemName } = item;

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
}
