class SafariBattle {
    static _enemy: KnockoutObservable<SafariPokemon> = ko.observable();
    static busy: boolean = false;
    static text: KnockoutObservable<string> = ko.observable("What will you do?");
    static escapeAttempts: number = 0;

    public static get enemy(): SafariPokemon {
        return SafariBattle._enemy();
    }

    public static set enemy(pokemon: SafariPokemon) {
        SafariBattle._enemy(pokemon);
    }

    public static load() {
        SafariBattle.enemy = SafariPokemon.random();
        Safari.inBattle(true);
        Notifier.notify("Battle", GameConstants.NotificationOption.info);
        SafariBattle.showBattleBars();
        SafariBattle.text("What will you do?");
        SafariBattle.unlockButtons();
        SafariBattle.escapeAttempts = 0;
    }

    private static showBattleBars() {
        /*
        let html =  "<div id='battleBars' class='container-fluid'>";
        for( let i = 0; i<10; i++){
            html += "<div id=battleBar"+i + " class='battleBar'></div>";
        }

        html += "</div>";
        $("#safariBody").html(html);
        $(".battleBar").animate({
            width: "50%"
        }, 1000, "linear");
        */
        SafariBattle.show();
    }

    private static show() {
        $("#safariBody").hide();
        $("#safariBattleBody").show();
    }

    public static throwBall() {
        if(!SafariBattle.busy) {
            SafariBattle.busy = true;
            Safari.balls(Safari.balls()-1);
            let gameOver = Safari.balls() == 0;
            SafariBattle.text("You throw a ball...");
            let enemyImg = $('#safariEnemy').offset();
            enemyImg.left += 48;
            let p = SafariBattle.dropParticle('<div><img id="safariBall" src="assets/images/safari/pokeball.png"></div>', $('#safariPlayer').offset(), enemyImg, 0.75, 'cubic-bezier(0,0,0.4,1)', true).css('z-index',9999);

            setTimeout(function() {
                $('#safariEnemy').addClass('safariCapture');

                setTimeout(function() {
                    $('#safariEnemy > img').css('opacity', '0');
                    p.addClass('bounce');

                    setTimeout(function () {
                        const random = Math.random();
                        const catchF = SafariBattle.enemy.catchFactor / 100;
                        const index = catchF >= 1 ? 3 : Math.floor( 4 * (1 - Math.max( random, catchF )) / (1 - catchF) );
                        if (index != 0) {
                            SafariBattle.startRoll(index);
                        }

                        setTimeout(function(){
                            const oakBonus = OakItemRunner.isActive(GameConstants.OakItem.Magic_Ball) ?
                                OakItemRunner.calculateBonus(GameConstants.OakItem.Magic_Ball) : 0;
                            const prestigeBonus = PrestigeBonuses.getBonus(5);
                            if (random * 100 < SafariBattle.enemy.catchFactor + oakBonus + prestigeBonus){
                                SafariBattle.capturePokemon();
                                $('#safariBall').css('filter', 'brightness(0.4) grayscale(100%)');
                                setTimeout(function(){
                                    p.remove();
                                    gameOver ? SafariBattle.gameOver() : SafariBattle.endBattle();
                                }, 2000);
                            } else {
                                $('#safariEnemy > img').css('opacity', '1');
                                $('#safariEnemy').removeClass('safariCapture');
                                SafariBattle.text(GameConstants.SAFARI_CATCH_MESSAGES[index]);
                                p.remove();
                                setTimeout( function() {
                                    gameOver ? SafariBattle.gameOver() : SafariBattle.enemyTurn();
                                }, 1000);
                            }
                        }, (200 + 1200 * index));
                    }, 1700);
                }, 750);
            }, 750);
        }
    }

    private static startRoll = function(n){
        if (n == 4) {n--}
        $('#safariBall').addClass('safari-roll-left');
        setTimeout(function(){ SafariBattle.safariRoll(n-1) }, 1200);
    }

    private static safariRoll = function(n){
        if (n != 0){
            $('#safariBall').toggleClass('safari-roll-left').toggleClass('safari-roll-right');
            setTimeout(function(){SafariBattle.safariRoll(n-1)}, 1200);
        }
    }

    private static capturePokemon() {
        SafariBattle.text(`GOTCHA!<br> ${SafariBattle.enemy.name} was caught!`);
        player.capturePokemon(SafariBattle.enemy.name, SafariBattle.enemy.shiny);
    }

