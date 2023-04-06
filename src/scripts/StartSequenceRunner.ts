class StartSequenceRunner {

    public static starterPicked: GameConstants.Starter = GameConstants.Starter.None
    public static noStarterCount = 0;

    public static start() {
        App.game.gameState = GameConstants.GameState.paused;
        $('#startSequenceModal').modal('show');

    }

    public static pickStarter(s: GameConstants.Starter) {
        // Reload the achievements in case the user has any challenge modes activated
        AchievementHandler.load();
        this.starterPicked = s;

        const dataPokemon: DataPokemon = App.game.challenges.listSpecial.monotype.active() ?
            PokemonHelper.getPokemonById(GameConstants.RegionalStartersMonotype[GameConstants.Region.kanto][App.game.challenges.listSpecial.monotype.pokemonType()]) :
            PokemonHelper.getPokemonById(GameConstants.RegionalStarters[GameConstants.Region.kanto][this.starterPicked]);

        App.game.quests.getQuestLine('Tutorial Quests').beginQuest(0);
        $('#pickStarterTutorialModal').modal('hide');
        const shiny: boolean = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        const gender = PokemonFactory.generateGender(dataPokemon.gender.femaleRatio, dataPokemon.gender.type);

        App.game.gameState = GameConstants.GameState.fighting;

        const battlePokemon = new BattlePokemon(dataPokemon.name, dataPokemon.id, dataPokemon.type1, dataPokemon.type2, 10, 1, 100, 0, new Amount(0, GameConstants.Currency.money), shiny, 0, gender);
        Battle.enemyPokemon(battlePokemon);

        // Show the help information text
        Information.show({
            steps: [
                {
                    element: document.getElementsByClassName('battle-view')[0],
                    intro: 'Click here to deal "Click Attack" damage to Pokémon.',
                },
            ],
        });

        // Set the function to call showCaughtMessage after pokemon is caught
        battlePokemon.isAlive = function () {
            if (battlePokemon.health() <= 0) {
                setTimeout(() => {
                    Information.hide();
                    player.regionStarters[GameConstants.Region.kanto](StartSequenceRunner.starterPicked);
                    App.game.profile.pokemon(dataPokemon.id);
                    StartSequenceRunner.showCaughtMessage();
                }, 1000);

                //reset the function so you don't call it too many times :)
                //What a beautiful piece of code
                battlePokemon.isAlive = function () {
                    return false;
                };
            }
            return this.health() > 0;
        };
    }

    /**
     * For Monotype Challenge. Checks if the starter is Grass/Fire/Water for the GameConstants.Starter, if not, it's Special
     * @param selectedType 
     * @returns GameConstants.Starter
     */
    public static checkMonotypeStarter(selectedType) {
        let starter = GameConstants.Starter.Special;
        switch (selectedType) {
            case PokemonType['Grass']:
                starter = GameConstants.Starter.Grass;
                break;
            case PokemonType['Fire']:
                starter = GameConstants.Starter.Fire;
                break;
            case PokemonType['Water']:
                starter = GameConstants.Starter.Water;
                break;
            default:;
        }
        return starter;
    }

    public static showCaughtMessage() {
        App.game.gameState = GameConstants.GameState.paused;
        $('#starterCaughtModal').modal('show');
        $('#pokeballSelector').css('display', 'block');
        $('#pokemonListContainer').css('display', 'block');
        $('#oakItemsContainer').css('display','block');
        $('#questDisplayContainer').css('display','block');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    $('#startSequenceModal').on('hidden.bs.modal', () => {
        $('#pickStarterTutorialModal').modal('show');
    });

    $('#pickStarterTutorialModal').on('hidden.bs.modal', () => {
        if (StartSequenceRunner.starterPicked == GameConstants.Starter.None) {
            if (!App.game.challenges.listSpecial.monotype.active()) { // Don't add Pikachu if monotype challenge is enabled
                StartSequenceRunner.noStarterCount++;
                const startersCount = StartSequenceRunner.noStarterCount >= 5 ? 'four' : 'three';
                $('#pickStarterTutorialModalText').text(`I can't hold off all ${startersCount}! Please pick the Pokémon you want to fight!`);
                if (StartSequenceRunner.noStarterCount == 5) {
                    // Add Pikachu to the selections
                    $('#starterSelection').append(`<div class="col">
                            <input class="image-starter" type="image"
                            src="assets/images/pokemon/25.png"
                            onclick="StartSequenceRunner.pickStarter(GameConstants.Starter.Special)">
                        </div>`);
                }
            }
            $('#pickStarterTutorialModal').modal('show');
        }
    });

    $('#starterCaughtModal').on('hidden.bs.modal', () => {
        Save.store(player);
        App.game.gameState = GameConstants.GameState.fighting;
        Information.show({
            steps: [
                {
                    element: document.getElementById('questDisplayContainer'),
                    intro: 'Complete the tutorial quests to continue.',
                },
            ],
        });
    });
});
