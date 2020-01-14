class GymController {
    public static calculateCssClass(leader: GymLeaderName): KnockoutComputed<string> {
        const gym = App.game.world.getGym(leader);
        console.log(leader);
        console.log(gym);
        return ko.computed(function () {
            if (App.game.badgeCase.hasBadge(gym.badgeReward)) {
                return 'btn btn-success';
            }
            return 'btn btn-secondary';
        });
    }
}