    public static throwBait() {
        if(!SafariBattle.busy){
            SafariBattle.busy = true;
            SafariBattle.text("You throw some bait at " + SafariBattle.enemy.name);
            SafariBattle.enemy.eating = Math.max(SafariBattle.enemy.eating, Math.floor(Math.random()*5 + 2));
            SafariBattle.enemy.angry = 0;
            let enemy = $('#safariEnemy').offset();
            enemy.left += 30;
            enemy.top += 70;
            SafariBattle.dropParticle('<img src="assets/images/safari/bait.png">', $('#safariPlayer').offset(), enemy, 1, 'cubic-bezier(0,0,0.4,1)').css('z-index',9999);
            setTimeout(SafariBattle.enemyTurn, 1500);
        }
    }

    public static throwRock() {
        if(!SafariBattle.busy) {
            SafariBattle.busy = true;
            SafariBattle.text("You throw a rock at " + SafariBattle.enemy.name);
            SafariBattle.enemy.angry = Math.max(SafariBattle.enemy.angry, Math.floor(Math.random() * 5 + 2));
            SafariBattle.enemy.eating = 0;
            let enemy = $('#safariEnemy').offset();
            enemy.left += 40;
            enemy.top += 10;
            SafariBattle.dropParticle('<img src="assets/images/safari/rock.png">', $('#safariPlayer').offset(), enemy, 0.8, 'cubic-bezier(0,0,0.4,1)').css('z-index',9999);
            setTimeout(function(){
                let hitSplash = $('<ptcl>').html("<img src='assets/images/safari/hit.png'>").children().appendTo('body');
                hitSplash.offset(enemy).css({'opacity': 0.8, 'z-index': 9998});
                hitSplash.fadeOut(400, function(){hitSplash.remove();});
                setTimeout(function(){
                    let newOffset = {
                        top: enemy.top + 4,
                        left: enemy.left - 20
                    }
                    let ang = $('<ptcl>').html("<img src='assets/images/safari/angry.png'>").children().appendTo('body');
                    ang.css('position','absolute').css('z-index', 9999);
                    ang.offset(newOffset);
                    ang.addClass('pulse');
                    setTimeout(function(){
                        newOffset.top -= 10;
                        newOffset.left += 60;
                        ang.offset(newOffset);
                        setTimeout(function(){
                            ang.remove();
                        },350);
                    },350);
                },300);
            },800);
            setTimeout(SafariBattle.enemyTurn, 2000);
        }
    }

    public static run() {
        if (!SafariBattle.busy){
            SafariBattle.busy = true;
            if(Math.random()*100 < (30 + 15*SafariBattle.escapeAttempts)){
                SafariBattle.text("You flee.");
                setTimeout(SafariBattle.endBattle, 1500);
            } else {
                SafariBattle.text("You can't escape...");
                setTimeout(SafariBattle.enemyTurn, 1000);
            }
        }
    }

    private static enemyTurn() {
        // Enemy turn to flee;
        let random = Math.floor(Math.random()*100);
        if( random < SafariBattle.enemy.escapeFactor){
            SafariBattle.text(SafariBattle.enemy.name + " has fled.");
            setTimeout(SafariBattle.endBattle, 1000);
        } else if(SafariBattle.enemy.eating > 0) {
            SafariBattle.text(SafariBattle.enemy.name + " is eating.");
        } else if(SafariBattle.enemy.angry > 0) {
            SafariBattle.text(SafariBattle.enemy.name + " is angry!");
        } else {
            SafariBattle.text(SafariBattle.enemy.name + " is watching carefully...");
        }
        SafariBattle.enemy.eating = Math.max(0, SafariBattle.enemy.eating-1);
        SafariBattle.enemy.angry = Math.max(0, SafariBattle.enemy.angry-1);
        setTimeout(function(){
            SafariBattle.text("What will you do?");
            SafariBattle.busy = false;
            SafariBattle.unlockButtons();
        }, 1500);
        console.log(`Catch chance: ${SafariBattle.enemy.catchFactor}%`);
        console.log(`Escape chance: ${SafariBattle.enemy.escapeFactor}%`);
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
        $("#safariBattleBody").hide();
        $("#safariBody").show();
    }

    private static gameOver() {
        SafariBattle.text(GameConstants.SAFARI_OUT_OF_BALLS);
        setTimeout(function() {
            Safari.inBattle(false);
            SafariBattle.busy = false;
            $("#safariModal").modal('toggle');
        }, 2000);
    }

    private static dropParticle(html: string, pos, target, time: number = 2, top, persistentParticle: boolean = false) {
        let p = $('<ptcl>').html(html).children().appendTo('body');
        p.css('position','absolute')
        p.offset(pos);
        if (!top) top = 'cubic-bezier(0.6, -0.3, 0.7, 0)';
        p[0].style.transition = 'left ' + time + 's linear, top ' + time + 's '+top;
        p.offset(target);
        if (!persistentParticle) {
            setTimeout(function() {
                p.fadeOut();
            }, time * 1000 - 200);
            setTimeout(function() {
                p.remove();
            }, time * 1000);
        }
        return p;
    };
}
