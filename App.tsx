import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactDetailScreen from './src/screens/contact/detail';
import ContactCreateScreen from './src/screens/contact/create';
import TabScreen from './src/screens/tab';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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

export default App;
