import {useQuery} from '@tanstack/react-query';
import {Text, View} from 'react-native';
import {
  ActivityIndicator,
  Card,
  IconButton,
  MD3Colors,
  Searchbar,
} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {ContactFollowerApiService} from '../../services';
import {useState} from 'react';

function HomeScreen({route, navigation}: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const {isPending, data} = useQuery({
    queryKey: ['repoData'],
    queryFn: ContactFollowerApiService.findMeFollowings,
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
    <View
      style={{
        minHeight: '100%',
        paddingHorizontal: 16 * 1.5,
        paddingVertical: 16,
        gap: 16,
      }}>
      <Searchbar
        placeholder="Rechercher"
        onChangeText={setSearchQuery}
        value={searchQuery}
        clearButtonMode="unless-editing"
        traileringIcon="filter"
        onTraileringIconPress={() => navigation.navigate('HomeFilter')}
      />
      <FlashList
        data={data?.contacts || []}
        estimatedItemSize={16 * 10}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{height: 16}}></View>}
        renderItem={({item, index}) => (
          <Card
            style={[
              {flexGrow: 1, aspectRatio: 1},
              index % 2 === 0
                ? {
                    marginRight: 16 / 2,
                  }
                : {
                    marginLeft: 16 / 2,
                  },
            ]}>
            <Card.Content>
              <Text>Contact</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

export default HomeScreen;
