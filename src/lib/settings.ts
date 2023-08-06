import { writable } from 'svelte/store';
import { getItemLocalStorageFromLocalStorage, setItemToLocalStorage } from './utils';

type Settings = {
    openAIKey?: string;
};

function createSettings() {
    const { subscribe, set, update } = writable<Settings>({});
    const localSettings = getItemLocalStorageFromLocalStorage('settings');
    console.log('localSettings', localSettings);
    if (localSettings) set(localSettings);

    function setSettings(settings: Settings, options?: { keepAIKey?: boolean }) {
        const { keepAIKey = false } = options || {};
        set(settings);
        setItemToLocalStorage('settings', {...settings, openAIKey: keepAIKey ? settings.openAIKey : undefined});
    }

    function updateSettings(settings: Settings, options?: { keepAIKey?: boolean }) {
        const { keepAIKey = false } = options || {};
        update((currentSettings) => {
            const newSettings = {...currentSettings, ...settings};
            setItemToLocalStorage('settings', { ...newSettings, openAIKey: keepAIKey ? newSettings.openAIKey : undefined });
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