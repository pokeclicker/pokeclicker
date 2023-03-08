class TownWalk {
    static grid: Array<Array<number>>;
    static lastDirection = 'up';
    static nextDirection: string;
    private static playerXY = {'x': 0, 'y': 0};
    private static origin;
    static inProgress: KnockoutObservable<boolean> = ko.observable(false);
    static walking = false;
    static isMoving = false;
    static queue: Array<string> = [];

    public static sizeX(): number {
        return Math.floor(document.querySelector('#townWalkModal .modal-dialog').scrollWidth / 32);
    }

    public static sizeY(): number {
        return Math.floor((window.innerHeight - 250) / 32);
    }

    public static load() {
        TownWalk.grid = [];
        TownWalk.playerXY.x = 0;
        TownWalk.playerXY.y = 0;
        TownWalk.lastDirection = 'up';
        TownWalk.inProgress(true);
        for ( let i = 0; i < this.sizeY(); i++) {
            TownWalk.grid.push(Array(this.sizeX()).fill(0));
        }

        TownWalk.show();
    }

    static show() {
        let html = '';

        for (let i = 0; i < TownWalk.grid.length; i++) {
            html += '<div class="row flex-nowrap">';
            for (let j = 0; j < TownWalk.grid[0].length; j++) {
                html += TownWalk.square(i, j);
            }
            html += '</div>';
        }

        $('#townWalkBody').html(html);

        TownWalk.addPlayer(Math.floor((this.sizeX() - 1) / 2), this.sizeY() - 1);

    }

    private static square(i: number, j: number): string {
        const img = `assets/images/safari/${this.grid[i][j]}.png`;
        const divId = `townWalk-${j}-${i}`;

        return `<div id='${divId}' style=background-image:url('${img}') class='safariSquare'></div>`;
    }

    private static addPlayer(i: number, j: number) {
        const topLeft = $('#townWalk-0-0').offset();
        const offset = {
            top: 32 * j + topLeft.top,
            left: 32 * i + topLeft.left,
        };
        
        $('#townWalkBody').append('<div id="sprite"></div>');
        $('#townWalkBody').append('<div id="pokemonSprite"></div>');
        document.getElementById('sprite').classList.value = `walk${TownWalk.lastDirection}`;

        const pokemonID = Math.floor(App.game.profile.pokemon());
        const shiny = App.game.profile.pokemonShiny()
        document.getElementById('pokemonSprite').style.backgroundImage = `${shiny ? 'url(\'assets/images/dynamic-background/pokemon/sparkle.png\'), ' : ''}url('assets/images/dynamic-background/pokemon/${pokemonID.toString().padStart(3, '0')}${shiny ? 's' : ''}.png')`;

        document.getElementById('pokemonSprite').classList.value = `walk${TownWalk.lastDirection}`;
        $('#sprite').css('position', 'absolute');
        $('#sprite').offset( offset );
        $('#pokemonSprite').css('position', 'absolute');
        $('#pokemonSprite').offset( offset );
        TownWalk.playerXY.x = i;
        TownWalk.playerXY.y = j;
        TownWalk.origin = offset;
    }

    public static move(dir: string) {
        if (!TownWalk.inProgress()) {
            return;
        } else if (!TownWalk.walking && !TownWalk.isMoving) {
            TownWalk.queue = [];
            TownWalk.walking = true;
            TownWalk.queue.unshift(dir);
            TownWalk.startMoving(dir);
        } else {
            if (dir) {
                TownWalk.setNextDirection(dir);
            }
        }
    }

    private static startMoving(dir: string) {
        TownWalk.nextDirection = dir;

        if (!TownWalk.isMoving) {
            TownWalk.step(dir);
        }
    }

    private static step(direction: string) {
        const oldDirection = TownWalk.lastDirection
        TownWalk.lastDirection = direction;
        const directionOffset = TownWalk.directionToXY(direction);

        TownWalk.isMoving = true;

        const newPos = {
            x: TownWalk.playerXY.x + directionOffset.x,
            y: TownWalk.playerXY.y + directionOffset.y,
        };

        if (TownWalk.canMove(newPos.x, newPos.y)) {
            //const next = $(`#townWalk-${newPos.x}-${newPos.y}`).offset();
            const offset = {
                top: `+=${directionOffset.y * 32}`,
                left: `+=${directionOffset.x * 32}`,
            };
            const pokemonOffset = {
                top: TownWalk.playerXY.y * 32,
                left: TownWalk.playerXY.x * 32,
            };

            document.getElementById('sprite').classList.value = `walk${direction} moving`;
            document.getElementById('pokemonSprite').classList.value = `walk${oldDirection} moving`;
            TownWalk.playerXY.x = newPos.x;
            TownWalk.playerXY.y = newPos.y;
            $('#sprite').animate(offset, 250, 'linear', () => {
                TownWalk.isMoving = false;
                if (TownWalk.walking) {
                    if (TownWalk.queue[0]) {
                        TownWalk.step(TownWalk.queue[0]);
                    } else {
                        document.getElementById('sprite').classList.value = `walk${direction}`;
                        document.getElementById('pokemonSprite').classList.value = `walk${oldDirection}`;
                    }
                } else {
                    document.getElementById('sprite').classList.value = `walk${direction}`;
                    document.getElementById('pokemonSprite').classList.value = `walk${oldDirection}`;
                }
            });
            $('#pokemonSprite').animate(pokemonOffset, 250, 'linear')
            App.game.breeding.progressEggs(2);
        } else {
            document.getElementById('sprite').classList.value = `walk${direction}`;
            document.getElementById('pokemonSprite').classList.value = `walk${oldDirection}`;
            setTimeout(() => {
                TownWalk.walking = false;
                TownWalk.isMoving = false;
                if (TownWalk.queue[0]) {
                    TownWalk.isMoving = true;
                    TownWalk.walking = true;
                    TownWalk.step(TownWalk.queue[0]);
                }
            }, 250);
        }
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
        if (!TownWalk.inProgress()) {
            return false;
        }
        for (let i = 0; i < GameConstants.LEGAL_WALK_BLOCKS.length; i++) {
            if (TownWalk.grid[y] && TownWalk.grid[y][x] === GameConstants.LEGAL_WALK_BLOCKS[i]) {
                return true;
            }
        }
        return false;
    }

    private static setNextDirection(direction: string) {
        if (direction != TownWalk.lastDirection) {
            if (TownWalk.queue[0] != direction) {
                if (TownWalk.queue.length == 1) {
                    TownWalk.queue.unshift(direction);
                } else {
                    TownWalk.queue[0] = direction;
                }
            }
            TownWalk.nextDirection = direction;
            TownWalk.walking = true;
        }
    }

    public static stop(dir: string) {
        for (let i = 0; i < TownWalk.queue.length; i++) {
            if (TownWalk.queue[i] == dir) {
                TownWalk.queue.splice(i, 1);
            }
        }
        if (!TownWalk.queue[0]) {
            TownWalk.walking = false;
        }
    }

    public static openModal() {
        App.game.gameState = GameConstants.GameState.townWalk;
        $('#townWalkModal').modal({backdrop: 'static', keyboard: false});
        setTimeout(() => TownWalk.load(), 200);
    }

    public static closeModal() {
        $('#townWalkModal').modal('hide');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    $('#townWalkModal').on('hide.bs.modal', () => {
        MapHelper.moveToTown(GameConstants.StartingTowns[player.region]);
    });
});