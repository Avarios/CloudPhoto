import { TopBar } from './components/appbar';
import { Main } from './components/home';
import {
  Grid,
  View,
  ThemeProvider,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react';

export function App() {
  return (
    <ThemeProvider
      colorMode="system"
      theme={{
        name: 'cloudphotoTheme',
        overrides: [defaultDarkModeOverride],
      }}
    >
      <Grid templateColumns="1fr 1fr 1fr 1fr " gap={'small'} rowGap={'xxs'}>
        <View columnSpan={4}>
          <TopBar></TopBar>
        </View>
        <View>
          <Main></Main>
        </View>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
