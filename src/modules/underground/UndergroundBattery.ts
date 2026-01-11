import { Coordinate } from './mine/Mine';
import { Observable, PureComputed } from 'knockout';
import GameHelper from '../GameHelper';
import {
    humanifyString,
    Pokeball,
    UNDERGROUND_BATTERY_COOLDOWN_SECONDS,
    UNDERGROUND_BATTERY_MAX_CHARGES,
} from '../GameConstants';
import Rand from '../utilities/Rand';
import { UndergroundController } from './UndergroundController';
import OakItemType from '../enums/OakItemType';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import Requirement from '../requirements/Requirement';
import MultiRequirement from '../requirements/MultiRequirement';
import { batteryPatternEruption } from './battery/eruption';
import { batteryPatternHydroCannon } from './battery/hydroCannon';
import { batteryPatternDragonBreath } from './battery/dragonBreath';
import { batteryPatternLeafTornado } from './battery/leafTornado';
import { batteryPatternOverdrive } from './battery/overdrive';
import { batteryPatternTenMillionVoltThunderbolt } from './battery/tenMillionVoltThunderbolt';
import { batteryPatternDracoMeteor } from './battery/dracoMeteor';
import { batteryPatternHeartStamp } from './battery/heartStamp';
import { batteryPatternPokeball } from './battery/pokeball';
import { batteryPatternSurf } from './battery/surf';
import { batteryPatternExplosion } from './battery/explosion';
import { batteryPatternFleurCannon } from './battery/fleurCannon';
import { batteryPatternHyperBeam } from './battery/hyperBeam';
import PokeballRequirement from '../requirements/PokeballRequirement';
import UndergroundLevelRequirement from '../requirements/UndergroundLevelRequirement';

export type Pattern = Array<Array<{ coordinate: Coordinate, depth: number }>>;

export class UndergroundBatteryPattern {
    private _id: string;
    private _tier: number;
    private _weight: number;

    private _pattern: Pattern = [];
    private _tilesCleared: number;

    private _requirement?: Requirement;

    public canAccess: PureComputed<boolean> = ko.pureComputed(() => this._requirement?.isCompleted() ?? true);

    constructor(id: string, tier: number, pattern: Pattern, requirement: Requirement = undefined) {
        this._id = id;
        this._tier = tier;
        this._weight = 1.7 ** tier;

        this._pattern = pattern;
        this._tilesCleared = pattern.flatMap(frame => frame?.map(value => value.depth) || 0).reduce((prev, cur) => prev + cur, 0);

        this._requirement = new MultiRequirement([...(requirement ? [requirement] : [])]);
    }

    get hint(): string {
        return this._requirement?.hint() || null;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return humanifyString(this._id);
    }

    get tier(): number {
        return this._tier;
    }

    get pattern(): Pattern {
        return this._pattern;
    }

    get weight(): number {
        return this._weight;
    }
}

export class UndergroundBattery {
    private _charges: Observable<number> = ko.observable(0);
    private _batteryCooldown: Observable<number> = ko.observable(0);

    private static _patterns: Array<UndergroundBatteryPattern> = [];

    private _activeDischargePattern: UndergroundBatteryPattern | null = null;
    private _activeDischargeFrame: number = 0;

    public canDischarge: PureComputed<boolean> = ko.pureComputed(() =>
        this.charges >= this.maxCharges &&
        App.game.underground.mine.timeUntilDiscovery <= 0 &&
        !App.game.underground.mine.completed &&
        UndergroundBattery._patterns.length !== 0);

    public static addPattern(pattern: UndergroundBatteryPattern) {
        this._patterns.push(pattern);
    }

    public initialize() {

    }

    public update(delta: number) {
        if (this._batteryCooldown() > 0) {
            GameHelper.incrementObservable(this._batteryCooldown, -delta);
        }
    }

    public charge() {
        if (this._charges() >= this.maxCharges) {
            return;
        }

        if (this._batteryCooldown() > 0) {
            return;
        }

        GameHelper.incrementObservable(this._charges, 1);
        this._batteryCooldown(UNDERGROUND_BATTERY_COOLDOWN_SECONDS);

        if (this._charges() >= this.maxCharges) {
            UndergroundController.notifyBatteryFull();
        }
    }

