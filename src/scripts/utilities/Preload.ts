class Preload {
    static async loadTownImages() {
        this.hideSplashScreen();
    }

    static hideSplashScreen() {
        $('.loader').fadeOut("slow")
    }
}