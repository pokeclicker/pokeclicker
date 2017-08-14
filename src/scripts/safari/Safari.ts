class Safari {
    static grid: Array<Array<number>>;
    static player: Point = new Point(12, 20);

    public static load() {
        this.grid = [];
        this.player.x = 12;
        this.player.y = 20;
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
        //showSafari();
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
        if(y+body.grid.length > GameConstants.Safari.SizeY || x+body.grid[0].length > GameConstants.Safari.SizeX){
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
            html += "<div class='row'>";
            for (let j=0; j<this.grid[0].length; j++) {
                html += Safari.square(i, j);
            }
            html += "</div>";
        }

        $("#safariBody").html(html);
    }

    private static square(i: number, j: number): string {
        let img = 'assets/images/safari/' + this.grid[i][j] + '.png';
        let divId = "safari-" + j + "-" + i;

        return "<div id='" + divId + "' style=background-image:url('" + img + "') class='col-sm-1 safariSquare'></div>"
    }

}