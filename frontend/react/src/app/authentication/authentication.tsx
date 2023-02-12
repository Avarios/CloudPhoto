import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Auth from '../service/authentication';
import { useUserState } from '../common/UserProvider';

export function Authentication() {
  const { setState, state } = useUserState();

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(event, data);
      switch (event) {
        case 'signIn':
          break;
        case 'signOut':
          // Set user to null
          break;
      }
    });
    Auth.currentUserInfo()
      .then((currentUser) => {
        const { picture, email, preferred_username } = currentUser.attributes;
        setState({
          avatarUrl: picture,
          email: email,
          username: preferred_username,
        });
      })
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, [setState]);
  if (state.username) {
    return (
      <div>
        Hi {state.username}
        <button
          onClick={async () => {
            const signOutResult = await Auth.signOut({ global: true });
            console.log(signOutResult);
          }}
        >
          Signout
        </button>
      </div>
    );
  }
  return (
    <div className="App">
      <button
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
      >
        Open Google
      </button>
    </div>
  );
}
