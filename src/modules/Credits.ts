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
        name: 'DaleArwin',
        link: 'https://www.deviantart.com/dalearwin',
        resources: [
            'Team Flare Grunt Duo',
            'Brains & Brawn',
            'Surfer',
            'Golfer',
        ],
    },
    {
        name: 'EmmaRoak',
        link: 'https://www.deviantart.com/emmaroak',
        image: 'https://a.deviantart.net/avatars-big/e/m/emmaroak.png',
        resources: [
            'Charmander (clone)',
            'Charmeleon (clone)',
            'Charizard (clone)',
            'Squirtle (clone)',
            'Wartortle (clone)',
            'Blastoise (clone)',
            'Bulbasaur (clone)',
            'Ivysaur (clone)',
            'Venusaur (clone)',
        ],
        // NOTES: No notes about credit, have messaged asking for permission, awaiting confirmation
    },
    {
        name: 'Gnomowladny',
        link: 'https://www.deviantart.com/gnomowladny',
        image: 'https://a.deviantart.net/avatars-big/g/n/gnomowladny.gif',
        resources: [
            'Team Flare Bryony',
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
        name: 'Krokotips',
        link: 'https://www.deviantart.com/krokotips',
        resources: [
            'Team Flare Celosia',
            'Team Flare Mable',
        ],
        // NOTES: No notes about credit, have messaged asking for permission, awaiting confirmation
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
        name: 'RedSparr0w',
        link: 'https://api.github.com/users/RedSparr0w',
        image: 'https://avatars.githubusercontent.com/u/7288322?v=4',
        resources: [
            'Let\'s Go Eevee',
            'Let\'s Go Pikachu',
            'Santa Snorlax',
            'Spooky Togepi',
            'Spooky Bulbasaur',
            'Pikachu (Gengar)',
        ],
    },
    {
        name: 'Smogon Sprite Project',
        link: 'https://www.smogon.com/forums/forums/smeargles-laptop.325/',
        resources: [
            'Kalos Sprites',
            'Alola Sprites',
            'Galar Sprites',
        ],
        // NOTES: free for non-profit use.
    },
    {
        name: 'torqupine',
        link: 'https://www.deviantart.com/torqupine',
        image: 'https://a.deviantart.net/avatars-big/t/o/torqupine.png',
        resources: [
            'Team Flare Grunt (male)',
            'Team Flare Grunt (female)',
        ],
        // NOTES: No notes about credit, have messaged asking for permission, awaiting confirmation
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
fetch(`https://api.github.com/repos/pokeclicker/pokeclicker/contributors`).then(async res => {
    const json = await res.json();
    console.log(json.map(c => `    {
        resources: [
            ${c.contributions},
        ],
        name: '${c.login}',
        link: '${c.url}',
        image: '${c.avatar_url}',
    },`).join('\n'));
})
*/
export const CodeCredits: Credit[] = [
    {
        resources: [
            1147,
        ],
        name: 'RedSparr0w',
        link: 'https://api.github.com/users/RedSparr0w',
        image: 'https://avatars.githubusercontent.com/u/7288322?v=4',
    },
    {
        resources: [
            694,
        ],
        name: 'Ishadijcks',
        link: 'https://api.github.com/users/Ishadijcks',
        image: 'https://avatars.githubusercontent.com/u/9715314?v=4',
    },
    {
        resources: [
            390,
        ],
        name: 'dennism1997',
        link: 'https://api.github.com/users/dennism1997',
        image: 'https://avatars.githubusercontent.com/u/8763360?v=4',
    },
    {
        resources: [
            64,
        ],
        name: 'fujnw',
        link: 'https://api.github.com/users/fujnw',
        image: 'https://avatars.githubusercontent.com/u/36806183?v=4',
    },
    {
        resources: [
            60,
        ],
        name: 'Aegyo',
        link: 'https://api.github.com/users/Aegyo',
        image: 'https://avatars.githubusercontent.com/u/4183969?v=4',
    },
    {
        resources: [
            51,
        ],
        name: 'BaineGames',
        link: 'https://api.github.com/users/BaineGames',
        image: 'https://avatars.githubusercontent.com/u/8126876?v=4',
    },
    {
        resources: [
            43,
        ],
        name: 'HLXII',
        link: 'https://api.github.com/users/HLXII',
        image: 'https://avatars.githubusercontent.com/u/33099029?v=4',
    },
    {
        resources: [
            42,
        ],
        name: 'Ultima1990',
        link: 'https://api.github.com/users/Ultima1990',
        image: 'https://avatars.githubusercontent.com/u/69112975?v=4',
    },
    {
        resources: [
            30,
        ],
        name: 'anapple96',
        link: 'https://api.github.com/users/anapple96',
        image: 'https://avatars.githubusercontent.com/u/62083669?v=4',
    },
    {
        resources: [
            28,
        ],
        name: 'tklaxbro',
        link: 'https://api.github.com/users/tklaxbro',
        image: 'https://avatars.githubusercontent.com/u/26515965?v=4',
    },
    {
        resources: [
            24,
        ],
        name: 'davmillar',
        link: 'https://api.github.com/users/davmillar',
        image: 'https://avatars.githubusercontent.com/u/576958?v=4',
    },
    {
        resources: [
            23,
        ],
        name: 'LuqDragon',
        link: 'https://api.github.com/users/LuqDragon',
        image: 'https://avatars.githubusercontent.com/u/27972070?v=4',
    },
    {
        resources: [
            21,
        ],
        name: 'SpenserJ',
        link: 'https://api.github.com/users/SpenserJ',
        image: 'https://avatars.githubusercontent.com/u/90011?v=4',
    },
    {
        resources: [
            17,
        ],
        name: 'walkerboh',
        link: 'https://api.github.com/users/walkerboh',
        image: 'https://avatars.githubusercontent.com/u/6124960?v=4',
    },
    {
        resources: [
            14,
        ],
        name: 'Mephistic',
        link: 'https://api.github.com/users/Mephistic',
        image: 'https://avatars.githubusercontent.com/u/2694761?v=4',
    },
    {
        resources: [
            13,
        ],
        name: 'PixLSteam',
        link: 'https://api.github.com/users/PixLSteam',
        image: 'https://avatars.githubusercontent.com/u/21047644?v=4',
    },
    {
        resources: [
            10,
        ],
        name: 'nls0',
        link: 'https://api.github.com/users/nls0',
        image: 'https://avatars.githubusercontent.com/u/41541662?v=4',
    },
    {
        resources: [
            10,
        ],
        name: 'jk13pclick',
        link: 'https://api.github.com/users/jk13pclick',
        image: 'https://avatars.githubusercontent.com/u/83479938?v=4',
    },
    {
        resources: [
            9,
        ],
        name: 'KrushGames',
        link: 'https://api.github.com/users/KrushGames',
        image: 'https://avatars.githubusercontent.com/u/71728117?v=4',
    },
    {
        resources: [
            8,
        ],
        name: 'unclebanks',
        link: 'https://api.github.com/users/unclebanks',
        image: 'https://avatars.githubusercontent.com/u/49108377?v=4',
    },
    {
        resources: [
            7,
        ],
        name: 'dependabot[bot]',
        link: 'https://api.github.com/users/dependabot%5Bbot%5D',
        image: 'https://avatars.githubusercontent.com/in/29110?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'DaveYognaught',
        link: 'https://api.github.com/users/DaveYognaught',
        image: 'https://avatars.githubusercontent.com/u/58609098?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'jameswasson',
        link: 'https://api.github.com/users/jameswasson',
        image: 'https://avatars.githubusercontent.com/u/7018593?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'NiCeDiCe90',
        link: 'https://api.github.com/users/NiCeDiCe90',
        image: 'https://avatars.githubusercontent.com/u/82889773?v=4',
    },
    {
        resources: [
            5,
        ],
        name: 'Quindon',
        link: 'https://api.github.com/users/Quindon',
        image: 'https://avatars.githubusercontent.com/u/51273302?v=4',
    },
    {
        resources: [
            4,
        ],
        name: 'jaahay',
        link: 'https://api.github.com/users/jaahay',
        image: 'https://avatars.githubusercontent.com/u/10636658?v=4',
    },
    {
        resources: [
            4,
        ],
        name: 'kushpatel0703',
        link: 'https://api.github.com/users/kushpatel0703',
        image: 'https://avatars.githubusercontent.com/u/44878521?v=4',
    },
    {
        resources: [
            3,
        ],
        name: 'amative1',
        link: 'https://api.github.com/users/amative1',
        image: 'https://avatars.githubusercontent.com/u/14666630?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'adapap',
        link: 'https://api.github.com/users/adapap',
        image: 'https://avatars.githubusercontent.com/u/19696846?v=4',
    },
    {
        resources: [
            2,
        ],
        name: 'Awec4',
        link: 'https://api.github.com/users/Awec4',
        image: 'https://avatars.githubusercontent.com/u/20971496?v=4',
    },
].map((c) => {
    SeededRand.seed(parseInt(c.name, 36));
    // eslint-disable-next-line no-param-reassign
    c.image = c.image ?? `assets/images/profile/trainer-${SeededRand.intBetween(0, Profile.MAX_TRAINER - 1)}.png`;
    return c;
});
