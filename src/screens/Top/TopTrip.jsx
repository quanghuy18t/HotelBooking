import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { hotels } from '../../constants/data'
import ReusableTitle from '../../components/Reusable/ReusableTitle'
import { COLORS } from '../../constants/theme'
import ReusableBtn from '../../components/Button/ReusableBtn'
import { getBookingConfirm, getHotelById, setCurrentBooking, useMyContextController } from '../../store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';

export default function TopTrip({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const {listConfirms} = controller;

  const [listHotels, setListHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooking = useCallback(async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('user');

    await getBookingConfirm(dispatch, user);
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const fetchHotel = async () => {
    const hotelPromises = listConfirms.map((booking) =>
      getHotelById(dispatch, booking.hotel_id)
    );

    const hotelsArray = await Promise.all(hotelPromises);
    setListHotels(hotelsArray.flat());
  }
  useEffect(() => {
    fetchHotel();
  }, [listConfirms, dispatch]);

  const handleDetail = async (item) => {
    navigation.navigate('Review', {item})
  }

  // if (!loading) {
  //   return (<ActivityIndicator size={'large'} style={{justifyContent: 'center', alignItems: 'center', height: '100%'}} />)
  // }

  return (
    <View style={{margin: 20, marginBottom: 70}}>
      <FlatList 
        data={listHotels}
        style={{height: '95%'}}
        keyExtractor={(item) => uuid.v4()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>
            <ReusableTitle item={item} />
            <View style={styles.rowWithSpace}>
              <ReusableBtn 
                borderColor={COLORS.lightBlue}
                borderWidth={1}
                backgroundColor={COLORS.white}
                textColor={COLORS.blue}
                btnText={'Review'}
                width={'100%'}
                onPress={() => handleDetail(item)}
              />
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    marginBottom: 10,
    borderRadius: 16,
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
})