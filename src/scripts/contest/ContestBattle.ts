///<reference path="../Battle.ts"/>
class ContestBattle extends Battle {
    static trainers: KnockoutObservableArray<ContestTrainer> = ko.observableArray(null);
    static pokemons: KnockoutObservableArray<ContestBattlePokemon> = ko.observableArray(null);
    static pokemonIndexArray: Array<KnockoutObservable<number>> = new Array(1).fill(ko.observable(null));
    static enemyIndexes: KnockoutObservableArray<number> = ko.observableArray(null);

    static trainerStreak: KnockoutObservable<number> = ko.observable(0);

    static selectedEnemy: KnockoutObservable<number> = ko.observable(-1);

    public static trainerInfo(index: number) {
        if (index >= 0) {
            return `${ContestBattle.trainers()[index].name.replace(/\d/g,'')}\'s ${ContestBattle.pokemons()[index].nickname}`;
        } else {
            return 'Active Click Type';
        }
    }

    public static enemyTypes(index: number) {
        if (index >= 0) {
            return ContestBattle.pokemons()[index].contestTypes;
        } else {
            return [ContestRunner.type()];
        }
    }

    public static pokemonAttack() {
        if (ContestRunner.running()) {
            const now = Date.now();
            if (ContestBattle.lastPokemonAttack > now - 900) {
                return;
            }
            ContestBattle.lastPokemonAttack = now;

            // increase the audience bar
            if (ContestRunner.jamTime() <= 0) {
                ContestRunner.rally(ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), [ContestRunner.type()]));
            }

