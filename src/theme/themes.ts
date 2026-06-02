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
    primary: '#C4697A',
    secondary: '#9B7FA8',
    background: '#FAF8F6',
    surface: '#FFFFFF',
    text: '#1C1A28',
    textSecondary: '#8B8898',
    border: '#EDE9E3',
    accent: '#E8A598',
    success: '#5B8E6B',
    error: '#C4575B',
    statusBarStyle: 'dark-content',
};

export const darkTheme: Theme = {
    primary: '#D4849A',
    secondary: '#B99EC9',
    background: '#0F0E14',
    surface: '#1C1A25',
    text: '#F5F0EC',
    textSecondary: '#9B97A8',
    border: '#2E2A3A',
    accent: '#E8A598',
    success: '#7BB08B',
    error: '#D47A7E',
    statusBarStyle: 'light-content',
};
