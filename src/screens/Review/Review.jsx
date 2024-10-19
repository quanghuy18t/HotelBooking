import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import AppBar from '../../components/Reusable/AppBar';
import { useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import StarRating from 'react-native-star-rating-widget';
import { Button } from 'react-native-elements';
import ReusableBtn from '../../components/Button/ReusableBtn';
import DescriptionInput from '../../components/Reusable/DescriptionInput';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import { addReview, useMyContextController } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Review({navigation}) {
  const route = useRoute();
  const {item} = route.params;

  const [controller, dispatch] = useMyContextController();

  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('user');

    const data = {
      hotel_id: item.id,
      review: review,
      rating: start,
      update: new Date(),
      user: user,
    };
console.log(data);
    await addReview(dispatch, data);
    setLoading(false);

    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.messageContainer}> 
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
        <View style={{ padding: 15 }}>
          <Text style={ styles.overlayTitle }>
              DO YOU LIKE THIS HOTEL?
          </Text>
          <Text style={ styles.overlayMessage }>
              Give a quick rating so we know if you like it. 
          </Text>
        </View>
      </View>  
      <View style={styles.starStyle}>
        <StarRating 
          rating={start}
          maxStars={5}
          onChange={(rating) => setStart(rating)}
          enableHalfStar={false}
          
        />
      </View>
      <HeightSpacer height={20} />
      <DescriptionInput 
        height={100}
        backgroundColor={COLORS.white}
        width={SIZES.width - 50}
        placeholder={'Enter Your Review'}
        borderRadius={10}
        padding={10}
        color={COLORS.dark}
        family={'medium'}
        onChange={(text) => setReview(text)}
      />
      <View style={{
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 25
      }}>
        <ReusableBtn 
          onPress={handleSubmit}
          btnText={'Submit'}
          width={SIZES.width - 40}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0}
          textColor={COLORS.white}
          loader={loading}
        />
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    margin: 0,                                                                                                                                                                                                                                                                                                                                            
    marginBottom: 20,
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  overlayTitle: {
    textAlign: 'center',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             fontSize: 20,
    fontWeight: "700",
    //color: 'white',
    marginBottom: 10
  },
  overlayMessage: {
    textAlign: 'center',
    //color: 'white',
    fontSize: 15
  },
  starStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
})