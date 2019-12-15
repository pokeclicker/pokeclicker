/// <reference path="../../libs/motio.d.ts" />

class Safari {
    static grid: Array<Array<number>>;
    static player: Point = new Point(12, 20);
    static lastDirection: string = "up";
    static nextDirection: string;
    static walking: boolean = false;
    static isMoving: boolean = false;
    static queue: Array<string> = [];
    private static playerXY = {"x": 0, "y": 0};
    private static origin;
    static inBattle: KnockoutObservable<boolean> = ko.observable(false);
    static balls: KnockoutObservable<number> = ko.observable();
    static sprite: Motio;

    public static load() {
        this.grid = [];
        this.playerXY.x = 0;
        this.playerXY.y = 0;
        Safari.lastDirection = "up";
        Safari.inBattle(false);
        Safari.balls(this.calculateStartPokeballs());
        for( let i = 0; i<GameConstants.Safari.SizeY; i++){
            let row = Array.apply(null, Array(GameConstants.Safari.SizeX)).map(Number.prototype.valueOf, 0);
            this.grid.push(row);
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

        Safari.show();
    }

    private static addRandomBody(body: SafariBody) {
        let x = Safari.getRandomCoord(GameConstants.Safari.SizeX - 2);
        let y = Safari.getRandomCoord(GameConstants.Safari.SizeY - 2);
        if(body.type === 'fence'){
            x = Math.max(0, x-3);
            y = Math.max(0, y-3);
        }
        let res = Safari.canAddBody(x, y, body);
        if (res || body.type === 'grass') {
            Safari.addBody(x, y, body);
        }
    }

    private static getRandomCoord(max: number): number {
        return Math.floor(Math.random()*(max-3)) + 1;
    }

    private static canAddBody(x: number, y: number, body: SafariBody): boolean {
        if(
            x == 0 ||
            y == 0 ||
            y+body.maxY() >= GameConstants.Safari.SizeY ||
            x+body.maxX() >= GameConstants.Safari.SizeX
        ){
            return false;
        }
        for(let i = 0; i<body.grid.length; i++){
            for(let j = 0; j<body.grid[i].length; j++){
                if( (i + y) <GameConstants.Safari.SizeY && (j + x) < GameConstants.Safari.SizeX) {
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
        for(let i = 0; i<body.grid.length; i++){
            for( let j = 0; j<body.grid[i].length; j++){
                if(body.grid[i][j] !== 0){
                    if( (i + y) <GameConstants.Safari.SizeY && (j + x) < GameConstants.Safari.SizeX) {
                        if (this.grid[i + y][j + x] === 0) {
                            this.grid[i + y][j + x] = body.grid[i][j];
                        }
                    }
                }
            }
        }
    }

    static show() {
        let html = "";

        for (let i=0; i<this.grid.length; i++) {
            html += "<div class='row m-0'>";
            for (let j=0; j<this.grid[0].length; j++) {
                html += Safari.square(i, j);
            }
            html += "</div>";
        }

        $("#safariBattleBody").hide();
        $("#safariBody").html(html).show();

        Safari.addPlayer(Math.floor(GameConstants.Safari.SizeX - 1)/2, GameConstants.Safari.SizeY - 1);
    }

    private static square(i: number, j: number): string {
        let img = 'assets/images/safari/' + this.grid[i][j] + '.png';
        let divId = "safari-" + j + "-" + i;

        return "<div id='" + divId + "' style=background-image:url('" + img + "') class='col-sm-1 safariSquare'></div>"
    }

    private static addPlayer(i: number, j: number) {
        let topLeft = $(`#safari-0-0`).offset();
        let offset = {
            top: 32*j + topLeft.top,
            left: 32*i + topLeft.left
        };
        $("#safariBody").append("<div id='sprite'></div>");
        $("#sprite").css('background',  "url('assets/images/safari/walk" + Safari.lastDirection + ".png')");
        $("#sprite").css('position', 'absolute');
        $("#sprite").offset( offset );
        Safari.playerXY.x = i;
        Safari.playerXY.y = j;
        Safari.origin = offset;
    }

    public static move(dir: string) {
        if(!Safari.walking && !Safari.isMoving && !Safari.inBattle()) {
            Safari.queue = [];
            Safari.walking = true;
            Safari.queue.unshift(dir);
            Safari.startMoving(dir);
        } else {
            if(dir) {
                Safari.setNextDirection(dir)
            }
        }
    }

    private static startMoving(dir: string) {
        Safari.nextDirection = dir;

        if(!Safari.isMoving) {
            if (Safari.sprite.frame == 2) {
                Safari.sprite.to(0, true, function(){Safari.step(dir)});
            } else {
                Safari.step(dir);
            }
        }
    }

    private static step(direction: string) {
        Safari.lastDirection = direction;

        Safari.sprite.toggle();
        let directionOffset = Safari.directionToXY(direction);

        Safari.isMoving = true;

        let newPos = {
            x: Safari.playerXY.x + directionOffset.x,
            y: Safari.playerXY.y + directionOffset.y
        };

        if (Safari.canMove(newPos.x, newPos.y)) {
            let next = $(`#safari-${newPos.x}-${newPos.y}`).offset();
            let offset = {
                top: `+=${directionOffset.y * 32}`,
                left: `+=${directionOffset.x * 32}`
            }

            $("#sprite").css("background", "url('assets/images/safari/walk"+direction+".png')");
            Safari.playerXY.x = newPos.x;
            Safari.playerXY.y = newPos.y;
            $('#sprite').animate(offset, 250, "linear", function() {
                Safari.checkBattle();
                Safari.isMoving = false;
                if(Safari.walking){ if (!Safari.checkBattle() && Safari.queue[0]){Safari.step(Safari.queue[0])} }
            });
        } else {
            $("#sprite").css("background", "url('assets/images/safari/walk"+direction+".png')");
            setTimeout(function(){
                Safari.walking = false;
                Safari.isMoving = false;
                if(Safari.queue[0]){
                    Safari.isMoving = true;
                    Safari.walking = true;
                    Safari.step(Safari.queue[0]);
                }
            }, 250);
        }
    }

    private static directionToXY(dir: string) {
        let x = 0;
        let y = 0;
        switch (dir) {
            case "left": x=-1;break;
            case "up": y=-1;break;
            case "right": x=1;break;
            case "down": y=1;break;
        }
        return {x: x, y: y};
    }

    private static canMove(x: number, y: number): boolean {
        for(let i = 0; i<GameConstants.LEGAL_WALK_BLOCKS.length; i++){
            if(Safari.grid[y] && Safari.grid[y][x] === GameConstants.LEGAL_WALK_BLOCKS[i]){
                return true;
            }
        }
        return false;
    }

    private static setNextDirection(direction: string) {
        if(direction != Safari.lastDirection){
            if (Safari.queue[0] != direction) {
                if (Safari.queue.length == 1){
                    Safari.queue.unshift(direction);
                } else {
                    Safari.queue[0] = direction;
                }
            };
            Safari.nextDirection = direction;
            Safari.walking = true;
        }
    }

    public static stop(dir: string) {
        for (let i=0; i<Safari.queue.length; i++) {
            if (Safari.queue[i] == dir) {
                Safari.queue.splice(i, 1);
            }
        }
        if (!Safari.queue[0]){ Safari.walking = false };
    }

    public static openModal() {
        if (player.hasKeyItem("Safari ticket")) {
            Game.gameState(GameConstants.GameState.safari);
            Safari.load();
            $('#safariModal').modal({backdrop: 'static', keyboard: false});
        } else {
            Notifier.notify("You do not have access to that location", GameConstants.NotificationOption.warning);
        }
    }

    private static checkBattle(): boolean {
        let battle = false;
        if (Safari.grid[Safari.playerXY.y][Safari.playerXY.x] === 10) {
            battle = Math.random() * GameConstants.SAFARI_BATTLE_CHANCE <= 1;
        }
        if(battle && !Safari.inBattle()){
            SafariBattle.load();
            return true;
        }
        return false;
    }

    private static calculateStartPokeballs(){
        return GameConstants.SAFARI_BASE_POKEBALL_COUNT;
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    $('#safariModal').on('hidden.bs.modal', function () {
        MapHelper.moveToTown("Fuchsia City");
    });

    $('#safariModal').on('shown.bs.modal', function () {
        let element = document.querySelector('#sprite');
        Safari.sprite = new Motio(element, {
            fps: 8,
            frames: 4
        }).on('frame', function() {
            if (Safari.sprite.frame % 2 == 0) {
                Safari.sprite.pause();
            }
        });
    });
});
