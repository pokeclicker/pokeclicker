import Profile from './profile/Profile';
import SeededRand from './utilities/SeededRand';

type Credit = {
    name: string,
    link?: string,
    image?: string,
    resources: Array<string | number>,
};

// Sort alphabetically
export const SpriteCredits: Credit[] = [
    {
        name: 'Akuma-Tsubasa',
        link: 'https://www.deviantart.com/akuma-tsubasa',
        image: 'https://a.deviantart.net/avatars-big/a/k/akuma-tsubasa.png?13',
        resources: [
            'Angol',
            'Cail',
            'Cipher Peon (male and female)',
            'Cipher Peon XD (male and female)',
            'Dakim',
            'Ein',
            'Gonzap',
            'Nascour',
            'Venus',
        ],
        // Notes: Akuma-Tsubasa is the creator, LightningKillua15 is the owner allowing use if the creator is credited.
    },
    {
        name: 'Anarlaurendil',
        link: 'https://www.deviantart.com/anarlaurendil',
        image: 'https://a.deviantart.net/avatars-big/a/n/anarlaurendil.png',
        resources: [
            'Dynamic Background Wyrdeer',
        ],
        // Notes: Allowed use with credit
    },
    {
        name: 'arduousFrivolity',
        link: 'https://discordapp.com/users/200069836724764673/',
        resources: [
            'Pinkan Scyther',
            'Sealed Chamber Braille',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'AutumnSpire',
        link: 'https://www.deviantart.com/autumnspire',
        image: 'https://a.deviantart.net/avatars-big/a/u/autumnspire.png',
        resources: [
            'Team Aqua Grunt Revamps',
        ],
        // Notes: Allowed use with credit.
    },
    {
        name: 'aveontrainer',
        link: 'https://www.deviantart.com/aveontrainer',
        image: 'https://a.deviantart.net/avatars-big/a/v/aveontrainer.png',
        resources: [
            'Overworld Klara',
            'Overworld Avery',
            'Trevor',
        ],
        // Notes: Gives credit on image page if asked.
    },
    {
        name: 'B1ackZer0',
        link: 'https://discordapp.com/users/346730382009565196',
        image: 'assets/images/profile/trainer-111.png',
        resources: [
            'Shiny Alcremie',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Beliot419',
        link: 'https://www.deviantart.com/beliot419',
        image: 'https://a.deviantart.net/avatars-big/b/e/beliot419.png',
        resources: [
            'Acerola',
            'Aether Branch Chief Faba',
            'Aether Foundation Employee (female)',
            'Aether Foundation Employee (male)',
            'Aether President Lusamine',
            'Gladion',
            'Hala',
            'Hapu',
            'Hau',
            'Ilima',
            'Kahili',
            'Kiawe',
            'Lana',
            'Mallow',
            'Masked Royal',
            'Mina',
            'Molayne',
            'Nanu',
            'Olivia',
            'Plumeria',
            'Professor Kukui',
            'Rising Star (male)',
            'Ryuki',
            'Sightseer (female)',
            'Sophocles',
            'Teacher (Gen 7)',
            'Team Skull Boss (guzma)',
            'Wicke',
            'Youth Athlete (female)',
        ],
        // Notes: Found in spritesheet description: "Feel free to use them, just give me credit."
    },
    {
        name: 'Brumirage, Altthiel, Pujolly, Irpachuza',
        link: 'https://www.smogon.com/forums/threads/revamped-add-sword-and-shield-trainer-avatars-for-everyone.3672829/',
        image: 'https://www.smogon.com/forums/media/zracknel-beta.svg.m.1',
        resources: [
            'Adaman',
            'AI Sada',
            'AI Turo',
            'Akari',
            'Allister',
            'Arezu',
            'Avery',
            'Bea',
            'Bede',
            'Calaba',
            'Cogita',
            'Gym Leader Bede',
            'Gordie',
            'Hop',
            'Irida',
            'Kabu',
            'Klara',
            'Leon',
            'Lian',
            'Lisia',
            'Mai',
            'Marnie',
            'Master Dojo Student',
            'Melony',
            'Milo',
            'Mustard',
            'Nessa',
            'Oleana',
            'Opal',
            'Peony',
            'Piers',
            'Professor Magnolia',
            'Professor Sonia',
            'Raihan',
            'Rose',
            'Sabi',
            'Shielbert',
            'Sonia',
            'Sordward',
            'Team Yell Grunts',
            'Volo',
        ],
        // NOTES: No notes about credit, but is made for public use. Unclear who made what, so credited together
    },
    {
        name: 'CGMetalDragon',
        link: 'https://www.deviantart.com/cgmetaldragon',
        image: 'https://a.deviantart.net/avatars-big/c/g/cgmetaldragon.png',
        resources: [
            'Contest Champion (Johanna)',
        ],
        // Notes: No notes about credit, have messaged asking for permission, awaiting confirmation
    },
    {
        name: 'CorgiOnNeptune',
        link: 'https://linktr.ee/CorgiOnNeptune',
        resources: [
            'Recolours of Duncapham\'s sprite revamps',
            'Dynamic BG Shiny Meltan/Melmetal',
            'Rainbow Rocket sprite re-colours',
            'Sounds:',
            ' - Wandering encounter',
            ' - Roaming encounter',
            ' - Battle Frontier',
            ' - Empty Queue',
            ' - Dream Orbs',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Croak',
        link: 'https://discordapp.com/users/206839451069054976/',
        resources: [
            'Plasma Frigate overworld sprite',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Cthulhu Follower',
        link: 'https://discordapp.com/users/303604152733270017/',
        resources: [
            'Higher quality Underground stones',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'DaleArwin',
        link: 'https://www.deviantart.com/dalearwin',
        resources: [
            'Aether Foundation Employee (masked)',
            'Brains & Brawn',
            'Dancer (female)',
            'Golfer',
            'Surfer',
            'Team Flare Grunts',
            'Wonder Chest',
        ],
        // Notes: DaleArwin aka IanWalder, a GitHub contributor to this project, gives his permission
    },
    {
        name: 'DapperDwarf',
        link: 'https://discordapp.com/users/385866382593622018/',
        resources: [
            'Pokerus Resistant Icon (colorblind friendly)',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'DarkusShadow',
        link: 'https://www.deviantart.com/darkusshadow',
        image: 'https://a.deviantart.net/avatars-big/d/a/darkusshadow.jpg',
        resources: [
            'Dynamic Background Kleavor',
            'Dynamic Background Ursaluna',
            'Dynamic Background Sneasler',
            'Dynamic Background Overqwil',
            'Dynamic Background Enamorus',
        ],
        // Notes: Allowed use with credit
    },
    {
        name: 'Data',
        link: 'https://discordapp.com/users/240607391807307777/',
        resources: [
            'Pokerus Virus key item sprite',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'DommyThicc',
        link: 'https://discordapp.com/users/519860373890007050/',
        resources: [
            'Chobin',
            'Cipher Admin Ardos',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'DraKay',
        link: 'https://discordapp.com/users/272336444297707521/',
        image: 'assets/images/profile/trainer-121.png',
        resources: [
            'Alcremie sweets big icons',
            'Arctovish shop image',
            'Arctozolt shop image',
            'Argus Steel',
            'Ash\'s Butterfree',
            'Bill\'s Grandpa with Eevee',
            'Bill\'s Grandpa without Eevee',
            'Black Augurite',
            'Black mane hair big icon',
            'Blimp base',
            'Butler',
            'Camp map sprite',
            'Cipher Admin Lovrina',
            'Cipher Commander Exol',
            'Cipher Peon Yellosix',
            'Charitative chansey shuffle',
            'Client Island town image',
            'Clouds',
            'Clown Jessie & James',
            'Cosplay Pikachu Shuffle Icons',
            'Cracked pot big icon',
            'Danny',
            'Day cycle images',
            'Dr. Splash',
            'Dracovish shop image',
            'Dracozolt shop image',
            'Dream Orbs',
            'Dungeon Ladder',
            'Dungeon Chest Tiers',
            'Exeggcute (Single)',
            'Galar fossils items',
            'Galarian Articuno overworld image',
            'Galarian Moltres overworld image',
            'Galarian Zapdos overworld image',
            'Galarica cuff and wreath icons',
            'Gimmighoul Coin',
            'Go-Rock Squad Commander',
            'Go-Rock Squad Grunt (male)',
            'Go-Rock Squad Grunt (female)',
            'Sudowoodo (Golden) Shop Icon',
            'Grotle (Acorn)',
            'Grotle (Acorn) Shop Icon',
            'Grotle and Friends',
            'Honey',
            'Hopo berry image and trees',
            'Hoppip (Chimecho)',
            'Key Stone',
            'Komala overworld image',
            'Legend Plate',
            'Linking cord cartoon style',
            'Luana',
            'Magikarp Skelly',
            'Magikarp Calico (Orange, White)',
            'Magikarp Calico (Orange, White, Black)',
            'Magikarp Calico (White, Orange)',
            'Magikarp Calico (Orange, Gold)',
            'Magikarp Orange Two-Tone',
            'Magikarp Orange Orca',
            'Magikarp Orange Dapples',
            'Magikarp Pink Two-Tone',
            'Magikarp Pink Orca',
            'Magikarp Pink Dapples',
            'Magikarp Apricot Tiger',
            'Magikarp Apricot Zebra',
            'Magikarp Apricot Stripes',
            'Magikarp Brown Tiger',
            'Magikarp Brown Zebra',
            'Magikarp Brown Stripes',
            'Magikarp Brown Stripes Shop Icon',
            'Magikarp Blue Raindrops Shop Icon',
            'Magikarp Saucy Violet Shop Icon',
            'Magikarp (Feebas)',
            'Magma Admin Courtney',
            'Magma Stone',
            'Man of Mystery',
            'Merilyn',
            'Meta Groudon Overworld',
            'Meteorite',
            'Milcery (Cheesy)',
            'Miror B.',
            'Mismagius (Illusion)',
            'Mismagius (Illusion) Shop Icon',
            'Mr Stone',
            'New Island Overworld',
            'Peat Block',
            'Pikachu (Clone)',
            'Pikachu (Easter)',
            'Pinkan Arbok',
            'Pinkan Bellsprout',
            'Pink Bow',
            'Pink Butterfree',
            'Pinkan Caterpie',
            'Pinkan Diglett',
            'Pinkan Dodrio',
            'Pinkan Dodrio Shuffle',
            'Pinkan Exeggutor',
            'Pinkan Geodude Shuffle',
            'Pinkan Jessie & James',
            'Pinkan Paras',
            'Pinkan Pikachu',
            'Pinkan Poliwhirl',
            'Pinkan Rhyhorn (shiny)',
            'Pinkan Scyther Shuffle',
            'Pinkan Weedle',
            'Pinkan Weezing',
            'Professor Burnet',
            'Purify Icon',
            'Robo Groudon',
            'Roddy Tackle',
            'Rudy',
            'Rusted Shield and Sword icons',
            'Sacred Blank Plate',
            'Sacred Draco Plate',
            'Sacred Earth Plate',
            'Sacred Fist Plate',
            'Sacred Flame Plate',
            'Sacred Icicle Plate',
            'Sacred Insect Plate',
            'Sacred Iron Plate',
            'Sacred Meadow Plate',
            'Sacred Mind Plate',
            'Sacred Pixie Plate',
            'Sacred Sky Plate',
            'Sacred Splash Plate',
            'Sacred Spooky Plate',
            'Sacred Stone Plate',
            'Sacred Toxic Plate',
            'Sacred Zap Plate',
            'Sea Mauville',
            'Shadow Absol',
            'Shadow Arbok',
            'Shadow Articuno',
            'Shadow Baltoy',
            'Shadow Banette',
            'Shadow Beedrill',
            'Shadow Butterfree',
            'Shadow Carvanha',
            'Shadow Chansey',
            'Shadow Crocanaw',
            'Shadow Delcatty',
            'Shadow Dodrio',
            'Shadow Dragonite',
            'Shadow Duskull',
            'Shadow Electabuzz',
            'Shadow Farfetch\'d',
            'Shadow Grimer',
            'Shadow Houndoom',
            'Shadow Hypno',
            'Shadow Icon',
            'Shadow Lickitung',
            'Shadow Lunatone',
            'Shadow Magmar',
            'Shadow Magneton',
            'Shadow Makuhita',
            'Shadow Mawile',
            'Shadow Meowth',
            'Shadow Metagross',
            'Shadow Miltank',
            'Shadow Moltres',
            'Shadow Murkrow',
            'Shadow Nosepass',
            'Shadow Numel',
            'Shadow Paras',
            'Shadow Pineco',
            'Shadow Poliwrath',
            'Shadow Primeape',
            'Shadow Ralts',
            'Shadow Rapidash',
            'Shadow Raticate',
            'Shadow Remoraid',
            'Shadow Roselia',
            'Shadow Seedot',
            'Shadow Seel',
            'Shadow Shroomish',
            'Shadow Shuckle',
            'Shadow Smeargle',
            'Shadow Sneasel',
            'Shadow Snorlax',
            'Shadow Solrock',
            'Shadow Spearow',
            'Shadow Starmie',
            'Shadow Sudowoodo',
            'Shadow Suicune',
            'Shadow Swellow',
            'Shadow Tangela',
            'Shadow Teddiursa',
            'Shadow Tropius',
            'Shadow Ursaring',
            'Shadow Venomoth',
            'Shadow Voltorb',
            'Shadow Vulpix',
            'Shadow Weepinbell',
            'Shadow Zapdos',
            'Shady Salesman',
            'Ship Front View',
            'Shuckle (Corked)',
            'Silvally (Bug) Shuffle',
            'Silvally (Dark) Shuffle',
            'Silvally (Dragon) Shuffle',
            'Silvally (Electric) Shuffle',
            'Silvally (Fairy) Shuffle',
            'Silvally (Fighting) Shuffle',
            'Silvally (Fire) Shuffle',
            'Silvally (Flying) Shuffle',
            'Silvally (Ghost) Shuffle',
            'Silvally (Grass) Shuffle',
            'Silvally (Ground) Shuffle',
            'Silvally (Ice) Shuffle',
            'Silvally (Poison) Shuffle',
            'Silvally (Psychic) Shuffle',
            'Silvally (Rock) Shuffle',
            'Silvally (Steel) Shuffle',
            'Silvally (Water) Shuffle',
            'Snover Berry and Trees',
            'Snover (Berry)',
            'Spooky Togepi (shiny)',
            'Spooky Togetic',
            'Spooky Togekiss',
            'Strange Boulders',
            'Supreme Gym Leader Drake',
            'Sweet and Tart apple icons',
            'Team Flare Admin (male)',
            'Team Flare Admin (female)',
            'Team Flare Aliana',
            'Team Magma and Aqua Admins',
            'Team Magma Grunts',
            'Thug Zook',
            'Togepi (Flowering Crown)',
            'Torchic (Egg)',
            'Tourist Couple/Bellhop',
            'Tower of Darkness',
            'Tower of Waters',
            'Underground Aerodactylite',
            'Underground Mawilite',
            'Underground Sablenite',
            'Valencian Raticate',
            'Valencian Paras',
            'Dugtrio (Punk) shop image',
            'Gengar (Punk) shop image',
            'Goldeen (Diva) shop image',
            'Onix (Rocker) shop image',
            'Tangela (Pom-pom) shop image',
            'Weepinbell (Fancy) shop image',
            'Vertical cave entrance map sprites',
            'Vivillon Photobook',
            'Volo (Ginkgo)',
            'White mane hair icon',
            'Zarude (Dada) shop image',
            'Zero',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Drawnamu',
        link: 'https://www.deviantart.com/drawnamu',
        image: 'https://a.deviantart.net/avatars-big/d/r/drawnamu.png',
        resources: [
            'Marnie (Gym Leader)',
            'Mustard (battle pose)',
        ],
        // NOTES: Gives permission to everyone who asks in the comments section of the spritesheet as long as credit is given
    },
    {
        name: 'Duncapham',
        link: 'https://www.deviantart.com/duncapham',
        image: 'https://a.deviantart.net/avatars-big/d/u/duncapham.png',
        resources: [
            'Kanto Gym Leader/E4 sprite revamps',
            'Aqua and Magma leader revamps',
            'Blue recolours',
            'Channeler revamp',
            'Cool Couple revamps',
            'Crush Kin revamp',
            'Drake revamp',
            'Lady revamp',
            'May revamp',
            'Norman revamp',
            'Old Couple revamp',
            'Painter revamp',
            'Phoebe revamp',
            'Professor Oak revamp',
            'Roxanne revamp',
            'Ruin Maniac revamp',
            'Scientist revamp',
            'Sidney revamp',
            'Steven revamp',
            'Tamer revamp',
            'Tate & Liza revamp',
            'Team Rocket Grunt revamps',
            'Wally revamp',
            'Winona revamp',
        ],
        // NOTES: Allowed use with credit given.
    },
    {
        name: 'Eat Pant',
        link: 'https://discordapp.com/users/736029608587296819',
        image: 'assets/images/profile/trainer-119.png',
        resources: [
            'Dugtrio (Punk)',
            'Genesect (High-Speed) and Drive Forms',
            'Koga Trainer',
            'Miracle Chest',
            'Pinkan Geodude',
            'Pinkan Mankey',
            'Pinkan Nidoking',
            'Pinkan Nidoran(F)',
            'Pinkan Nidoran(M)',
            'Pinkan Oddish',
            'Pinkan Primeape',
            'Pinkan Venonat',
            'Spooky Ivysaur',
            'Spooky Venusaur',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'EmmaRoak',
        link: 'https://www.deviantart.com/emmaroak',
        image: 'https://a.deviantart.net/avatars-big/e/m/emmaroak.png',
        resources: [
            'Blastoise (clone)',
            'Bulbasaur (clone)',
            'Charizard (clone)',
            'Charmander (clone)',
            'Charmeleon (clone)',
            'Ivysaur (clone)',
            'Squirtle (clone)',
            'Venusaur (clone)',
            'Wartortle (clone)',
        ],
        // NOTES: No notes about credit, have messaged asking for permission, awaiting confirmation
    },
    {
        name: 'Ezerart',
        link: 'https://www.deviantart.com/ezerart',
        image: 'https://a.deviantart.net/avatars-big/e/z/ezerart.jpg',
        resources: [
            'Dynamic Background Basculegion',
        ],
        // Notes: Allowed use with credit
    },
    {
        name: 'Farboo171',
        link: 'https://github.com/Farboo171',
        resources: [
            'Athlete (male)',
            'Bodybuilder (male)',
            'Evice',
            'Exeggcute (Single) Item',
            'Flowering Celebi',
            'Freeze Mulch',
            'Old Lady',
            'Underground Fossilized Dino',
            'Underground Fossilized Drake',
            'Zook (Overworld)',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Gnomowladny',
        link: 'https://www.deviantart.com/gnomowladny',
        image: 'https://a.deviantart.net/avatars-big/g/n/gnomowladny.gif',
        resources: [
            'Clemont',
            'Drasna',
            'Korrina',
            'Malva',
            'Onympia',
            'Ramos',
            'Siebold',
            'Team Flare Bryony',
            'Team Flare Xerosic',
            'Tierno',
            'Valerie',
            'Viola',
            'Wikstrom',
            'Wulfric',
            'Zinnia',
        ],
        // NOTES: Feel free to use it if you like, but don\'t forget to give me credit~!
    },
    {
        name: 'HighOnMushrooms',
        link: 'https://www.pokecommunity.com/showthread.php?p=9366810#9370990',
        resources: [
            'Flying Pikachu',
            'Surfing Pikachu',
        ],
        // NOTES: No notes about credit, can no longer find an existing profile for the user
    },
    {
        name: 'izzyvicious',
        link: 'https://www.deviantart.com/izzyvicious',
        image: 'https://a.deviantart.net/avatars-big/i/z/izzyvicious.png',
        resources: [
            'Overworld Marnie',
        ],
        // Notes: Gives credit on image page if asked.
    },
    {
        name: 'JapuDCret',
        link: 'https://github.com/JapuDCret',
        image: 'https://avatars.githubusercontent.com/u/14893450?v=4',
        resources: [
            'Egg Hunter',
        ],
        // NOTES: Permission given via PRs
    },
    {
        name: 'JorMxDos',
        link: 'https://www.deviantart.com/jormxdos',
        image: 'https://a.deviantart.net/avatars-big/j/o/jormxdos.png?8',
        resources: [
            'All Vectorized Badges images',
            'Vectorized Z Crystals',
        ],
        // NOTES: Permission given in the bio comment section
    },
    {
        name: 'Jostav',
        link: 'https://discordapp.com/users/823666951565344828/',
        resources: [
            'Cipher Peon (yellow)',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Kelp1490',
        link: 'https://discordapp.com/users/463397969102766080/',
        resources: [
            'cipher Admin Eldes',
            'Cipher Admin Gorigan',
            'Cipher Admin Snattle',
            'Cipher Peon Browsix',
            'Cipher Peon Greesix',
            'Cipher Peon Purpsix',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'Kensuyjin33',
        link: 'https://www.deviantart.com/kensuyjin33',
        image: 'https://a.deviantart.net/avatars-big/k/e/kensuyjin33.png',
        resources: [
            'Blue sprite revamps',
        ],
        // NOTES: Allowed use with credit given.
    },
    {
        name: 'Kilima',
        link: 'https://archive.pokecharms.com/works/diantha-sprite.52739/',
        resources: [
            'Diantha',
        ],
        // NOTES: Permission given to Krush via Discord DM
    },
    {
        name: 'Kita',
        link: 'https://discordapp.com/users/312651496766308352/',
        resources: [
            'Dynamic Background sprite recolors (shiny Bounsweet, nonshiny Decidueye, nonshiny Incineroar)',
        ],
        // Notes: This wording is a bit clunky, but information on who made the original later-gen DB sprites that these were based on doesn't seem to be available, so..."
    },
    {
        name: 'Krokotips',
        link: 'https://www.deviantart.com/krokotips',
        resources: [
            'Team Flare Celosia',
            'Team Flare Mable',
        ],
        // NOTES: No notes about credit, have messaged asking for permission, awaiting confirmation
    },
    {
        name: 'Kyle-Dove',
        link: 'https://www.deviantart.com/kyle-dove',
        image: 'https://a.deviantart.net/avatars-big/k/y/kyle-dove.png',
        resources: [
            'Artist (Gen 8)',
            'Artist (male)',
            'Arven',
            'Battle Café Master',
            'Beni',
            'Beni (Ninja)',
            'Bill',
            'Blue-LGPE',
            'Blue-Masters',
            'Brassius',
            'Clavell',
            'Clover',
            'Cook (Gen 8)',
            'Cyllene',
            'Dendra',
            'Fairy Tale Girl',
            'Gaeric',
            'Geeta',
            'Gen 8 Reporter (Lucy Stevens)',
            'Hassel',
            'Hex Maniac',
            'Hiker (Gen 8)',
            'Ingo',
            'Iono',
            'Iscan',
            'Jacq',
            'Kamado',
            'Kamado (Armor)',
            'Katy',
            'Kofu',
            'Kurt',
            'Larry',
            'Laventon',
            'Looker',
            'Melli',
            'Miriam',
            'Mr. Fuji',
            'Nemona',
            'Owner',
            'Palina',
            'Poppy',
            'Prof. Birch',
            'Prof. Elm',
            'Prof. Rowan',
            'Punk Girl',
            'Punk Guy',
            'Rail Staff',
            'Rika',
            'Red-Masters',
            'Ryme',
            'Sada',
            'Scratch Cat Girl (Alola Mom)',
            'Sightseer (male)',
            'Sky Trainer (female)',
            'Sky Trainer (male)',
            'Team Star Grunt (female)',
            'Team Star Grunt (male)',
            'Triathlete',
            'Tourist (female)',
            'Tourist (male)',
            'Tulip',
            'Turo',
            'Tyme',
            'Worker (female)',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'Larryturbo',
        link: 'https://www.deviantart.com/larryturbo',
        image: 'https://a.deviantart.net/avatars-big/l/a/larryturbo.png',
        resources: [
            'Dynamic BG Meltan',
            'Dynamic BG Melmetal',
            'Mega Houndoom (Overworld)',
            'Mega Manectric (Overworld)',
            'Mega Mewtwo X (Overworld)',
            'Mega Mewtwo Y (Overworld)',
            'Primal Groudon (Overworld)',
            'Primal Kyogre (Overworld)',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'lasse00',
        link: 'https://www.deviantart.com/lasse00',
        image: 'https://a.deviantart.net/avatars-big/l/a/lasse00.jpg',
        resources: [
            'Hisui Dynamic Background Shinies',
        ],
        // Notes: Allowed use with credit
    },
    {
        name: 'Leaf',
        link: 'https://twitter.com/Leafalie',
        resources: [
            'Totem Alolan Marowak',
            'Totem Alolan Raticate',
            'Totem Araquanid',
            'Totem Gumshoos',
            'Totem Lurantis',
            'Totem Kommo-o',
            'Totem Mimikyu',
            'Totem Salazzle',
            'Totem Togedemaru',
            'Totem Vikavolt',
            'Totem Wishiwashi',
        ],
        // Notes: Permission given via Discord
    },
    {
        name: 'leparagon',
        link: 'https://www.deviantart.com/leparagon',
        image: 'https://a.deviantart.net/avatars-big/l/e/leparagon.jpg',
        resources: [
            'Armored Mewtwo',
        ],
        // NOTES: No notes about credit, have messaged asking for permission, awaiting confirmation
    },
    {
        name: 'mid117',
        link: 'https://www.deviantart.com/mid117',
        image: 'https://a.deviantart.net/avatars-big/m/i/mid117.jpg',
        resources: [
            'Team Skull Grunt (female)',
            'Team Skull Grunt (male)',
        ],
        // NOTES: Found on DeviantArt About page: "All Sprites here are free to use as long you give credit to me"
    },
    {
        name: 'NiCeDiCe',
        link: 'https://twitter.com/NiCeDiCe90',
        resources: [
            'Blessing Blissey',
            'Bulbasaur (Rose)',
            'Charity Chansey',
            'Crystal Onix',
            'Crystal Steelix',
            'Handout Happiny',
            'Pinkan Rhyhorn (non shiny)',
            'Red Spearow',
            'shiny Totem Ribombee',
            'misc Map sprite edits',
            'Bulbasaur (Rose)',
        ],
        // NOTES: Created specifically for PokéClicker.
    },
    {
        name: 'nileplumb',
        link: 'https://www.deviantart.com/nileplumb',
        resources: [
            'Furfrou Trim Shop Icons',
        ],
        // NOTES: Granted permission on devianart to NiceDice via PN
    },
    {
        name: 'osherwott',
        link: 'https://github.com/osherwott',
        resources: [
            'Athlete (female)',
            'Bandana Guy',
            'Bodybuilder (female)',
            'Chaser (male and female)',
            'Es Cade',
            'Hunter (male and female)',
            'Rider (male and female)',
            'Roller Boy',
            'Rui',
            'Street Performer',
            'Team Snagem',
            'Willie',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'pixie-rings',
        link: 'https://www.deviantart.com/pixie-rings/art/Pokemon-Trainer-Sprite-Furisode-Girl-560892832',
        image: 'https://a.deviantart.net/avatars-big/p/i/pixie-rings.jpg?14',
        resources: [
            'Furisode Girl Katherine',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'PKMNTrainerSpriterC, akuma-tsubasa & Metapod23',
        link: 'https://www.deviantart.com/pkmntrainerspriterc/art/Ash-Ketchum-Sprite-Set-435950341',
        resources: [
            'Ash Ketchum',
        ],
        // NOTES: Permission given on image page if credited.
    },
    {
        name: 'Pokémon Reborn\'s cass and Amethyst',
        link: 'https://www.rebornevo.com/pr/index.html/',
        resources: [
            'Underground Shiny stone',
            'Underground Dusk stone',
            'Underground Dawn stone',
            'Underground Ice stone',
        ],
        // Notes: Permission given to SomeoneAlive via Discord DM
    },
    {
        name: 'PhoenixOfLight92',
        link: 'https://www.deviantart.com/phoenixoflight92',
        image: 'https://a.deviantart.net/avatars-big/p/h/phoenixoflight92.png',
        resources: [
            'Shauna',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'Pokemon Showdown',
        link: 'https://play.pokemonshowdown.com/sprites/trainers/',
        resources: [
            'Jessie and James',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'Prodigal96',
        link: 'https://www.deviantart.com/prodigal96',
        image: 'https://a.deviantart.net/avatars-big/p/r/prodigal96.jpg',
        resources: [
            'Rainbow Rocket overworld sprites',
        ],
        // Notes: Free to use, no credit required
    },
    {
        name: 'procompyart',
        link: 'https://www.instagram.com/procompyart/',
        resources: [
            'Elf Munchlax',
            'Grinch Celebi',
            'Ivysaur (Rose)',
            'Venusaur (Rose)',
        ],
        // Notes: Permission given via Discord #development-chat
    },
    {
        name: 'Qwertypop04',
        link: 'https://discordapp.com/users/345944451472031744/',
        resources: [
            'Pinkan Rhydon',
            'Shadow Altaria',
            'Shadow Ariados',
            'Shadow Dugtrio',
            'Shadow Entei',
            'Shadow Exeggutor',
            'Shadow Flaaffy',
            'Shadow Forretress',
            'Shadow Gligar',
            'Shadow Golduck',
            'Shadow Granbull',
            'Shadow Growlithe',
            'Shadow Gulpin',
            'Shadow Heracross',
            'Shadow Hitmonchan',
            'Shadow Hitmonlee',
            'Shadow Kangaskhan',
            'Shadow Lapras',
            'Shadow Ledian',
            'Shadow Magcargo',
            'Shadow Manectric',
            'Shadow Mantine',
            'Shadow Mareep',
            'Shadow Marowak',
            'Shadow Mr. Mime',
            'Shadow Natu',
            'Shadow Pidgeotto',
            'Shadow Pinsir',
            'Shadow Quagsire',
            'Shadow Raikou',
            'Shadow Rhydon',
            'Shadow Sableye',
            'Shadow Salamence',
            'Shadow Scizor',
            'Shadow Scyther',
            'Shadow Shellder',
            'Shadow Skarmory',
            'Shadow Skiploom',
            'Shadow Slugma',
            'Shadow Snorunt',
            'Shadow Spheal',
            'Shadow Spinarak',
            'Shadow Swablu',
            'Shadow Swinub',
            'Shadow Tauros',
            'Shadow Togepi',
            'Shadow Togetic',
            'Shadow Tyranitar',
            'Shadow Vibrava',
            'Shadow Zangoose',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'RedSparr0w',
        link: 'https://github.com/RedSparr0w',
        image: 'https://avatars.githubusercontent.com/u/7288322?v=4',
        resources: [
            'Let\'s Go Eevee',
            'Let\'s Go Pikachu',
            'Pikachu (Gengar)',
            'Santa Snorlax',
            'Spooky Bulbasaur',
            'Spooky Togepi',
            'Totem Ribombee',
            'Underground Fossilized Bird',
            'Underground Fossilized Fish',
        ],
    },
    {
        name: 'Robbinspook',
        link: 'https://discordapp.com/users/359364624526868480/',
        resources: [
            'Grand Master Greevil',
        ],
        // Notes: Made specifically for PokéClicker.
    },
    {
        name: 'SageDeoxys, Wolfang62, LarryTurbo, tammyclaydon',
        link: 'https://www.pokecommunity.com/showthread.php?t=474312',
        resources: [
            'Dynamic BG Galar (Gen 8) sprites',
        ],
    },
    {
        name: 'Sandi315',
        link: 'https://www.reddit.com/user/Sandi315/',
        resources: [
            'Pokémon background',
        ],
    },
    {
        name: 'Similation',
        link: 'https://www.deviantart.com/similation',
        image: 'https://a.deviantart.net/avatars-big/s/i/similation.jpg',
        resources: [
            'Professor Sycamore',
        ],
        // Notes: Permission given on image page if credited
    },
    {
        name: 'Smogon Sprite Project',
        link: 'https://www.smogon.com/forums/forums/smeargles-laptop.325/',
        resources: [
            'Alola Sprites',
            'Galar Sprites',
            'Kalos Sprites',
            'Paldea Sprites',
        ],
        // NOTES: free for non-profit use.
    },
    {
        name: 'Someone Soul',
        link: 'https://discordapp.com/users/824384977633411082',
        resources: [
            'Bede overworld image',
            'Burmy (No Coat)',
            'Cactus',
            'Camouflaged Kecleon image',
            'Cissy',
            'Cipher Key Lair',
            'Miror B. Peons', // placeholder
            'Cipher Peon Blusix',
            'Cipher Peon Resix',
            'Cipher Peon (skrub)',
            'Cipher Peon (mirakle b)',
            'Coastland route map sprites',
            'Crystalline Cocoon',
            'Dead tree map sprite',
            'Detective Pikachu',
            'Detective Raichu',
            'Dr Cozmo',
            'Draconid Elder',
            'Dyna Tree',
            'Friend Safari',
            'Sudowoodo (Golden)',
            'Heart Diamond',
            'Iceland route map sprites',
            'Macro Cosmos (male) and (female)',
            'Magikarp Grey Bubbles',
            'Magikarp Grey Diamonds',
            'Magikarp Grey Patches',
            'Magikarp Purple Bubbles',
            'Magikarp Purple Diamonds',
            'Magikarp Purple Patches',
            'Magikarp Orange Forehead',
            'Magikarp Orange Mask',
            'Magikarp Black Forehead',
            'Magikarp Black Mask',
            'Magikarp Saucy Blue',
            'Magikarp Blue Raindrops',
            'Magikarp Saucy Violet',
            'Magikarp Violet Raindrops',
            'Max Raid Den map sprites (active and inactive)',
            'Meta Groudon',
            'Millis Steel',
            'Mireland route map sprites',
            'Murph',
            'Mystery Troop Blue',
            'Mystery Troop Green',
            'Mystery Troop Red',
            'Noble Arcanine',
            'Noble Avalugg',
            'Noble Electrode',
            'Noble Kleavor',
            'Noble Lilligant',
            'Outskirt Stand',
            'Pillar map sprite',
            'Pinkan Berry',
            'Pinkan Electabuzz',
            'Pinkan Pidgey',
            'Pinkan Pidgeotto',
            'Pinkan Rattata',
            'Pinkan Vileplume',
            'Professor Hastings',
            'Professor Juniper',
            'Realgam Tower',
            'Riot',
            'Salazzle overworld images',
            'Shadow Aipom',
            'Shadow Bayleef',
            'Shadow Delibird',
            'Shadow Dunsparce',
            'Shadow Furret',
            'Shadow Hitmontop',
            'Shadow Houndour',
            'Shadow Ledyba',
            'Shadow Meditite',
            'Shadow Misdreavus',
            'Shadow Noctowl',
            'Shadow Piloswine',
            'Shadow Poochyena',
            'Shadow Quilava',
            'Shadow Qwilfish',
            'Shadow Stantler',
            'Shadow Sunflora',
            'Shadow Yanma',
            'Shady Guy (wes)',
            'Team Flare Boss Lysandre',
            'Valencian Butterfree',
            'Valencian Vileplume',
            'Valencian Weepinbell',
            'Onix (Rocker)',
            'Weepinbell (Fancy)',
            'Gengar (Punk)',
            'Tangela (Pom-pom)',
            'Goldeen (Diva)',
            'XD001',
        ],
        // NOTES: Made specifically for Pokeclicker.
    },
    {
        name: 'tebited15',
        link: 'https://www.deviantart.com/tebited15',
        image: 'https://a.deviantart.net/avatars-big/t/e/tebited15.png',
        resources: [
            'Grant',
            'Calem overworld',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'TintjeMadelintje101',
        link: 'https://www.deviantart.com/tintjemadelintje101',
        image: 'https://a.deviantart.net/avatars-big/t/i/tintjemadelintje101.jpg',
        resources: [
            'Calem',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'Ulithium_Dragon',
        link: 'https://www.pokecommunity.com/showthread.php?t=397580',
        image: 'https://www.pokecommunity.com/customavatars/avatar531836_2.gif',
        resources: [
            'Ultra Wormhole',
        ],
        // Notes: Permission given on image page, credit optional, still given cuz we're nice like that.
    },
    {
        name: 'VictorV111',
        link: 'https://www.deviantart.com/victorv111',
        image: 'https://a.deviantart.net/avatars-big/v/i/victorv111.png',
        resources: [
            'Celio',
            'Mr. Pokémon',
            'Professor Ivy',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'Vur3',
        link: 'https://www.deviantart.com/vur3',
        image: 'https://a.deviantart.net/avatars-big/v/u/vur3.png',
        resources: [
            'Glacia revamp',
        ],
        // Notes: Permission if credited.
    },
    {
        name: 'Wolfang62',
        link: 'https://www.deviantart.com/wolfang62',
        image: 'https://a.deviantart.net/avatars-big/w/o/wolfang62.jpg',
        resources: [
            'Overworld Hop',
            'Dynamic BG Meltan',
            'Dynamic BG Melmetal',
        ],
        // Notes: Permission given on image page if credited.
    },
    {
        name: 'X-5-4-5-2',
        link: 'https://www.deviantart.com/x-5-4-5-2',
        image: 'https://a.deviantart.net/avatars-big/x/_/x-5-4-5-2.png',
        resources: [
            'Officer Jenny',
        ],
        // Notes: Permission given on image page.
    },
    {
        name: 'ZacWeavile',
        link: 'https://www.smogon.com/forums/threads/zacweavile-galery.3712625/',
        image: 'https://www.smogon.com/forums/media/data/avatars/o/522/522483.jpg?1650909371',
        resources: [
            'Atticus',
            'Charm',
            'Coin',
            'Dexio (Gen 6)',
            'Eri',
            'Giacomo',
            'Green',
            'Grusha',
            'Mela',
            'Ortega',
            'Penny',
        ],
        // Notes: Permission given if credited.
    },
    {
        name: 'Zender1752',
        link: 'https://www.deviantart.com/zender1752',
        image: 'https://a.deviantart.net/avatars-big/z/e/zender1752.png',
        resources: [
            'Hau overworld',
            'Gladion overworld',
            'Plumeria overworld',
            'Overworld Klara',
            'Overworld Avery',
            'Overworld Miror B.',
        ],
        // Notes: Permission given on image page if credited
    },
].map((c) => {
    SeededRand.seed(parseInt(c.name, 36));
    // eslint-disable-next-line no-param-reassign
    c.image = c.image ?? `assets/images/profile/trainer-${SeededRand.intBetween(0, Profile.MAX_TRAINER - 1)}.png`;
    // eslint-disable-next-line no-param-reassign
    c.link = c.link ?? `#${c.name}`;
    return c;
});

/*
fetch(`https://api.github.com/repos/pokeclicker/pokeclicker/contributors?per_page=100&anon=1`).then(async res => {
    const json = await res.json();
    console.log(json.map(c => {
        if (!c.login) return c;
        const anon = json.find(_c => _c.name == c.login);
        c.contributions += anon ? anon.contributions : 0;
        return c;
    }).filter(c => c.login).sort((a, b) => b.contributions - a.contributions).map(c => `    {
        resources: [
            ${c.contributions},
        ],
        name: '${c.login}',
        link: '${c.html_url}',
        image: '${c.avatar_url}',
    },`).join('\n'));
});
*/
export const CodeCredits: Credit[] = [
    {
        resources: [
            1429,
        ],
        name: 'RedSparr0w',
        link: 'https://github.com/RedSparr0w',
        image: 'https://avatars.githubusercontent.com/u/7288322?v=4',
    },
    {
        resources: [
            565,
        ],
        name: 'Ishadijcks',
        link: 'https://github.com/Ishadijcks',
        image: 'https://avatars.githubusercontent.com/u/9715314?v=4',
    },
    {
        resources: [
            464,
        ],
        name: 'Aegyo',
        link: 'https://github.com/Aegyo',
        image: 'https://avatars.githubusercontent.com/u/4183969?v=4',
    },
    {
        resources: [
            390,
        ],
        name: 'dennism1997',
        link: 'https://github.com/dennism1997',
        image: 'https://avatars.githubusercontent.com/u/8763360?v=4',
    },
    {
        resources: [
            243,
        ],
        name: 'Jaaslet',
        link: 'https://github.com/Jaaslet',
        image: 'https://avatars.githubusercontent.com/u/2961347?v=4',
    },
    {
        resources: [
            180,
        ],
        name: 'Ultima1990',
        link: 'https://github.com/Ultima1990',
        image: 'https://avatars.githubusercontent.com/u/69112975?v=4',
    },
    {
        resources: [
            133,
        ],
        name: 'Qwertypop04',
        link: 'https://github.com/Qwertypop04',
        image: 'https://avatars.githubusercontent.com/u/63805905?v=4',
    },
    {
        resources: [
            111,
        ],
        name: 'Farboo171',
        link: 'https://github.com/Farboo171',
        image: 'https://avatars.githubusercontent.com/u/109317224?v=4',
    },
    {
        resources: [
            107,
        ],
        name: 'CypherX',
        link: 'https://github.com/CypherX',
        image: 'https://avatars.githubusercontent.com/u/672420?v=4',
    },
    {
        resources: [
            91,
        ],
        name: 'CorgiOnNeptune',
        link: 'https://github.com/CorgiOnNeptune',
        image: 'https://avatars.githubusercontent.com/u/104700780?v=4',
    },
    {
        resources: [
            78,
        ],
        name: 'jk13pclick',
        link: 'https://github.com/jk13pclick',
        image: 'https://avatars.githubusercontent.com/u/83479938?v=4',
    },
    {
        resources: [
            64,
        ],
        name: 'fujnw',
        link: 'https://github.com/fujnw',
        image: 'https://avatars.githubusercontent.com/u/36806183?v=4',
    },
    {
        resources: [
            54,
        ],
        name: 'osherwott',
        link: 'https://github.com/osherwott',
        image: 'https://avatars.githubusercontent.com/u/114451054?v=4',
    },
    {
        resources: [
            52,
        ],
        name: 'BaineGames',
        link: 'https://github.com/BaineGames',
        image: 'https://avatars.githubusercontent.com/u/8126876?v=4',
    },
    {
        resources: [
            46,
        ],
        name: 'RegisCoaxans',
        link: 'https://github.com/RegisCoaxans',
        image: 'https://avatars.githubusercontent.com/u/68825215?v=4',
    },
    {
        resources: [
            43,
        ],
        name: 'HLXII',
        link: 'https://github.com/HLXII',
        image: 'https://avatars.githubusercontent.com/u/33099029?v=4',
    },
    {
        resources: [
            38,
        ],
        name: 'Crobat4',
        link: 'https://github.com/Crobat4',
        image: 'https://avatars.githubusercontent.com/u/104547700?v=4',
    },
    {
        resources: [
            34,
        ],
        name: 'DraKay',
        link: 'https://github.com/DraKay',
        image: 'https://avatars.githubusercontent.com/u/114853432?v=4',
    },
    {
        resources: [
            34,
        ],
        name: 'EatPant2nd',
        link: 'https://github.com/EatPant2nd',
        image: 'https://avatars.githubusercontent.com/u/106291026?v=4',
    },
    {
        resources: [
            34,
        ],
        name: 'LuchoDreamer',
        link: 'https://github.com/LuchoDreamer',
        image: 'https://avatars.githubusercontent.com/u/120585930?v=4',
    },
    {
        resources: [
            32,
        ],
        name: 'apple096',
        link: 'https://github.com/apple096',
        image: 'https://avatars.githubusercontent.com/u/62083669?v=4',
    },
    {
        resources: [
            28,
        ],
        name: 'dependabot[bot]',
        link: 'https://github.com/apps/dependabot',
        image: 'https://avatars.githubusercontent.com/in/29110?v=4',
    },
    {
        resources: [
            28,
        ],
        name: 'tkatchen',
        link: 'https://github.com/tkatchen',
        image: 'https://avatars.githubusercontent.com/u/26515965?v=4',
    },
    {
        resources: [
            25,
        ],
        name: 'amative1',
        link: 'https://github.com/amative1',
        image: 'https://avatars.githubusercontent.com/u/14666630?v=4',
    },
    {
        resources: [
            24,
        ],
        name: 'DataCrusade',
        link: 'https://github.com/DataCrusade',
        image: 'https://avatars.githubusercontent.com/u/36621129?v=4',
    },
    {
        resources: [
            24,
        ],
        name: 'davmillar',
        link: 'https://github.com/davmillar',
        image: 'https://avatars.githubusercontent.com/u/576958?v=4',
    },
    {
        resources: [
            23,
        ],
        name: 'LuqDragon',
        link: 'https://github.com/LuqDragon',
        image: 'https://avatars.githubusercontent.com/u/27972070?v=4',
    },
    {
        resources: [
            23,
        ],
        name: 'PixLSteam',
        link: 'https://github.com/PixLSteam',
        image: 'https://avatars.githubusercontent.com/u/21047644?v=4',
    },
    {
        resources: [
            21,
        ],
        name: 'SpenserJ',
        link: 'https://github.com/SpenserJ',
        image: 'https://avatars.githubusercontent.com/u/90011?v=4',
    },
    {
        resources: [
            20,
        ],
        name: 'imgbot[bot]',
        link: 'https://github.com/apps/imgbot',
        image: 'https://avatars.githubusercontent.com/in/4706?v=4',
    },
    {
        resources: [
            18,
        ],
        name: 'NiCeDiCe90',
        link: 'https://github.com/NiCeDiCe90',
        image: 'https://avatars.githubusercontent.com/u/82889773?v=4',
    },
    {
        resources: [
            17,
        ],
        name: 'Someonealive-QN',
        link: 'https://github.com/Someonealive-QN',
        image: 'https://avatars.githubusercontent.com/u/97617298?v=4',
    },
    {
        resources: [
            17,
        ],
        name: 'Vodovik',
        link: 'https://github.com/Vodovik',
        image: 'https://avatars.githubusercontent.com/u/25463975?v=4',
    },
    {
        resources: [
            17,
        ],
        name: 'walkerboh',
        link: 'https://github.com/walkerboh',
        image: 'https://avatars.githubusercontent.com/u/6124960?v=4',
    },
    {
        resources: [
            15,
        ],
        name: 'DaveYognaught',
        link: 'https://github.com/DaveYognaught',
        image: 'https://avatars.githubusercontent.com/u/58609098?v=4',
    },
    {
        resources: [
            15,
        ],
        name: 'Mephistic',
        link: 'https://github.com/Mephistic',
        image: 'https://avatars.githubusercontent.com/u/2694761?v=4',
    },
    {
        resources: [
            13,
        ],
        name: 'Nydaleclya',
        link: 'https://github.com/Nydaleclya',
        image: 'https://avatars.githubusercontent.com/u/21280367?v=4',
    },
    {
        resources: [
            10,
        ],
        name: 'Symi001',
        link: 'https://github.com/Symi001',
        image: 'https://avatars.githubusercontent.com/u/86664830?v=4',
    },
    {
        resources: [
            10,
        ],
        name: 'nls0',
        link: 'https://github.com/nls0',
        image: 'https://avatars.githubusercontent.com/u/41541662?v=4',
    },
    {
        resources: [
            9,
        ],
        name: 'KrushGames',
        link: 'https://github.com/KrushGames',
        image: 'https://avatars.githubusercontent.com/u/71728117?v=4',
    },
    {
        resources: [
            9,
        ],
        name: 'umbralOptimatum',
        link: 'https://github.com/umbralOptimatum',
        image: 'https://avatars.githubusercontent.com/u/12092270?v=4',
    },
    {
        resources: [
            9,
        ],
        name: 'xslk',
        link: 'https://github.com/xslk',
        image: 'https://avatars.githubusercontent.com/u/100386196?v=4',
    },
    {
        resources: [
            8,
        ],
        name: 'CooldudeOmega',
        link: 'https://github.com/CooldudeOmega',
        image: 'https://avatars.githubusercontent.com/u/101759306?v=4',
    },
    {
        resources: [
            8,
        ],
        name: 'unclebanks',
        link: 'https://github.com/unclebanks',
        image: 'https://avatars.githubusercontent.com/u/49108377?v=4',
    },
    {
        resources: [
            7,
        ],
        name: 'HyruleTeam64',
        link: 'https://github.com/HyruleTeam64',
        image: 'https://avatars.githubusercontent.com/u/106347315?v=4',
    },
    {
        resources: [
            7,
        ],
        name: 'IanWalder',
        link: 'https://github.com/IanWalder',
        image: 'https://avatars.githubusercontent.com/u/76807453?v=4',
    },
    {
        resources: [
            7,
        ],
        name: 'JapuDCret',
        link: 'https://github.com/JapuDCret',
        image: 'https://avatars.githubusercontent.com/u/14893450?v=4',
    },
    {
        resources: [
            7,
        ],
        name: 'Leafsw0rd',
        link: 'https://github.com/Leafsw0rd',
        image: 'https://avatars.githubusercontent.com/u/27202133?v=4',
    },
    {
        resources: [
            7,
        ],
        name: 'morcousw',
        link: 'https://github.com/morcousw',
        image: 'https://avatars.githubusercontent.com/u/819898?v=4',
    },
    {
        resources: [
            6,
        ],
        name: 'arduousFrivolity',
        link: 'https://github.com/arduousFrivolity',
        image: 'https://avatars.githubusercontent.com/u/112739771?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'DreamNya',
        link: 'https://github.com/DreamNya',
        image: 'https://avatars.githubusercontent.com/u/34838824?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'jaahay',
        link: 'https://github.com/jaahay',
        image: 'https://avatars.githubusercontent.com/u/10636658?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'jameswasson',
        link: 'https://github.com/jameswasson',
        image: 'https://avatars.githubusercontent.com/u/7018593?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'Quindon',
        link: 'https://github.com/Quindon',
        image: 'https://avatars.githubusercontent.com/u/51273302?v=4',
    },
    {
        resources: [
            4,
        ],
        name: 'kushpatel0703',
        link: 'https://github.com/kushpatel0703',
        image: 'https://avatars.githubusercontent.com/u/44878521?v=4',
    },
    {
        resources: [
            4,
        ],
        name: 'pjeanjean',
        link: 'https://github.com/pjeanjean',
        image: 'https://avatars.githubusercontent.com/u/7363343?v=4',
    },
    {
        resources: [
            4,
        ],
        name: 'lenormandSeb',
        link: 'https://github.com/lenormandSeb',
        image: 'https://avatars.githubusercontent.com/u/58883370?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'Awec4',
        link: 'https://github.com/Awec4',
        image: 'https://avatars.githubusercontent.com/u/20971496?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'Farigh',
        link: 'https://github.com/Farigh',
        image: 'https://avatars.githubusercontent.com/u/11090416?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'Dragonchitos',
        link: 'https://github.com/Dragonchitos',
        image: 'https://avatars.githubusercontent.com/u/107852760?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'GLoarer',
        link: 'https://github.com/GLoarer',
        image: 'https://avatars.githubusercontent.com/u/63751230?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'Arkive86',
        link: 'https://github.com/Arkive86',
        image: 'https://avatars.githubusercontent.com/u/43861728?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'Razorflamekun',
        link: 'https://github.com/Razorflamekun',
        image: 'https://avatars.githubusercontent.com/u/53189811?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'adapap',
        link: 'https://github.com/adapap',
        image: 'https://avatars.githubusercontent.com/u/19696846?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'AevitasDragonkin',
        link: 'https://github.com/AevitasDragonkin',
        image: 'https://avatars.githubusercontent.com/u/77356760?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'BaileyP2SR',
        link: 'https://github.com/BaileyP2SR',
        image: 'https://avatars.githubusercontent.com/u/82694334?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'FredisonP',
        link: 'https://github.com/FredisonP',
        image: 'https://avatars.githubusercontent.com/u/94978719?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'AbstractBeliefs',
        link: 'https://github.com/AbstractBeliefs',
        image: 'https://avatars.githubusercontent.com/u/1375203?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'Gameonlp',
        link: 'https://github.com/Gameonlp',
        image: 'https://avatars.githubusercontent.com/u/5724808?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'Penguindude2000',
        link: 'https://github.com/Penguindude2000',
        image: 'https://avatars.githubusercontent.com/u/80924419?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'TheRealJoeFriel',
        link: 'https://github.com/TheRealJoeFriel',
        image: 'https://avatars.githubusercontent.com/u/32469171?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'switchlove',
        link: 'https://github.com/switchlove',
        image: 'https://avatars.githubusercontent.com/u/24837595?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'Alderi-Tokori',
        link: 'https://github.com/Alderi-Tokori',
        image: 'https://avatars.githubusercontent.com/u/26024673?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'YetiSpaghetti',
        link: 'https://github.com/YetiSpaghetti',
        image: 'https://avatars.githubusercontent.com/u/14989011?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'kittenchilly',
        link: 'https://github.com/kittenchilly',
        image: 'https://avatars.githubusercontent.com/u/23617175?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'mog-kupo',
        link: 'https://github.com/mog-kupo',
        image: 'https://avatars.githubusercontent.com/u/72212222?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'shallotmama',
        link: 'https://github.com/shallotmama',
        image: 'https://avatars.githubusercontent.com/u/54243859?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'zyx-xyzzy',
        link: 'https://github.com/zyx-xyzzy',
        image: 'https://avatars.githubusercontent.com/u/106144712?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Oyne',
        link: 'https://github.com/Oyne',
        image: 'https://avatars.githubusercontent.com/u/91478447?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'ANKouwenhoven',
        link: 'https://github.com/ANKouwenhoven',
        image: 'https://avatars.githubusercontent.com/u/4013270?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Hawkinou',
        link: 'https://github.com/Hawkinou',
        image: 'https://avatars.githubusercontent.com/u/9532073?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Basic-Person',
        link: 'https://github.com/Basic-Person',
        image: 'https://avatars.githubusercontent.com/u/90328949?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Daniferrito',
        link: 'https://github.com/Daniferrito',
        image: 'https://avatars.githubusercontent.com/u/2537742?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'DeanAyalon',
        link: 'https://github.com/DeanAyalon',
        image: 'https://avatars.githubusercontent.com/u/19843319?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Dobbykroket',
        link: 'https://github.com/Dobbykroket',
        image: 'https://avatars.githubusercontent.com/u/39363726?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Ash031',
        link: 'https://github.com/Ash031',
        image: 'https://avatars.githubusercontent.com/u/17141421?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'jonatjano',
        link: 'https://github.com/jonatjano',
        image: 'https://avatars.githubusercontent.com/u/17279801?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Kasci',
        link: 'https://github.com/Kasci',
        image: 'https://avatars.githubusercontent.com/u/6670685?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'silasary',
        link: 'https://github.com/silasary',
        image: 'https://avatars.githubusercontent.com/u/194254?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'kschillz',
        link: 'https://github.com/kschillz',
        image: 'https://avatars.githubusercontent.com/u/857442?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Lear85',
        link: 'https://github.com/Lear85',
        image: 'https://avatars.githubusercontent.com/u/3744949?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'LegitSi',
        link: 'https://github.com/LegitSi',
        image: 'https://avatars.githubusercontent.com/u/44820309?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'UnicornSnuggler',
        link: 'https://github.com/UnicornSnuggler',
        image: 'https://avatars.githubusercontent.com/u/10764837?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'oohwooh',
        link: 'https://github.com/oohwooh',
        image: 'https://avatars.githubusercontent.com/u/11283815?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'LoickMunoz',
        link: 'https://github.com/LoickMunoz',
        image: 'https://avatars.githubusercontent.com/u/1812550?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Mcheung7272',
        link: 'https://github.com/Mcheung7272',
        image: 'https://avatars.githubusercontent.com/u/70357013?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'MatthieuMesnager',
        link: 'https://github.com/MatthieuMesnager',
        image: 'https://avatars.githubusercontent.com/u/38081186?v=4',
    },
].map((c) => {
    SeededRand.seed(parseInt(c.name, 36));
    // eslint-disable-next-line no-param-reassign
    c.image = c.image ?? `assets/images/profile/trainer-${SeededRand.intBetween(0, Profile.MAX_TRAINER - 1)}.png`;
    return c;
});
