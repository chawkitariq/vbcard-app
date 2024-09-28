import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreen from './tab';
import ContactDetailScreen from './contact/detail';
import ContactCreateScreen from './contact/create';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
