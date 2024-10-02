import {View} from 'react-native';

function SplashScreen({navigation}: any) {
  return (
    <View
      style={{
        minHeight: '100%',
        paddingHorizontal: 16 * 1.5,
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{gap: 16, minWidth: '100%'}}></View>
    </View>
  );
}

export default SplashScreen;