            if (ContestBattle.pokemons().some(p => !p?.isAlive)) {
                ContestBattle.pokemons().filter(p => !p?.isAlive).forEach(() => ContestBattle.defeatPokemon());
            }
        }
    }

    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        const enemyIndex = ContestBattle.pokemons().findIndex(p => !p?.isAlive());

        ContestBattle.exciteCrowd(enemyIndex);

        ContestBattle.pokemons()[enemyIndex].defeat(true);
        ContestBattle.pokemonIndexArray[enemyIndex](ContestBattle.pokemonIndexArray[enemyIndex]() + 1);

        if (ContestBattle.pokemonIndexArray[enemyIndex]() + 1 >= ContestBattle.trainers()[enemyIndex].getTeam().length) {
            // increase trainer streak
            ContestBattle.trainerStreak(ContestBattle.trainerStreak() + 1);
            // increase statistic
            GameHelper.incrementObservable(App.game.statistics.contestTrainersDefeated[ContestRunner.rank()][ContestRunner.type()]);
            // give reward
            if (ContestBattle.trainers()[enemyIndex].options?.berryReward) {
                ContestBattle.trainers()[enemyIndex].options?.berryReward?.filter(br => !br.requirement || br.requirement?.isCompleted()).forEach(br => {
                    App.game.farming.gainBerry(br.berry, br.amount, false);
                    Notifier.notify({
                        message: `${ContestBattle.trainers()[enemyIndex].name} defeated. ${BerryType[br.berry]} rewarded.`,
                        type: NotificationConstants.NotificationOption.success,
                    });
                });
            }
            if (ContestBattle.trainers()[enemyIndex].options?.itemReward) {
                ContestBattle.trainers()[enemyIndex].options?.itemReward?.filter(ir => !ir.requirement || ir.requirement?.isCompleted()).forEach(ir => {
                    player.gainItem(ir.item, ir.amount);
                    Notifier.notify({
                        message: `${ContestBattle.trainers()[enemyIndex].name} defeated. ${ItemList[ir.item].displayName} rewarded.`,
                        type: NotificationConstants.NotificationOption.success,
                    });
                });
            }
        }

        // Make contest "route" regionless
        App.game.breeding.progressEggsBattle(ContestRunner.rank() * 3 + 1, GameConstants.Region.none);

        ContestBattle.generateNewEnemy();

        player.lowerItemMultipliers(MultiplierDecreaser.Battle); //todo: ContestBattle
    }

    public static generateTrainers() {
        // max and default of 4
        const opponentAmount = ContestRunner.rank() != ContestRank.Practice ? Math.min(ContestRunner.rank(), 4) : 4;
        const opponents = Rand.shuffleArray(ContestRunner.getTrainerList());
        ContestBattle.enemyIndexes(new Array((opponentAmount)).fill(null).map((_,i) => i));
        ContestBattle.trainers(new Array(opponentAmount).fill(null).map((_,i) => opponents[i]));
        ContestBattle.pokemonIndexArray = new Array(opponentAmount).fill(ko.observable(0));
        ContestBattle.pokemons(new Array(opponentAmount).fill(null));
        ContestBattle.pokemons().forEach(() => ContestBattle.generateNewEnemy());
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        // Probably not needed, refer to Battle.ts
        ContestBattle.counter = 0;

        // trainer, enemy, and pokemon indexes are in the same position
        const enemyIndex = ContestBattle.pokemons().findIndex(p => p === null || !p?.isAlive());

        // Check if all of the trainer's party has been used
        if (ContestBattle.pokemonIndexArray[enemyIndex]() + 1 >= ContestBattle.trainers()[enemyIndex].getTeam().length) {

            // Reset pokemon index for next trainer
            ContestBattle.pokemonIndexArray[enemyIndex](0);

            // Select new trainer and pokemon
            const newTrainer = Rand.fromArray(ContestRunner.getTrainerList().filter(t => !ContestBattle.trainers().some(tr => tr === t)));
            ContestBattle.trainers()[enemyIndex] = newTrainer;
            ContestBattle.trainers.notifySubscribers();
            ContestBattle.pokemons()[enemyIndex] = PokemonFactory.generateContestTrainerPokemon(newTrainer, 0);
            ContestBattle.pokemons.notifySubscribers();

        } else {
            // Move to next pokemon
            ContestBattle.pokemons()[enemyIndex] = PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainers()[enemyIndex], ContestBattle.pokemonIndexArray[enemyIndex]());
            ContestBattle.pokemons.notifySubscribers();
        }

        // increase the opposing pokemon's hp slightly with each trainer defeated
        const multiplier = Math.max(ContestRunner.rank(), 1) + ContestRunner.encoreRounds();
        ContestBattle.pokemons()[enemyIndex].health(ContestBattle.pokemons()[enemyIndex].health() * multiplier);
        ContestBattle.pokemons()[enemyIndex].maxHealth(ContestBattle.pokemons()[enemyIndex].maxHealth() * multiplier);
    }

    public static endContest() {
        ContestBattle.trainers([]);
        ContestBattle.pokemons([]);
        ContestBattle.pokemonIndexArray = [];
        ContestBattle.enemyIndexes([]);
    }

    public static clickAppeal(index: number) {
        if (ContestRunner.running()) {
            // click attacks disabled
            if (App.game.challenges.list.disableClickAttack.active()) {
                return;
            }
            // (Comments copied from clickAttack)
            // TODO: figure out a better way of handling this
            // Limit click attack speed, Only allow 1 attack per 50ms (20 per second)
            const now = Date.now();
            if (this.lastClickAttack > now - 50) {
                return;
            }
            this.lastClickAttack = now;
            if (!this.pokemons()[index]?.isAlive()) {
                return;
            }
            this.pokemons()[index].damage(ContestHelper.calculateClickAppeal([ContestRunner.type()], ContestBattle.pokemons()[index].contestTypes));
            if (!this.pokemons()[index].isAlive()) {
                this.defeatPokemon();
            }
        }
    }

    public static maxAppeal() {
        if (ContestRunner.crowdHype().length >= 5) {
            // Make const for crowdHype so it doesn't change in Spectacular Rank
            const hypeFocus = [...new Set(ContestRunner.crowdHype().filter(ct => ct === ContestRunner.type()))].length;

            ContestBattle.pokemons().forEach(p => {
                // damage opponent
                p.damage(10 * ContestHelper.calculateClickAppeal([ContestRunner.type()], p.contestTypes));

                // equation for adding audience appeal
                const multiplier = p.contestTypes.includes(ContestRunner.type()) ? 2 : 1;
                const baseAudienceAppeal = ContestHelper.rankAppeal[ContestRunner.rank()] * 80 * Math.pow(ContestRunner.rank(), 2);
                const baseOpponentHealth = p.maxHealth() / (Math.max(ContestRunner.rank(), 1) + ContestRunner.encoreRounds());
                const HPBonus = baseOpponentHealth * ContestRunner.rank() * 10 * multiplier / (baseAudienceAppeal);
                const percentBonus = 15 / 100;
                const baseBonus = Math.floor((((((percentBonus * baseAudienceAppeal) / 80) / (Math.pow(ContestRunner.rank(), 2) * ContestBattle.enemyIndexes().length)) / (80 * ContestRunner.rank())) + HPBonus) * baseAudienceAppeal);

                // Rally and Jam when defeated or, in Spectacular, every time used
                if (!p?.isAlive() || ContestRunner.rank() === ContestRank.Spectacular) {
                    ContestRunner.rally(Math.round(baseBonus / hypeFocus));
                    ContestBattle.contestJam(p);
                }
                // Defeat
                if (!p?.isAlive()) {
                    ContestBattle.defeatPokemon();
                }
            });

            // then empty the click appeal bar
            ContestRunner.crowdHype.removeAll();
        }
    }

    public static exciteCrowd(p: any) {
        if (ContestRunner.jamTime() <= 0) {
            if (ContestRunner.rank() < ContestRank.Spectacular && ContestBattle.pokemons()[p].contestTypes.includes(ContestRunner.type())) {
                // limit to 5, add contest's type
                const run = ContestRunner.crowdHype().concat(ContestRunner.type()).reverse().slice(0, 5).reverse();
                ContestRunner.crowdHype(run);
            }
            if (ContestRunner.rank() >= ContestRank.Spectacular) {
                // limit to 5, add opponent's types, keep contest's type
                const type = ContestRunner.crowdHype().concat(ContestBattle.pokemons()[p].contestTypes).filter(ct => ct === ContestRunner.type());
                const run = ContestRunner.crowdHype().concat(ContestBattle.pokemons()[p].contestTypes).filter(ct => ct != ContestRunner.type()).reverse().slice(0, 5 - type.length).reverse();
                ContestRunner.crowdHype(type.concat(run));
            }
        }
    }

    public static contestJam(p: any) {
        const type = ContestRunner.rank() < ContestRank.Spectacular ? [ContestRunner.type()] : ContestRunner.crowdHype();
        const jams = p?.contestTypes.filter(ct => ContestTypeHelper.getAppealModifier(type, [ct]) === 0).length;
        ContestRunner.jamTime(ContestRunner.jamTime() + jams * 1000);
    }

    // Computables for contestView
    public static trainerBonusComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        return `Trainer Streak: ${ContestBattle.trainerStreak()}`;
    });

    public static encoreBonusComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        // remember to check ContestRank.Practice for this
        return ContestRunner.rank() < ContestRank.Spectacular ? `Bonus Round: ${ContestRunner.encoreRounds()}/${ContestRunner.rank()}` : `Round: ${ContestRunner.encoreRounds()}`;
    });

    public static maxAppealComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        const appealLeft = '🤍';
        const jam = '🖤';

        const appeal: string[] = [];
        ContestRunner.crowdHype().forEach(ct => {
            switch (ct) {
                case ct = ContestType.Cool:
                    appeal.push('🧡');
                    break;
                case ct = ContestType.Beautiful:
                    appeal.push('💙');
                    break;
                case ct = ContestType.Cute:
                    appeal.push('🩷');
                    break;
                case ct = ContestType.Smart:
                    appeal.push('💚');
                    break;
                case ct = ContestType.Tough:
                    appeal.push('💛');
                    break;
                case ct = ContestType.Balanced:
                    appeal.push('💜');
                    break;
            }
        });

        if (!ContestRunner.jamTime()) {
            return appeal.join('').concat(appealLeft.repeat(5 - appeal.length));
        } else {
            return jam.repeat(Math.min(Math.ceil(ContestRunner.jamTime() / 1000), 5)).concat(appealLeft.repeat(5 - Math.min(Math.ceil(ContestRunner.jamTime() / 1000), 5)));
        }
    })
}
