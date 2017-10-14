class Preload {

    static async preload() {

        return new Promise<number>(resolve => {
            Preload.loadBackgroundImages();
            Preload.hideSplashScreen();

            Preload.loadTownImages();
            resolve();
        });
    }

    static loadTownImages() {

    }

    static loadBackgroundImages() {
        let loader = $('#loader');
        loader.css('background', 'url(/assets/images/background.png) top');
        loader.css('background-size', 'cover');
        let body = $('body');
        body.css('background', 'url(/assets/images/background.png) top');
        body.css('background-size', 'cover');
    }

    static hideSplashScreen() {
        setTimeout(function () {

            $('.loader').fadeOut("slow")
        }, 2600)
    }
}