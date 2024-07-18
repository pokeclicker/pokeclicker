import OakItemType from '../enums/OakItemType';
import Rand from '../utilities/Rand';
import {
    DiamondMineConfig,
    EvolutionItemMineConfig,
    FossilMineConfig,
    GemPlateMineConfig,
    MegaStoneMineConfig,
    MineConfig,
    MineType,
    ShardMineConfig,
} from './mine/MineConfig';
import UndergroundTool from './tools/UndergroundTool';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';
import { ItemList } from '../items/ItemList';
import Settings from '../settings';
import { PureComputed } from 'knockout';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { PLATE_VALUE } from '../GameConstants';

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

    public static getMineConfig(mineType: MineType = undefined): MineConfig {
        if (Rand.chance(25) && MegaStoneMineConfig.getAvailableItems().length > 0) {
            return MegaStoneMineConfig;
        }

        const otherMines: MineConfig[] = [
            DiamondMineConfig,
            GemPlateMineConfig,
            ShardMineConfig,
            FossilMineConfig,
            EvolutionItemMineConfig,
        ];

        return otherMines.find(config => config.type === mineType) || Rand.fromArray(otherMines);
    }

    public static convertLevelToExperience(level: number): number {
        let total = 0;
        for (let i = 0; i < level; ++i) {
            total = Math.floor(total + i + 300 * Math.pow(2, i / 7));
        }
        return Math.floor(total / 4);
    }

    public static convertExperienceToLevel(experience: number): number {
        let level = 0;
        while (experience >= this.convertLevelToExperience(level + 1)) {
            ++level;
        }
        return level;
    }

    public static calculateGlobalCooldown(): number {
        const cellBatteryBonus = App.game.oakItems.isActive(OakItemType.Cell_Battery) ?
            App.game.oakItems.calculateBonus(OakItemType.Cell_Battery)
            :
            1;

        return Math.max(15 - 0.5 * App.game.underground.undergroundLevel, 0.1) / cellBatteryBonus;
    }

    public static calculateToolCooldown(tool: UndergroundTool): number {
        return tool.baseCooldown - tool.cooldownReductionPerLevel * App.game.underground.undergroundLevel;
    }

    public static calculateDiscoverMineTimeout(mineType?: MineType): number {
        if (mineType != null) {
            return 60 - 1.2 * App.game.underground.undergroundLevel;
        }

        if (App.game.underground.mine && (App.game.underground.mine.itemsFound < App.game.underground.mine.itemsBuried)) {
            return 60 - 1.2 * App.game.underground.undergroundLevel;
        }

        return 0;
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
                App.game.wallet.gainDiamonds(Math.ceil(item.value * amount * percentage));
                break;
            case UndergroundItemValueType.Fossil:
                if (!App.game.breeding.hasFreeEggSlot()) {
                    return false;
                }
                success = App.game.breeding.gainEgg(App.game.breeding.createFossilEgg(item.name));
                break;
            case UndergroundItemValueType.Gem:
                const type = item.type;
                App.game.gems.gainGems(Math.ceil(PLATE_VALUE * amount * percentage), type);
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
}
