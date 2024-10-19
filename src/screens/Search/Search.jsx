import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import ReusableTitle from '../../components/Reusable/ReusableTitle';
import { hotels } from '../../constants/data';

export default function Search({ navigation }) {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder='Where do you want to visit'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Feather name='search' size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {hotels.length === 0 ? (
        <View>
          <HeightSpacer height={'20%'} />
          <Image 
            source={require('../../../assets/images/search.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList 
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={styles.title}>
              <ReusableTitle 
                item={item}
                onPress={() => navigation.navigate('PlaceDetail', item._id)}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
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
  title: {
    marginHorizontal: 12,
    marginBottom: 10,
  },
})