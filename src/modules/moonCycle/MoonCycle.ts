/* eslint-disable arrow-body-style */
import { Computed } from 'knockout';
import CurrentMoonPhase from './CurrentMoonPhase';
import MoonCyclePhase from './MoonCyclePhase';
import { MoonCycleValues } from '../GameConstants';
import { DAY } from '../GameConstants';
//import GameHelper from '../GameHelper';

export default class MoonCycle {
    public static currentMoonCyclePhase: Computed<MoonCyclePhase> = ko.pureComputed(() => {
        // [[Original Code]]
        const moonOrigin = (new Date('01/01/1970'));
        const moonToday = (new Date(Date.now()));
        moonToday.setHours(0);
	    moonToday.setMinutes(0);
	    moonToday.setSeconds(0);
        moonToday.setMilliseconds(0);
        const moonDif = (moonToday.getTime() + moonOrigin.getTime()) / DAY;
        const moonPhaseNow = (Math.floor(moonDif % 8));

        // [[Test B]]
        /*const moonOrigin = (new Date('01/01/1970'));
        const moonToday = (new Date(GameHelper.currentTime()));
        moonToday.setHours(0);
	    moonToday.setMinutes(0);
	    moonToday.setSeconds(0);
        moonToday.setMilliseconds(0);
        const moonDif = (moonToday.getTime() + moonOrigin.getTime()) / DAY;
        const moonPhaseNow = (Math.floor(moonDif % 8));*/

        // [[Test C]]
        //const moonPhaseNow = (Math.floor((GameHelper.currentTime().getTime() / DAY) % 8)); [[Test C]]

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
            new CurrentMoonPhase(MoonCyclePhase.NewMoon, '#221f3c', 'New Moon'),
        [MoonCyclePhase.WaxingCrescent]:
            new CurrentMoonPhase(MoonCyclePhase.WaxingCrescent, '#3b365e', 'Waxing Crescent Moon'),
        [MoonCyclePhase.FirstQuarter]:
            new CurrentMoonPhase(MoonCyclePhase.FirstQuarter, '#544e80', 'First Quarter Moon'),
        [MoonCyclePhase.WaxingGibbous]:
            new CurrentMoonPhase(MoonCyclePhase.WaxingGibbous, '#7e77af', 'Waxing Gibbous Moon'),
        [MoonCyclePhase.FullMoon]:
            new CurrentMoonPhase(MoonCyclePhase.FullMoon, '#9d97c7', 'Full Moon'),
        [MoonCyclePhase.WaningGibbous]:
            new CurrentMoonPhase(MoonCyclePhase.WaningGibbous, '#7e77af', 'Waning Gibbous Moon'),
        [MoonCyclePhase.ThirdQuarter]:
            new CurrentMoonPhase(MoonCyclePhase.ThirdQuarter, '#544e80', 'Third Quarter Moon'),
        [MoonCyclePhase.WaningCrescent]:
            new CurrentMoonPhase(MoonCyclePhase.WaningCrescent, '#3b365e', 'Waning Crescent Moon'),
    };
}
