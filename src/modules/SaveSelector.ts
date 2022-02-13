import NotificationConstants from './notifications/NotificationConstants';
import Notifier from './notifications/Notifier';
import Profile from './profile/Profile';
import Rand from './utilities/Rand';

export default class SaveSelector {
    static MAX_SAVES = 9;

    static loadSaves() {
        const container = document.querySelector('#saveSelector .container');

        const saves = Object.keys(localStorage).filter((k: string) => k.startsWith('save'));
        saves.forEach((saveKey) => {
            container.innerHTML += SaveSelector.getTrainerCard(saveKey.replace(/^save/, ''));
        });

        if (saves.length < this.MAX_SAVES) {
            const key = Rand.string(6);
            container.innerHTML += `<div class="col-12"></div>
            <label class="btn btn-success col-md-4 col-xs-12 mx-1" onclick="Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();">New Save</label>
            <label for="import-save" class="btn btn-warning col-md-4 col-xs-12 mx-1" onclick="Save.key = '${key}';">Import Save</label>`;
        }

        $('[data-toggle="tooltip"]').tooltip();

        $('.trainer-card.clickable').on('contextmenu', (e) => {
            const top = e.pageY;
            const left = e.pageX;
            const { key } = e.currentTarget.dataset;
            if (key) {
                $('#saveSelectorContextMenu').html(`
                    <a class="dropdown-item bg-success" href="#" onclick="Save.key = '${key}'; SaveSelector.Download('${key}')">Download (backup)</a>
                    <a class="dropdown-item bg-info" href="#" onclick="Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();">Load</a>
                    <a class="dropdown-item bg-warning" href="#"><label class="clickable my-0" for="import-save" onclick="Save.key = '${key}';">Import (overwrite)</label></a>
                    <a class="dropdown-item bg-danger" href="#" onclick="Save.key = '${key}'; Save.delete();">Delete</a>
                `).css({
                    display: 'block',
                    position: 'absolute',
                    top,
                    left,
                }).addClass('show');
                return false; // blocks default Webbrowser right click menu
            }
            return true;
        });

        $('#saveSelector, #context-menu a').on('click', () => {
            $('#saveSelectorContextMenu').removeClass('show').hide();
        });
    }

    static getTrainerCard(key: string): string {
        try {
            const rawData = localStorage.getItem(`save${key}`);
            const saveData = JSON.parse(rawData);
            return Profile.getTrainerCard(
                decodeURI(saveData.profile?.name ?? 'Trainer'),
                saveData.profile?.trainer,
                saveData.profile?.pokemon ?? saveData.party.caughtPokemon[0]?.id,
                saveData.profile?.pokemonShiny ?? saveData.party.caughtPokemon[0]?.shiny,
                saveData.profile?.background,
                saveData.profile?.textColor,
                saveData.badgeCase.filter((b: boolean) => b).length,
                saveData.party.caughtPokemon.length,
                saveData.statistics.secondsPlayed,
                saveData.update.version,
                saveData.challenges?.list,
                key,
            );
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Failed to load save:', key, e);
            return '';
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
            const element = document.createElement('a');
            element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(btoa(JSON.stringify(data)))}`);
            const filename = `[v${saveData.update.version}] PokeClickerSave_${key}.txt`;
            element.setAttribute('download', filename);

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
}
