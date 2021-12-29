interface IAbility{
    name: string;
    description: string;
}

interface IPassiveAbility extends IAbility{

    apply();
    remove();


}

type IActiveAbility = IAbility

interface IBattlePartyPokemon {
    passiveAbility: IPassiveAbility;
    activeAbility: IActiveAbility;

}
