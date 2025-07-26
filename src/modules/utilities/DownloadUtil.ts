export function createDownloadElement(data: string, filename: string) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', filename);
    return element;
}

export function downloadTextFile(data: string, filename: string) {
    createDownloadElement(data, filename).click();
}
