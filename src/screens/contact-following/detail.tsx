import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {Alert, Share, View} from 'react-native';
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <List.Item
        contentStyle={{borderColor: theme.colors.secondaryContainer}}
        title="Afficher le Qr-Code"
        onPress={() =>
          navigation.navigate('QrCodeDetail', {
            contactId: contact?.id,
          })
        }
        right={props => <List.Icon {...props} icon="arrow-right" />}
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
  );
}

export default ContactFollowingDetailScreen;
