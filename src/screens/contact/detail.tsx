import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {Alert, Share, View} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Dialog,
  Menu,
  Portal,
  Text,
} from 'react-native-paper';
import {ContactApiService} from '../../services';

function ContactDetailScreen({route, navigation}: any) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const {contactId} = route.params;

  const queryClient = useQueryClient();

  const {isPending: isDeletePending, mutate: handleContactDelete} = useMutation(
    {
      mutationKey: ['contacts', contactId],
      mutationFn: ContactApiService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['contacts']});
        navigation.goBack();
      },
      onError: error => console.error(error),
    },
  );

  const handleEditAction = useCallback(
    () =>
      navigation.navigate('ContactUpdate', {
        contactId,
      }),
    [contactId],
  );

  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  const handleShareAction = useCallback(() => {
    Share.share({
      message: contactId,
    });
    closeMenu();
  }, [contactId]);

  const handleDeleteAction = useCallback(() => {
    Alert.alert('Suppression', 'Supprimer la resource ?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {text: 'Supprimer', onPress: () => handleContactDelete(contactId)},
    ]);
    closeMenu();
  }, [contactId]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="" />
          <Appbar.Action icon="pencil" onPress={handleEditAction} />
          <Menu
            visible={isMenuVisible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item onPress={handleShareAction} title="Partager" />
            <Menu.Item onPress={handleDeleteAction} title="Supprimer" />
          </Menu>
        </Appbar.Header>
      ),
    });
  }, [navigation, contactId, isMenuVisible]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
  );
}

export default ContactDetailScreen;
