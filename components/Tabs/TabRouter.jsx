import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewScreen from '../../pages/New/New';
import ActiveScreen from '../../pages/Active/Active';
import SettingsScreen from '../../pages/Settings/Settings';
import ProfileScreen from '../../pages/Profile/Profile';
import NewDetailsScreen from '../../pages/NewDetails/NewDetails';
import ActiveDetailsScreen from '../../pages/ActiveDetails/ActiveDetails';
import ReviewsScreen from '../../pages/Reviews/Reviews';

import { Colors } from '../../shared/tokens';
import { tabRouterStyles } from './styled';
import NewIcon from '../../assets/icons/orders.svg';
import ActiveIcon from '../../assets/icons/active-orders.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabRouterStyles['tab-bar'],
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: tabRouterStyles['tab-label'],
        tabBarItemStyle: tabRouterStyles['tab-item'],
      }}
    >
      <Tab.Screen
        name="Новые"
        component={NewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <NewIcon width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Active"
        component={ActiveScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ActiveIcon width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Настройки"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={size} height={size} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'none',
      }}
    >
      <Stack.Screen name="TabScreens" component={TabScreens} />
      <Stack.Screen name="NewDetails" component={NewDetailsScreen} />
      <Stack.Screen name="ActiveDetails" component={ActiveDetailsScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
    </Stack.Navigator>
  );
}
