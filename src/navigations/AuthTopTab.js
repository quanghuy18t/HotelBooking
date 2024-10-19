import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { ScrollView, View } from 'react-native';
import Signin from '../screens/Authentication/Signin';
import Registration from '../screens/Authentication/Registration';
import { COLORS } from '../constants/theme';
import HeightSpacer from '../components/Reusable/HeightSpacer';
import AssetImage from '../components/Reusable/AssetImage';

const Tab = createMaterialTopTabNavigator();

export default function AuthTopTab() {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <HeightSpacer height={60} />
        <AssetImage 
          data={require('../../assets/images/bg2.png')}
          width={'100%'}
          height={250}
          mode={'contain'}
        />
        <View style={{height: 700}}>
          <Tab.Navigator>
            <Tab.Screen name='Signin' component={Signin} />
            <Tab.Screen name='Registration' component={Registration} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  )
}