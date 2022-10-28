/// <reference path="../dungeons/Point.ts" />

class BugCatching {
    static grid: Array<Array<number>>;
    static pokemonGrid: KnockoutObservableArray<BugCatchingPokemon> = ko.observableArray([]);
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
    static balls: KnockoutObservable<number> = ko.observable();

    public static sizeX(): number {
        return Math.floor(document.querySelector('#bugCatchingModal .modal-dialog').scrollWidth / 32);
    }

    public static sizeY(): number {
        return Math.floor((window.innerHeight - 250) / 32);
    }

    public static load() {
        BugCatching.grid = [];
        BugCatching.pokemonGrid([]);
        BugCatching.playerXY.x = 0;
        BugCatching.playerXY.y = 0;
        BugCatching.lastDirection = 'up';
        BugCatching.inBattle(false);
        BugCatching.inProgress(true);
        BugCatching.balls(this.calculateStartPokeballs());
        for ( let i = 0; i < this.sizeY(); i++) {
            BugCatching.grid.push(Array(this.sizeX()).fill(0));
        }

        BugCatching.addRandomBody(new BCFenceBody());
        BugCatching.addRandomBody(new BCWaterBody());
        BugCatching.addRandomBody(new BCSandBody());
        BugCatching.addRandomBody(new BCWaterBody());
        BugCatching.addRandomBody(new BCWaterBody());
        BugCatching.addRandomBody(new BCSandBody());
        BugCatching.addRandomBody(new BCTreeBody());
        BugCatching.addRandomBody(new BCTreeBody());
        BugCatching.addRandomBody(new BCTreeBody());
        BugCatching.addRandomBody(new BCTreeBody());
        BugCatching.addRandomBody(new BCTreeBody());
        BugCatching.addRandomBody(new BCFenceBody());
        BugCatching.addRandomBody(new BCSandBody());
        BugCatching.addRandomBody(new BCFenceBody());
        BugCatching.addRandomBody(new BCWaterBody());
        BugCatching.addRandomBody(new BCSandBody());
        BugCatching.addRandomBody(new BCWaterBody());
        BugCatching.addRandomBody(new BCWaterBody());
        BugCatching.addRandomBody(new BCSandBody());
        BugCatching.addRandomBody(new BCSandBody());
        BugCatching.addRandomBody(new BCGrassBody());
        BugCatching.addRandomBody(new BCGrassBody());
        BugCatching.addRandomBody(new BCGrassBody());
        BugCatching.addRandomBody(new BCGrassBody());

        BugCatching.show();
    }

    private static addRandomBody(body: BugCatchingBody) {
        let x = BugCatching.getRandomCoord(this.sizeX() - 2);
        let y = BugCatching.getRandomCoord(this.sizeY() - 2);
        if (body.type === 'fence') {
            x = Math.max(0, x - 3);
            y = Math.max(0, y - 3);
        }
        const res = BugCatching.canAddBody(x, y, body);
        if (res || body.type === 'grass') {
            BugCatching.addBody(x, y, body);
        }
    }

    private static getRandomCoord(max: number): number {
        return Rand.intBetween(1, max - 3);
    }

