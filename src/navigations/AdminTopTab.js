import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Country from '../screens/Admin/Country';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import Hotel from '../screens/Admin/Hotel';
import Place from '../screens/Admin/Place';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 20,
  borderRadius: 10,
  height: 60,
  position: 'absolute',
  bottom: 7,
  right: 10,
  left: 10
}

export default function AdminTopTab() {
  return (
    <Tab.Navigator
      initialRouteName='Country'
      screenOptions={{
        tabBarActiveTintColor: '#EB6A58',
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: '#3e2465',
        tabBarStyle: { paddingBottom: 48  }
      }}
    >
      <Tab.Screen 
        name='Country'
        component={Country}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Fontisto 
              name={focused ? 'world' : 'world-o'}
              color={focused ? COLORS.lightGreen : COLORS.gray}
              size={20}
              style={{marginBottom: 15}}
            />
          ),
        }}
      />
      <Tab.Screen 
        name='Hotel'
        component={Hotel}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Fontisto 
              name={focused ? 'hotel' : 'hotel-alt'}
              color={focused ? COLORS.lightGreen : COLORS.gray}
              size={20}
              style={{marginBottom: 15}}
            />
          ),
        }}
      />
      <Tab.Screen 
        name='Place'
        component={Place}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={focused ? 'place' : 'place'}
              color={focused ? COLORS.lightGreen : COLORS.gray}
              size={20}
              style={{marginBottom: 15}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})