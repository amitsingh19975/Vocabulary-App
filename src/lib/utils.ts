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
