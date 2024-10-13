import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Contact} from '../types';

interface Props {
  layout?: Contact.Layout;
  size?: 'regular' | 'small';
}

export const ContactCard = ({layout, size: ratio = 'regular'}: Props) => {
  const theme = useTheme();

  const aspectRatios = {regular: 16 / 9, small: 4 / 3};

  return (
    <View
      style={{
        aspectRatio: aspectRatios[ratio],
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surfaceVariant,
      }}></View>
  );
};
