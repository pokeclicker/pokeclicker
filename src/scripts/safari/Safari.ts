class Safari {
    static grid: Array<Array<number>>;
    static accessibleTiles: Array<Array<boolean>>;
    static pokemonGrid: KnockoutObservableArray<SafariPokemon> = ko.observableArray([]);
    static itemGrid: KnockoutObservableArray<SafariItem> = ko.observableArray([]);
    static player: Point = new Point(12, 20);
    static lastDirection = 'up';
    static nextDirection: string;
    static steps = 0;
    static walking = false;
    static isMoving = false;
    static queue: Array<string> = [];
    private static playerXY = {'x': 0, 'y': 0};
    private static origin;
    static inProgress: KnockoutObservable<boolean> = ko.observable(false);
    static inBattle: KnockoutObservable<boolean> = ko.observable(false);
    static balls: KnockoutObservable<number> = ko.observable().extend({ numeric: 0 });
    static activeRegion: KnockoutObservable<GameConstants.Region> = ko.observable(GameConstants.Region.none);
    static activeEnvironment: KnockoutObservable<SafariEnvironments> = ko.observable(SafariEnvironments.Grass);
    private static maxPlacementAttempts = 20;

    // Safari level
    static maxSafariLevel = 40;
    static safariExp: KnockoutComputed<number> = ko.pureComputed(() => {
        return App.game.statistics.safariRocksThrown() * 10 +
            App.game.statistics.safariBaitThrown() * 5 +
            App.game.statistics.safariBallsThrown() * 10 +
            App.game.statistics.safariPokemonCaptured() * 50 +
            App.game.statistics.safariItemsObtained() * 10;
    });
    static safariLevel: KnockoutComputed<number> = ko.pureComputed(() => {
        const xp = Safari.safariExp();
        for (let i = 1; i <= Safari.maxSafariLevel; i++) {
            if (xp < Safari.expRequiredForLevel(i)) {
                return i - 1;
            }
        }
        return Safari.maxSafariLevel;
    });
    static percentToNextSafariLevel: KnockoutComputed<number> = ko.pureComputed(() => {
        const level = Safari.safariLevel();
        if (level === Safari.maxSafariLevel) {
            return 100;
        }
        const expForNextLevel = Safari.expRequiredForLevel(level + 1) - Safari.expRequiredForLevel(level);
        const expThisLevel = Safari.safariExp() - Safari.expRequiredForLevel(level);
        return expThisLevel / expForNextLevel * 100;
    });

    public static sizeX(): number {
        return Math.floor(document.querySelector('#safariModal .modal-dialog').scrollWidth / 32);
    }

    public static sizeY(): number {
        return Math.floor((window.innerHeight - 250) / 32);
    }

    public static load() {
        this.activeRegion(player.region);
        Safari.grid = [];
        Safari.pokemonGrid([]);
        Safari.itemGrid([]);
        Safari.playerXY.x = 0;
        Safari.playerXY.y = 0;
        Safari.lastDirection = 'up';
        Safari.inBattle(false);
        Safari.inProgress(true);
        Safari.balls(this.calculateStartPokeballs());
        for ( let i = 0; i < this.sizeY(); i++) {
            Safari.grid.push(Array(this.sizeX()).fill(0));
        }

        Safari.addRandomBody(new FenceBody());
        Safari.addRandomBody(new WaterBody());
        Safari.addRandomBody(new SandBody());
        Safari.addRandomBody(new WaterBody());
        Safari.addRandomBody(new WaterBody());
        Safari.addRandomBody(new SandBody());
        Safari.addRandomBody(new TreeBody());
        Safari.addRandomBody(new TreeBody());
        Safari.addRandomBody(new TreeBody());
        Safari.addRandomBody(new TreeBody());
        Safari.addRandomBody(new TreeBody());
        Safari.addRandomBody(new FenceBody());
        Safari.addRandomBody(new SandBody());
        Safari.addRandomBody(new FenceBody());
        Safari.addRandomBody(new WaterBody());
        Safari.addRandomBody(new SandBody());
        Safari.addRandomBody(new WaterBody());
        Safari.addRandomBody(new WaterBody());
        Safari.addRandomBody(new SandBody());
        Safari.addRandomBody(new SandBody());
        Safari.addRandomBody(new GrassBody());
        Safari.addRandomBody(new GrassBody());
        Safari.addRandomBody(new GrassBody());
        Safari.addRandomBody(new GrassBody());

        Safari.calculateAccessibleTiles();

        Safari.show();
    }

    private static addRandomBody(body: SafariBody) {
        let x = Safari.getRandomCoord(this.sizeX() - 2);
        let y = Safari.getRandomCoord(this.sizeY() - 2);
        if (body.type === 'fence') {
            x = Math.max(0, x - 3);
            y = Math.max(0, y - 3);
        }
        const res = Safari.canAddBody(x, y, body);
        if (res || body.type === 'grass') {
            Safari.addBody(x, y, body);
        }
    }

    private static getRandomCoord(max: number): number {
        return Rand.intBetween(1, max - 3);
    }

    private static canAddBody(x: number, y: number, body: SafariBody): boolean {
        if (
            x == 0 ||
            y == 0 ||
            y + body.maxY() >= this.sizeY() ||
            x + body.maxX() >= this.sizeX()
        ) {
            return false;
        }
        for (let i = 0; i < body.grid.length; i++) {
            for (let j = 0; j < body.grid[i].length; j++) {
                if ( (i + y) < this.sizeY() && (j + x) < this.sizeX()) {
                    if (body.grid[i][j] !== 0) {
                        if (this.grid[i + y][j + x] !== 0) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    private static addBody(x: number, y: number, body: SafariBody) {
        for (let i = 0; i < body.grid.length; i++) {
            for ( let j = 0; j < body.grid[i].length; j++) {
                if (body.grid[i][j] !== 0) {
                    if ( (i + y) < this.sizeY() && (j + x) < this.sizeX()) {
                        if (this.grid[i + y][j + x] === 0) {
                            this.grid[i + y][j + x] = body.grid[i][j];
                        }
                    }
                }
            }
        }
    }

    private static calculateAccessibleTiles() {
        // Reset accessible tile grid
        Safari.accessibleTiles = Safari.grid.map(row => row.map(tile => false));

        // Start with the tile player spawns on
        const toProcess = [Safari.getPlayerStartCoords()];

        // While we have things in our list of tiles to process
        while (toProcess.length) {
            // Get the first one and mark it as accessible
            const [x, y] = toProcess.shift();
            this.accessibleTiles[y][x] = true;

            // Then queue up any neighbors for processing
            [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
                .forEach(([nx, ny]) => {
                    if (// but skip if:
                        // already processed,
                        this.accessibleTiles[ny]?.[nx] ||
                        // already queued,
                        toProcess.find(([px, py]) => px === nx && py === ny) ||
                        // or can't access
                        !Safari.canMove(nx, ny)
                    ) {
                        return;
                    }

                    toProcess.push([nx, ny]);
                });
        }
    }

    public static safariReset() {
        Notifier.confirm({
            title: 'Safari Zone',
            message: `You have an active Safari in ${GameConstants.Region[this.activeRegion()].charAt(0).toUpperCase() + GameConstants.Region[this.activeRegion()].slice(1)}.\nDo you want to quit that Safari and start a new one?`,
            type: NotificationConstants.NotificationOption.warning,
            confirm: 'Quit',
        }).then(confirmed => {
            if (confirmed) {
                //Reload zone
                Safari.inBattle(false);
                Safari.inProgress(false);
                SafariBattle.busy(false);
                $('#safariBattleModal').modal('hide');
                this.openModal();
            }
        });
    }

    public static openModal() {
        if (Safari.inProgress() && Safari.activeRegion() !== player.region) {
            this.safariReset();
        } else {
            App.game.gameState = GameConstants.GameState.safari;
            $('#safariModal').modal({backdrop: 'static', keyboard: false});
        }
    }

    public static startSafari() {
        if (this.canAccess()) {
            // Check if player has an active Safari Zone session
            if (this.activeRegion() >= 0 && player.region != this.activeRegion()) {
                this.safariReset();
            } else {
                this.openModal();
            }
        } else {
            Notifier.notify({
                message: 'You need the Safari Pass to access this location.\n<i>Visit the Gym in Fuschia City</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static closeModal() {
        if (!Safari.inBattle()) {
            $('#safariModal').modal('hide');
        }
    }

    private static canPay() {
        return App.game.wallet.hasAmount(Safari.cost());
    }

    private static cost() {
        switch (player.region) {
            case GameConstants.Region.kanto:
                return new Amount(100, GameConstants.Currency.questPoint);
            case GameConstants.Region.kalos:
                return new Amount(1000, GameConstants.Currency.questPoint);
            default:
                return new Amount(100, GameConstants.Currency.questPoint);
        }
    }

    private static payEntranceFee() {
        if (Safari.canPay()) {
            // TODO: add increasing cost back
            //typeof player.safariCostModifier == undefined ? 1 : player.safariCostModifier++;

            App.game.wallet.loseAmount(Safari.cost());
            Safari.load();
            GameHelper.incrementObservable(App.game.statistics.safariTimesEntered, 1);
        }
    }

    private static canAccess() {
        return App.game.keyItems.hasKeyItem(KeyItemType.Safari_ticket);
    }

    static getPlayerStartCoords() {
        return [Math.floor((this.sizeX() - 1) / 2), this.sizeY() - 1];
    }

    static show() {
        let html = '';

        for (let i = 0; i < Safari.grid.length; i++) {
            html += '<div class="row flex-nowrap">';
            for (let j = 0; j < Safari.grid[0].length; j++) {
                html += Safari.square(i, j);
            }
            html += '</div>';
        }

        $('#safariBody').html(html);

        const [x, y] = Safari.getPlayerStartCoords();
        Safari.addPlayer(x, y);

    }

    private static square(i: number, j: number): string {
        const tile = this.grid[i][j];
        const img = `assets/images/safari/${tile}.png`;
        const divId = `safari-${j}-${i}`;
        // Add z-index if tiles are tree top tiles
        const zIndex = tile === 37 || tile === 38 || tile === 39 ? 'z-index: 2;' : '';

        return `<div id='${divId}' style="background-image:url('${img}'); ${zIndex}" class='safariSquare'></div>`;
    }

    private static addPlayer(i: number, j: number) {
        const topLeft = $('#safari-0-0').offset();
        const offset = {
            top: 32 * j + topLeft.top - 24,
            left: 32 * i + topLeft.left - 12,
        };
        $('#safariBody').append('<div id="sprite"></div>');
        document.getElementById('sprite').classList.value = `walk${Safari.lastDirection}`;
        $('#sprite').css('position', 'absolute');
        $('#sprite').offset( offset );
        Safari.playerXY.x = i;
        Safari.playerXY.y = j;
        Safari.origin = offset;
    }

    public static move(dir: string) {
        if (!Safari.inProgress()) {
            return;
        } else if (!Safari.walking && !Safari.isMoving && !Safari.inBattle()) {
            Safari.queue = [];
            Safari.walking = true;
            Safari.queue.unshift(dir);
            Safari.startMoving(dir);
        } else {
            if (dir) {
                Safari.setNextDirection(dir);
            }
        }
    }

    private static startMoving(dir: string) {
        Safari.nextDirection = dir;

        if (!Safari.isMoving) {
            Safari.step(dir);
        }
    }

    private static step(direction: string) {
        Safari.lastDirection = direction;
        const directionOffset = Safari.directionToXY(direction);

        Safari.isMoving = true;

        const newPos = {
            x: Safari.playerXY.x + directionOffset.x,
            y: Safari.playerXY.y + directionOffset.y,
        };
        // CSS class with the environment (for the sprite change)
        let envClass = Safari.environmentCssClass();

        if (Safari.canMove(newPos.x, newPos.y)) {
            const next = $(`#safari-${newPos.x}-${newPos.y}`).offset();
            GameHelper.incrementObservable(App.game.statistics.safariStepsTaken, 1);
            const offset = {
                top: `+=${directionOffset.y * 32}`,
                left: `+=${directionOffset.x * 32}`,
            };

            document.getElementById('sprite').classList.value = `walk${direction} moving`;
            $('#sprite').addClass(`${envClass}`);
            Safari.playerXY.x = newPos.x;
            Safari.playerXY.y = newPos.y;
            Safari.activeEnvironment(Safari.getEnvironmentTile(Safari.playerXY.x, Safari.playerXY.y));
            // Re-call the class as the activeEnvironment may have changed
            envClass = Safari.environmentCssClass();
            $('#sprite').animate(offset, 250, 'linear', () => {
                Safari.checkBattle();
                Safari.checkItem();
                Safari.isMoving = false;
                if (Safari.walking) {
                    if (!Safari.checkBattle() && Safari.queue[0]) {
                        Safari.step(Safari.queue[0]);
                    } else {
                        document.getElementById('sprite').classList.value = `walk${direction}`;
                        $('#sprite').addClass(`${envClass}`);
                    }
                } else {
                    document.getElementById('sprite').classList.value = `walk${direction}`;
                    $('#sprite').addClass(`${envClass}`);
                }
            });
            App.game.breeding.progressEggs(1 + Math.floor(Safari.safariLevel() / 10));
            this.spawnPokemonCheck();
            this.despawnPokemonCheck();
        } else {
            document.getElementById('sprite').classList.value = `walk${direction}`;
            $('#sprite').addClass(`${envClass}`);
            setTimeout(() => {
                Safari.walking = false;
                Safari.isMoving = false;
                if (Safari.queue[0]) {
                    Safari.isMoving = true;
                    Safari.walking = true;
                    Safari.step(Safari.queue[0]);
                }
            }, 250);
        }
    }

    public static spawnPokemonCheck() {
        this.steps++;
        if (this.steps % 10 === 0 && Rand.boolean()) {
            this.spawnRandomPokemon();
        }
    }

    public static spawnItemCheck() {
        const baseChance = 0.4;
        const itemLevelModifier = (Safari.safariLevel() - 1) / 100;
        if (Rand.chance(baseChance + itemLevelModifier)) {
            this.spawnRandomItem();
        }
    }

    public static despawnPokemonCheck() {
        let index = this.pokemonGrid().length;
        while (index-- > 0) {
            if (--this.pokemonGrid()[index].steps <= 0) {
                this.pokemonGrid.splice(index, 1);
            }
        }
    }

    private static spawnRandomPokemon() {
        const pos = this.generatePlaceableSpawnPosition();
        if (pos) {
            const pokemon = SafariPokemon.random(Safari.getEnvironmentTile(pos.x, pos.y));
            pokemon.x = pos.x;
            pokemon.y = pos.y;
            pokemon.steps = this.grid.length + this.grid[0].length + Rand.floor(21);
            this.pokemonGrid.push(pokemon);
        }
    }

    private static spawnRandomItem() {
        if (!SafariItemController.currentRegionHasItems()) {
            return;
        }

        const pos = this.generatePlaceableSpawnPosition(true);
        if (pos) {
            this.itemGrid.push(new SafariItem(pos.x, pos.y));
        }
    }

    private static generatePlaceableSpawnPosition(isItem = false) {
        let result = false;
        let x = 0;
        let y = 0;
        let attempts = 0;
        while (!result && attempts++ < this.maxPlacementAttempts) {
            x = Rand.floor(this.grid[0].length);
            y = Rand.floor(this.grid.length);
            result = this.canPlaceAtPosition(x, y, isItem);
        }

        return result ? {x: x, y: y} : null;
    }

    private static canPlaceAtPosition(x: number, y: number, isItem = false) {
        // Items doesn't spawn on water
        const canPlace = isItem ? GameConstants.LEGAL_WALK_BLOCKS.includes(Safari.grid[y][x]) : true;
        return this.canMove(x, y) && canPlace &&
            this.isAccessible(x, y) &&
            !(x == this.playerXY.x && y == this.playerXY.y) &&
            !this.pokemonGrid().find(p => p.x === x && p.y === y) &&
            !this.itemGrid().find(i => i.x === x && i.y === y);
    }

    private static directionToXY(dir: string) {
        let x = 0;
        let y = 0;
        switch (dir) {
            case 'left': x = -1; break;
            case 'up': y = -1; break;
            case 'right': x = 1; break;
            case 'down': y = 1; break;
        }
        return {x: x, y: y};
    }

    private static canMove(x: number, y: number): boolean {
        if (!Safari.inProgress()) {
            return false;
        }
        for (let i = 0; i < GameConstants.LEGAL_WALK_BLOCKS.length; i++) {
            if (Safari.grid[y] && Safari.grid[y][x] === GameConstants.LEGAL_WALK_BLOCKS[i]) {
                return true;
            }
        }
        // Passable water tiles
        if (Safari.grid[y] && GameConstants.SAFARI_WATER_BLOCKS.includes(Safari.grid[y][x])) {
            return true;
        }
        return false;
    }

    private static isAccessible(x: number, y: number): boolean {
        return this.accessibleTiles[y][x];
    }

    private static setNextDirection(direction: string) {
        if (direction != Safari.lastDirection) {
            if (Safari.queue[0] != direction) {
                if (Safari.queue.length == 1) {
                    Safari.queue.unshift(direction);
                } else {
                    Safari.queue[0] = direction;
                }
            }
            Safari.nextDirection = direction;
            Safari.walking = true;
        }
    }

    public static stop(dir: string) {
        for (let i = 0; i < Safari.queue.length; i++) {
            if (Safari.queue[i] == dir) {
                Safari.queue.splice(i, 1);
            }
        }
        if (!Safari.queue[0]) {
            Safari.walking = false;
        }
    }

    private static checkBattle(): boolean {
        if (Safari.inBattle()) {
            return false;
        }
        const pokemonOnPlayer = this.pokemonGrid().findIndex(p => p.x === Safari.playerXY.x && p.y === Safari.playerXY.y);
        if (pokemonOnPlayer >= 0) {
            SafariBattle.load(this.pokemonGrid()[pokemonOnPlayer]);
            Safari.pokemonGrid.splice(pokemonOnPlayer, 1);
            return true;
        }
        if (Safari.grid[Safari.playerXY.y][Safari.playerXY.x] === 10 || GameConstants.SAFARI_WATER_BLOCKS.includes(Safari.grid[Safari.playerXY.y][Safari.playerXY.x])) {
            if (Rand.chance(GameConstants.SAFARI_BATTLE_CHANCE)) {
                SafariBattle.load();
                return true;
            }
        }
        return false;
    }

    private static getEnvironmentTile(x, y) {
        if (GameConstants.SAFARI_WATER_BLOCKS.includes(Safari.grid[y][x])) { // Water environment
            return SafariEnvironments.Water;
        } else { // Grass environment by default
            return SafariEnvironments.Grass;
        }
    }

    private static checkItem() {
        const itemOnPlayer = this.itemGrid().findIndex(p => p.x === Safari.playerXY.x && p.y === Safari.playerXY.y);
        if (itemOnPlayer >= 0) {
            const item = SafariItemController.getRandomItem();
            const name = BagHandler.displayName(item);
            BagHandler.gainItem(item);
            GameHelper.incrementObservable(App.game.statistics.safariItemsObtained, 1);
            Notifier.notify({
                message: `You found ${GameHelper.anOrA(name)} ${name}!`,
                image: BagHandler.image(item),
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dropped_item,
            });
            Safari.itemGrid.splice(itemOnPlayer, 1);
        }
    }

    private static calculateStartPokeballs() {
        return GameConstants.SAFARI_BASE_POKEBALL_COUNT;
    }

    static completed(shiny = false) {
        // Check current region
        if (SafariPokemonList.list[player.region]) {
            // Check each pokemon within this zone
            return SafariPokemonList.list[player.region]().every(poke => {
                return App.game.party.alreadyCaughtPokemonByName(poke.name, shiny);
            });
        }
        return false;
    }

    static safariProgressTooltip() {
        const tooltip = { trigger : 'hover', title : '' };
        const level = Safari.safariLevel();
        if (level == Safari.maxSafariLevel) {
            tooltip.title = 'Max level reached';
        } else {
            tooltip.title = `${Safari.safariExp() - Safari.expRequiredForLevel(level)} / ${Safari.expRequiredForLevel(level + 1) - Safari.expRequiredForLevel(level)}`;
        }
        return tooltip;
    }

    private static expRequiredForLevel(level: number) {
        return Math.ceil(2000 * (1.2 ** (level - 1) - 1));
    }

    public static environmentCssClass() {
        return GameHelper.enumStrings(SafariEnvironments)[Safari.activeEnvironment()].toLowerCase();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    $('#safariModal').on('hide.bs.modal', () => {
        Safari.inBattle(false);
        SafariBattle.busy(false);
        switch (player.region) {
            case GameConstants.Region.kanto:
                MapHelper.moveToTown('Safari Zone');
                break;
            case GameConstants.Region.kalos:
                MapHelper.moveToTown('Friend Safari');
                break;
            default:
                MapHelper.moveToTown(GameConstants.DockTowns[player.region]);
                break;
        }
    });
});
