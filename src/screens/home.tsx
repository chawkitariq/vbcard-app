import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Text, View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {API_BASE_URL} from '../constants';

function HomeScreen({route, navigation}: any) {
  const {isPending, error, data} = useQuery({
    queryKey: ['repoData'],
    queryFn: () => axios.get(`${API_BASE_URL}/contacts`),
  });

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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}

export default HomeScreen;
