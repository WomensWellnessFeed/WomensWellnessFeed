import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, reaction, runInAction } from 'mobx';

const SETTINGS_STORAGE_KEY = 'settingsStore';

type PersistedSettings = {
    bookmarkedArticles: string[];
    likedArticles: string[];
};

export class UserStore {
    bookmarkedArticles: string[] = [];
    likedArticles: string[] = [];
    isHydrated: boolean = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => ({
                bookmarkedArticles: this.bookmarkedArticles,
                likedArticles: this.likedArticles,
            }),
            async userStore => {
                if (!this.isHydrated) return;

                await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(userStore));
            }
        );

        this.bookmarkedArticles = [];
    }

    hydrate = async () => {
        try {
            // do some cool kid fetch here
            const res = await fetch('');

            if (res.ok) {
                const data = await res.json();
                this.bookmarkedArticles = data.bookmarkedArticles || [];

                runInAction(() => {
                    //
                });
            }
        } finally {
            runInAction(() => {
                this.isHydrated = true;
            });
        }
    };

    toggleBookmark(articleId: string) {
        if (!this.bookmarkedArticles.includes(articleId)) {
            this.bookmarkedArticles.push(articleId);
        } else {
            this.bookmarkedArticles = this.bookmarkedArticles.filter(id => id !== articleId);
        }
    }
}
