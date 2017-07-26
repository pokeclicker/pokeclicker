class Plot {
    public isUnlocked: boolean;
    public exp: number;
    public level: number;
    public boosted: boolean;
    public berry: Berry;
    public timeLeft: number;


    constructor(isUnlocked: boolean, exp: number, level: number, boosted: boolean, berry: Berry, timeLeft: number) {
        this.isUnlocked = isUnlocked;
        this.exp = exp;
        this.level = level;
        this.boosted = boosted;
        this.berry = berry;
        this.timeLeft = timeLeft;
    }

    public getStage(){
    return 5 - Math.ceil(5*this.timeLeft/this.berry.harvestTime);
}
}
