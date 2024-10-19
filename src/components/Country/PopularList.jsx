import { FlatList, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ReusableTitle from '../Reusable/ReusableTitle';

export default function PopularList({ data }) {
  const navigation = useNavigation();
console.log(data);
  const renderItem = ({item}) => (
    <View style={{marginBottom: 10}}>
      <ReusableTitle 
        item={item}
        onPress={() => navigation.navigate('PlaceDetail', item._id)}
      />
    </View>
  )

  return (
    <FlatList 
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
}