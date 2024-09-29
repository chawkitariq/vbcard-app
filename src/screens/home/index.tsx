import {useQuery} from '@tanstack/react-query';
import {Pressable, RefreshControl, View} from 'react-native';
import {ActivityIndicator, MD3Colors} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {ContactFollowerApiService} from '../../services';
import {HomeHeaderLayout} from '../../layouts';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

function HomeScreen(props: NativeStackHeaderProps) {
  const {route, navigation} = props;

  const {isPending, data, refetch} = useQuery({
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
    <View>
      <HomeHeaderLayout {...props} />
      <View
        style={{
          minHeight: '100%',
          paddingHorizontal: 16 * 1.5,
          paddingVertical: 16,
          gap: 16,
        }}>
        <FlashList
          data={data?.contacts || []}
          estimatedItemSize={16 * 10}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={isPending}
              onRefresh={() => refetch()}
            />
          }
          ItemSeparatorComponent={() => <View style={{height: 16}}></View>}
          renderItem={({item, index}) => (
            <Pressable
              style={[
                {
                  flexGrow: 1,
                  aspectRatio: 1,
                  borderRadius: 16 / 3,
                  backgroundColor: MD3Colors.primary50,
                },
                index % 2 === 0
                  ? {
                      marginRight: 16 / 1.5,
                    }
                  : {
                      marginLeft: 16 / 1.5,
                    },
              ]}
              onPress={() =>
                navigation.navigate('ContactDetail', {
                  contactId: item.id,
                })
              }></Pressable>
          )}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
