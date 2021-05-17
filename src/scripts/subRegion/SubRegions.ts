class SubRegions {
    public static list: Record<GameConstants.Region, SubRegion[]> = {};

    public static addSubRegion(region: GameConstants.Region, subregion: SubRegion): void {
        if (!this.list[region]) {
            this.list[region] = [new SubRegion('main')];
        }
        this.list[region].push(subregion);
        this.list[region].forEach((r, i) => {
            r.id = i;
            return r;
        });
    }

    public static getSubRegions(region: GameConstants.Region): SubRegion[] {
        return this.list[region]?.filter(sr => sr.unlocked());
    }
}

SubRegions.addSubRegion(GameConstants.Region.kanto, new SubRegion('johto'));
