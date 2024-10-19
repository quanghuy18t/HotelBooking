import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import HeightSpacer from '../../components/Reusable/HeightSpacer'
import ReusableBtn from '../../components/Button/ReusableBtn'
import WidthSpacer from '../../components/Reusable/WidthSpacer'
import { login, useMyContextController } from '../../store'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';
import { Toast } from 'toastify-react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

const validationSchema = Yup.object().shape({
  password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Required'),
  
  email: Yup.string()
  .email('Provider a valid email')
  .required('Required')
});

export default function Signin({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const [loading, setLoading] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  const handleLogin = async (data) => {
    setLoading(true);
    await login(dispatch, data);
    setLoading(false);
  }

  useEffect(() => {
    if (userLogin !== null) {
      if (userLogin.role === 'customer') {
        navigation.navigate('Bottom');
      } else if (userLogin.role === 'admin') {
        navigation.navigate('Admin');
      }
    }
  }, [userLogin, handleLogin])

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { data } = await GoogleSignin.signIn();
      console.log(data);

      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
      await auth().signInWithCredential(googleCredential);

      Toast.success('Login Successful');
    }
     catch (error) {
      Toast.error('Login Google Failed');
      console.log(error);
     }
  }

  const handleFacebookLogin = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']);

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);

      Toast.success('Login Successfully');
    } catch (error) {
      Toast.error('Login Facebook Failed');
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Formik 
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(value) => handleLogin(value)}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldTouched
        }) => (
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View>
                <View 
                  style={styles.inputWrapper(
                    touched.email ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons 
                    name='email-outline'
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10} />
                  <TextInput 
                    placeholder='Enter email'
                    onFocus={() => setFieldTouched('email')}
                    onBlur={() => {setFieldTouched('email', '')}}
                    value={values.email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={{flex: 1, marginLeft: 5}}
                    onChangeText={handleChange('email')}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View>
                <View 
                  style={styles.inputWrapper(
                    touched.password ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons 
                    name='lock-outline'
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10} />
                  <TextInput 
                    placeholder='Enter password'
                    onFocus={() => setFieldTouched('password')}
                    onBlur={() => {setFieldTouched('password', '')}}
                    value={values.password}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={obsecureText}
                    style={{flex: 1}}
                    onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity
                    onPress={() => setObsecureText(!obsecureText)}
                  >
                    <MaterialCommunityIcons 
                      name={!obsecureText ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <HeightSpacer height={20} />
            <ReusableBtn 
              onPress={handleSubmit}
              btnText={'SIGN IN'}
              width={SIZES.width - 40}
              backgroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
              loader={loading}
            />
          </View>
        )}
      </Formik>
      <View style={styles.signupContainer}>
        <View style={styles.signupWrapper} />
        <Text style={{fontSize: 14}}>Or Login with</Text>
        <View style={styles.signupWrapper} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleGoogleSignin}
        >
          <Image 
            source={require('../../../assets/images/google.png')}
            style={{
              height: 36,
              width: 36,
              marginRight: 8,
              resizeMode: 'contain'
            }}
          />
          <Text>Google</Text>
        </TouchableOpacity>
        <View style={{width: 60}}  />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleFacebookLogin}
        >
          <Image 
            source={require('../../../assets/images/facebook.png')}
            style={{
              height: 36,
              width: 36,
              marginRight: 8,
              resizeMode: 'contain'
            }}
          />
          <Text>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
  inputWrapper: (color) => ({
    borderColor: color,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  }),
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: 'left'
  },
  errorMessage: {
    color: COLORS.red,
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    marginLeft: 5
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  signupWrapper: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 10
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 4,
    borderRadius: 10
  },
})