import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { customizeCard } from '../../store';
import RBSheet from 'react-native-raw-bottom-sheet';
import ReusableText from '../../components/Reusable/ReusableText';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import AssetImage from '../../components/Reusable/AssetImage';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import ReusableBtn from '../../components/Button/ReusableBtn';

const EditCard = React.forwardRef(({ closeSheet, card }, ref) => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const cardImages = {
    Visa: require('../../../assets/images/Visa.png'),
    Mastercard: require('../../../assets/images/Mastercard.png'),
    PayPal: require('../../../assets/images/PayPal.png')
  };

  const handleSubmit = async () => {
    if (!name) {
      return setError('This field is required', 'top');
    }
    const info = { name, card };
    setLoading(true);
    await customizeCard(closeSheet, info, navigation);
    setLoading(false);
  };

  return (
    <RBSheet
      ref={ref}
      height={190}
      openDuration={250}
      customStyles={{container: styles.container}}
    >
      <View style={styles.wrapper}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10
        }}>
          <ReusableText 
            text={card}
            family={'xtrabold'}
            size={TEXT.large}
            color={COLORS.white}
          />
          <AssetImage 
            mode={'cover'}
            data={cardImages[card]}
            width={50}
            height={50}
          />
        </View>
        <ReusableText 
          text={'Customize your name on your card'}
          family={'medium'}
          color={COLORS.white}
        />
        <HeightSpacer height={10} />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        {error && !name && (
          <ReusableText 
            family={'medium'}
            color={COLORS.red}
            size={TEXT.medium}
            align={'center'}
            text={error}
          />
        )}
        <HeightSpacer height={10} />
        <View style={styles.wrapper}>
          <ReusableBtn 
            textColor={COLORS.white}
            btnText={'Customize'}
            backgroundColor={COLORS.red}
            borderWidth={1}
            borderColor={COLORS.lightRed}
            onPress={handleSubmit}
            loader={loading}
          />
        </View>
      </View>
    </RBSheet>
  )
})

export default EditCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: COLORS.green
  },
  wrapper: {
    marginHorizontal: 20
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 50,
    width: SIZES.width - 50,
    paddingHorizontal: 10,
  },
  input: {
    height: '100%',
    width: '70%'
  },
})