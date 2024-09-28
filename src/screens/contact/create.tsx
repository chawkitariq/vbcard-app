import {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

function ContactCreateScreen({route, navigation}: any) {
  const [firstname, setFirstame] = useState('');
  const [lastname, setLastname] = useState('');
  const [position, setPosition] = useState('');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
      }}>
      <TextInput
        value={firstname}
        onChangeText={setFirstame}
        placeholder="sdfsdf"
        style={{width: '100%', borderWidth: 1}}
      />
      <TextInput
        value={lastname}
        onChangeText={setLastname}
        placeholder="sdfsdf"
        style={{width: '100%', borderWidth: 1}}
      />
      <TextInput
        value={position}
        onChangeText={setPosition}
        placeholder="sdfsdf"
        style={{width: '100%', borderWidth: 1}}
      />
      <Button
        title="Confirmer"
        onPress={() => {
          navigation.navigate('ContactIndex', {
            // contact: {
            //   firstname,
            //   lastname,
            //   position,
            // },
          });
        }}
      />
    </View>
  );
}

export default ContactCreateScreen;
