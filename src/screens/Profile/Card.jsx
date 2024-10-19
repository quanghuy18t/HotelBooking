import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getPayment } from '../../store';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import AppBar from '../../components/Reusable/AppBar';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import ReusableText from '../../components/Reusable/ReusableText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReusableBtn from '../../components/Button/ReusableBtn';
import AssetImage from '../../components/Reusable/AssetImage';
import EditCard from './EditCard';

export default function Card() {
  const navigation = useNavigation();
  const sheetRef = useRef(null);

  const [method, setMethod] = useState([]);
  const [card, setCard] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchPayment = async () => {
        setLoading(true);
        const [method] = await Promise.all([getPayment()]);

        if (method.method) {
          setMethod(method.method);
        } 
        if (method.card) {
          setCards(method.card);
        }
        setLoading(false);
      };
      fetchPayment();
    }, [])
  );

  const generateRandomCardNumber = (index) => {
    let cardNumber = '';

    for (let i = index; i < 15 + index; i++) {
      const digit = Math.floor(Math.random()*10);
      cardNumber += digit.toString();
    }

    const sum = cardNumber
      .split('')
      .map(Number)
      .reduceRight((acc, digit, idx) => {
        if (idx % 2 !== 0) {
          let double = digit * 2;
          if (double > 9) {
            double -= 9;
          }
          return acc + double;
        }
        return acc + digit;
      }, 0);
    
    const lastDigit = (10 - (sum % 10)) % 10;
    cardNumber += lastDigit.toString();

    const formatedCardNumber = cardNumber.match(/.{1,4}/g).join(' ');
    return formatedCardNumber;
  }

  const generateCardNumber = useCallback((index) => {
    generateRandomCardNumber(index)
  }, []);
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const generatedCardNumber = useMemo(() => generateCardNumber, []);
  const getCardColor = (cardType) => {
    switch (cardType) {
      case 'Visa':
        return COLORS.lightGreen;
      case 'Mastercard':
        return COLORS.red;
      default:
        return COLORS.gray;
    }
  };
  const cardImages = {
    Visa: require('../../../assets/images/Visa.png'),
    Mastercard: require('../../../assets/images/Mastercard.png'),
    PayPal: require('../../../assets/images/PayPal.png')
  };
  const handleName = useCallback(async (item) => {
    setCard(item);
    openSheet();
  }, []);
  const myCard = (card) => cards.find((item) => item.card === card);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 40}}>
        <AppBar 
          onPress={() => navigation.goBack()}
          color={COLORS.white}
          title={'Customize your Card'}
          left={20}
          right={20}
        />
      </View>
      <HeightSpacer height={40} />
      {loading ? (
        <ActivityIndicator size={'large'} color={COLORS.green} />
      ) : method.length === 0 ? (
        <ReusableText 
          align={'center'}
          text={'Create a payment method'}
          size={TEXT.xLarge}
          color={COLORS.dark}
          family={'bold'}
        />
      ) : (
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={method}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <View style={styles.cardWrapper}>
              <View style={[
                styles.cardContainer,
                { backgroundColor: getCardColor(item) }
              ]}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <ReusableText 
                    family={'bold'}
                    size={TEXT.xLarge}
                    text={item}
                    color={COLORS.white}
                  />
                  <MaterialCommunityIcons 
                    name='integrated-circuit-chip'
                    size={35}
                    color={COLORS.white}
                  />
                </View>
                <ReusableText 
                  color={COLORS.white}
                  size={TEXT.xLarge}
                  align={'center'}
                  text={generatedCardNumber(index)}
                  family={'xtrabold'}
                />
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <View>
                    <ReusableText 
                      color={COLORS.white}
                      size={TEXT.medium}
                      family={'bold'}
                      text={'Card holder'}
                    />
                    <View style={{height: 30}}>
                      {myCard(item) === undefined ? (
                        <ReusableBtn 
                          textColor={COLORS.white}
                          btnText={'Edit Name'}
                          width={100}
                          backgroundColor={getCardColor(item)}
                          borderColor={COLORS.lightWhite}
                          borderWidth={1}
                          onPress={() => handleName(item)}
                        />
                      ) : (
                        <ReusableText 
                          size={TEXT.large}
                          family={'bold'}
                          color={COLORS.white}
                          text={myCard(item).name}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <ReusableText 
                      color={COLORS.white}
                      size={TEXT.medium}
                      family={'bold'}
                      text={'7/27'}
                    />
                  </View>
                </View>
                <HeightSpacer height={20} />
                <View>
                  <AssetImage 
                    width={60}
                    height={40}
                    data={cardImages[item]}
                  />
                </View>
              </View>
              <EditCard 
                ref={sheetRef}
                closeSheet={closeSheet}
                card={card}
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
    marginTop: 20,
  },
  cardContainer: {
    height: 250,
    width: SIZES.width - 20,
    borderColor: COLORS.green,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    borderRadius: 15,
    padding: 20,
  },
  cardWrapper: {
    marginHorizontal: 10,
  },
});