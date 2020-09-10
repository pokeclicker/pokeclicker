class Discord implements Saveable {
    saveKey = 'discord';

    defaults: Record<string, any> = {
        ID: null,
        username: null,
    };

    // These will be updated from our config values
    clientID = '$DISCORD_CLIENT_ID';
    uri = '$DISCORD_LOGIN_URI';

    ID: KnockoutObservable<number> = ko.observable(null);
    username: KnockoutObservable<string> = ko.observable(null);
    codes: Array<DiscordCode> = [
        new DiscordPokemonCode(pokemonMap['Unown (D)'], 700, 'Alternate form of Unown'),
        new DiscordPokemonCode(pokemonMap['Unown (I)'], 700, 'Alternate form of Unown'),
        new DiscordPokemonCode(pokemonMap['Unown (S)'], 700, 'Alternate form of Unown'),
        new DiscordPokemonCode(pokemonMap['Unown (C)'], 700, 'Alternate form of Unown'),
        new DiscordPokemonCode(pokemonMap['Unown (O)'], 700, 'Alternate form of Unown'),
        new DiscordPokemonCode(pokemonMap['Unown (R)'], 700, 'Alternate form of Unown'),
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
        const code = search.get('code');
        if (code) {
            $.ajax({
                data: { code },
                type: 'get',
                url: this.uri,
                crossDomain: true,
                dataType: 'json',
                success: data => {
                    if (data && data.id) {
                        this.ID(data.id);
                        this.username(`${data.username}#${data.discriminator}`);
                        Notifier.notify({ title: `Welcome ${this.username()}`, message: 'Successfully logged in to Discord!', type: GameConstants.NotificationOption.success, timeout:GameConstants.MINUTE });
                    }
                },
                complete: () => {
                    // Remove the code from the URI, no longer needed
                    window.history.replaceState('', '', `${location.origin + location.pathname}`);
                },
            });
        }
    }

    login(): void {
        location.href = `https://discord.com/oauth2/authorize?client_id=${this.clientID}&redirect_uri=${location.origin + location.pathname}&response_type=code&scope=identify&prompt=consent`;
    }

    logout(): void {
        this.ID(this.defaults.id);
        this.username(this.defaults.username);
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
            Notifier.notify({ message: 'Discord integration not enabled', type: GameConstants.NotificationOption.danger });
            return false;
        }
        // User not logged in to Discord
        if (!this.ID) {
            Notifier.notify({ message: 'You must sign in to Discord before attempting this code', type: GameConstants.NotificationOption.danger });
            return false;
        }

        // Try find a matching code
        const code = this.findCodeMatch(enteredCode);

        // No code found
        if (!code) {
            Notifier.notify({ message: `Invalid code ${enteredCode}`, type: GameConstants.NotificationOption.danger });
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
        this.username(json.username || this.defaults.username);
        this.loadCodes(json.codes || []);
    }

    toJSON(): Record<string, any> {
        return {
            ID: this.ID(),
            username: this.username(),
            codes: this.codes.filter(c => c.claimed),
        };
    }

}
