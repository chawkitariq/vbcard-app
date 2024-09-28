import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ContactIndexScreen from './contact';
import HomeScreen from './home';

const Tab = createMaterialBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ContactIndex" component={ContactIndexScreen} />
    </Tab.Navigator>
  );
}

export default TabScreen;
