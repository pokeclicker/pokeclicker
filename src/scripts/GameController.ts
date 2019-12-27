/**
 * Class which controls the UI of the game.
 */
class GameController {
    static applyRouteBindings() {
        $('path, rect').hover(function () {
            let id = $(this).attr('data-town');
            if (id && id != 'mapTooltipWrapper') {
                let tooltip = $('#mapTooltip');
                tooltip.text(id);
                tooltip.css('visibility', 'visible')

            }
        }, function () {
            let tooltip = $('#mapTooltip');
            tooltip.text('');
            tooltip.css('visibility', 'hidden')
        });
    }

    static animateMoney(money, target) {
        let pos;
        if ($('#' + target).offset()) {
            pos = $('#' + target).offset();
        } else {
            pos = {"top": -200, "left": 0};
        }

        let left = ((Math.random() * ((pos.left + 25) - (pos.left - 25)) + (pos.left - 25))).toFixed(2);
        let place = money.toString().length;
        let multi = 1;
        for (let i = 0; i < place; i++) {
            multi *= 10;
        }
        let ani = '<p class="moneyanimation" style="z-index:50;position:absolute;left:' + left + 'px;top:' + pos.top + 'px;">+' + money + '</p>';
        $(ani).prependTo('body').animate({
                top: -100,
                opacity: 0
            }, 250 * Math.log(money) + 150, "linear",
            function () {
                $(this).remove();
            });
    }

    static updateMoney(text: string = $("#playerMoney").text()) {
        $("#playerMoney").prop('number', player.money);
    }
}
