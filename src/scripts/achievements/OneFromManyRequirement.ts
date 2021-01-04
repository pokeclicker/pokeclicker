///<reference path="Requirement.ts"/>

class OneFromManyRequirement {
    constructor(public requirements: Array<Requirement | MultiRequirement>) {}

    public isCompleted() {
        return this.requirements.some(requirement => {
            return requirement.isCompleted();
        });
    }

    public hint(): string {
        const output = [];
        this.requirements.forEach(requirement => {
            if (!requirement.isCompleted()) {
                output.push(requirement.hint().replace(/\./g, ''));
            }
        });
        return `${output.join(' or ')}.`;
    }
}
