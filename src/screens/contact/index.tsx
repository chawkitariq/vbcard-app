export * from './detail';
export * from './create';

import {FlashList} from '@shopify/flash-list';
import {Pressable, RefreshControl, View} from 'react-native';
import {Appbar, FAB, useTheme} from 'react-native-paper';
import {ContactApiService} from '../../services';
import {useQuery} from '@tanstack/react-query';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {ContactCard} from '../../components';

function ContactIndexScreen({route, navigation}: any) {
  const isFocused = useIsFocused();

  const theme = useTheme();

  const {
    isPending,
    data: contacts = [],
    refetch,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: ContactApiService.findAll,
  });

  return (
    <>
      <FlashList
        refreshing={isPending}
        contentContainerStyle={{padding: 16}}
        ListHeaderComponent={() => (
          <Appbar.Header>
            <Appbar.Content title="Bibliothèque" />
          </Appbar.Header>
        )}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={() => refetch()} />
        }
        data={contacts}
        estimatedItemSize={16 / 9}
        ItemSeparatorComponent={() => <View style={{height: 16}}></View>}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('ContactDetail', {
                contactId: item.id,
              })
            }>
            <ContactCard />
          </Pressable>
        )}
      />
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        visible={isFocused}
        onPress={() => navigation.navigate('ContactCreate')}
      />
    </>
  );
}

export default ContactIndexScreen;
