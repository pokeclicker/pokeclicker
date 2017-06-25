class player {
    money: number;
    dungeonTokens: number;


    public static calculateAttack(): number {
        // TODO Calculate pokemon attack by checking the caught list, upgrades and multipliers.
        return 1;
    }

    public static calculateClickAttack(): number {
        // TODO Calculate click attack by checking the caught list size, upgrades and multipliers.
        return 1;
    }

    public static calculateMoneyMultiplier(): number {
        // TODO Calculate money multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateExpMultiplier(): number {
        // TODO Calculate exp multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateDungeonTokenMultiplier(): number {
        // TODO Calculate dungeon token multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateCatchTime(): number{
        // TODO Calculate catch time by checking upgrades and multipliers.
        return 2000;
    }
}