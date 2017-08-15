class SafariBattle {
    static enemy: SafariPokemon;

    public static load() {
        SafariBattle.enemy = SafariBattle.generateEnemy();
        Safari.inBattle = true;
        Notifier.notify("Battle", GameConstants.NotificationOption.info);
        SafariBattle.showBattleBars();
    }

    private static generateEnemy(): SafariPokemon {
        let enemyName = GameConstants.SAFARI_POKEMON[Math.floor(Math.random() * GameConstants.SAFARI_POKEMON.length)]
        return new SafariPokemon(enemyName);
    }

    private static showBattleBars() {
        /*
        let html =  "<div id='battleBars' class='container-fluid'>";
        for( let i = 0; i<10; i++){
            html += "<div id=battleBar"+i + " class='battleBar'></div>";
        }

        html += "</div>";
        $("#safariBody").html(html);
        $(".battleBar").animate({
            width: "50%"
        }, 1000, "linear");
        */
        SafariBattle.show();
    }

    private static show() {
        let html = "";
        html += "<div class='row safariEnemyRow'>";
        html +=     `<div class='col-sm-2 offset-sm-8' id='safariEnemy'><img src='assets/images/pokemon/${SafariBattle.enemy.id}.png'></div>`;
        html += "</div>";
        html += "<div class='row'>";
        html +=     "<div class='col-sm-2 offset-sm-3'>";
        html +=         "<img id='safariPlayer' src='assets/images/safari/playerBack.png'>"
        html +=     "</div>";
        html += "</div>";

        html += "<div id='battleConsole' class='row'>";
        html +=     "<div class='col-sm-6'>"
        html +=         "<h3 id='safariBattleText'>What will you do?</h3>"
        html +=     "</div>";
        html += "<div class='row col-sm-4 offset-sm-2 safariOptions'>";
        html +=     `<div class='col-sm-6 safariOption'><button onClick='throwBall()' class='btn btn-info safariButton'>Ball (${Safari.balls})</button></div>`;
        html +=     "<div class='col-sm-6 safariOption'><button onClick='throwBait()' class='btn btn-info safariButton'>Bait</button></div>";
        html +=     "<div class='col-sm-6 safariOption'><button onClick='throwRock()' class='btn btn-info safariButton'>Rock</button></div>";
        html +=     "<div class='col-sm-6 safariOption'><button onClick='safariRun()' class='btn btn-info safariButton'>Run</button></div>";
        html += "</div>";

        $("#safariBody").html(html);
        $("#safariBody").css("background-image", "url('assets/images/safari/safariBattle.png')");
        $("#safariBody").css("background-size", "100% auto");
    }
}