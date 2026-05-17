import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

const AppContent: React.FC = () => {
    const { theme } = useTheme();

    return (
        <>
            <StatusBar barStyle={theme.statusBarStyle} backgroundColor={theme.primary} />
            <AppNavigator />
        </>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;
