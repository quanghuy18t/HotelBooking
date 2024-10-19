import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home/Home';
import { Ionicons } from '@expo/vector-icons';
import Location from '../screens/Location/Location';
import AuthTopTab from './AuthTopTab';
import { COLORS } from '../constants/theme';
import TopTab from './TopTab';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 20,
  borderRadius: 20,
  height: 80,
  position: 'absolute',
  bottom: 10,
  left: 20,
  right: 20,
}

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#eb6a58',
        tabBarInactiveTintColor: '#3e2465',
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarItemStyle:{paddingBottom: 20}
      }}
    >
      <Tab.Screen 
        name='Home'
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Ionicons 
              name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Location'
        component={Location}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Ionicons 
              name={focused ? 'location' : 'location-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Chat'
        component={AuthTopTab}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Ionicons 
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen 
        name='Profile'
        component={TopTab}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}