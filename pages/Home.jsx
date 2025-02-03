import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewScreen from './New';
import ActiveScreen from './Active';
import SettingsScreen from './Settings';
import { Colors, Gaps } from '../shared/tokens';
import NewIcon from '../assets/icons/receipt-alt-svgrepo-com.svg';
import ActiveIcon from '../assets/icons/check-svgrepo-com.svg';
import SettingsIcon from '../assets/icons/gear-svgrepo-com.svg';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
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
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    padding: Gaps.g12,
  },
  tabLabel: {
    color: Colors.green,
    fontSize: 12,
    fontWeight: '500',
  },
});