    public discharge() {
        if (!this.canDischarge()) {
            return;
        }

        const unlockedPatterns = UndergroundBattery._patterns.filter(value => value.canAccess());
        const randomPattern = Rand.fromWeightedArray(unlockedPatterns, unlockedPatterns.map(v => v.weight));

        this._activeDischargePattern = randomPattern;
        this._activeDischargeFrame = 0;
        this._charges(0);

        GameHelper.incrementObservable(App.game.statistics.undergroundBatteryDischarges[randomPattern.id]);
        App.game.oakItems.use(OakItemType.Cell_Battery);
        Notifier.notify({
            title: 'Cell Battery Discharge',
            message: `Your Cell Battery has discharged with the move '${randomPattern.name}'`,
            type: NotificationConstants.NotificationOption.success,
            timeout: 1e4,
        });

        this.handleDischargingPattern();
    }

    private async handleDischargingPattern() {
        while (
            this._activeDischargePattern &&
            this._activeDischargeFrame < this._activeDischargePattern.pattern.length &&
            this.canDischarge
        ) {
            const patternFrame = this._activeDischargePattern.pattern[this._activeDischargeFrame];

            if ((patternFrame?.length || 0) > 0) {
                const tilesMined = new Set<Coordinate>();

                patternFrame.forEach(patternEntry => {
                    if (App.game.underground.mine.attemptBreakTile(patternEntry.coordinate, patternEntry.depth)) {
                        tilesMined.add(patternEntry.coordinate);
                    }
                });

                UndergroundController.handleCoordinatesMined(Array.from(tilesMined), null);
            }

            ++this._activeDischargeFrame;

            await new Promise(resolve => {
                setTimeout(resolve, 15);
            });
        }
        this._activeDischargePattern = null;
    }

    get charges() {
        return this._charges();
    }

    get maxCharges() {
        // Additive as the bonus is a negative number
        return UNDERGROUND_BATTERY_MAX_CHARGES + App.game.oakItems.calculateBonus(OakItemType.Cell_Battery);
    }

    get patterns() {
        return UndergroundBattery._patterns;
    }

    public fromJSON(save) {
        this._charges(save?.charges ?? 0);
        this._batteryCooldown(save?.batteryCooldown ?? 0);

        this._activeDischargePattern = UndergroundBattery._patterns.find(p => p.id === save?.activeDischargeID) ?? null;
        this._activeDischargeFrame = save?.activeDischargeFrame ?? 0;

        this.handleDischargingPattern();
    }

    public toJSON() {
        return {
            charges: this._charges(),
            batteryCooldown: this._batteryCooldown(),
            activeDischargeID: this._activeDischargePattern?.id,
            activeDischargeFrame: this._activeDischargeFrame,
        };
    }
}

UndergroundBattery.addPattern(new UndergroundBatteryPattern('Eruption', 0, batteryPatternEruption));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Hydro Cannon', 1, batteryPatternHydroCannon, new UndergroundLevelRequirement(5)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Dragon Breath', 2, batteryPatternDragonBreath, new UndergroundLevelRequirement(10)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Leaf Tornado', 2, batteryPatternLeafTornado, new UndergroundLevelRequirement(10)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Overdrive', 2, batteryPatternOverdrive, new UndergroundLevelRequirement(10)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('10,000,000 Volt Thunderbolt', 3, batteryPatternTenMillionVoltThunderbolt, new UndergroundLevelRequirement(15)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Draco Meteor', 3, batteryPatternDracoMeteor, new UndergroundLevelRequirement(15)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Heart Stamp', 3, batteryPatternHeartStamp, new UndergroundLevelRequirement(15)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Pokéball', 4, batteryPatternPokeball, new MultiRequirement([new UndergroundLevelRequirement(20), new PokeballRequirement(46100, Pokeball.Pokeball)])));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Surf', 4, batteryPatternSurf, new UndergroundLevelRequirement(20)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Explosion', 5, batteryPatternExplosion, new UndergroundLevelRequirement(30)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Fleur Cannon', 5, batteryPatternFleurCannon, new UndergroundLevelRequirement(30)));
UndergroundBattery.addPattern(new UndergroundBatteryPattern('Hyper Beam', 5, batteryPatternHyperBeam, new UndergroundLevelRequirement(30)));
