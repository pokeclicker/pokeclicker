import NotificationOption from './NotificationOption';
import Sound from '../utilities/Sound';
import Rand from '../utilities/Rand';
import type NotificationSetting from '../settings/NotificationSetting';

export default class Notifier {
    public static notify({
        message,
        type = NotificationOption.primary,
        title = '',
        timeout = 3000,
        time = 'just now',
        sound = null,
        setting = null,
        image = null,
        strippedMessage = null,
    }: {
        message?: string;
        type?: NotificationOption;
        title?: string;
        timeout?: number;
        time?: string;
        sound?: Sound;
        setting?: NotificationSetting;
        image?: string;
        strippedMessage?: string;
    }): void {
        $(document).ready(() => {
            // If we have sounds enabled for this, play it now
            if (sound) {
                sound.play();
            }

            if (setting && setting.desktopNotification.value && Notification.permission === 'granted') {
                const tempEl = document.createElement('div');
                tempEl.innerHTML = strippedMessage ?? message.replace(/<br\s*[/]?>/gi, '\n');
                const msg = tempEl.innerText.replace(/  +/g, ' ');
                const desktopNotification = new Notification(title, {
                    body: msg,
                    icon: image,
                    silent: true,
                });
                setTimeout(() => {
                    desktopNotification.close();
                }, timeout);
            }

            // Check if this type of notification is disabled
            if (setting && setting.inGameNotification && !setting.inGameNotification.value) {
                return;
            }

            // Get the notification ready to display
            const toastID = Rand.string(7);
            const toastHTML = `<div id="${toastID}" class="toast bg-${NotificationOption[type]}" data-autohide="false">
                ${title ? `<div class="toast-header">
                    ${image ? `<img src="${image}" class="icon" />` : ''}
                    <strong class="mr-auto text-primary">${title || ''}</strong>
                    <small class="text-muted">${time}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>
                </div>` : ''}
                <div class="toast-body text-light">
                    ${!title && image ? `<img src="${image}" class="icon" />` : ''}
                    ${message.replace(/\n/g, '<br/>')}
                    ${title ? '' : '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>'}
                </div>
                </div>`;

            $('#toaster').prepend(toastHTML);

            // Show the notification
            $(`#${toastID}`)?.toast('show');

            // Once the notification is shown, hide it after specified timeout
            $(`#${toastID}`).on('shown.bs.toast', () => {
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

    public static prompt({
        title,
        message,
        type = NotificationOption.primary,
        timeout = 0,
        sound = null,
    }: {
        title: string;
        message: string;
        type?: NotificationOption;
        timeout?: number;
        sound?: Sound,
    }): Promise<string> {
        // If we have sounds enabled for this, play it now
        if (sound) {
            sound.play();
        }

        return new Promise((resolve) => {
            // Get the notification ready to display
            const modalID = Rand.string(7);
            const html = `
<div class="modal fade noselect" id="modal${modalID}" tabindex="-1" role="dialog" aria-badgeledby="prompt">
    <div class="modal-dialog modal-dialog-scrollable modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header modal-header pb-0 pt-2 px-2 bg-${NotificationOption[type]}">
                <h5>${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body py-2 px-2 text-left">
                ${message.replace(/\n/g, '<br/>')}
                <br/>
                <br/>
                <input class="outline-dark form-control" placeholder="Type here.." id="promptInput${modalID}" type="text">
            </div>
            <div class="modal-footer p-2">
                <button class="btn btn-block outline-dark btn-${NotificationOption[type]}" data-dismiss="modal">Submit</button>
            </div>
        </div>
    </div>
</div>`;
            $('#toaster').before(html);

            (document.getElementById(`promptInput${modalID}`) as HTMLInputElement).addEventListener('keyup', ({ key }) => {
                if (key === 'Enter') {
                    $(`#modal${modalID}`).modal('hide');
                }
            });

            $(`#modal${modalID}`).modal({
                backdrop: 'static',
                show: true,
            });

            // Once the modal is shown, hide it after specified timeout
            $(`#modal${modalID}`).on('shown.bs.modal', () => {
                (document.getElementById(`promptInput${modalID}`) as HTMLInputElement).focus();
                if (timeout > 0) {
                    setTimeout(() => {
                        $(`#modal${modalID}`).modal('hide');
                    }, timeout);
                }
            });

            // Once hidden remove the element
            $(`#modal${modalID}`).on('hidden.bs.modal', () => {
                const inputEl = document.getElementById(`promptInput${modalID}`) as HTMLInputElement;
                const inputValue = inputEl?.value;
                document.getElementById(`modal${modalID}`).remove();
                resolve(inputValue);
            });
        });
    }

    public static confirm({
        title,
        message,
        confirm = 'Ok',
        cancel = 'Cancel',
        type = NotificationOption.primary,
        timeout = 0,
        sound = null,
    }: {
        title: string;
        message: string;
        confirm?: string;
        cancel?: string;
        type?: NotificationOption;
        timeout?: number;
        sound?: Sound,
    }): Promise<boolean> {
        // If we have sounds enabled for this, play it now
        if (sound) {
            sound.play();
        }

        return new Promise((resolve) => {
            // Get the notification ready to display
            const modalID = Rand.string(7);
            const html = `
<div class="modal fade noselect" id="modal${modalID}" tabindex="-1" role="dialog" aria-badgeledby="prompt">
    <div class="modal-dialog modal-dialog-scrollable modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header modal-header pb-0 pt-2 px-2 bg-${NotificationOption[type]}">
                <h5>${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body py-2 px-2 text-left">
                ${message.replace(/\n/g, '<br/>')}
            </div>
            <div class="modal-footer p-2">
                <button class="btn col outline-dark btn-${NotificationOption[type]}" data-dismiss="modal" id="modalConfirm${modalID}">${confirm}</button>
                <button class="btn col outline-dark btn-secondary" data-dismiss="modal">${cancel}</button>
            </div>
        </div>
    </div>
</div>`;
            $('#toaster').before(html);

            (document.getElementById(`modalConfirm${modalID}`) as HTMLInputElement).addEventListener('click', () => {
                resolve(true);
            });

            $(`#modal${modalID}`).modal({
                backdrop: 'static',
                show: true,
            });

            // Once the modal is shown, hide it after specified timeout
            $(`#modal${modalID}`).on('shown.bs.modal', () => {
                if (timeout > 0) {
                    setTimeout(() => {
                        $(`#modal${modalID}`).modal('hide');
                    }, timeout);
                }
            });

            // Once hidden remove the element
            $(`#modal${modalID}`).on('hidden.bs.modal', () => {
                document.getElementById(`modal${modalID}`).remove();
                resolve(false);
            });
        });
    }
}
