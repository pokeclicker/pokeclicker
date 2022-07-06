type NPCOptionalArgument = {
    requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    image?: string,
};

class NPC {
    public talkedTo = ko.observable<boolean>(false); // Used for custom quests

    constructor(
        public name: string,
        public dialog: string[],
        public options: NPCOptionalArgument = {}
    ) {}

    get dialogHTML(): string {
        return this.dialog.map(line => `<p>${line}</p>`).join('\n');
    }

    public isVisible() {
        return this.options.requirement?.isCompleted() ?? true;
    }

    public openDialog() {
        $('#npc-modal .npc-name').text(this.name);
        $('#npc-modal .npc-dialog').html(this.dialogHTML);
        if (this.options.image) {
            $('#npc-modal .npc-image').attr('src', this.options.image);
            $('#npc-modal .npc-image').show();
        } else {
            $('#npc-modal .npc-image').hide();
        }
        $('#npc-modal').modal();
        this.talkedTo(true);
        return;
    }
}
