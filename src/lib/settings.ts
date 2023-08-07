import { writable } from 'svelte/store';
import { getItemLocalStorageFromLocalStorage, setItemToLocalStorage } from './utils';

type Settings = {
    openAIKey?: string;
    googleAPIKey?: string;
    rememberAIKey?: boolean;
};

function createSettings() {
    const { subscribe, set, update } = writable<Settings>({});
    const localSettings = getItemLocalStorageFromLocalStorage('settings');
    if (localSettings) set(localSettings);

    function setSettings(settings: Settings) {
        settings.openAIKey = settings.openAIKey?.trim();
        settings.googleAPIKey = settings.googleAPIKey?.trim();
        set(settings);
        setItemToLocalStorage('settings', {
            ...settings,
            openAIKey: settings.rememberAIKey ? settings.openAIKey : undefined,
            googleAPIKey: settings.rememberAIKey ? settings.googleAPIKey : undefined,
            rememberAIKey: settings.rememberAIKey,
        });
    }

    function updateSettings(settings: Settings) {
        settings.openAIKey = settings.openAIKey?.trim();
        update((currentSettings) => {
            const newSettings = {...currentSettings, ...settings};
            setItemToLocalStorage('settings', {
                ...newSettings,
                openAIKey: settings.rememberAIKey ? newSettings.openAIKey : undefined,
                googleAPIKey: settings.rememberAIKey ? newSettings.googleAPIKey : undefined,
            });
            return newSettings;
        });
    }

    return {
        subscribe,
        set: setSettings,
        update: updateSettings,
    };
}

export const settings = createSettings();