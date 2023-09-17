class NPCController {
    public static selectedNPC: KnockoutObservable<NPC> = ko.observable();

    public static openDialog(npc: NPC) {
        this.selectedNPC(npc);
        $('#npc-modal').modal();
        npc.setTalkedTo();
    }
}
