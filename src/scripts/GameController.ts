/**
 * Class which controls the UI of the game.
 */
class GameController {
    static showMapTooltip(tooltipText: string) {
        if (tooltipText) {
            const tooltip = $('#mapTooltip');
            tooltip.text(tooltipText);
            tooltip.css('visibility', 'visible');
        }
    }

    static hideMapTooltip() {
        const tooltip = $('#mapTooltip');
        tooltip.text('');
        tooltip.css('visibility', 'hidden');
    }

    static convertKey(key: string) {
        let newKey = key.length > 1 ? key : key.toUpperCase();
        if (newKey == ' ') {
            newKey = 'Space';
        }
        return newKey;
    }

    static simulateKey(code: string, type = 'keydown', modifiers = {}) {
        const evtName = type.startsWith('key') ? type : `key${type}`;

        const event = document.createEvent('HTMLEvents') as KeyboardEvent;
        Object.defineProperties(event, {
            key: {value: code},
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
    }

    static focusedOnEditableElement(): boolean {
        const activeEl = document.activeElement as HTMLElement;
        const localName: string = activeEl.localName.toLowerCase();
        const editables = ['textarea', 'input', 'select'];

        return (editables.includes(localName) || activeEl.isContentEditable);
    }

    // Store keys for multi-key combinations
    static keyHeld: Record<string, KnockoutObservable<boolean>> = {
        Shift: ko.observable(false).extend({ boolean: null }),
    }
    //Event listeners for hide, hidden and shown. hide is required to prevent 'softlocking' and bricking Bootstrap when closed externally
    static addKeyListeners() {
        // Oak Items
        const oakItems = App.game.oakItems;
        const $oakItemsModal = $('#oakItemsModal');
        $oakItemsModal.on('hide.bs.modal', _ => $oakItemsModal.data('disable-toggle', true));
        $oakItemsModal.on('hidden.bs.modal shown.bs.modal', _ => $oakItemsModal.data('disable-toggle', false));
        // Pokeball Selector
        const pokeballs = App.game.pokeballs;
        const $pokeballSelector = $('#pokeballSelectorModal');
        $pokeballSelector.on('hide.bs.modal', _ => $pokeballSelector.data('disable-toggle', true));
        $pokeballSelector.on('hidden.bs.modal shown.bs.modal', _ => $pokeballSelector.data('disable-toggle', false));
        // Underground
        const underground = App.game.underground;
        const $undergroundModal = $('#mineModal');
        $undergroundModal.on('hide.bs.modal', _ => $undergroundModal.data('disable-toggle', true));
        $undergroundModal.on('hidden.bs.modal shown.bs.modal', _ => $undergroundModal.data('disable-toggle', false));
        // Quests
        const quests = App.game.quests;
        const $questModal = $('#QuestModal');
        $questModal.on('hide.bs.modal', _ => $questModal.data('disable-toggle', true));
        $questModal.on('hidden.bs.modal shown.bs.modal', _ => $questModal.data('disable-toggle', false));
        // Farm
        const farms = App.game.farming;
        const $farmsModal = $('#farmModal');
        $farmsModal.on('hide.bs.modal', _ => $farmsModal.data('disable-toggle', true));
        $farmsModal.on('hidden.bs.modal shown.bs.modal', _ => $farmsModal.data('disable-toggle', false));
        // Hatchery
        const hatchery = App.game.breeding;
        const $hatcheryModal = $('#breedingModal');
        $hatcheryModal.on('hide.bs.modal', _ => $hatcheryModal.data('disable-toggle', true));
        $hatcheryModal.on('hidden.bs.modal shown.bs.modal', _ => $hatcheryModal.data('disable-toggle', false));
        // Shop
        const $shopModal = $('#shopModal');
        $shopModal.on('hide.bs.modal', _ => $shopModal.data('disable-toggle', true));
        $shopModal.on('hidden.bs.modal shown.bs.modal', _ => $shopModal.data('disable-toggle', false));
        // Ship
        const $shipModal = $('#ShipModal');
        // Modal Collapse
        $(GameConstants.ModalCollapseList).map(function() {
            const id = `#${this}`;
            const method = Settings.getSetting(`modalCollapse.${this}`).value ? 'show' : 'hide';
            $(id).collapse(method);
            return $(id).get();
        }).on('show.bs.collapse',function() {
            Settings.setSettingByName(`modalCollapse.${this.id}`, true);
        }).on('hide.bs.collapse',function() {
            Settings.setSettingByName(`modalCollapse.${this.id}`, false);
        });

        $(document).on('keydown', e => {
            // Ignore any of our controls if focused on an input element
            if (this.focusedOnEditableElement()) {
                return;
            }

            const key = GameController.convertKey(e.key);

            // Set flags for any key currently pressed down (used to check if key held down currently)
            if (GameController.keyHeld[key]) {
                GameController.keyHeld[key](true);
            } else {
                GameController.keyHeld[key] = ko.observable(true).extend({ boolean: null });
            }

            // Set our number key if defined (-1 for 0 indexed)
            const numberKey = (+key) - 1;
            const isNumberKey = !isNaN(numberKey) && numberKey >= 0;
            const visibleModals = $('.modal:visible').length;

            //Global Multi-key combinations
            if (isNumberKey) {
                if (GameController.keyHeld[Settings.getSetting('hotkey.pokeballSelection').value]?.()) {
                    // Open pokeball selector modal using P + (1-4) for each condition
                    if (!($pokeballSelector.data('bs.modal')?._isShown) && !$pokeballSelector.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $('#pokeballSelectorBody .clickable.pokeball-selected').eq(numberKey)?.trigger('click');
                        return e.preventDefault();
                    }
                }
            }

            // Safari Zone
            if (App.game.gameState === GameConstants.GameState.safari) {
                switch (key) {
                    case 'ArrowUp':
                    case Settings.getSetting('hotkey.dungeon.up').value:
                        Safari.move('up');
                        break;
                    case 'ArrowLeft':
                    case Settings.getSetting('hotkey.dungeon.left').value:
                        Safari.move('left');
                        break;
                    case 'ArrowDown':
                    case Settings.getSetting('hotkey.dungeon.down').value:
                        Safari.move('down');
                        break;
                    case 'ArrowRight':
                    case Settings.getSetting('hotkey.dungeon.right').value:
                        Safari.move('right');
                        break;
                    case Settings.getSetting('hotkey.safari.ball').value:
                        SafariBattle.throwBall();
                        break;
                    case Settings.getSetting('hotkey.safari.bait').value:
                        SafariBattle.throwBait();
                        break;
                    case Settings.getSetting('hotkey.safari.rock').value:
                        SafariBattle.throwRock();
                        break;
                    case Settings.getSetting('hotkey.safari.run').value:
                        SafariBattle.run();
                        break;
                }

                // We don't want to process any other keys while in the Safari zone
                return e.preventDefault();
            }

            // Within modals
            if ($farmsModal.data('bs.modal')?._isShown) {
                switch (key) {
                    case Settings.getSetting('hotkey.farm.toggleShovel').value:
                        [FarmingTool.Shovel, FarmingTool.MulchShovel].includes(FarmController.selectedFarmTool()) ? FarmController.selectedFarmTool(FarmController.berryListVisible() ? FarmingTool.Berry : FarmingTool.Mulch) : FarmController.selectedFarmTool(FarmController.berryListVisible() ? FarmingTool.Shovel : FarmingTool.MulchShovel);
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.farm.togglePlotSafeLock').value:
                        FarmController.selectedFarmTool() == FarmingTool.Lock ? FarmController.selectedFarmTool(FarmController.berryListVisible() ? FarmingTool.Berry : FarmingTool.Mulch) : FarmController.selectedFarmTool(FarmingTool.Lock);
                        return e.preventDefault();
                }
            }
            if ($undergroundModal.data('bs.modal')?._isShown) {
                switch (key) {
                    case Settings.getSetting('hotkey.underground.hammer').value:
                        Mine.toolSelected(Mine.Tool.Hammer);
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.underground.chisel').value:
                        Mine.toolSelected(Mine.Tool.Chisel);
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.underground.survey').value:
                        Mine.survey();
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.underground.bomb').value:
                        Mine.bomb();
                        return e.preventDefault();
                }
                if (isNumberKey) {
                    if (numberKey === 0) {
                        ItemList.SmallRestore.use(1);
                    } else if (numberKey === 1) {
                        ItemList.MediumRestore.use(1);
                    } else if (numberKey === 2) {
                        ItemList.LargeRestore.use(1);
                    }
                    return e.preventDefault();
                }
            }
            if ($oakItemsModal.data('bs.modal')?._isShown) {
                // Toggle oak items
                if (isNumberKey) {
                    if (oakItems.isUnlocked(numberKey)) {
                        if (oakItems.isActive(numberKey)) {
                            oakItems.deactivate(numberKey);
                        } else {
                            oakItems.activate(numberKey);
                        }
                    }
                    return e.preventDefault();
                }
            }
            if ($pokeballSelector.data('bs.modal')?._isShown) {
                if (isNumberKey) {
                    // Switch selection type
                    if (GameController.keyHeld[Settings.getSetting('hotkey.pokeballSelection').value]?.()) {
                        $('#pokeballSelectorBody .clickable.pokeball-selected').eq(numberKey)?.trigger('click');
                        return e.preventDefault();
                    }
                    // Select Pokeball from pokeball selector (0 = none)
                    if (numberKey < App.game.pokeballs.pokeballs.length) {
                        pokeballs.selectedSelection()?.(numberKey);
                    }
                    return e.preventDefault();
                }
            }
            if ($shipModal.data('bs.modal')?._isShown) {
                if (isNumberKey) {
                    if (numberKey <= player.highestRegion()) {
                        const regionButton = $('.ship-modal-region-button').eq(numberKey);
                        if (regionButton && !regionButton.prop('disabled')) {
                            regionButton.trigger('click');
                        }
                    }
                    return e.preventDefault();
                }
            }
            if ($shopModal.data('bs.modal')?._isShown) {
                if (isNumberKey) {
                    if (numberKey <= ShopHandler.shopObservable().items.length) {
                        ShopHandler.setSelected(numberKey);
                    }
                    return e.preventDefault();
                }
                switch (key) {
                    case Settings.getSetting('hotkey.shop.buy').value:
                        ShopHandler.buyItem();
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.shop.max').value:
                        ShopHandler.maxAmount();
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.shop.reset').value:
                        ShopHandler.resetAmount();
                        return e.preventDefault();
                    case Settings.getSetting('hotkey.shop.increase').value:
                        if (GameController.keyHeld.Shift()) {
                            switch (Settings.getSetting('shopButtons').value) {
                                case 'original':
                                    ShopHandler.increaseAmount(100);
                                    break;
                                case 'multiplication':
                                    ShopHandler.multiplyAmount(0.1);
                                    break;
                                case 'bigplus':
                                    ShopHandler.increaseAmount(1000);
                                    break;
                            }
                        } else {
                            switch (Settings.getSetting('shopButtons').value) {
                                case 'original':
                                    ShopHandler.increaseAmount(10);
                                    break;
                                case 'multiplication':
                                    ShopHandler.multiplyAmount(10);
                                    break;
                                case 'bigplus':
                                    ShopHandler.increaseAmount(100);
                                    break;
                            }
                        }
                        return e.preventDefault();
                }
            }

            // Only run if no modals are open
            if (visibleModals === 0) {
                // Route Battles
                if (App.game.gameState === GameConstants.GameState.fighting && !GameController.keyHeld.Control?.()) {
                    const cycle = Routes.getRoutesByRegion(player.region).filter(r => r.isUnlocked()).map(r => r.number);
                    const idx = cycle.findIndex(r => r == player.route);
                    // Allow '=' to fallthrough to '+' since they share a key on many keyboards
                    switch (key) {
                        case '=':
                        case '+': MapHelper.moveToRoute(cycle[(idx + 1) % cycle.length], player.region);
                            return e.preventDefault();
                        case '-': MapHelper.moveToRoute(cycle[(idx + cycle.length - 1) % cycle.length], player.region);
                            return e.preventDefault();
                    }
                }

                // Dungeons
                if (App.game.gameState === GameConstants.GameState.dungeon) {
                    switch (key) {
                        case 'ArrowUp':
                        case Settings.getSetting('hotkey.dungeon.up').value:
                            DungeonRunner.map.moveUp();
                            return e.preventDefault();
                        case 'ArrowLeft':
                        case Settings.getSetting('hotkey.dungeon.left').value:
                            DungeonRunner.map.moveLeft();
                            return e.preventDefault();
                        case 'ArrowDown':
                        case Settings.getSetting('hotkey.dungeon.down').value:
                            DungeonRunner.map.moveDown();
                            return e.preventDefault();
                        case 'ArrowRight':
                        case Settings.getSetting('hotkey.dungeon.right').value:
                            DungeonRunner.map.moveRight();
                            return e.preventDefault();
                        case Settings.getSetting('hotkey.dungeon.interact').value:
                            DungeonRunner.handleInteraction(GameConstants.DungeonInteractionSource.Keybind);
                            DungeonRunner.continuousInteractionInput = true;
                            return e.preventDefault();
                    }
                }

                // Within towns
                if (App.game.gameState === GameConstants.GameState.town) {
                    if (key === Settings.getSetting('hotkey.town.start').value) {
                        if (player.town instanceof DungeonTown) {
                            DungeonRunner.initializeDungeon(player.town.dungeon);
                        } else {
                            player.town.content[0].protectedOnclick();
                        }
                        return e.preventDefault();
                    } else if (isNumberKey) {
                        // Check if a number higher than 0 and less than our towns content was pressed
                        const filteredContent = player.town.content.filter(c => c.isVisible());
                        const filteredNPCs = player.town.npcs?.filter(n => n.isVisible());
                        if (numberKey < filteredContent.length) {
                            filteredContent[numberKey].protectedOnclick();
                        } else if (filteredNPCs && numberKey < filteredContent.length + filteredNPCs.length) {
                            NPCController.openDialog(filteredNPCs[numberKey - filteredContent.length]);
                        }
                        return e.preventDefault();
                    } else if (player.town instanceof DungeonTown && !GameController.keyHeld.Control?.()) {
                        const cycle = Object.values(TownList).filter(t => t instanceof DungeonTown && t.region == player.region && t.isUnlocked());
                        const idx = cycle.findIndex(d => d.name == player.town.name);
                        switch (key) {
                            case '=' :
                            case '+' : MapHelper.moveToTown(cycle[(idx + 1) % cycle.length].name);
                                return e.preventDefault();
                            case '-' : MapHelper.moveToTown(cycle[(idx + cycle.length - 1) % cycle.length].name);
                                return e.preventDefault();
                        }
                    }
                }
            }

            // Anywhere keys
            switch (key) {
                case Settings.getSetting('hotkey.farm').value:
                    // Open the Farm
                    if (farms.canAccess() && !$farmsModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $farmsModal.modal('toggle');
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.hatchery').value:
                    // Open the Hatchery
                    if (hatchery.canAccess() && !$hatcheryModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $hatcheryModal.modal('toggle');
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.oakItems').value:
                    // Open oak items
                    if (oakItems.canAccess() && !$oakItemsModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $oakItemsModal.modal('toggle');
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.underground').value:
                    // Open the Underground
                    if (underground.canAccess() && !$undergroundModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $undergroundModal.modal('toggle');
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.shop').value:
                    // Open the Poke Mart
                    if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Champion Lance')]() >= 1 && !$shopModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        ShopHandler.showShop(pokeMartShop);
                        $shopModal.modal('toggle');
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.forceSave').value:
                    if (GameController.keyHeld.Shift()) {
                        Save.store(player);
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.downloadSave').value:
                    if (GameController.keyHeld.Shift()) {
                        Save.download();
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.mute').value:
                    if (GameController.keyHeld.Shift()) {
                        (Settings.getSetting('sound.muted') as BooleanSetting).toggle();
                        return e.preventDefault();
                    }
                    break;
                case Settings.getSetting('hotkey.dailyQuests').value:
                    // Open the Quests
                    if (quests.isDailyQuestsUnlocked() && !$questModal.data('disable-toggle')) {
                        $('.modal').modal('hide');
                        $questModal.modal('toggle');
                        return e.preventDefault();
                    }
                    break;
            }

            if (key === 'Space') {
                return e.preventDefault();
            }
        });

        $(document).on('keyup', e => {
            // Ignore any of our controls if focused on an input element
            if (this.focusedOnEditableElement()) {
                return;
            }

            const key = GameController.convertKey(e.key);
            // Our key is no longer being held down
            GameController.keyHeld[key]?.(false);

            if (App.game.gameState === GameConstants.GameState.safari) {
                switch (key) {
                    case 'ArrowUp':
                    case Settings.getSetting('hotkey.dungeon.up').value:
                        Safari.stop('up');
                        return e.preventDefault();
                    case 'ArrowLeft':
                    case Settings.getSetting('hotkey.dungeon.left').value:
                        Safari.stop('left');
                        return e.preventDefault();
                    case 'ArrowDown':
                    case Settings.getSetting('hotkey.dungeon.down').value:
                        Safari.stop('down');
                        return e.preventDefault();
                    case 'ArrowRight':
                    case Settings.getSetting('hotkey.dungeon.right').value:
                        Safari.stop('right');
                        return e.preventDefault();
                }
            }

            if (key === Settings.getSetting('hotkey.dungeon.interact').value) {
                DungeonRunner.continuousInteractionInput = false;
                return e.preventDefault();
            }

            if (key === 'Space') {
                return e.preventDefault();
            }
        });
    }
}

// when stacking modals allow scrolling after top modal hidden
$(document).on('hidden.bs.modal', '.modal', () => {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});
