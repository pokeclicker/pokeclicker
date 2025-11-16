/**
 * Each typed dance has different judging preferences.
 * The idea is to follow contest type matchup compatibility, so there is some overlap with adjacent types but not opposing ones
 *
 * Cool - same plane
 *
 * Beautiful - opposite pairs
 *
 * Cute - variance
 *
 * Smart - adjacent links
 *
 * Tough - within 90deg of each other
 */
class ContestBattleDanceCombos {
    public static isDirectionalLink(moveOne: number, moveTwo: number) {
        return moveOne === moveTwo;
    }

    public static isOppositeLink(moveOne: number, moveTwo: number) {
        // Keep them written like this for clarity
        return (moveOne === Direction.Up && moveTwo === Direction.Down) ||
        (moveOne === Direction.Down && moveTwo === Direction.Up) ||
        (moveOne === Direction.Left && moveTwo === Direction.Right) ||
        (moveOne === Direction.Right && moveTwo === Direction.Left);
    }

    public static isAdjacentLink(moveOne: number, moveTwo: number) {
        return !ContestBattleDanceCombos.isDirectionalLink(moveOne, moveTwo) && !ContestBattleDanceCombos.isOppositeLink(moveOne, moveTwo);
    }

    /**
     * Cool poses - posing along the same plane
     */
    public static coolPoseBonus(arr: number[]) {
        const map = new Map();
        GameHelper.enumNumbers(Direction).forEach((n) => {
            map.set(n, 0);
        });

        arr.forEach((n) => {
            map.set(n, map.get(n) + 1);
        });

        return Math.max(map.get(Direction.Up) + map.get(Direction.Down), map.get(Direction.Left) + map.get(Direction.Right));
    }

    /**
     * Cool combo - if last three moves have at least one directional link or are all opposite links
     *
     * Complements: Beautiful and Tough
     *
     * Opposes: Cute and Smart
     */
    public static coolCombo(moveOne: number, moveTwo: number, moveThree: number) {
        // at least one directional link
        if (ContestBattleDanceCombos.isDirectionalLink(moveOne, moveTwo) || ContestBattleDanceCombos.isDirectionalLink(moveTwo, moveThree)) {
            return 1;
        }
        // both are oppositely linked
        if (ContestBattleDanceCombos.isOppositeLink(moveOne, moveTwo) && ContestBattleDanceCombos.isOppositeLink(moveTwo, moveThree)) {
            return 1;
        }
        return 0;
    }

    /**
     * Beautiful poses - counts pairs of opposites if at least one opposite link is found
     */
    public static beautifulPoseBonus(arr: number[]) {
        // Reveal purposeful pairs
        let linkedPairExists = false;

        for (let i = 0; i < arr.length; i++) {
            if (i > 0) {
                if (ContestBattleDanceCombos.isOppositeLink(arr[i], arr[i - 1])) {
                    // Activate pair calculation
                    linkedPairExists = true;
                }
            }
        }

        // Pair calculation
        const map = new Map();
        GameHelper.enumNumbers(Direction).forEach((n) => {
            map.set(n, 0);
        });

        if (linkedPairExists) {
            arr.forEach((n) => {
                map.set(n, map.get(n) + 1);
            });
        }

        // Extra point if odd number of opponents
        const oddPairsHandicap = arr.length % 2;

        // Group pairs from entire stage
        const pairValue = Math.max(Math.min(map.get(Direction.Up), map.get(Direction.Down)), Math.min(map.get(Direction.Left), map.get(Direction.Right))) * 2 + oddPairsHandicap;

        return pairValue;
    }

    /**
     * Beautiful combo - if an opposite link exists within the last three moves
     *
     * Complements: Cool and Cute
     *
     * Opposes: Smart and Tough
     */
    public static beautifulCombo(moveOne: number, moveTwo: number, moveThree: number) {
        if (ContestBattleDanceCombos.isOppositeLink(moveOne, moveTwo) || ContestBattleDanceCombos.isOppositeLink(moveTwo, moveThree)) {
            return 1;
        }
        return 0;
    }

    /**
     * Cute poses - variety of directions
     */
    public static cutePoseBonus(arr: number[]) {
        let varietyLinks = 0;

        // Repeated poses count if they are spaced out far enough
        for (let i = 0; i < arr.length; i++) {
            // use dummy values until arr is populated
            varietyLinks += ContestBattleDanceCombos.cuteCombo(arr[i], arr[i - 1] ?? -1, arr[i - 2] ?? -2);
        }

        return varietyLinks;
    }

