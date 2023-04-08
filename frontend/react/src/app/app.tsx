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
      <div className='container'>
        <Grid
          templateColumns="1fr 1fr 1fr"
          gap={'small'}
          rowGap={'xxs'}
        >
          <View columnSpan={3}>
            <TopBar></TopBar>
          </View>
          <View>
            <Main></Main>
          </View>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
