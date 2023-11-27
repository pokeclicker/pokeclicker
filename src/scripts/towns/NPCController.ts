class NPCController {
    public static selectedNPC: KnockoutObservable<NPC> = ko.observable();

    public static openDialog(npc: NPC) {
        this.selectedNPC(npc);
        $('#npc-modal').modal().one('shown.bs.modal', npc.options.afterOpenFunction && function () {
            npc.options.afterOpenFunction(this);
        });

        npc.setTalkedTo();
    }
}
