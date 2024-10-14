import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Contact} from '../types';

interface Props {
  layout?: Contact.Layout;
  size?: 'regular' | 'small';
}

export const ContactCard = ({layout, size: ratio = 'regular'}: Props) => {
  const theme = useTheme();

  const aspectRatios = {regular: 16 / 10, small: 4 / 3};

  return (
    <View
      style={{
        padding: 16 * 0.5,
        aspectRatio: aspectRatios[ratio],
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surfaceVariant,
      }}>
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton mode="outlined" icon="camera" size={16 * 4} />
      </View>
      <IconButton
        mode="outlined"
        icon="camera"
        size={16}
        style={{alignSelf: 'flex-end', marginTop: 'auto'}}
      /> */}
    </View>
  );
};
