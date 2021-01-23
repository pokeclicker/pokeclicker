/**
 * TODO(@Isha) refactor this to no longer be global but App properties.
 * Will be done after the major player refactor.
 */
let player;

/**
 * Start the application when all html elements are loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Load list of saves
    SaveSelector.loadSaves();
});

// Nested modals can be opened while they are in the middle of hiding.
// This should raise their backdrop on top of any existing modals,
// preventing us from getting into that messy situation.
// Copied from https://stackoverflow.com/questions/19305821/multiple-modals-overlay#answer-24914782
$(document).on('show.bs.modal', '.modal', function () {
    const zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    // setTimeout with 0 delay because the backdrop doesn't exist yet
    setTimeout(() => {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});
