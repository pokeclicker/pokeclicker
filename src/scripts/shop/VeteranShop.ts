/// <reference path="./Shop.ts"/>

interface VeteranUnlockConfig {
    isUnlocked: KnockoutObservable<boolean>;
    checkFunction: (playerData: Record<string, any>, saveData: Record<string, any>) => boolean;
}

class VeteranShop extends Shop {
    static unlockList: Record<GameConstants.VeteranUnlock, VeteranUnlockConfig>
        = {} as Record<GameConstants.VeteranUnlock, VeteranUnlockConfig>;

    constructor(items: Item[]) {
        super(items, 'Veteran Shop');
    }

    public static initialize(): void {
        VeteranShop.addUnlock(GameConstants.VeteranUnlock.PokerusVirus, (playerData, saveData) => {
            const caughtPokemon = saveData?.party?.caughtPokemon ?? [];
            let resistCount = 0;

            for (const pokemon of caughtPokemon) {
                if (pokemon[PartyPokemonSaveKeys.pokerus] >= GameConstants.Pokerus.Resistant) {
                    resistCount++;
                    if (resistCount >= 500) {
                        return true;
                    }
                }
            }

            return false;
        });

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.EventCalendar,
            (playerData, saveData) => saveData?.keyItems?.Event_calendar === true);

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.ExplorerKit, (playerData, saveData) => {
            const exp = saveData?.underground?.undergroundExp ?? 0;
            return Underground.convertExperienceToLevel(exp) >= 50;
        });

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.HoloCaster,
            (playerData, saveData) => saveData?.keyItems?.Holo_caster === true);

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.WailmerPail, (playerData, saveData) => {
            const unlockedPlots = (saveData?.farming?.plotList ?? []).filter((plot) => plot.isUnlocked === true);
            return unlockedPlots.length >= GameConstants.FARM_PLOT_WIDTH * GameConstants.FARM_PLOT_HEIGHT;
        });

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.SuperRod,
            (playerData, saveData) => saveData?.keyItems?.Super_rod === true);

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.GemCase, (playerData, saveData) => {
            const gemUpgrades = saveData?.gems?.gemUpgrades ?? [];
            const totalUpgrades = Gems.nTypes * Gems.nEffects;

            if (gemUpgrades.length < totalUpgrades) {
                return false;
            }

            const validUpgrades = App.game.gems.validUpgrades;
            const maxUpgrade = GameConstants.MAX_GEM_UPGRADES;
            let index = 0;

            for (let type = 0; type < Gems.nTypes; type++) {
                const typeValidUpgrades = validUpgrades[type];
                for (let effect = 0; effect < Gems.nEffects; effect++) {
                    if (typeValidUpgrades[effect] && gemUpgrades[index] < maxUpgrade) {
                        return false;
                    }
                    index++;
                }
            }

            return true;
        });

        VeteranShop.addUnlock(GameConstants.VeteranUnlock.CeruleanBerryShopPermit, (playerData, saveData) => {
            const unlockedBerries = saveData?.farming?.unlockedBerries ?? [];
            return unlockedBerries[BerryType.Petaya] === true;
        });

        VeteranShop.checkUnlocks();
    }

    static addUnlock(
        unlock: GameConstants.VeteranUnlock,
        checkFunction: (playerData: Record<string, any>, saveData: Record<string, any>) => boolean
    ) {
        VeteranShop.unlockList[unlock] = {
            isUnlocked: ko.observable(false),
            checkFunction,
        };
    }

    static checkUnlocks(): void {
        const saveKeys = Object.keys(localStorage)
            .filter((k: string) => k.startsWith('save') && k !== `save${Save.key}`)
            .map((k: string) => k.replace(/^save/, ''));

        if (saveKeys.length === 0) {
            return;
        }

        const unlocks = Object.values(VeteranShop.unlockList);
        for (const saveKey of saveKeys) {
            try {
                const saveData = JSON.parse(localStorage.getItem(`save${saveKey}`));
                const playerData = JSON.parse(localStorage.getItem(`player${saveKey}`));

                for (const unlock of unlocks) {
                    if (unlock.isUnlocked()) {
                        continue;
                    }

                    unlock.isUnlocked(unlock.checkFunction(playerData, saveData));
                }
            } catch (e) {
                console.error(`Failed to initialize Veteran unlocks for save key ${saveKey}:`, e);
            }

            if (unlocks.every((unlock) => unlock.isUnlocked())) {
                break;
            }
        }
    }

    static isUnlockAvailable(unlock: GameConstants.VeteranUnlock): boolean {
        return this.unlockList[unlock]?.isUnlocked() ?? false;
    }

    public isVisible(): boolean {
        return Object.values(VeteranShop.unlockList).some((unlock) => unlock.isUnlocked());
    }
}
