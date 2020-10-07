class ApricornPlot implements Saveable {
    saveKey = '';
    defaults = {
        isUnlocked: false,
        boosted: false,
        
        apricorn: ApricornType.None,
        apricornStage: PlotStage.Seed,
        timeLeft: 0,
        apricornHarvests: 0,
        
        //mulch: MulchType.None,
        //mulchTimeLeft: 0,
    };

    _isUnlocked: KnockoutObservable<boolean>;
    _boosted: KnockoutObservable<boolean>;
    _apricorn: KnockoutObservable<ApricornType>;
    _apricornStage: KnockoutObservable<PlotStage>;
    _apricornTimeLeft: KnockoutObservable<number>;
    _apricornHarvestsLeft: KnockoutObservable<number>;
    //_mulch: KnockoutObservable<MulchType>;
    //_mulchTimeLeft: KnockoutObservable<number>;
    formattedApricornTimeLeft: KnockoutComputed<string>;
    //formattedMulchTimeLeft: KnockoutComputed<string>;
    isEmpty: KnockoutComputed<boolean>;
    stage: KnockoutComputed<number>;
    notified: boolean;

    constructor(isUnlocked: boolean, boosted: boolean, 
                apricorn: ApricornType, apricornStage: PlotStage, timeLeft: number, apricornHarvests:number) {
                    
        this._isUnlocked = ko.observable(isUnlocked);
        this._boosted = ko.observable(boosted);
        
        this._apricorn = ko.observable(apricorn);
        this._apricornStage = ko.observable(apricornStage);
        this._timeLeft = ko.observable(timeLeft);
        this._apricornHarvests = ko.observable(apricornHarvests)
        
        //this._mulch = ko.observable(mulch);
        //this._mulchTimeLeft = ko.observable(mulchTimeLeft);

        this.formattedTimeLeft = ko.pureComputed(function () {
            return GameConstants.formatTime(Math.ceil(this.timeLeft) / App.game.apricornFarming.getGrowthMultiplier());
        }, this);
        
        this.isEmpty = ko.pureComputed(function () {
            return this.apricorn == ApricornType.None;
        }, this);
        
        this.stage = ko.pureComputed(function () {            
            // No Apricorn planted
            if (this.apricorn === ApricornType.None) {
                return 1;
            }
            // Apricorn is in Bloom/Berry cycle
            if (this.apricornStage == PlotStage.Bloom || this.apricornStage == PlotStage.Berry) {
                return this.apricornStage;
            }
            // Apricorn is still in growth phase
            return 3 - Math.ceil(4 * this.timeLeft / App.game.apricornfarming.apricornData[this.apricorn].growTime);
        }, this);
        
        this.notified = false;
    }

    reduceTime(seconds: number) {
        // Don't do anything if there aren't any Apricorns
        if (this.apricorn == Apricorn.None) { return; }
        
        this.timeLeft = Math.max(0, this.timeLeft - seconds);
        
        // Checking for status change
        if (this.timeLeft == 0) {
            // Apricorn tree finished growing
            if (this.apricornStage == PlotStage.Seed) {
                this.apricornStage = PlotStage.Bloom;
                this.timeLeft = App.game.apricornFarming.apricornData[this.apricorn].harvestTime;
            }
            // Apricorn tree finished creating Apricorn
            else if (this.apricornStage == PlotStage.Bloom) {
                this.apricornStage = PlotStage.Berry;
                this.timeLeft = App.game.apricornFarming.apricornData[this.apricorn].harvestTime;
            }
            // Apricorn is ripe
            } else if (this.apricornStage == PlotStage.Berry) {
                this.harvest(true);
            }
        }
    }
    
    harvest(dropped: boolean = false): void {
        // Incrementing total harvests
        this.apricornHarvests += 1;
        
        // Checking if tree should die
        if (this.apricornHarvests >= App.game.apricornFarming.apricornData[this.apricorn].harvestAmount) {
            if (dropped) {
                // TODO: Roll for replant using Gooey Mulch
                // Doesn't increment berry gain, sets this.apricorn and this.timeLeft accordingly
            } else {
                // TODO: Return berry gain, modified by Damp Mulch
            }
            
            this.apricorn = ApricornType.None;
            this.apricornStage = PlotStage.Seed;
            this.timeLeft = 0;
            this.apricornHarvests = 0;
        }
        // Tree still lives
        else {
            // TODO: Roll for harvest using Stable Mulch
            
            this.apricornStage = PlotStage.Bloom;
            this.timeLeft = App.game.apricornFarming.apricornData[this.apricorn].harvestTime;
        }
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.isUnlocked = json['isUnlocked'] ?? this.defaults.isUnlocked;
        this.boosted = json['boosted'] ?? this.defaults.boosted;
        
        
        this.apricorn = json['apricorn'] ?? this.defaults.apricorn;
        this.apricornStage = json['apricornStage'] ?? this.defaults.apricornStage;
        this.timeLeft = json['timeLeft'] ?? this.defaults.timeLeft;
        this.apricornHarvests = json['apricornHarvests'] ?? this.defaults.apricornHarvests;
        
        //this.mulch = json['mulch'] ?? this.defaults.mulch;
        //this.mulchTimeLeft = json['mulchTimeLeft'] ?? this.defaults.mulchTimeLeft;

    }

    toJSON(): Record<string, any> {
        return {
            isUnlocked: this.isUnlocked,
            boosted: this.boosted,    
            
            apricorn: this.apricorn,
            apricornStage: this.apricornStage,
            timeLeft: this.timeLeft,
            apricornHarvests: this.apricornHarvests,
            
            //mulch: this.mulch,
            //mulchTimeLeft: this.mulchTimeLeft,
        };
    }

    // Knockout getters/setters
    get isUnlocked(): boolean {
        return this._isUnlocked();
    }

    set isUnlocked(value: boolean) {
        this._isUnlocked(value);
    }

    get boosted(): boolean {
        return this._boosted();
    }

    set boosted(value: boolean) {
        this._boosted(value);
    }

    get apricorn(): ApricornType {
        return this._apricorn();
    }

    set apricorn(apricorn: ApricornType) {
        this._apricorn(apricorn);
    }

    get apricornStage(): number {
        return this._apricornStage();
    }

    set apricornStage(value: number) {
        this._apricornStage(value);
    }
    
    get timeLeft(): number {
        return this._timeLeft();
    }

    set timeLeft(value: number) {
        this._timeLeft(value);
    }
       
    get apricornHarvests(): number {
        return this._apricornHarvests();
    }

    set apricornHarvests(value: number) {
        this._apricornHarvests(value);
    }
}
