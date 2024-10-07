import {useQuery} from '@tanstack/react-query';
import {Pressable, RefreshControl, View} from 'react-native';
import {ActivityIndicator, Appbar, Icon, IconButton} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {ContactFollowingApiService} from '../../services';
import {ContactCard} from '../../components';
import React from 'react';

function ContactFollowingIndexScreen(props: any) {
  const {route, navigation} = props;

  const {
    isPending,
    data: contacts = [],
    refetch,
  } = useQuery({
    queryKey: ['followings'],
    queryFn: ContactFollowingApiService.findMeAll,
  });

  return (
    <FlashList
      data={contacts}
      contentContainerStyle={{
        padding: 16,
      }}
      ListHeaderComponent={() => (
        <Appbar.Header>
          <Appbar.Content title="Accueil" />
          <Appbar.Action
            icon="qrcode-scan"
            onPress={() => navigation.navigate('QrCodeCameraScanner')}
          />
        </Appbar.Header>
      )}
      estimatedItemSize={16 * 10}
      numColumns={2}
      refreshing={isPending}
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={() => refetch()} />
      }
      ItemSeparatorComponent={() => <View style={{height: 16}}></View>}
      renderItem={({item, index}) => (
        <Pressable
          style={[
            {
              flexGrow: 1,
            },
            index % 2 === 0
              ? {
                  marginRight: 16 * 0.5,
                }
              : {
                  marginLeft: 16 * 0.5,
                },
          ]}
          onPress={() =>
            navigation.navigate('ContactFollowingDetail', {
              contactId: item.id,
            })
          }>
          <ContactCard size="small" />
        </Pressable>
      )}
    />
  );
}

export default ContactFollowingIndexScreen;
