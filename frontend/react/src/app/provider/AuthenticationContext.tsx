/* eslint-disable @typescript-eslint/no-empty-function */
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { createContext } from 'react';
import { IUser } from '../common';

const AuthenticationContext = createContext<IAuthenticationContext>({
  user: null,
  federatedSignIn: async (provider) => {},
  isAuthenticated: false,
  signOut: async () => {},
});

interface IAuthenticationContext {
  federatedSignIn(provider: CognitoHostedUIIdentityProvider): Promise<unknown>;
  signOut(): unknown;
  user: IUser | null;
  isAuthenticated: boolean;
}

export { AuthenticationContext, IAuthenticationContext };
