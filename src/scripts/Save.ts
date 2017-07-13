class Save {

    static counter: number = 0;

    public static store(player: Player) {
        let json = JSON.stringify(player);
        localStorage.setItem("player", json);
        this.counter = 0;
        console.log("Game saved")
    }

    public static load(): Player {
        let saved = localStorage.getItem("player");
        if (saved) {
            return new Player(JSON.parse(saved));
        } else {
            return new Player()
        }
    }

    public static reset(): void {
        localStorage.setItem("player", null);
        location.reload()
    }

    /** Filters an object by property names
     * @param     object : any The object you want to filter
     * @param       keep : string[] An array of property names that should be kept
     * @returns {Object} : The original object with only the specified properties
     */
    public static filter(object: any, keep: string[]): Object {
        let filtered = {}, prop;
        for (prop in object) {
            if (keep.indexOf(prop) > -1) {
                filtered[prop] = object[prop]
            }
        }
        return filtered
    }

    public static initializeMultipliers(): { [name: string]: number } {
        let res = {};
        for (let obj in ItemList) {
            res[obj] = 1;
        }
        return res;
    }

    public static initializeItemlist(): { [name: string]: number } {
        let res = {};
        for (let obj in ItemList) {
            res[obj] = 0;
        }
        return res;
    }
}
