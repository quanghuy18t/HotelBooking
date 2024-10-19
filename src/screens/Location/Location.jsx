import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Locate  from 'expo-location';
import { getHotel, useMyContextController } from '../../store';
import { useFocusEffect } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';

export default function Location() {
  const [controller, dispatch] = useMyContextController();
  const {listHotels} = controller;

  const [coordinate, setCoordinate] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    title: 'My location'
  });
  const [destination, setDestination] = useState(null);

  const getLocation = async () => {
    try {
      let { status } = await Locate.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      let location = await Locate.getCurrentPositionAsync({});
      setCoordinate((prev) => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    } catch(error) {
      console.log('Error getting location', error);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchHotel = async () => {
        await getHotel(dispatch);
      }

      fetchHotel();
    }, [])
  )

  return (
    <View style={{flex: 1}}>
      {coordinate.latitude && coordinate.longitude && (
        <MapView style={styles.mapStyle} region={coordinate}>
          <Marker 
            coordinate={coordinate}
            title={coordinate.title}
          />  
          {listHotels.map((item, index) => (
            <Marker 
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              title={item.title}
            />  
          ))}
        </MapView>  
      )}
    </View>
    
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
})