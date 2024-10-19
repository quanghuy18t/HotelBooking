import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'toastify-react-native';
import AppBar from '../../components/Reusable/AppBar';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import ReusableText from '../../components/Reusable/ReusableText';
import AssetImage from '../../components/Reusable/AssetImage';
import WidthSpacer from '../../components/Reusable/WidthSpacer';
import ToggleSwitch from 'toggle-switch-react-native';
import ReusableBtn from '../../components/Button/ReusableBtn';
import { addPayment, useMyContextController } from '../../store';

export default function Payment() {
  const navigation = useNavigation();

  const [controller, dispatch] = useMyContextController();

  const [switchStates, setSwitchStates] = useState([
    { name: 'Visa', toggle: false },
    { name: 'Mastercard', toggle: false },
    { name: 'PayPal', toggle: false },
  ]);
  const [loading, setLoading] = useState(false);

  const toggleSwitch = (index) => {
    const updatedSwitchStates = switchStates.map((item, idx) => ({
      ...item,
      toggle: idx === index,
    }));
    setSwitchStates(updatedSwitchStates);
  }

  const memoizedSwitchStates = useMemo(() => switchStates, [switchStates]);

  const card = [
    {
      name: 'Visa Card',
      card: require('../../../assets/images/Visa.png')
    },
    {
      name: 'Master Card',
      card: require('../../../assets/images/Mastercard.png'),
    },
    {
      name: 'PayPal',
      card: require('../../../assets/images/PayPal.png'),
    }
  ];

  const SavePaymentMethod = async () => {
    const select = switchStates.every((item) => item.toggle === false);
    if (select) {
      return Toast.error('Select one payment method');
    }
    const selected = switchStates.find((item) => item.toggle === true);

    setLoading(true);
    await addPayment(dispatch, selected);
    setLoading(false);
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: 60}}>
        <AppBar 
          top={10}
          left={20}
          right={20}
          color={COLORS.white}
          title={'Payment Methods'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <HeightSpacer height={20} />
      <View style={{marginTop: 40, marginHorizontal: 10}}>
        <ReusableText 
          color={COLORS.black}
          align={'center'}
          family={'medium'}
          size={TEXT.large}
          text={'Select your payment method'}
        />
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={card}
          keyExtractor={(item) => item.card}
          renderItem={({item, index}) => (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}>
              <AssetImage 
                width={50}
                mode={'cover'}
                height={40}
                data={item.card}
              />
              <WidthSpacer width={20} />
              <View style={{flex: 1}}>
                <ReusableText 
                  size={TEXT.large}
                  text={item.name}
                  color={COLORS.dark}
                  family={'medium'}
                />
              </View>
              <ToggleSwitch 
                isOn={memoizedSwitchStates[index].toggle}
                onColor={COLORS.green}
                offColor={COLORS.blue}
                size='medium'
                onToggle={() => toggleSwitch(index)}
              />
            </View>
          )}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10}}>
        <View style={{marginHorizontal: 20}}>
          <ReusableBtn 
            textColor={COLORS.white}
            btnText={loading ? 'Please wait...' : 'Save Payment Method'}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={1}
            onPress={SavePaymentMethod}
            loader={loading}
          />
        </View>
        <HeightSpacer height={10} />
        <View style={{marginHorizontal: 20}}>
          <ReusableBtn 
            textColor={COLORS.white}
            btnText={'Create Card'}
            width={SIZES.width - 50}
            backgroundColor={COLORS.blue}
            borderColor={COLORS.blue}
            borderWidth={1}
            onPress={() => navigation.navigate('Card')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}