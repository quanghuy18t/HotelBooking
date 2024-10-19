import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TopBooking from '../screens/Top/TopBooking';
import TopTrip from '../screens/Top/TopTrip';
import TopInfo from '../screens/Top/TopInfo';
import NetworkImage from '../components/Reusable/NetworkImage';
import { COLORS, SIZES } from '../constants/theme';
import HeightSpacer from '../components/Reusable/HeightSpacer';
import AppBar from '../components/Reusable/AppBar';
import ReusableText from '../components/Reusable/ReusableText';

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: COLORS.lightWhite}}>
        <View>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={{width: '100%', height: 300}}
          />
          <AppBar 
            top={0}
            left={20}
            right={20}
            color={COLORS.white}
            icon={'logout'}
            color1={COLORS.white}
            onPress1={() => {}}
          />
          <View style={styles.profile}>
            <Image
              source={require('../../assets/images/avatar.jpg')}
              style={styles.image}
            />
            <HeightSpacer height={5} />
            <View style={{alignItems: 'center'}}>
              <ReusableText 
                text={'Quang Huy'}
                family={'medium'}
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>
            <HeightSpacer height={5} />
            <View style={styles.name}>
              <View style={{alignItems: 'center'}}>
                <ReusableText 
                  text={'quanghuy.tbqh@gmail.com'}
                  family={'medium'}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name='Booking' component={TopBooking} />
        <Tab.Screen name='Trip' component={TopTrip} />
        <Tab.Screen name='Info' component={TopInfo} />
      </Tab.Navigator>
    </View>
    
  )
}

const styles = StyleSheet.create({
  profile: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 110,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 90
  },
  name: {
    borderColor: COLORS.lightWhite,
    padding: 5,
    borderRadius: 12,
  },
})