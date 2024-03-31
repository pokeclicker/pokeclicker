///<reference path="../pokemons/PokemonFactory.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../towns/TownContent.ts"/>

/**
 * Contest class
 */
class Contest extends TownContent {
    maxAudienceAppeal: KnockoutObservable<number>;
    audienceAppeal: KnockoutObservable<number>;
    audiencePercentageAppeal: KnockoutObservable<number>;
    buttonText: string;
    public cssClass() {
        // if (App.game.badgeCase.hasBadge(this.ribbonReward)) {
        //     return 'btn btn-success';
        // }
        return 'btn btn-secondary';
    }
    public text(): string {
        return this.buttonText;
    }
    public onclick(): void {
        ContestRunner.startContest(this);
    }
    public leave(): void {
        // Put the user back in the town
        App.game.gameState = GameConstants.GameState.town;
    }

    constructor(
        public rank: ContestRank,
        public contestType: ContestType,
        // public ribbonReward: RibbonEnums,
        public moneyReward: number = 0,
        maxAudienceAppeal: number = rank * 1000,
        public pokemons: PartyPokemon[] = App.game.party.caughtPokemon.filter((p) => {
            const pk = PokemonHelper.getPokemonById(p.id);
            return [pk.contestType1, pk.contestType2, pk.contestType3].find(c => c === contestType || c === ContestType.Balanced) !== -1;
        }),
        requirements: Requirement[] = [],
        public rewardFunction = () => {},
        public optionalArgs: optionalGymArgs = {},
        public trainers: ContestTrainer[] = ContestOpponents[rank]
    ) {
        super(requirements);
        if (optionalArgs.displayName) {
            this.buttonText = optionalArgs.displayName;
        } else {
            this.buttonText = `${ContestRank[rank]} ${ContestType[contestType]}`;
        }
        this.maxAudienceAppeal = ko.observable(maxAudienceAppeal);
        this.audienceAppeal = ko.observable(0);
        this.audiencePercentageAppeal = ko.observable(0);
    }

    public isRallied(): boolean {
        return this.audienceAppeal() >= this.maxAudienceAppeal();
    }

    /**
     * Gain audience points
     * @param rally
     */
    public rally(rally: number): void {
        this.audienceAppeal(Math.min(this.audienceAppeal() + rally, this.maxAudienceAppeal()));
        this.audiencePercentageAppeal(Math.floor(this.audienceAppeal() / this.maxAudienceAppeal() * 100));
    }

    public firstWinReward() {
        // Give the player this contests ribbon
        // App.game.ribbonCase.gainRibbon(this.ribbonReward);
        // Show the badge modal
        // $('#receiveRibbonModal').modal('show');
        // Run the first time reward function
        this.rewardFunction();
    }

    public getTrainerList() {
        return this.trainers.filter(trainer => {
            return (trainer.options?.requirement) ? trainer.options.requirement.isCompleted() : true;
        });
    }

    get displayName() {
        return this.optionalArgs.displayName;
    }

    public static getRibbonImage(rank: ContestRank, type: ContestType) {
        const RibbonRank = ContestRank[rank];
        const RibbonType = ContestType[type];
        return RibbonType === 'Balanced' ? `assets/images/ribbons/${RibbonRank} Star.png` : `assets/images/ribbons/${RibbonRank} ${RibbonType}.png`;
    }
}
