import {PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Router from './screens/router';

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
