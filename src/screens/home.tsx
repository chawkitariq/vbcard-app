import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';

function HomeScreen({route, navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}

export default HomeScreen;
