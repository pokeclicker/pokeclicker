import Profile from './profile/Profile';
import * as GameConstants from './GameConstants';

export default class SaveSelector {
    static loadSaves() {
        const container = document.querySelector('#saveSelector .container');

        const saves = Object.keys(localStorage).filter((k: string) => k.startsWith('save'));
        saves.forEach((saveKey) => {
            container.innerHTML += SaveSelector.getTrainerCard(saveKey.replace(/^save/, ''));
        });

        const key = Math.random().toString(36).substring(7);
        container.innerHTML += `<div class="col-12"></div><a href="#" class="btn btn-primary col-4" onclick="Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();">New Save</a>`;
    }

    static getTrainerCard(key: string, preview = false): string {
        try {
            const rawData = localStorage.getItem(`save${key}`);
            const saveData = JSON.parse(rawData);
            return `
            <div class="col-4 mb-3">
                <div class="trainer-card trainer-bg-${saveData.profile?.background ?? Math.floor(Math.random() * Profile.MAX_BACKGROUND)} card font-weight-bold" style="color: ${saveData.profile?.textColor ?? 'whitesmoke'}">
                    <div class="card-body">
                        <h5 class="align-middle font-weight-bold"><img src="assets/images/profile/trainer-${saveData.profile?.trainer ?? Math.floor(Math.random() * Profile.MAX_TRAINER)}.png"/> ${saveData.profile?.name ?? 'Trainer'}</h5>
                        <table class="table table-sm table-borderless col-8" style="color: ${saveData.profile?.textColor ?? 'whitesmoke'}">
                            <tbody>
                                <tr>
                                    <td>Badges:</td>
                                    <td class="text-right">${saveData.badgeCase.filter((b: boolean) => b).length}</td>
                                </tr>
                                <tr>
                                    <td>Pokédex:</td>
                                    <td class="text-right">${saveData.party.caughtPokemon.length}</td>
                                </tr>
                                <tr>
                                    <td>Time:</td>
                                    <td class="text-right">${GameConstants.formatTimeFullLetters(saveData.statistics.secondsPlayed)}</td>
                                </tr>
                            <tbody>
                        </table>
                        <img class="pokemon-0" src="assets/images/pokemon/${saveData.profile?.pokemon ?? saveData.party.caughtPokemon[0]?.id ?? Math.floor(Math.random() * 251)}.png"/>
                        <small class="version">v${saveData.update.version}</small>
                        <a href="#" class="btn btn-primary load-game" onclick="${preview ? "Notifier.notify({ message: 'This would load your profile..' });" : `Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();">LOAD</a>`}
                    </div>
                </div>
            </div>
            `;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Failed to load save:', key, e);
            return '';
        }
    }
}
