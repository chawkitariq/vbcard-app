import {useQuery} from '@tanstack/react-query';
import {Pressable, RefreshControl, View} from 'react-native';
import {ActivityIndicator, DefaultTheme} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {ContactFollowingApiService} from '../../services';
import {HomeHeaderLayout} from '../../layouts';

function HomeScreen(props: any) {
  const {route, navigation} = props;

  const {
    isPending,
    data: contacts = [],
    refetch,
  } = useQuery({
    queryKey: ['followings'],
    queryFn: ContactFollowingApiService.findMeAll,
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
          data={contacts}
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
                  aspectRatio: 4 / 3,
                  borderRadius: 16 / 3,
                  backgroundColor: DefaultTheme.colors.surfaceVariant,
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
