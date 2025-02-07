import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewScreen from '../../pages/New/New';
import ActiveScreen from '../../pages/Active/Active';
import SettingsScreen from '../../pages/Settings/Settings';
import ProfileScreen from '../../pages/Profile/Profile';
import NewDetailsScreen from '../../pages/NewDetails/NewDetails';
import ActiveDetailsScreen from '../../pages/ActiveDetails/ActiveDetails';

import { Colors } from '../../shared/tokens';
import { styles } from './styled';
import NewIcon from '../../assets/icons/orders.svg';
import ActiveIcon from '../../assets/icons/active-orders.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
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
        name="Активные"
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
      <Tab.Screen
        name="NewDetails"
        component={NewDetailsScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="ActiveDetails"
        component={ActiveDetailsScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}
