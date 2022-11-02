import introJs from 'intro.js';

export default class Information {
    static defaultOptions = {
        showStepNumbers: false, // Hide the red step number on element
        exitOnOverlayClick: false, // Disable this, incase user clicking intensely
        showBullets: false,
    };

    static show(options: introJs.Options = {}) {
        return introJs().setOptions({
            ...this.defaultOptions,
            ...options,
        }).start();
    }

    static hide() {
        return introJs().exit();
    }
}
