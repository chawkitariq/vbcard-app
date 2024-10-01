import {StyleSheet, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

function QrCodeCameraScannerScreen({navigation}: any) {
  const theme = useTheme();

  return (
    <View
      style={[
        {backgroundColor: theme.colors.backdrop},
        StyleSheet.absoluteFill,
      ]}>
      <IconButton
        style={{position: 'relative', zIndex: 99}}
        mode="contained"
        icon="close"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default QrCodeCameraScannerScreen;
