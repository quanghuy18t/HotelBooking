import { FlatList, SafeAreaView, View } from 'react-native'
import React from 'react'
import { hotels } from '../../constants/data'
import AppBar from '../../components/Reusable/AppBar'
import ReusableTitle from '../../components/Reusable/ReusableTitle'
import { COLORS } from '../../constants/theme'
import { useMyContextController } from '../../store'

export default function HotelList({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const {listHotels} = controller;

  return (
    <SafeAreaView style={{marginHorizontal: 20}}>
      <View style={{height: 40}}>
        <AppBar 
          title={'Nearby Hotel'}
          top={0}
          left={0}
          right={0}
          color={COLORS.white}
          icon={'search1'}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('HotelSearch')}
        />
      </View>
      <View style={{paddingTop: 15, marginTop: 30}}>
        <FlatList 
          data={listHotels}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <ReusableTitle 
                item={item} 
                onPress={() => navigation.navigate('PlaceDetail', item._id)}
              />
            </View>
          )}

        />
      </View>
    </SafeAreaView>
  )
}