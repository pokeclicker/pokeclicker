/*
To update this enum open the game, and run the following code in the browser console:

const plist = [];
const availablePokemonList = [];
Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
     dungeon.enemyList.forEach(p => {
         if(p.team != undefined){
             p.team.forEach(x => {
                 plist.push(x.name);
             });
         }
     });
});
Object.entries(GymList).forEach(([dungeonName, gym]) => {
     gym.pokemons.forEach(p => {
         plist.push(p.name);
     })
});
App.game.farming.berryData.forEach(x => {
    x.wander.forEach(wander => {
        plist.push(wander);
    });
});
const evListSet = new Set(plist);

Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
     dungeon.allAvailablePokemon().forEach(p => {
        availablePokemonList.push(p);
     });
});
Routes.regionRoutes.forEach(x => {
   RouteHelper.getAvailablePokemonList(x.number,x.region, true).forEach(e => {
       availablePokemonList.push(e);
   });
});
availablePokemonSet = new Set(availablePokemonList);

evListUnfiltered = Array.from(evListSet);
availableList = Array.from(availablePokemonSet);

const evListFiltered = evListUnfiltered.filter(pokemon => !(availableList.includes(pokemon)));
copy(evListFiltered.sort((a,b) => pokemonMap[a].id - pokemonMap[b].id));

Replace everything in this file (except for this comment) with what was copied.

Change the type of `PokemonListData -> name` back to `PokemonNameType`.
Remove ` = string` from `export type PokemonNameType`.
*/

enum TrainerEVType {
    'Mega Gardevoir',
    'Bulbasaur',
    'Ivysaur',
    'Venusaur',
    'Gigantamax Venusaur',
    'Charmander',
    'Charmeleon',
    'Charizard',
    'Squirtle',
    'Wartortle',
    'Blastoise',
    'Gigantamax Blastoise',
    'Pidgeot',
    'Detective Pikachu',
    'Raichu',
    'Alolan Raichu',
    'Alolan Sandslash',
    'Ninetales',
    'Alolan Ninetales',
    'Wigglytuff',
    'Alolan Persian',
    'Arcanine',
    'Gigantamax Machamp',
    'Victreebel',
    'Golem',
    'Alolan Golem',
    'Galarian Slowbro',
    'Alolan Muk',
    'Gigantamax Gengar',
    'Gigantamax Lapras',
    'Jolteon',
    'Flareon',
    'Porygon',
    'Kabutops',
    'Aerodactyl',
    'Dragonair',
    'Mew',
    'Chikorita',
    'Cyndaquil',
    'Totodile',
    'Crobat',
    'Togetic',
    'Politoed',
    'Jumpluff',
    'Espeon',
    'Umbreon',
    'Slowking',
    'Galarian Slowking',
    'Scizor',
    'Kingdra',
    'Porygon2',
    'Hitmontop',
    'Treecko',
    'Torchic',
    'Mudkip',
    'Shedinja',
    'Delcatty',
    'Swalot',
    'Vibrava',
    'Lileep',
    'Cradily',
    'Anorith',
    'Armaldo',
    'Milotic',
    'Huntail',
    'Gorebyss',
    'Shelgon',
    'Salamence',
    'Jirachi',
    'Turtwig',
    'Torterra',
    'Chimchar',
    'Infernape',
    'Piplup',
    'Empoleon',
    'Staraptor',
    'Cranidos',
    'Rampardos',
    'Shieldon',
    'Bastiodon',
    'Mothim',
    'Cherrim (Overcast)',
    'Ambipom',
    'Mismagius',
    'Spiritomb',
    'Magnezone',
    'Magmortar',
    'Togekiss',
    'Yanmega',
    'Glaceon',
    'Gliscor',
    'Porygon-Z',
    'Probopass',
    'Manaphy',
    'Snivy',
    'Tepig',
    'Oshawott',
    'Musharna',
    'Zebstrika',
    'Leavanny',
    'Krookodile',
    'Darmanitan',
    'Galarian Darmanitan',
    'Cofagrigus',
    'Tirtouga',
    'Archen',
    'Archeops',
    'Gothitelle',
    'Swanna',
    'Sawsbuck (Spring)',
    'Escavalier',
    'Eelektross',
    'Lampent',
    'Chandelure',
    'Fraxure',
    'Accelgor',
    'Larvesta',
    'Chespin',
    'Fennekin',
    'Froakie',
    'Talonflame',
    'Vivillon (Meadow)',
    'Pyroar',
    'Flabébé (Yellow)',
    'Flabébé (Blue)',
    'Florges (Red)',
    'Florges (White)',
    'Gogoat',
    'Aegislash (Shield)',
    'Malamar',
    'Heliolisk',
    'Tyrunt',
    'Amaura',
    'Sylveon',
    'Goodra',
    'Rowlet',
    'Litten',
    'Popplio',
    'Toucannon',
    'Crabrawler',
    'Crabominable',
    "Oricorio (Pa'u)",
    'Palossand',
    'Grookey',
    'Scorbunny',
    'Sobble',
    'Inteleon',
    'Gigantamax Corviknight',
    'Gigantamax Drednaw',
    'Gigantamax Coalossal',
    'Arrokuda',
    'Gigantamax Centiskorch',
    'Gigantamax Hatterene',
    'Gigantamax Grimmsnarl',
    'Cursola',
    "Sirfetch'd",
    'Gigantamax Alcremie',
    'Morpeko (Hangry)',
    'Gigantamax Duraludon',
    'Dragapult',
    'Gigantamax Urshifu (Single Strike)',
    'Gigantamax Urshifu (Rapid Strike)',
}
export default TrainerEVType;
