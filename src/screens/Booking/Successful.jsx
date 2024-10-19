import { View } from 'react-native'
import React from 'react'
import AssetImage from '../../components/Reusable/AssetImage'
import HeightSpacer from '../../components/Reusable/HeightSpacer'
import ReusableText from '../../components/Reusable/ReusableText'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import ReusableTitle from '../../components/Reusable/ReusableTitle'
import { hotel } from '../../constants/data'
import ReusableBtn from '../../components/Button/ReusableBtn'

export default function Successful({ navigation }) {
  return (
    <View>
      <View  style={{marginTop: '20%'}}>
        <AssetImage 
          data={require('../../../assets/images/checked.png')}
          width={'100%'}
          height={200}
          mode={'contain'}
        />
        <HeightSpacer height={40} />
        <View style={{alignItems: 'center'}}>
          <ReusableText 
            text={'Booking Successful'}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />
          <ReusableText 
            text={'You can find your booking details below'}
            family={'regular'}
            size={SIZES.medium}
            color={COLORS.gray}
          />
          <HeightSpacer height={20} />
        </View>
        <View style={{margin: 20}}>
          <ReusableText 
            text={'Room Detail'}
            family={'bold'}
            size={SIZES.medium}
            color={COLORS.dark}
          />
          <HeightSpacer height={20} />
          <ReusableTitle item={hotel} />
          <HeightSpacer height={20} />
          <ReusableBtn 
            btnText={'Done'}
            borderColor={COLORS.green}
            borderWidth={1}
            backgroundColor={COLORS.green}
            textColor={COLORS.white}
            width={SIZES.width-50}
            onPress={() => navigation.navigate('Bottom')}
          />
        </View>
      </View>
    </View>
  )
}