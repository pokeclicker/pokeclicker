class TrainerEVList {

    /*
  Generates a list of all Pokémon that are on Dungeon Trainer teams, Gym Trainer teams, Berry Wanderers, (maybe more?)
  that are also not standard Dungeon encounters, Dungeon Boss encounters, or Route encounters

  sorting: evListFiltered.sort((a,b) => pokemonMap[a].id - pokemonMap[b].id);
  */

  public static list = new Set();

  public static generateList() {

      const pList = new Set();
      const notIncluded = new Set();
      //Included
      Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => { //Dungeon Trainer Team
          dungeon.enemyList.forEach(p => {
              if (p instanceof DungeonTrainer) {
                  p.team.forEach(x => {
                      pList.add(x.name);
                  });
              }
          });
      });
      Object.entries(GymList).forEach(([x, gym]) => { //Gym Trainer Team
          gym.pokemons.forEach(p => {
              pList.add(p.name);
          });
      });
      App.game.farming.berryData.forEach(x => { //Wanderers
          x.wander.forEach(wander => {
              pList.add(wander);
          });
      });
      Object.entries(pokemonList).forEach(([number, pokemon]) => { //Evolution Items
          if ('evolutions' in pokemon) {
            pokemon.evolutions?.forEach(e => {
                if (e instanceof StoneEvolution) {
                    pList.add(e.basePokemon);
                }
            });
          }
      });
      Object.entries(GameConstants.PokemonItemType).forEach(([number, pokemon]) => { //Shopmons
          if (typeof(pokemon) != 'number') {
              pList.add(pokemon);
          }
      });
      Object.entries(GameConstants.PokemonToFossil).forEach(([pokemon, fossil]) => { //Fossils
          pList.add(pokemon);
      });
      Object.entries(RoamingPokemonList.list).forEach(([number, array]) => { //Roaming Pokémon
          Object.entries(array).forEach(([x, pokemon]) => {
              pokemon.forEach(p => {
                  pList.add(p.pokemonName);
              });
          });
      });
      pList.forEach(x => { //All Evolutions of included Pokémon
          const pokemon = pokemonList.find(p => p.name == x);
          if ('evolutions' in pokemon) {
            pokemon.evolutions?.forEach(e => {
                pList.add(pokemon.name);
                pList.add(e.evolvedPokemon);
            });
          }
      });
      //Not Included
      Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
          dungeon.allAvailablePokemon().forEach(p => {
              notIncluded.add(p);
          });
      });
      Routes.regionRoutes.forEach(x => {
          RouteHelper.getAvailablePokemonList(x.number,x.region, true, false).forEach(e => {
              notIncluded.add(e);
          });
      });

      const evListFiltered = new Set([...pList].filter((pokemon) => !notIncluded.has(pokemon)));
      TrainerEVList.list = evListFiltered;
  }
}
