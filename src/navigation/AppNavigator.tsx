import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FeedScreen } from '../screens/FeedScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

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
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
