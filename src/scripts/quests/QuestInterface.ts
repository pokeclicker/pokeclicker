interface QuestInterface {
    index: number;                           // Index in Quest set
    description: string;                     // Short description of how to complete the quest
    pointsReward: number;                    // Quest points rewarded for completion
    xpReward: number;                        // Questing xp points gained for completion
    progress: KnockoutComputed<number>;      // A number between 0 and 1 representing the progress
    isCompleted: KnockoutComputed<boolean>;  // True when quest requirements have been fulfilled
    claimed: KnockoutObservable<boolean>;    // True when reward has been claimed
    questFocus: KnockoutObservable<any>;     // Variable that needs to increase to complete quest
    initial: any;                            // Value of questFocus when quest was started

    beginQuest(): void;
}