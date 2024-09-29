import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ContactIndexScreen from './contact';
import HomeScreen from './home';
import {Icon} from 'react-native-paper';

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabScreen() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarIcon: () => <Icon size={24} source="home" />,
        }}
      />
      <BottomTab.Screen
        name="ContactIndex"
        component={ContactIndexScreen}
        options={{tabBarIcon: () => <Icon size={24} source="card-multiple" />}}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabScreen;
