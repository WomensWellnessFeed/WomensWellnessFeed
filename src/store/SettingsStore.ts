import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, reaction, runInAction } from 'mobx';

const SETTINGS_STORAGE_KEY = 'settingsStore';

type ThemePreference = 'light' | 'dark';

type PersistedSettings = {
    notificationsEnabled: boolean;
    darkModeEnabled: ThemePreference;
};


export class SettingStore {
    notificationsEnabled: boolean = true;
    themePreference: ThemePreference = 'light';
    isHydrated: boolean = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => ({
                notificationsEnabled: this.notificationsEnabled,
                darkModeEnabled: this.themePreference,
            }),
            async settings => {
                if (!this.isHydrated) return;

                await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            }
        );
    }

    get isDarkMode() {
        return this.themePreference === 'dark';
    }

    hydrate = async () => {
        try {
            const rawSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);

            if (rawSettings) {
                const parsedSettings = JSON.parse(rawSettings) as PersistedSettings;

                runInAction(() => {
                    this.notificationsEnabled = parsedSettings.notificationsEnabled;
                    this.themePreference = parsedSettings.darkModeEnabled ?? 'light';
                });
            }
        } finally {
            runInAction(() => {
                this.isHydrated = true;
            });
        }
    };

    toggleNotifications = () => {
        this.notificationsEnabled = !this.notificationsEnabled;
    };

    toggleTheme = () => {
        this.themePreference = this.isDarkMode ? 'light' : 'dark';
    };

    setThemePreference = (preference: ThemePreference) => {
        this.themePreference = preference;
    }
}
