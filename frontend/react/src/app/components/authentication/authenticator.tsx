import { Authenticator } from '@aws-amplify/ui-react';

export function CloudPhotoAuthenticator() {
  return (
    <Authenticator socialProviders={['google']}>
      {({ signOut, user }): JSX.Element => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
