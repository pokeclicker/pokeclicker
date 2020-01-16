/**
 * Class which controls the UI of the game.
 */
class GameController {
    static applyRouteBindings() {
        $('path, rect').hover(function () {
            const id = $(this).attr('data-town');
            if (id && id != 'mapTooltipWrapper') {
                const tooltip = $('#mapTooltip');
                tooltip.text(id);
                tooltip.css('visibility', 'visible');

            }
        }, function () {
            const tooltip = $('#mapTooltip');
            tooltip.text('');
            tooltip.css('visibility', 'hidden');
        });
    }

    static animateCurrency(amount: number, target) {
        let pos;
        if ($(`#${target}`).offset()) {
            pos = $(`#${target}`).offset();
            pos.top -= 15;
        } else {
            pos = {'top': -200, 'left': 0};
        }

        const left = ((Math.random() * ((pos.left + 25) - (pos.left - 25)) + (pos.left - 25))).toFixed(2);
        const place = amount.toString().length;
        let multi = 1;
        for (let i = 0; i < place; i++) {
            multi *= 10;
        }
        const ani = `<p style="z-index:50;position:absolute;left:${left}px;top:${pos.top}px; font-size:${10 + 0.5 * Math.log(amount)}px;">+${amount.toLocaleString('en-US')}</p>`;
        $(ani).prependTo('body').animate({
            top: 10,
            opacity: 0,
        }, 200 * Math.log(amount) + 1000, 'linear',
        function () {
            $(this).remove();
        });
    }

    static bindToolTips() {
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="tooltip"]').tooltip();


        (ko as any).bindingHandlers.tooltip = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                const local = ko.utils.unwrapObservable(valueAccessor()),
                    options = {};

                ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
                ko.utils.extend(options, local);

                $(element).tooltip(options);


                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    $(element).tooltip('dispose');
                });

                if (bindingContext.$data instanceof Plot) {
                    $(element).hover(function () {
                        $(this).data('to', setInterval(function () {
                            $(element).tooltip('hide')
                                .attr('data-original-title', FarmController.getTooltipLabel(bindingContext.$index()))
                                .tooltip('show');
                        }, 100));
                    }, function () {
                        clearInterval($(this).data('to'));
                    });
                }

            },
            options: {
                placement: 'bottom',
                trigger: 'click',
            },
        };
    }

    static addKeyListeners() {
        $(document).on('keydown', function (e) {
            const keyCode = e.keyCode;

            if (App.game.gameState === GameConstants.GameState.dungeon) {
                if (keyCode == 38 || keyCode == 87) { // up || w
                    DungeonRunner.map.moveUp();
                } else if (keyCode == 39 || keyCode == 68) { // right || d
                    DungeonRunner.map.moveRight();
                } else if (keyCode == 37 || keyCode == 65) { // left || a
                    DungeonRunner.map.moveLeft();
                } else if (keyCode == 40 || keyCode == 83) { // down || s
                    DungeonRunner.map.moveDown();
                } else if (keyCode == 32) { // space
                    DungeonRunner.openChest();
                    DungeonRunner.startBossFight();
                }
                e.preventDefault();
            } else if (App.game.gameState === GameConstants.GameState.town) {
                if (keyCode == 32) { // space
                    if (player.town().gyms[0]) {
                        GymRunner.startGym(player.town().gyms[0]);
                    } else if (player.town() instanceof DungeonEntrance) {
                        DungeonRunner.initializeDungeon(player.town().dungeons[0]);
                    }
                    e.preventDefault();
                }
            }

        });

        $(document).on('keydown', function (e) {
            const keyCode = e.keyCode;
            if (App.game.gameState === GameConstants.GameState.safari) {
                const dir = GameConstants.KeyToDirection[keyCode];
                if (dir) {
                    e.preventDefault();
                    Safari.move(dir);
                }
                if (keyCode == 32) { // space
                    e.preventDefault();
                }
            }
        });

        $(document).on('keyup', function (e) {
            const keyCode = e.keyCode;
            if (App.game.gameState === GameConstants.GameState.safari) {
                const dir = GameConstants.KeyToDirection[keyCode];
                if (dir) {
                    e.preventDefault();
                    Safari.stop(dir);
                } else if (keyCode == 32) { // space
                    e.preventDefault();
                }
            }
        });
    }
}

$(document).ready(function () {
    $('#pokedexModal').on('show.bs.modal', PokedexHelper.updateList);
});