    /**
     * Cute combo - if all of the last three moves are in a different direction
     *
     * Complements: Beautiful and Smart
     *
     * Opposes: Cool and Tough
     */
    public static cuteCombo(moveOne: number, moveTwo: number, moveThree: number) {
        if ([...new Set([moveOne, moveTwo, moveThree])].length > 2) {
            return 1;
        }

        return 0;
    }

    /**
     * Smart poses - every adjacent link
     */
    public static smartPoseBonus(arr: number[]) {
        let adjacentLinks = 0;

        for (let i = 0; i < arr.length; i++) {
            if (i > 0) {
                // Check if directional or opposite link
                if (!ContestBattleDanceCombos.isAdjacentLink(arr[i], arr[i - 1])) {
                    // Counterbalance loop's ++ count
                    adjacentLinks--;
                }
            }
            adjacentLinks++;
        }

        return adjacentLinks;
    }

    /**
     * Smart combo - if all of the last three moves have adjacent links
     *
     * Complements: Cute and Tough
     *
     * Opposes: Cool and Beautiful
     */
    public static smartCombo(moveOne:number, moveTwo: number, moveThree: number) {
        if (ContestBattleDanceCombos.isAdjacentLink(moveOne, moveTwo) && ContestBattleDanceCombos.isAdjacentLink(moveTwo, moveThree)) {
            return 1;
        }
        return 0;
    }

    /**
     * Tough poses - poses within 90 degress of each other
     */
    public static toughPoseBonus(arr: number[]) {
        let cornerLinks = 0;
        let countedMoves: number[] = [];

        for (let i = 0; i < arr.length; i++) {
            if (i > 0) {
                // Check for opposite links or directional spread
                if (ContestBattleDanceCombos.isOppositeLink(arr[i], arr[i - 1]) || [...new Set(countedMoves.concat(i))].length > 2) {
                    // Counterbalance loop's ++ count
                    cornerLinks--;
                    // Set up new corner to party in
                    countedMoves = [];
                }
            }
            cornerLinks++;
            countedMoves.push(arr[i]);
        }

        return cornerLinks;
    }

    /**
     * Tough combo - if there is no opposite link and there are less than 3 directions
     *
     * Complements: Cool and Smart
     *
     * Opposes: Beautiful and Cute
     */
    public static toughCombo(moveOne: number, moveTwo: number, moveThree: number) {
        if (!ContestBattleDanceCombos.isOppositeLink(moveOne, moveTwo) && [...new Set([moveOne, moveTwo, moveThree])].length <= 2) {
            return 1;
        }
        return 0;
    }

    // Finishing pose bonus
    public static poseBonus(type: ContestType, poseDirections: number[]) {
        const danceBonuses = [
            ContestBattleDanceCombos.coolPoseBonus(poseDirections),
            ContestBattleDanceCombos.beautifulPoseBonus(poseDirections),
            ContestBattleDanceCombos.cutePoseBonus(poseDirections),
            ContestBattleDanceCombos.smartPoseBonus(poseDirections),
            ContestBattleDanceCombos.toughPoseBonus(poseDirections),
        ];

        const typeArray = ContestTypeHelper.contestTypeMatrix[type];

        let bonus = 0;
        for (let i = 0; i < ContestType.Balanced; i++) {
            bonus += danceBonuses[i] * Math.floor(typeArray[i]);
        }
        return bonus;
    }

    // Live combo bonus
    public static moveBonus(type: ContestType, moveDirections: number[]) {
        const moveOne = moveDirections[0];
        const moveTwo = moveDirections[1];
        const moveThree = moveDirections[2];
        const danceBonuses = [
            ContestBattleDanceCombos.coolCombo(moveOne, moveTwo, moveThree),
            ContestBattleDanceCombos.beautifulCombo(moveOne, moveTwo, moveThree),
            ContestBattleDanceCombos.cuteCombo(moveOne, moveTwo, moveThree),
            ContestBattleDanceCombos.smartCombo(moveOne, moveTwo, moveThree),
            ContestBattleDanceCombos.toughCombo(moveOne, moveTwo, moveThree),
        ];

        const typeArray = ContestTypeHelper.contestTypeMatrix[type];

        let bonus = 0;
        for (let i = 0; i < ContestType.Balanced; i++) {
            bonus += danceBonuses[i] * Math.ceil(typeArray[i]);
        }
        return bonus;
    }
}
