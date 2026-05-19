import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme, Theme } from './themes';

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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (storedTheme === 'dark') {
                    setIsDarkMode(true);
                } else if (storedTheme === 'light') {
                    setIsDarkMode(false);
                }
            } catch (error) {
                console.error('Failed to load theme preference', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const next = !prev;
            AsyncStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light').catch((error) => {
                console.error('Failed to save theme preference', error);
            });
            return next;
        });
    };

    if (!isLoaded) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
