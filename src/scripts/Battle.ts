class Battle {
    static enemyPokemon: battlePokemon;
    static counter:number = 0;

    public static tick() {
        this.counter = 0;
        this.pokemonAttack();
    }

    public static pokemonAttack(){
        this.enemyPokemon.damage(Player.calculatePokemonAttack())
        if(!this.enemyPokemon.isAlive()){
            this.defeatPokemon();
        }
    }


    public static clickAttack(){
        this.enemyPokemon.damage(Player.calculateClickAttack())
        if(!this.enemyPokemon.isAlive()){
            this.defeatPokemon();
        }
    }

    public static defeatPokemon(){
        Player.gainMoney(this.enemyPokemon.money);
        Player.gainExp(this.enemyPokemon.exp);

        let alreadyCaught:boolean = Player.alreadyCaughtPokemon(this.enemyPokemon.name);
        if (Player.whichBallToUse(alreadyCaught) !== GameConstants.Pokeball.None) {
            this.throwPokeball()
        }

        this.generateNewEnemy();
    }

    public static generateNewEnemy(){
        this.counter = 0;
        this.enemyPokemon = pokemonFactory.generateWildPokemon(Player.route, Player.region);
    }

    public static throwPokeball(){
        let chance:number = Math.floor(Math.random()*100+1);
        if(chance <= this.enemyPokemon.catchRate){
            this.catchPokemon();
        }
    }

    public static catchPokemon(){

    }
}