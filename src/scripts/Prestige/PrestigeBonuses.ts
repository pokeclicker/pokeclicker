class PrestigeBonuses {
    /**
     * TODO not sure if this is the best way to do it, see #238
     */

    /**
     * Return the bonus if the upgrade is bought, 1 otherwise
     */
    public static getBonus(upgradeId){
        return Prestige.isUpgradeBought(upgradeId) ? Prestige.getUpgrade(upgradeId).bonus : 0
    }

    /**
     * Repeat 36 times :/
     */
    public static getHarvestTimeBonus(){
        return this.getBonus(1);
    }


}
