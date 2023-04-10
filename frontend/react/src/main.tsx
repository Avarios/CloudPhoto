import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

import { Amplify } from 'aws-amplify';
import {
  AuthenticationProvider,
  authenticationConfiguration,
} from './app/provider';

Amplify.configure({
  Auth: authenticationConfiguration,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </StrictMode>
);
