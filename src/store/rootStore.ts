import { SettingStore } from './SettingsStore';

export class RootStore {
    SettingsStore: SettingStore;

    constructor() {
        this.SettingsStore = new SettingStore();
    }

    hydrate = async () => {
        await Promise.all([this.SettingsStore.hydrate()]);
    };
}

export const rootStore = new RootStore();
