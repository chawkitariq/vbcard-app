import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ContactIndexScreen from './contact';
import {Icon} from 'react-native-paper';
import ContactFollowingIndexScreen from './contact-following';

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabScreen() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={ContactFollowingIndexScreen}
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
