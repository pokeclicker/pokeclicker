import { formatDate } from './GameConstants';
import NotificationConstants from './notifications/NotificationConstants';
import Notifier from './notifications/Notifier';
import Profile from './profile/Profile';
import { SortSaves } from './Sortable';
import Settings from './settings/index';
import GameHelper from './GameHelper';
import GameLoadState from './utilities/GameLoadState';

export default class SaveSelector {
    static MAX_SAVES = 9;

    static loadSaves() {
        const container = document.querySelector('#saveSelector .save-container');

        const saves = Object.keys(localStorage).filter((k: string) => k.startsWith('save'));
        saves.forEach((saveKey) => {
            container.appendChild(SaveSelector.getTrainerCard(saveKey.replace(/^save/, '')));
        });

        if (saves.length >= SaveSelector.MAX_SAVES) {
            const newImportButton: HTMLDivElement = document.querySelector('#saveSelector .new-import-buttons');
            newImportButton.style.display = 'none';
        }

        $('[data-toggle="tooltip"]').tooltip();

        const showContextMenu = (top: number, left: number, key: string) => {
            $('#saveSelectorContextMenu').html(`
                <a class="dropdown-item bg-success" href="#" onclick="Save.key = '${key}'; SaveSelector.Download('${key}')">Download (backup)</a>
                <a class="dropdown-item bg-info" href="#" onclick="Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();">Load</a>
                <a class="dropdown-item bg-warning p-0 w-100" href="#"><label class="clickable my-0" style="padding:.75rem;" for="import-save" onclick="Save.key = '${key}';">Import (overwrite)</label></a>
                <a class="dropdown-item bg-danger" href="#" onclick="Save.key = '${key}'; Save.delete();">Delete</a>
            `).css({
                display: 'block',
                position: 'absolute',
                top,
                left,
            }).addClass('show');
        };

        $(container).on('contextmenu', '.trainer-card.clickable', (e) => {
            const { key } = e.currentTarget.dataset;
            if (key) {
                showContextMenu(e.pageY, e.pageX, key);
                return false; // blocks default Webbrowser right click menu
            }
            return true;
        });

        $(container).on('click', '.context-menu-button', (e) => {
            const { key } = e.currentTarget.closest('.trainer-card.clickable').dataset;
            if (key) {
                showContextMenu(e.pageY, e.pageX, key);
                return false;
            }
            return true;
        });

        $('#saveSelector, #context-menu a').on('click', () => {
            $('#saveSelectorContextMenu').removeClass('show').hide();
        });

        // Sort our saves
        SortSaves();

        $(document).on('keydown', SaveSelector.LoadSaveOnKeydown);
    }

    static LoadSaveOnKeydown(e: JQuery.KeyDownEvent) {
        if (GameHelper.focusedOnEditableElement()) {
            return;
        }

        if (GameLoadState.getLoadState() !== GameLoadState.states.none) {
            $(document).off(e);
            return;
        }

        const key = parseInt(e.key);
        if (!isNaN(key)) {
            const chosenSave = key - 1;
            const allSaves = $('.trainer-card');
            if (allSaves.length > chosenSave && chosenSave >= 0) {
                $(document).off(e);
                allSaves[chosenSave].click();
            }
        }
    }

    static getTrainerCard(key: string): Element {
        try {
            const rawData = localStorage.getItem(`save${key}`);
            const saveData = JSON.parse(rawData);
            const playerData = JSON.parse(localStorage.getItem(`player${key}`));
            let username = saveData.profile?.name ?? 'Trainer';
            try {
                username = saveData.profile?.name ?? 'Trainer';
            } catch (e) {
                console.warn('Unable to parse username');
            }
            return Profile.getTrainerCard(
                username,
                saveData.profile?.trainer,
                saveData.profile?.pokemon ?? saveData.party.caughtPokemon[0]?.id,
                saveData.profile?.pokemonShiny ?? saveData.party.caughtPokemon[0]?.shiny,
                saveData.profile?.pokemonShadow ?? false,
                saveData.profile?.pokemonFemale ?? false,
                saveData.profile?.background,
                saveData.profile?.textColor,
                saveData.badgeCase?.filter((b: boolean) => b)?.length ?? 0,
                saveData.party?.caughtPokemon?.length ?? 0,
                saveData.statistics?.secondsPlayed ?? 0,
                saveData.update?.version ?? 'Unknown',
                saveData.challenges?.list ?? {},
                playerData.trainerId,
                key,
            );
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`[${formatDate(new Date())}] %cFailed to load save:`, 'color:#e74c3c;font-weight:900;', key, e);
            return document.createElement('div');
        }
    }

    static btoa(saveString: string): string {
        return btoa(saveString.replace(/[^\u0000-\u00FF]+|%/g, (m) => encodeURI(m)));
    }

    static atob(encodeString: string): string {
        const decodeString = atob(encodeString);
        try {
            return decodeURI(decodeString);
        } catch {
            // Fix missing encodeURI in v0.10.11
            try {
                const URIfixData = JSON.parse(decodeString);
                URIfixData.save.pokeballFilters.list.forEach((i: any) => {
                    i.name = encodeURI(i.name);
                });
                return decodeURI(JSON.stringify(URIfixData));
            } catch {
                return decodeString;
            }
        }
    }

    static Download(key: string): void {
        try {
            // Load save data
            const saveData = JSON.parse(localStorage[`save${key}`]);
            const playerData = JSON.parse(localStorage[`player${key}`]);
            const settingsData = JSON.parse(localStorage[`settings${key}`] ?? localStorage.settings);

            // If we are missing any data, don't download the save
            if (!saveData || !playerData || !settingsData) {
                throw new Error('Missing save data..');
            }

            const data = {
                save: saveData,
                player: playerData,
                settings: settingsData,
            };

            // Create a download element
            const element = SaveSelector.createDownloadElement(data);
            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } catch (err) {
            console.error('Error trying to download save', err);
            Notifier.notify({
                title: 'Failed to download save data',
                message: 'Please check the console for errors, and report them on our Discord.',
                type: NotificationConstants.NotificationOption.primary,
                timeout: 6e4,
            });
        }
    }

    static createDownloadElement(data, versionNumber = data.save.update.version, isBackup = false) {
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(SaveSelector.btoa(JSON.stringify(data)))}`);
        const filename = data.settings.saveFilename || Settings.getSetting('saveFilename').defaultValue;
        const datestr = formatDate(new Date());
        const profile = data.save.profile?.name ?? 'Trainer';
        element.setAttribute('download', GameHelper.saveFileName(filename, { '{date}': datestr, '{version}': versionNumber, '{name}': profile }, isBackup));
        return element;
    }
}
