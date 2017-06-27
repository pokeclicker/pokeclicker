class Battle {
    static enemyPokemon: battlePokemon;

    public static turn(){
        this.enemyPokemon.damage(Player.calculatePokemonAttack())
    }
    public static defeatPokemon(){
        Player.gainMoney(this.enemyPokemon.money);
    }

    public static generateNewEnemy(){

    }

    public static throwPokeball(){

    }

    public static catchPokemon(){

    }
}