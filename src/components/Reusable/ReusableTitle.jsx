import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import NetworkImage from './NetworkImage'
import WidthSpacer from './WidthSpacer'
import ReusableText from './ReusableText'
import HeightSpacer from './HeightSpacer'
import Rating from './Rating'

export default function ReusableTitle({ item, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.wrapper}>
        <NetworkImage 
          source={item.imageUrl}
          width={70}
          height={70}
          radius={10}
        />
        <WidthSpacer width={15} />
        <View>
          <ReusableText 
            text={item.title}
            family={'medium'}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />
          <ReusableText 
            text={item.location}
            family={'medium'}
            size={14}
            color={COLORS.gray}
          />
          <HeightSpacer height={8} />
          <View style={styles.wrapper}>
            <Rating rating={item.rating} />
            <WidthSpacer width={5} />
            <ReusableText 
              text={`(${item.review.length})`}
              family={'medium'}
              size={14}
              color={COLORS.gray}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})