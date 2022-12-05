/**
 * TODO(@Isha) refactor this to no longer be global but App properties.
 * Will be done after the major player refactor.
 */
let player;

/**
 * Start the application when all html elements are loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const settings = localStorage.getItem('settings');
        Settings.fromJSON(JSON.parse(settings));
        document.body.className = `no-select ${Settings.getSetting('theme').observableValue()} ${Settings.getSetting('backgroundImage').observableValue()}`;
        (document.getElementById('theme-link') as HTMLLinkElement).href = `https://bootswatch.com/4/${Settings.getSetting('theme').observableValue()}/bootstrap.min.css`;

    } catch (e) {}
    if (!App.isUsingClient) {
        document.getElementById('use-our-client-message').style.display = 'block';
    }
    // Load list of saves
    SaveSelector.loadSaves();

    // Save resources by not displaying updates if game is not currently visible
    try {
        document.addEventListener('visibilitychange', () => {
            document.hidden ? document.body.classList.add('hidden') : document.body.classList.remove('hidden');
        });
    } catch (e) {}
});

// Nested modals can be opened while they are in the middle of hiding.
// This should raise their backdrop on top of any existing modals,
// preventing us from getting into that messy situation.
// Copied from https://stackoverflow.com/questions/19305821/multiple-modals-overlay#answer-24914782
$(document).on('show.bs.modal', '.modal', function () {
    const zIndex = Math.max(1040, Math.max(...$('.modal:visible').get().map(e => +e.style.zIndex)) + 10);
    $(this).css('z-index', zIndex);
    // setTimeout with 0 delay because the backdrop doesn't exist yet
    setTimeout(() => {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});
