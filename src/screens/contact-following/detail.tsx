import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, Share, View} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Dialog,
  List,
  Menu,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {ContactFollowingApiService} from '../../services';
import {ContactCard} from '../../components';

function ContactFollowingDetailScreen({route, navigation}: any) {
  const {contactId} = route.params;

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const {isPending, data: contact} = useQuery({
    queryKey: ['contacts', contactId],
    queryFn: () => ContactFollowingApiService.findMeOne(contactId),
    enabled: !!contactId,
  });

  const queryClient = useQueryClient();

  const {isPending: isDeletePending, mutate: handleDeleteFollowing} =
    useMutation({
      mutationKey: ['followings', contactId],
      mutationFn: ContactFollowingApiService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['followings']});
        navigation.goBack();
      },
      onError: error => console.error(error),
    });

  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  const handleShareAction = useCallback(() => {
    Share.share({
      message: contactId,
    });
    closeMenu();
  }, [contactId]);

  const handleDeleteAction = useCallback(() => {
    Alert.alert(
      'Suppression',
      'Êtes-vous sur de vouloirs effectués cette action ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => handleDeleteFollowing(contactId),
        },
      ],
    );
    closeMenu();
  }, [contactId]);

  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="" />
          <Appbar.Action onPress={handleShareAction} icon="share" />
          <Menu
            visible={isMenuVisible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item onPress={handleDeleteAction} title="Supprimer" />
          </Menu>
        </Appbar.Header>
      ),
    });
  }, [navigation, contactId, isMenuVisible]);

  if (isPending || isDeletePending) {
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
    <ScrollView style={{minHeight: '100%', padding: 16}}>
      <View style={{gap: 16}}>
        <ContactCard layout={contact?.layout} />
        <List.Item
          style={{
            borderWidth: 1,
            borderColor: theme.colors.surfaceVariant,
            borderRadius: theme.roundness,
          }}
          title="Afficher le Qr-Code"
          onPress={() =>
            navigation.navigate('QrCodeDetail', {
              contactId: contact?.id,
            })
          }
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <Portal>
          <Dialog visible={isDeletePending}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
              <ActivityIndicator />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
}

export default ContactFollowingDetailScreen;
