import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@aws-amplify/ui-react/styles.css';
import App from './app/app';

import { Amplify } from 'aws-amplify';
import { configuration } from './aws.exports';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(configuration);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
