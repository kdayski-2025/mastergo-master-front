import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewScreen from '../pages/New';
import ActiveScreen from '../pages/Active';
import SettingsScreen from '../pages/Settings';
import NewDetailsScreen from '../pages/NewDetails';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      }}
    >
      <Tab.Screen name="New" component={NewScreen} />
      <Tab.Screen name="Active" component={ActiveScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="NewDetails"
        component={NewDetailsScreen}
        options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  );
}
