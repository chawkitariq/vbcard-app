import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreen from './tab';
import ContactDetailScreen from './contact/detail';
import ContactCreateScreen from './contact/create';
import LoginScreen from './auth/login';
import {useAuthStore} from '../stores';
import HomeFilterScreen from './home/filter';

const Stack = createNativeStackNavigator();

function Router() {
  const {isAuth} = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!isAuth() ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: 'Connexion',
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Tab"
              component={TabScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HomeFilter"
              component={HomeFilterScreen}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="ContactDetail"
              component={ContactDetailScreen}
              options={{
                animation: 'slide_from_right',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="ContactCreate"
              component={ContactCreateScreen}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'modal',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
