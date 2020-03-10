const logBookType = {
    NEW: {
      rowType: 'primary',
      label: 'NEW',
    },
    SHINY: {
      rowType: 'warning',
      label: 'SHINY',
    },
    CAUGHT: {
      rowType: 'success',
      label: 'CAUGHT',
    },
    ESCAPED: {
      rowType: 'danger',
      label: 'ESCAPED',
    },
};

class LogBook {
    public date: number;
    public type: logBookType;
    public description: string;

    constructor(type: logBookType, description: string) {
        this.date = Date.now();
        this.type = type;
        this.description = description;
    }

    static newEntry(type: logBookType, message: string) {
      const length = player.logBookItems.unshift(new LogBook(type, message));
      if (length > 1000) player.logBookItems.pop();
    }
}
