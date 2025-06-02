import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RequestsScreen from '../../pages/Requests/Requests';
import SettingsScreen from '../../pages/Settings/Settings';
import ProfileScreen from '../../pages/Profile/Profile';

import { Colors } from '../../shared/tokens';
import { tabRouterStyles } from './styled';
import RequestsIcon from '../../assets/icons/orders.svg';
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
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.gray,
        tabBarLabelStyle: tabRouterStyles['tab-label'],
        tabBarItemStyle: {
          ...tabRouterStyles['tab-item'],
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen
        name="Запросы"
        component={RequestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <RequestsIcon width={size} height={size} fill={color} />,
        }}
      />

      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <ProfileIcon width={size} height={size} fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabScreens;
