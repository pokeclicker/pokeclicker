class TrainerEVList {

    /*
  Generates a list of all Pokémon that are on Dungeon Trainer teams, Gym Trainer teams, Berry Wanderers, (maybe more?)
  that are also not standard Dungeon encounters, Dungeon Boss encounters, or Route encounters
  */

  public static list = new Set();

  public static generateList() {

      const pList = new Set();
      const notIncluded = new Set();
      Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
          dungeon.enemyList.forEach(p => {
              if (p instanceof DungeonTrainer) {
                  p.team.forEach(x => {
                      pList.add(x.name);
                  });
              }
          });
      });
      Object.entries(GymList).forEach(([x, gym]) => {
          gym.pokemons.forEach(p => {
              pList.add(p.name);
          });
      });
      App.game.farming.berryData.forEach(x => {
          x.wander.forEach(wander => {
              pList.add(wander);
          });
      });
      //TODO: Shopmons?
      Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
          dungeon.allAvailablePokemon().forEach(p => {
              notIncluded.add(p);
          });
      });
      Routes.regionRoutes.forEach(x => {
          RouteHelper.getAvailablePokemonList(x.number,x.region, true).forEach(e => {
              notIncluded.add(e);
          });
      });

      const evListFiltered = new Set([...pList].filter((pokemon) => !notIncluded.has(pokemon)));
      //const evListSorted = evListFiltered.sort((a,b) => pokemonMap[a].id - pokemonMap[b].id);
      TrainerEVList.list = evListFiltered;
  }
}
