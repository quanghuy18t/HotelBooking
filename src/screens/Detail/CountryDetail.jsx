import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import NetworkImage from '../../components/Reusable/NetworkImage';
import AppBar from '../../components/Reusable/AppBar';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import ReusableText from '../../components/Reusable/ReusableText';
import DescriptionText from '../../components/Reusable/DescriptionText';
import { Feather } from '@expo/vector-icons';
import ReusableBtn from '../../components/Button/ReusableBtn';
import PopularList from '../../components/Country/PopularList';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import { getHotelByCountry, useMyContextController } from '../../store';

export default function CountryDetail({ navigation }) {
  const route = useRoute();
  const { item } = route.params;

  const [controller, dispatch] = useMyContextController();
  const [listRoom, setListRoom] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRoom = async () => {
        const hotel = await getHotelByCountry(dispatch, item.id);
        setListRoom(hotel);
      };

      fetchRoom();
    }, [])
  )

  return (
    <ScrollView>
      <View>
        <NetworkImage 
          source={item.imageUrl}
          width={'100%'}
          height={350}
          radius={30}
        />
        <AppBar 
          top={0}
          left={20}
          right={20}
          title={item.title}
          color={COLORS.white}
          color1={COLORS.white}
          icon={'search1'}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
        />
      </View>
      <View style={styles.description}>
        <ReusableText 
          text={item.region}
          family={'medium'}
          size={TEXT.xLarge}
          color={COLORS.black}
        />
        <DescriptionText text={item.description} />
        <View style={{alignContent: 'center'}}>
          <HeightSpacer height={15} />
          <View style={styles.rowWithSpace}>
            <ReusableText 
              text={'Popular Destination'}
              family={'medium'}
              size={SIZES.large}
              color={COLORS.black}
            />
            <TouchableOpacity onPress={() => {}}>
              <Feather
                name='list'
                size={20}
              />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={15} />
          <PopularList data={listRoom} />
          <ReusableBtn 
            onPress={() => navigation.navigate('Hot search')}
            btnText={'Find Best Hotel'}
            width={SIZES.width - 40}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
          <HeightSpacer height={40} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f8',
    paddingTop: 45,
  },
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})