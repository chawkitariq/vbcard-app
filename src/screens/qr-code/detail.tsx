import React from 'react';
import {IconButton, useTheme} from 'react-native-paper';

function QrCodeDetailScreen({navigation}: any) {
  const theme = useTheme();

  return (
    <>
      <IconButton
        style={{position: 'relative', zIndex: 999}}
        icon="close"
        onPress={() => navigation.goBack()}
        iconColor={theme.colors.surface}
      />
    </>
  );
}

export default QrCodeDetailScreen;
