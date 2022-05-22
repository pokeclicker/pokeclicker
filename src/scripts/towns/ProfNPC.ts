class ProfNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region
    ) {
        super(name, dialog, { image: 'assets/images/oak.png' });
    }

    get dialogHTML(): string {
        const requiresCompleteDex = App.game.challenges.list.requireCompletePokedex.active();
        const nextRegionUnlocked = TownList[GameConstants.StartingTowns[this.region + 1]]?.isUnlocked() ?? false;
        const completeDexAchievement = AchievementHandler.findByName(`${GameConstants.camelCaseToString(GameConstants.Region[this.region])} Master`);


        if (!nextRegionUnlocked) {
            return `<p>Hello, new Champion, you've come a long way!</p>
                    <p>Come see me once you've beat the Elite Four!</p>`;
        }

        let html = '';

        if (completeDexAchievement.isCompleted()) {
            switch (this.region) {
                case GameConstants.Region.kanto:
                    html += '<p>Congratulations on completing your Kanto Pokédex!</p>';
                    break;
                case GameConstants.Region.johto:
                    html += '<p>Oh, another regional Pokédex completed so soon?</p>';
                    break;
                case GameConstants.Region.hoenn:
                    html += '<p>That\'s another regional Pokédex completed! Fantastic.</p>';
                    break;
                case GameConstants.Region.sinnoh:
                    html += '<p>Congratulations, you\'re more than half-way completed on the national Pokédex!</p>';
                    break;
                case GameConstants.Region.unova:
                    html += '<p>Let me see your progress...Ah, fantastic, as usual!</p>';
                    break;
                case GameConstants.Region.kalos:
                    html += '<p></p>';
                    break;
                case GameConstants.Region.alola:
                    html += '<p></p>';
                    break;
                case GameConstants.Region.galar:
                    html += '<p>TODO: add text before Galars release</p>';
                    break;
                default:
                    throw new Error('Not impleted for this region yet');
            }
        } else {
            if (requiresCompleteDex) {
                html += 'To progress to the next region, you need to catch all Pokémons in this region.';
            }
            html += `<p>You still have ${completeDexAchievement.property.requiredValue - completeDexAchievement.getProgress()} left to catch in this region! You're almost there!</p>`;
        }

        if (nextRegionUnlocked && (completeDexAchievement.isCompleted() || !requiresCompleteDex)) {
            switch (this.region) {
                case GameConstants.Region.kanto:
                    html += '<p>Your journey isn\'t over yet, a whole world awaits you! Onwards to Johto!</p>';
                    break;
                case GameConstants.Region.johto:
                    html += '<p>Amazing! Next stop is Hoenn, enjoy the sunshine while you\'re there!</p>';
                    break;
                case GameConstants.Region.hoenn:
                    html += '<p>I really appreciate being able to see your outstanding progress, thank you! Sinnoh is next up.</p>';
                    break;
                case GameConstants.Region.sinnoh:
                    html += '<p>Next stop is Unova! I\'ve always wanted to visit Castelia City personally...</p>';
                    break;
                case GameConstants.Region.unova:
                    html += '<p>Allow me some time to arrange tickets for your next destination.</p>';
                    break;
                case GameConstants.Region.kalos:
                    html += '<p></p>';
                    break;
                case GameConstants.Region.alola:
                    html += '<p></p>';
                    break;
                case GameConstants.Region.galar:
                    html += '<p>TODO: add text before Galars release</p>';
                    break;
                default:
                    throw new Error('Not impleted for this region yet');
            }
        }

        return html;
    }
}
