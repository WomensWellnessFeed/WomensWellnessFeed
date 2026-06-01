import { SettingStore } from './SettingsStore';
import { UserStore } from './UserStore';

export class RootStore {
    SettingsStore: SettingStore;
    UserStore: UserStore;

    constructor() {
        this.SettingsStore = new SettingStore();
        this.UserStore = new UserStore();
    }

    hydrate = async () => {
        await Promise.all([this.SettingsStore.hydrate(), this.UserStore.hydrate()]);
    };
}

export const rootStore = new RootStore();
