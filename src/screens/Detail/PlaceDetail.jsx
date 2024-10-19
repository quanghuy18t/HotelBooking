import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import NetworkImage from '../../components/Reusable/NetworkImage';
import { place } from '../../constants/data';
import AppBar from '../../components/Reusable/AppBar';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import ReusableText from '../../components/Reusable/ReusableText';
import DescriptionText from '../../components/Reusable/DescriptionText';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import ReusableBtn from '../../components/Button/ReusableBtn';
import PopularList from '../../components/Country/PopularList';
import { Feather } from '@expo/vector-icons';

export default function PlaceDetail({ navigation }) {
  const route = useRoute();
  const id = route.params;

  return (
    <ScrollView>
      <View>
        <NetworkImage 
          source={place.imageUrl}
          width={'100%'}
          height={350}
          radius={30}
        />
        <AppBar 
          color={COLORS.white}
          color1={COLORS.white}
          icon={'search1'}
          title={place.title}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={40}
          left={20}
          right={20}
          drop={true}
        />
      </View>
      <View style={styles.description}>
        <ReusableText 
          family={'medium'}
          text={'Popular Hotel'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <DescriptionText text={place.description} />
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
          <PopularList data={place.popular} />
          <ReusableBtn 
            onPress={() => navigation.navigate('HotelSearch')}
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