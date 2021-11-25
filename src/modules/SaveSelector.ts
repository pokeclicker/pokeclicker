import Profile from './profile/Profile';

export default class SaveSelector {
    static MAX_SAVES = 9;

    static loadSaves() {
        const container = document.querySelector('#saveSelector .container');

        const saves = Object.keys(localStorage).filter((k: string) => k.startsWith('save'));
        saves.forEach((saveKey) => {
            container.innerHTML += SaveSelector.getTrainerCard(saveKey.replace(/^save/, ''));
        });

        if (saves.length < this.MAX_SAVES) {
            const key = Math.random().toString(36).substring(7);
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
}