    private static canAddBody(x: number, y: number, body: BugCatchingBody): boolean {
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

    private static addBody(x: number, y: number, body: BugCatchingBody) {
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

    public static openModal() {
        if (this.canAccess()) {
            App.game.gameState = GameConstants.GameState.bugCatching;
            $('#bugCatchingModal').modal({backdrop: 'static', keyboard: false});
        } else {
            Notifier.notify({
                message: 'You need the Safari Pass to access this location.\n<i>Visit the Gym in Fuschia City</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static closeModal() {
        if (!BugCatching.inBattle()) {
            $('#bugCatchingModal').modal('hide');
        }
    }

    private static canPay() {
        return App.game.wallet.hasAmount(BugCatching.cost());
    }

    private static cost() {
        return new Amount(100, GameConstants.Currency.questPoint);
    }

    private static payEntranceFee() {
        if (BugCatching.canPay()) {
            // TODO: add increasing cost back
            //typeof player.bugCatchingCostModifier == undefined ? 1 : player.bugCatchingCostModifier++;

            App.game.wallet.loseAmount(BugCatching.cost());
            BugCatching.load();
        }
    }

    private static canAccess() {
        return App.game.keyItems.hasKeyItem(KeyItemType.Safari_ticket);
    }

    static show() {
        let html = '';

        for (let i = 0; i < BugCatching.grid.length; i++) {
            html += '<div class="row flex-nowrap">';
            for (let j = 0; j < BugCatching.grid[0].length; j++) {
                html += BugCatching.square(i, j);
            }
            html += '</div>';
        }

        $('#bugCatchingBody').html(html);

        BugCatching.addPlayer(Math.floor((this.sizeX() - 1) / 2), this.sizeY() - 1);

    }

    private static square(i: number, j: number): string {
        const img = `assets/images/safari/${this.grid[i][j]}.png`;
        const divId = `bugCatching-${j}-${i}`;

        return `<div id='${divId}' style=background-image:url('${img}') class='bugCatchingSquare'></div>`;
    }

    private static addPlayer(i: number, j: number) {
        const topLeft = $('#bugCatching-0-0').offset();
        const offset = {
            top: 32 * j + topLeft.top,
            left: 32 * i + topLeft.left,
        };
        $('#bugCatchingBody').append('<div id="sprite"></div>');
        document.getElementById('sprite').classList.value = `walk${BugCatching.lastDirection}`;
        $('#sprite').css('position', 'absolute');
        $('#sprite').offset( offset );
        BugCatching.playerXY.x = i;
        BugCatching.playerXY.y = j;
        BugCatching.origin = offset;
    }

    public static move(dir: string) {
        if (!BugCatching.inProgress()) {
            return;
        } else if (!BugCatching.walking && !BugCatching.isMoving && !BugCatching.inBattle()) {
            BugCatching.queue = [];
            BugCatching.walking = true;
            BugCatching.queue.unshift(dir);
            BugCatching.startMoving(dir);
        } else {
            if (dir) {
                BugCatching.setNextDirection(dir);
            }
        }
    }

    private static startMoving(dir: string) {
        BugCatching.nextDirection = dir;

        if (!BugCatching.isMoving) {
            BugCatching.step(dir);
        }
    }

    private static step(direction: string) {
        BugCatching.lastDirection = direction;
        const directionOffset = BugCatching.directionToXY(direction);

        BugCatching.isMoving = true;

        const newPos = {
            x: BugCatching.playerXY.x + directionOffset.x,
            y: BugCatching.playerXY.y + directionOffset.y,
        };

        if (BugCatching.canMove(newPos.x, newPos.y)) {
            const next = $(`#bugCatching-${newPos.x}-${newPos.y}`).offset();
            const offset = {
                top: `+=${directionOffset.y * 32}`,
                left: `+=${directionOffset.x * 32}`,
            };

            document.getElementById('sprite').classList.value = `walk${direction} moving`;
            BugCatching.playerXY.x = newPos.x;
            BugCatching.playerXY.y = newPos.y;
            $('#sprite').animate(offset, 250, 'linear', () => {
                BugCatching.checkBattle();
                BugCatching.isMoving = false;
                if (BugCatching.walking) {
                    if (!BugCatching.checkBattle() && BugCatching.queue[0]) {
                        BugCatching.step(BugCatching.queue[0]);
                    } else {
                        document.getElementById('sprite').classList.value = `walk${direction}`;
                    }
                } else {
                    document.getElementById('sprite').classList.value = `walk${direction}`;
                }
            });
            App.game.breeding.progressEggs(1);
            this.spawnPokemonCheck();
            this.despawnPokemonCheck();
        } else {
            document.getElementById('sprite').classList.value = `walk${direction}`;
            setTimeout(() => {
                BugCatching.walking = false;
                BugCatching.isMoving = false;
                if (BugCatching.queue[0]) {
                    BugCatching.isMoving = true;
                    BugCatching.walking = true;
                    BugCatching.step(BugCatching.queue[0]);
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

    public static despawnPokemonCheck() {
        let index = this.pokemonGrid().length;
        while (index-- > 0) {
            if (--this.pokemonGrid()[index].steps <= 0) {
                this.pokemonGrid.splice(index, 1);
            }
        }
    }

    private static spawnRandomPokemon() {
        const y = Rand.floor(this.sizeY());
        const x = Rand.floor(this.sizeX());
        if (!this.canMove(x, y) || (x == this.playerXY.x && y == this.playerXY.y) || this.pokemonGrid().find(p => p.x === x && p.y === y)) {
            return;
        }
        const pokemon = BugCatchingPokemon.random();

        pokemon.x = x;
        pokemon.y = y;
        pokemon.steps = this.sizeX() + this.sizeY() + Rand.floor(21);
        this.pokemonGrid.push(pokemon);
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
        if (!BugCatching.inProgress()) {
            return false;
        }
        for (let i = 0; i < GameConstants.LEGAL_WALK_BLOCKS.length; i++) {
            if (BugCatching.grid[y] && BugCatching.grid[y][x] === GameConstants.LEGAL_WALK_BLOCKS[i]) {
                return true;
            }
        }
        return false;
    }

    private static setNextDirection(direction: string) {
        if (direction != BugCatching.lastDirection) {
            if (BugCatching.queue[0] != direction) {
                if (BugCatching.queue.length == 1) {
                    BugCatching.queue.unshift(direction);
                } else {
                    BugCatching.queue[0] = direction;
                }
            }
            BugCatching.nextDirection = direction;
            BugCatching.walking = true;
        }
    }

    public static stop(dir: string) {
        for (let i = 0; i < BugCatching.queue.length; i++) {
            if (BugCatching.queue[i] == dir) {
                BugCatching.queue.splice(i, 1);
            }
        }
        if (!BugCatching.queue[0]) {
            BugCatching.walking = false;
        }
    }

    private static checkBattle(): boolean {
        if (BugCatching.inBattle()) {
            return false;
        }
        const pokemonOnPlayer = this.pokemonGrid().findIndex(p => p.x === BugCatching.playerXY.x && p.y === BugCatching.playerXY.y);
        if (pokemonOnPlayer >= 0) {
            BugCatchingBattle.load(this.pokemonGrid()[pokemonOnPlayer]);
            BugCatching.pokemonGrid.splice(pokemonOnPlayer, 1);
            return true;
        }
        if (BugCatching.grid[BugCatching.playerXY.y][BugCatching.playerXY.x] === 10) {
            if (Rand.chance(GameConstants.BUGCATCHING_BATTLE_CHANCE)) {
                BugCatchingBattle.load();
                return true;
            }
        }
        return false;
    }

    private static calculateStartPokeballs() {
        return 30;
    }

    static completed(shiny = false) {
        return BugCatchingPokemon.list.reduce((all,poke) => {
            return all && App.game.party.alreadyCaughtPokemonByName(poke.name,shiny);
        }, true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    $('#bugCatchingModal').on('hide.bs.modal', () => {
        MapHelper.moveToTown('Fuchsia City');
    });
});
