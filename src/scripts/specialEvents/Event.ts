enum NotifiedStatus {
  None,
  New,
  Starting,
  Started,
  Ending,
  Ended,
}

class SpecialEvent {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    startFunction: Function;
    endTime: Date;
    endFunction: Function;

    notified: number;


    constructor(id: number, title: string, description: string, startTime: Date, startFunction: Function, endTime: Date, endFunction: Function) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.startFunction = startFunction;
        this.endTime = endTime;
        this.endFunction = endFunction;
    }

    start() {
        return this.startFunction();
    }

    end() {
        return this.startFunction();
    }
}
