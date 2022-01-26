declare class RedeemableCode {
    name: string;
    hash: number;
    isRedeemed: boolean;
    private readonly rewardFunction;
    constructor(name: string, hash: number, isRedeemed: boolean, rewardFunction: () => void);
    redeem(): void;
}
