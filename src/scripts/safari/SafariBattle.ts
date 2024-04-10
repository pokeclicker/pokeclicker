class SafariBattle {
    static _enemy: KnockoutObservable<SafariPokemon> = ko.observable();
    static busy = ko.observable(false).extend({ boolean: null });
    static text: KnockoutObservable<string> = ko.observable('What will you do?');
    static escapeAttempts = 0;
    static ballParticle;
    static selectedBait: KnockoutObservable<Bait> = ko.observable(BaitList.Bait);

    public static get enemy(): SafariPokemon {
        return SafariBattle._enemy();
    }

    public static set enemy(pokemon: SafariPokemon) {
        SafariBattle._enemy(pokemon);
    }

    public static load(enemy = SafariPokemon.random(Safari.activeEnvironment())) {
        // Stop left over keypresses
        GameController.simulateKey('ArrowUp', 'up');
        GameController.simulateKey('ArrowDown', 'up');
        GameController.simulateKey('ArrowLeft', 'up');
        GameController.simulateKey('ArrowRight', 'up');
        // Generate enemy
        SafariBattle.enemy = enemy;
        Safari.inBattle(true);
        SafariBattle.text('What will you do?');
        SafariBattle.escapeAttempts = 0;
        $('#safariBattleModal').modal({ backdrop: 'static', keyboard: false });

        // Shiny
        const location = `${GameConstants.camelCaseToString(GameConstants.Region[Safari.activeRegion()])} Safari`;
        if (enemy.shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(enemy.id, true)
                    ? createLogContent.encounterShinyDupe({
                        location: location,
                        pokemon: enemy.name,
                    })
                    : createLogContent.encounterShiny({
                        location: location,
                        pokemon: enemy.name,
                    })
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemy.id)) {
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.encounterWild({
                    location: location,
                    pokemon: enemy.name,
                })
            );
        }
    }

    public static throwBall() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            Safari.balls(Safari.balls() - 1);

            SafariBattle.text('You throw a ball...');
            GameHelper.incrementObservable(App.game.statistics.safariBallsThrown, 1);
            const targetOffset = $('#safariBattleModal .enemy').offset();
            targetOffset.left += 36;
            targetOffset.top += 16;

            const ballSpeed = SafariBattle.Speed.ballThrowAnim * SafariBattle.getTierMultiplier();
            const ptclhtml = '<div><img id="safariBall" src="assets/images/pokeball/Safariball.svg" height="30px"></div>';
            SafariBattle.ballParticle?.remove();
            SafariBattle.ballParticle = SafariBattle.dropParticle(ptclhtml, $('#safariBattleModal .pageItemFooter').offset(), targetOffset, ballSpeed, 'cubic-bezier(0,0,0.4,1)', true).css('z-index', 9999);
            $('#safariBall').css('animation-duration', `${ballSpeed}ms`).addClass('spin');

            SafariBattle.delay(SafariBattle.Speed.ballThrowDelay)                  // throwing the ball
                .then(SafariBattle.startCapture)                                   // pokemon being sucked into ball
                .then(SafariBattle.thenDelay(SafariBattle.Speed.enemyTransition))
                .then(SafariBattle.startBounce)                                    // pokeball dropping to ground
                .then(SafariBattle.thenDelay(SafariBattle.Speed.ballBounceDelay))
                .then(SafariBattle.calcCapture)                                    // roll a dice for catching, use dice roll to determine how many pokeball rolls
                .then(SafariBattle.startRoll)
                .then(SafariBattle.finishCapture);                                 // capture pokemon or break free
        }
    }

    private static delay(ms, useMultiplier = true) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms * (useMultiplier ? SafariBattle.getTierMultiplier() : 1));
        });
    }

    private static thenDelay(ms, useMultiplier = true) {
        return function (pass) {
            return SafariBattle.delay(ms, useMultiplier)
                .then(() => pass);
        };
    }

    private static startCapture() {
        return new Promise<void>((resolve, reject) => {
            $('#safariBattleModal .enemy').css('transition-duration', `${SafariBattle.Speed.enemyTransition * SafariBattle.getTierMultiplier()}ms`);
            $('#safariBattleModal .enemy').addClass('safariCapture');
            $('#safariBall').removeClass('spin');
            resolve();
        });
    }

    private static startBounce() {
        return new Promise<void>((resolve, reject) => {
            $('#safariBattleModal .enemy > img').css('opacity', '0');
            const bounceSpeed = SafariBattle.Speed.ballBounceAnim * SafariBattle.getTierMultiplier();
            SafariBattle.ballParticle.css('animation-duration', `${bounceSpeed}ms`).addClass('bounce');
            resolve();
        });
    }

    private static calcCapture() {
        return new Promise((resolve, reject) => {
            const random = Math.random();
            const catchF = SafariBattle.enemy.catchFactor / 100;
            const isCaught = random <= catchF;
            const numRolls = isCaught ? 3 : Math.min(Math.floor(4 * (1 - random) / (1 - catchF)), 3);
            resolve([isCaught, numRolls]);
        });
    }

    private static startRoll([isCaught, numRolls], roll = 0) {
        return new Promise((resolve, reject) => {
            if (roll >= numRolls) {
                $('#safariBall').removeClass('safari-roll-left safari-roll-right');
                return resolve([isCaught, numRolls]);
            }
            const delayLength = SafariBattle.Speed.ballRollAnim + SafariBattle.Speed.ballRollDelay * (roll != numRolls - 1 ? 1 : numRolls / 2);
            SafariBattle.animateRoll(roll);
            SafariBattle.delay(delayLength)
                .then(() => {
                    resolve(SafariBattle.startRoll([isCaught, numRolls], roll + 1));
                });
        });
    }

    private static animateRoll(n) {
        if (n == 0) {
            const rollSpeed = SafariBattle.Speed.ballRollAnim * SafariBattle.getTierMultiplier();
            $('#safariBall').css('animation-duration', `${rollSpeed}ms`).addClass('safari-roll-left');
        } else {
            $('#safariBall').toggleClass('safari-roll-left').toggleClass('safari-roll-right');
        }
    }

    private static finishCapture([isCaught, numRolls]) {
        const isgameOver = Safari.balls() <= 0;
        return new Promise((resolve, reject) => {
            if (isCaught) {
                SafariBattle.capturePokemon();
                if (!isgameOver) {
                    Safari.spawnItemCheck();
                }
                $('#safariBall').css('filter', 'brightness(0.4) grayscale(100%)');
                SafariBattle.delay(SafariBattle.Speed.enemyCaught * (1 + SafariBattle.getTierMultiplier()) / 2, false)
                    .then(() => {
                        SafariBattle.ballParticle.remove();
                        isgameOver ? SafariBattle.gameOver() : SafariBattle.endBattle();
                    });
            } else {
                $('#safariBattleModal .enemy > img').css('opacity', '1');
                $('#safariBattleModal .enemy').removeClass('safariCapture');
                SafariBattle.text(SafariBattle.CATCH_MESSAGES[numRolls]);
                SafariBattle.ballParticle.remove();
                SafariBattle.delay(SafariBattle.Speed.enemyEscape * (1 + SafariBattle.getTierMultiplier()) / 2, false)
                    .then(() => {
                        isgameOver ? SafariBattle.gameOver() : SafariBattle.enemyTurn();
                    });
            }
        });
    }

    private static capturePokemon() {
        SafariBattle.text(`GOTCHA!<br>${SafariBattle.enemy.displayName} was caught!`);
        GameHelper.incrementObservable(App.game.statistics.safariPokemonCaptured, 1);
        if (SafariBattle.enemy.shiny) {
            GameHelper.incrementObservable(App.game.statistics.safariShinyPokemonCaptured, 1);
        }
        const pokemonID = PokemonHelper.getPokemonByName(SafariBattle.enemy.name).id;
        App.game.party.gainPokemonById(pokemonID, SafariBattle.enemy.shiny);
        const partyPokemon = App.game.party.getPokemon(pokemonID);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, SafariBattle.enemy.shiny, GameConstants.ShadowStatus.None, GameConstants.SAFARI_EP_YIELD);
        switch (player.region) {
            case (GameConstants.Region.johto):
                const shinyModifier = SafariBattle.enemy.shiny ? GameConstants.BUG_SAFARI_SHINY_MODIFIER : 1;
                const bugReward = Math.floor(partyPokemon.baseAttack / 5) * shinyModifier;
                App.game.wallet.gainContestTokens(bugReward);
                Notifier.notify({
                    title: 'Bug Catching Contest',
                    message: `<img src="assets/images/currency/contestToken.svg" height="24px"/> You earned ${bugReward} Contest Tokens!`,
                    type: NotificationConstants.NotificationOption.primary,
                    timeout: 5000,
                });
                break;
        }
    }

    public static throwBait() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            const bait = SafariBattle.selectedBait();
            if (bait.amount() <= 0) {
                SafariBattle.text(`You don't have enough ${bait.name}`);
                SafariBattle.delay(SafariBattle.Speed.turnLength, false)
                    .then(() => {
                        SafariBattle.text('What will you do?');
                        SafariBattle.busy(false);
                    });
                return;
            }
            SafariBattle.text(`You throw ${bait.useName} at ${SafariBattle.enemy.displayName}`);
            GameHelper.incrementObservable(App.game.statistics.safariBaitThrown, 1);
            bait.use(SafariBattle.enemy);
            const enemy = $('#safariBattleModal .enemy').offset();
            enemy.left += 30;
            enemy.top += 70;
            SafariBattle.dropParticle(`<img width=16px src="${bait.image}">`, $('#safariBattleModal .pageItemFooter').offset(), enemy, SafariBattle.Speed.bait * SafariBattle.getTierMultiplier(), 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            SafariBattle.delay(1.5 * SafariBattle.Speed.bait)
                .then(() => SafariBattle.enemyTurn());
        }
    }

    public static throwRock() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            SafariBattle.text(`You throw a rock at ${SafariBattle.enemy.displayName}`);
            GameHelper.incrementObservable(App.game.statistics.safariRocksThrown, 1);
            SafariBattle.enemy.angry = Math.max(SafariBattle.enemy.angry, Rand.intBetween(2, 6));
            SafariBattle.enemy.eating = 0;
            const enemyOffset = $('#safariBattleModal .enemy').offset();
            enemyOffset.left += 40;
            enemyOffset.top += 10;
            SafariBattle.dropParticle('<img src="assets/images/safari/rock.png">', $('#safariBattleModal .pageItemFooter').offset(), enemyOffset, SafariBattle.Speed.rock * SafariBattle.getTierMultiplier(), 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            SafariBattle.delay(SafariBattle.Speed.rock)
                .then(() => {
                    const hitSplash = $('<ptcl>').html('<img src="assets/images/safari/hit.png">').children().appendTo('#safariBattleModal');
                    hitSplash.css({'position': 'absolute', 'opacity': 0.8, 'z-index': 9998});
                    hitSplash.offset(enemyOffset);
                    hitSplash.fadeOut(0.5 * SafariBattle.Speed.rock, () => {
                        hitSplash.remove();
                    });
                })
                .then(SafariBattle.thenDelay(0.375 * SafariBattle.Speed.rock))
                .then(() => {
                    const newOffset = {
                        top: enemyOffset.top + 4,
                        left: enemyOffset.left - 20,
                    };
                    const ang = $('<ptcl>').html('<img id="safariParticleAngry" src="assets/images/safari/angry.png">').children().appendTo('#safariBattleModal');
                    ang.css({'position': 'absolute', 'z-index': 9999});
                    ang.offset(newOffset);
                    ang.addClass('pulse');
                    return newOffset;
                })
                .then(SafariBattle.thenDelay(0.4375 * SafariBattle.Speed.rock))
                .then((newOffset) => {
                    newOffset.top -= 10;
                    newOffset.left += 60;
                    $('#safariParticleAngry').offset(newOffset);
                })
                .then(SafariBattle.thenDelay(0.4375 * SafariBattle.Speed.rock))
                .then(() => {
                    $('#safariParticleAngry').remove();
                });
            SafariBattle.delay(2.5 * SafariBattle.Speed.rock)
                .then(() => SafariBattle.enemyTurn());
        }
    }

    public static run() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            SafariBattle.text('You flee.');
            SafariBattle.delay(SafariBattle.Speed.turnLength)
                .then(() => SafariBattle.endBattle());
        }
    }

    private static enemyTurn() {
        // Enemy turn to flee;
        if (Rand.chance(SafariBattle.enemy.escapeFactor / 100)) {
            SafariBattle.text(`${SafariBattle.enemy.displayName} has fled.`);
            SafariBattle.delay(SafariBattle.Speed.enemyFlee)
                .then(() => SafariBattle.endBattle());
            return;
        } else if (SafariBattle.enemy.eating > 1) {
            SafariBattle.text(`${SafariBattle.enemy.displayName} is eating...`);
        } else if (SafariBattle.enemy.angry > 1) {
            SafariBattle.text(`${SafariBattle.enemy.displayName} is angry!`);
        } else {
            SafariBattle.text(`${SafariBattle.enemy.displayName} is watching carefully...`);
        }
        SafariBattle.enemy.eating = Math.max(0, SafariBattle.enemy.eating - 1);
        SafariBattle.enemy.angry = Math.max(0, SafariBattle.enemy.angry - 1);
        SafariBattle.delay(SafariBattle.Speed.turnLength, false)
            .then(() => {
                SafariBattle.text('What will you do?');
                SafariBattle.busy(false);
            });
    }

    private static endBattle() {
        $('#safariBattleModal').one('hidden.bs.modal', () => {
            Safari.inBattle(false);
            SafariBattle.busy(false);
        }).modal('hide');
    }

    private static gameOver() {
        SafariBattle.text(GameConstants.SAFARI_OUT_OF_BALLS);
        SafariBattle.delay(SafariBattle.Speed.gameOver)
            .then(() => {
                Safari.inBattle(false);
                Safari.inProgress(false);
                SafariBattle.busy(false);
                $('#safariBattleModal').modal('hide');
                $('#safariModal').modal('hide');
            });
    }

    private static dropParticle(html: string, pos, target, time = 2, top, persistentParticle = false) {
        const p = $('<ptcl>').html(html).children().appendTo('#safariBattleModal');
        p.css('position', 'absolute');
        p.offset(pos);
        if (!top) {
            top = 'cubic-bezier(0.6, -0.3, 0.7, 0)';
        }
        p[0].style.transition = `left ${time}ms linear, top ${time}ms ${top}`;
        p.offset(target);
        if (!persistentParticle) {
            setTimeout(() => {
                p.fadeOut();
            }, time - 200);
            setTimeout(() => {
                p.remove();
            }, time);
        }
        return p;
    }

    private static getTierMultiplier() {
        return SafariBattle.tierMultiplier(Safari.safariLevel());
    }

    private static tierMultiplier(level) {
        const TIERS = [0, 10, 20, 30, 40];
        const MULTIPLIERS = [1, 0.90, 0.75, 0.57, 0.45];
        let tier = 0;

        for (let i = 0; i < TIERS.length; i++) {
            if (level >= TIERS[i]) {
                tier = i;
            }
        }

        return MULTIPLIERS[tier];
    }
}

namespace SafariBattle {
    export const Speed = {
        ballThrowAnim: 700,
        ballThrowDelay: 825,
        ballBounceAnim: 1200,
        ballBounceDelay: 1500,
        ballRollAnim: 575,
        ballRollDelay: 475,
        enemyTransition: 700,
        enemyFlee: 1000,
        enemyCaught: 1700,
        enemyEscape: 1000,
        bait: 1000,
        rock: 800,
        turnLength: 1500,
        gameOver: 2000,
    };

    export const CATCH_MESSAGES = [
        'Oh, no!<br>The Pokémon broke free!',
        'Aww! It appeared to be caught!',
        'Aargh! Almost had it!',
        'Shoot! It was so close, too!',
    ];
}
