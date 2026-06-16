import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme, Theme } from './themes';
import { supabase } from '../lib/supabase';

const THEME_STORAGE_KEY = 'app_theme_preference';

type ThemeContextType = {
    theme: Theme;
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    isDarkMode: false,
    toggleTheme: () => {},
});

const applyThemeValue = (value: string | null, setter: (dark: boolean) => void) => {
    if (value === 'dark') setter(true);
    else if (value === 'light') setter(false);
};

const syncThemeFromProfile = async (userId: string, setter: (dark: boolean) => void) => {
    const { data } = await supabase
        .from('profiles')
        .select('theme')
        .eq('id', userId)
        .single();
    if (data?.theme) {
        applyThemeValue(data.theme, setter);
        await AsyncStorage.setItem(THEME_STORAGE_KEY, data.theme);
    }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                // Read local value first so UI renders immediately
                const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                applyThemeValue(stored, setIsDarkMode);

                // Override with DB value if the user is already logged in
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    await syncThemeFromProfile(session.user.id, setIsDarkMode);
                }
            } catch (error) {
                console.error('Failed to load theme preference', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadTheme();

        // When the user signs in on this session, apply their saved theme from DB
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                await syncThemeFromProfile(session.user.id, setIsDarkMode);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const toggleTheme = () => {
        const next = !isDarkMode;
        const value = next ? 'dark' : 'light';
        setIsDarkMode(next);

        // Persist locally
        AsyncStorage.setItem(THEME_STORAGE_KEY, value).catch(console.error);

        // Persist to Supabase if logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                supabase
                    .from('profiles')
                    .update({ theme: value })
                    .eq('id', session.user.id)
                    .then(({ error }) => {
                        if (error) console.error('Failed to save theme to DB:', error);
                    });
            }
        });
    };

    if (!isLoaded) return null;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
