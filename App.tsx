import {PaperProvider} from 'react-native-paper';
import Router from './src/screens/router';

function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}

export default App;
