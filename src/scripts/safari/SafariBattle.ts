class SafariBattle {
    static _enemy: KnockoutObservable<SafariPokemon> = ko.observable();
    static busy = false;
    static text: KnockoutObservable<string> = ko.observable('What will you do?');
    static escapeAttempts = 0;
    static particle;

    public static get enemy(): SafariPokemon {
        return SafariBattle._enemy();
    }

    public static set enemy(pokemon: SafariPokemon) {
        SafariBattle._enemy(pokemon);
    }

    public static load() {
        SafariBattle.enemy = SafariPokemon.random();
        Safari.inBattle(true);
        Notifier.notify({ message: 'Battle', type: GameConstants.NotificationOption.info });
        SafariBattle.text('What will you do?');
        SafariBattle.unlockButtons();
        SafariBattle.escapeAttempts = 0;
    }

    public static throwBall() {
        if (!SafariBattle.busy) {
            SafariBattle.busy = true;
            Safari.balls(Safari.balls() - 1);

            $('#safariEnemy').css('transition-duration', `${0.75 * SafariBattle.Speed.enemyTransition}ms`);
            SafariBattle.text('You throw a ball...');
            const enemyImg = $('#safariEnemy').offset();
            enemyImg.left += 36;

            const ptclhtml = '<div><img id="safariBall" src="assets/images/safari/safariball.png"></div>';
            SafariBattle.particle = SafariBattle.dropParticle(ptclhtml, $('#safariPlayer').offset(), enemyImg, SafariBattle.Speed.ballThrow, 'cubic-bezier(0,0,0.4,1)', true).css('z-index', 9999);

            SafariBattle.delay(1.1 * SafariBattle.Speed.ballThrow)(0)            // throwing the ball
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
        return new Promise((resolve, reject) => {
            $('#safariEnemy').addClass('safariCapture');
            resolve();
        });
    }

    private static startBounce() {
        return new Promise((resolve, reject) => {
            $('body').css('animation-duration', `${1.6 * SafariBattle.Speed.ballBounce}ms`);
            $('#safariEnemy > img').css('opacity', '0');
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
                $('body').css('animation-duration', `${SafariBattle.Speed.ballRoll}ms`);
                SafariBattle.startRoll(index);
            }
            resolve([random, index]);
        });
    }

    private static delayRoll(result) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(result);
            }, (0.2 + 1.2 * result[1]) * SafariBattle.Speed.ballRoll);
        });
    }

    private static finishCapture(result) {
        const [random, index] = result;
        const isgameOver = (Safari.balls() == 0);
        return new Promise((resolve, reject) => {
            if (random * 100 < SafariBattle.enemy.catchFactor) {
                SafariBattle.capturePokemon();
                $('#safariBall').css('filter', 'brightness(0.4) grayscale(100%)');
                setTimeout(function () {
                    SafariBattle.particle.remove();
                    isgameOver ? SafariBattle.gameOver() : SafariBattle.endBattle();
                }, 1.7 * SafariBattle.Speed.enemyTransition);
            } else {
                $('#safariEnemy > img').css('opacity', '1');
                $('#safariEnemy').removeClass('safariCapture');
                SafariBattle.text(SafariBattle.CATCH_MESSAGES[index]);
                SafariBattle.particle.remove();
                setTimeout(function () {
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
        setTimeout(function () {
            SafariBattle.safariRoll(n - 1);
        }, 1200);
    }

    private static safariRoll = function (n) {
        if (n != 0) {
            $('#safariBall').toggleClass('safari-roll-left').toggleClass('safari-roll-right');
            setTimeout(function () {
                SafariBattle.safariRoll(n - 1);
            }, 1200);
        }
    }

    private static capturePokemon() {
        SafariBattle.text(`<br>GOTCHA!<br>${SafariBattle.enemy.name} was caught!`);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(SafariBattle.enemy.name).id, SafariBattle.enemy.shiny);
    }

    public static throwBait() {
        if (!SafariBattle.busy) {
            SafariBattle.busy = true;
            SafariBattle.text(`You throw some bait at ${SafariBattle.enemy.name}`);
            SafariBattle.enemy.eating = Math.max(SafariBattle.enemy.eating, Math.floor(Math.random() * 5 + 2));
            SafariBattle.enemy.angry = 0;
            const enemy = $('#safariEnemy').offset();
            enemy.left += 30;
            enemy.top += 70;
            SafariBattle.dropParticle('<img src="assets/images/safari/bait.png">', $('#safariPlayer').offset(), enemy, 1000, 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            setTimeout(SafariBattle.enemyTurn, 1500);
        }
    }

    public static throwRock() {
        if (!SafariBattle.busy) {
            SafariBattle.busy = true;
            SafariBattle.text(`You throw a rock at ${SafariBattle.enemy.name}`);
            SafariBattle.enemy.angry = Math.max(SafariBattle.enemy.angry, Math.floor(Math.random() * 5 + 2));
            SafariBattle.enemy.eating = 0;
            const enemy = $('#safariEnemy').offset();
            enemy.left += 40;
            enemy.top += 10;
            SafariBattle.dropParticle('<img src="assets/images/safari/rock.png">', $('#safariPlayer').offset(), enemy, 800, 'cubic-bezier(0,0,0.4,1)').css('z-index', 9999);
            setTimeout(function () {
                const hitSplash = $('<ptcl>').html("<img src='assets/images/safari/hit.png'>").children().appendTo('body');
                hitSplash.offset(enemy).css({'opacity': 0.8, 'z-index': 9998});
                hitSplash.fadeOut(400, function () {
                    hitSplash.remove();
                });
                setTimeout(function () {
                    const newOffset = {
                        top: enemy.top + 4,
                        left: enemy.left - 20,
                    };
                    const ang = $('<ptcl>').html("<img src='assets/images/safari/angry.png'>").children().appendTo('body');
                    ang.css('position', 'absolute').css('z-index', 9999);
                    ang.offset(newOffset);
                    ang.addClass('pulse');
                    setTimeout(function () {
                        newOffset.top -= 10;
                        newOffset.left += 60;
                        ang.offset(newOffset);
                        setTimeout(function () {
                            ang.remove();
                        }, 350);
                    }, 350);
                }, 300);
            }, 800);
            setTimeout(SafariBattle.enemyTurn, 2000);
        }
    }

    public static run() {
        if (!SafariBattle.busy) {
            SafariBattle.busy = true;
            SafariBattle.text('You flee.');
            setTimeout(SafariBattle.endBattle, 1500);
        }
    }

    private static enemyTurn() {
        // Enemy turn to flee;
        const random = Math.floor(Math.random() * 100);
        if (random < SafariBattle.enemy.escapeFactor) {
            SafariBattle.text(`${SafariBattle.enemy.name} has fled.`);
            setTimeout(SafariBattle.endBattle, 1000);
        } else if (SafariBattle.enemy.eating > 0) {
            SafariBattle.text(`${SafariBattle.enemy.name} is eating.`);
        } else if (SafariBattle.enemy.angry > 0) {
            SafariBattle.text(`${SafariBattle.enemy.name} is angry!`);
        } else {
            SafariBattle.text(`${SafariBattle.enemy.name} is watching carefully...`);
        }
        SafariBattle.enemy.eating = Math.max(0, SafariBattle.enemy.eating - 1);
        SafariBattle.enemy.angry = Math.max(0, SafariBattle.enemy.angry - 1);
        setTimeout(function () {
            SafariBattle.text('What will you do?');
            SafariBattle.busy = false;
            SafariBattle.unlockButtons();
        }, 1500);
    }

    private static lockButtons() {
        $('.safariOption button').attr('disabled', 'true');
    }

    private static unlockButtons() {
        $('.safariOption button').attr('disabled', null);
    }

    private static endBattle() {
        Safari.inBattle(false);
        SafariBattle.busy = false;
    }

    private static gameOver() {
        SafariBattle.text(GameConstants.SAFARI_OUT_OF_BALLS);
        setTimeout(function () {
            Safari.inBattle(false);
            Safari.inProgress(false);
            SafariBattle.busy = false;
            $('#safariModal').modal('toggle');
        }, 2000);
    }

    private static dropParticle(html: string, pos, target, time = 2, top, persistentParticle = false) {
        const p = $('<ptcl>').html(html).children().appendTo('body');
        p.css('position', 'absolute');
        p.offset(pos);
        if (!top) {
            top = 'cubic-bezier(0.6, -0.3, 0.7, 0)';
        }
        p[0].style.transition = `left ${time}ms linear, top ${time}ms ${top}`;
        p.offset(target);
        if (!persistentParticle) {
            setTimeout(function () {
                p.fadeOut();
            }, time - 200);
            setTimeout(function () {
                p.remove();
            }, time);
        }
        return p;
    };
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
        'Oh, no!<br>The Pokemon broke free!',
        'Aww! It appeared to be caught!',
        'Aargh! Almost had it!',
        'Shoot! It was so close, too!',
    ];
}
