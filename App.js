import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OnBoarding from './src/screens/OnBoarding/OnBoarding';
import BottomTabNavigation from './src/navigations/BottomTabNavigation';
import Search from './src/screens/Search/Search';
import CountryDetail from './src/screens/Detail/CountryDetail';
import Recommended from './src/screens/Detail/Recommended';
import PlaceDetail from './src/screens/Detail/PlaceDetail';
import HotelDetail from './src/screens/Detail/HotelDetail';
import HotelList from './src/screens/Detail/HotelList';
import HotelSearch from './src/screens/Search/HotelSearch';
import SelectRoom from './src/screens/Detail/SelectRoom';
import Payment from './src/screens/Profile/Payment';
import Successful from './src/screens/Booking/Successful';
import Failed from './src/screens/Booking/Failed';
import Setting from './src/screens/Setting/Setting';
import SelectedRoom from './src/screens/Detail/SelectedRoom';
import AuthTopTab from './src/navigations/AuthTopTab';
import ToastManager from 'toastify-react-native';
import AdminTopTab from './src/navigations/AdminTopTab';
import EditCountry from './src/screens/Admin/EditCountry';
import EditHotel from './src/screens/Admin/EditHotel';
import EditPlace from './src/screens/Admin/EditPlace';
import { MyContextControllerProvider } from './src/store';
import BookingRoom from './src/screens/Detail/BookingRoom';
import { DateProvider } from './src/context/DateContext';
import BookingDetail from './src/screens/Detail/BookingDetail';
import Review from './src/screens/Review/Review';
import ProfileDetail from './src/screens/Profile/ProfileDetail';
import EditProfile from './src/screens/Profile/EditProfile';
import Card from './src/screens/Profile/Card';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    bold: require('./assets/fonts/bold.otf'),
    light: require('./assets/fonts/light.otf'),
    medium: require('./assets/fonts/medium.otf'),
    regular: require('./assets/fonts/regular.otf'),
    xtrabold: require('./assets/fonts/xtrabold.otf'),
  });

  GoogleSignin.configure({
    webClientId: '378300245809-ijs7as3l69ek0rqt2tlhqnrjl827781s.apps.googleusercontent.com'
  })
  useEffect(() => {
    Settings.initializeSDK();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ToastManager />
      <MyContextControllerProvider>
        <DateProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='OnBoarding'
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name='OnBoarding' component={OnBoarding} />
              <Stack.Screen name='Auth' component={AuthTopTab} />
              <Stack.Screen name='Admin' component={AdminTopTab} />
              <Stack.Screen name='Bottom' component={BottomTabNavigation} />
              <Stack.Screen name='Search' component={Search} />
              <Stack.Screen name='CountryDetail' component={CountryDetail} />
              <Stack.Screen name='Recommended' component={Recommended} />
              <Stack.Screen name='PlaceDetail' component={PlaceDetail} />
              <Stack.Screen name='HotelDetail' component={HotelDetail} />
              <Stack.Screen name='HotelList' component={HotelList} />
              <Stack.Screen name='HotelSearch' component={HotelSearch} />
              <Stack.Screen name='SelectRoom' component={SelectRoom} />
              <Stack.Screen name='Payment' component={Payment} />
              <Stack.Screen name='Successful' component={Successful} />
              <Stack.Screen name='Failed' component={Failed} />
              <Stack.Screen name='Setting' component={Setting} />
              <Stack.Screen name='BookingRoom' component={BookingRoom} />
              <Stack.Screen name='BookingDetail' component={BookingDetail} /> 
              <Stack.Screen name='SelectedRoom' component={SelectedRoom} />
              <Stack.Screen name='EditCountry' component={EditCountry} />
              <Stack.Screen name='EditHotel' component={EditHotel} />
              <Stack.Screen name='EditPlace' component={EditPlace} />
              <Stack.Screen name='Review' component={Review} />
              <Stack.Screen name='ProfileDetail' component={ProfileDetail} />
              <Stack.Screen name='EditProfile' component={EditProfile} />
              <Stack.Screen name='Card' component={Card} />
            </Stack.Navigator>
          </NavigationContainer>     
        </DateProvider>
      </MyContextControllerProvider>
    </GestureHandlerRootView>
  );
}