import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WidthSpacer from '../../components/Reusable/WidthSpacer';
import HeightSpacer from '../../components/Reusable/HeightSpacer';
import ReusableBtn from '../../components/Button/ReusableBtn';
import { COLORS, SIZES } from '../../constants/theme';
import { register, useMyContextController } from '../../store';

const validationSchema = Yup.object().shape({
  password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Require'),

  email: Yup.string()
  .email('Provider a valid email')
  .required('Require'),

  username: Yup.string()
  .min(5, 'Username must be at least 3 characters')
  .required('Require')
});

export default function Registration({ navigation }) {
  const [controller, dispatch] = useMyContextController();

  const [loading, setLoading] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  const handleRegister = async (data) => {
    setLoading(true);
    await register(dispatch, data);
    setLoading(false);
    setTimeout(() => {
      navigation.navigate('Signin')
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <Formik 
        initialValues={{email: '', password: '', username: ''}}
        validationSchema={validationSchema}
        onSubmit={(value) => handleRegister(value)}
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
              <Text style={styles.label}>Username</Text>
              <View>
                <View 
                  style={styles.inputWrapper(
                    touched.username ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons 
                    name='face-man-profile'
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10} />
                  <TextInput 
                    placeholder='Enter Username'
                    onFocus={() => setFieldTouched('username')}
                    onBlur={() => {setFieldTouched('username', '')}}
                    value={values.username}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={{flex: 1, marginLeft: 5}}
                    onChangeText={handleChange('username')}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
              </View>
            </View>
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
  }
})