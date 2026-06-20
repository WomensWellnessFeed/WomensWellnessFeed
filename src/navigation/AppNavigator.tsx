import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from '../screens/HomeScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { CareScreen } from '../screens/CareScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { DiscoveryScreen } from '../screens/DiscoveryScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen: React.FC = () => {
    const { theme } = useTheme();

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.primary,
                },
                headerTintColor: theme.surface,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <HomeStack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="ArticleDetail"
                component={ArticleDetailScreen}
                options={{ title: 'Article' }}
            />
        </HomeStack.Navigator>
    );
};

const renderTabBarIcon = (name: string) => ({ color, size }: { color: string; size: number }) => (
    <Icon name={name} size={size} color={color} />
);

const MainTabs: React.FC = () => {
    const { theme } = useTheme();
    const navigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: theme.primary,
            background: theme.background,
            card: theme.surface,
            text: theme.text,
            border: theme.border,
            notification: theme.accent,
        },
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: theme.primary,
                    tabBarInactiveTintColor: theme.textSecondary,
                    headerStyle: {
                        backgroundColor: theme.primary,
                    },
                    headerTintColor: theme.surface,
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: renderTabBarIcon('home'),
                    }}
                />
                <Tab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        tabBarIcon: renderTabBarIcon('search'),
                    }}
                />
                <Tab.Screen
                    name="Discovery"
                    component={DiscoveryScreen}
                    options={{
                        tabBarIcon: renderTabBarIcon('person'),
                    }}
                />
                <Tab.Screen
                    name="Care"
                    component={CareScreen}
                    options={{
                        tabBarIcon: renderTabBarIcon('person'),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: renderTabBarIcon('person'),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export const AppNavigator: React.FC = () => {
    const { isLoggedIn, isLoading } = useAuth();
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) setShowLogin(false);
    }, [isLoggedIn]);

    if (isLoading) return null;

    if (!isLoggedIn) {
        if (showLogin) {
            return <LoginScreen onNavigateToSignUp={() => setShowLogin(false)} />;
        }
        return <SignUpScreen onNavigateToLogin={() => setShowLogin(true)} />;
    }

    return <MainTabs />;
};
