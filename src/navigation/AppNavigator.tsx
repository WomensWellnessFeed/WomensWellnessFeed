import React from 'react';
import { Platform } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { DiscoveryScreen } from '../screens/DiscoveryScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

const tabConfig: Record<string, { icon: string; label: string }> = {
    Home: { icon: 'home', label: 'Home' },
    Chat: { icon: 'forum', label: 'Chat' },
    Discovery: { icon: 'explore', label: 'Discover' },
    Care: { icon: 'favorite', label: 'Care' },
    Profile: { icon: 'person-outline', label: 'Profile' },
};

export const AppNavigator: React.FC = () => {
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
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        const cfg = tabConfig[route.name];
                        return <Icon name={cfg?.icon ?? 'circle'} size={23} color={color} />;
                    },
                    tabBarLabel: tabConfig[route.name]?.label ?? route.name,
                    tabBarActiveTintColor: theme.primary,
                    tabBarInactiveTintColor: theme.textSecondary,
                    tabBarStyle: {
                        backgroundColor: theme.surface,
                        borderTopColor: theme.border,
                        borderTopWidth: 1,
                        height: Platform.select({ ios: 84, default: 62 }),
                        paddingBottom: Platform.select({ ios: 28, default: 8 }),
                        paddingTop: 8,
                    },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: '500',
                        letterSpacing: 0.2,
                    },
                    headerStyle: {
                        backgroundColor: theme.surface,
                        borderBottomColor: theme.border,
                        borderBottomWidth: 1,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: theme.text,
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: '700',
                        color: theme.text,
                        letterSpacing: -0.3,
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Discovery" component={DiscoveryScreen} />
                <Tab.Screen name="Care" component={SearchScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
