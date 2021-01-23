export default class SaveSelector {
    static loadSaves() {
        const container = document.querySelector('#saveSelector .container');

        const saves = Object.keys(localStorage).filter((k: string) => k.startsWith('save'));
        saves.forEach((saveKey, index) => {
            try {
                const rawData = localStorage.getItem(saveKey);
                const saveData = JSON.parse(rawData);
                container.innerHTML += `
                <div class="col-4 mb-3">
                    <div class="trainer-card card text-white font-weight-bold">
                        <div class="card-body">
                            <h5 class="align-middle font-weight-bold"><img src="assets/images/trainer.png"/> Player_${index}</h5>
                            <p class="card-text">
                            Badges: ${saveData.badgeCase.length}
                            <br/>Pokédex: ${saveData.party.caughtPokemon.length}
                            <br/>Time: ${saveData.statistics.secondsPlayed}s
                            </p>
                            <a href="#" class="btn btn-primary float-right" onclick="Save.key = '${saveKey.replace(/^save/, '')}'; document.querySelector('#saveSelector').remove(); App.start();">LOAD</a>
                        </div>
                    </div>
                </div>
                `;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log('Failed to load save:', saveKey, e);
            }
        });

        const key = Math.random().toString(36).substring(7);
        container.innerHTML += `<div class="col-12"></div><a href="#" class="btn btn-primary col-4" onclick="Save.key = '${key}'; document.querySelector('#saveSelector').remove(); App.start();">New Save</a>`;
    }
}
