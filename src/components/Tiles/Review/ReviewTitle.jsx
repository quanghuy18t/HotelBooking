import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants/theme'
import NetworkImage from '../../Reusable/NetworkImage'
import WidthSpacer from '../../Reusable/WidthSpacer'
import ReusableText from '../../Reusable/ReusableText'
import Rating from '../../Reusable/Rating'
import DescriptionText from '../../Reusable/DescriptionText'

export default function ReviewTitle({ review }) {
  return (
    <View style={styles.reviewBorder}>
      <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
        <View style={[styles.rowWithSpace, {justifyContent: 'flex-start'}]}>
          <NetworkImage 
            source={'https://res.cloudinary.com/dy4jhwbad/image/upload/v1726734325/danang_merryland.png'}
            width={54}
            height={54}
            radius={10}
          />
          <WidthSpacer width={20} />
          <View style={{width: '80%'}}>
            <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
              <ReusableText 
                text={'Quang Huy'}
                family={'medium'}
                size={SIZES.small + 2}
                color={COLORS.black}
              />
              <WidthSpacer width={'30%'} />
              <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
                <Rating rating={review.rating} />
                <WidthSpacer width={10} />
                <ReusableText 
                  text={review.updateAt}
                  family={'medium'}
                  size={SIZES.small + 2}
                  color={COLORS.black}
                />
              </View>
            </View>
            <DescriptionText text={review.review} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  reviewBorder: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGrey
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})