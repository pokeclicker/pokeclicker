class GymController {
    public static calculateCssClass(leader: GymLeaderName): KnockoutComputed<string> {
        const gym = App.game.world.getGym(leader);
        return ko.computed(function () {
            if (App.game.badgeCase.hasBadge(gym.badgeReward)) {
                return 'btn btn-secondary btn-success';
            }
            return 'btn btn-secondary';
        });
    }
}