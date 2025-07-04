interface QuestInterface {
    index: number;                           // Index in Quest set
    progress: KnockoutComputed<number>;      // A number between 0 and 1 representing the progress
    isCompleted: KnockoutComputed<boolean>;  // True when quest requirements have been fulfilled
    claimed: KnockoutObservable<boolean>;    // True when reward has been claimed
    initial: any;                            // Value of focus when quest was started
    notified: boolean;                       // If player has been notified of completion

    // Required in new quest type
    focus: KnockoutObservable<any>;          // Variable to watch
    defaultDescription: string;              // Short description of how to complete the quest
    pointsReward: number;                    // Quest points rewarded for completion
    xpReward: number;                        // Questing xp points gained for completion
}
