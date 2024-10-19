import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import ReusableText from '../Reusable/ReusableText'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import { hotels } from '../../constants/data';
import HotelCard from '../Tiles/Hotel/HotelCard';
import { getHotel, getReview, getRoom, setCurrentHotel, useMyContextController } from '../../store';

export default function BestHotel() {
  const navigation = useNavigation();

  const [controller, dispatch] = useMyContextController();
  const { listHotels, currentHotel } = controller;

  const handleSubmit = async (data) => {
    try {
      setCurrentHotel(dispatch, data)

      setTimeout(() => {
        navigation.navigate('HotelDetail');
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchHotel = async () => {
        try {
          await getHotel(dispatch);
        } catch (error) { 
          console.log(error);
        }
      };
      fetchHotel();
    }, [])
  );

  return (
    <View>
      <View style={styles.wrapper}>
        <ReusableText 
          text={'Nearby Hotels'}
          family={'medium'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate('HotelList')}>
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: SIZES.medium}}
        renderItem={({item}) => (
          <HotelCard 
            item={item} 
            margin={10} 
            onPress={() => handleSubmit(item)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
})