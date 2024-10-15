import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, Share, View} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Divider,
  List,
  Menu,
} from 'react-native-paper';
import {ContactApiService} from '../../services';
import {ContactCard} from '../../components';
import vCard from 'vcf';

function ContactDetailScreen({route, navigation}: any) {
  const {contactId} = route.params;

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const {isPending, data: contact} = useQuery({
    queryKey: ['contacts', contactId],
    queryFn: () => ContactApiService.findOne(contactId),
    enabled: !!contactId,
  });

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
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => handleContactDelete(contactId),
      },
    ]);
    closeMenu();
  }, [contactId]);

  const [vcard, setVcard] = useState<vCard>();

  useEffect(() => {
    if (contact?.vcard) {
      const vcard = new vCard().parse(contact.vcard);
      setVcard(vcard);
    }
  }, [contact?.vcard]);

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
    <ScrollView style={{minHeight: '100%'}}>
      <View style={{padding: 16}}>
        <ContactCard />

        {(vcard?.get('tel') as vCard.Property[])
          ?.map(tel => ({
            label: tel.toJSON()[1]['type'],
            value: tel.valueOf(),
          }))
          ?.map((tel, i) => (
            <List.Item
              left={props => (
                <List.Icon
                  {...props}
                  icon="phone"
                  style={[!!i && {opacity: 0}]}
                />
              )}
              title={tel.value}
              description={tel.label}
            />
          ))}

        <Divider />

        {(vcard?.get('email') as vCard.Property[])
          ?.map(email => ({
            label: email.toJSON()[1]['type'],
            value: email.valueOf(),
          }))
          ?.map((email, i) => (
            <List.Item
              left={props => (
                <List.Icon
                  {...props}
                  icon="email"
                  style={[!!i && {opacity: 0}]}
                />
              )}
              title={email.value}
              description={email.label}
            />
          ))}

        <Divider />

        {(vcard?.get('adr') as vCard.Property[])
          ?.map(adr => ({
            value: adr.valueOf(),
            label: adr.toJSON()[1]['type'],
          }))
          ?.map((adr, i) => (
            <List.Item
              left={props => (
                <List.Icon
                  {...props}
                  icon="map-marker"
                  style={[!!i && {opacity: 0}]}
                />
              )}
              title={adr.value}
              description={adr.label}
            />
          ))}

        <Divider />

        {(vcard?.get('socialProfile') as vCard.Property[])
          ?.map(adr => ({
            value: adr.valueOf(),
            label: adr.toJSON()[1]['type'],
          }))
          ?.map((socialProfile, i) => (
            <List.Item
              left={props => (
                <List.Icon
                  {...props}
                  icon="share-variant"
                  style={[!!i && {opacity: 0}]}
                />
              )}
              title={socialProfile.value}
              description={socialProfile.label}
            />
          ))}

        <Divider />

        {(vcard?.get('url') as vCard.Property[])
          ?.map(url => ({
            value: url.valueOf(),
            label: url.toJSON()[1]['type'],
          }))
          ?.map((url, i) => (
            <List.Item
              left={props => (
                <List.Icon
                  {...props}
                  icon="web"
                  style={[!!i && {opacity: 0}]}
                />
              )}
              title={url.value}
              description={url.label}
            />
          ))}
      </View>
    </ScrollView>
  );
}

export default ContactDetailScreen;
