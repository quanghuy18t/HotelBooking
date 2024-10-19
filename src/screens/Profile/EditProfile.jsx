import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'toastify-react-native';
import AppBar from '../../components/Reusable/AppBar';
import { COLORS, SIZES } from '../../constants/theme';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import NetworkImage from '../../components/Reusable/NetworkImage';
import AssetImage from '../../components/Reusable/AssetImage';
import { AntDesign, Feather } from '@expo/vector-icons';
import WidthSpacer from '../../components/Reusable/WidthSpacer';
import ReusableBtn from '../../components/Button/ReusableBtn';
import { ImagePicker } from '../../components/Reusable/ImagePicker';

export default function EditProfile() {
  const navigation = useNavigation();
  
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    phone: '',
    imageUrl: '',
  });

  useEffect(() => {
    setForm((prev) => ({...prev, imageUrl: image}));
  }, [image, progress]);

  const sheetRef = useRef(null);
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  }
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!form.username && !form.imageUrl && !form.phone) {
      return Toast.error('Please fill one field');
    }
    const updated = RemoveEmptyValues(form);

    setUpdateLoading(true);
    
    setUpdateLoading(false);
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 40}}>
        <AppBar 
          top={20}
          left={20}
          right={20}
          title={'Edit Profile'}
          color={COLORS.white}
          drop={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <HeightSpacer height={30} />
      <View style={styles.imageContainer}>
        {image ? (
          <NetworkImage 
            radius={20}
            width={300}
            height={300}
            source={image}
          />
        ) : (
          <AssetImage 
            radius={20}
            width={300}
            height={300}
            mode={'cover'}
            data={require('../../../assets/images/profile.jpg')}
          />
        )}
      </View>

      {loading && (
        <View style={styles.containerProgress}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, {width: `${progress}%`}]} />
          </View>
        </View>
      )}
      {loading && (
        <Text style={{textAlign: 'center'}}>
          Progress: {Math.ceil(progress)}%
        </Text>
      )}

      <TouchableOpacity onPress={openSheet}>
        <View style={{
          alignItems: 'center',
          paddingHorizontal: 30,
          justifyContent: 'center'
        }}>
          <View style={styles.chooseImage}>
            <Text style={{paddingRight: 10}}>
              {loading ? 'Loading...' : 'Choose Image'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <HeightSpacer height={20} />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper(COLORS.white)}>
            <AntDesign name='user' size={20} color={COLORS.gray} />
            <WidthSpacer width={10} />
            <TextInput 
              placeholder='Enter Username'
              onChangeText={(text) => {
                setForm((prev) => ({...prev, username: text}))
              }}
              value={form.username}
              autoCapitalize='none'
              autoCorrect={false}
              style={{flex: 1}}
            />
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputWrapper(COLORS.white)}>
            <Feather name='phone' size={20} color={COLORS.gray} />
            <WidthSpacer width={10} />
            <TextInput 
              keyboardType='phone-pad'
              placeholder='Enter Phone No.'
              onChangeText={(text) => {
                setForm((prev) => ({...prev, phone: text}))
              }}
              value={form.phone}
              autoCapitalize='none'
              autoCorrect={false}
              style={{flex: 1}}
            />
          </View>
        </View>
      </View>
      <HeightSpacer height={20} />
      <View style={{alignItems: 'center'}}>
        <ReusableBtn 
          textColor={COLORS.white}
          borderColor={COLORS.green}
          backgroundColor={COLORS.green}
          borderWidth={1}
          width={SIZES.width - 100}
          btnText={updateLoading ? 'Updating...' : 'Update'}
          onPress={handleSubmit}
          loader={updateLoading || loading}
        />
      </View>
      <ImagePicker 
        ref={sheetRef}
        closeSheet={closeSheet}
        openSheet={openSheet}
        progress={setProgress}
        Loading={setLoading}
        setImage={setImage}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  imageContainer: {
    alignItems: 'center',
  },
  chooseImage: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 40,
    width: SIZES.width - 90,
    marginHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputWrapper: (borderColor) => ({
    borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 40,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center'
  }),
  wrapper: {
    marginBottom: 15,
    width: SIZES.width - 50,
    marginHorizontal: 25,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'regular',
    marginEnd: 5,
    fontSize: SIZES.small
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.blue,
  },
  containerProgress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
})