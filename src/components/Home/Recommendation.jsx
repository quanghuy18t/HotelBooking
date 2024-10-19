import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import ReusableText from '../Reusable/ReusableText';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { recommendations } from '../../constants/data';
import ReusableTitle from '../Reusable/ReusableTitle';
import { getHotel, useMyContextController } from '../../store';

export default function Recommendation() {
  const navigation = useNavigation();

  const [controller, dispatch] = useMyContextController();
  const { listHotels } = controller;

  const fetchHotel = useCallback(async () => {
    try {
      await getHotel(dispatch);
    } catch (error) { 
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHotel();
  }, [fetchHotel])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ReusableText 
          text={'Recommendations'}
          family={'medium'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
          <Feather 
            name='list'
            size={20}
          />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={listHotels}
        horizontal
        keyExtractor={(item) => item._id}
        contentContainerStyle={{columnGap: SIZES.medium}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ReusableTitle 
            item={item} 
            onPress={() => navigation.navigate('PlaceDetail', item._id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
})