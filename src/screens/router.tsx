import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreen from './tab';
import ContactDetailScreen from './contact/detail';
import ContactCreateScreen from './contact/create';
import LoginScreen from './auth/login';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Tab"
          component={TabScreen}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: 'Connexion',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
