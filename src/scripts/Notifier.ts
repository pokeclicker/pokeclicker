class Notifier {
    public static notify({ message, type = GameConstants.NotificationOption.primary, title = '', timeout = 3000, time = 'just now', sound = null, setting = null }: { message: string; type?: GameConstants.NotificationOption; title?: string; timeout?: number; time?: string, sound?: Sound, setting?: BooleanSetting }) {
        $(document).ready(function() {
            // If we have sounds enabled for this, play it now
            if (sound) {
                sound.play();
            }
            
            // Check if this type of notification is disabled
            if (setting && !Settings.getSetting(setting.name).value) {
                return;
            }

            // Get the notification ready to display
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

            // Show the notification
            $('.toast').toast('show');

            // Once the notification is shown, hide it after specified timeout
            $(`#${toastID}`).on('shown.bs.toast', (el) => {
                setTimeout(() => {
                    $(`#${toastID}`).toast('hide');
                }, timeout);
            });

            // Once hidden remove the element
            $(`#${toastID}`).on('hidden.bs.toast', () => {
                document.getElementById(toastID).remove();
            });
        });
    }
}
