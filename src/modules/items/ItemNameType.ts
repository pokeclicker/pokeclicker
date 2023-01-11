/*
To update this type when adding new items:

Open the game, and run the following code in the browser console

copy(`type ItemNameType
    = ${[...new Set(Object.values(ItemList).map(i => i.name))].map(i => `'${i.replace(/'/g, "\\'")}'`).join('\n    | ')};`);

Replace the everything in this file (except for this comment) with what was copied
*/

export type ItemNameType
    = 'xAttack'
    | 'xClick'
    | 'Lucky_egg'
    | 'Token_collector'
    | 'Dowsing_machine'
    | 'Lucky_incense'
    | 'ChopleBerry'
    | 'KebiaBerry'
    | 'ShucaBerry'
    | 'ChartiBerry'
    | 'SmallRestore'
    | 'MediumRestore'
    | 'LargeRestore'
    | 'Dungeon_ticket'
    | 'Explorer_kit'
    | 'Squirtbottle'
    | 'Sprinklotad'
    | 'Explosive_Charge'
    | 'Treasure_Scanner'
    | 'Boost_Mulch'
    | 'Rich_Mulch'
    | 'Surprise_Mulch'
    | 'Amaze_Mulch'
    | 'Freeze_Mulch'
    | 'Pokeball'
    | 'Greatball'
    | 'Ultraball'
    | 'Masterball'
    | 'Fastball'
    | 'Quickball'
    | 'Timerball'
    | 'Duskball'
    | 'Luxuryball'
    | 'Diveball'
    | 'Lureball'
    | 'Nestball'
    | 'Repeatball'
    | 'Beastball'
    | 'Berry_Shovel'
    | 'Mulch_Shovel'
    | 'PokeBlock_Black'
    | 'PokeBlock_Red'
    | 'PokeBlock_Gold'
    | 'PokeBlock_Purple'
    | 'PokeBlock_Gray'
    | 'PokeBlock_White'
    | 'Fire_egg'
    | 'Water_egg'
    | 'Grass_egg'
    | 'Fighting_egg'
    | 'Electric_egg'
    | 'Dragon_egg'
    | 'Pokemon_egg'
    | 'Mystery_egg'
    | 'Leaf_stone'
    | 'Fire_stone'
    | 'Water_stone'
    | 'Thunder_stone'
    | 'Moon_stone'
    | 'Linking_cord'
    | 'Sun_stone'
    | 'Soothe_bell'
    | 'Metal_coat'
    | 'Kings_rock'
    | 'Upgrade'
    | 'Dragon_scale'
    | 'Prism_scale'
    | 'Deepsea_tooth'
    | 'Deepsea_scale'
    | 'Shiny_stone'
    | 'Dusk_stone'
    | 'Dawn_stone'
    | 'Razor_claw'
    | 'Razor_fang'
    | 'Electirizer'
    | 'Magmarizer'
    | 'Protector'
    | 'Dubious_disc'
    | 'Reaper_cloth'
    | 'Black_DNA'
    | 'White_DNA'
    | 'Sachet'
    | 'Whipped_dream'
    | 'Key_stone'
    | 'Ice_stone'
    | 'Solar_light'
    | 'Lunar_light'
    | 'Pure_light'
    | 'Sweet_apple'
    | 'Tart_apple'
    | 'Cracked_pot'
    | 'Galarica_cuff'
    | 'Galarica_wreath'
    | 'Black_mane_hair'
    | 'White_mane_hair'
    | 'FarmHandBailey'
    | 'FarmHandKerry'
    | 'FarmHandRiley'
    | 'FarmHandJamie'
    | 'Yellow_Flute'
    | 'Time_Flute'
    | 'Black_Flute'
    | 'Red_Flute'
    | 'White_Flute'
    | 'Blue_Flute'
    | 'HatcheryHelperJasmine'
    | 'HatcheryHelperDakota'
    | 'HatcheryHelperCameron'
    | 'HatcheryHelperCarey'
    | 'HatcheryHelperKris'
    | 'HatcheryHelperNoel'
    | 'Wonder_Chest'
    | 'Muscle_Band'
    | 'Light_Ball'
    | 'Quick_Powder'
    | 'Thick_Club'
    | 'Soul_Dew'
    | 'Adamant_Orb'
    | 'Lustrous_Orb'
    | 'Griseous_Orb'
    | 'Leek'
    | 'Rusted_Sword'
    | 'Rusted_Shield'
    | 'Black_Belt'
    | 'Black_Glasses'
    | 'Charcoal'
    | 'Dragon_Fang'
    | 'Magnet'
    | 'Miracle_Seed'
    | 'Mystic_Water'
    | 'Never_Melt_Ice'
    | 'Pink_Bow'
    | 'Poison_Barb'
    | 'Sharp_Beak'
    | 'Silk_Scarf'
    | 'Silver_Powder'
    | 'Soft_Sand'
    | 'Spell_Tag'
    | 'Twisted_Spoon'
    | 'Macho_Brace'
    | 'Pinkan Arbok'
    | 'Pinkan Oddish'
    | 'Pinkan Poliwhirl'
    | 'Pinkan Geodude'
    | 'Pinkan Dodrio'
    | 'Lickitung'
    | 'Pinkan Weezing'
    | 'Pinkan Scyther'
    | 'Mr. Mime'
    | 'Pinkan Electabuzz'
    | 'Jynx'
    | 'Magikarp'
    | 'Probably Feebas'
    | 'Eevee'
    | 'Porygon'
    | 'Togepi'
    | 'Beldum'
    | 'Skorupi'
    | 'Combee'
    | 'Burmy (Plant)'
    | 'Cherubi'
    | 'Spiritomb'
    | 'Zorua'
    | 'Meloetta (Pirouette)'
    | 'Furfrou (Debutante)'
    | 'Furfrou (Diamond)'
    | 'Furfrou (Matron)'
    | 'Furfrou (Dandy)'
    | 'Furfrou (Kabuki)'
    | 'Furfrou (Pharaoh)'
    | 'Furfrou (Star)'
    | 'Furfrou (La Reine)'
    | 'Type: Null'
    | 'Poipole'
    | 'Dracozolt'
    | 'Arctozolt'
    | 'Dracovish'
    | 'Arctovish'
    | 'Zarude (Dada)'
    | 'Staryu'
    | 'Igglybuff'
    | 'Shuckle'
    | 'Smoochum'
    | 'Ralts'
    | 'Swablu'
    | 'Drifloon'
    | 'Bronzor'
    | 'Riolu'
    | 'Rotom'
    | 'Munna'
    | 'Sigilyph'
    | 'Tornadus (Therian)'
    | 'Thundurus (Therian)'
    | 'Landorus (Therian)'
    | 'Protein'
    | 'Calcium'
    | 'Carbos'
    | 'Abomasite'
    | 'Alakazite'
    | 'Lopunnite'
    | 'Kangaskhanite'
    | 'Heracronite'
    | 'Garchompite';
