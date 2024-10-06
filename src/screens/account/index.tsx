import {useQuery} from '@tanstack/react-query';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Divider,
  List,
  Switch,
  useTheme,
} from 'react-native-paper';
import {UserMeApiService} from '../../services';
import {useAuthStore} from '../../stores';
import {useEffect, useMemo, useState} from 'react';
import {User} from '../../types';

function AccountIndexScreen({navigation}: any) {
  const {isPending, data: me} = useQuery({
    queryKey: ['users', 'me'],
    queryFn: UserMeApiService.findMe,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(me?.themeMode === User.ThemeMode.Dark);
  }, [me]);

  const {logout} = useAuthStore();

  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      list: {
        borderWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        borderRadius: theme.roundness,
      },
    });
  }, [theme]);

  return (
    <ScrollView
      style={{
        minHeight: '100%',
        padding: 16,
      }}>
      <Appbar>
        <Appbar.Content title="Compte" />
      </Appbar>
      <View style={{gap: 16}}>
        <List.Item
          style={styles.list}
          title={me?.email}
          left={props => <Avatar.Text {...props} size={16 * 4} label="XD" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <List.Item
          title="Mode sombre"
          style={styles.list}
          left={props => <List.Icon {...props} icon="brightness-6" />}
          right={props => (
            <Switch
              {...props}
              value={isDarkMode}
              onValueChange={setIsDarkMode}
            />
          )}
        />

        <List.Item
          title="Abonnements"
          style={styles.list}
          left={props => <List.Icon {...props} icon="wallet" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <List.Item
          title="Langues"
          style={styles.list}
          left={props => <List.Icon {...props} icon="translate" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <List.Item
          title="Aide"
          style={styles.list}
          left={props => <List.Icon {...props} icon="help-circle-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <List.Item
          title="Se déconnecter"
          style={[styles.list]}
          titleStyle={{color: theme.colors.error}}
          onPress={logout}
        />
      </View>
    </ScrollView>
  );
}

export default AccountIndexScreen;
