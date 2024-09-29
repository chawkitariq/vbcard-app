import ContactIndexScreen from './contact';
import HomeScreen from './home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

function BottomTabScreen() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="ContactIndex" component={ContactIndexScreen} />
    </BottomTab.Navigator>
  );
}

export default BottomTabScreen;
