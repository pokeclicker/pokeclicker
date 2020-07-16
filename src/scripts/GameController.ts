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
        // Check if animations have been disabled
        if (!Settings.getSetting('showCurrencyGainedAnimation').observableValue()) {
            return;
        }
        let pos;
        const targetVisible = $(`#${target}`).is(':visible');

        if ($(`#${target}`).offset() && targetVisible) {
            pos = $(`#${target}`).offset();
            pos.top -= 15;
        } else {
            pos = $('#gameTitle').offset();
            pos.top += 45;
            pos.left -= 100;
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

    static simulateKey(keyCode: number, type = 'keydown', modifiers = {}) {
        const evtName = type.startsWith('key') ? type : `key${type}`;

        const event = document.createEvent('HTMLEvents') as KeyboardEvent;
        Object.defineProperties(event, {
            keyCode: {value: keyCode},
        });
        event.initEvent(evtName, true, false);

        for (const i in modifiers) {
            event[i] = modifiers[i];
        }

        document.dispatchEvent(event);
    }

    static simulateKeyPress(keyCode: number, modifiers = {}) {
        this.simulateKey(keyCode, 'down', modifiers);
        setTimeout(() => {
            this.simulateKey(keyCode, 'up', modifiers);
        }, 20);
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
                switch (keyCode) {
                    case 38: // up
                    case 87: // w
                        DungeonRunner.map.moveUp();
                        break;
                    case 37: // left
                    case 65: // a
                        DungeonRunner.map.moveLeft();
                        break;
                    case 40: // down
                    case 83: // s
                        DungeonRunner.map.moveDown();
                        break;
                    case 39: // right
                    case 68: // d
                        DungeonRunner.map.moveRight();
                        break;
                    case 32: // space
                        DungeonRunner.openChest();
                        DungeonRunner.startBossFight();
                        break;
                    default: // any other key (ignore)
                        return;
                }
                e.preventDefault();
            } else if (App.game.gameState === GameConstants.GameState.town) {
                if (keyCode == 32) { // space
                    if (player.town().gym()) {
                        GymRunner.startGym(player.town().gym());
                    } else if (player.town().dungeon()) {
                        DungeonRunner.initializeDungeon(player.town().dungeon());
                    }
                    e.preventDefault();
                }
            } else if (App.game.gameState === GameConstants.GameState.fighting) {
                switch (keyCode) {
                    case 187: // plus
                    case 107: // plus (numpad)
                        MapHelper.moveToRoute(player.route() + 1, player.region);
                        break;
                    case 189: // minus
                    case 109: // minus (numpad)
                        MapHelper.moveToRoute(player.route() - 1, player.region);
                        break;
                    default: // any other key (ignore)
                        return;
                }
                e.preventDefault();
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

// when stacking modals allow scrolling after top modal hidden
$(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});
