import { Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AppBar from '../../components/Reusable/AppBar';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import NetworkImage from '../../components/Reusable/NetworkImage';
import AssetImage from '../../components/Reusable/AssetImage';
import ReusableText from '../../components/Reusable/ReusableText';

export default function ProfileDetail() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState([]);

  const getProfileMemoizes = useCallback(async () => {
    try {

    } catch(error) {
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfileMemoizes();
    }, [getProfileMemoizes])
  )

  return (
    <View stylele={styles.container}>
      <View>
        <AppBar 
          icon={'edit'}
          color1={COLORS.white}
          top={50}
          left={20}
          right={20}
          title={'My Profile'}
          color={COLORS.white}
          drop={true}
          onPress={() => navigation.navigate('Home')}
          onPress1={() => navigation.navigate('EditProfile')}
        />
      </View>
      <HeightSpacer height={100} />
      <View style={styles.imageContainer}>
        {profile.imageUrl ? (
          <NetworkImage 
            width={200}
            height={200}
            radius={100}
            source={profile.imageUrl}
          />
        ) : (
          <AssetImage 
            width={200}
            height={200}
            data={require('../../../assets/images/profile.jpg')}
          />
        )}
      </View>
      <HeightSpacer height={20} />
      <View
        style={{
          backgroundColor: COLORS.lightBlue,
          height: "40%",
          borderRadius: 100,
          borderColor: COLORS.blue,
          borderWidth: 3,
          width: SIZES.width - 20,
          marginHorizontal: 10,
        }}
      >
        <HeightSpacer height={50} />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 20
        }}>
          <ReusableText 
            family={'medium'}
            text={'Username '}
            size={TEXT.medium}
            color={COLORS.white}
          />
          <View style={styles.inputContainer}>
            <TextInput 
              value={profile.username ? profile.username : ''}
              style={styles.input}
              editable={false}
            />
          </View>
        </View>
        <HeightSpacer height={20} />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 20
        }}>
          <ReusableText 
            family={'medium'}
            text={'Phone '}
            size={TEXT.medium}
            color={COLORS.white}
          />
          <View style={styles.inputContainer}>
            <TextInput 
              value={profile.phone ? profile.phone : ''}
              style={styles.input}
              editable={false}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    alignItems: 'center'
  },
  inputContainer: {
    height: 30,
    backgroundColor: COLORS.blue,
    color: COLORS.dark,
    borderColor: COLORS.lightWhite,
    flex: 1
  },
  input: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'medium',
    fontSize: TEXT.medium
  }
})