import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';
import { ChatScreen } from '../screens/ChatScreen';
import { DiscoveryScreen } from '../screens/DiscoveryScreen';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (name: string) => ({ color, size }: { color: string; size: number }) => (
    <Icon name={name} size={size} color={color} />
);

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textSecondary,
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: colors.surface,
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
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
                    component={SearchScreen}
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
