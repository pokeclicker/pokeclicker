class DiscordRichPresence {
    static focusedElement = document.createElement('input');
    static clientVersion = '';

    static startTimestamp = Date.now();
    static currentArea = '';
    static cycleSmallImageIndex = 0;
    static cycleOptions = [
        'money',
        'dungeonToken',
        'questPoint',
        'farmPoint',
        'diamond',
        'battlePoint',
        'trainer',
        'egg',
        'pokeball',
    ];

    static outputOptions: Array<{
        key: string,
        value: () => string | number,
        default: string | number,
    }> = [
        {
            key: 'caught',
            value: () => App.game.party.caughtPokemon.length,
            default: 0,
        },
        {
            key: 'caught_shiny',
            value: () => App.game.party.caughtPokemon.filter(p => p.shiny).length,
            default: 0,
        },
        {
            key: 'hatched',
            value: () => App.game.statistics.totalPokemonHatched(),
            default: 0,
        },
        {
            key: 'hatched_shiny',
            value: () => App.game.statistics.totalShinyPokemonHatched(),
            default: 0,
        },
        {
            key: 'sparkle',
            value: () => '✨',
            default: '✨',
        },
        {
            key: 'pokerus',
            value: () => App.game.party.caughtPokemon.filter(p => p.pokerus).length,
            default: 0,
        },
        {
            key: 'pokerus_resistant',
            value: () => App.game.party.caughtPokemon.filter(p => p.pokerus >= 3).length,
            default: 0,
        },
        {
            key: 'attack',
            value: () => App.game.party.calculatePokemonAttack(PokemonType.None, PokemonType.None, true, undefined, true, false, WeatherType.Clear, true, true),
            default: 0,
        },
        {
            key: 'regional_attack',
            value: () => App.game.party.calculatePokemonAttack(),
            default: 0,
        },
        {
            key: 'current_region',
            value: () => GameConstants.camelCaseToString(GameConstants.Region[player.region]),
            default: 'Unknown Region',
        },
        {
            key: 'current_subregion',
            value: () => SubRegions.getSubRegionById(player.region, player.subregion)?.name,
            default: 'Unknown Subregion',
        },
        {
            key: 'current_route',
            value: () => player.route() ? Routes.getName(player.route(), player.region) : player.town() ? player.town().name : 'Unknown Area',
            default: 'Unknown Area',
        },
        {
            key: 'current_area',
            value: () => player.route() ? Routes.getName(player.route(), player.region) : player.town() ? player.town().name : 'Unknown Area',
            default: 'Unknown Area',
        },
        {
            key: 'current_route_stats',
            value: () => player.route() ? App.game.statistics.routeKills[player.region][player.route()]() : player.town().dungeon ? App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(player.town().name)]() : player.town().gym ? App.game.statistics.gymsDefeated[GameConstants.getGymIndex(player.town().name)]() : 0,
            default: 0,
        },
        {
            key: 'current_area_stats',
            value: () => player.route() ? App.game.statistics.routeKills[player.region][player.route()]() : player.town().dungeon ? App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(player.town().name)]() : player.town().gym ? App.game.statistics.gymsDefeated[GameConstants.getGymIndex(player.town().name)]() : 0,
            default: 0,
        },
        {
            key: 'money',
            value: () => App.game.wallet.currencies[GameConstants.Currency.money](),
            default: 0,
        },
        {
            key: 'dungeon_tokens',
            value: () => App.game.wallet.currencies[GameConstants.Currency.dungeonToken](),
            default: 0,
        },
        {
            key: 'diamonds',
            value: () => App.game.wallet.currencies[GameConstants.Currency.diamond](),
            default: 0,
        },
        {
            key: 'farm_points',
            value: () => App.game.wallet.currencies[GameConstants.Currency.farmPoint](),
            default: 0,
        },
        {
            key: 'quest_points',
            value: () => App.game.wallet.currencies[GameConstants.Currency.questPoint](),
            default: 0,
        },
        {
            key: 'battle_points',
            value: () => App.game.wallet.currencies[GameConstants.Currency.battlePoint](),
            default: 0,
        },
        {
            key: 'achievement_bonus',
            value: () => AchievementHandler.achievementBonusPercent(),
            default: '0%',
        },
        {
            key: 'clicks',
            value: () => App.game.statistics.clickAttacks(),
            default: 0,
        },
        {
            key: 'time_played',
            value: () => GameConstants.formatSecondsToTime(App.game.statistics.secondsPlayed()),
            default: '0 Seconds',
        },
        {
            key: 'underground_levels_cleared',
            value: () => App.game.statistics.undergroundLayersMined(),
            default: 0,
        },
        {
            key: 'underground_items_found',
            value: () => App.game.statistics.undergroundItemsFound(),
            default: 0,
        },
        {
            key: 'underground_deal_trades',
            value: () => App.game.statistics.undergroundDailyDealTrades(),
            default: 0,
        },
        {
            key: 'quests_completed',
            value: () => App.game.statistics.questsCompleted(),
            default: 0,
        },
        {
            key: 'frontier_stages_cleared',
            value: () => App.game.statistics.battleFrontierTotalStagesCompleted(),
            default: 0,
        },
        {
            key: 'frontier_highest_cleared',
            value: () => App.game.statistics.battleFrontierHighestStageCompleted(),
            default: 0,
        },
        {
            key: 'total_berries_obtained',
            value: () => App.game.statistics.totalBerriesObtained(),
            default: 0,
        },
        {
            key: 'total_manual_harvests',
            value: () => App.game.statistics.totalManualHarvests(),
            default: 0,
        },
        {
            key: 'total_berries_harvested',
            value: () => App.game.statistics.totalBerriesHarvested(),
            default: 0,
        },
        {
            key: 'total_berries_replanted',
            value: () => App.game.statistics.totalBerriesReplanted(),
            default: 0,
        },
        {
            key: 'total_berries_mutated',
            value: () => App.game.statistics.totalBerriesMutated(),
            default: 0,
        },
        {
            key: 'total_mulches_used',
            value: () => App.game.statistics.totalMulchesUsed(),
            default: 0,
        },
        {
            key: 'total_shovels_used',
            value: () => App.game.statistics.totalShovelsUsed(),
            default: 0,
        },
        {
            key: 'berry_daily_deal_trades',
            value: () => App.game.statistics.berryDailyDealTrades(),
            default: 0,
        },
    ]

    static replaceDiscordText(input) {
        let output = input;
        this.outputOptions.forEach((option) => {
            try {
                let value = option.value();
                if (typeof value == 'number') {
                    value = value.toLocaleString('en-US');
                }
                output = output.replace(new RegExp(`{${option.key}}`, 'g'), value);
            } catch (e) {
                output = output.replace(new RegExp(`{${option.key}}`, 'g'), option.default);
            }
        });
        return output.replace(/<\/?br>/g, ' ');
    }

    static getRichPresenceData() {
        const nextArea = player.route() ? Routes.getName(player.route(), player.region) : player.town() ? player.town().name : 'Unknown Area';

        const discordRPCValues: Record<string, any> = {
            enabled: Settings.getSetting('discord-rp.enabled').observableValue(),
            line1: this.replaceDiscordText(Settings.getSetting('discord-rp.line-1').value || '  '),
            line2: this.replaceDiscordText(Settings.getSetting('discord-rp.line-2').value || '  '),
        };

        // Reset timer if area has changed
        if (Settings.getSetting('discord-rp.timer-reset').observableValue() && this.currentArea != nextArea) {
            this.startTimestamp = Date.now();
        }
        this.currentArea = nextArea;
        // Set our "start" timestamp
        if (Settings.getSetting('discord-rp.timer').observableValue()) {
            discordRPCValues.startTimestamp = this.startTimestamp;
        }

        // Our Discord images
        switch (Settings.getSetting('discord-rp.large-image').observableValue()) {
            case 'current-environment':
                discordRPCValues.largeImageKey = `background-${MapHelper.calculateBattleCssClass() ?? 'grass'}`;
                break;
            default:
                discordRPCValues.largeImageKey = Settings.getSetting('discord-rp.large-image').observableValue();
        }
        discordRPCValues.largeImageText = this.currentArea;

        let smallImage = Settings.getSetting('discord-rp.small-image').observableValue();
        if (smallImage === 'cycle') {
            smallImage = this.cycleOptions[++this.cycleSmallImageIndex % this.cycleOptions.length];
        }
        switch (smallImage) {
            case 'trainer':
                discordRPCValues.smallImageKey = `trainer-${App.game.profile.trainer()}`;
                discordRPCValues.smallImageText = this.replaceDiscordText('Total Attack: {attack}');
                break;
            case 'egg':
                discordRPCValues.smallImageKey = smallImage;
                discordRPCValues.smallImageText = this.replaceDiscordText('Total Hatched: {hatched}');
                break;
            case 'pokeball':
                discordRPCValues.smallImageKey = smallImage;
                discordRPCValues.smallImageText = this.replaceDiscordText('Shinies: {caught_shiny}/{caught} ✨');
                break;
            default:
                discordRPCValues.smallImageKey = smallImage.toLowerCase();
                discordRPCValues.smallImageText = `${GameConstants.camelCaseToString(smallImage)}: ${App.game.wallet.currencies[GameConstants.Currency[smallImage]]?.().toLocaleString('en-US') ?? '0'}`;
        }

        return discordRPCValues;
    }
}
