/* eslint-disable arrow-body-style */
import { Computed } from 'knockout';
import CurrentMoonPhase from './CurrentMoonPhase';
import MoonCyclePhase from './MoonCyclePhase';
import { MoonCycleValues } from '../GameConstants';
import { DAY, MINUTE } from '../GameConstants';
import GameHelper from '../GameHelper';

export default class MoonCycle {
    public static currentMoonCyclePhase: Computed<MoonCyclePhase> = ko.pureComputed(() => {


        const date = GameHelper.currentTime();
        const dayCycle = Math.floor((date.getTime() - date.getTimezoneOffset() * MINUTE) / DAY);
        const moonPhaseLength = 1; // How many Days each Moon Phase lasts
        const moonPhase = Math.floor((dayCycle % (Object.entries(MoonCycleValues).length * moonPhaseLength)) / moonPhaseLength) ;

        return Number(Object.entries(MoonCycleValues).reverse().find(([, moonPhaseC]) => moonPhaseC == moonPhase)?.[0] ?? Object.keys(MoonCycleValues));
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

    public static catchChanceBonus(phase: MoonCyclePhase): number {
        return (4 - Math.abs((phase % 8) - 4)) * 5;
    }
}
