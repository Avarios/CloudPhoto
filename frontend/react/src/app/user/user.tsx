import { useState } from 'react';
import { useUserState } from '../common/UserProvider';

export function User() {
  const { setState, state } = useUserState();
  const [username, setUserName] = useState('');
  return (
    <div>
      <div>This is an User from user {state.username} </div>
      <input value={username} onChange={(e) => setUserName(e.target.value)} />
      <button onClick={() => setState({ username: username })}>Save</button>
    </div>
  );
}

export default User;
