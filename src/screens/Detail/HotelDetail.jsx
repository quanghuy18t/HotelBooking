import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AppBar from '../../components/Reusable/AppBar'
import { COLORS, SIZES } from '../../constants/theme'
import { hotel } from '../../constants/data'
import ReusableText from '../../components/Reusable/ReusableText'
import HeightSpacer from '../../components/Reusable/HeightSpacer'
import StarRating from 'react-native-star-rating-widget'
import NetworkImage from '../../components/Reusable/NetworkImage'
import DescriptionText from '../../components/Reusable/DescriptionText'
import HotelMap from '../../components/Hotel/HotelMap'
import { Feather } from '@expo/vector-icons'
import ReviewList from '../../components/Hotel/ReviewList'
import ReusableBtn from '../../components/Button/ReusableBtn'
import { getReview, useMyContextController } from '../../store'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getStart } from '../../utils'

export default function HotelDetail() {
  const navigation = useNavigation();

  const [controller, dispatch] = useMyContextController();
  const { currentHotel } = controller;
  const [listReviews, setListReviews] = useState([]);

  // const fetchReview = useCallback(async () => {
  //   await getReview(dispatch, currentHotel.id);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchReview = async () => {
        const reviews = await getReview(dispatch, currentHotel.id);
        setListReviews(reviews);
      }

      fetchReview();
    }, [])
  )

  let coordinates = {
    id: currentHotel.id,
    title: currentHotel.title,
    latitude: currentHotel.latitude,
    longitude: currentHotel.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <ScrollView>
      <View style={{height: 80}}>
        <AppBar 
          color={COLORS.white}
          color1={COLORS.white}
          icon={"search1"}
          title={currentHotel.title}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={50}
          left={20}
          right={20}
          drop={true}
        />
      </View>
      <View>
        <View style={styles.container}>
          <NetworkImage
            source={currentHotel.imageUrl}
            width={"100%"}
            height={200}
            radius={20}
          />
          <View style={styles.titleContainer}>
            <View style={styles.titleColumn}>
              <ReusableText 
                text={currentHotel.title}
                family={'medium'}
                size={SIZES.large}
                color={COLORS.black}
              />
              <HeightSpacer height={10} />
              <ReusableText 
                text={currentHotel.location}
                family={'medium'}
                size={SIZES.medium}
                color={COLORS.black}
              />
              <HeightSpacer height={15} />
              <View style={styles.rowWithSpace}>
                <StarRating 
                  maxStars={5}
                  rating={getStart(listReviews) || 0}
                  color='#fd9942'
                  starStyle={{width: 15}}
                  starSize={25}
                />
                <ReusableText 
                  text={`(${listReviews.length}) reviews`}
                  family={'medium'}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.container, {paddingTop: 90}]}>
          <ReusableText 
            text={'Description'}
            family={'medium'}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />
          <DescriptionText text={currentHotel.description} />
          <HeightSpacer height={10} />
          <ReusableText 
            text={'Location'}
            family={'medium'}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={15} />
          <ReusableText 
            text={currentHotel.location}
            family={'medium'}
            size={SIZES.small+2}
            color={COLORS.gray}
          />
          <HotelMap coordinates={coordinates} />
          <View style={styles.rowWithSpace}>
            <ReusableText
              text={'Reviews'}
              family={'medium'}
              size={SIZES.large}
              color={COLORS.black}
            />
            <TouchableOpacity>
              <Feather 
                name='list'
                size={20}
              />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={10} />
          <ReviewList review={listReviews} />
        </View>
        <View style={[styles.rowWithSpace, styles.bottom]}>
          <View>
            <ReusableText 
              text={`\$ ${hotel.price}`}
              family={'medium'}
              size={SIZES.large}
              color={COLORS.black}
            />
            <HeightSpacer height={5} />
            <ReusableText 
              text={'Jan 01 - Dec 25'}
              family={'medium'}
              size={SIZES.medium}
              color={COLORS.gray}
            />
          </View>
          <ReusableBtn 
            onPress={() => navigation.navigate('BookingRoom')}
            btnText={'Select Room'}
            width={(SIZES.width - 50)/2.2}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginHorizontal: 20,
  },
  titleContainer: {
    margin: 15,
    backgroundColor: COLORS.lightWhite,
    height: 120,
    position: 'absolute',
    top: 170,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  titleColumn: {
    padding: 15,
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    height: 90,
    paddingVertical: 20
  },
})