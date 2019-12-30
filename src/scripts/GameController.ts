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

    static animateCurrency(amount: number, target) {
        let pos;
        if ($('#' + target).offset()) {
            pos = $('#' + target).offset();
            pos.top -= 15;
        } else {
            pos = {"top": -200, "left": 0};
        }

        let left = ((Math.random() * ((pos.left + 25) - (pos.left - 25)) + (pos.left - 25))).toFixed(2);
        let place = amount.toString().length;
        let multi = 1;
        for (let i = 0; i < place; i++) {
            multi *= 10;
        }
        let ani = '<p style="z-index:50;position:absolute;left:' + left + 'px;top:' + pos.top + 'px; font-size:' + (10 + 0.5 * Math.log(amount)) + 'px;">+' + amount.toLocaleString('en-US') + '</p>';
        $(ani).prependTo('body').animate({
                top: 10,
                opacity: 0
            }, 200 * Math.log(amount) + 1000, "linear",
            function () {
                $(this).remove();
            });
    }

    static bindToolTips() {
        $(document).ready(function () {
            $('[data-toggle="popover"]').popover();
            $('[data-toggle="tooltip"]').tooltip();
        });


        (ko as any).bindingHandlers.tooltip = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                let local = ko.utils.unwrapObservable(valueAccessor()),
                    options = {};

                ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
                ko.utils.extend(options, local);

                $(element).tooltip(options);

                if (bindingContext.$data instanceof Plot) {
                    $(element).hover(function () {
                        $(this).data('to', setInterval(function () {
                            $(element).tooltip('hide')
                                .attr('data-original-title', FarmRunner.getTooltipLabel(bindingContext.$index()))
                                .tooltip('show');
                        }, 100));
                    }, function () {
                        clearInterval($(this).data('to'));
                    });
                }

            },
            options: {
                placement: "bottom",
                trigger: "click"
            }
        };
    }
}

$(document).ready(function () {
    $(document).on("keydown", function (e) {
        let keyCode = e.keyCode;

        if (App.game.gameState === GameConstants.GameState.dungeon) {
            if (keyCode == 38 || keyCode == 87) {
                DungeonRunner.map.moveUp();
            } else if (keyCode == 39 || keyCode == 68) {
                DungeonRunner.map.moveRight();
            } else if (keyCode == 37 || keyCode == 65) {
                DungeonRunner.map.moveLeft();
            } else if (keyCode == 40 || keyCode == 83) {
                DungeonRunner.map.moveDown();
            } else if (keyCode == 32) {
                DungeonRunner.openChest();
                DungeonRunner.startBossFight();
            }
            e.preventDefault();
        }

    });

    $(document).on("keydown", function (e) {
        let keyCode = e.keyCode;
        if (App.game.gameState === GameConstants.GameState.safari) {
            let dir = GameConstants.KeyToDirection[keyCode];
            if (dir) {
                e.preventDefault();
                Safari.move(dir);
            }
            if (keyCode == 32) { // space
                e.preventDefault();
            }
        }
    });

    $(document).on("keyup", function (e) {
        let keyCode = e.keyCode;
        if (App.game.gameState === GameConstants.GameState.safari) {
            let dir = GameConstants.KeyToDirection[keyCode];
            if (dir) {
                e.preventDefault();
                Safari.stop(dir);
            } else if (keyCode == 32) { // space
                e.preventDefault();
            }
        }
    });

    $("#pokedexModal").on("show.bs.modal", PokedexHelper.updateList)
});
