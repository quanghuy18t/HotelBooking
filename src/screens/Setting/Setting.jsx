import { View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import AppBar from '../../components/Reusable/AppBar'
import ReusableText from '../../components/Reusable/ReusableText'
import HeightSpacer from '../../components/Reusable/HeightSpacer'
import SettingTitle from '../../components/Tiles/Setting/SettingTitle'

export default function Setting({ navigation }) {
  return (
    <View style={{backgroundColor: COLORS.lightWhite, flex: 1}}>
      <View style={{height: 120}}>
        <AppBar
          top={15}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <ReusableText 
          text={'Account Setting'}
          family={'bold'}
          color={COLORS.black}
          size={SIZES.large}
        />
        <SettingTitle title={'Language'} />
        <HeightSpacer height={3} />
        <SettingTitle title={'Country'} title1={'USA'} />
        <HeightSpacer height={3} />
        <SettingTitle title={'Currency'} title1={'USD'} />
        <HeightSpacer height={20} />
        <ReusableText 
          family={'bold'}
          size={SIZES.large}
          color={COLORS.black}
          text={'Support'}
        />
        <SettingTitle title="Get Help" />
        <HeightSpacer height={3} />
        <SettingTitle title="Give a feedback" />
        <HeightSpacer height={20} />
        <ReusableText
          family={"bold"}
          size={SIZES.large}
          color={COLORS.black}
          text={"Legal"}
        />
        <SettingTitle title="Term of Service" />
        <HeightSpacer height={3} />
        <SettingTitle title="Privacy Policy" />
        <HeightSpacer height={10} />
      </View>
    </View>
  )
}