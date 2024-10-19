import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { hotels } from '../../constants/data'
import ReusableTitle from '../../components/Reusable/ReusableTitle'
import { COLORS } from '../../constants/theme'
import ReusableBtn from '../../components/Button/ReusableBtn'
import WidthSpacer from '../../components/Reusable/WidthSpacer'
import { getBooking, getHotelById, setCurrentBooking, useMyContextController } from '../../store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';

export default function TopBooking({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const {listBookings} = controller;

  const [listHotels, setListHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooking = useCallback(async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('user');

    await getBooking(dispatch, user);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const fetchHotel = async () => {
    const hotelPromises = listBookings.map((booking) =>
      getHotelById(dispatch, booking.hotel_id)
    );

    const hotelsArray = await Promise.all(hotelPromises);
    setListHotels(hotelsArray.flat());
  }
  useEffect(() => {
    fetchHotel();
  }, [listBookings, dispatch]);

  const handleDetail = async (item) => {
    await setCurrentBooking(dispatch, item.id);

    setTimeout(() => {
      navigation.navigate('BookingDetail', {item})
    }, 100)
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
                btnText={'Detail'}
                width={'50%'}
                onPress={() => handleDetail(item)}
              />
              <WidthSpacer width={5} />
              <ReusableBtn 
                borderColor={COLORS.lightRed}
                borderWidth={1}
                backgroundColor={COLORS.red}
                textColor={COLORS.white}
                btnText={'Cancle'}
                width={'50%'}
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