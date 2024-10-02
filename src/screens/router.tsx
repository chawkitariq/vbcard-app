import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabScreen from './bottom-tab';
import ContactDetailScreen from './contact/detail';
import ContactCreateScreen from './contact/create';
import LoginScreen from './auth/login';
import {useAuthStore} from '../stores';
import HomeFilterScreen from './home/filter';
import ContactUpdateScreen from './contact/update';
import QrCodeCameraScannerScreen from './qrcode-camera-scanner';
import RegisterScreen from './auth/register';
import SplashScreen from './splash';

const Stack = createNativeStackNavigator();

function Router() {
  const {isAuth} = useAuthStore();

  return (
    <Stack.Navigator initialRouteName="Home">
      {!isAuth() ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="BottomTab"
            component={BottomTabScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeFilter"
            component={HomeFilterScreen}
            options={{
              animation: 'simple_push',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ContactCreate"
            component={ContactCreateScreen}
            options={{
              animation: 'simple_push',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ContactDetail"
            component={ContactDetailScreen}
            options={{
              animation: 'simple_push',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ContactUpdate"
            component={ContactUpdateScreen}
            options={{
              animation: 'simple_push',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="QrCodeCameraScanner"
            component={QrCodeCameraScannerScreen}
            options={{
              headerShown: false,
              animation: 'simple_push',
              presentation: 'modal',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Router;
