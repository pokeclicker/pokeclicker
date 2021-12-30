class HeldItem {
    constructor (
        public name: string,
        public description: string,
        public onTrigger: ()=>void
    ) {}
}
