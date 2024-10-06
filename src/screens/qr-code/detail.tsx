import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

function QrCodeDetailScreen({route, navigation}: any) {
  const {contactId} = route.params;

  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
      ),
    });
  }, [navigation, contactId]);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <QRCode value={contactId} size={250} />
    </View>
  );
}

export default QrCodeDetailScreen;
