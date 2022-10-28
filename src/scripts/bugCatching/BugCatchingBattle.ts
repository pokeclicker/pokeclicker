class BugCatchingBattle {
    static _enemy: KnockoutObservable<BugCatchingPokemon> = ko.observable();
    static busy = ko.observable(false).extend({ boolean: null });
    static text: KnockoutObservable<string> = ko.observable('What will you do?');
    static escapeAttempts = 0;
    static particle;

    public static get enemy(): BugCatchingPokemon {
        return BugCatchingBattle._enemy();
    }

    public static set enemy(pokemon: BugCatchingPokemon) {
        BugCatchingBattle._enemy(pokemon);
    }

    public static load(enemy = BugCatchingPokemon.random()) {
        // Stop left over keypresses
        GameController.simulateKey('ArrowUp', 'up');
        GameController.simulateKey('ArrowDown', 'up');
        GameController.simulateKey('ArrowLeft', 'up');
        GameController.simulateKey('ArrowRight', 'up');
        // Generate enemy
        BugCatchingBattle.enemy = enemy;
        BugCatching.inBattle(true);
        BugCatchingBattle.text('What will you do?');
        BugCatchingBattle.escapeAttempts = 0;
        $('#bugCatchingBattleModal').modal({ backdrop: 'static', keyboard: false });
    }

    public static throwBall() {
        if (!BugCatchingBattle.busy()) {
            BugCatchingBattle.busy(true);
            BugCatching.balls(BugCatching.balls() - 1);

            $('#bugCatchingBattleModal .enemy').css('transition-duration', `${0.75 * BugCatchingBattle.Speed.enemyTransition}ms`);
            BugCatchingBattle.text('You throw a ball...');
            const enemyImg = $('#bugCatchingBattleModal .enemy').offset();
            enemyImg.left += 36;
            enemyImg.top += 16;

            const ptclhtml = '<div><img id="bugCatchingBall" class="spin" src="assets/images/pokeball/Safariball.svg" height="30px"></div>';
            BugCatchingBattle.particle = BugCatchingBattle.dropParticle(ptclhtml, $('#bugCatchingBattleModal .pageItemFooter').offset(), enemyImg, BugCatchingBattle.Speed.ballThrow, 'cubic-bezier(0,0,0.4,1)', true).css('z-index', 9999);

            BugCatchingBattle.delay(1.1 * BugCatchingBattle.Speed.ballThrow)(0)            // throwing the ball
                .then(BugCatchingBattle.startCapture)                                   // pokemon being sucked into ball
                .then(BugCatchingBattle.delay(0.75 * BugCatchingBattle.Speed.enemyTransition))
                .then(BugCatchingBattle.startBounce)                                    // pokeball dropping to ground
                .then(BugCatchingBattle.delay(1.7 * BugCatchingBattle.Speed.ballBounce))
                .then(BugCatchingBattle.calcIndex)                                      // roll a dice for catching, use dice roll to determine how many pokeball rolls
                .then(BugCatchingBattle.delayRoll)
                .then(BugCatchingBattle.finishCapture);                                  // capture pokemon or break free

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
            $('#bugCatchingBattleModal .enemy').addClass('bugCatchingCapture');
            $('#bugCatchingBall').removeClass('spin');
            resolve();
        });
    }

    private static startBounce() {
        return new Promise<void>((resolve, reject) => {
            $('#bugCatchingBattleModal').css('animation-duration', `${1.6 * BugCatchingBattle.Speed.ballBounce}ms`);
            $('#bugCatchingBattleModal .enemy > img').css('opacity', '0');
            BugCatchingBattle.particle.addClass('bounce');
            resolve();
        });
    }

    private static calcIndex() {
        return new Promise((resolve, reject) => {
            const random = Math.random();
            const catchF = BugCatchingBattle.enemy.catchFactor / 100;
            const index = catchF >= 1 ? 3 : Math.floor(4 * (1 - Math.max(random, catchF)) / (1 - catchF));
            if (index != 0) {
                $('#bugCatchingBattleModal').css('animation-duration', `${BugCatchingBattle.Speed.ballRoll}ms`);
                BugCatchingBattle.startRoll(index);
            }
            resolve([random, index]);
        });
    }

    private static delayRoll(result) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(result);
            }, (0.2 + 1.2 * result[1]) * BugCatchingBattle.Speed.ballRoll);
        });
    }

    private static finishCapture(result) {
        const [random, index] = result;
        const isgameOver = (BugCatching.balls() == 0);
        return new Promise((resolve, reject) => {
            if (random * 100 < BugCatchingBattle.enemy.catchFactor) {
                BugCatchingBattle.capturePokemon();
                $('#bugCatchingBall').css('filter', 'brightness(0.4) grayscale(100%)');
                setTimeout(() => {
                    BugCatchingBattle.particle.remove();
                    isgameOver ? BugCatchingBattle.gameOver() : BugCatchingBattle.endBattle();
                }, 1.7 * BugCatchingBattle.Speed.enemyTransition);
            } else {
                $('#bugCatchingBattleModal .enemy > img').css('opacity', '1');
                $('#bugCatchingBattleModal .enemy').removeClass('bugCatchingCapture');
                BugCatchingBattle.text(BugCatchingBattle.CATCH_MESSAGES[index]);
                BugCatchingBattle.particle.remove();
                setTimeout(() => {
                    isgameOver ? BugCatchingBattle.gameOver() : BugCatchingBattle.enemyTurn();
                }, 1 * BugCatchingBattle.Speed.enemyTransition);
            }
        });
    }

    private static startRoll = function (n) {
        if (n == 4) {
            n--;
        }
        $('#bugCatchingBall').addClass('bugCatching-roll-left');
        setTimeout(() => {
            BugCatchingBattle.BugCatchingRoll(n - 1);
        }, 1200);
    }

    private static BugCatchingRoll = function (n) {
        if (n != 0) {
            $('#bugCatchingBall').toggleClass('bugCatching-roll-left').toggleClass('bugCatching-roll-right');
            setTimeout(() => {
                BugCatchingBattle.BugCatchingRoll(n - 1);
            }, 1200);
        }
    }

    private static capturePokemon() {
        BugCatchingBattle.text(`GOTCHA!<br>${BugCatchingBattle.enemy.name} was caught!`);
        const pokemonID = PokemonHelper.getPokemonByName(BugCatchingBattle.enemy.name).id;
        App.game.party.gainPokemonById(pokemonID, BugCatchingBattle.enemy.shiny);
        const partyPokemon = App.game.party.getPokemon(pokemonID);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, BugCatchingBattle.enemy.shiny, GameConstants.BUGCATCHING_EP_YIELD);

    }

    public static throwBCBait(BCBaitType: BCBaitType) {
        if (!BugCatchingBattle.busy()) {
            BugCatchingBattle.busy(true);
            const BCBait: BCBait = BCBaitList[BCBaitType[BCBaitType]];
            if (BCBait.amount() <= 0) {
                BugCatchingBattle.text(`You don't have enough ${BCBait.name}`);
                setTimeout(() => {
                    BugCatchingBattle.text('What will you do?');
                    BugCatchingBattle.busy(false);
                }, 1500);
                return;
            }
            BugCatchingBattle.text(`You throw ${BCBait.useName} at ${BugCatchingBattle.enemy.name}`);
            BCBait.use(BugCatchingBattle.enemy);
            const enemy = $('#bugCatchingBattleModal .enemy').offset();
            enemy.left += 30;
            enemy.top += 70;
            BugCatchingBattle.dropParticle(`<img width=16px src="${BCBait.image}">`, $('#bugCatchingBattleModal .pageItemFooter').offset(), enemy, 1000, 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            setTimeout(BugCatchingBattle.enemyTurn, 1500);
        }
    }

    public static throwRock() {
        if (!BugCatchingBattle.busy()) {
            BugCatchingBattle.busy(true);
            BugCatchingBattle.text(`You throw a rock at ${BugCatchingBattle.enemy.name}`);
            BugCatchingBattle.enemy.angry = Math.max(BugCatchingBattle.enemy.angry, Rand.intBetween(2, 6));
            BugCatchingBattle.enemy.eating = 0;
            const enemy = $('#bugCatchingBattleModal .enemy').offset();
            enemy.left += 40;
            enemy.top += 10;
            BugCatchingBattle.dropParticle('<img src="assets/images/safari/rock.png">', $('#bugCatchingBattleModal .pageItemFooter').offset(), enemy, 800, 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            setTimeout(() => {
                const hitSplash = $('<ptcl>').html('<img src="assets/images/safari/hit.png">').children().appendTo('#bugCatchingBattleModal');
                hitSplash.offset(enemy).css({'opacity': 0.8, 'z-index': 9998});
                hitSplash.fadeOut(400, () => {
                    hitSplash.remove();
                });
                setTimeout(() => {
                    const newOffset = {
                        top: enemy.top + 4,
                        left: enemy.left - 20,
                    };
                    const ang = $('<ptcl>').html('<img src="assets/images/safari/angry.png">').children().appendTo('#bugCatchingBattleModal');
                    ang.css('position', 'absolute').css('z-index', 9999);
                    ang.offset(newOffset);
                    ang.addClass('pulse');
                    setTimeout(() => {
                        newOffset.top -= 10;
                        newOffset.left += 60;
                        ang.offset(newOffset);
                        setTimeout(() => {
                            ang.remove();
                        }, 350);
                    }, 350);
                }, 300);
            }, 800);
            setTimeout(BugCatchingBattle.enemyTurn, 2000);
        }
    }

    public static run() {
        if (!BugCatchingBattle.busy()) {
            BugCatchingBattle.busy(true);
            BugCatchingBattle.text('You flee.');
            setTimeout(BugCatchingBattle.endBattle, 1500);
        }
    }

    private static enemyTurn() {
        // Enemy turn to flee;
        if (Rand.chance(BugCatchingBattle.enemy.escapeFactor / 100)) {
            BugCatchingBattle.text(`${BugCatchingBattle.enemy.name} has fled.`);
            setTimeout(BugCatchingBattle.endBattle, 1000);
        } else if (BugCatchingBattle.enemy.eating > 0) {
            BugCatchingBattle.text(`${BugCatchingBattle.enemy.name} is eating..`);
        } else if (BugCatchingBattle.enemy.angry > 0) {
            BugCatchingBattle.text(`${BugCatchingBattle.enemy.name} is angry!`);
        } else {
            BugCatchingBattle.text(`${BugCatchingBattle.enemy.name} is watching carefully...`);
        }
        BugCatchingBattle.enemy.eating = Math.max(0, BugCatchingBattle.enemy.eating - 1);
        BugCatchingBattle.enemy.angry = Math.max(0, BugCatchingBattle.enemy.angry - 1);
        setTimeout(() => {
            BugCatchingBattle.text('What will you do?');
            BugCatchingBattle.busy(false);
        }, 1500);
    }

    private static endBattle() {
        $('#bugCatchingBattleModal').one('hidden.bs.modal', () => {
            BugCatching.inBattle(false);
            BugCatchingBattle.busy(false);
        }).modal('hide');
    }

    private static gameOver() {
        BugCatchingBattle.text(GameConstants.BUGCATCHING_OUT_OF_BALLS);
        setTimeout(() => {
            BugCatching.inBattle(false);
            BugCatching.inProgress(false);
            BugCatchingBattle.busy(false);
            $('#bugCatchingBattleModal').modal('hide');
            $('#bugCatchingModal').modal('hide');
        }, 2000);
    }

    private static dropParticle(html: string, pos, target, time = 2, top, persistentParticle = false) {
        const p = $('<ptcl>').html(html).children().appendTo('#bugCatchingBattleModal');
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
}

namespace BugCatchingBattle {
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
