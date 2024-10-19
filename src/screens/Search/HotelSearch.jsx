import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AppBar from '../../components/Reusable/AppBar';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import HotelCard from '../../components/Tiles/Hotel/HotelCard';
import { useMyContextController } from '../../store';

export default function HotelSearch({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {listHotels} = controller;

  const [searchKey, setSearchKey] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    if (searchKey !== '') {
      const filtered = listHotels.filter((hotel) => {
        return hotel.title.toLowerCase().includes(searchKey.toLowerCase())
      });
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(listHotels);
    }
  }, [searchKey, listHotels]);

  const handleSearch = (text) => {
    setSearchKey(text);
  }

  return (
    <SafeAreaView>
      <View style={{ height: 70 }}>
        <AppBar
          color={COLORS.white}
          color1={COLORS.white}
          icon={"filter"}
          title={"Look for hotels"}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={40}
          left={20}
          right={20}
          drop={true}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.input}
            placeholder='Where do you want to stay'
            value={searchKey}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Feather name='search' size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={{paddingLeft: 10}}>
        <FlatList 
          data={filteredHotels}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (<View style={{height: 16}} />)}
          ListEmptyComponent={() => {
            <View>
              <HeightSpacer height={'20%'} />
              <Image 
                source={require('../../../assets/images/search.png')}
                style={styles.searchImage}
              />
            </View>
          }}
          renderItem={({item}) => (
            <HotelCard 
              item={item} 
              margin={8}
              onPress={() => navigation.navigate('PlaceDetail', item._id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: SIZES.small,
    borderColor: COLORS.blue,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50
  },
  input: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: 50
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBlue
  },
  searchImage: {
    resizeMode: 'contain',
    width: '100%',
    height: SIZES.height/2.2,
    paddingHorizontal: 20
  },
})