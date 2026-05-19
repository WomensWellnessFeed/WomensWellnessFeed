export type Theme = {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    error: string;
    statusBarStyle: 'light-content' | 'dark-content';
};

export const lightTheme: Theme = {
    primary: '#E91E63',
    secondary: '#9C27B0',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    accent: '#FF4081',
    success: '#4CAF50',
    error: '#F44336',
    statusBarStyle: 'dark-content',
};

export const darkTheme: Theme = {
    primary: '#BB86FC',
    secondary: '#9C27B0',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#C2C2C2',
    border: '#303030',
    accent: '#FF79B0',
    success: '#4CAF50',
    error: '#CF6679',
    statusBarStyle: 'light-content',
};