import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'auth_user';

type AuthUser = {
    name: string;
    email: string;
};

type AuthContextType = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: AuthUser | null;
    login: (email: string) => Promise<void>;
    signUp: (name: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
    login: async () => {},
    signUp: async () => {},
    logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const check = async () => {
            try {
                const stored = await AsyncStorage.getItem(AUTH_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed.isLoggedIn === true) {
                        setIsLoggedIn(true);
                        setUser(parsed.user ?? null);
                    }
                }
            } catch {
                // treat as new user
            } finally {
                setIsLoading(false);
            }
        };
        check();
    }, []);

    const signUp = async (name: string, email: string) => {
        const authUser: AuthUser = { name, email };
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, user: authUser }));
        setUser(authUser);
        setIsLoggedIn(true);
    };

    const login = async (email: string) => {
        const authUser: AuthUser = { name: email, email };
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, user: authUser }));
        setUser(authUser);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: false }));
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
