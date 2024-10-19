import { View } from 'react-native'
import React from 'react'
import ProfileTitle from '../../components/Reusable/ProfileTitle'
import { logout, useMyContextController } from '../../store'

export default function TopInfo({ navigation }) {
  const [oontroller, dispatch] = useMyContextController();

  const handleLogout = () => {
    logout(dispatch);

    navigation.navigate('OnBoarding');
  }

  return (
    <View style={{margin: 20}}>
      <ProfileTitle 
        title={'Personal Information'} 
        icon={'user'} 
        onPress={() => navigation.navigate('EditProfile')}
      />
      <ProfileTitle 
        title={'Payment'} 
        icon={'creditcard'} 
        onPress={() => navigation.navigate('Payment')} 
      />
      <ProfileTitle 
        title={'Setting'} 
        icon={'setting'} 
        onPress={() => navigation.navigate('Setting')} 
      />
      <ProfileTitle 
        title={'Logout'} 
        icon={'logout'} 
        onPress={() => handleLogout()} 
      />
    </View>
  )
}
