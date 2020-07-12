const changelogType = {
    UPDATE: { display: 'dark', label: 'UPDATE' },
    NEW: { display: 'success', label: 'NEW' },
    CHANGE: { display: 'primary', label: 'CHANGE' },
    FIXED: { display: 'warning', label: 'FIXED' },
    REMOVED: { display: 'danger', label: 'REMOVED' },
    EVENT: { display: 'info', label: 'EVENT' },
    DEFAULT: { display: 'default', label: '-' }, // unused - can be changed
};

class Changelog {
    public type: { display: string; label: string };
    public description: string;

    constructor(type = { display: 'default', label: '-' }, description: string) {
        this.type = type;
        this.description = description;
        if (type == changelogType.UPDATE) {
            this.description = `<code>${this.description}</code>`;
        }
    }
}

/**
 * Add your changes to the top of the changelog. Please do not increase the version number.
 *
 * MAJOR - Will stay at 0 during development, 1 after the first public release
 * MINOR - Will increment for each feature refactor or large changes to a feature
 * PATCH - Increment for small changes, bugfixes, UI changes.
 */
const changelogItems = [
    // v0.4.9
    new Changelog(changelogType.UPDATE, 'v0.4.9'),
    new Changelog(changelogType.NEW, 'Added option to disable found berries notifications'),

    // v0.4.8
    new Changelog(changelogType.UPDATE, 'v0.4.8'),
    new Changelog(changelogType.NEW, 'More events'),
    new Changelog(changelogType.NEW, 'Added caught status indicator to Safari Zone entrance'),
    new Changelog(changelogType.NEW, 'Added caught status indicator to Dungeons'),
    new Changelog(changelogType.CHANGE, 'Show Oak Item details on hover on main screen'),
    new Changelog(changelogType.CHANGE, 'Updated Oak Items modal to show current experience on hover'),
    new Changelog(changelogType.CHANGE, 'Animate town and dungeon background images'),
    new Changelog(changelogType.CHANGE, 'Updated battle views of routes and dungeons'),
    new Changelog(changelogType.FIXED, 'Event notifications showing way before event start'),
    new Changelog(changelogType.FIXED, 'Reduce lag when hatching Pokémon'),

    // v0.4.7
    new Changelog(changelogType.UPDATE, 'v0.4.7 - Layout'),
    new Changelog(changelogType.NEW, 'Added option to sort Pokémon list by base attack'),
    new Changelog(changelogType.CHANGE, 'Added information and confirmation check before traveling to next available region'),
    new Changelog(changelogType.CHANGE, 'Updated the Oak Items layout'),
    new Changelog(changelogType.CHANGE, 'Updated layout of Towns and Dungeons'),
    new Changelog(changelogType.CHANGE, 'Updated the Hoenn map'),
    new Changelog(changelogType.CHANGE, 'Show the amount of Pokémon visible in Pokedex with filters active'),
    new Changelog(changelogType.FIXED, 'Event Pokémon no longer count towards achievements or being able to travel to next region'),
    new Changelog(changelogType.FIXED, 'Mt. Chimney dungeon is now more powerful'),

    // v0.4.6
    new Changelog(changelogType.UPDATE, 'v0.4.6 - Bug fixes'),
    new Changelog(changelogType.NEW, 'Old save can be backed up when the game updates incase anything goes wrong<br/><i>You can disable auto download in the settings</i>'),
    new Changelog(changelogType.NEW, 'Add events modal'),
    new Changelog(changelogType.CHANGE, 'Safari now uses a Safari Ball'),
    new Changelog(changelogType.CHANGE, 'Added ability to track event Pokémon statistics'),
    new Changelog(changelogType.CHANGE, 'Update Discord link'),
    new Changelog(changelogType.FIXED, 'Pokeball should appear in dungeons again'),
    new Changelog(changelogType.FIXED, 'Fix Eeveelutions'),

    // v0.4.5
    new Changelog(changelogType.UPDATE, 'v0.4.5 - Special events'),
    new Changelog(changelogType.EVENT, 'Flying Pikachu Event'),
    new Changelog(changelogType.NEW, 'Special events can now appear in game'),
    new Changelog(changelogType.CHANGE, 'Modified the look of the dock'),
    new Changelog(changelogType.CHANGE, 'Always add caught Shiny Pokémon to the Log Book'),
    new Changelog(changelogType.CHANGE, 'Added close button on the top right of more modals'),
    new Changelog(changelogType.FIXED, 'Dungeon layout should be shuffled again'),
    new Changelog(changelogType.FIXED, 'Hopefully fixed some values becoming NaN'),

    // v0.4.4
    new Changelog(changelogType.UPDATE, 'v0.4.4 - Statistics 2.0'),
    new Changelog(changelogType.NEW, 'Add some new game codes'),
    new Changelog(changelogType.NEW, 'Statistics can now be viewed from the Start Menu'),
    new Changelog(changelogType.NEW, 'Pokémon statistics can be viewed by clicking a Pokémon in the Pokedex'),
    new Changelog(changelogType.CHANGE, 'Update some game codes'),
    new Changelog(changelogType.REMOVED, 'Remove old game codes'),
    new Changelog(changelogType.FIXED, 'Can no longer breed fossils from regions you have not reached yet'),
    new Changelog(changelogType.FIXED, 'Added missing notifications for stone evolution Pokémon'),

    // v0.4.3
    new Changelog(changelogType.UPDATE, 'v0.4.3'),
    new Changelog(changelogType.NEW, 'Add setting to disable currency animations'),
    new Changelog(changelogType.CHANGE, 'Increase some notifications display time'),
    new Changelog(changelogType.CHANGE, 'Decreased price multiplier'),
    new Changelog(changelogType.CHANGE, 'Modified Pokémon list reverse checkbox to show arrows instead'),
    new Changelog(changelogType.CHANGE, 'Updated changelog layout'),
    new Changelog(changelogType.FIXED, 'Fix LilyCove City naming and image'),
    new Changelog(changelogType.FIXED, 'Tidy up Key items, Evolution stones selector'),
    new Changelog(changelogType.FIXED, 'Sketchy theme checkboxes and close icons should display correctly now'),

    // v0.4.2
    new Changelog(changelogType.UPDATE, 'v0.4.2'),
    new Changelog(changelogType.FIXED, 'Fixed some Key items not being given when supposed to'),

    // v0.4.1
    new Changelog(changelogType.UPDATE, 'v0.4.1 - More fixes'),
    new Changelog(changelogType.NEW, 'More items added to underground'),
    new Changelog(changelogType.CHANGE, 'All Hoenn Pokémon should be obtainable now'),
    new Changelog(changelogType.FIXED, 'Pokedex filtering should be working again'),
    new Changelog(changelogType.FIXED, 'Some items showing _ in their name in notifications'),

    // v0.4.0
    new Changelog(changelogType.UPDATE, 'v0.4.0 - Statistics update'),
    new Changelog(changelogType.NEW, 'Current save data should be compatible with future versions!'),
    new Changelog(changelogType.NEW, 'More statistics have been added'),
    new Changelog(changelogType.CHANGE, 'Updated the way statistics are stored'),
    new Changelog(changelogType.CHANGE, 'Updated notifications'),
    new Changelog(changelogType.FIXED, 'Fix some missing Hoenn Pokémon'),
    new Changelog(changelogType.FIXED, 'Fix some missing images'),

    // v0.3.1
    new Changelog(changelogType.UPDATE, 'v0.3.1 - Bug catcher'),
    new Changelog(changelogType.CHANGE, 'Eevee will now evolve into Espeon or Umbreon depending on the time of day (when using Time stone)'),
    new Changelog(changelogType.FIXED, 'Can no longer evolve Magmar and Electabuzz before you are allowed'),
    new Changelog(changelogType.FIXED, 'Fix breeding steps gained for newer regions'),
    new Changelog(changelogType.FIXED, 'Fix roaming encounters for newer regions'),
    new Changelog(changelogType.FIXED, 'Fix route rewards for newer regions'),

    // v0.3.0
    new Changelog(changelogType.UPDATE, 'v0.3.0 - Hoenn Update'),
    new Changelog(changelogType.NEW, 'Add initial Hoenn region'),
    new Changelog(changelogType.CHANGE, 'Shiny Pokémon now increase click damage at a 50% rate compared to normal Pokémon'),
    new Changelog(changelogType.CHANGE, 'Allow better control of which type of ball to use when capturing a Pokémon'),

    // v0.2.1
    new Changelog(changelogType.UPDATE, 'v0.2.1'),
    new Changelog(changelogType.REMOVED, 'Remove Hoenn dungeons for now to avoid triggering errors'),
    new Changelog(changelogType.FIXED, 'Other berries will now be tasked in Quests'),

    // v0.2.0
    new Changelog(changelogType.UPDATE, 'v0.2.0 - Redeemable codes'),
    new Changelog(changelogType.NEW, 'Add redeemable codes to get a quick boost. You can enter them under the Save tab'),
    new Changelog(changelogType.FIXED, 'Gyms no longer reset 1 second in'),

    // v0.1.0
    new Changelog(changelogType.UPDATE, 'v0.1.0 - Farming refactor'),
    new Changelog(changelogType.CHANGE, 'Farming plots are a bit more expensive'),
    new Changelog(changelogType.CHANGE, 'Wailmer pail unlocks at 3 Cheri berries instead of 5'),
    new Changelog(changelogType.FIXED, 'Tooltips no longer overstay their welcome on the Farm'),

    // v0.0.5
    new Changelog(changelogType.UPDATE, 'v0.0.5'),
    new Changelog(changelogType.NEW, 'Can now use spacebar to start Gym/Dungeon'),
    new Changelog(changelogType.FIXED, 'Stones now work with multiple evolutions'),
    new Changelog(changelogType.FIXED, 'Pokémon will no longer evolve into evolutions you have already obtained'),
    new Changelog(changelogType.FIXED, 'Can obtain Pokémon from future generations by re-breeding'),
    new Changelog(changelogType.FIXED, 'Devolutions are obtained when breeding evolved forms'),
    new Changelog(changelogType.NEW, 'Add setting to toggle egg percentage/step count'),
    new Changelog(changelogType.CHANGE, 'Total shiny Pokémon caught no longer adds to your click attack'),
    new Changelog(changelogType.CHANGE, 'Halve xp needed to upgrade Oak items'),
    new Changelog(changelogType.FIXED, 'BattleItems now buy correctly'),
    new Changelog(changelogType.CHANGE, 'Increase dungeon tokens received when catching Pokémon'),
    new Changelog(changelogType.CHANGE, 'Going to the breeder will no longer send you to route 5'),
    new Changelog(changelogType.CHANGE, 'You will now start the game with 25 Pokeballs'),
    new Changelog(changelogType.CHANGE, 'Tutorial quest buy Pokeballs amount reduced'),
    new Changelog(changelogType.FIXED, 'Selecting "max" in store will no longer freeze the game for key items'),

    // v0.0.4 - 01-01-2020
    new Changelog(changelogType.UPDATE, 'v0.0.4'),
    new Changelog(changelogType.NEW, 'Show pokeball image by caught Pokémon in the Pokedex'),
    new Changelog(changelogType.CHANGE, 'Show the reason you cannot access a location'),
    new Changelog(changelogType.CHANGE, 'Total shiny Pokémon caught now add to your total click attack'),
    new Changelog(changelogType.FIXED, 'Display floored dungeon tokens amount'),

    // v0.0.3
    new Changelog(changelogType.UPDATE, 'v0.0.3'),
    new Changelog(changelogType.NEW, 'Can now progress in multiple quest at a time <i>(amount based on Quest Level)</i>'),
    new Changelog(changelogType.NEW, 'Side cards can now be collapsed for more space'),
    new Changelog(changelogType.CHANGE, 'Move battle item container'),
    new Changelog(changelogType.CHANGE, 'Update how achievement percentages are shown'),
    new Changelog(changelogType.CHANGE, 'Update hatch/catch notification message'),
    new Changelog(changelogType.FIXED, 'Show the hatchery "list" button once Johto unlocked without page refresh'),
    new Changelog(changelogType.FIXED, 'Plates from underground should now sell for their correct value'),

    // v0.0.2
    new Changelog(changelogType.UPDATE, 'v0.0.2'),
    new Changelog(changelogType.NEW, 'Added changelog'),
    new Changelog(changelogType.CHANGE, 'Show battle item names and descriptions'),
    new Changelog(changelogType.FIXED, 'Item magnet now works in dungeons'),
    new Changelog(changelogType.FIXED, 'Battle items no longer always active'),

    // v0.0.1
    new Changelog(changelogType.UPDATE, 'v0.0.1'),
    new Changelog(changelogType.NEW, 'Add battle items'),
];
