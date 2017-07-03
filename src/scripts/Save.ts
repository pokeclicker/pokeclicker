class Save {

    public static store(player: Player) {
        let json = JSON.stringify(player);
        localStorage.setItem("player", json)
    }

    public static load(): Player {
        let saved = JSON.parse(localStorage.getItem("player"));
        if (saved) {
            return new Player(saved);
        } else {
            return new Player()
        }
    }

    public static filter(object: any, keep: string[]): Object {
        let filtered = {}, prop;
        for (prop in object) {
            if (keep.indexOf(prop) > -1) {
                filtered[prop] = object[prop]
            }
        }
        return filtered
    }

}