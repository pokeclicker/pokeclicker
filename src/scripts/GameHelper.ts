// For helper functions that may be needed across all files
class GameHelper {

    public static incrementObservable(obs: KnockoutObservable<number>, amt: number = 1) {
        obs(obs() + amt);
    }

}