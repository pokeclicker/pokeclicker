class Discord implements Saveable {
    saveKey = 'discord';

    defaults: Record<string, any> = {
        ID: null,
    };


    ID: KnockoutObservable<string> = ko.observable(null);
    codes: Array<DiscordCode> = [
        new DiscordPokemonCode(pokemonMap['Unown (D)'], 700, 'An alternate form of Unown.'),
        new DiscordPokemonCode(pokemonMap['Unown (I)'], 700, 'An alternate form of Unown.'),
        new DiscordPokemonCode(pokemonMap['Unown (S)'], 700, 'An alternate form of Unown.'),
        new DiscordPokemonCode(pokemonMap['Unown (C)'], 700, 'An alternate form of Unown.'),
        new DiscordPokemonCode(pokemonMap['Unown (O)'], 700, 'An alternate form of Unown.'),
        new DiscordPokemonCode(pokemonMap['Unown (R)'], 700, 'An alternate form of Unown.'),
        new DiscordPokemonCode(pokemonMap['Surfing Pikachu'], 1500, 'It\'s a Pikachu on a surfboard!'),
        new DiscordPokemonCode(pokemonMap['Rotom (Discord)'], 10000, 'A Discord-style Rotom!'),
        new DiscordItemCode('HatcheryHelperLeslie', 'Someone to hire in your Daycare.'),
    ];

    get enabled(): boolean {
        // This was done like this so es/tslint doesn't throw errors
        try {
            return !!JSON.parse('$DISCORD_ENABLED');
        } catch (e) {
            return false;
        }
    }

    constructor() {
        // Check if code provided by Discord, which means the user has logged in, and we need to get their details
        const search = new URLSearchParams(location.search);
        const discordID: string = search.get('discordID');
        if (discordID) {
            this.ID(discordID);
            Notifier.notify({
                message: 'Successfully logged in to Discord!',
                type: NotificationConstants.NotificationOption.success,
                timeout: GameConstants.MINUTE,
            });
            window.history.replaceState('', '', `${location.origin + location.pathname}`);
        }
    }

    login(): void {
        // This will be updated from our config values
        location.href = `$DISCORD_LOGIN_PROXY?action=login&redirect_uri=${encodeURIComponent(location.origin + location.pathname)}`;
    }

    logout(): void {
        this.ID(this.defaults.id);
        // Save now
        Save.store(player);
    }

    calcCode(code) {
        const discordID = +App.game.discord.ID() || false;
        if (!discordID) {
            return;
        }

        // reverse the string (for names that are similar - forms)
        const codeSeed = code.name.split('').reverse()
            // map to the character code
            .map(l => l.charCodeAt(0))
            // multiply the numbers (should be random enough)
            .reduce((s,b) => s * (b / 10), 1);

        SeededRand.seed(discordID + codeSeed);

        const arr = [];
        for (let i = 0; i < 14; i++) {
            let int;
            while (int == undefined || int.length != 1) {
                int = SeededRand.intBetween(0, 35).toString(36);
            }
            arr.push(int);
        }

        arr[4] = '-';
        arr[9] = '-';

        return arr.join('').toUpperCase();
    }

    findCodeMatch(enteredCode: string): DiscordCode {
        return this.codes.find(code => enteredCode.toUpperCase() == this.calcCode(code));
    }

    enterCode(enteredCode: string): boolean {
        // Discord integration disabled
        if (!this.enabled) {
            Notifier.notify({
                message: 'Discord integration not enabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        // User not logged in to Discord
        if (!this.ID()) {
            Notifier.notify({
                message: 'You must sign in to Discord before attempting to use this code',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }

        // Try find a matching code
        const code = this.findCodeMatch(enteredCode);

        // No code found
        if (!code) {
            Notifier.notify({
                message: `Invalid code ${enteredCode}`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }

        // Claim the code
        code.claim();
        return true;
    }

    loadCodes(codes) {
        codes.forEach(code => {
            const c = this.codes.find(c => c.name == code.name);
            if (c) {
                c.claimed = code.claimed;
            }
        });
    }

    fromJSON(json): void {
        if (!json || !json.ID) {
            return;
        }

        this.ID(json.ID || this.defaults.ID);
        this.loadCodes(json.codes || []);
    }

    toJSON(): Record<string, any> {
        return {
            ID: this.ID(),
            codes: this.codes.filter(c => c.claimed),
        };
    }

}
