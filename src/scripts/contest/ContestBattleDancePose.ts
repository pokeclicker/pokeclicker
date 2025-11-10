class ContestBattleDancePose {
    /**
     * Each typed dance has different judging preferences.
     * Tried to follow contest type matchups and keep some overlap
     *
     * Cool: consecutive poses
     * Beautiful: opposite pairs
     * Cute: variance
     * Smart: adjacent from the previous pose
     * Tough: most favored pose
     */

    public static consecutivePoses(arr: number[]) {
        let samePoseStreak = 0;
        let measuredStreak = 0;

        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && arr[i] === arr[i - 1]) {
                measuredStreak++;
            } else {
                measuredStreak = 1;
            }
            // Update longest streak
            if (measuredStreak > samePoseStreak) {
                samePoseStreak = measuredStreak;
            }
        }

        return samePoseStreak;
    }

    public static pairsOfOppositePoses(arr: number[]) {
        let map = new Map();
            GameHelper.enumNumbers(Direction).forEach((n) => {
            map.set(n, 0);
        });

        arr.forEach((n)=>{
          map.set(n, map.get(n) + 1);
        });

        // Extra point if odd number of opponents
        const handicap = arr.length % 2;

        return Math.max(Math.min(map.get(Direction.Up), map.get(Direction.Down)), Math.min(map.get(Direction.Left), map.get(Direction.Right))) * 2 + handicap;
    }

    public static poseVariance(arr: number[]) {
        let map = new Map();
        arr.forEach((n) => {
            map.set(n, (map.get(n) || 0) + 1);
        });
        return [...map.keys()].length;
    }

    public static adjacentPoses(arr: number[]) {
        let adjacentMoves = 0;

        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && arr[i - 1] != arr[i]) {
                if ((arr[i] === Direction.Up && arr[i - 1] != Direction.Down) ||
                    (arr[i] === Direction.Down && arr[i - 1] != Direction.Up) ||
                    (arr[i] === Direction.Left && arr[i - 1] != Direction.Right) ||
                    (arr[i] === Direction.Right && arr[i - 1] != Direction.Left)) {
                    adjacentMoves++;
                }
            }
        }
    
        if (adjacentMoves > 0) {
            adjacentMoves += 1;
        }

        return adjacentMoves;
    }

    public static poseUniformity(arr: number[]) {
        let map = new Map();
        arr.forEach((n) => {
            map.set(n, (map.get(n) || 0) + 1);
        });
        return arr.length ? Math.max(...map.values()) : 0;
    }

    public static poseBonus(type: ContestType, poseDirections: number[], includeAdjacentTypes = false) {
        const danceBonuses = [
            ContestBattleDancePose.consecutivePoses(poseDirections),     // Cool
            ContestBattleDancePose.pairsOfOppositePoses(poseDirections), // Beautiful
            ContestBattleDancePose.poseVariance(poseDirections),         // Cute
            ContestBattleDancePose.adjacentPoses(poseDirections),        // Smart
            ContestBattleDancePose.poseUniformity(poseDirections),       // Tough
        ];

        const typeArray = ContestTypeHelper.contestTypeMatrix[type];

        let bonus = 0;
        for (let i = 0; i < ContestType.Balanced; i++) {
            bonus += danceBonuses[i] * (!includeAdjacentTypes ? Math.floor(typeArray[i]) : typeArray[i]);
        }
        return bonus;
    };
}
