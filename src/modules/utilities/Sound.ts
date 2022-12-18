import Settings from '../settings/Settings';

export default class Sound {
    public sound = document.createElement('audio');
    public name: string;
    public initialized = false;

    constructor(fileName: string, soundName: string) {
        const src = `assets/sounds/${fileName}.mp3`;
        this.name = soundName;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        // Wait until the document is loaded before moving the sound to the body
        $(() => {
            document.body.appendChild(this.sound);
            // Set as initialized now, incase the user is on Desktop and hasn't clicked anywhere yet
            this.initialized = true;
            // This is needed to be able to play sounds on mobile devices
            $(document).one('click', () => {
                this.sound.play().finally(() => {
                    this.sound.pause();
                    this.sound.src = src;
                }).catch(() => { });
                setTimeout(() => {
                    this.sound.pause();
                    this.sound.src = src;
                }, 1000);
            });

            const volumeObs = Settings.getSetting('sound.volume').observableValue;
            this.updateVolume(volumeObs());
            volumeObs.subscribe((v) => this.updateVolume(v));
        });
    }

    updateVolume(value: number) {
        try {
            this.sound.volume = value / 100;
        } catch (e) {
            console.error(`Error updating volume for ${this.name}:\n`, e);
        }
    }

    play() {
        if (this.initialized && this.canPlay()) {
            this.sound.play();
        }
    }

    stop() {
        if (this.initialized) {
            this.sound.pause();
        }
    }

    remove() {
        if (this.initialized) {
            this.sound.remove();
        }
    }

    canPlay() {
        if (Settings.getSetting('sound.muted')?.value) {
            return false;
        }
        const setting = Settings.getSetting(`sound.${this.name}`);
        if (!setting) {
            return true;
        }
        return !!setting.value;
    }
    toJSON() {
        return {
            name: this.name,
        };
    }
}
