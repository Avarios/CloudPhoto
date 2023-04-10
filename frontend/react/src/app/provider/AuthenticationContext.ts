/* eslint-disable @typescript-eslint/no-empty-function */
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { createContext } from 'react';

interface IAuthenticationContext {
    federatedSignIn(provider: CognitoHostedUIIdentityProvider): unknown;
    signOut(): unknown;
    user: IUser | null;
    isAuthenticated: boolean;
  }

const AuthenticationContext = createContext<IAuthenticationContext>({
  user: null,
  isAuthenticated: false,
  federatedSignIn: async (provider) => {},
  signOut: async () => {},
});

export { AuthenticationContext, IAuthenticationContext };