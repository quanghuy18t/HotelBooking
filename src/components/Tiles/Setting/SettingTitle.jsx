import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, TEXT } from '../../../constants/theme'
import ReusableText from '../../Reusable/ReusableText'
import WidthSpacer from '../../Reusable/WidthSpacer'
import { AntDesign } from '@expo/vector-icons'

export default function SettingTitle({ title, title1, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.rowWithSpace, styles.container, {justifyContent: 'space-between'}]}
      onPress={onPress}
    >
      <ReusableText 
        text={title}
        family={'regular'}
        size={TEXT.large}
        color={COLORS.dark}
      />
      {title === 'Language' ? (
        <View style={[styles.rowWithSpace, {justifyContent: 'flex-start'}]}>
          <Image 
            source={require('../../../../assets/images/USA.png')}
            style={styles.image}
          />
          <WidthSpacer width={5} />
          <ReusableText 
            family={'regular'}
            size={TEXT.medium}
            text={'English'}
            color={COLORS.gray}
          />
          <WidthSpacer width={5} />
          <AntDesign 
            name='right'
            size={15}
            color={COLORS.gray}
          />
        </View>
      ) : (
        <View style={[styles.rowWithSpace, {justifyContent: 'flex-start'}]}>
          <ReusableText 
            family={'regular'}
            size={TEXT.medium}
            text={title1}
            color={COLORS.gray}
          />
          <WidthSpacer width={5} />
          <AntDesign
            name='right'
            size={15}
            color={COLORS.gray}
          />          
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
    paddingVertical: 15
  },
  rowWithSpace: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
})