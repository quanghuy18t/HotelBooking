import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AppBar from '../../components/Reusable/AppBar'
import { COLORS } from '../../constants/theme'
import ReusableText from '../../components/Reusable/ReusableText'
import { getRoomById, useMyContextController } from '../../store'
import { useRoute } from '@react-navigation/native'
import NetworkImage from '../../components/Reusable/NetworkImage'
import HeightSpacer from '../../components/Reusable/HeightSpacer'

export default function BookingDetail({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const {currentBooking} = controller;

  const route = useRoute();
  const {item} = route.params;

  const [room, setRoom] = useState('');

  const getRoom = useCallback(async () => {
    const roomData = await getRoomById(dispatch, currentBooking[0].room_id);

    setRoom(roomData);
  }, [dispatch, currentBooking]);
  useEffect(() => {
    getRoom();
  }, []);

  return (
    <ScrollView
      style={{flexGrow: 1}}
      contentContainerStyle={{flexGrow: 1}}
    >
      <View style={{height: 100}}>
        <AppBar 
          title={item.title}
          top={45}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
          drop={true}
        />
      </View>
      <View>
        <View style={{
          width: '90%',
          maxWidth: 400,
          alignSelf: 'center'
        }}>
          <NetworkImage 
            source={item.imageUrl}
            width={'100%'}
            height={200}
            radius={20}
          />
          <HeightSpacer height={20} />
          <View style={styles.content}>
            <ReusableText 
              text={'Room Name'}
              size={16}
              family={'regular'}
            />
            <ReusableText 
              text={room.title}
              size={15}
              family={'medium'}
            />
          </View>
          <View style={styles.content}>
            <ReusableText 
              text={'Check in'}
              size={16}
              family={'regular'}
            />
            <ReusableText 
              text={currentBooking[0].dateStart}
              size={15}
              family={'medium'}
            />
          </View>
          <View style={styles.content}>
            <ReusableText 
              text={'Check out'}
              size={16}
              family={'regular'}
            />
            <ReusableText 
              text={currentBooking[0].dateEnd}
              size={15}
              family={'medium'}
            />
          </View>
          <View style={styles.content}>
            <ReusableText 
              text={'Status'}
              size={16}
              family={'regular'}
            />
            <ReusableText 
              text={currentBooking[0].status}
              size={15}
              family={'medium'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})