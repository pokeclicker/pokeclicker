class Safari {
    static grid: Array<Array<number>>;
    static accessibleTiles: Array<Array<boolean>>;
    static pokemonGrid: KnockoutObservableArray<SafariPokemon> = ko.observableArray([]);
    static itemGrid: KnockoutObservableArray<SafariItem> = ko.observableArray([]);
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
    private static readonly moveSpeed = 250;

    // Safari level
    static maxSafariLevel = 40;
    static safariExp: KnockoutComputed<number> = ko.pureComputed(() => {
        return App.game.statistics.safariRocksThrown() * 10 +
            App.game.statistics.safariBaitThrown() * 5 +
            App.game.statistics.safariBallsThrown() * 10 +
            App.game.statistics.safariPokemonCaptured() * 50 +
            App.game.statistics.safariShinyPokemonCaptured() * 50 * 4 + // Shiny increments both, so this adds up to 5x
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
        return Math.max(5, Math.floor(document.querySelector('#safariModal .modal-dialog').scrollWidth / 32));
    }

    public static sizeY(): number {
        return Math.max(5, Math.floor((window.innerHeight - 250) / 32));
    }

    public static load() {
        Safari.activeRegion(player.region);
        Safari.grid = [];
        Safari.pokemonGrid([]);
        Safari.itemGrid([]);
        Safari.playerXY.x = 0;
        Safari.playerXY.y = 0;
        Safari.lastDirection = 'up';
        Safari.activeEnvironment(SafariEnvironments.Grass);
        Safari.inBattle(false);

        Safari.balls(Safari.calculateStartPokeballs());
        for ( let i = 0; i < Safari.sizeY(); i++) {
            Safari.grid.push(Array(Safari.sizeX()).fill(GameConstants.SafariTile.ground));
        }

        const bodyOrder = [
            FenceBody, WaterBody, SandBody, WaterBody, WaterBody, SandBody, TreeBody, TreeBody, TreeBody, TreeBody, TreeBody, FenceBody,
            SandBody, FenceBody, WaterBody, SandBody, WaterBody, WaterBody, SandBody, SandBody, GrassBody, GrassBody, GrassBody, GrassBody,
        ];
        bodyOrder.forEach((bodyType) => Safari.addRandomBody(new bodyType()));

        Safari.calculateAccessibleTiles();
        Safari.inProgress(true);
    }

    private static addRandomBody(body: SafariBody) {
        let x = Safari.getRandomCoord(Safari.sizeX() - 2);
        let y = Safari.getRandomCoord(Safari.sizeY() - 2);
        if (body.type === 'fence') {
            x = Math.max(0, x - 3);
            y = Math.max(0, y - 3);
        }
        let res = Safari.canAddBody(x, y, body);

        // Force the addition of water tiles if there are no water tiles in the grid
        if (!res && body.type === 'water' && !Safari.hasWaterTiles()) {
            let attempts = 0;
            while (!res && attempts++ < 50) {
                // Create a new WaterBody with minimum X and Y (3x3) after 10 attempts
                if (attempts === 10) {
                    body = new WaterBody(3, 3);
                }
                x = Safari.getRandomCoord(Safari.sizeX() - 2);
                y = Safari.getRandomCoord(Safari.sizeY() - 2);
                res = Safari.canAddBody(x, y, body);
            }
        }

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
            y + body.maxY() >= Safari.sizeY() ||
            x + body.maxX() >= Safari.sizeX()
        ) {
            return false;
        }
        for (let i = 0; i < body.grid.length; i++) {
            for (let j = 0; j < body.grid[i].length; j++) {
                if ( (i + y) < Safari.sizeY() && (j + x) < Safari.sizeX()) {
                    if (body.grid[i][j] !== GameConstants.SafariTile.ground) {
                        if (Safari.grid[i + y][j + x] !== GameConstants.SafariTile.ground) {
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
                    if ( (i + y) < Safari.sizeY() && (j + x) < Safari.sizeX()) {
                        if (Safari.grid[i + y][j + x] === 0) {
                            Safari.grid[i + y][j + x] = body.grid[i][j];
                        }
                    }
                }
            }
        }
    }

    // Check if grid has water tiles
    private static hasWaterTiles() {
        return Safari.grid.some((row) => row.some((tile) => GameConstants.SAFARI_WATER_BLOCKS.includes(tile)));
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
            Safari.accessibleTiles[y][x] = true;

            // Then queue up any neighbors for processing
            [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
                .forEach(([nx, ny]) => {
                    if (// but skip if:
                        // outside map
                        !Safari.isInMap(nx, ny) ||
                        // already processed,
                        Safari.accessibleTiles[ny]?.[nx] ||
                        // already queued,
                        toProcess.some(([px, py]) => px === nx && py === ny) ||
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
            message: `You have an active Safari in ${GameConstants.Region[Safari.activeRegion()].charAt(0).toUpperCase() + GameConstants.Region[Safari.activeRegion()].slice(1)}.\nDo you want to quit that Safari and start a new one?`,
            type: NotificationConstants.NotificationOption.warning,
            confirm: 'Quit',
        }).then(confirmed => {
            if (confirmed) {
                //Reload zone
                Safari.inBattle(false);
                Safari.inProgress(false);
                SafariBattle.busy(false);
                $('#safariBattleModal').modal('hide');
                Safari.openModal();
            }
        });
    }

    public static openModal() {
        if (Safari.inProgress() && Safari.activeRegion() !== player.region) {
            Safari.safariReset();
        } else {
            App.game.gameState = GameConstants.GameState.safari;
            $('#safariModal').modal({backdrop: 'static', keyboard: false});
        }
    }

    public static startSafari() {
        if (Safari.canAccess()) {
            // Check if player has an active Safari Zone session
            if (Safari.activeRegion() >= 0 && player.region != Safari.activeRegion()) {
                Safari.safariReset();
            } else {
                Safari.openModal();
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
            case GameConstants.Region.johto:
                return new Amount(500, GameConstants.Currency.questPoint);
            case GameConstants.Region.sinnoh:
                return new Amount(750, GameConstants.Currency.questPoint);
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
        return [Math.floor((Safari.sizeX() - 1) / 2), Safari.sizeY() - 1];
    }

    // Called by knockout once map is done rendering
    private static addPlayer() {
        const [i, j] = Safari.getPlayerStartCoords();
        const topLeft = $('#safari-0-0').offset();
        const offset = {
            top: 32 * j + topLeft.top - 24,
            left: 32 * i + topLeft.left - 12,
        };
        document.getElementById('sprite').classList.value = `walk${Safari.lastDirection}`;
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
        if (!Safari.inProgress()) {
            return;
        }

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
            Safari.steps++;
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
            $('#sprite').animate(offset, Safari.moveSpeed, 'linear', () => {
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
            Safari.spawnPokemonCheck();
            Safari.despawnPokemonCheck();
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
            }, Safari.moveSpeed);
        }
    }

    public static spawnPokemonCheck() {
        if (Safari.steps % 10 === 0 && Rand.boolean()) {
            Safari.spawnRandomPokemon();
        }
    }

    public static spawnItemCheck() {
        const baseChance = 0.4;
        const itemLevelModifier = (Safari.safariLevel() - 1) / 100;
        if (Rand.chance(baseChance + itemLevelModifier)) {
            Safari.spawnRandomItem();
        }
    }

    public static despawnPokemonCheck() {
        let index = Safari.pokemonGrid().length;
        while (index-- > 0) {
            if (--Safari.pokemonGrid()[index].steps <= 0) {
                Safari.pokemonGrid.splice(index, 1);
            }
        }
    }

    private static spawnRandomPokemon() {
        const pos = Safari.generatePlaceableSpawnPosition();
        if (pos) {
            const pokemon = SafariPokemon.random(Safari.getEnvironmentTile(pos.x, pos.y));
            pokemon.x = pos.x;
            pokemon.y = pos.y;
            pokemon.steps = Safari.grid.length + Safari.grid[0].length + Rand.floor(21);
            Safari.pokemonGrid.push(pokemon);
        }
    }

    private static spawnRandomItem() {
        if (!SafariItemController.currentRegionHasItems()) {
            return;
        }

        const pos = Safari.generatePlaceableSpawnPosition(true);
        if (pos) {
            Safari.itemGrid.push(new SafariItem(pos.x, pos.y));
        }
    }

    private static generatePlaceableSpawnPosition(isItem = false) {
        let result = false;
        let x = 0;
        let y = 0;
        let attempts = 0;
        while (!result && attempts++ < Safari.maxPlacementAttempts) {
            x = Rand.floor(Safari.grid[0].length);
            y = Rand.floor(Safari.grid.length);
            result = Safari.canPlaceAtPosition(x, y, isItem);
        }

        return result ? {x: x, y: y} : null;
    }

    private static canPlaceAtPosition(x: number, y: number, isItem = false) {
        // Items don't spawn on water
        const canPlace = !(isItem && GameConstants.SAFARI_WATER_BLOCKS.includes(Safari.grid[y][x]));
        return Safari.canMove(x, y) && canPlace &&
            Safari.isAccessible(x, y) &&
            !(x == Safari.playerXY.x && y == Safari.playerXY.y) &&
            !Safari.pokemonGrid().some(p => p.x === x && p.y === y) &&
            !Safari.itemGrid().some(i => i.x === x && i.y === y);
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
        if (!Safari.isInMap(x, y)) {
            return false;
        }
        return GameConstants.SAFARI_LEGAL_WALK_BLOCKS.includes(Safari.grid[y][x]);
    }

    private static isInMap(x: number, y: number): boolean {
        return 0 <= y && y < Safari.grid.length && 0 <= x && x < Safari.grid[y].length;
    }

    private static isAccessible(x: number, y: number): boolean {
        return Safari.accessibleTiles[y][x];
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
        const pokemonOnPlayer = Safari.pokemonGrid().findIndex(p => p.x === Safari.playerXY.x && p.y === Safari.playerXY.y);
        if (pokemonOnPlayer >= 0) {
            SafariBattle.load(Safari.pokemonGrid()[pokemonOnPlayer]);
            Safari.pokemonGrid.splice(pokemonOnPlayer, 1);
            return true;
        }
        const currentTile = Safari.grid[Safari.playerXY.y][Safari.playerXY.x];
        if (currentTile === GameConstants.SafariTile.grass || GameConstants.SAFARI_WATER_BLOCKS.includes(currentTile)) {
            if (Rand.chance(GameConstants.SAFARI_BATTLE_CHANCE)) {
                SafariBattle.load();
                return true;
            }
        }
        return false;
    }

    private static getEnvironmentTile(x, y) {
        if (!Safari.isInMap(x, y)) {
            return null;
        } else if (GameConstants.SAFARI_WATER_BLOCKS.includes(Safari.grid[y][x])) { // Water environment
            return SafariEnvironments.Water;
        } else { // Grass environment by default
            return SafariEnvironments.Grass;
        }
    }

    private static checkItem() {
        const itemOnPlayer = Safari.itemGrid().findIndex(p => p.x === Safari.playerXY.x && p.y === Safari.playerXY.y);
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
            tooltip.title = `${(Safari.safariExp() - Safari.expRequiredForLevel(level)).toLocaleString('en-US')} / ${(Safari.expRequiredForLevel(level + 1) - Safari.expRequiredForLevel(level)).toLocaleString('en-US')}`;
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

$(document).ready(() => {
    // Add listeners to Safari dpad buttons
    ['Up', 'Left', 'Down', 'Right'].forEach((dir) => {
        const button = document.getElementById(`safari-dpad-${dir.toLowerCase()}`);
        const keyDown = () => GameController.simulateKey(`Arrow${dir}`);
        const keyUp = () => GameController.simulateKey(`Arrow${dir}`, 'up');
        button.addEventListener('mousedown', keyDown, { passive: false });
        button.addEventListener('mouseout', keyUp, { passive: false });
        button.addEventListener('mouseup', keyUp, { passive: false });
        button.addEventListener('touchstart', keyDown, { passive: false });
        button.addEventListener('touchend', keyUp, { passive: false });
        button.addEventListener('touchcancel', keyUp, { passive: false });
    });

    $('#safariModal').on('hide.bs.modal', () => {
        Safari.inBattle(false);
        SafariBattle.busy(false);
        switch (player.region) {
            case GameConstants.Region.kanto:
                MapHelper.moveToTown('Safari Zone');
                break;
            case GameConstants.Region.johto:
                MapHelper.moveToTown('National Park');
                break;
            case GameConstants.Region.sinnoh:
                MapHelper.moveToTown('Great Marsh');
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
