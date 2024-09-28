export * from './detail';
export * from './create';

import {Button, Text, View} from 'react-native';

function ContactIndexScreen({route, navigation}: any) {
  console.log(route.params?.contact);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Contact Index</Text>
      <Button
        title="Nouveau contact"
        onPress={() => {
          navigation.navigate('ContactCreate');
        }}
      />
      <Button
        title="Voir le contact"
        onPress={() => {
          navigation.navigate('ContactDetail', {
            contactId: 86,
          });
        }}
      />
    </View>
  );
}

export default ContactIndexScreen;
