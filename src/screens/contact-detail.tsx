import {Text, View} from 'react-native';

function ContactDetailScreen({route, navigation}: any) {
  const {contactId} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen {contactId}</Text>
    </View>
  );
}

export default ContactDetailScreen;
