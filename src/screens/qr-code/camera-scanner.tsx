import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, IconButton, useTheme} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

function QrCodeCameraScannerScreen({navigation}: any) {
  const theme = useTheme();

  const isFocused = useIsFocused();

  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  useLayoutEffect(() => {
    if (!hasPermission) {
      navigation.goBack();
    }

    if (device == null) {
      navigation.goBack();
    }
  }, [hasPermission, device, navigation]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  return (
    <>
      <IconButton
        style={{position: 'relative', zIndex: 999}}
        icon="close"
        onPress={() => navigation.goBack()}
        iconColor={theme.colors.surface}
      />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device!}
        isActive={isFocused}
        codeScanner={codeScanner}
      />
    </>
  );
}

export default QrCodeCameraScannerScreen;
