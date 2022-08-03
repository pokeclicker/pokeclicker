/*
To update this type when adding multiple new pokemon:

In 'PokemonList.ts', change the type of `PokemonListData -> name` to `string` and add your new pokemon.

Add ` = string` to `export type PokemonNameType` on this file.

Open the game, and run the following code in the browser console:

copy(`export type PokemonNameType
    = ${pokemonList.map(p => `'${p.name.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace everything in this file (except for this comment) with what was copied.

Change the type of `PokemonListData -> name` back to `PokemonNameType`.
Remove ` = string` from `export type PokemonNameType`.
*/

export type PokemonNameType
    = 'Bulbasaur'
    | 'Bulbasaur (Clone)'
    | 'Spooky Bulbasaur'
    | 'Bulbasaur (Rose)'
    | 'Ivysaur'
    | 'Ivysaur (Clone)'
    | 'Venusaur'
    | 'Venusaur (Clone)'
    | 'Gigantamax Venusaur'
    | 'Charmander'
    | 'Charmander (Clone)'
    | 'Charmeleon'
    | 'Charmeleon (Clone)'
    | 'Charizard'
    | 'Charizard (Clone)'
    | 'Gigantamax Charizard'
    | 'Squirtle'
    | 'Squirtle (Clone)'
    | 'Wartortle'
    | 'Wartortle (Clone)'
    | 'Blastoise'
    | 'Blastoise (Clone)'
    | 'Gigantamax Blastoise'
    | 'Caterpie'
    | 'Metapod'
    | 'Butterfree'
    | 'Gigantamax Butterfree'
    | 'Weedle'
    | 'Kakuna'
    | 'Beedrill'
    | 'Pidgey'
    | 'Pidgeotto'
    | 'Pidgeot'
    | 'Rattata'
    | 'Alolan Rattata'
    | 'Raticate'
    | 'Alolan Raticate'
    | 'Totem Raticate'
    | 'Spearow'
    | 'Red Spearow'
    | 'Fearow'
    | 'Ekans'
    | 'Arbok'
    | 'Pikachu'
    | 'Pikachu (Original Cap)'
    | 'Pikachu (Hoenn Cap)'
    | 'Pikachu (Sinnoh Cap)'
    | 'Pikachu (Unova Cap)'
    | 'Pikachu (Kalos Cap)'
    | 'Pikachu (Alola Cap)'
    | 'Pikachu (Partner Cap)'
    | 'Flying Pikachu'
    | 'Surfing Pikachu'
    | 'Pikachu (Gengar)'
    | 'Let\'s Go Pikachu'
    | 'Pikachu (World Cap)'
    | 'Gigantamax Pikachu'
    | 'Raichu'
    | 'Alolan Raichu'
    | 'Sandshrew'
    | 'Alolan Sandshrew'
    | 'Sandslash'
    | 'Alolan Sandslash'
    | 'Nidoran(F)'
    | 'Nidorina'
    | 'Nidoqueen'
    | 'Nidoran(M)'
    | 'Nidorino'
    | 'Nidoking'
    | 'Clefairy'
    | 'Clefable'
    | 'Vulpix'
    | 'Alolan Vulpix'
    | 'Ninetales'
    | 'Alolan Ninetales'
    | 'Jigglypuff'
    | 'Wigglytuff'
    | 'Zubat'
    | 'Golbat'
    | 'Oddish'
    | 'Gloom'
    | 'Vileplume'
    | 'Paras'
    | 'Parasect'
    | 'Venonat'
    | 'Venomoth'
    | 'Diglett'
    | 'Alolan Diglett'
    | 'Dugtrio'
    | 'Alolan Dugtrio'
    | 'Meowth'
    | 'Alolan Meowth'
    | 'Galarian Meowth'
    | 'Gigantamax Meowth'
    | 'Persian'
    | 'Alolan Persian'
    | 'Psyduck'
    | 'Golduck'
    | 'Mankey'
    | 'Primeape'
    | 'Growlithe'
    | 'Arcanine'
    | 'Poliwag'
    | 'Poliwhirl'
    | 'Poliwrath'
    | 'Abra'
    | 'Kadabra'
    | 'Alakazam'
    | 'Machop'
    | 'Machoke'
    | 'Machamp'
    | 'Gigantamax Machamp'
    | 'Bellsprout'
    | 'Weepinbell'
    | 'Victreebel'
    | 'Tentacool'
    | 'Tentacruel'
    | 'Geodude'
    | 'Alolan Geodude'
    | 'Graveler'
    | 'Alolan Graveler'
    | 'Golem'
    | 'Alolan Golem'
    | 'Ponyta'
    | 'Galarian Ponyta'
    | 'Rapidash'
    | 'Galarian Rapidash'
    | 'Slowpoke'
    | 'Galarian Slowpoke'
    | 'Slowbro'
    | 'Galarian Slowbro'
    | 'Magnemite'
    | 'Magneton'
    | 'Farfetch\'d'
    | 'Galarian Farfetch\'d'
    | 'Doduo'
    | 'Dodrio'
    | 'Seel'
    | 'Dewgong'
    | 'Grimer'
    | 'Alolan Grimer'
    | 'Muk'
    | 'Alolan Muk'
    | 'Shellder'
    | 'Cloyster'
    | 'Gastly'
    | 'Haunter'
    | 'Gengar'
    | 'Gigantamax Gengar'
    | 'Onix'
    | 'Drowzee'
    | 'Hypno'
    | 'Krabby'
    | 'Kingler'
    | 'Gigantamax Kingler'
    | 'Voltorb'
    | 'Electrode'
    | 'Exeggcute'
    | 'Exeggutor'
    | 'Alolan Exeggutor'
    | 'Cubone'
    | 'Marowak'
    | 'Alolan Marowak'
    | 'Totem Marowak'
    | 'Hitmonlee'
    | 'Hitmonchan'
    | 'Lickitung'
    | 'Koffing'
    | 'Weezing'
    | 'Galarian Weezing'
    | 'Rhyhorn'
    | 'Rhydon'
    | 'Chansey'
    | 'Tangela'
    | 'Kangaskhan'
    | 'Horsea'
    | 'Seadra'
    | 'Goldeen'
    | 'Seaking'
    | 'Staryu'
    | 'Starmie'
    | 'Mr. Mime'
    | 'Galarian Mr. Mime'
    | 'Scyther'
    | 'Jynx'
    | 'Electabuzz'
    | 'Magmar'
    | 'Pinsir'
    | 'Tauros'
    | 'Magikarp'
    | 'Gyarados'
    | 'Lapras'
    | 'Gigantamax Lapras'
    | 'Ditto'
    | 'Eevee'
    | 'Let\'s Go Eevee'
    | 'Gigantamax Eevee'
    | 'Vaporeon'
    | 'Jolteon'
    | 'Flareon'
    | 'Porygon'
    | 'Omanyte'
    | 'Omastar'
    | 'Kabuto'
    | 'Kabutops'
    | 'Aerodactyl'
    | 'Snorlax'
    | 'Santa Snorlax'
    | 'Gigantamax Snorlax'
    | 'Articuno'
    | 'Galarian Articuno'
    | 'Zapdos'
    | 'Galarian Zapdos'
    | 'Moltres'
    | 'Galarian Moltres'
    | 'Dratini'
    | 'Dragonair'
    | 'Dragonite'
    | 'Mewtwo'
    | 'Armored Mewtwo'
    | 'Mew'
    | 'Chikorita'
    | 'Bayleef'
    | 'Meganium'
    | 'Cyndaquil'
    | 'Quilava'
    | 'Typhlosion'
    | 'Totodile'
    | 'Croconaw'
    | 'Feraligatr'
    | 'Sentret'
    | 'Furret'
    | 'Hoothoot'
    | 'Noctowl'
    | 'Ledyba'
    | 'Ledian'
    | 'Spinarak'
    | 'Ariados'
    | 'Crobat'
    | 'Chinchou'
    | 'Lanturn'
    | 'Pichu'
    | 'Cleffa'
    | 'Igglybuff'
    | 'Togepi'
    | 'Spooky Togepi'
    | 'Surprise Togepi'
    | 'Togetic'
    | 'Natu'
    | 'Xatu'
    | 'Mareep'
    | 'Flaaffy'
    | 'Ampharos'
    | 'Bellossom'
    | 'Marill'
    | 'Azumarill'
    | 'Sudowoodo'
    | 'Politoed'
    | 'Hoppip'
    | 'Skiploom'
    | 'Jumpluff'
    | 'Aipom'
    | 'Sunkern'
    | 'Sunflora'
    | 'Yanma'
    | 'Wooper'
    | 'Quagsire'
    | 'Espeon'
    | 'Umbreon'
    | 'Murkrow'
    | 'Slowking'
    | 'Galarian Slowking'
    | 'Misdreavus'
    | 'Unown (A)'
    | 'Unown (B)'
    | 'Unown (C)'
    | 'Unown (D)'
    | 'Unown (E)'
    | 'Unown (F)'
    | 'Unown (G)'
    | 'Unown (H)'
    | 'Unown (I)'
    | 'Unown (J)'
    | 'Unown (K)'
    | 'Unown (L)'
    | 'Unown (M)'
    | 'Unown (N)'
    | 'Unown (O)'
    | 'Unown (P)'
    | 'Unown (Q)'
    | 'Unown (R)'
    | 'Unown (S)'
    | 'Unown (T)'
    | 'Unown (U)'
    | 'Unown (V)'
    | 'Unown (W)'
    | 'Unown (X)'
    | 'Unown (Y)'
    | 'Unown (Z)'
    | 'Unown (!)'
    | 'Unown (?)'
    | 'Wobbuffet'
    | 'Girafarig'
    | 'Pineco'
    | 'Forretress'
    | 'Dunsparce'
    | 'Gligar'
    | 'Steelix'
    | 'Snubbull'
    | 'Granbull'
    | 'Qwilfish'
    | 'Scizor'
    | 'Shuckle'
    | 'Heracross'
    | 'Sneasel'
    | 'Teddiursa'
    | 'Ursaring'
    | 'Slugma'
    | 'Magcargo'
    | 'Swinub'
    | 'Piloswine'
    | 'Corsola'
    | 'Galarian Corsola'
    | 'Remoraid'
    | 'Octillery'
    | 'Delibird'
    | 'Mantine'
    | 'Skarmory'
    | 'Houndour'
    | 'Houndoom'
    | 'Kingdra'
    | 'Phanpy'
    | 'Donphan'
    | 'Porygon2'
    | 'Stantler'
    | 'Smeargle'
    | 'Tyrogue'
    | 'Hitmontop'
    | 'Smoochum'
    | 'Elekid'
    | 'Magby'
    | 'Miltank'
    | 'Blissey'
    | 'Raikou'
    | 'Entei'
    | 'Suicune'
    | 'Larvitar'
    | 'Pupitar'
    | 'Tyranitar'
    | 'Lugia'
    | 'Ho-Oh'
    | 'Celebi'
    | 'Grinch Celebi'
    | 'Treecko'
    | 'Grovyle'
    | 'Sceptile'
    | 'Torchic'
    | 'Combusken'
    | 'Blaziken'
    | 'Mudkip'
    | 'Marshtomp'
    | 'Swampert'
    | 'Poochyena'
    | 'Mightyena'
    | 'Zigzagoon'
    | 'Galarian Zigzagoon'
    | 'Linoone'
    | 'Galarian Linoone'
    | 'Wurmple'
    | 'Silcoon'
    | 'Beautifly'
    | 'Cascoon'
    | 'Dustox'
    | 'Lotad'
    | 'Lombre'
    | 'Ludicolo'
    | 'Seedot'
    | 'Nuzleaf'
    | 'Shiftry'
    | 'Taillow'
    | 'Swellow'
    | 'Wingull'
    | 'Pelipper'
    | 'Ralts'
    | 'Kirlia'
    | 'Gardevoir'
    | 'Surskit'
    | 'Masquerain'
    | 'Shroomish'
    | 'Breloom'
    | 'Slakoth'
    | 'Vigoroth'
    | 'Slaking'
    | 'Nincada'
    | 'Ninjask'
    | 'Shedinja'
    | 'Whismur'
    | 'Loudred'
    | 'Exploud'
    | 'Makuhita'
    | 'Hariyama'
    | 'Azurill'
    | 'Nosepass'
    | 'Skitty'
    | 'Delcatty'
    | 'Sableye'
    | 'Mawile'
    | 'Aron'
    | 'Lairon'
    | 'Aggron'
    | 'Meditite'
    | 'Medicham'
    | 'Electrike'
    | 'Manectric'
    | 'Plusle'
    | 'Minun'
    | 'Volbeat'
    | 'Illumise'
    | 'Roselia'
    | 'Gulpin'
    | 'Swalot'
    | 'Carvanha'
    | 'Sharpedo'
    | 'Wailmer'
    | 'Wailord'
    | 'Numel'
    | 'Camerupt'
    | 'Torkoal'
    | 'Spoink'
    | 'Grumpig'
    | 'Spinda'
    | 'Trapinch'
    | 'Vibrava'
    | 'Flygon'
    | 'Cacnea'
    | 'Cacturne'
    | 'Swablu'
    | 'Altaria'
    | 'Zangoose'
    | 'Seviper'
    | 'Lunatone'
    | 'Solrock'
    | 'Barboach'
    | 'Whiscash'
    | 'Corphish'
    | 'Crawdaunt'
    | 'Baltoy'
    | 'Claydol'
    | 'Lileep'
    | 'Cradily'
    | 'Anorith'
    | 'Armaldo'
    | 'Feebas'
    | 'Milotic'
    | 'Castform'
    | 'Castform (Sunny)'
    | 'Castform (Rainy)'
    | 'Castform (Snowy)'
    | 'Kecleon'
    | 'Shuppet'
    | 'Banette'
    | 'Duskull'
    | 'Dusclops'
    | 'Tropius'
    | 'Chimecho'
    | 'Absol'
    | 'Wynaut'
    | 'Snorunt'
    | 'Glalie'
    | 'Spheal'
    | 'Sealeo'
    | 'Walrein'
    | 'Clamperl'
    | 'Huntail'
    | 'Gorebyss'
    | 'Relicanth'
    | 'Luvdisc'
    | 'Bagon'
    | 'Shelgon'
    | 'Salamence'
    | 'Beldum'
    | 'Metang'
    | 'Metagross'
    | 'Regirock'
    | 'Regice'
    | 'Registeel'
    | 'Latias'
    | 'Latios'
    | 'Kyogre'
    | 'Groudon'
    | 'Rayquaza'
    | 'Jirachi'
    | 'Deoxys'
    | 'Deoxys (Attack)'
    | 'Deoxys (Defense)'
    | 'Deoxys (Speed)'
    | 'Turtwig'
    | 'Grotle'
    | 'Torterra'
    | 'Chimchar'
    | 'Monferno'
    | 'Infernape'
    | 'Piplup'
    | 'Prinplup'
    | 'Empoleon'
    | 'Starly'
    | 'Staravia'
    | 'Staraptor'
    | 'Bidoof'
    | 'Bibarel'
    | 'Kricketot'
    | 'Kricketune'
    | 'Shinx'
    | 'Luxio'
    | 'Luxray'
    | 'Budew'
    | 'Roserade'
    | 'Cranidos'
    | 'Rampardos'
    | 'Shieldon'
    | 'Bastiodon'
    | 'Burmy (Plant)'
    | 'Burmy (Sand)'
    | 'Burmy (Trash)'
    | 'Wormadam (Plant)'
    | 'Wormadam (Sand)'
    | 'Wormadam (Trash)'
    | 'Mothim'
    | 'Combee'
    | 'Vespiquen'
    | 'Pachirisu'
    | 'Buizel'
    | 'Floatzel'
    | 'Cherubi'
    | 'Cherrim (Overcast)'
    | 'Cherrim (Sunshine)'
    | 'Shellos (West)'
    | 'Shellos (East)'
    | 'Gastrodon (West)'
    | 'Gastrodon (East)'
    | 'Ambipom'
    | 'Drifloon'
    | 'Drifblim'
    | 'Buneary'
    | 'Lopunny'
    | 'Mismagius'
    | 'Honchkrow'
    | 'Glameow'
    | 'Purugly'
    | 'Chingling'
    | 'Stunky'
    | 'Skuntank'
    | 'Bronzor'
    | 'Bronzong'
    | 'Bonsly'
    | 'Mime Jr.'
    | 'Happiny'
    | 'Chatot'
    | 'Spiritomb'
    | 'Gible'
    | 'Gabite'
    | 'Garchomp'
    | 'Munchlax'
    | 'Elf Munchlax'
    | 'Riolu'
    | 'Lucario'
    | 'Hippopotas'
    | 'Hippowdon'
    | 'Skorupi'
    | 'Drapion'
    | 'Croagunk'
    | 'Toxicroak'
    | 'Carnivine'
    | 'Finneon'
    | 'Lumineon'
    | 'Mantyke'
    | 'Snover'
    | 'Abomasnow'
    | 'Weavile'
    | 'Magnezone'
    | 'Lickilicky'
    | 'Rhyperior'
    | 'Tangrowth'
    | 'Electivire'
    | 'Magmortar'
    | 'Togekiss'
    | 'Yanmega'
    | 'Leafeon'
    | 'Glaceon'
    | 'Gliscor'
    | 'Mamoswine'
    | 'Porygon-Z'
    | 'Gallade'
    | 'Probopass'
    | 'Dusknoir'
    | 'Froslass'
    | 'Rotom'
    | 'Rotom (Heat)'
    | 'Rotom (Wash)'
    | 'Rotom (Frost)'
    | 'Rotom (Fan)'
    | 'Rotom (Mow)'
    | 'Rotom (Discord)'
    | 'Uxie'
    | 'Mesprit'
    | 'Azelf'
    | 'Dialga'
    | 'Palkia'
    | 'Heatran'
    | 'Regigigas'
    | 'Giratina (Altered)'
    | 'Giratina (Origin)'
    | 'Cresselia'
    | 'Phione'
    | 'Manaphy'
    | 'Darkrai'
    | 'Shaymin (Land)'
    | 'Shaymin (Sky)'
    | 'Arceus (Normal)'
    | 'Arceus (Fire)'
    | 'Arceus (Water)'
    | 'Arceus (Electric)'
    | 'Arceus (Grass)'
    | 'Arceus (Ice)'
    | 'Arceus (Fighting)'
    | 'Arceus (Poison)'
    | 'Arceus (Ground)'
    | 'Arceus (Flying)'
    | 'Arceus (Psychic)'
    | 'Arceus (Bug)'
    | 'Arceus (Rock)'
    | 'Arceus (Ghost)'
    | 'Arceus (Dragon)'
    | 'Arceus (Dark)'
    | 'Arceus (Steel)'
    | 'Arceus (Fairy)'
    | 'Victini'
    | 'Snivy'
    | 'Servine'
    | 'Serperior'
    | 'Tepig'
    | 'Pignite'
    | 'Emboar'
    | 'Oshawott'
    | 'Dewott'
    | 'Samurott'
    | 'Patrat'
    | 'Watchog'
    | 'Lillipup'
    | 'Herdier'
    | 'Stoutland'
    | 'Purrloin'
    | 'Liepard'
    | 'Pansage'
    | 'Simisage'
    | 'Pansear'
    | 'Simisear'
    | 'Panpour'
    | 'Simipour'
    | 'Munna'
    | 'Musharna'
    | 'Pidove'
    | 'Tranquill'
    | 'Unfezant'
    | 'Blitzle'
    | 'Zebstrika'
    | 'Roggenrola'
    | 'Boldore'
    | 'Gigalith'
    | 'Woobat'
    | 'Swoobat'
    | 'Drilbur'
    | 'Excadrill'
    | 'Audino'
    | 'Timburr'
    | 'Gurdurr'
    | 'Conkeldurr'
    | 'Tympole'
    | 'Palpitoad'
    | 'Seismitoad'
    | 'Throh'
    | 'Sawk'
    | 'Sewaddle'
    | 'Swadloon'
    | 'Leavanny'
    | 'Venipede'
    | 'Whirlipede'
    | 'Scolipede'
    | 'Cottonee'
    | 'Whimsicott'
    | 'Petilil'
    | 'Lilligant'
    | 'Basculin (Red-Striped)'
    | 'Basculin (Blue-Striped)'
    | 'Sandile'
    | 'Krokorok'
    | 'Krookodile'
    | 'Darumaka'
    | 'Galarian Darumaka'
    | 'Darmanitan'
    | 'Darmanitan (Zen)'
    | 'Galarian Darmanitan'
    | 'Galarian Darmanitan (Zen)'
    | 'Maractus'
    | 'Dwebble'
    | 'Crustle'
    | 'Scraggy'
    | 'Scrafty'
    | 'Sigilyph'
    | 'Yamask'
    | 'Galarian Yamask'
    | 'Cofagrigus'
    | 'Tirtouga'
    | 'Carracosta'
    | 'Archen'
    | 'Archeops'
    | 'Trubbish'
    | 'Garbodor'
    | 'Gigantamax Garbodor'
    | 'Zorua'
    | 'Zoroark'
    | 'Minccino'
    | 'Cinccino'
    | 'Gothita'
    | 'Gothorita'
    | 'Gothitelle'
    | 'Solosis'
    | 'Duosion'
    | 'Reuniclus'
    | 'Ducklett'
    | 'Swanna'
    | 'Vanillite'
    | 'Vanillish'
    | 'Vanilluxe'
    | 'Deerling (Spring)'
    | 'Deerling (Summer)'
    | 'Deerling (Autumn)'
    | 'Deerling (Winter)'
    | 'Sawsbuck (Spring)'
    | 'Sawsbuck (Summer)'
    | 'Sawsbuck (Autumn)'
    | 'Sawsbuck (Winter)'
    | 'Emolga'
    | 'Karrablast'
    | 'Escavalier'
    | 'Foongus'
    | 'Amoonguss'
    | 'Frillish'
    | 'Jellicent'
    | 'Alomomola'
    | 'Joltik'
    | 'Galvantula'
    | 'Ferroseed'
    | 'Ferrothorn'
    | 'Klink'
    | 'Klang'
    | 'Klinklang'
    | 'Tynamo'
    | 'Eelektrik'
    | 'Eelektross'
    | 'Elgyem'
    | 'Beheeyem'
    | 'Litwick'
    | 'Lampent'
    | 'Chandelure'
    | 'Axew'
    | 'Fraxure'
    | 'Haxorus'
    | 'Cubchoo'
    | 'Beartic'
    | 'Cryogonal'
    | 'Shelmet'
    | 'Accelgor'
    | 'Stunfisk'
    | 'Galarian Stunfisk'
    | 'Mienfoo'
    | 'Mienshao'
    | 'Druddigon'
    | 'Golett'
    | 'Golurk'
    | 'Pawniard'
    | 'Bisharp'
    | 'Bouffalant'
    | 'Rufflet'
    | 'Braviary'
    | 'Vullaby'
    | 'Mandibuzz'
    | 'Heatmor'
    | 'Durant'
    | 'Deino'
    | 'Zweilous'
    | 'Hydreigon'
    | 'Larvesta'
    | 'Volcarona'
    | 'Cobalion'
    | 'Terrakion'
    | 'Virizion'
    | 'Tornadus'
    | 'Tornadus (Therian)'
    | 'Thundurus'
    | 'Thundurus (Therian)'
    | 'Reshiram'
    | 'Zekrom'
    | 'Landorus'
    | 'Landorus (Therian)'
    | 'Kyurem'
    | 'Kyurem (White)'
    | 'Kyurem (Black)'
    | 'Keldeo'
    | 'Keldeo (Resolute)'
    | 'Meloetta (Aria)'
    | 'Meloetta (Pirouette)'
    | 'Genesect'
    | 'Chespin'
    | 'Quilladin'
    | 'Chesnaught'
    | 'Fennekin'
    | 'Braixen'
    | 'Delphox'
    | 'Froakie'
    | 'Frogadier'
    | 'Greninja'
    | 'Ash-Greninja'
    | 'Bunnelby'
    | 'Diggersby'
    | 'Fletchling'
    | 'Fletchinder'
    | 'Talonflame'
    | 'Scatterbug'
    | 'Spewpa'
    | 'Vivillon (Meadow)'
    | 'Vivillon (Poké Ball)'
    | 'Vivillon (Polar)'
    | 'Vivillon (Tundra)'
    | 'Vivillon (Continental)'
    | 'Vivillon (Garden)'
    | 'Vivillon (Elegant)'
    | 'Vivillon (Icy Snow)'
    | 'Vivillon (Modern)'
    | 'Vivillon (Marine)'
    | 'Vivillon (Archipelago)'
    | 'Vivillon (High Plains)'
    | 'Vivillon (Sandstorm)'
    | 'Vivillon (River)'
    | 'Vivillon (Monsoon)'
    | 'Vivillon (Savanna)'
    | 'Vivillon (Sun)'
    | 'Vivillon (Ocean)'
    | 'Vivillon (Jungle)'
    | 'Vivillon (Fancy)'
    | 'Litleo'
    | 'Pyroar'
    | 'Flabébé (Red)'
    | 'Flabébé (Yellow)'
    | 'Flabébé (Blue)'
    | 'Flabébé (Orange)'
    | 'Flabébé (White)'
    | 'Floette (Red)'
    | 'Floette (Yellow)'
    | 'Floette (Blue)'
    | 'Floette (Orange)'
    | 'Floette (White)'
    | 'Floette (Eternal)'
    | 'Florges (Red)'
    | 'Florges (Yellow)'
    | 'Florges (Blue)'
    | 'Florges (Orange)'
    | 'Florges (White)'
    | 'Skiddo'
    | 'Gogoat'
    | 'Pancham'
    | 'Pangoro'
    | 'Furfrou'
    | 'Furfrou (Heart)'
    | 'Furfrou (Star)'
    | 'Furfrou (Diamond)'
    | 'Furfrou (Debutante)'
    | 'Furfrou (Matron)'
    | 'Furfrou (Dandy)'
    | 'Furfrou (La Reine)'
    | 'Furfrou (Kabuki)'
    | 'Furfrou (Pharaoh)'
    | 'Espurr'
    | 'Meowstic'
    | 'Honedge'
    | 'Doublade'
    | 'Aegislash'
    | 'Spritzee'
    | 'Aromatisse'
    | 'Swirlix'
    | 'Slurpuff'
    | 'Inkay'
    | 'Malamar'
    | 'Binacle'
    | 'Barbaracle'
    | 'Skrelp'
    | 'Dragalge'
    | 'Clauncher'
    | 'Clawitzer'
    | 'Helioptile'
    | 'Heliolisk'
    | 'Tyrunt'
    | 'Tyrantrum'
    | 'Amaura'
    | 'Aurorus'
    | 'Sylveon'
    | 'Hawlucha'
    | 'Dedenne'
    | 'Carbink'
    | 'Goomy'
    | 'Sliggoo'
    | 'Goodra'
    | 'Klefki'
    | 'Phantump'
    | 'Trevenant'
    | 'Pumpkaboo'
    | 'Gourgeist'
    | 'Bergmite'
    | 'Avalugg'
    | 'Noibat'
    | 'Noivern'
    | 'Xerneas'
    | 'Yveltal'
    | 'Zygarde'
    | 'Diancie'
    | 'Hoopa'
    | 'Volcanion'
    | 'Rowlet'
    | 'Dartrix'
    | 'Decidueye'
    | 'Litten'
    | 'Torracat'
    | 'Incineroar'
    | 'Popplio'
    | 'Brionne'
    | 'Primarina'
    | 'Pikipek'
    | 'Trumbeak'
    | 'Toucannon'
    | 'Yungoos'
    | 'Gumshoos'
    | 'Totem Gumshoos'
    | 'Grubbin'
    | 'Charjabug'
    | 'Vikavolt'
    | 'Totem Vikavolt'
    | 'Crabrawler'
    | 'Crabominable'
    | 'Oricorio (Baile)'
    | 'Oricorio (Pom-Pom)'
    | 'Oricorio (Pa\'u)'
    | 'Oricorio (Sensu)'
    | 'Cutiefly'
    | 'Ribombee'
    | 'Totem Ribombee'
    | 'Rockruff'
    | 'Lycanroc (Midday)'
    | 'Lycanroc (Midnight)'
    | 'Lycanroc (Dusk)'
    | 'Wishiwashi (Solo)'
    | 'Wishiwashi (School)'
    | 'Totem Wishiwashi'
    | 'Mareanie'
    | 'Toxapex'
    | 'Mudbray'
    | 'Mudsdale'
    | 'Dewpider'
    | 'Araquanid'
    | 'Totem Araquanid'
    | 'Fomantis'
    | 'Lurantis'
    | 'Totem Lurantis'
    | 'Morelull'
    | 'Shiinotic'
    | 'Salandit'
    | 'Salazzle'
    | 'Totem Salazzle'
    | 'Stufful'
    | 'Bewear'
    | 'Bounsweet'
    | 'Steenee'
    | 'Tsareena'
    | 'Comfey'
    | 'Oranguru'
    | 'Passimian'
    | 'Wimpod'
    | 'Golisopod'
    | 'Sandygast'
    | 'Palossand'
    | 'Pyukumuku'
    | 'Type: Null'
    | 'Silvally'
    | 'Minior (Meteor)'
    | 'Minior (Blue Core)'
    | 'Minior (Green Core)'
    | 'Minior (Indigo Core)'
    | 'Minior (Orange Core)'
    | 'Minior (Red Core)'
    | 'Minior (Violet Core)'
    | 'Minior (Yellow Core)'
    | 'Komala'
    | 'Turtonator'
    | 'Togedemaru'
    | 'Totem Togedemaru'
    | 'Mimikyu'
    | 'Totem Mimikyu'
    | 'Bruxish'
    | 'Drampa'
    | 'Dhelmise'
    | 'Jangmo-o'
    | 'Hakamo-o'
    | 'Kommo-o'
    | 'Totem Kommo-o'
    | 'Tapu Koko'
    | 'Tapu Lele'
    | 'Tapu Bulu'
    | 'Tapu Fini'
    | 'Cosmog'
    | 'Cosmoem'
    | 'Solgaleo'
    | 'Lunala'
    | 'Nihilego'
    | 'Buzzwole'
    | 'Pheromosa'
    | 'Xurkitree'
    | 'Celesteela'
    | 'Kartana'
    | 'Guzzlord'
    | 'Necrozma'
    | 'Necrozma (Dusk Mane)'
    | 'Necrozma (Dawn Wings)'
    | 'Necrozma (Ultra)'
    | 'Magearna'
    | 'Magearna (Original Color)'
    | 'Marshadow'
    | 'Poipole'
    | 'Naganadel'
    | 'Stakataka'
    | 'Blacephalon'
    | 'Zeraora'
    | 'Meltan'
    | 'Melmetal'
    | 'Gigantamax Melmetal'
    | 'Grookey'
    | 'Thwackey'
    | 'Rillaboom'
    | 'Gigantamax Rillaboom'
    | 'Scorbunny'
    | 'Raboot'
    | 'Cinderace'
    | 'Gigantamax Cinderace'
    | 'Sobble'
    | 'Drizzile'
    | 'Inteleon'
    | 'Gigantamax Inteleon'
    | 'Skwovet'
    | 'Greedent'
    | 'Rookidee'
    | 'Corvisquire'
    | 'Corviknight'
    | 'Gigantamax Corviknight'
    | 'Blipbug'
    | 'Dottler'
    | 'Orbeetle'
    | 'Gigantamax Orbeetle'
    | 'Nickit'
    | 'Thievul'
    | 'Gossifleur'
    | 'Eldegoss'
    | 'Wooloo'
    | 'Dubwool'
    | 'Chewtle'
    | 'Drednaw'
    | 'Gigantamax Drednaw'
    | 'Yamper'
    | 'Boltund'
    | 'Rolycoly'
    | 'Carkol'
    | 'Coalossal'
    | 'Gigantamax Coalossal'
    | 'Applin'
    | 'Flapple'
    | 'Gigantamax Flapple'
    | 'Appletun'
    | 'Gigantamax Appletun'
    | 'Silicobra'
    | 'Sandaconda'
    | 'Gigantamax Sandaconda'
    | 'Cramorant'
    | 'Cramorant (Gulping)'
    | 'Cramorant (Gorging)'
    | 'Arrokuda'
    | 'Barraskewda'
    | 'Toxel'
    | 'Toxtricity (Amped)'
    | 'Toxtricity (Low Key)'
    | 'Gigantamax Toxtricity'
    | 'Sizzlipede'
    | 'Centiskorch'
    | 'Gigantamax Centiskorch'
    | 'Clobbopus'
    | 'Grapploct'
    | 'Sinistea'
    | 'Polteageist'
    | 'Hatenna'
    | 'Hattrem'
    | 'Hatterene'
    | 'Gigantamax Hatterene'
    | 'Impidimp'
    | 'Morgrem'
    | 'Grimmsnarl'
    | 'Gigantamax Grimmsnarl'
    | 'Obstagoon'
    | 'Perrserker'
    | 'Cursola'
    | 'Sirfetch\'d'
    | 'Mr. Rime'
    | 'Runerigus'
    | 'Milcery'
    | 'Alcremie (Strawberry Vanilla)'
    | 'Alcremie (Strawberry Lemon)'
    | 'Alcremie (Strawberry Mint)'
    | 'Alcremie (Strawberry Matcha)'
    | 'Alcremie (Strawberry Ruby Cream)'
    | 'Alcremie (Strawberry Caramel)'
    | 'Alcremie (Strawberry Rainbow)'
    | 'Alcremie (Strawberry Ruby Swirl)'
    | 'Alcremie (Strawberry Salted)'
    | 'Alcremie (Berry Vanilla)'
    | 'Alcremie (Berry Lemon)'
    | 'Alcremie (Berry Mint)'
    | 'Alcremie (Berry Matcha)'
    | 'Alcremie (Berry Ruby Cream)'
    | 'Alcremie (Berry Caramel)'
    | 'Alcremie (Berry Rainbow)'
    | 'Alcremie (Berry Ruby Swirl)'
    | 'Alcremie (Berry Salted)'
    | 'Alcremie (Love Vanilla)'
    | 'Alcremie (Love Lemon)'
    | 'Alcremie (Love Mint)'
    | 'Alcremie (Love Matcha)'
    | 'Alcremie (Love Ruby Cream)'
    | 'Alcremie (Love Caramel)'
    | 'Alcremie (Love Rainbow)'
    | 'Alcremie (Love Ruby Swirl)'
    | 'Alcremie (Love Salted)'
    | 'Alcremie (Star Vanilla)'
    | 'Alcremie (Star Lemon)'
    | 'Alcremie (Star Mint)'
    | 'Alcremie (Star Matcha)'
    | 'Alcremie (Star Ruby Cream)'
    | 'Alcremie (Star Caramel)'
    | 'Alcremie (Star Rainbow)'
    | 'Alcremie (Star Ruby Swirl)'
    | 'Alcremie (Star Salted)'
    | 'Alcremie (Clover Vanilla)'
    | 'Alcremie (Clover Lemon)'
    | 'Alcremie (Clover Mint)'
    | 'Alcremie (Clover Matcha)'
    | 'Alcremie (Clover Ruby Cream)'
    | 'Alcremie (Clover Caramel)'
    | 'Alcremie (Clover Rainbow)'
    | 'Alcremie (Clover Ruby Swirl)'
    | 'Alcremie (Clover Salted)'
    | 'Alcremie (Flower Vanilla)'
    | 'Alcremie (Flower Lemon)'
    | 'Alcremie (Flower Mint)'
    | 'Alcremie (Flower Matcha)'
    | 'Alcremie (Flower Ruby Cream)'
    | 'Alcremie (Flower Caramel)'
    | 'Alcremie (Flower Rainbow)'
    | 'Alcremie (Flower Ruby Swirl)'
    | 'Alcremie (Flower Salted)'
    | 'Alcremie (Ribbon Vanilla)'
    | 'Alcremie (Ribbon Lemon)'
    | 'Alcremie (Ribbon Mint)'
    | 'Alcremie (Ribbon Matcha)'
    | 'Alcremie (Ribbon Ruby Cream)'
    | 'Alcremie (Ribbon Caramel)'
    | 'Alcremie (Ribbon Rainbow)'
    | 'Alcremie (Ribbon Ruby Swirl)'
    | 'Alcremie (Ribbon Salted)'
    | 'Gigantamax Alcremie'
    | 'Falinks'
    | 'Pincurchin'
    | 'Snom'
    | 'Frosmoth'
    | 'Stonjourner'
    | 'Eiscue (Ice Face)'
    | 'Eiscue (No Ice Face)'
    | 'Indeedee (Male)'
    | 'Indeedee (Female)'
    | 'Morpeko'
    | 'Morpeko (Hangry)'
    | 'Cufant'
    | 'Copperajah'
    | 'Gigantamax Copperajah'
    | 'Dracozolt'
    | 'Arctozolt'
    | 'Dracovish'
    | 'Arctovish'
    | 'Duraludon'
    | 'Gigantamax Duraludon'
    | 'Dreepy'
    | 'Drakloak'
    | 'Dragapult'
    | 'Zacian (Battle Hero)'
    | 'Zacian (Crowned Sword)'
    | 'Zamazenta (Battle Hero)'
    | 'Zamazenta (Crowned Shield)'
    | 'Eternatus'
    | 'Eternamax Eternatus'
    | 'Kubfu'
    | 'Urshifu (Single Strike)'
    | 'Urshifu (Rapid Strike)'
    | 'Gigantamax Urshifu (Single Strike)'
    | 'Gigantamax Urshifu (Rapid Strike)'
    | 'Zarude'
    | 'Regieleki'
    | 'Regidrago'
    | 'Glastrier'
    | 'Spectrier'
    | 'Calyrex'
    | 'Ice Rider Calyrex'
    | 'Shadow Rider Calyrex'
    | 'MissingNo.'
    | 'Mega Venusaur'
    | 'Mega Charizard X'
    | 'Mega Gyarados'
    | 'Mega Gardevoir'
    | 'Mega Rayquaza'
    | '???';
