document.addEventListener('DOMContentLoaded', function (event) {
    $('#farmModal').on('show.bs.modal', function () {
        const seedList = $('#seedList');
        seedList.children().get(FarmRunner.curBerry.type).className += ' active';
        seedList.find('li').click(function () {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        });
    });

    $('#farmModal').on('hidden.bs.modal', function () {
        if (player.route() == 14) {
            App.game.gameState = GameConstants.GameState.fighting;
        } else {
            MapHelper.moveToRoute(14, GameConstants.Region.kanto);
        }
    });
});
