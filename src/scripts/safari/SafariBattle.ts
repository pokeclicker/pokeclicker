class SafariBattle {
    static _enemy: KnockoutObservable<SafariPokemon> = ko.observable();
    static busy = ko.observable(false).extend({ boolean: null });
    static text: KnockoutObservable<string> = ko.observable('What will you do?');
    static escapeAttempts = 0;
    static particle;
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
    }

    public static throwBall() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            Safari.balls(Safari.balls() - 1);

            $('#safariBattleModal .enemy').css('transition-duration', `${0.75 * SafariBattle.Speed.enemyTransition * SafariBattle.tierMultiplier(Safari.safariLevel())}ms`);
            SafariBattle.text('You throw a ball...');
            GameHelper.incrementObservable(App.game.statistics.safariBallsThrown, 1);
            const enemyImg = $('#safariBattleModal .enemy').offset();
            enemyImg.left += 36;
            enemyImg.top += 16;

            const ptclhtml = '<div><img id="safariBall" class="spin" src="assets/images/pokeball/Safariball.svg" height="30px"></div>';
            SafariBattle.particle = SafariBattle.dropParticle(ptclhtml, $('#safariBattleModal .pageItemFooter').offset(), enemyImg, SafariBattle.Speed.ballThrow * SafariBattle.tierMultiplier(Safari.safariLevel()), 'cubic-bezier(0,0,0.4,1)', true).css('z-index', 9999);

            SafariBattle.delay(1.1 * SafariBattle.Speed.ballThrow * SafariBattle.tierMultiplier(Safari.safariLevel()))(0)            // throwing the ball
                .then(SafariBattle.startCapture)                                   // pokemon being sucked into ball
                .then(SafariBattle.delay(0.75 * SafariBattle.Speed.enemyTransition))
                .then(SafariBattle.startBounce)                                    // pokeball dropping to ground
                .then(SafariBattle.delay(1.7 * SafariBattle.Speed.ballBounce))
                .then(SafariBattle.calcIndex)                                      // roll a dice for catching, use dice roll to determine how many pokeball rolls
                .then(SafariBattle.delayRoll)
                .then(SafariBattle.finishCapture);                                  // capture pokemon or break free

        }
    }

    private static delay(ms) {
        return function (pass) {
            return new Promise((resolve, reject) => {
                setTimeout((pass) => {
                    resolve(pass);
                }, ms);
            });
        };
    }

    private static startCapture() {
        return new Promise<void>((resolve, reject) => {
            $('#safariBattleModal .enemy').addClass('safariCapture');
            $('#safariBall').removeClass('spin');
            resolve();
        });
    }

    private static startBounce() {
        return new Promise<void>((resolve, reject) => {
            $('#safariBattleModal').css('animation-duration', `${1.6 * SafariBattle.Speed.ballBounce * SafariBattle.tierMultiplier(Safari.safariLevel())}ms`);
            $('#safariBattleModal .enemy > img').css('opacity', '0');
            SafariBattle.particle.addClass('bounce');
            resolve();
        });
    }

    private static calcIndex() {
        return new Promise((resolve, reject) => {
            const random = Math.random();
            const catchF = SafariBattle.enemy.catchFactor / 100;
            const index = catchF >= 1 ? 3 : Math.floor(4 * (1 - Math.max(random, catchF)) / (1 - catchF));
            if (index != 0) {
                $('#safariBattleModal').css('animation-duration', `${SafariBattle.Speed.ballRoll * SafariBattle.tierMultiplier(Safari.safariLevel())}ms`);
                SafariBattle.startRoll(index);
            }
            resolve([random, index]);
        });
    }

    private static delayRoll(result) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(result);
            }, (0.2 + 1.2 * result[1]) * SafariBattle.Speed.ballRoll * SafariBattle.tierMultiplier(Safari.safariLevel()));
        });
    }

    private static finishCapture(result) {
        const [random, index] = result;
        const isgameOver = (Safari.balls() == 0);
        return new Promise((resolve, reject) => {
            if (random * 100 < SafariBattle.enemy.catchFactor) {
                SafariBattle.capturePokemon(isgameOver);
                $('#safariBall').css('filter', 'brightness(0.4) grayscale(100%)');
                setTimeout(() => {
                    SafariBattle.particle.remove();
                    isgameOver ? SafariBattle.gameOver() : SafariBattle.endBattle();
                }, 1.7 * SafariBattle.Speed.enemyTransition);
            } else {
                $('#safariBattleModal .enemy > img').css('opacity', '1');
                $('#safariBattleModal .enemy').removeClass('safariCapture');
                SafariBattle.text(SafariBattle.CATCH_MESSAGES[index]);
                SafariBattle.particle.remove();
                setTimeout(() => {
                    isgameOver ? SafariBattle.gameOver() : SafariBattle.enemyTurn();
                }, 1 * SafariBattle.Speed.enemyTransition);
            }
        });
    }

    private static startRoll = function (n) {
        if (n == 4) {
            n--;
        }
        $('#safariBall').addClass('safari-roll-left');
        setTimeout(() => {
            SafariBattle.safariRoll(n - 1);
        }, 1200 * SafariBattle.tierMultiplier(Safari.safariLevel()));
    }

    private static safariRoll = function (n) {
        if (n != 0) {
            $('#safariBall').toggleClass('safari-roll-left').toggleClass('safari-roll-right');
            setTimeout(() => {
                SafariBattle.safariRoll(n - 1);
            }, 1200 * SafariBattle.tierMultiplier(Safari.safariLevel()));
        }
    }

    private static capturePokemon(isgameOver: boolean) {
        SafariBattle.text(`GOTCHA!<br>${SafariBattle.enemy.displayName} was caught!`);
        GameHelper.incrementObservable(App.game.statistics.safariPokemonCaptured, 1);
        if (SafariBattle.enemy.shiny) {
            GameHelper.incrementObservable(App.game.statistics.safariShinyPokemonCaptured, 1);
        }
        const pokemonID = PokemonHelper.getPokemonByName(SafariBattle.enemy.name).id;
        App.game.party.gainPokemonById(pokemonID, SafariBattle.enemy.shiny);
        const partyPokemon = App.game.party.getPokemon(pokemonID);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, SafariBattle.enemy.shiny, GameConstants.ShadowStatus.None, GameConstants.SAFARI_EP_YIELD);
        if (!isgameOver) {
            Safari.spawnItemCheck();
        }
    }

    public static throwBait() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            const bait = SafariBattle.selectedBait();
            if (bait.amount() <= 0) {
                SafariBattle.text(`You don't have enough ${bait.name}`);
                setTimeout(() => {
                    SafariBattle.text('What will you do?');
                    SafariBattle.busy(false);
                }, 1500);
                return;
            }
            SafariBattle.text(`You throw ${bait.useName} at ${SafariBattle.enemy.displayName}`);
            GameHelper.incrementObservable(App.game.statistics.safariBaitThrown, 1);
            bait.use(SafariBattle.enemy);
            const enemy = $('#safariBattleModal .enemy').offset();
            enemy.left += 30;
            enemy.top += 70;
            SafariBattle.dropParticle(`<img width=16px src="${bait.image}">`, $('#safariBattleModal .pageItemFooter').offset(), enemy, 1000 * SafariBattle.tierMultiplier(Safari.safariLevel()), 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            setTimeout(SafariBattle.enemyTurn, 1500 * SafariBattle.tierMultiplier(Safari.safariLevel()));
        }
    }

    public static throwRock() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            SafariBattle.text(`You throw a rock at ${SafariBattle.enemy.displayName}`);
            GameHelper.incrementObservable(App.game.statistics.safariRocksThrown, 1);
            SafariBattle.enemy.angry = Math.max(SafariBattle.enemy.angry, Rand.intBetween(2, 6));
            SafariBattle.enemy.eating = 0;
            const enemy = $('#safariBattleModal .enemy').offset();
            enemy.left += 40;
            enemy.top += 10;
            SafariBattle.dropParticle('<img src="assets/images/safari/rock.png">', $('#safariBattleModal .pageItemFooter').offset(), enemy, 800 * SafariBattle.tierMultiplier(Safari.safariLevel()), 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            setTimeout(() => {
                const hitSplash = $('<ptcl>').html('<img src="assets/images/safari/hit.png">').children().appendTo('#safariBattleModal');
                hitSplash.offset(enemy).css({'opacity': 0.8, 'z-index': 9998});
                hitSplash.fadeOut(400, () => {
                    hitSplash.remove();
                });
                setTimeout(() => {
                    const newOffset = {
                        top: enemy.top + 4,
                        left: enemy.left - 20,
                    };
                    const ang = $('<ptcl>').html('<img src="assets/images/safari/angry.png">').children().appendTo('#safariBattleModal');
                    ang.css('position', 'absolute').css('z-index', 9999);
                    ang.offset(newOffset);
                    ang.addClass('pulse');
                    setTimeout(() => {
                        newOffset.top -= 10;
                        newOffset.left += 60;
                        ang.offset(newOffset);
                        setTimeout(() => {
                            ang.remove();
                        }, 350 * SafariBattle.tierMultiplier(Safari.safariLevel()));
                    }, 350 * SafariBattle.tierMultiplier(Safari.safariLevel()));
                }, 300 * SafariBattle.tierMultiplier(Safari.safariLevel()));
            }, 800 * SafariBattle.tierMultiplier(Safari.safariLevel()));
            setTimeout(SafariBattle.enemyTurn, 2000 * SafariBattle.tierMultiplier(Safari.safariLevel()));
        }
    }

    public static run() {
        if (Safari.inBattle() && !SafariBattle.busy()) {
            SafariBattle.busy(true);
            SafariBattle.text('You flee.');
            setTimeout(SafariBattle.endBattle, 1500 * SafariBattle.tierMultiplier(Safari.safariLevel()));
        }
    }

    private static enemyTurn() {
        // Enemy turn to flee;
        if (Rand.chance(SafariBattle.enemy.escapeFactor / 100)) {
            SafariBattle.text(`${SafariBattle.enemy.displayName} has fled.`);
            setTimeout(SafariBattle.endBattle, 1000 * SafariBattle.tierMultiplier(Safari.safariLevel()));
        } else if (SafariBattle.enemy.eating > 0) {
            SafariBattle.text(`${SafariBattle.enemy.displayName} is eating..`);
        } else if (SafariBattle.enemy.angry > 0) {
            SafariBattle.text(`${SafariBattle.enemy.displayName} is angry!`);
        } else {
            SafariBattle.text(`${SafariBattle.enemy.displayName} is watching carefully...`);
        }
        SafariBattle.enemy.eating = Math.max(0, SafariBattle.enemy.eating - 1);
        SafariBattle.enemy.angry = Math.max(0, SafariBattle.enemy.angry - 1);
        setTimeout(() => {
            SafariBattle.text('What will you do?');
            SafariBattle.busy(false);
        }, 1500);
    }

    private static endBattle() {
        $('#safariBattleModal').one('hidden.bs.modal', () => {
            Safari.inBattle(false);
            SafariBattle.busy(false);
        }).modal('hide');
    }

    private static gameOver() {
        SafariBattle.text(GameConstants.SAFARI_OUT_OF_BALLS);
        setTimeout(() => {
            Safari.inBattle(false);
            Safari.inProgress(false);
            SafariBattle.busy(false);
            $('#safariBattleModal').modal('hide');
            $('#safariModal').modal('hide');
        }, 2000 * SafariBattle.tierMultiplier(Safari.safariLevel()));
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
        animation: 1000,
        ballThrow: 750,
        ballBounce: 850,
        ballRoll: 700,
        enemyTransition: 1000,
    };

    export const CATCH_MESSAGES = [
        'Oh, no!<br>The Pokémon broke free!',
        'Aww! It appeared to be caught!',
        'Aargh! Almost had it!',
        'Shoot! It was so close, too!',
    ];
}
