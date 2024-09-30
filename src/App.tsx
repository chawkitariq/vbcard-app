import {useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import merge from 'deepmerge';
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import Router from './screens/router';
import {useMemo} from 'react';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const queryClient = new QueryClient();

function App() {
  const colorScheme = useColorScheme();

  const isDarkMode = useMemo(() => {
    return colorScheme === 'dark';
  }, [colorScheme]);

  const theme = useMemo(() => {
    return !isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme;
  }, [isDarkMode]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
