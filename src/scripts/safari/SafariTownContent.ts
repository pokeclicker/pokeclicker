class SafariTownContent extends TownContent {
    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return 'Enter Safari Zone';
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        Safari.openModal();
    }
}
