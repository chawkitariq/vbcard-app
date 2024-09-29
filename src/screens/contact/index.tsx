export * from './detail';
export * from './create';

import {FlashList} from '@shopify/flash-list';
import {Pressable, View} from 'react-native';
import {ActivityIndicator, MD3Colors, useTheme} from 'react-native-paper';
import {ContactApiService} from '../../services';
import {useQuery} from '@tanstack/react-query';

function ContactIndexScreen({route, navigation}: any) {
  const theme = useTheme();

  const {isPending, data} = useQuery({
    queryKey: ['contacts'],
    queryFn: ContactApiService.findAll,
  });

  if (isPending) {
    return (
      <View
        style={{
          minHeight: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{minHeight: '100%', padding: 16 * 1.5}}>
      <FlashList
        data={data?.contacts || []}
        estimatedItemSize={16 / 9}
        ItemSeparatorComponent={() => <View style={{height: 16 * 1.5}}></View>}
        renderItem={({item, index}) => (
          <Pressable
            style={{
              flexGrow: 1,
              borderRadius: 16 / 3,
              aspectRatio: 16 / 9,
              backgroundColor: theme.colors.primary,
            }}
            onPress={() => console.log('on press')}></Pressable>
        )}
      />
    </View>
  );
}

export default ContactIndexScreen;
