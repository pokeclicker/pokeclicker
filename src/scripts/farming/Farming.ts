/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: Berry[] = [];
    mutations: Mutation[] = [];

    externalAuras: KnockoutObservable<number>[];

    counter = 0;

    readonly AMOUNT_OF_PLOTS = 25;

    static readonly PLOT_WIDTH = 5;

    defaults = {
        berryList: Array<number>(GameHelper.enumLength(BerryType) - 1).fill(0),
        unlockedBerries: Array<boolean>(GameHelper.enumLength(BerryType) - 1).fill(false),
        mulchList: Array<number>(GameHelper.enumLength(MulchType)).fill(0),
        plotList: new Array(this.AMOUNT_OF_PLOTS).fill(null).map(function (value, index) {
            return new Plot(index === 0, BerryType.None, 0, MulchType.None, 0);
        }),
    };

    berryList: KnockoutObservable<number>[];
    unlockedBerries: KnockoutObservable<boolean>[];
    mulchList: KnockoutObservable<number>[];
    plotList: Array<Plot>;

    highestUnlockedBerry: KnockoutComputed<number>;

    constructor() {
        this.berryList = this.defaults.berryList.map((v) => ko.observable<number>(v));
        this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        this.plotList = this.defaults.plotList;

        this.externalAuras = [];
        this.externalAuras[AuraType.Attract] = ko.observable<number>(1);
        this.externalAuras[AuraType.Egg] = ko.observable<number>(1);

        this.highestUnlockedBerry = ko.pureComputed(() => {
            for (let i = GameHelper.enumLength(BerryType) - 2;i >= 0;i--) {
                if (this.unlockedBerries[i]()) {
                    return i;
                }
            }
            return 0;
        });
    }

    initialize(): void {

        //#region Berry Data

        //#region First Generation
        this.berryData[BerryType.Cheri]     = new Berry(BerryType.Cheri,    [5,10,20,30,60],
            2, 0.5, 5,
            [10, 0, 0, 0, 0], BerryColor.Red,
            ['This bright red Berry is very spicy and has a provocative flavor. It blooms with delicate, pretty flowers.']);
        this.berryData[BerryType.Chesto]    = new Berry(BerryType.Chesto,   [5,15,25,40,80],
            3, 0.5, 6,
            [0, 10, 0, 0, 0], BerryColor.Purple,
            ['This Berry\'s thick skin and fruit are very tough and dry tasting. However, every bit of it can be eaten.']);
        this.berryData[BerryType.Pecha]     = new Berry(BerryType.Pecha,    [10,35,50,60,120],
            3, 0.4, 7,
            [0, 0, 10, 0, 0], BerryColor.Pink,
            ['Because of its hollow inside pocket, there isn\'t a lot to eat. What can be eaten is very sweet and delicious']);
        this.berryData[BerryType.Rawst]     = new Berry(BerryType.Rawst,    [15,30,45,80,160],
            4, 0.4, 8,
            [0, 0, 0, 10, 0], BerryColor.Green,
            ['If the leaves grow longer and curlier than average, this Berry will have a somewhat-bitter taste.']);
        this.berryData[BerryType.Aspear]    = new Berry(BerryType.Aspear,   [10,40,50,110,220],
            4, 0.3, 9,
            [0, 0, 0, 0, 10], BerryColor.Yellow,
            ['This Berry\'s peel is hard, but the flesh inside is very juicy. It is distinguished by its bracing sourness.']);
        this.berryData[BerryType.Leppa]     = new Berry(BerryType.Leppa,    [100,120,140,240,480],
            5, 0.3, 10,
            [10, 0, 10, 10, 10], BerryColor.Red,
            ['It takes longer to grow than Berries such as Cheri. The smaller Berries taste better.']);
        this.berryData[BerryType.Oran]      = new Berry(BerryType.Oran,     [120,180,240,300,600],
            6, 0.2, 20,
            [10, 10, 0, 10, 10], BerryColor.Blue,
            ['Nature\'s gifts came together as one in this Berry. It has a wondrous mix of flavors that spread in the mouth.']);
        this.berryData[BerryType.Sitrus]    = new Berry(BerryType.Sitrus,   [150,300,450,600,1200],
            8, 0.2, 30,
            [0, 10, 10, 10, 10], BerryColor.Yellow,
            ['Sitrus came from the same family as Oran. It is larger and smoother tasting than Oran.']);
        //#endregion

        //#region Second Generation
        this.berryData[BerryType.Persim]    = new Berry(BerryType.Persim,   [20,40,60,90,180],
            5, 0.2, 40,
            [10, 10, 10, 0, 10], BerryColor.Pink,
            ['The more this Berry absorbs energy from sunlight, the more vivdly colorful it grows.']);
        this.berryData[BerryType.Razz]      = new Berry(BerryType.Razz,     [100,150,200,250,500],
            15, 0.2, 50,
            [10, 10, 0, 0, 0], BerryColor.Red,
            ['A small hint of spiciness lingers in the red granules surrounding this Berry. Their centers have a dry taste.']);
        this.berryData[BerryType.Bluk]      = new Berry(BerryType.Bluk,     [200,250,300,330,660],
            20, 0.2, 60,
            [0, 10, 10, 0, 0], BerryColor.Purple,
            ['Though this small, delicately skinned Berry is blue in color, it dyes the mouth black when eaten.']);
        this.berryData[BerryType.Nanab]     = new Berry(BerryType.Nanab,    [25,30,35,250,500],
            11, 0.2, 70,
            [0, 0, 10, 10, 0], BerryColor.Pink,
            ['Bitter, but with a trace of sweetness, the Nanab Berry was the seventh to be discovered in the world.']);
        this.berryData[BerryType.Wepear]    = new Berry(BerryType.Wepear,   [150,350,335,400,800],
            18, 0.2, 80,
            [0, 0, 0, 10, 10], BerryColor.Green,
            ['The potent mix of bitter and sour in this Berry seems to promote digestion. The flower is white and beautiful.']);
        this.berryData[BerryType.Pinap]     = new Berry(BerryType.Pinap,    [30,60,180,240,480],
            9, 0.2, 90,
            [10, 0, 0, 0, 10], BerryColor.Yellow,
            ['It is said that when the sour skin is peeled, this spicy Berry can be crushed to make medicine.']);

        this.berryData[BerryType.Figy]      = new Berry(BerryType.Figy,     [40,160,230,350,700],
            16, 0.15, 100,
            [15, 0, 0, 0, 0], BerryColor.Red,
            ['This Berry is oddly shaped, appearing as if someone took a bite out of it. It is packed full of spicy substances.']);
        this.berryData[BerryType.Wiki]      = new Berry(BerryType.Wiki,     [40,190,210,360,720],
            17, 0.15, 110,
            [0, 15, 0, 0, 0], BerryColor.Purple,
            ['It is said that this Berry grew lumps to help Pokémon grip it, allowing propagation farther afield.']);
        this.berryData[BerryType.Mago]      = new Berry(BerryType.Mago,     [40,180,240,370,740],
            18, 0.15, 120,
            [0, 0, 15, 0, 0], BerryColor.Pink,
            ['This Berry progressively curves as it grows. The curvier the Berry, the sweeter and tastier.']);
        this.berryData[BerryType.Aguav]     = new Berry(BerryType.Aguav,    [40,170,220,350,700],
            19, 0.15, 130,
            [0, 0, 0, 15, 0], BerryColor.Green,
            ['This Berry turns bitter toward the stem. The dainty flower it grows from doesn\'t absorb much sunlight.']);
        this.berryData[BerryType.Iapapa]    = new Berry(BerryType.Iapapa,   [40,200,230,380,760],
            20, 0.15, 140,
            [0, 0, 0, 0, 15], BerryColor.Yellow,
            ['This Berry is very big and sour. The juiciness of the pulp accentuates the sourness.']);

        this.berryData[BerryType.Lum]       = new Berry(BerryType.Lum,      [970,980,990,1000,2000],
            2, 0, 750,
            [10, 10, 10, 10, 0], BerryColor.Green,
            [
                'This Berry\'s gradual process of storing nutrients beneficial to Pokémon health causes it to mature slowly.',
                'This Berry minorly promotes the growth of Berry plants around it.',
            ], new Aura(AuraType.Growth, [1.01, 1.02, 1.03]));
        //#endregion

        //#region Third Generation
        this.berryData[BerryType.Pomeg]     = new Berry(BerryType.Pomeg,    [110, 510, 890, 900, 1800],
            20, 0.1, 200,
            [10, 0, 10, 10, 0], BerryColor.Red,
            ['When this sweetly spicy Berry\'s thick skin is peeled, many pieces of the fruit spill out.']);
        this.berryData[BerryType.Kelpsy]    = new Berry(BerryType.Kelpsy,   [170, 710, 990, 1000, 2000],
            29, 0.1, 250,
            [0, 10, 0, 10, 10], BerryColor.Blue,
            ['This Berry can be eaten as is or boiled to obtain an extract that adds a dash of flavor to food.']);
        this.berryData[BerryType.Qualot]    = new Berry(BerryType.Qualot,   [430, 640, 730, 1200, 2400],
            25, 0.1, 300,
            [10, 0, 10, 0, 10], BerryColor.Yellow,
            ['Even in places of constant rain and high humidity, this Berry\'s plant grows healthy and strong.']);
        this.berryData[BerryType.Hondew]    = new Berry(BerryType.Hondew,   [310, 3630, 4880, 5000, 10000],
            26, 0.1, 2500,
            [10, 10, 0, 10, 0], BerryColor.Green,
            ['This somewhat-rare Berry projects an image of luxury, so it is favored as a gift item.']);
        this.berryData[BerryType.Grepa]     = new Berry(BerryType.Grepa,    [300, 450, 1190, 1300, 2600],
            14, 0.1, 400,
            [0, 10, 10, 0, 10], BerryColor.Yellow,
            ['One bite of this very tender Berry fills the mouth with its sweet and tangy flavor.']);
        this.berryData[BerryType.Tamato]    = new Berry(BerryType.Tamato,   [180, 560, 1060, 1100, 2200],
            15, 0.1, 410,
            [20, 10, 0, 0, 0], BerryColor.Red,
            ['This Berry is large and spicy. When eaten during the cold season, it warms the body from inside.']);

        this.berryData[BerryType.Cornn]     = new Berry(BerryType.Cornn,    [350, 780, 1300, 1800, 3600],
            16, 0.05, 500,
            [0, 20, 10, 0, 0], BerryColor.Purple,
            ['Its dryness is quite strong. As a result, its true deliciousness can\'t be appreciated by just eating one or two.']);
        this.berryData[BerryType.Magost]    = new Berry(BerryType.Magost,   [460, 810, 1370, 2500, 5000],
            17, 0.05, 550,
            [0, 0, 20, 10, 0], BerryColor.Pink,
            ['The grown-up flavor and dreamy sweetness of this Berry make it a favorite of Pokémon everywhere.']);
        this.berryData[BerryType.Rabuta]    = new Berry(BerryType.Rabuta,   [130, 1100, 1990, 2000, 4000],
            18, 0.05, 600,
            [0, 0, 0, 20, 10], BerryColor.Green,
            ['Even though it is bitter, it should be eaten peel and all. The hair on the peel cleans the stomach from the inside.']);
        this.berryData[BerryType.Nomel]     = new Berry(BerryType.Nomel,    [360, 1000, 1620, 2600, 5200],
            19, 0.05, 650,
            [10, 0, 0, 0, 20], BerryColor.Yellow,
            ['This Berry is quite sour overall, with the sourness especially concentrated at the pointed end.']);
        this.berryData[BerryType.Spelon]    = new Berry(BerryType.Spelon,   [360, 980, 1610, 2300, 4600],
            20, 0.05, 700,
            [30, 10, 0, 0, 0], BerryColor.Red,
            ['So spicy is the Spelon Berry that, Fire type or not, Pokémon will try to breathe fire after eating a single one.']);
        this.berryData[BerryType.Pamtre]    = new Berry(BerryType.Pamtre,   [460, 1250, 2680, 3000, 6000],
            21, 0.05, 750,
            [0, 30, 10, 0, 0], BerryColor.Purple,
            ['This Berry drifted from a faraway sea. It is now cultivated in the Sinnoh region.']);
        this.berryData[BerryType.Watmel]    = new Berry(BerryType.Watmel,   [310, 1350, 2340, 2700, 5400],
            22, 0.05, 800,
            [0, 0, 30, 10, 0], BerryColor.Pink,
            ['A bounty of nature that is exceedingly sweet. The Berry is huge, with some discovered that exceed 20 inches.']);
        this.berryData[BerryType.Durin]     = new Berry(BerryType.Durin,    [150, 1130, 2480, 3100, 6200],
            23, 0.05, 850,
            [0, 0, 0, 30, 10], BerryColor.Green,
            ['This Berry is tremendously bitter. Just one bite is enough to instantly stop hiccups.']);
        this.berryData[BerryType.Belue]     = new Berry(BerryType.Belue,    [300, 870, 960, 2200, 4400],
            24, 0.05, 900,
            [10, 0, 0, 0, 30], BerryColor.Purple,
            ['This glossy and colorful Berry has a mouthwateringly delicious appearance. However, it is awfully sour.']);
        //#endregion

        //#region Fourth Generation (Typed)
        this.berryData[BerryType.Occa]      = new Berry(BerryType.Occa,     [220, 1660, 2460, 3600, 7200],
            12, 0.03, 950,
            [15, 0, 10, 0, 0], BerryColor.Red,
            [
                'This Berry is said to have grown plentiful in the tropics of the past. It boasts an intensely hot spiciness.',
                'It has a tendency to overtake nearby plants.',
            ], undefined, ['Charmander']);
        this.berryData[BerryType.Passho]    = new Berry(BerryType.Passho,   [490, 2460, 4970, 6000, 12000],
            13, 0.03, 1000,
            [0, 15, 0, 10, 0], BerryColor.Blue,
            [
                'This Berry\'s flesh is dotted with countless tiny bubbles of air that keep it afloat in water.',
                'This Berry promotes the fruiting of nearby Berry plants.',
            ], new Aura(AuraType.Harvest, [1.2, 1.4, 1.6]), ['Totodile']);
        this.berryData[BerryType.Wacan]     = new Berry(BerryType.Wacan,    [180, 870, 940, 1800, 3600],
            9, 0.03, 1050,
            [0, 0, 15, 0, 10], BerryColor.Yellow,
            [
                'Energy from lightning strikes is drawn into the plant, making the Berries grow big and rich.',
                'The same energy promotes the growth of nearby Berries.',
            ], new Aura(AuraType.Growth, [1.2, 1.4, 1.6]), ['Pikachu']);
        this.berryData[BerryType.Rindo]     = new Berry(BerryType.Rindo,    [140, 1160, 2210, 2600, 5200],
            15, 0.03, 1100,
            [10, 0, 0, 15, 0], BerryColor.Green,
            [
                'This Berry has a disagreeable "green" flavor and scent typical of vegetables. It is rich in health-promoting fiber.',
                'It has a tendency to expand into nearby plots.',
            ], undefined, ['Treeko']);
        this.berryData[BerryType.Yache]     = new Berry(BerryType.Yache,    [680, 2700, 5280, 7000, 14000],
            16, 0.03, 4500,
            [0, 10, 0, 0, 15], BerryColor.Blue,
            [
                'This Berry has a refreshing flavor that strikes a good balance of dryness and sourness. It tastes better chilled.',
                'This Berry slows the growth of nearby Berries.',
            ], new Aura(AuraType.Growth, [0.9, 0.8, 0.7]), ['Snover']);
        this.berryData[BerryType.Chople]    = new Berry(BerryType.Chople,   [350, 2640, 4130, 4200, 8400],
            17, 0.03, 1200,
            [15, 0, 0, 10, 0], BerryColor.Red,
            [
                'This Berry contains a substance that generates heat. It can even heat up a chilly heart.',
                'Growing these Berries will promote Egg growth.',
            ], new Aura(AuraType.Egg, [1.1, 1.2, 1.3]), ['Riolu']);
        this.berryData[BerryType.Kebia]     = new Berry(BerryType.Kebia,    [150, 1400, 1600, 2000, 4000],
            11, 0.03, 500,
            [0, 15, 0, 0, 10], BerryColor.Green,
            [
                'This Berry is a brilliant green on the outside. Inside, it is packed with a dry-flavored, black-colored flesh.',
                'It has a tendency to overtake nearby plants.',
                'Due to its poisonous nature, it increases the chances of mutations near it.',
            ], new Aura(AuraType.Mutation, [1.2, 1.4, 1.6]), ['Gulpin']);
        this.berryData[BerryType.Shuca]     = new Berry(BerryType.Shuca,    [320, 3980, 6320, 8000, 16000],
            19, 0.03, 1300,
            [10, 0, 15, 0, 0], BerryColor.Yellow,
            [
                'The sweetness-laden pulp has just the hint of a hard-edged and fragrant bite to it.',
                'Growing these Berries will soften the ground around it, increasing the chances of replanting.',
            ], new Aura(AuraType.Replant, [1.2, 1.4, 1.6]), ['Larvitar']);
        this.berryData[BerryType.Coba]      = new Berry(BerryType.Coba,     [240, 1400, 2310, 3500, 7000],
            20, 0.03, 1350,
            [0, 10, 0, 15, 0], BerryColor.Blue,
            ['This Berry is said to be a new kind that is a cross of two Berries brought together by winds from far away.'],
            undefined, ['Tropius']);
        this.berryData[BerryType.Payapa]    = new Berry(BerryType.Payapa,   [270, 1630, 3670, 6500, 13000],
            21, 0.03, 1400,
            [0, 0, 10, 0, 15], BerryColor.Purple,
            [
                'This Berry is said to sense human emotions for the way it swells roundly when a person approaches.',
                'The same behavior affects nearby plants, causing additional mutations.',
            ], new Aura(AuraType.Mutation, [1.1, 1.2, 1.3]), ['Natu']);
        this.berryData[BerryType.Tanga]     = new Berry(BerryType.Tanga,    [420, 770, 1760, 2300, 4600],
            16, 0.03, 1100,
            [20, 0, 0, 0, 10], BerryColor.Green,
            [
                'The flower grows at the tip of this Berry. It attracts Bug Pokémon by letting its stringy petals stream out.',
                'The attracted Bug Pokémon decreases the amount of harvestable Berries in nearby plants',
            ], new Aura(AuraType.Harvest, [0.9, 0.8, 0.7]), ['Nincada']);
        this.berryData[BerryType.Charti]    = new Berry(BerryType.Charti,   [490, 3660, 4550, 9000, 18000],
            23, 0.03, 6000,
            [10, 20, 0, 0, 0], BerryColor.Yellow,
            [
                'It is often used for pickles because of its very dry flavor. It can also be eaten raw for its provocative taste.',
                'This Berry plant hardens the surrounding soil, decreasing the chances of replanting.',
            ], new Aura(AuraType.Replant, [0.9, 0.8, 0.7]), ['Sudowoodo']);
        this.berryData[BerryType.Kasib]     = new Berry(BerryType.Kasib,    [1000, 6370, 8580, 11000, 22000],
            24, 0.03, 1350,
            [0, 10, 20, 0, 0], BerryColor.Purple,
            [
                'Considered to have a special power from the olden days, this Berry is sometimes dried and used as a good-luck charm.',
                'Nearby Pokémon are wary of this Berry plant.',
            ], new Aura(AuraType.Attract, [0.9, 0.8, 0.7]), ['Shedinja']);
        this.berryData[BerryType.Haban]     = new Berry(BerryType.Haban,    [1300, 9870, 10200, 15000, 30000],
            25, 0.03, 15000,
            [0, 0, 10, 20, 0], BerryColor.Red,
            [
                'If a large enough volume of this Berry is boiled down, its bitterness fades away. It makes a good jam.',
                'This Berry requires a lot of energy to grow, stealing away nutrients from nearby plots.',
            ], new Aura(AuraType.Growth, [0.8, 0.6, 0.5]), ['Bagon']);
        this.berryData[BerryType.Colbur]    = new Berry(BerryType.Colbur,   [380, 3790, 4650, 5500, 11000],
            26, 0.03, 1650,
            [0, 0, 0, 10, 20], BerryColor.Purple,
            [
                'Tiny hooks grow on the surface of this Berry. It latches on to Pokémon so it can be carried to far-off places.',
                'It has a tendency to overtake nearby plants.',
            ], undefined, ['Absol']);
        this.berryData[BerryType.Babiri]    = new Berry(BerryType.Babiri,   [1210, 8630, 9410, 10000, 20000],
            27, 0.03, 3200,
            [25, 10, 0, 0, 0], BerryColor.Green,
            [
                'This Berry is very tough with a strong flavor. It was used to make medicine by people in the past.',
                'This Berry plant is very hardy and resistant, causing less mutations around it.',
            ], new Aura(AuraType.Mutation, [0.9, 0.8, 0.7]), ['Skarmory']);
        this.berryData[BerryType.Chilan]    = new Berry(BerryType.Chilan,   [240, 1430, 2970, 3200, 6400],
            17, 0.03, 1320,
            [0, 25, 10, 0, 0], BerryColor.Yellow,
            ['This Berry can be cored out and dried to make a whistle. Blowing through its hole makes an indescribable sound.']);
        this.berryData[BerryType.Roseli]    = new Berry(BerryType.Roseli,   [370, 3520, 4580, 5600, 11200],
            29, 0.03, 1800,
            [0, 0, 25, 10, 0], BerryColor.Pink,
            [
                'This Berry is sweet with a hint of bitterness and has a lingering sweet scent. It is often dried and used to make tea.',
                'The scent of this Berry plant attracts wild Pokémon.',
            ], new Aura(AuraType.Attract, [1.2, 1.4, 1.6]), ['Togepi']);
        //#endregion

        //#region Fifth Generation
        this.berryData[BerryType.Micle]     = new Berry(BerryType.Micle,    [5,10,15,20,40],
            1, .1, 60,
            [0, 40, 10, 0, 0], BerryColor.Green,
            ['This Berry has a very dry flavor. It has the effect of making other food eaten at the same time taste sweet.']); // TODO: Set properties
        this.berryData[BerryType.Custap]    = new Berry(BerryType.Custap,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 40, 10, 0], BerryColor.Red,
            ['The flesh underneath the Custap Berry\'s tough skin is sweet and creamy soft.']); // TODO: Set properties
        this.berryData[BerryType.Jaboca]    = new Berry(BerryType.Jaboca,   [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 0, 40, 10], BerryColor.Yellow,
            [
                'The cluster of drupelets that make up this Berry pop rhythmically if the Berry is handled roughly.',
                'The sound of these Berries attracts wild Pokémon.',
            ]); // TODO: Set properties
        this.berryData[BerryType.Rowap]     = new Berry(BerryType.Rowap,    [5,10,15,20,40],
            1, .1, 60,
            [10, 0, 0, 0, 40], BerryColor.Blue,
            ['In days of old, people worked the top-shaped pieces of this Berry free and used them as toys.']); // TODO: Set properties
        this.berryData[BerryType.Kee]       = new Berry(BerryType.Kee,      [5,10,15,20,40],
            1, .1, 60,
            [30, 30, 10, 10, 10], BerryColor.Yellow,
            ['This Berry remains poisonous until fully ripened. Once ripe it has a spicy and sweet complex flavor.']); // TODO: Set properties
        this.berryData[BerryType.Maranga]   = new Berry(BerryType.Maranga,  [5,10,15,20,40],
            1, .1, 60,
            [10, 10, 30, 30, 10], BerryColor.Blue,
            ['This Berry resembles the Durin Berry, however its spikes are less pronounced. It is quite delicious when roasted.']); // TODO: Set properties

        this.berryData[BerryType.Liechi]    = new Berry(BerryType.Liechi,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 0, 0], BerryColor.Red,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the sea.'],
            undefined, ['Manaphy']); // TODO: Set properties
        this.berryData[BerryType.Ganlon]    = new Berry(BerryType.Ganlon,   [5,10,15,20,40],
            1, .1, 60,
            [0, 30, 10, 30, 0], BerryColor.Purple,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the land.']); // TODO: Set properties
        this.berryData[BerryType.Salac]     = new Berry(BerryType.Salac,    [5,10,15,20,40],
            1, .1, 60,
            [0, 0, 30, 10, 30], BerryColor.Green,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of the sky.']); // TODO: Set properties
        this.berryData[BerryType.Petaya]    = new Berry(BerryType.Petaya,   [5,10,15,20,40],
            1, .1, 60,
            [30, 0, 0, 30, 10], BerryColor.Pink,
            ['This Berry is surrounded by mystery. It is rumored to be imbued with the power of all living things.'],
            undefined, ['Mew']); // TODO: Set properties
        this.berryData[BerryType.Apicot]    = new Berry(BerryType.Apicot,   [5,10,15,20,40],
            1, .1, 60,
            [10, 30, 0, 0, 30], BerryColor.Blue,
            ['This is a very, very mystifying Berry. There is no telling how it can be used, or what may happen if it is used.']); // TODO: Set properties
        this.berryData[BerryType.Lansat]    = new Berry(BerryType.Lansat,   [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 10, 30], BerryColor.Red,
            ['This is said to be a legendary Berry. Holding it supposedly brings great joy.']); // TODO: Set properties
        this.berryData[BerryType.Starf]     = new Berry(BerryType.Starf,    [5,10,15,20,40],
            1, .1, 60,
            [30, 10, 30, 10, 30], BerryColor.Green,
            ['This Berry is considered a mirage. It was said to be so strong that it had to be abandoned at the world\'s edge.'],
            undefined, ['Jirachi']); // TODO: Set properties

        this.berryData[BerryType.Enigma]    = new Berry(BerryType.Enigma,   [2,4,6,8,16],
            1, 1, 60,
            [40, 10, 0, 0, 0], BerryColor.Purple,
            ['A completely enigmatic Berry. It apparently has the power of the stars that fill the night sky.'],
            new Aura(AuraType.Harvest, [1.23, 1.252, 1.566])); // TODO: Set properties
        //#endregion

        //#endregion

        //#region Mutations

        // TODO: Setup mutations for every berry
        // TEMPORARY MUTATION FOR TESTING
        //this.mutations.push(new NearBerryMutation(1, BerryType.Cheri, [{berryType: BerryType.Cheri, berryStage: PlotStage.Seed}]));
        /*this.mutations.push(new NearBerryMutation(1, BerryType.Cheri,
            [
                {berryType: BerryType.Cheri, berryStage: PlotStage.Seed},
                {berryType: BerryType.Chesto, berryStage: PlotStage.Seed},
            ]));*/
        //this.mutations.push(new FlavorMutation(1, BerryType.Persim, [15, 0, 0, 0, 0]));

        //#region Second Generation

        // Persim
        this.mutations.push(new GrowNearBerryMutation(.001, BerryType.Persim,
            [
                BerryType.Pecha,
                BerryType.Oran,
            ]));
        // Razz
        this.mutations.push(new GrowNearBerryMutation(.0009, BerryType.Razz,
            [
                BerryType.Cheri,
                BerryType.Leppa,
            ]));
        // Bluk
        this.mutations.push(new GrowNearBerryMutation(.0008, BerryType.Bluk,
            [
                BerryType.Chesto,
                BerryType.Leppa,
            ]));
        // Nanab
        this.mutations.push(new GrowNearBerryMutation(.0007, BerryType.Nanab,
            [
                BerryType.Pecha,
                BerryType.Aspear,
            ]));
        // Wepear
        this.mutations.push(new GrowNearBerryMutation(.0006, BerryType.Wepear,
            [
                BerryType.Rawst,
                BerryType.Oran,
            ]));
        // Pinap
        this.mutations.push(new GrowNearBerryMutation(.0005, BerryType.Pinap,
            [
                BerryType.Sitrus,
                BerryType.Aspear,
            ]));

        // Figy
        this.mutations.push(new GrowNearFlavorMutation(.0009, BerryType.Figy,
            [25, 0, 0, 0, 0], 0.5, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings get too spicy!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Cheri]();
                },
            }
        ));
        // Wiki
        this.mutations.push(new GrowNearFlavorMutation(.0008, BerryType.Wiki,
            [0, 25, 0, 0, 0], 0.5, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings get too dry!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Cheri]();
                },
            }
        ));
        // Mago
        this.mutations.push(new GrowNearFlavorMutation(.0007, BerryType.Mago,
            [0, 0, 25, 0, 0], 0.5, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings get too sweet!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Pecha]();
                },
            }
        ));
        // Aguav
        this.mutations.push(new GrowNearFlavorMutation(.0006, BerryType.Aguav,
            [0, 0, 0, 25, 0], 0.5, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings get too bitter!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Rawst]();
                },
            }
        ));
        // Iapapa
        this.mutations.push(new GrowNearFlavorMutation(.0005, BerryType.Iapapa,
            [0, 0, 0, 0, 25], 0.5, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings get too sour!',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Aspear]();
                },
            }
        ));

        // Lum
        this.mutations.push(new GrowNearBerryMutation(.0001, BerryType.Lum,
            [
                BerryType.Cheri,
                BerryType.Chesto,
                BerryType.Pecha,
                BerryType.Rawst,
                BerryType.Aspear,
                BerryType.Leppa,
                BerryType.Oran,
                BerryType.Sitrus,
            ], {
                hint: 'I\'ve heard that there\'s a legendary Berry that only appears when fully surrounded by unique ripe Berry plants!',
            }));

        //#endregion

        //#region Third Generation

        // Pomeg
        this.mutations.push(new GrowNearBerryMutation(.00005, BerryType.Pomeg,
            [
                BerryType.Iapapa,
                BerryType.Mago,
            ]));
        // Kelpsy
        this.mutations.push(new GrowNearBerryMutation(.00005, BerryType.Kelpsy,
            [
                BerryType.Chesto,
                BerryType.Persim,
            ]));
        // Qualot
        this.mutations.push(new GrowNearFlavorMutation(.00005, BerryType.Qualot,
            [10, 0, 10, 0, 10], 0, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy, a little sweet, and a little sour at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Cheri]() &&
                    App.game.farming.unlockedBerries[BerryType.Pecha]() &&
                    App.game.farming.unlockedBerries[BerryType.Aspear]();
                },
            }));
        // Hondew
        this.mutations.push(new GrowNearFlavorMutation(.00004, BerryType.Hondew,
            [10, 10, 0, 10, 10], 0, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings match its flavor profile! If I recall, it tasted like a little bit of everything except sweet.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Cheri]() &&
                    App.game.farming.unlockedBerries[BerryType.Chesto]() &&
                    App.game.farming.unlockedBerries[BerryType.Rawst]() &&
                    App.game.farming.unlockedBerries[BerryType.Aspear]();
                },
            }));
        // Grepa
        this.mutations.push(new GrowNearBerryMutation(.00005, BerryType.Grepa,
            [
                BerryType.Aguav,
                BerryType.Figy,
            ]));
        // Tamato
        this.mutations.push(new EvolveNearBerryMutation(.00005, BerryType.Tamato, BerryType.Sitrus, [BerryType.Lum]));

        // Cornn
        this.mutations.push(new GrowNearBerryMutation(.00003, BerryType.Cornn,
            [
                BerryType.Leppa,
                BerryType.Bluk,
                BerryType.Wiki,
            ]));
        // Magost
        this.mutations.push(new GrowNearBerryMutation(.00003, BerryType.Magost,
            [
                BerryType.Pecha,
                BerryType.Nanab,
                BerryType.Mago,
            ]));
        // Rabuta
        this.mutations.push(new EvolveNearBerryMutation(.00003, BerryType.Rabuta, BerryType.Aspear, [BerryType.Aguav]));
        // Nomel
        this.mutations.push(new GrowNearBerryMutation(.00003, BerryType.Nomel,
            [BerryType.Pinap]));
        // Spelon
        this.mutations.push(new EvolveNearFlavorMutation(.00002, BerryType.Spelon, BerryType.Tamato,
            [130, 0, 0, 0, 0], 0.2, {
                hint: 'I\'ve heard that a Tamato berry will change if its surroundings get extremely spicy!',
            }));
        // Pamtre
        this.mutations.push(new EvolveNearFlavorMutation(.00002, BerryType.Pamtre, BerryType.Cornn,
            [0, 130, 0, 0, 0], 0.2, {
                hint: 'I\'ve heard that a Cornn berry will change if its surroundings get extremely dry!',
            }));
        // Pamtre Overgrow
        this.mutations.push(new GrowNearBerryMutation(.00004, BerryType.Pamtre,
            [BerryType.Pamtre], { showHint: false }));
        // Watmel
        this.mutations.push(new EvolveNearFlavorMutation(.00002, BerryType.Watmel, BerryType.Magost,
            [0, 0, 130, 0, 0], 0.2, {
                hint: 'I\'ve heard that a Magost berry will change if its surroundings get extremely sweet!',
            }));
        // Durin
        this.mutations.push(new EvolveNearFlavorMutation(.00002, BerryType.Durin, BerryType.Rabuta,
            [0, 0, 0, 130, 0], 0.2, {
                hint: 'I\'ve heard that a a Rabuta berry will change if its surroundings get extremely bitter!',
            }));
        // Belue
        this.mutations.push(new EvolveNearFlavorMutation(.00002, BerryType.Belue, BerryType.Nomel,
            [0, 0, 0, 0, 130], 0.2, {
                hint: 'I\'ve heard that a Nomel berry will change if its surroundings get extremely sour!',
            }));

        //#endregion

        //#region Fourth Generation

        // Occa
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Occa,
            [
                BerryType.Cheri,
                BerryType.Figy,
                BerryType.Tamato,
                BerryType.Spelon,
            ]));
        // Occa Overgrow
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Occa, undefined, [BerryType.Occa], { showHint: false }));
        // Passho
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Passho,
            [
                BerryType.Oran,
                BerryType.Chesto,
                BerryType.Kelpsy,
                BerryType.Coba,
            ]));
        // Wacan
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Wacan,
            [
                BerryType.Aspear,
                BerryType.Sitrus,
                BerryType.Pinap,
                BerryType.Nomel,
            ]));
        // Rindo
        this.mutations.push(new GrowNearFlavorMutation(.00001, BerryType.Rindo,
            [10, 0, 0, 15, 0], 0, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings match its flavor profile! If I recall, it tasted a little spicy and fairly bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Aguav]() &&
                    App.game.farming.unlockedBerries[BerryType.Cheri]();
                },
            }));
        // Rindo Overgrow
        this.mutations.push(new GrowNearBerryMutation(.00004, BerryType.Rindo,
            [BerryType.Rindo], {showHint: false }));
        // Yache
        this.mutations.push(new EvolveNearBerryStrictMutation(.00001, BerryType.Yache, BerryType.Passho, {}, {
            hint: 'I\'ve heard that growing a Passho Berry alone will cause it to change!',
        }));
        // Chople
        this.mutations.push(new OakMutation(.00001, BerryType.Chople, BerryType.Spelon, OakItems.OakItem.Blaze_Cassette));
        // Kebia
        this.mutations.push(new OakMutation(.00001, BerryType.Kebia, BerryType.Pamtre, OakItems.OakItem.Poison_Barb));
        // Kebia Overgrow
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Kebia, undefined, [BerryType.Kebia], { showHint: false }));
        // Shuca
        this.mutations.push(new OakMutation(.00001, BerryType.Shuca, BerryType.Watmel, OakItems.OakItem.Sprinklotad));
        // Coba
        this.mutations.push(new GrowNearFlavorMutation(.00001, BerryType.Coba,
            [0, 10, 0, 15, 0], 0, {
                hint: 'I\'ve heard that a Berry will appear if its surroundings match its flavor profile! If I recall, it tasted a little dry and fairly bitter at the same time.',
                unlockReq: function(): boolean {
                    return App.game.farming.unlockedBerries[BerryType.Chesto]() &&
                    App.game.farming.unlockedBerries[BerryType.Aguav]();
                },
            }));
        // Payapa
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Payapa,
            [
                BerryType.Wiki,
                BerryType.Bluk,
                BerryType.Cornn,
                BerryType.Pamtre,
            ]));
        // Tanga
        let test = {};
        test[BerryType.Rindo] = 8;
        this.mutations.push(new GrowNearBerryStrictMutation(.00001, BerryType.Tanga, test, {
            hint: 'I\'ve heard that a Berry will appear after being surrounded by Ringo Berries!',
        }));
        // Charti
        this.mutations.push(new OakMutation(.00001, BerryType.Charti, BerryType.Cornn, OakItems.OakItem.Cell_Battery));
        // Kasib
        // No mutation, will check withers
        // Haban
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Haban,
            [
                BerryType.Occa,
                BerryType.Rindo,
                BerryType.Passho,
                BerryType.Wacan,
            ]));
        // Colbur
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Colbur,
            [
                BerryType.Rabuta,
                BerryType.Kasib,
                BerryType.Payapa,
            ]));
        // Colbur Overgrow
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Colbur, undefined, [BerryType.Colbur], { showHint: false }));
        // Babiri
        test = {};
        test[BerryType.Shuca] = 4;
        test[BerryType.Charti] = 4;
        this.mutations.push(new GrowNearBerryStrictMutation(.00001, BerryType.Babiri, test, {
            hint: 'I\'ve heard that a Berry will appear after being surrounded by Shuca and Charti Berries!',
        }));
        // Chilan
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Chilan, BerryType.Chople, []));
        // Roseli
        this.mutations.push(new GrowNearBerryMutation(.00001, BerryType.Roseli,
            [
                BerryType.Mago,
                BerryType.Nanab,
                BerryType.Magost,
                BerryType.Watmel,
            ]));
        //#endregion

        //#region Fifth Generation

        // Micle

        // Custap

        // Jaboca

        // Rowap

        // Kee

        // Maranga


        // Liechi
        this.mutations.push(new FieldMutation(.000001, BerryType.Liechi, BerryType.Passho, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[pokemonMap.Kyogre](),
        }));
        // Ganlon
        this.mutations.push(new FieldMutation(.000001, BerryType.Ganlon, BerryType.Shuca, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[pokemonMap.Groudon](),
        }));
        // Salac
        this.mutations.push(new FieldMutation(.000001, BerryType.Salac, BerryType.Coba, undefined, {
            unlockReq: () => App.game?.statistics?.pokemonCaptured[pokemonMap.Rayquaza](),
        }));
        // Petaya

        // Apicot

        // Lansat

        // Starf
        // No mutation, obtained by wandering shiny pokemon
        // Enigma
        this.mutations.push(new EnigmaMutation(.00001));
        // Enigma Mutations
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Liechi, BerryType.Passho, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Liechi](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Ganlon, BerryType.Shuca, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Ganlon](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Salac, BerryType.Coba, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Salac](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Petaya, BerryType.Payapa, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Petaya](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Apicot, BerryType.Chilan, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Apicot](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Lansat, BerryType.Roseli, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Lansat](),
        }));
        this.mutations.push(new EvolveNearBerryMutation(.00004, BerryType.Starf, BerryType.Babiri, [BerryType.Enigma], {
            showHint: false,
            unlockReq: () => App.game.farming.unlockedBerries[BerryType.Starf](),
        }));

        //#endregion

        //#endregion

    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck);
        return multiplier;
    }

    getReplantMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Squirtbottle);
        return multiplier;
    }

    getMutationMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Sprinklotad);
        return multiplier;
    }

    update(delta: number): void {
        const timeToReduce = delta;

        const notifications = new Set<FarmNotificationType>();

        let change = false;

        // Updating Berries
        this.plotList.forEach(plot => {
            if (plot.update(timeToReduce)) {
                change = true;
            }
            if (plot.notifications) {
                plot.notifications.forEach(n => notifications.add(n));
                plot.notifications = [];
            }
        });

        // Running Mutations
        this.counter += GameConstants.TICK_TIME;
        if (this.counter >= GameConstants.MUTATION_TICK) {
            this.mutations.forEach(mutation => {
                if (mutation.mutate()) {
                    notifications.add(FarmNotificationType.Mutated);
                    change = true;
                }
            });
            this.counter = 0;
        }

        // Wandering Pokemon
        this.counter += GameConstants.TICK_TIME;
        let wanderPokemon = '';
        if (this.counter >= GameConstants.WANDER_TICK) {
            for (let i = 0;i < App.game.farming.plotList.length;i++) {
                const plot = App.game.farming.plotList[i];
                wanderPokemon = plot.generateWanderPokemon();
                // TODO: HLXII Handle actually gaining the pokemon
                // TODO: HLXII Handle Shiny
                // TODO: HLXII Handle other bonus (DT?)
                if (wanderPokemon !== '') {
                    notifications.add(FarmNotificationType.Wander);
                    break;
                }
            }
        }

        if (change) {
            this.resetAuras();
        }

        if (notifications.size) {
            notifications.forEach((n) => this.handleNotification(n, wanderPokemon), this);
        }
    }

    // TODO: HLXII Change details of notifier for different notifications
    handleNotification(type: FarmNotificationType, wander?: string): void {
        switch (type) {
            case FarmNotificationType.Ripe:
                Notifier.notify({
                    message: 'A Berry is ready to harvest!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Withered:
                Notifier.notify({
                    message: 'A Berry plant has withered!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Mutated:
                Notifier.notify({
                    message: 'A Berry plant has mutated!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Replanted:
                Notifier.notify({
                    message: 'A Berry has been replanted!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Dropped:
                Notifier.notify({
                    message: 'A Berry has been dropped!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.MulchRanOut:
                Notifier.notify({
                    message: 'A plot has run out of mulch!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Wander:
                Notifier.notify({
                    message: `A ${wander} has wandered onto the farm!`,
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
        }
    }

    resetAuras() {
        this.externalAuras[AuraType.Attract] = ko.observable<number>(1);
        this.externalAuras[AuraType.Egg] = ko.observable<number>(1);
        this.plotList.forEach(plot => plot.clearAuras());

        this.plotList.forEach((plot, idx) => plot.applyAura(idx));
    }

    unlockPlot() {
        const index = this.unlockBerryIndex();
        if (this.canBuyPlot()) {
            GameHelper.incrementObservable(this.berryList[index], -this.calculatePlotPrice());
            this.plotList[index + 1].isUnlocked = true;
        }
    }

    allPlotsUnlocked() {
        return this.plotList[this.plotList.length - 1].isUnlocked;
    }

    canBuyPlot() {
        return !this.allPlotsUnlocked() && App.game.farming.berryList[this.unlockBerryIndex()]() > this.calculatePlotPrice();
    }

    calculatePlotPrice(): number {
        if (this.allPlotsUnlocked()) {
            return Infinity;
        }

        // TODO: HLXII Rebalance cost based on Berry growth rate
        return 10 * Math.floor(Math.pow(this.unlockedPlotCount(), 2));
    }

    unlockedPlotCount() {
        return App.game.farming.plotList.filter(plot => plot.isUnlocked).length;
    }

    unlockBerryIndex() {
        return this.unlockedPlotCount() - 1;
    }

    plant(index: number, berry: BerryType, suppressResetAura = false) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasBerry(berry)) {
            return;
        }

        GameHelper.incrementObservable(this.berryList[berry], -1);
        plot.berry = berry;
        plot.age = 0;
        plot.notifications = [];

        if (!suppressResetAura) {
            this.resetAuras();
        }
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry, true);
        });
        this.resetAuras();
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number, suppressResetAura = false): void {
        const plot = this.plotList[index];
        if (plot.berry === BerryType.None || plot.stage() != PlotStage.Berry) {
            return;
        }

        App.game.wallet.gainFarmPoints(this.berryData[plot.berry].farmValue);

        const amount = plot.harvest();

        GameHelper.incrementObservable(App.game.statistics.totalBerriesHarvested, amount);
        GameHelper.incrementObservable(App.game.statistics.berriesHarvested[plot.berry], amount);
        this.gainBerry(plot.berry, amount);

        App.game.oakItems.use(OakItems.OakItem.Sprayduck);

        plot.die(true);

        if (!suppressResetAura) {
            this.resetAuras();
        }
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index, true);
        });
        this.resetAuras();
    }

    /**
     * Adds mulch to a plot
     * @param index The plot index
     * @param mulch The MulchType to be added
     */
    public addMulch(index: number, mulch: MulchType) {
        const plot = this.plotList[index];
        if (!plot.isUnlocked || !this.hasMulch(mulch)) {
            return;
        }
        if (plot.mulch !== MulchType.None && plot.mulch !== mulch) {
            return;
        }

        GameHelper.incrementObservable(this.mulchList[mulch], -1);
        plot.mulch = mulch;
        plot.mulchTimeLeft += GameConstants.MULCH_USE_TIME;
    }

    /**
     * Attempts to add mulch to all plots
     * @param mulch The MulchType to be added
     */
    public mulchAll(mulch: MulchType) {
        this.plotList.forEach((plot, index) => {
            this.addMulch(index, mulch);
        });
    }

    /**
     * Gives the player a random Berry from the first 8 types
     * @param amount Amount of berries to give. Defaults to 1.
     * @param disableNotification Set to true to not notify the player. Defaults to false.
     */
    gainRandomBerry(amount = 1, disableNotification = false) {
        const berry = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        if (!disableNotification) {
            Notifier.notify({
                message: `You got a ${BerryType[berry]} berry!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.route_item_found,
            });
        }
        this.gainBerry(berry, amount);
    }

    gainBerry(berry: BerryType, amount = 1) {
        GameHelper.incrementObservable(this.berryList[berry], Math.floor(amount));
        this.unlockBerry(berry);
    }

    hasBerry(berry: BerryType) {
        return this.berryList[berry]() > 0;
    }

    hasMulch(mulch: MulchType) {
        return this.mulchList[mulch]() > 0;
    }

    canAccess(): boolean {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Wailmer_pail);
    }

    unlockBerry(berry: BerryType) {
        if (!this.unlockedBerries[berry]()) {
            this.unlockedBerries[berry](true);
        }
    }

    toJSON(): Record<string, any> {
        return {
            berryList: this.berryList.map(ko.unwrap),
            unlockedBerries: this.unlockedBerries.map(ko.unwrap),
            mulchList: this.mulchList.map(ko.unwrap),
            plotList: this.plotList.map(plot => plot.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedBerries = json['berryList'];
        if (savedBerries == null) {
            this.berryList = this.defaults.berryList.map((v) => ko.observable<number>(v));
        } else {
            (savedBerries as number[]).forEach((value: number, index: number) => {
                this.berryList[index](value);
            });
        }

        const savedUnlockedBerries = json['unlockedBerries'];
        if (savedUnlockedBerries == null) {
            this.unlockedBerries = this.defaults.unlockedBerries.map((v) => ko.observable<boolean>(v));
        } else {
            (savedUnlockedBerries as boolean[]).forEach((value: boolean, index: number) => {
                this.unlockedBerries[index](value);
            });
        }

        const savedMulches = json['mulchList'];
        if (savedMulches == null) {
            this.mulchList = this.defaults.mulchList.map((v) => ko.observable<number>(v));
        } else {
            (savedMulches as number[]).forEach((value: number, index: number) => {
                this.mulchList[index](value);
            });
        }

        const savedPlots = json['plotList'];
        if (savedPlots == null) {
            this.plotList = this.defaults.plotList;
        } else {
            (savedPlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const plot: Plot = new Plot(false, BerryType.None, 0, MulchType.None, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }
    }

    public static getGeneration(gen: number): BerryType[] {
        const genBounds = [0, 8, 20, 35, 53, Infinity];
        return App.game.farming.berryData.filter(berry => berry.type >= genBounds[gen] && berry.type < genBounds[gen + 1]).map(berry => berry.type);
    }

    public static getColor(color: BerryColor): BerryType[] {
        return App.game.farming.berryData.filter(berry => berry.color === color).map(berry => berry.type);
    }
}
