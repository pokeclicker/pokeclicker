export function createDownloadElement(data: string, filename: string) {
    const element = document.createElement('a');
    element.setAttribute('href', URL.createObjectURL(new Blob([data], { type: 'text/plain;charset=utf-8' })));
    element.setAttribute('download', filename);
    return element;
}

// iPadOS reports itself as 'MacIntel', so also check for multi-touch support
function isIOSDevice(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

async function shareTextFile(data: string, filename: string): Promise<boolean> {
    const file = new File([data], filename, { type: 'text/plain' });
    if (!navigator.canShare?.({ files: [file] })) {
        return false;
    }
    await navigator.share({ files: [file] });
    return true;
}

// Resolves true once the file has been handed to the browser, false if the user cancelled
export async function downloadTextFile(data: string, filename: string): Promise<boolean> {
    // Anchor downloads are unreliable on iOS, especially from home-screen or in-app
    // browsers; the native share sheet ('Save to Files') works in all of them.
    if (isIOSDevice()) {
        try {
            if (await shareTextFile(data, filename)) {
                return true;
            }
        } catch (err) {
            if ((err as DOMException)?.name === 'AbortError') {
                // User closed the share sheet, nothing was saved
                return false;
            }
            // Share sheet unavailable, fall back to a regular anchor download
        }
    }

    const element = createDownloadElement(data, filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    // Delayed so slower browsers have time to read the blob before it is released
    setTimeout(() => URL.revokeObjectURL(element.href), 40e3);
    return true;
}
