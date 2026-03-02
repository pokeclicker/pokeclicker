import BerryType from '../enums/BerryType';
import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import GameHelper from '../GameHelper';
import BerryUnlockedRequirement from '../requirements/BerryUnlockedRequirement';
import InContestRankRequirement from '../requirements/InContestRankRequirement';
import InContestTypeRequirement from '../requirements/InContestTypeRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import Rand from '../utilities/Rand';
import ContestBerryReward from '../interfaces/ContestBerryReward';
import ContestItemReward from '../interfaces/ContestItemReward';

export default class ContestRewards {
    public static congratulatoryWord: Record<ContestRank, string> = {
        [ContestRank.Practice]: 'practically',
        [ContestRank.Normal]: 'nifty',
        [ContestRank.Super]: 'spurring',
        [ContestRank.Hyper]: 'hypnotic',
        [ContestRank.Master]: 'majestic',
        [ContestRank['Super Normal']]: 'nice and formal',
        [ContestRank['Super Great']]: 'top-rate',
        [ContestRank['Super Ultra']]: 'apex, sorta,',
        [ContestRank['Super Master']]: 'ever-laster of a',
        [ContestRank.Spectacular]: 'inspirational, sparkling',
        [ContestRank['Brilliant Shining']]: 'career-defining',
    };

    public static berryRewards: Partial<Record<ContestRank, ContestBerryReward[]>> = {
        [ContestRank.Normal] : [
            { berry: BerryType.Cheri, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Cool) },
            { berry: BerryType.Chesto, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Beautiful) },
            { berry: BerryType.Pecha, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Cute) },
            { berry: BerryType.Rawst, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Smart) },
            { berry: BerryType.Aspear, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Tough) },
            { berry: BerryType.Leppa, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Leppa) },
            { berry: BerryType.Oran, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Oran) },
            { berry: BerryType.Persim, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Persim) },
            { berry: BerryType.Lum, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Lum) },
            { berry: BerryType.Sitrus, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Sitrus) },
        ],
        [ContestRank.Super] : [
            { berry: BerryType.Figy, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Figy)]) },
            { berry: BerryType.Wiki, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Wiki)]) },
            { berry: BerryType.Mago, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Mago)]) },
            { berry: BerryType.Aguav, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Aguav)]) },
            { berry: BerryType.Iapapa, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Iapapa)]) },
            { berry: BerryType.Razz, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Razz)]) },
            { berry: BerryType.Bluk, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Bluk)]) },
            { berry: BerryType.Nanab, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Nanab)]) },
            { berry: BerryType.Wepear, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Wepear)]) },
            { berry: BerryType.Pinap, amount: ko.observable(1), weight: 0.9,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Pinap)]) },
        ],
        [ContestRank.Hyper] : [
            { berry: BerryType.Pomeg, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Pomeg)]) },
            { berry: BerryType.Kelpsy, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Kelpsy)]) },
            { berry: BerryType.Qualot, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Qualot)]) },
            { berry: BerryType.Hondew, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Hondew)]) },
            { berry: BerryType.Grepa, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Grepa)]) },
            { berry: BerryType.Tamato, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Tamato)]) },
            { berry: BerryType.Cornn, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Cornn)]) },
            { berry: BerryType.Magost, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Magost)]) },
            { berry: BerryType.Rabuta, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Rabuta)]) },
            { berry: BerryType.Nomel, amount: ko.observable(1), weight: 0.8,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Nomel)]) },
        ],
        [ContestRank.Master] : [
            { berry: BerryType.Spelon, amount: ko.observable(1), weight: 0.7,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Spelon)]) },
            { berry: BerryType.Pamtre, amount: ko.observable(1), weight: 0.7,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Pamtre)]) },
            { berry: BerryType.Watmel, amount: ko.observable(1), weight: 0.7,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Watmel)]) },
            { berry: BerryType.Durin, amount: ko.observable(1), weight: 0.7,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Durin)]) },
            { berry: BerryType.Belue, amount: ko.observable(1), weight: 0.7,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Belue)]) },
        ],
        [ContestRank.Spectacular] : [...GameHelper.enumNumbers(BerryType).filter(b => Number(b) >= BerryType.Occa && Number(b) <= BerryType.Roseli).map(
            (b) => Object({ berry: b, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(b) }) as ContestBerryReward,
        )],
        [ContestRank['Brilliant Shining']]: [
            { berry: BerryType.Enigma, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Enigma)]) },
            { berry: BerryType.Micle, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Micle)]) },
            { berry: BerryType.Custap, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Custap)]) },
            { berry: BerryType.Jaboca, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Jaboca)]) },
            { berry: BerryType.Rowap, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Rowap)]) },
            { berry: BerryType.Kee, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Balanced), new BerryUnlockedRequirement(BerryType.Kee)]) },
            { berry: BerryType.Maranga, amount: ko.observable(1), weight: 0.1,
                requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Balanced), new BerryUnlockedRequirement(BerryType.Maranga)]) },
        ],
    };

    public static getContestBerryReward(rank: ContestRank): ContestBerryReward {
        let rewards: ContestBerryReward[] = [];
        for (let i = ContestRank.Practice; i <= rank; i++) {
            rewards = rewards.concat(ContestRewards.berryRewards[i]?.filter(b => b.requirement?.isCompleted() ?? true) ?? { berry: BerryType.None, amount: ko.observable(0), weight: 0 });
        }
        return Rand.fromWeightedArray(rewards, rewards.map((br) => br.weight ?? 0.1));
    }

    public static itemRewards(): ContestItemReward[] {
        return [
            { item: 'Heart_scale', amount: ko.observable(1), chance: 75, requirement: new InContestRankRequirement(ContestRank.Spectacular) },
            { item: 'Star_piece', amount: ko.observable(1), chance: 50, requirement: new InContestRankRequirement(ContestRank.Spectacular) },
        ];
    }
}
