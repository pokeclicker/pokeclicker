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
        name: 'Beliot419',
        link: 'https://www.deviantart.com/beliot419',
        image: 'https://a.deviantart.net/avatars-big/b/e/beliot419.png',
        resources: [
            'Acerola',
            'Aether Branch Chief Faba',
            'Aether Foundation Employee (female)',
            'Aether Foundation Employee (male)',
            'Aether President Lusamine',
            'Hala',
            'Hapu',
            'Hau',
            'Ilima',
            'Kahili',
            'Kiawe',
            'Lana',
            'Mallow',
            'Mina',
            'Molayne',
            'Nanu',
            'Olivia',
            'Rising Star (male)',
            'Sightseer (female)',
            'Sophocles',
            'Team Skull Boss (guzma)',
            'Youth Athlete (female)',
        ],
        // Notes: Found in spritesheet description: "Feel free to use them, just give me credit."
    },
    {
        name: 'Croak',
        link: 'https://discordapp.com/users/206839451069054976/',
        resources: [
            'Plasma Frigate overworld sprite',
        ],
        // Notes: Made specifically for PokéClicker."
    },
    {
        name: 'DaleArwin',
        link: 'https://www.deviantart.com/dalearwin',
        resources: [
            'Aether Foundation Employee (masked)',
            'Artist (male)',
            'Brains & Brawn',
            'Dancer (female)',
            'Golfer',
            'Surfer',
            'Team Flare Grunts',
        ],
        // Notes: DaleArwin aka IanWalder, a GitHub contributor to this project, gives his permission
    },
    {
        name: 'Drawnamu',
        link: 'https://www.deviantart.com/drawnamu',
        image: 'https://a.deviantart.net/avatars-big/d/r/drawnamu.png',
        resources: [
            'Bea',
            'Bede',
            'Gordie',
            'Kabu',
            'Klara',
            'Marnie',
            'Mustard',
            'Nessa',
            'Opal',
            'Raihan',
        ],
        // NOTES: Gives permission to everyone who asks in the comments section of the spritesheet as long as credit is given
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
        name: 'Gnomowladny',
        link: 'https://www.deviantart.com/gnomowladny',
        image: 'https://a.deviantart.net/avatars-big/g/n/gnomowladny.gif',
        resources: [
            'Clemont',
            'Drasna',
            'Korrina',
            'Malva',
            'Onympia',
            'Piers',
            'Ramos',
            'Siebold',
            'Team Flare Bryony',
            'Valerie',
            'Viola',
            'Wikstrom',
            'Wulfric',
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
        name: 'JapuDCret',
        link: 'https://github.com/JapuDCret',
        image: 'https://avatars.githubusercontent.com/u/14893450?v=4',
        resources: [
            'Egg Hunter',
            'Surprise Togepi',
        ],
        // NOTES: Permission given via PRs
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
            'Fairy Tale Girl',
            'Hex Maniac',
            'Punk Girl',
            'Punk Guy',
            'Sightseer (male)',
            'Sky Trainer (female)',
            'Sky Trainer (male)',
            'Tourist (female)',
            'Tourist (male)',
        ],
        // Notes: Permission given on image page if credited.
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
        link: 'https://github.com/NiCeDiCe90',
        resources: [
            'Red Spearow',
            'shiny Totem Ribombee',
            'Weather Institute world sprite',
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
        name: 'procompyart',
        link: 'https://www.instagram.com/procompyart/',
        resources: [
            'Elf Munchlax',
            'Grinch Celebi',
        ],
        // Notes: Permission given via Discord #development-chat
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
        name: 'Smogon Sprite Project',
        link: 'https://www.smogon.com/forums/forums/smeargles-laptop.325/',
        resources: [
            'Alola Sprites',
            'Galar Sprites',
            'Kalos Sprites',
        ],
        // NOTES: free for non-profit use.
    },
    {
        name: 'tebited15',
        link: 'https://www.deviantart.com/tebited15',
        image: 'https://a.deviantart.net/avatars-big/t/e/tebited15.png',
        resources: [
            'Grant',
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
            1296,
        ],
        name: 'RedSparr0w',
        link: 'https://github.com/RedSparr0w',
        image: 'https://avatars.githubusercontent.com/u/7288322?v=4',
    },
    {
        resources: [
            694,
        ],
        name: 'Ishadijcks',
        link: 'https://github.com/Ishadijcks',
        image: 'https://avatars.githubusercontent.com/u/9715314?v=4',
    },
    {
        resources: [
            396,
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
            124,
        ],
        name: 'Ultima1990',
        link: 'https://github.com/Ultima1990',
        image: 'https://avatars.githubusercontent.com/u/69112975?v=4',
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
            53,
        ],
        name: 'Jaaslet',
        link: 'https://github.com/Jaaslet',
        image: 'https://avatars.githubusercontent.com/u/2961347?v=4',
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
        name: 'jk13pclick',
        link: 'https://github.com/jk13pclick',
        image: 'https://avatars.githubusercontent.com/u/83479938?v=4',
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
        name: 'tkatchen',
        link: 'https://github.com/tkatchen',
        image: 'https://avatars.githubusercontent.com/u/26515965?v=4',
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
        name: 'amative1',
        link: 'https://github.com/amative1',
        image: 'https://avatars.githubusercontent.com/u/14666630?v=4',
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
            14,
        ],
        name: 'Mephistic',
        link: 'https://github.com/Mephistic',
        image: 'https://avatars.githubusercontent.com/u/2694761?v=4',
    },
    {
        resources: [
            14,
        ],
        name: 'NiCeDiCe90',
        link: 'https://github.com/NiCeDiCe90',
        image: 'https://avatars.githubusercontent.com/u/82889773?v=4',
    },
    {
        resources: [
            14,
        ],
        name: 'PixLSteam',
        link: 'https://github.com/PixLSteam',
        image: 'https://avatars.githubusercontent.com/u/21047644?v=4',
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
        name: 'dependabot[bot]',
        link: 'https://github.com/apps/dependabot',
        image: 'https://avatars.githubusercontent.com/in/29110?v=4',
    },
    {
        resources: [
            8,
        ],
        name: 'Symi001',
        link: 'https://github.com/Symi001',
        image: 'https://avatars.githubusercontent.com/u/86664830?v=4',
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
            5,
        ],
        name: 'DaveYognaught',
        link: 'https://github.com/DaveYognaught',
        image: 'https://avatars.githubusercontent.com/u/58609098?v=4',
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
        name: 'jaahay',
        link: 'https://github.com/jaahay',
        image: 'https://avatars.githubusercontent.com/u/10636658?v=4',
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
            3,
        ],
        name: 'CorgiOnNeptune',
        link: 'https://github.com/CorgiOnNeptune',
        image: 'https://avatars.githubusercontent.com/u/104700780?v=4',
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
        name: 'Awec4',
        link: 'https://github.com/Awec4',
        image: 'https://avatars.githubusercontent.com/u/20971496?v=4',
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
        name: 'Penguindude2000',
        link: 'https://github.com/Penguindude2000',
        image: 'https://avatars.githubusercontent.com/u/80924419?v=4',
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
        name: 'mog-kupo',
        link: 'https://github.com/mog-kupo',
        image: 'https://avatars.githubusercontent.com/u/72212222?v=4',
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
        name: 'Ash031',
        link: 'https://github.com/Ash031',
        image: 'https://avatars.githubusercontent.com/u/17141421?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'FredisonP',
        link: 'https://github.com/FredisonP',
        image: 'https://avatars.githubusercontent.com/u/94978719?v=4',
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
        name: 'LoickMunoz',
        link: 'https://github.com/LoickMunoz',
        image: 'https://avatars.githubusercontent.com/u/1812550?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'MatthieuMesnager',
        link: 'https://github.com/MatthieuMesnager',
        image: 'https://avatars.githubusercontent.com/u/38081186?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'MrGrote',
        link: 'https://github.com/MrGrote',
        image: 'https://avatars.githubusercontent.com/u/18028309?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'Qwertypop04',
        link: 'https://github.com/Qwertypop04',
        image: 'https://avatars.githubusercontent.com/u/63805905?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'RichardPaulAstley',
        link: 'https://github.com/RichardPaulAstley',
        image: 'https://avatars.githubusercontent.com/u/25870563?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'fadedrob',
        link: 'https://github.com/fadedrob',
        image: 'https://avatars.githubusercontent.com/u/24292240?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'RobinLaevaert',
        link: 'https://github.com/RobinLaevaert',
        image: 'https://avatars.githubusercontent.com/u/33598142?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'greeny',
        link: 'https://github.com/greeny',
        image: 'https://avatars.githubusercontent.com/u/3734204?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'ValorBeastFlame',
        link: 'https://github.com/ValorBeastFlame',
        image: 'https://avatars.githubusercontent.com/u/86545048?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'yannhodiesne',
        link: 'https://github.com/yannhodiesne',
        image: 'https://avatars.githubusercontent.com/u/56298263?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'zarunet',
        link: 'https://github.com/zarunet',
        image: 'https://avatars.githubusercontent.com/u/43345608?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'aufde',
        link: 'https://github.com/aufde',
        image: 'https://avatars.githubusercontent.com/u/2595247?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'benanderson1',
        link: 'https://github.com/benanderson1',
        image: 'https://avatars.githubusercontent.com/u/20519698?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'catie-cat-3183',
        link: 'https://github.com/catie-cat-3183',
        image: 'https://avatars.githubusercontent.com/u/46425941?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'jmcclain1299',
        link: 'https://github.com/jmcclain1299',
        image: 'https://avatars.githubusercontent.com/u/48395205?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'liczale',
        link: 'https://github.com/liczale',
        image: 'https://avatars.githubusercontent.com/u/72051633?v=4',
    },
    {
        resources: [
            1,
        ],
        name: 'nathan-c-jones',
        link: 'https://github.com/nathan-c-jones',
        image: 'https://avatars.githubusercontent.com/u/15986126?v=4',
    },
].map((c) => {
    SeededRand.seed(parseInt(c.name, 36));
    // eslint-disable-next-line no-param-reassign
    c.image = c.image ?? `assets/images/profile/trainer-${SeededRand.intBetween(0, Profile.MAX_TRAINER - 1)}.png`;
    return c;
});
