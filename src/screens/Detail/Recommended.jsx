import { FlatList, SafeAreaView, View } from 'react-native'
import React from 'react'
import AppBar from '../../components/Reusable/AppBar'
import { COLORS } from '../../constants/theme'
import { recommendations } from '../../constants/data'
import ReusableTitle from '../../components/Reusable/ReusableTitle'
import { useNavigation } from '@react-navigation/native'

export default function Recommended() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{marginHorizontal: 20}}>
      <View style={{height: 40}}>
        <AppBar 
          title={'Recommendation'}
          top={0}
          left={0}
          right={0}
          color={COLORS.white}
          icon={'search1'}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Search')}
        />
      </View>
      <View style={{paddingTop: 15, marginTop: 30}}>
        <FlatList 
          data={recommendations}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <ReusableTitle 
                item={item} 
                onPress={() => navigation.navigate('PlaceDetail', item.id)}
              />
            </View>
          )}

        />
      </View>
    </SafeAreaView>
  )
}