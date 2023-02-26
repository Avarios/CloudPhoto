import { useState } from 'react';
import { useAuthentication } from '../hooks';
import { Button } from 'react-bootstrap';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export function User() {
  const { federatedSignIn, user, signOut, isAuthenticated } =
    useAuthentication();
  const [username, setUserName] = useState('');

  if (isAuthenticated) {
    return <div>Hi {user?.username} <Button onClick={() => signOut()}> Logout </Button></div>;
  }

  return (
    <Button
      onClick={() => federatedSignIn(CognitoHostedUIIdentityProvider.Google)}
    >
      Google Login
    </Button>
  );
}

export default User;
