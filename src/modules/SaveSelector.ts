import Profile from './profile/Profile';

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

    static getTrainerCard(key: string): string {
        try {
            const rawData = localStorage.getItem(`save${key}`);
            const saveData = JSON.parse(rawData);
            return Profile.getTrainerCard(
                saveData.profile?.name,
                saveData.profile?.trainer,
                saveData.profile?.pokemon ?? saveData.party.caughtPokemon[0]?.id,
                saveData.profile?.background,
                saveData.profile?.textColor,
                saveData.badgeCase.filter((b: boolean) => b).length,
                saveData.party.caughtPokemon.length,
                saveData.statistics.secondsPlayed,
                saveData.update.version,
                key,
            );
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Failed to load save:', key, e);
            return '';
        }
    }
}
