import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Appbar} from 'react-native-paper';

export const HomeHeaderLayout = ({navigation}: NativeStackHeaderProps) => {
  return (
    <Appbar.Header>
      <Appbar.Content title="" />
      <Appbar.Action icon="plus-circle" />
    </Appbar.Header>
  );
};
