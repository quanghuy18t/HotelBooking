import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AppBar from '../../components/Reusable/AppBar'
import { COLORS, SIZES } from '../../constants/theme'
import { hotels } from '../../constants/data'
import ReusableBtn from '../../components/Button/ReusableBtn'
import HeightSpacer from '../../components/Reusable/HeightSpacer'
import { getRoom, useMyContextController } from '../../store'
import RoomCard from '../../components/Reusable/RoomCard'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useDate } from '../../context/DateContext'

export default function SelectRoom({ navigation }) {
  const route = useRoute();
  const {adults, childrens} = route.params.item;

  const [controller, dispatch] = useMyContextController();
  const {currentHotel} = controller;
  const { startDay, endDay } = useDate();

  const [listRooms, setListRooms] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRoom = async () => {
        const rooms = await getRoom(dispatch, currentHotel.id, startDay, endDay, adults, childrens);
        setListRooms(rooms);
      }
      
      fetchRoom();
    }, [])
  )

  return (
    <View>
      <View style={{height: 100}}>
        <AppBar 
          title={'Select Room'}
          top={45}
          left={20}
          right={20}
          color={COLORS.white}
          icon={'search1'}
          onPress={() => navigation.goBack()}
          drop={true}
        />
      </View>
      <FlatList 
        data={listRooms}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>
            <RoomCard item={item} />
            <View style={styles.btn}>
              <ReusableBtn 
                btnText={'Select Room'}
                textColor={COLORS.white}
                backgroundColor={COLORS.green}
                width={SIZES.width - 50}
                borderWidth={0}
                borderColor={COLORS.green}
                onPress={() => navigation.navigate('SelectedRoom', {item})}
              />
            </View>
            <HeightSpacer height={10} />
          </View>
        )}
      />
      <HeightSpacer height={50} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 5,
  },
  btn: {
    margin: 10,
    alignItems: 'center'
  },
})