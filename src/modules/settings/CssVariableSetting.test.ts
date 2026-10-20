import { readFileSync } from 'fs';
import CssVariableSetting from './CssVariableSetting';

const settingsMarkup = readFileSync('src/components/settingsModal.html', 'utf8');

describe('Map color controls', () => {
    afterEach(() => {
        ko.cleanNode(document.body);
        document.body.innerHTML = '';
        document.documentElement.style.removeProperty('--missingAchievement');
    });

    ['ColorChoiceSettingTemplate', 'SortableColorChoiceSettingTemplate'].forEach((templateName) => {
        it(`${templateName} applies input events immediately and retains the selected color`, () => {
            const template = settingsMarkup.split(`id="${templateName}">`)[1].split('</script>')[0];
            document.body.innerHTML = template.match(/<input\b[^>]*>/)[0];
            const setting = new CssVariableSetting('missingAchievement', 'Missing Achievement', [], '#57e3ff');
            ko.applyBindings(templateName === 'ColorChoiceSettingTemplate' ? setting : { setting }, document.body);

            const input = document.querySelector('input');
            input.value = '#123456';
            input.dispatchEvent(new Event('input', { bubbles: true }));

            expect(setting.value).toBe('#123456');
            expect(document.documentElement.style.getPropertyValue('--missingAchievement')).toBe('#123456');

            input.dispatchEvent(new Event('change', { bubbles: true }));
            expect(setting.value).toBe('#123456');

            const savedValue = JSON.parse(JSON.stringify(setting.value));
            setting.set(setting.defaultValue);
            setting.set(savedValue);
            expect(document.documentElement.style.getPropertyValue('--missingAchievement')).toBe('#123456');
        });
    });
});
