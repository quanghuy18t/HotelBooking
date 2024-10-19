import { StyleSheet, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import WidthSpacer from './WidthSpacer'
import ReusableText from './ReusableText'

export default function Rating({ rating }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='star' size={20} color={'#fd9942'} />
      <WidthSpacer width={5} />
      <ReusableText 
        text={rating}
        family={'medium'}
        size={15}
        color={'#fd9942'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})