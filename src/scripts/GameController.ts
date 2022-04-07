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
        }, () => {
            const tooltip = $('#mapTooltip');
            tooltip.text('');
            tooltip.css('visibility', 'hidden');
        });
    }

    static simulateKey(code: string, type = 'keydown', modifiers = {}) {
        const evtName = type.startsWith('key') ? type : `key${type}`;

        const event = document.createEvent('HTMLEvents') as KeyboardEvent;
        Object.defineProperties(event, {
            code: {value: code},
        });
        event.initEvent(evtName, true, false);

        for (const i in modifiers) {
            event[i] = modifiers[i];
        }

        document.dispatchEvent(event);
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

                ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                    $(element).tooltip('dispose');
                });
            },
            'update': function (element, valueAccessor) {
                const local = ko.utils.unwrapObservable(valueAccessor());
                const options = {};

                ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
                ko.utils.extend(options, local);

                // Update the config of the tooltip
                const tooltipData = $(element).data('bs.tooltip');
                tooltipData.config.title = (options as any).title;

                // If the tooltip is visible, update its text
                const tooltipInner = tooltipData.tip && tooltipData.tip.querySelector('.tooltip-inner');
                if (tooltipInner) {
                    tooltipInner.innerHTML = tooltipData.config.title || '';
                }
                if (tooltipData && tooltipData.config) {
                    if (tooltipData.config.title === '') {
                        $(element).tooltip('hide');
                    }
                }
            },
            options: {
                placement: 'bottom',
                trigger: 'click',
            },
        };
    }

    static focusedOnEditableElement(): boolean {
        const activeEl = document.activeElement as HTMLElement;
        const localName: string = activeEl.localName.toLowerCase();
        const editables = ['textarea', 'input', 'select'];

        return (editables.includes(localName) || activeEl.isContentEditable);
    }

    // Store keys for multi-key combinations
    static keyHeld = {}
    static addKeyListeners() {
        // Oak Items
        const $oakItemsModal = $('#oakItemsModal');
        $oakItemsModal.on('hidden.bs.modal shown.bs.modal', _ => $oakItemsModal.data('disable-toggle', false));
        const oakItems = App.game.oakItems;
        // Pokeball Selector
        const $pokeballSelector = $('#pokeballSelectorModal');
        const pokeballs = App.game.pokeballs;
        // Underground
        const $undergroundModal = $('#mineModal');
        $undergroundModal.on('hidden.bs.modal shown.bs.modal', _ => $undergroundModal.data('disable-toggle', false));
        const underground = App.game.underground;
        // Farm
        const $farmsModal = $('#farmModal');
        $farmsModal.on('hidden.bs.modal shown.bs.modal', _ => $farmsModal.data('disable-toggle', false));
        const farms = App.game.farming;
        // Hatchery
        const $hatcheryModal = $('#breedingModal');
        $hatcheryModal.on('hidden.bs.modal shown.bs.modal', _ => $hatcheryModal.data('disable-toggle', false));
        const hatchery = App.game.breeding;

        $(document).on('keydown', e => {
            // Ignore any of our controls if focused on an input element
            if (this.focusedOnEditableElement()) {
                return;
            }

            // Set flags for any key currently pressed down (used to check if key held down currently)
            GameController.keyHeld[e.code] = true;
            switch (e.code) {
                case Settings.getSetting('hotkey.farm').value:
                    // Open the Farm
                    if (farms.canAccess() && !$farmsModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $farmsModal.data('disable-toggle', true);
                        $farmsModal.modal('toggle');
                    }
                    break;
                case Settings.getSetting('hotkey.hatchery').value:
                    // Open the Hatchery
                    if ($undergroundModal.data('bs.modal')?._isShown) {
                        Mine.toolSelected(Mine.Tool.Hammer);
                    } else {
                        if (hatchery.canAccess() && !$hatcheryModal.data('disable-toggle')) {
                            $('.modal').modal('hide');
                            $hatcheryModal.data('disable-toggle', true);
                            $hatcheryModal.modal('toggle');
                        }
                    }
                    break;
                case Settings.getSetting('hotkey.oakitems').value:
                    // Open oak items
                    if (oakItems.canAccess() && !$oakItemsModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $oakItemsModal.data('disable-toggle', true);
                        $oakItemsModal.modal('toggle');
                    }
                    break;
                case Settings.getSetting('hotkey.underground').value:
                    // Open the Underground
                    if (underground.canAccess() && !$undergroundModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $undergroundModal.data('disable-toggle', true);
                        $undergroundModal.modal('toggle');
                    }
                    break;
                default:
                    let numKey = +e.key;
                    // Check for a number key being pressed
                    if (!isNaN(numKey)) {
                        // Make our number keys 1 indexed instead of 0
                        numKey -= 1;

                        if (GameController.keyHeld['KeyP']) {
                            // Open pokeball selector modal using P + (1-4) for each condition
                            if (!($pokeballSelector.data('bs.modal')?._isShown)) {
                                $('.modal').modal('hide');
                            }
                            $('#pokeballSelectorBody .clickable.pokeball-selected').eq(numKey)?.trigger('click');

                        } else if ($pokeballSelector.data('bs.modal')?._isShown) {
                            // Select Pokeball from pokeball selector (0 = none)
                            if (numKey < App.game.pokeballs.pokeballs.length) {
                                pokeballs.selectedSelection()(numKey);
                            }
                        } else if ($oakItemsModal.data('bs.modal')?._isShown) {
                            // Toggle oak items
                            if (oakItems.isUnlocked(numKey)) {
                                if (oakItems.isActive(numKey)) {
                                    oakItems.deactivate(numKey);
                                } else {
                                    oakItems.activate(numKey);
                                }
                            }
                        } else if ($undergroundModal.data('bs.modal')?._isShown) {
                            if (numKey == 0) {
                                ItemList['SmallRestore'].use();
                            } else if (numKey == 1) {
                                ItemList['MediumRestore'].use();
                            } else if (numKey == 2) {
                                ItemList['LargeRestore'].use();
                            }
                        }
                    }
                    if ($farmsModal.data('bs.modal')?._isShown) {
                        if (e.code == 'KeyS') {
                            FarmController.selectedShovel() ? FarmController.selectedShovel(false) : FarmController.selectedShovel(true);
                        }
                    } else if ($undergroundModal.data('bs.modal')?._isShown) {
                        if (e.code == 'KeyC') {
                            Mine.toolSelected(Mine.Tool.Chisel);
                        } else if (e.code == 'KeyS') {
                            Mine.survey();
                        } else if (e.code == 'KeyB') {
                            Mine.bomb();
                        }
                    }
                    if (GameController.keyHeld['ShiftLeft']) {
                        if (e.code == 'KeyS') {
                            Save.store(player);
                        }
                    }
            }

            if (App.game.gameState === GameConstants.GameState.dungeon) {
                switch (e.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        DungeonRunner.map.moveUp();
                        break;
                    case 'ArrowLeft':
                    case 'KeyA':
                        DungeonRunner.map.moveLeft();
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        DungeonRunner.map.moveDown();
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        DungeonRunner.map.moveRight();
                        break;
                    case 'Space':
                        if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.entrance) {
                            DungeonRunner.dungeonLeave();
                        } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.chest) {
                            DungeonRunner.openChest();
                        } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.boss && !DungeonRunner.fightingBoss()) {
                            DungeonRunner.startBossFight();
                        }
                        break;
                    default: // any other key (ignore)
                        return;
                }
                e.preventDefault();
            } else if (App.game.gameState === GameConstants.GameState.town) {
                if (e.code === 'Space') {
                    if (player.town().gym) {
                        GymRunner.startGym(player.town().gym);
                    } else if (player.town().dungeon) {
                        if (player.town() instanceof DungeonTown) {
                            DungeonRunner.initializeDungeon(player.town().dungeon);
                        } else {
                            MapHelper.moveToTown(player.town().dungeon.name);
                        }
                    }
                    e.preventDefault();
                } else if ('gymList' in player.town()) {
                    // Dont start if modal is show/shown
                    if (!$('#receiveBadgeModal').data('bs.modal')?._isShown) {
                        const number = Number(e.key);
                        // Check if a number higher than 0 and less than total Gyms was pressed
                        if (number && number <= player.town().gymList.length) {
                            GymRunner.startGym(player.town().gymList[number - 1]);
                        }
                    }
                }
            } else if (App.game.gameState === GameConstants.GameState.fighting) {
                const initialRoute = MapHelper.normalizeRoute(player.route(),player.region);
                const firstRoute = Routes.getRoutesByRegion(player.region)[0].number;
                const lastRoute = Routes.getRoutesByRegion(player.region)[Routes.getRoutesByRegion(player.region).length - 1].number;
                // Allow '=' to fallthrough to '+' since they share a key on many keyboards
                switch (e.key) {
                    case '=':
                    case '+':
                        if (initialRoute + 1 > MapHelper.normalizeRoute(lastRoute, player.region)) {
                            MapHelper.moveToRoute(firstRoute, player.region);
                        } else {
                            MapHelper.moveToRoute(Routes.unnormalizeRoute(initialRoute + 1), player.region);
                        }
                        break;
                    case '-':
                        if (initialRoute - 1 < MapHelper.normalizeRoute(firstRoute, player.region)) {
                            MapHelper.moveToRoute(lastRoute, player.region);
                        } else {
                            MapHelper.moveToRoute(Routes.unnormalizeRoute(initialRoute - 1), player.region);
                        }
                        break;
                    default: // any other key (ignore)
                        return;
                }
                e.preventDefault();
            } else if (App.game.gameState === GameConstants.GameState.safari) {
                const dir = GameConstants.KeyCodeToDirection[e.code];
                if (dir) {
                    e.preventDefault();
                    Safari.move(dir);
                }
                if (e.code === 'Space') {
                    e.preventDefault();
                }
            }
        });

        $(document).on('keyup', e => {
            // Ignore any of our controls if focused on an input element
            if (this.focusedOnEditableElement()) {
                return;
            }

            // Our key is no longer being held down
            delete GameController.keyHeld[e.code];

            if (App.game.gameState === GameConstants.GameState.safari) {
                const dir = GameConstants.KeyCodeToDirection[e.code];
                if (dir) {
                    e.preventDefault();
                    Safari.stop(dir);
                } else if (e.code === 'Space') {
                    e.preventDefault();
                }
            }
        });
    }
}

$(document).ready(() => {
    $('#pokedexModal').on('show.bs.modal', PokedexHelper.updateList);
});

// when stacking modals allow scrolling after top modal hidden
$(document).on('hidden.bs.modal', '.modal', () => {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});
