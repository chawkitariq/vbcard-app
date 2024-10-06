import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ContactIndexScreen from './contact';
import {Icon} from 'react-native-paper';
import ContactFollowingIndexScreen from './contact-following';
import AccountIndexScreen from './account';

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
        options={{
          title: 'Bibliothèque',
          tabBarIcon: () => <Icon size={24} source="card-multiple" />,
        }}
      />
      <BottomTab.Screen
        name="AccountIndex"
        component={AccountIndexScreen}
        options={{
          title: 'Compte',
          tabBarIcon: () => <Icon size={24} source="account" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabScreen;
