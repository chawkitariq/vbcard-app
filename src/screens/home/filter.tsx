import {useState} from 'react';
import {Text, View} from 'react-native';
import {Switch} from 'react-native-paper';

function HomeFilterScreen({route, navigation}: any) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <View
      style={{
        minHeight: '100%',
        paddingHorizontal: 16 * 1.5,
        gap: 16,
      }}>
      <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(s => !s)} />
    </View>
  );
}

export default HomeFilterScreen;
