import { useState } from 'react';
import { useUserState } from '../common/UserProvider';

export function AppBar() {
  const { setState, state } = useUserState();
  const [username, setUserName] = useState('');
  return (
    <div>
      <div>This is an AppBar from user {state.username} </div>
      <input value={username} onChange={(e) => setUserName(e.target.value)} />
      <button onClick={() => setState({ username: username })}>Save</button>
    </div>
  );
}

export default AppBar;
