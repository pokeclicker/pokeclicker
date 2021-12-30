interface IAbility{
    name: string;
    description: string;
}

interface IPassiveAbility extends IAbility {
    boostAmount: number;
    onEnter();
    onExit();
}

interface IActiveAbility extends IAbility {
    duration: number;
    onUse(duration);
}
class StatBoostingAbility implements IPassiveAbility {
    constructor(
        public name: string,
        public description: string,
        public boostAmount: number,
        public onEnter: () => void,
        public onExit: () => void
    ) {}
}
type Ability = StatBoostingAbility;
