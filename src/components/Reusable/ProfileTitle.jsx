import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import WidthSpacer from './WidthSpacer'
import ReusableText from './ReusableText'
import { COLORS, SIZES } from '../../constants/theme'

export default function ProfileTitle({ onPress, title, icon }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.title}>
        <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
          <View style={[styles.rowWithSpace, {justifyContent: 'flex-start'}]}>
            <View>
              <AntDesign name={icon} size={20} />
            </View>
            <WidthSpacer width={15} />
            <ReusableText 
              text={title}
              family={'medium'}
              size={SIZES.medium}
              color={COLORS.gray}
            />
          </View>
          <AntDesign name='right' size={20} />
        </View> 
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: COLORS.white,
    width: '100%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})