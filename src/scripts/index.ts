// TODO(@Isha) refactor this to no longer be global but App properties.
let player;
const debug = false;
let game;

if (!debug)
    Object.freeze(GameConstants);

interface JQuery {
    animateNumber(options: object): void;
}

/**
 * Start the application when all html elements are loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
    App.start()
});
