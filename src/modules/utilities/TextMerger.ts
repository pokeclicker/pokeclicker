import type { Observable } from 'knockout';

export default class TextMerger {
    private static tempElementForEscape = document.createElement('textarea');
    private static mergeValues : { [name: string]: Observable<string> };

    public static mergeText(text: string) : string {
        if (this.mergeValues == null) {
            this.buildMergeValues();
        }
        const mergeSubstrings = text.match(/\$[a-zA-Z]*\$/g);
        if (mergeSubstrings == null) {
            return text;
        }

        let textResult = text;
        mergeSubstrings.forEach((s) => {
            const key = s.substring(1, s.length - 1).toLocaleLowerCase();
            if (this.mergeValues[key]()) {
                textResult = text.replace(s, this.escapeHtml(this.mergeValues[key]()));
            }
        });

        return textResult;
    }

    private static buildMergeValues() {
        this.mergeValues = {
            playername: App.game.profile.name,
        };
    }

    private static escapeHtml(text: string) {
        TextMerger.tempElementForEscape.textContent = text;
        return TextMerger.tempElementForEscape.innerHTML;
    }
}
