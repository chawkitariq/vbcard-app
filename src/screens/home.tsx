import {useQuery} from '@tanstack/react-query';
import {Text, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {ContactFollowerApiService} from '../services';

function HomeScreen({route, navigation}: any) {
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
    <View style={{minHeight: '100%'}}>
      <FlashList
        data={data?.contacts || []}
        estimatedItemSize={16 * 10}
        numColumns={2}
        contentContainerStyle={{padding: 16 * 1.5}}
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
