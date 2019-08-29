class Prestige {

    public static upgradeLayout = [
        [0, 0, 1, 2, 3, 0, 0],
        [0, 4, 5, 6, 7, 8, 0],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [0, 30, 31, 32, 33, 34, 0],
        [0, 0, 35, 36, 37, 0, 0],
    ];

    public static upgradeList = [];

    /**
     * Upgrades 2, 16, 22 and 36 can always be reached. Otherwise check if a neighbour is already unlocked.
     * Can take some inspiration from how dungeons handle this.
     */
    public static canReachUpgrade(upgradeId: number): boolean {
        if (upgradeId == 2 || upgradeId == 16 || upgradeId == 22 || upgradeId == 36) {
            return true;
        }

        if (this.isUpgradeBought(upgradeId)) {
            return true;
        }

        let x = 0;
        let y = 0;

        for (let i = 0; i < this.upgradeLayout.length; i++) {
            for (let j = 0; j < this.upgradeLayout[i].length; j++) {
                if (this.upgradeLayout[i][j] == upgradeId) {
                    x = JSON.parse(JSON.stringify(j));
                    y = JSON.parse(JSON.stringify(i));
                    break;
                }
            }
        }

        let nb1 = this.upgradeLayout[GameConstants.normalize(y + 1, this.upgradeLayout.length-1)][GameConstants.normalize(x, this.upgradeLayout.length-1)];
        let nb2 = this.upgradeLayout[GameConstants.normalize(y - 1, this.upgradeLayout.length-1)][GameConstants.normalize(x, this.upgradeLayout.length-1)];
        let nb3 = this.upgradeLayout[GameConstants.normalize(y, this.upgradeLayout.length-1)][GameConstants.normalize(x + 1, this.upgradeLayout.length-1)];
        let nb4 = this.upgradeLayout[GameConstants.normalize(y, this.upgradeLayout.length-1)][GameConstants.normalize(x - 1, this.upgradeLayout.length-1)];

        return this.isUpgradeBought(nb1) || this.isUpgradeBought(nb2) || this.isUpgradeBought(nb3) || this.isUpgradeBought(nb4);
    }


    /**
     * Set the id of the upgrade to true in player and subtract the correct points.
     */
    public static buyUpgrade(upgradeId: number) {
        if(upgradeId == 0){
            return;
        }
        if (this.canBuyUpgrade(upgradeId)) {
            player.prestigeUpgradesBought[upgradeId](true);
        }
        this.updateHTML();
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
        return player.prestigeUpgradesBought[upgradeId]();
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
        if (this.isUpgradeBought(upgradeId)) {
            Notifier.notify('Already bought this upgrade', GameConstants.NotificationOption.danger);
            return false;
        }
        if (!this.canReachUpgrade(upgradeId)) {
            Notifier.notify(`Can't reach this upgrade yet`, GameConstants.NotificationOption.danger);
            return false;

        }
        if (player.prestigePoints[prestigeUpgrade.costType] < prestigeUpgrade.cost) {
            Notifier.notify(`Can't afford upgrade`, GameConstants.NotificationOption.danger);
            return false;

        }
        return true;
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
        // TODO add correct description and bonuses
        this.addUpgrade(new PrestigeUpgrade(1, '[Farm]<br/>Harvest time decreased by 33%', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(2, '[General]<br/>Gain 30% more dungeon tokens', 1, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(3, '[Underground]<br/>Max daily deals +1', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(4, '[Underground]<br/>Max treasures +1', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(5, '[Safari Zone]<br/>Flee chance -20%', 2, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(6, '[Underground]<br/>Chisel damage +1', 1, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(7, '[TO BE DETERMINED]', 2, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(8, '[TO BE DETERMINED]', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(9, '[Farm]<br/>Fertilizer effect +20%', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(10, '[TO BE DETERMINED]', 6, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(11, '[General]<br/>Routekills required decreased to 8', 2, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(12, '[Quest]<br/>Unlock +1 quest slot', 3, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(13, '[TO BE DETERMINED]', 3, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(14, '[Quest]<br/>Quest skip cost halved', 2, GameConstants.PrestigeType.Hard, -0.33));
        this.addUpgrade(new PrestigeUpgrade(15, '[Safari Zone]<br/>Max steps +200', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(16, '[General]<br/>Gain 10% more exp', 1, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(17, '[General]<br/>Seed droprate + 20%', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(18, '[Dungeons]<br/>Dungeons contain +1 treasure', 3, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(19, '[General]<br/>Catch time -250ms', 7, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(20, '[Breeding]<br/>Egg slot cost halved', 3, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(21, '[Oak Items]<br/>Oak item xp gain increased by 30%', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(22, '[General]<br/>Gain 20% more money', 1, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(23, '[Dungeons]<br/>Dungeon enemies drop 3 more shards', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(24, '[Gyms]<br/>Gym time limit is +10s', 5, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(25, '[Breeding]<br/>Hatched Pokémon start at level 50', 4, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(26, '[Underground]<br/>Energy regen time -10s', 6, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(27, '[General]<br/>Encounter 25% more shinies', 4, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(28, '[TO BE DETERMINED]', 5, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(29, '[TO BE DETERMINED]', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(30, '[TO BE DETERMINED]', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(31, '[Underground]<br/>Max energy +50', 2, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(32, '[Farm]<br/>Berry gain +20%', 1, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(33, '[Breeding]<br/>Breeding increases attack with +10%', 2, GameConstants.PrestigeType.Medium, -0.33));
        this.addUpgrade(new PrestigeUpgrade(34, '[TO BE DETERMINED]', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(35, '[Quest]<br/>Gain 25% more quest points', 2, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(36, '[General]<br/>Catch rate +10%', 1, GameConstants.PrestigeType.Easy, -0.33));
        this.addUpgrade(new PrestigeUpgrade(37, '[TO BE DETERMINED]', 2, GameConstants.PrestigeType.Easy, -0.33));
    }

    public static updateHTML() {
        let html = '<table class="prestige-table"></tbody>';
        for (let i = 0; i < this.upgradeLayout.length; i++) {
            html += "<tr>";
            for (let j = 0; j < this.upgradeLayout[i].length; j++) {
                let id = this.upgradeLayout[i][j];
                let cssClass = this.getUpgrade(id) !== undefined ? GameConstants.PrestigeType[this.getUpgrade(id).costType].toLocaleLowerCase() : 'none';
                let opacity = 'prestige-locked';
                if (this.isUpgradeBought(id) || id == 0) {
                    opacity = ''
                } else if (this.canReachUpgrade(id)) {
                    opacity = 'prestige-reachable';
                }


                html += '<td>';
                html += `<div onclick=Prestige.buyUpgrade(${id}) class='prestige-upgrade prestige-${cssClass} ${opacity}'>${id}</div>`;
                html += '</td>';
            }

            html += '</tr>';
        }
        html += '</tbody></table>';

        //$('#prestige-modal-body').html(html);
    }

    public static isLocked(upgradeId: number) {
        return ko.pureComputed(function(){
            return upgradeId != 0 && !Prestige.isUpgradeBought(upgradeId);
        });
    }

    public static isReachable(upgradeId: number) {
        return ko.pureComputed(function(){
            return upgradeId != 0 && !Prestige.isUpgradeBought(upgradeId) && Prestige.canReachUpgrade(upgradeId);
        });
    }

}
