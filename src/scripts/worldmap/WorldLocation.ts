abstract class WorldLocation {
    worldRequirements: WorldRequirement[];

    canAccess(): boolean {
        this.worldRequirements.forEach(requirement => {
            if (!requirement.isCompleted()) {
                return false;
            }
        });
        return true;
    }

    lockedReason() {
        let res = '';
        this.worldRequirements.forEach(requirement => {
            if (!requirement.isCompleted()) {
                res += `${requirement.lockedReason()}\n`;
            }
        });
        return res;
    }
}