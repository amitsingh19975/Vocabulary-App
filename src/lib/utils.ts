import { browser } from '$app/environment';

export function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDateTime(date: Date | number): string {
    const temp = new Date(date);
    console.log(window.navigator.language)
    return temp.toLocaleString(window.navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}

export function getItemLocalStorageFromLocalStorage(key: string) {
    if (!browser) return;
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
}

export function setItemToLocalStorage(key: string, data: unknown) {
    if (!browser || data == null) return;
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
}
