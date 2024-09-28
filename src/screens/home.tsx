import {Button, Text, View} from 'react-native';

function HomeScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
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

export default HomeScreen;
