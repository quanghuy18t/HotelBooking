import { FlatList, View } from 'react-native'
import React from 'react'
import ReviewTitle from '../Tiles/Review/ReviewTitle'

export default function ReviewList({ review }) {
  return (
    <FlatList 
      data={review}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={{marginBottom: 10}}>
          <ReviewTitle review={item} />
        </View>
      )}
    />
  )
}