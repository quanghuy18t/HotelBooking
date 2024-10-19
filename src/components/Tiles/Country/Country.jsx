import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, TEXT } from '../../../constants/theme'
import { useNavigation } from '@react-navigation/native'
import NetworkImage from '../../Reusable/NetworkImage';
import HeightSpacer from '../../Reusable/HeightSpacer';
import ReusableText from '../../Reusable/ReusableText';

export default function Country({item}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CountryDetail', {item})}>
      <View>
        <NetworkImage 
          source={item.imageUrl}
          width={85}
          height={85}
          radius={12}
        />
        <HeightSpacer height={5} />
        <ReusableText 
          text={item.title}
          family={'medium'}
          size={TEXT.medium}
          color={COLORS.black}
          align={'center'}
        />
      </View>
    </TouchableOpacity>
  )
}