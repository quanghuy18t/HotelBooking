import { Image, StyleSheet , View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'
import HeightSpacer from '../Reusable/HeightSpacer';
import ReusableText from '../Reusable/ReusableText';
import ReusableBtn from '../Button/ReusableBtn';

export default function Slides({ item }) {
  const navigation = useNavigation();

  return (
    <View>
      <Image 
        source={item.image}
        style={styles.image}
      />

      <View style={styles.stack}>
        <HeightSpacer height={40} />

        <ReusableText 
          text={item.title}
          family={'medium'}
          size={SIZES.xxLarge}
          color={COLORS.white}
        />

        <HeightSpacer height={40} />

        <ReusableBtn 
          onPress={() => navigation.navigate('Auth')}
          btnText={"Let's go"}
          width={(SIZES.width - 50) / 2.2}
          backgroundColor={COLORS.red}
          borderColor={COLORS.red}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: SIZES.width,
    height: SIZES.height,
  },
  stack: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 60,
    marginHorizontal: 20,
  }
})