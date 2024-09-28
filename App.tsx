import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home';
import ContactDetailScreen from './src/screens/contact/detail';
import ContactCreateScreen from './src/screens/contact/create';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{contact: {}}}
        />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
        <Stack.Screen name="ContactCreate" component={ContactCreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
