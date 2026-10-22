import NotificationOption from '../notifications/NotificationOption';
import Notifier from '../notifications/Notifier';
import SaveSelector from '../SaveSelector';

type CodeType = 'Goal' | 'Objective';

export async function exportCode(type: CodeType, json: Record<string, any>) {
    const noun = type.toLowerCase();
    try {
        await navigator.clipboard.writeText(SaveSelector.btoa(JSON.stringify(json)));
    } catch (e) {
        console.error(`Error trying to copy ${noun}`, e);
        Notifier.notify({
            title: 'Export Error',
            message: `Failed to copy the ${noun} code to your clipboard.`,
            type: NotificationOption.danger,
        });
        return;
    }

    Notifier.notify({
        title: `${type} exported`,
        message: `The code for this ${noun} has been saved to your clipboard.`,
        type: NotificationOption.info,
    });
}

// Prompts for a code and decodes it, rejecting anything isValid() turns down
export async function importCode(type: CodeType, isValid: (json: any) => boolean): Promise<Record<string, any> | undefined> {
    const noun = type.toLowerCase();
    const input = await Notifier.prompt({
        title: `Import ${type}`,
        message: `Enter the exported ${noun} code below:`,
        type: NotificationOption.primary,
        timeout: 0,
    });

    if (!input?.trim().length) {
        return undefined;
    }

    try {
        const json = JSON.parse(SaveSelector.atob(input.trim()));
        if (isValid(json)) {
            return json;
        }
        Notifier.notify({
            title: 'Import Error',
            message: `The code you entered is not a ${noun}.`,
            type: NotificationOption.danger,
        });
    } catch (e) {
        console.error(e);
        Notifier.notify({
            title: 'Import Error',
            message: `Failed to import ${noun}.`,
            type: NotificationOption.danger,
        });
    }

    return undefined;
}
