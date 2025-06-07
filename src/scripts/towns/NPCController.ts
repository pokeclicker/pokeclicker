class NPCController {
    public static selectedNPC: KnockoutObservable<NPC> = ko.observable();
    private static modalState: any;
    public static openDialog(npc: NPC) {
        this.selectedNPC(npc);
        $('#npc-modal').modal();
        npc.setTalkedTo();
        if (!this.modalState) {
            this.modalState = DisplayObservables.modalState['npc-modalObservable'].subscribe((value: BootstrapState) => {
                if (value === 'hidden') {
                    this.selectedNPC(null);
                }
            });
        }
    }
}

