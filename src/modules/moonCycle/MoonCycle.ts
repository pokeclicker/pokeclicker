/* eslint-disable arrow-body-style */
import { Computed } from 'knockout';
import CurrentMoonPhase from './CurrentMoonPhase';
import MoonCyclePhase from './MoonCyclePhase';
import { MoonCycleValues } from '../GameConstants';
import { DAY } from '../GameConstants';

export default class MoonCycle {
    public static currentMoonCyclePhase: Computed<MoonCyclePhase> = ko.pureComputed(() => {
        const moonOrigin = (new Date('01/01/1970'));
        const moonToday = (new Date(Date.now()));
        moonToday.setHours(0);
	    moonToday.setMinutes(0);
	    moonToday.setSeconds(0);
        moonToday.setMilliseconds(0);
        const moonDif = (moonToday.getTime() + moonOrigin.getTime()) / DAY;
        const moonPhaseNow = (Math.floor(moonDif % 8));

        return Number(Object.entries(MoonCycleValues).find(([, moonPhaseC]) => moonPhaseC == moonPhaseNow)?.[0] ?? Object.keys(MoonCycleValues));
    });

    public static image: Computed<string> = ko.pureComputed(() => {
        return `assets/images/moonCycle/${MoonCyclePhase[MoonCycle.currentMoonCyclePhase()]}.png`;
    });

    public static color: Computed<string> = ko.pureComputed(() => {
        return MoonCycle.currentMoonPhases[MoonCycle.currentMoonCyclePhase()].color;
    });

    public static tooltip: Computed<string> = ko.pureComputed(() => {
        return MoonCycle.currentMoonPhases[MoonCycle.currentMoonCyclePhase()].tooltip;
    });

    public static currentMoonPhases: Record<MoonCyclePhase, CurrentMoonPhase> = {
        [MoonCyclePhase.NewMoon]:
            new CurrentMoonPhase(MoonCyclePhase.NewMoon, '#3b365e', 'New Moon'),
        [MoonCyclePhase.WaxingCrescentMoon]:
            new CurrentMoonPhase(MoonCyclePhase.WaxingCrescentMoon, '#3b365e', 'Waxing Crescent Moon'),
        [MoonCyclePhase.FirstQuarterMoon]:
            new CurrentMoonPhase(MoonCyclePhase.FirstQuarterMoon, '#3b365e', 'First Quarter Moon'),
        [MoonCyclePhase.WaxingGibbousMoon]:
            new CurrentMoonPhase(MoonCyclePhase.WaxingGibbousMoon, '#3b365e', 'Waxing Gibbous Moon'),
        [MoonCyclePhase.FullMoon]:
            new CurrentMoonPhase(MoonCyclePhase.FullMoon, '#3b365e', 'Full Moon'),
        [MoonCyclePhase.WaningGibbousMoon]:
            new CurrentMoonPhase(MoonCyclePhase.WaningGibbousMoon, '#3b365e', 'Waning Gibbous Moon'),
        [MoonCyclePhase.LastQuarterMoon]:
            new CurrentMoonPhase(MoonCyclePhase.LastQuarterMoon, '#3b365e', 'Last Quarter Moon'),
        [MoonCyclePhase.WaningCrescentMoon]:
            new CurrentMoonPhase(MoonCyclePhase.WaningCrescentMoon, '#3b365e', 'Waning Crescent Moon'),
    };
}
