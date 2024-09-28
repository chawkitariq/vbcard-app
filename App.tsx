import {PaperProvider} from 'react-native-paper';
import Router from './src/screens/router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default App;
