abstract class Machine {


    constructor(
        public name: string,
        public description: string
    ) { }


    /**
     * Handles updating the machine
     */
    abstract update(delta: number): void;

}
