import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import { AntDesign } from '@expo/vector-icons'
import ReusableText from '../../components/Reusable/ReusableText'
import HeightSpacer from '../../components/Reusable/HeightSpacer'
import Places from '../../components/Home/Places'
import Recommendation from '../../components/Home/Recommendation'
import BestHotel from '../../components/Home/BestHotel'

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{height: '100%'}}>
          <View style={styles.rowWithSpace}>
            <ReusableText 
              text={'Hey User!'}
              family={'regular'}
              size={TEXT.large}
              color={COLORS.black}
            />
            <TouchableOpacity 
              style={styles.box}
              onPress={() => navigation.navigate('Search')}
            >
              <AntDesign 
                name='search1'
                size={26}
              />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={5} />
          <ReusableText 
            text={'Places'}
            family={'medium'}
            size={TEXT.large}
            color={COLORS.black}
          />
          <Places />
          <Recommendation />
          <BestHotel />
        </View>  
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 45,
    height: '50%'
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
})