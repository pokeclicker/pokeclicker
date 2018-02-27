class Prestige {

    public static upgradeList = [];

    /**
     * Upgrades 2, 16, 22 and 36 can always be reached. Otherwise check if a neighbour is already unlocked.
     * Can take some inspiration from how dungeons handle this.
     */
    public static canReachUpgrade(upgradeId: number): boolean {
        // TODO
        return null
    }

    /**
     * Set the id of the upgrade to true in player and subtract the correct points.
     */
    public static buyUpgrade(upgradeId: number) {
        if (this.canBuyUpgrade(upgradeId)) {
            // TODO
        }
    }

    /**
     * Reward 1 of each point that is lower or equal to the prestige that is started.
     */
    public static awardPrestigePoints(type: GameConstants.PrestigeType) {
        // TODO
    }

    /**
     * Check if an upgrade is bought.
     */
    public static isUpgradeBought(upgradeId: number): boolean {
        // TODO
        return null;
    }


    /**
     * Reset all player values except caughtShinyList, defeatedAmount, eggSlots, itemList, diamons, shardUpgrades, mineUpgrade, statistics, questXp, shinyCatches, all farm related stuff.
     * Store money, dungeontokens and questpoints so they can be recovered.
     * Award prestigepoints.
     * Restart the game.
     */
    public static startPrestige(type: GameConstants.PrestigeType) {
        this.awardPrestigePoints(type);
        // TODO
    }

    /**
     * Check if an upgrade can be bought
     */
    public static canBuyUpgrade(upgradeId: number): boolean {
        let prestigeUpgrade: PrestigeUpgrade = this.getUpgrade(upgradeId);
        return !this.isUpgradeBought(upgradeId) && this.canReachUpgrade(upgradeId) && player.prestigePoints[prestigeUpgrade.costType] >= prestigeUpgrade.cost;
    }


    /**
     * Return the upgrade from the upgradeList
     */
    public static getUpgrade(upgradeId: number): PrestigeUpgrade {
        return this.upgradeList[upgradeId];
    }

    public static addUpgrade(upgrade: PrestigeUpgrade) {
        this.upgradeList[upgrade.id] = upgrade;
    }

    /**
     * All upgrades are percentages in the form (1 + bonus).
     * Decreasing a time by 33% will be (1 + -0.33) and the bonus will be -0.33
     * Increasing money by 50% will be (1 + 0.5) and the bonus will be 0.5
     */

    public static initialize() {
        // TODO
        this.addUpgrade(new PrestigeUpgrade(1, "Harvest time decreased by 33%", 2, GameConstants.PrestigeType.Easy, -0.33))
    }

}