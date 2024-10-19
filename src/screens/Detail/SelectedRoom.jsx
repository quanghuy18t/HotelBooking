import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import AppBar from '../../components/Reusable/AppBar';
import { COLORS, SIZES } from '../../constants/theme';
import ReusableText from '../../components/Reusable/ReusableText';
import NetworkImage from '../../components/Reusable/NetworkImage';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import Rating from '../../components/Reusable/Rating';
import WidthSpacer from '../../components/Reusable/WidthSpacer';
import ReusableBtn from '../../components/Button/ReusableBtn';
import AssetImage from '../../components/Reusable/AssetImage';
import Counter from '../../components/Reusable/Counter';
import { useDate } from '../../context/DateContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hotel } from '../../constants/data';
import { addBooking, useMyContextController } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import paypal from '../../utils/paypal';
import WebView from 'react-native-webview';
import queryString from 'query-string';

export default function SelectedRoom({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const { currentHotel } = controller;

  const route = useRoute();
  const { item } = route.params;
  const { startDay, endDay } = useDate();
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  
  const handleSubmit = async () => {
    const dayDiff = getDaysDifference();
    const total = item.price*dayDiff;
    const bookingDetail = {
      "intent": "CAPTURE",
      "purchase_units": [
      {
          "items": [
              {
                  "name": item.title,
                  "description": "Green XL",
                  "quantity": "1",
                  "unit_amount": {
                      "currency_code": "USD",
                      "value": total.toString(),
                  }
              }
          ],
          "amount": {
              "currency_code": "USD",
              "value": total.toString(),
              "breakdown": {
                  "item_total": {
                      "currency_code": "USD",
                      "value": total.toString(),
                  }
              }
          }
        }
      ],
      "application_context": {
      "return_url": "https://example.com/return",
      "cancel_url": "https://example.com/cancel"
      }
    }
    
    const token = await paypal.generateToken();
    const res = await paypal.createOrder(token, bookingDetail);
    setAccessToken(token);

    if (!!res?.links) {
      const findUrl = res.links.find(data => data?.rel == 'approve')
      console.log('findUrl', findUrl);
      setPaypalUrl(findUrl.href);
    }

    // await addBooking(dispatch, data);

    //navigation.navigate('Successful');
  }
  const clearPaypalState = () => {
    setPaypalUrl(null)
    setAccessToken(null)
  }
  const onUrlChange = (webviewState) => {
    console.log("webviewStatewebviewState", webviewState)
    if (webviewState.url.includes('https://example.com/cancel')) {
        clearPaypalState()
        return;
    }
    if (webviewState.url.includes('https://example.com/return')) {

        const urlValues = queryString.parseUrl(webviewState.url)
        console.log("my urls value", urlValues)
        const { token } = urlValues.query
        if (!!token) {
            paymentSucess(token)
        }

    }
  }
  const paymentSucess = async (id) => {
    const user = await AsyncStorage.getItem('user');
    const dayDiff = getDaysDifference();

    const data = {
      hotel_id: currentHotel.id,
      room_id: item.id,
      user_id: user,
      dateStart: startDay.dayFormat,
      dateEnd: endDay.dayFormat,
      total: item.price * dayDiff,
    }

    try {
      const res = paypal.capturePayment(id, accessToken);
      console.log('capture', res);
      clearPaypalState();

      await addBooking(dispatch, data);
      navigation.navigate('Successful');
    } catch(error) {
      console.log('Error raised in payment capture', error);
    }
  }

  const getDaysDifference = () => {
    const timeDiff = endDay.day.timestamp - startDay.day.timestamp;
    const dayDiff = Math.ceil(timeDiff/(1000*60*60*24));
    return dayDiff;
  }

  return (
    <View>
      <View style={{height: 100}}>
        <AppBar 
          title={'Select Room'}
          top={45}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
          drop={true}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 16}}>
          <View style={{marginHorizontal: 10, paddingTop: 20}}>
            <View style={[styles.rowWithSpace, {justifyContent: 'center'}]}>
              <ReusableText 
                text={item.title}
                family={'medium'}
                size={SIZES.large}
                color={COLORS.black}
              />
            </View>
            <HeightSpacer height={15} />
            <View style={styles.roomRequire}>
              <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
                <ReusableText 
                  text={startDay.dayFormat}
                  family={'regular'}
                  size={SIZES.medium}
                />
                <MaterialCommunityIcons 
                  name='ray-start-arrow' 
                  size={SIZES.medium}
                />
                <ReusableText 
                  text={endDay.dayFormat}
                  family={'regular'}
                  size={SIZES.medium}
                />
              </View>
              <HeightSpacer height={20} />
              <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
                <ReusableText 
                  text={'Days'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <ReusableText 
                  text={`${getDaysDifference()} days`}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.dark}
                />
              </View>
              <HeightSpacer height={10} />
              <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
                <ReusableText 
                  text={'Price per day'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <ReusableText 
                  text={item.price}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.dark}
                />
              </View>
              <HeightSpacer height={10} />
              <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
                <ReusableText 
                  text={'Payment Method'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <View style={[styles.rowWithSpace, {justifyContent: 'flex-start'}]}>
                  <AssetImage
                    mode={"contain"}
                    width={30}
                    height={20}
                    data={require("../../../assets/images/Visa.png")}
                  />
                  <ReusableText
                    family="regular"
                    size={SIZES.medium}
                    color={COLORS.dark}
                    text={"Visa"}
                  />
                </View>
              </View>
              <HeightSpacer height={10} />
              <View style={[styles.rowWithSpace, {justifyContent: 'space-between'}]}>
                <ReusableText 
                  text={'Total'}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <ReusableText 
                  text={item.price * getDaysDifference()}
                  family={'regular'}
                  size={SIZES.medium}
                  color={COLORS.dark}
                />
              </View>
              <HeightSpacer height={30} />
              <ReusableBtn 
                borderRadius={12}
                borderWidth={1}
                borderColor={COLORS.green}
                width={SIZES.width - 50}
                backgroundColor={COLORS.green}
                btnText={"Book Room"}
                textColor={COLORS.white}
                onPress={() => handleSubmit()}
              />
            </View>
            <HeightSpacer height={30} />
            <Modal visible={!!paypalUrl}>
              <TouchableOpacity onPress={clearPaypalState} style={{margin: 24}}>
                <Text>Closed</Text>
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <WebView source={{uri: paypalUrl}} onNavigationStateChange={onUrlChange} />
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomRequire: {
    borderTopWidth: 0.5,
    borderColor: COLORS.lightGrey,
    width: '100%',
    paddingTop: 15
  },
})