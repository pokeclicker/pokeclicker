class Sound {
    public sound = document.createElement('audio');
    public name: string;
    public initialized = false;

    constructor (name: string, src: string) {
        this.name = name;
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
                this.sound.play();
                this.sound.pause();
                this.sound.src = src;
            });
        });
    }
    
    play () {
        if (this.initialized && this.canPlay()) {
            this.sound.play();
        }
    }

    stop () {
        if (this.initialized) {
            this.sound.pause();
        }
    }

    remove () {
        if (this.initialized) {
            this.sound.remove();
        }
    }

    canPlay() {
        const setting = Settings.getSetting(`sound.${this.name}`);
        if (!setting) {
            return true;
        }
        return !!setting.value;
    }
}