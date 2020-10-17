class NPC {
    constructor(
        public name: string,
        public dialog: string[],
        public image?: string
    ) {}

    get dialogHTML(): string {
        return this.dialog.map(line => `<p>${line}</p>`).join('\n');
    }

    public openDialog() {
        $('#npc-modal .npc-name').text(this.name);
        $('#npc-modal .npc-dialog').html(this.dialogHTML);
        if (this.image) {
            $('#npc-modal .npc-image').attr('src', this.image);
            $('#npc-modal .npc-image').show();
        } else {
            $('#npc-modal .npc-image').hide();
        }
        $('#npc-modal').modal();
        return;
    }
}
