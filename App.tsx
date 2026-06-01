import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { StoreProvider } from './src/store/StoreProvider';

const AppContent: React.FC = () => {
    const { theme } = useTheme();

    return (
        <StoreProvider>
            <StatusBar barStyle={theme.statusBarStyle} backgroundColor={theme.primary} />
            <AppNavigator />
        </StoreProvider>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;
