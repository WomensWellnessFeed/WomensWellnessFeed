import React, { createContext, useContext, useMemo } from 'react';
import { darkTheme, lightTheme, Theme } from './themes';
import { useStores } from '../store/StoreProvider';
import { observer } from 'mobx-react-lite'

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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
    const { SettingsStore } = useStores();

    const theme = useMemo(
        () => (SettingsStore.isDarkMode ? darkTheme : lightTheme),
        [SettingsStore.isDarkMode]
    );

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDarkMode: SettingsStore.isDarkMode,
                toggleTheme: SettingsStore.toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
});

export const useTheme = () => useContext(ThemeContext);
