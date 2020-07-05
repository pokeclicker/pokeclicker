/* eslint @typescript-eslint/camelcase: off */
class Notifier {

    public static notify({ message, type = GameConstants.NotificationOption.primary, title = '', timeout = 3000, time = 'just now' }: { message: string; type?: GameConstants.NotificationOption; title?: string; timeout?: number; time?: string }) {

        $(document).ready(function() {
            const toastID = Math.random().toString(36).substr(2, 9);
            const toastHTML = `<div id="${toastID}" class="toast bg-${GameConstants.NotificationOption[type]}" data-autohide="false">
                  ${title ? `<div class="toast-header">
                    <strong class="mr-auto text-primary">${title || ''}</strong>
                    <small class="text-muted">${time}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>
                  </div>` : ''}
                  <div class="toast-body text-light">
                    ${message}
                    ${title ? '' : '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>'}
                  </div>
                </div>`;
            $('#toaster').prepend(toastHTML);
            $('.toast').toast('show');
            $(`#${toastID}`).on('shown.bs.toast', function (el) {
                setTimeout(() => {
                    $(`#${toastID}`).toast('hide');
                }, timeout);
            });
            $(`#${toastID}`).on('hidden.bs.toast', function () {
                document.getElementById(toastID).remove();
            });
        });
    }
}
